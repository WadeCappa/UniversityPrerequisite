package apiData

import cats.effect.{Blocker, ExitCode, IO}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import doobie.util.fragment.Fragment
import doobie.util.Read

import cats.effect.{Blocker, ExitCode, IO, IOApp, Resource}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import neo4s._

import doobie.ConnectionIO
import doobie.implicits._
import models._

case class DBManager(db: Aux[IO, Unit]) {

  // TODO: Builds a tree. Not nearly as efficent as it should be. The database should do this for you instead of this
  //  terrible work-a-round. Eventually move to Neo4j. For now this works as a POC

  // TODO: This function is terribly inefficent. You need to rework this, Neo4j might be your solution.
  def getAllCoursesInPath(org_id: Int, objectives: List[Int]): Map[Int, DataNode[Task]] = {
    // TODO: Make all queries in here safer and less SQL heavy
    val courses = ({
      for {
        data <- sql"select * from task where parent_org = ${org_id}"
          .query[Task]
          .to[Seq]
      } yield data.map(task => (task.task_id, task)).toMap
    }).transact(db).unsafeRunSync()

    // TODO: Using tuples everywhere is terrible design. If you could get your database (neo4j) to do this for you
    //  it would be based.
    val getPaths =
      sql"""
         |SELECT parent_id, path_id, child_executable_id
         |FROM path, in_path, (
         |    SELECT (executable_id)
         |    FROM executable, task 
         |    WHERE executable.executable_id = task.task_id 
         |    AND task.parent_org = ${org_id} 
         |    UNION 
         |    SELECT (executable_id)
         |    FROM executable, objective 
         |    WHERE executable.executable_id = objective.objective_id
         |    AND objective.parent_org = ${org_id}
         |) as exe 
         |WHERE path.parent_id = exe.executable_id
         |AND in_path.parent_path = path.path_id
         |ORDER BY parent_id, path_id;
         |""".stripMargin

    val paths: Map[Int, List[List[Int]]] = (for {
      raw <- getPaths
        .query[(Int, Int, Int)]
        .to[Seq]
    } yield
      raw
        .foldLeft((Map[Int, List[List[Int]]](), Set[Int]())) { (p, data) =>
          p._1.get(data._1) match {
            case None => (p._1 + (data._1 -> List[List[Int]](List[Int](data._3))), p._2 + data._2)
            case Some(_) =>
              p._2.contains(data._2) match {
                case false => (p._1 + (data._1 -> (List[Int](data._3) :: p._1(data._1))), p._2 + data._2)
                case true  => (p._1 + (data._1 -> ((data._3 :: p._1(data._1).last) :: p._1(data._1).init)), p._2)
              }
          }
        }
        ._1).transact(db).unsafeRunSync()

    // TODO: The absolute state of this entire function man ...
    def buildNodes(
      // List of (previous task_id (parent task_id), current task_id)
      queue: List[(Int, Int)],
      seen: Set[Int] = Set(),
      res: Map[Int, DataNode[Task]] = Map()
    ): Map[Int, DataNode[Task]] = {
      queue match {
        case init :+ last => {
          seen.contains(last._2) match {
            case true =>
              buildNodes(
                init,
                seen,
                res + (last._2 -> res(last._2).copy(parent_id = last._1 :: res(last._2).parent_id))
              )
            case false => {
              val ps = paths.get(last._2) match {
                case Some(ps) => ps
                case None     => List()
              }
              buildNodes(
                init ++ ps.flatten.map(exe_id => (last._2, exe_id)),
                seen + last._2,
                res + (last._2 -> DataNode[Task](courses(last._2), List(last._1), ps))
              )
            }
          }
        }
        case _ => { res }
      }
    }

    buildNodes(objectives.foldLeft(List[(Int, Int)]()) { (ac, o) =>
      paths.get(o) match {
        case None        => ac
        case Some(lists) => lists.flatten.map(task => (o, task)) ++ ac
      }
    })
  }

  // TODO: the .transact() call should be the last thing to happen before a user is returned data. Use a for{} yield
  //  loop to get access to data before it's processed, then transact, then return.
  def query[A: Read](sql: Fragment): IO[Seq[A]] = {
    sql
      .query[A]
      .to[Seq]
      .transact(db)
  }

  def queryDB(cypher: String) = {

    object DatabaseFactory {
      def newDatabase(): Resource[IO, Neo4jTransactor[IO]] = {
        val NEO4J_URI = "bolt://localhost:7687/db/neo4j"
        Neo4jTransactor.create[IO](NEO4J_URI)
      }
    }

  }

}
