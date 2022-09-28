package models

case class Task(
  taskID: Int,
  subject: String,
  number: Int,
  slotWeight: Option[Int],
  title: Option[String],
  description: Option[String]
)
