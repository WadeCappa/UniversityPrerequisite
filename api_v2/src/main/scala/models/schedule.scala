package models

case class schedule(
  schedule_id: Int,
  title: String,
  head_bucket: Int
) extends Repository(repo_id = schedule_id)
