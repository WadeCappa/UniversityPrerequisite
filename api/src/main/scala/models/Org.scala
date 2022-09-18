package models

case class Org(
  title: Option[String],
  slots_per_bucket: Option[Int],
  description: Option[String],
  location: Option[String],
)
