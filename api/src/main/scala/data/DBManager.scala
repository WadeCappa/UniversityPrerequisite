package apiData

import cats.effect.IO
import doobie.util.transactor.Transactor.Aux
import neo4s.implicits._
import neo4s.core.Neo4jTransactor
import neo4s.utils.Read
import io.finch._
import neo4s.core.CypherQuery
import org.neo4j.driver.{Config, Logging}

case class DBManager() {

  def buildQuery[A: Read](
    cypher: CypherQuery
  ): IO[Output[Seq[A]]] = {
    buildEndpoint[Seq[A]](dataAsSeq[A], cypher)
  }

  private def dataAsSeq[A: Read](transactor: Neo4jTransactor[IO], cypher: CypherQuery): IO[Seq[A]] = {

    val query = for {
      result <- cypher.query[A].list.map(_.toSeq)
    } yield result

    query
      .transact(transactor)
  }

  private def buildEndpoint[A](
    func: (Neo4jTransactor[IO], CypherQuery) => IO[A],
    cypher: CypherQuery
  ): IO[Output[A]] = {

    useTransactor[A](func, cypher).map(row => {
      Ok(row)
    })
  }

  private def useTransactor[A](
    func: (Neo4jTransactor[IO], CypherQuery) => IO[A],
    cypher: CypherQuery
  ): IO[A] = {
    TransactorFactory
      .newTransactor()
      .use { transactor =>
        func(transactor, cypher)
      }
  }
}
