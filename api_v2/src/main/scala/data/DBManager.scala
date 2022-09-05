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

  def getOrgs(): IO[Output[List[Org]]] = {
    query[Org](sql"select * from organization")
  }

  def getObjectives(org: Org): IO[Output[List[Objective]]] = {
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
  private def getAllCoursesInPath(org: Org, objectives: List[Objective]): ExecutableTree = {
    val courses: List[Task] = rawData[Task](sql"select * from task where parent_org = ${org.organization_id}")

    val courseInfo: Map[Int, Task] = courses.map { task =>
      (task.task_id, task)
    }.toMap

    // parent_task, path_id, child_task
    val paths = rawData[(Int, Int, Int)](
      sql"select parent_id, path_id, child_executable_id from path, task, in_path where path.parent_id = task.task_id and task.parent_org = ${org.organization_id} and in_path.parent_path = path.path_id order by parent_id, path_id"
    )

    // Map[Path_id, List[Task_id]]
    val listOfPaths: Map[Int, List[Int]] = paths.foldLeft(Map[Int, List[Int]]())((ac, t) => {
      ac.exists(_ == t._2) match {
        case false => ac + (t._2 -> List(t._3))
        case true  => ac + (t._2 -> (t._3 :: ac(t._2)))
      }
    })

    val taskMap: Map[Int, List[List[Int]]] = paths.foldLeft(Map[Int, List[List[Int]]]())((ac, t) => {
      ac.exists(_ == t._1) match {
        case false => ac + (t._1 -> List(listOfPaths(t._2)))
        case true  => ac + (t._1 -> (listOfPaths(t._2) :: ac(t._1)))
      }
    })

    val head: ExecutableTree =
      ExecutableTree(Objective(0, org.organization_id, Some("Custom objective"), None), List[ExecutableTree]())

    val res = (parent: ExecutableTree) => {}

    head
  }

  def rawData[A: Read](sql: Fragment): List[A] = {
    sql
      .query[A]
      .to[List]
      .transact(db)
      .unsafeRunSync()
  }

  def query[A: Read](sql: Fragment): IO[Output[List[A]]] = {
    for {
      res <- sql
        .query[A]
        .to[List]
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
