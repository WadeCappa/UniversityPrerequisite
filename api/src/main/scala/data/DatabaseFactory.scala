package apiData

import cats.effect.{Blocker, IO, Resource}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import neo4s.core.Neo4jTransactor
import org.neo4j.driver.{Config, Logging}

object TransactorFactory {
  def newTransactor(): Resource[IO, Neo4jTransactor[IO]] = {
    implicit val cs = IO.contextShift(ExecutionContexts.synchronous)
    // TODO: Move this to an environment variable
    val NEO4J_URI = "bolt://localhost:7687/db/neo4j"

    Neo4jTransactor
      .create[IO](
        NEO4J_URI,
        Config.builder().withLogging(Logging.slf4j()).build(),
        org.neo4j.driver.AuthTokens.basic("neo4j", "notproductionpassword")
      )
  }
}
