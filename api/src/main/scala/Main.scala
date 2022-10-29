package main.scala

import com.twitter.finagle.{Http, ListeningServer}
import com.twitter.util.Future
import cats.effect.{ExitCode, IO, IOApp, Resource}
import io.finch._
import io.finch.circe._
import io.circe.generic.auto._

import com.twitter.finagle.http.filter.Cors
import com.twitter.finagle.http.{Request, Response}
import com.twitter.finagle.Service

import apiData._
import controllers.dataController.ViewFactory
import controllers.dataController.DataController

object Main extends IOApp {
  val dbManager = DBManager();
  def startServer: IO[ListeningServer] = {
    // TODO: Reduce the number of times you repeat yourself here. Each route must be declared in a controller, returned
    //  in an easy to manipulate format, and the combined with the other controllers

    val policy: Cors.Policy = Cors.Policy(
      allowsOrigin = _ => Some("*"),
      allowsMethods = _ => Some(Seq("GET", "POST")),
      allowsHeaders = _ => Some(Seq("Accept"))
    )

    val dataViews = DataController.generateViews(dbManager)

    IO(
      Http.server.serve(
        ":8081",
        new Cors.HttpFilter(policy).andThen(
          (
            dataViews.getOrgs :+:
              dataViews.getOrgCourses :+:
              dataViews.getCourseMapping :+:
              dataViews.getObjectives
          ).toServiceAs[Application.Json]
        )
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
