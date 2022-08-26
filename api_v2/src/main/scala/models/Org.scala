package models

case class Org(
  organization_id: Int,
  title: String,
  description: String,
  location: String,
  slots_per_bucket: Int
) extends Repository(repo_id = organization_id)
