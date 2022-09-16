package models

case class Org(
  organization_id: Int,
  title: Option[String],
  description: Option[String],
  location: Option[String],
  slots_per_bucket: Option[Int]
) extends Repository {
  override val repo_id = organization_id
}
