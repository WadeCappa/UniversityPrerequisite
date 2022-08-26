package models

case class Task(
  task_id: Int,
  parent_org: Int,
  subject: String,
  number: String,
  slot_weight: Option[Int],
  title: Option[String],
  description: Option[String]
) extends Executable {
  override val executable_id: Int = task_id
}
