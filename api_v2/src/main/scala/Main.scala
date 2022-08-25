package main.scala

import com.twitter.finagle.{Http, ListeningServer}
import com.twitter.util.Future

import cats.effect.{IO, IOApp, Blocker, ExitCode, Resource}
import cats.effect.syntax._

import io.finch._
import io.finch.catsEffect._
import io.finch.circe._

import io.circe.generic.auto._

import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie._
import doobie.implicits._

import main.scala.models.Task

object Main extends IOApp {
  implicit val cs = IO.contextShift(ExecutionContexts.synchronous)

  val xa = Transactor.fromDriverManager[IO](
    "org.postgresql.Driver",     // driver classname
    "jdbc:postgresql:university_prereq",     // connect URL (driver-specific)
    "postgres",                  // user
    "postgres",                           // password
  )

  val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
    for {
      courses <- sql"select * from task"
        .query[Task]
        .to[Seq]
        .transact(xa)
    } yield Ok(courses)
  }

  val test: Endpoint[IO, String] = get("test") { Ok("Hello, World!") } 

  def startServer: IO[ListeningServer] =
    IO(Http.server.serve(":8081",  (test :+: getCourses) .toServiceAs[Application.Json]))

  def run(args: List[String]): IO[ExitCode] = {
    val server = Resource.make(startServer)(s =>
      IO.suspend(implicitly[ToAsync[Future, IO]].apply(s.close()))
    )

    server.use(_ => IO.never).as(ExitCode.Success)
  }

  run(List[String]())

}