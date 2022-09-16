package models

case class DataNode[T](
  data: T,
  parent_id: List[Int],
  child_ids: List[List[Int]]
)
