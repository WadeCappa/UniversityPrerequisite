package models

case class DataNode[T](
  data: T,
  parents: List[Int],
  children: List[List[Int]]
)
