package controllers

import cats.effect.IO

import io.finch._
import io.finch.catsEffect._
import io.finch.circe._

import io.circe.generic.auto._
import doobie.implicits._

import models._
import doobie.util.transactor.Transactor.Aux

case class ViewRoutes(
  getCourses: Endpoint[IO, Seq[Task]],
  getOrgs: Endpoint[IO, Seq[Org]],
  getObjectives: Endpoint[IO, Seq[Objective]]
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

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      for {
        organizations <- sql"select * from organization"
          .query[Org]
          .to[Seq]
          .transact(db)
      } yield Ok(organizations)
    }

    // TODO: Build encoder and decoder for each model, start with Org
    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: jsonBody[Org]) { org: Org =>
      for {
        objectives <- sql"select objective_id, parent_org, objective.title, objective.description from objective, organization where objective.parent_org = ${org.organization_id}"
          .query[Objective]
          .to[Seq]
          .transact(db)
      } yield Created(objectives)
    }

    ViewRoutes(getCourses, getOrgs, getObjectives)
  }
}
