package controllers

import apiData.DBManager
import cats.effect.IO
import io.finch._
import io.finch.catsEffect._
import doobie.implicits._
import models._
import shapeless._

object ViewFactory extends Route {

  private def buildEndpoint[T](f: () => IO[Seq[T]]): IO[Output[Seq[T]]] = {
    for {
      res <- f()
    } yield Ok(res)
  }

  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route. This
  //  needs to be streamlined, I want to repeat myself less.
  def getRoutes(
    dbManager: DBManager
  ): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: Map[Int, DataNode[Task]] :+: CNil] = {

    val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
      buildEndpoint[Task](() => dbManager.query[Task](sql"select * from task"))
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      buildEndpoint[Org](() => dbManager.query[Org](sql"select * from organization"))
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: path[Int]) { org_id: Int =>
      buildEndpoint[Objective](() => {
        dbManager.query[Objective](
          sql"select objective_id, parent_org, objective.title, objective.description from objective, organization where objective.parent_org = ${org_id}"
        )
      })
    }

    val getTasks: Endpoint[IO, Map[Int, DataNode[Task]]] = get("tasks" :: path[Int] :: path[String]) {
      (org_id: Int, objectives: String) =>
        Ok(dbManager.getAllCoursesInPath(org_id, objectives.split('-').map(_.toInt).toList))
    }

    getCourses :+: getOrgs :+: getObjectives :+: getTasks
  }
}
