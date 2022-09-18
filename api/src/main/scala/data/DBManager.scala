package apiData

import cats.effect.IO
import doobie.util.transactor.Transactor.Aux
import doobie.util.fragment.Fragment
import doobie.util.Read
import neo4s.implicits._
import neo4s.core.Neo4jTransactor
import io.finch._
import doobie.implicits._
import models._
import neo4s.core.CypherQuery
import org.neo4j.driver.{Config, Logging}

case class DBManager(db: Aux[IO, Unit]) {

  def buildEndpoint[A: neo4s.utils.Read](cypher: CypherQuery): IO[Output[Seq[A]]] = {
    def _query(transactor: Neo4jTransactor[IO], cypher: CypherQuery): IO[Seq[A]] = {

      val query = for {
        result <- cypher.query[A].list.map(_.toSeq)
      } yield result

      query
        .transact(transactor)
    }

    useTransactor[A](_query, cypher).map(row => {
      Console.println(row)
      Ok(row)
    })
  }

  private def useTransactor[A: neo4s.utils.Read](
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
