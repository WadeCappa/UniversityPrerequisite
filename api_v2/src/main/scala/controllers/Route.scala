package main.scala.controllers

import com.twitter.finagle.{Http, ListeningServer}
import com.twitter.util.Future
import cats.effect.{Blocker, ExitCode, IO, IOApp, Resource}
import io.finch._
import io.finch.catsEffect._
import io.finch.circe._
import io.circe.generic.auto._
import doobie.implicits._
import doobie.util.transactor.Transactor.Aux
import main.scala.models.Task
import main.scala.data.DatabaseFactory

trait Route {
  // TODO: Add the ability to pass args to this from the command line, will be important for future configurations
  val db = DatabaseFactory.newDatabase()
}
