package models

case class Objective(
  objective_id: Int,
  parent_org: Int,
  title: Option[String],
  description: Option[String]
) extends Executable {
  override val executable_id: Int = objective_id
}
