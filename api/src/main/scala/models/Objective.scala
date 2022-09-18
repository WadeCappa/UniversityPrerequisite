package models

case class Objective(
  objective_id: Int,
  title: Option[String],
  description: Option[String]
)
