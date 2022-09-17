val scala3Version = "2.13.0"

lazy val root = project
  .in(file("."))
  .settings(
    name := "api",
    version := "0.1.0-SNAPSHOT",
    scalaVersion := scala3Version,
    scalacOptions += "-Ypartial-unification",
    libraryDependencies += "org.scalameta" %% "munit" % "0.7.29" % Test,
    libraryDependencies ++= Seq(
      // NOTE: using finchx instead of finch allows us to use polymorphic Endpoint[F[_], T]
      "io.circe" %% "circe-generic" % "0.13.0",
      "io.circe" %% "circe-core" % "0.13.0",
      "com.github.finagle" %% "finchx-core" % "0.33.0",
      "com.github.finagle" %% "finchx-circe" % "0.33.0",
      "org.typelevel" %% "cats-effect" % "2.1.3",
      "org.typelevel" %% "cats-core" % "2.1.1",
      "org.xerial" % "sqlite-jdbc" % "3.31.1",
      "org.tpolecat" %% "doobie-core" % "0.8.8",
      "org.tpolecat" %% "doobie-postgres" % "0.8.8",
      "com.nryanov.neo4s" %% "neo4s-core" % "0.2.0"
    )
  )
