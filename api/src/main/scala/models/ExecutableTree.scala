package models

case class ExecutableTree(
  parent: Executable,
  children: List[ExecutableTree]
)
