package models

case class Schedule(
  schedule_id: Int,
  title: String,
  head_bucket: Int
) extends Repository {
  override val repo_id = schedule_id
}
