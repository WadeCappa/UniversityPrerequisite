package models

case class Objective(
  objective_id: Int,
  parent_org: Int,
  title: String,
  description: String
) extends Executable(executable_id = objective_id)
