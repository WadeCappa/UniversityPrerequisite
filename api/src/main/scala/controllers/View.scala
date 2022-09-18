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
import neo4s.implicits._
import shapeless._

object ViewFactory extends Route {

  // TODO: Make this return type generic. I don't want to have to type out this garbage just to add a new route. This
  //  needs to be streamlined, I want to repeat myself less.
  def getRoutes(
    dbManager: DBManager
  ): Endpoint[IO, Seq[Task] :+: Seq[Org] :+: Seq[Objective] :+: CNil] = {

    val getCourses: Endpoint[IO, Seq[Task]] = get("courses") {
      dbManager.buildEndpoint[Task](cypher"match (p :Task) return p.subject, p.number, p.slot_weight, p.title")
    }

    val getOrgs: Endpoint[IO, Seq[Org]] = get("orgs") {
      dbManager.buildEndpoint[Org](cypher"match (o: Organization) return o.title, o.slots_per_bucket")
    }

    val getObjectives: Endpoint[IO, Seq[Objective]] = get("objective" :: path[String]) { org_title: String =>
      dbManager.buildEndpoint[Objective](
        cypher"match (:Organization {title:$org_title})-[]->(r:Objective) return r.title"
      )
    }

    // TODO: Use the cypher query below to build a mapping between each Task's parents and their children.
    //  The data of the task should only be sent once, the child and parent mappings should be by keys only.
    // match (:Executable {title:"B.S in Computer Science"})-[*..]->(t: Task)
    // match (t)-[h:HAS]->(p:Path)-[con:CONTAINS]->(c:Task) return distinct t.subject, t.number,ID(p), c.subject, c.number
    // order by ID(p)

    getCourses :+: getOrgs :+: getObjectives
  }
}
