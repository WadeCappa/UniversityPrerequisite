package apiData

import cats.effect.{Blocker, IO}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import doobie.util.fragment.Fragment
import doobie.util.Read

import io.finch._
import doobie.implicits._

case class DBManager(db: Aux[IO, Unit]) {

  def query[A: Read](sql: Fragment): IO[Output[Seq[A]]] = {
    for {
      res <- sql
        .query[A]
        .to[Seq]
        .transact(db)
    } yield Ok(res)
  }
}

object DatabaseFactory {
  def newDatabase(): Aux[IO, Unit] = {
    implicit val cs = IO.contextShift(ExecutionContexts.synchronous)
    Transactor.fromDriverManager[IO](
      "org.postgresql.Driver", // driver classname
      "jdbc:postgresql:university_prereq", // connect URL (driver-specific)
      "postgres", // user
      "postgres", // password
      Blocker.liftExecutionContext(ExecutionContexts.synchronous)
    )
  }
}
