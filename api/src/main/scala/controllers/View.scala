package controllers

import apiData.DBManager
import cats.effect.IO
import io.finch._
import io.finch.catsEffect._
import doobie.implicits._
import doobie.util.fragment.Fragment
import doobie.util.Read
import doobie.util.transactor.Transactor.Aux
import models._
import shapeless._

object ViewFactory extends Route {

  private def buildEndpoint[T: Read](db: Aux[IO, Unit], sql: Fragment): IO[Output[Seq[T]]] = {
    sql
      .query[T]
      .to[Seq]
      .map(row => Ok(row))
      .transact(db)
  }

  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route. This
  //  needs to be streamlined, I want to repeat myself less.
  def getRoutes(
    dbManager: DBManager
  ): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: Map[Int, DataNode[Task]] :+: CNil] = {

    val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
      buildEndpoint[Task](dbManager.db, sql"select * from task")
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      buildEndpoint[Org](dbManager.db, sql"select * from organization")
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: path[Int]) { org_id: Int =>
      val sql =
        sql"select objective_id, parent_org, objective.title, objective.description from objective, organization where objective.parent_org = ${org_id}"
      buildEndpoint[Objective](dbManager.db, sql)
    }

    val getTasks: Endpoint[IO, Map[Int, DataNode[Task]]] = get("tasks" :: path[Int] :: path[String]) {
      (org_id: Int, objectives: String) =>
        Ok(dbManager.getAllCoursesInPath(org_id, objectives.split('-').map(_.toInt).toList))
    }

    getCourses :+: getOrgs :+: getObjectives :+: getTasks
  }
}
