package controllers

import apiData.DBManager
import cats.effect.IO
import io.finch._
import io.finch.catsEffect._
import models._
import neo4s.implicits._
import shapeless._

// TODO: For all of these routes pass arguments through JSON, not through url headers. <-- VERY IMPORTANT
object ViewFactory extends Route {

  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route.
  def getRoutes(
    dbManager: DBManager
  ): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: Map[Int, DataNode[Task]] :+: CNil] = {

    val getOrgCourses: Endpoint[IO, Seq[Task]] = get("courses" :: path[String]) { org: String =>
      dbManager.buildQuery[Task](
        cypher"match (:Organization {title:$org})-[]->(t:Task) return ID(t), t.subject, t.number, t.weight, t.title"
      )
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      dbManager.buildQuery[Org](cypher"match (o: Organization) return ID(o), o.title, o.slots_per_bucket")
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: path[String]) { org_title: String =>
      dbManager.buildQuery[Objective](
        cypher"match (:Organization {title:$org_title})-[]->(r:Objective) return ID(r), r.title"
      )
    }

    // TODO: The use of tuples here is very ugly, try to map directly to DataNode. Might have to read neo4s docs
    //  on if this type coercion is possible.
    // TODO: Make sure this takes a list of IDs (as integers) as a parameter, these must map to executables.
    val getCourseMapping: Endpoint[IO, Map[Int, DataNode[Task]]] =
      get("tasks-for" :: path[String] :: "at" :: path[String]) { (objective: String, university: String) =>
        dbManager
          .buildQuery[(Int, String, Int, Option[Int], Option[String], Option[String], List[Int], List[List[Int]])](
            cypher"""
          MATCH (:Organization {title:$university})-[]->(:Executable {title:$objective})-[*..]->(task: Task)
          WITH task, [(task)<-[]-()<-[]-(x:Task) | ID(x)] AS parents,  [(x:Path)<-[]-(task) | [(y:Task)<-[]-(x) | ID(y)]] AS children
          RETURN distinct ID(task), task.subject, task.number, task.weight, task.title, task.description, parents, children
          ORDER BY ID(task)"""
          )
          .map(
            _.map(
              _.map(row => row._1 -> DataNode(Task(row._1, row._2, row._3, row._4, row._5, row._6), row._7, row._8)).toMap
            )
          )
      }

    getOrgCourses :+: getOrgs :+: getObjectives :+: getCourseMapping
  }
}
