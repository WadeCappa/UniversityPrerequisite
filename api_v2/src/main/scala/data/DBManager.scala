package apiData

import cats.effect.{Blocker, ExitCode, IO}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import doobie.util.fragment.Fragment
import doobie.util.Read
import io.finch._
import doobie.implicits._
import models._

import scala.collection.mutable

case class DBManager(db: Aux[IO, Unit]) {

  def getOrgs(): IO[Output[Seq[Org]]] = {
    query[Org](sql"select * from organization")
  }

  def getObjectives(org: Org): IO[Output[Seq[Objective]]] = {
    query[Objective](
      sql"select objective_id, parent_org, objective.title, objective.description from objective, organization where objective.parent_org = ${org.organization_id}"
    )
  }

  // TODO: Given an executable, return a tree which relates each returned course to it's pre-requisites as its
  //  children. This will be the minimal required data structure to return to the user to provide value. For use
  //  when the user goes to first start a schedule.
  // def getCourses(exe: Executable): IO[Output[ExecutableTree]] = {}

  // TODO: Builds a tree. Not nearly as efficent as it should be. The database should do this for you instead of this
  //  terrible work-a-round. Eventually move to Neo4j. For now this works as a POC

  // TODO: This function is terribly inefficent. You need to rework this, Neo4j might be your solution.
  def getAllCoursesInPath(org: Org, objectives: List[Executable]): Map[Int, DataNode[Task]] = {
    val courses: Map[Int, Task] =
      rawData[Task](sql"select * from task where parent_org = ${org.organization_id}").map { task =>
        (task.task_id, task)
      }.toMap

    val paths: Map[Int, List[List[Int]]] = (rawData[(Int, Int, Int)](
      sql"select parent_id, path_id, child_executable_id from path, task, in_path where path.parent_id = task.task_id and task.parent_org = ${org.organization_id} and in_path.parent_path = path.path_id order by parent_id, path_id"
    ) ++ rawData[(Int, Int, Int)](
      sql"select objective_id, path_id, child_executable_id from path, objective, in_path where path.parent_id = objective.objective_id and objective.parent_org = ${org.organization_id} and in_path.parent_path = path.path_id order by parent_id, path_id"
    )).foldLeft((Map[Int, List[List[Int]]](), Set[Int]())) { (p, data) =>
        p._1.get(data._1) match {
          case None => (p._1 + (data._1 -> List[List[Int]](List[Int](data._3))), p._2 + data._2)
          case Some(_) =>
            p._2.contains(data._2) match {
              case false => (p._1 + (data._1 -> (List[Int](data._3) :: p._1(data._1))), p._2 + data._2)
              case true  => (p._1 + (data._1 -> ((data._3 :: p._1(data._1).last) :: p._1(data._1).init)), p._2)
            }
        }
      }
      ._1

    Console.println(paths)
    Console.println(
      s"At ${objectives.head.executable_id} -> ${paths(objectives.head.executable_id)}"
    )

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

    val data = objectives.foldLeft(List[(Int, Int)]()) { (ac, o) =>
      paths.get(o.executable_id) match {
        case None        => ac
        case Some(lists) => lists.flatten.map(task => (o.executable_id, task)) ++ ac
      }
    }

    Console.println(data)
    Console.println(
      s"At ${data.head} -> ${paths(data.head._2)}"
    )

    buildNodes(data)
  }

  def rawData[A: Read](sql: Fragment): List[A] = {
    sql
      .query[A]
      .to[List]
      .transact(db)
      .unsafeRunSync()
  }

  def query[A: Read](sql: Fragment): IO[Output[Seq[A]]] = {
    for {
      res <- sql
        .query[A]
        .to[Seq]
        .transact(db)
    } yield Ok(res)
  }
}

object DatabaseFactory {
  def newDatabase(): Aux[IO, Unit] = {
    implicit val cs = IO.contextShift(ExecutionContexts.synchronous)
    Transactor.fromDriverManager[IO](
      "org.postgresql.Driver", // driver classname
      "jdbc:postgresql:university_prereq", // connect URL (driver-specific)
      "postgres", // user
      "postgres", // password
      Blocker.liftExecutionContext(ExecutionContexts.synchronous)
    )
  }
}
