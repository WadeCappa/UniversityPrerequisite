package main.scala

import com.twitter.finagle.{Http, ListeningServer}
import com.twitter.util.Future
import cats.effect.{ExitCode, IO, IOApp, Resource}
import io.finch._
import io.finch.circe._
import io.circe.generic.auto._
import doobie.util.transactor.Transactor.Aux

import controllers.View
import apiData.DatabaseFactory

object Main extends IOApp {

  // TODO: Add the ability to pass args to this from the command line, will be important for future configurations
  val db: Aux[IO, Unit] = DatabaseFactory.newDatabase()

  def startServer: IO[ListeningServer] = {
    // TODO: Reduce the number of times you repeat yourself here. Each route must be declared in a controller, declared
    //  in it's case class, and then individually referenced in the .serve() call. This is bad.
    val viewRoutes = View.buildRoutes(db)
    IO(
      Http.server.serve(
        ":8081",
        (viewRoutes.getCourses :+: viewRoutes.getOrgs :+: viewRoutes.getObjectives).toServiceAs[Application.Json]
      )
    )
  }

  def run(args: List[String]): IO[ExitCode] = {
    val server = Resource.make(startServer)(s => IO.suspend(implicitly[ToAsync[Future, IO]].apply(s.close())))
    server.use(_ => IO.never).as(ExitCode.Success)
  }

  // TODO: Figure out how to run the server from the command line instead of through this function call
  run(List[String]())
}
