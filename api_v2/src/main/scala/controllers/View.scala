package main.scala.controllers

import cats.effect.IO
import io.finch.{Endpoint, _}
import io.finch.catsEffect._
import doobie.implicits._
import main.scala.models.Task
import doobie.util.transactor.Transactor.Aux

case class ViewRoutes(
  getCourses: Endpoint[IO, Seq[Task]],
  test: Endpoint[IO, String]
)

object View extends Route {
  def buildRoutes(db: Aux[IO, Unit]): ViewRoutes = {
    val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
      for {
        courses <- sql"select * from task"
          .query[Task]
          .to[Seq]
          .transact(db)
      } yield Ok(courses)
    }

    val test: Endpoint[IO, String] = get("test") {
      Ok("Hello, World!")
    }

    ViewRoutes(getCourses, test)
  }
}
