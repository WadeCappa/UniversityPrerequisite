package models

case class DataNode[T](
  taskData: T,
  parents: List[Int],
  children: List[List[Int]]
)
