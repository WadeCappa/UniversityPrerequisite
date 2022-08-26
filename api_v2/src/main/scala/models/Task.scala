package models

case class Task(
  task_id: Int,
  parent_org: Int,
  subject: String,
  number: String,
  slot_weight: Option[Int],
  title: Option[String],
  description: Option[String]
) extends Executable(executable_id = task_id)
