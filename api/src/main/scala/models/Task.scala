package models

case class Task(
  subject: String,
  number: Int,
  slot_weight: Option[Int],
  title: Option[String],
  description: Option[String]
)
