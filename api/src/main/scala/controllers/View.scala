package controllers

import apiData.DBManager
import cats.effect.IO
import io.finch._
import io.finch.catsEffect._
import neo4s.core.{CypherQuery, Neo4jTransactor}
import models._
import neo4s.implicits._
import shapeless._

object ViewFactory extends Route {

  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route. This
  //  needs to be streamlined, I want to repeat myself less.
  def getRoutes(
    dbManager: DBManager
  ): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: Map[Int, DataNode[Task]] :+: CNil] = {

    val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
      dbManager.buildQuery[Task](cypher"match (p :Task) return ID(p), p.subject, p.number, p.weight, p.title")
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      dbManager.buildQuery[Org](cypher"match (o: Organization) return ID(o), o.title, o.slots_per_bucket")
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: path[String]) { org_title: String =>
      dbManager.buildQuery[Objective](
        cypher"match (:Organization {title:$org_title})-[]->(r:Objective) return ID(r), r.title"
      )
    }

    val getCourseMapping: Endpoint[IO, Map[Int, DataNode[Task]]] =
      get("tasks-for" :: path[String]) { objective: String =>
        dbManager
          .buildQuery[(Int, String, Int, Option[Int], Option[String], Option[String], List[Int], List[List[Int]])](
            cypher"""
          MATCH (:Executable {title:"B.S in Computer Science"})-[*..]->(task: Task)
          WITH task, [(task)<-[]-()<-[]-(x:Task) | ID(x)] AS parents,  [(x:Path)<-[]-(task) | [(y:Task)<-[]-(x) | ID(y)]] AS children
          RETURN distinct ID(task), task.subject, task.number, task.weight, task.title, task.description, parents, children
          ORDER BY ID(task)"""
          )
          .map(
            _.map(
              _.map(
                row =>
                  row._1 -> (
                    DataNode(
                      Task(row._1, row._2, row._3, row._4, row._5, row._6),
                      row._7,
                      row._8
                    )
                )
              ).toMap
            )
          )
      }

    getCourses :+: getOrgs :+: getObjectives :+: getCourseMapping
  }
}
