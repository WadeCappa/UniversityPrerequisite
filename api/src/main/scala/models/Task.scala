package models

case class Task(
  task_id: Int,
  subject: String,
  number: Int,
  slot_weight: Option[Int],
  title: Option[String],
  description: Option[String]
)
