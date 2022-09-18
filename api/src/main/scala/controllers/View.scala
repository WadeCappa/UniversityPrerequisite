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

    // TODO: Need one more route that gives the front-end a mapping between tasks and their parents and children.

    getCourses :+: getOrgs :+: getObjectives
  }
}
