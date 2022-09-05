package controllers

import apiData.DBManager
import cats.effect.IO
import io.finch._
import io.finch.catsEffect._
import doobie.implicits._
import models._
import shapeless._

object View extends Route {
  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route. This
  //  needs to be streamlined, I want to repeat myself less.
  def buildRoutes(
    dbManager: DBManager
  ): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: Map[Int, DataNode[Task]] :+: CNil] = {

    val getCourses: Endpoint[IO, Seq[Task]] = get("courses" :: path[Int]) { id: Int =>
      Console.println(id)
      dbManager.query[Task](sql"select * from task")
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      dbManager.getOrgs()
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: path[Int]) { org_id: Int =>
      dbManager.query[Objective](
        sql"select objective_id, parent_org, objective.title, objective.description from objective, organization where objective.parent_org = ${org_id}"
      )
    }

    val getTasks: Endpoint[IO, Map[Int, DataNode[Task]]] = get("tasks" :: path[Int] :: path[String]) {
      (org_id: Int, objectives: String) =>
        Ok(dbManager.getAllCoursesInPath(org_id, objectives.split('-').map(_.toInt).toList))
    }

    getCourses :+: getOrgs :+: getObjectives :+: getTasks
  }
}
