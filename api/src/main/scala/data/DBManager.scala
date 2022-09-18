package apiData

import cats.effect.IO
import doobie.util.transactor.Transactor.Aux
import neo4s.implicits._
import neo4s.core.Neo4jTransactor
import neo4s.utils.Read
import io.finch._
import neo4s.core.CypherQuery
import models.{DataNode, Task}
import org.neo4j.driver.{Config, Logging}

case class DBManager(db: Aux[IO, Unit]) {

  def objectiveTasks(objectives: Seq[String]): IO[Output[Map[Int, DataNode[Task]]]] = {
    val cypher = cypher"""
      match (:Executable {title:"B.S in Computer Science"})-[*..]->(t: Task)
      match (t)-[h:HAS]->(p:Path)-[con:CONTAINS]->(c:Task) return distinct ID(t), t.subject, t.number, t.title, t.weight,ID(p), ID(c)
      order by ID(p)"""

    val data = (for {
      res <- cypher
        .query[(Int, String, Int, String, Int, Int, Int)]
        .list
        .map(
          _.map(tup => tup._1 -> (Task(tup._1, tup._2, tup._3, Some(tup._5), Some(tup._4), None), tup._6, tup._7)).toMap
        )
    } yield res).transact(transactor)

    val parentsToChildren: Map[Int, List[List[Int]]] =
  }

  private def getData[A: Read](transactor: Neo4jTransactor[IO], cypher: CypherQuery): IO[Seq[A]] = {

    val query = for {
      result <- cypher.query[A].list.map(_.toSeq)
    } yield result

    query
      .transact(transactor)
  }

  def buildQuery[A: Read](cypher: CypherQuery): IO[Output[Seq[A]]] = {
    buildEndpoint[A](getData[A], cypher)
  }

  private def buildEndpoint[A: Read](
    func: (Neo4jTransactor[IO], CypherQuery) => IO[Seq[A]],
    cypher: CypherQuery
  ): IO[Output[Seq[A]]] = {

    useTransactor[A](func, cypher).map(row => {
      Ok(row)
    })
  }

  private def useTransactor[A: Read](
    func: (Neo4jTransactor[IO], CypherQuery) => IO[Seq[A]],
    cypher: CypherQuery
  ): IO[Seq[A]] = {

    // TODO: Move this to an environment variable
    val NEO4J_URI = "bolt://localhost:7687/db/neo4j"

    Neo4jTransactor
      .create[IO](
        NEO4J_URI,
        Config.builder().withLogging(Logging.slf4j()).build(),
        org.neo4j.driver.AuthTokens.basic("neo4j", "notproductionpassword")
      )
      .use { transactor =>
        func(transactor, cypher)
      }

  }
}
