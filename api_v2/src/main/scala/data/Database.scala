package apiData

import cats.effect.{Blocker, IO}
import doobie.util.ExecutionContexts
import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux

import models.{Executable, Objective, Task}

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