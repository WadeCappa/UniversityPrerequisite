package main.scala

import com.twitter.finagle.{Http, ListeningServer}
import com.twitter.util.Future
import cats.effect.{ExitCode, IO, IOApp, Resource}
import io.finch._
import io.finch.circe._
import io.circe.generic.auto._
import controllers.View
import apiData._

object Main extends IOApp {

  // TODO: Add the ability to pass args to this from the command line, will be important for future configurations
  val dbManager = DBManager(DatabaseFactory.newDatabase())

  def startServer: IO[ListeningServer] = {
    // TODO: Reduce the number of times you repeat yourself here. Each route must be declared in a controller, returned
    //  in an easy to manipulate format, and the combined with the other controllers
    IO(Http.server.serve(":8081", View.buildRoutes(dbManager).toServiceAs[Application.Json]))
  }

  def run(args: List[String]): IO[ExitCode] = {
    val server = Resource.make(startServer)(s => IO.suspend(implicitly[ToAsync[Future, IO]].apply(s.close())))
    server.use(_ => IO.never).as(ExitCode.Success)
  }

  // TODO: Figure out how to run the server from the command line instead of through this function call
  run(List[String]())
}
