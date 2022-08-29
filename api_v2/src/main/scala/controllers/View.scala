package controllers

import apiData.DBManager
import cats.effect.IO
import io.finch._
import io.finch.catsEffect._
import io.finch.circe._
import io.circe.generic.auto._
import doobie.implicits._
import models._
import shapeless._

case class ViewRoutes(
  getCourses: Endpoint[IO, Seq[Task]],
  getOrgs: Endpoint[IO, Seq[Org]],
  getObjectives: Endpoint[IO, Seq[Objective]]
)

object View extends Route {
  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route. This
  //  needs to be streamlined, I want to repeat myself less.
  def buildRoutes(dbManager: DBManager): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: CNil] = {

    val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
      dbManager.query[Task](sql"select * from task")
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      dbManager.getOrgs()
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: jsonBody[Org]) { org: Org =>
      dbManager.query[Objective](
        sql"select objective_id, parent_org, objective.title, objective.description from objective, organization where objective.parent_org = ${org.organization_id}"
      )
    }

    getCourses :+: getOrgs :+: getObjectives
  }
}
