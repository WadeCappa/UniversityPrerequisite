defmodule BackendWeb.ServeData do
  use BackendWeb, :controller

  def getOrganizations(conn, _params) do
    json conn, BackendWeb.DatabaseManager.fetchData("match (o: Organization) return ID(o) as ordID, o.title as title, o.slots_per_bucket as slots_per_bucket")
  end

  def getObjectives(conn, %{"orgTitle" => organizationTitle} = _params) do
    json conn, BackendWeb.DatabaseManager.fetchData(
      "match (:Organization {title:#{organizationTitle}})-[]->(r:Objective) return ID(r) as id, r.title as title"
    )
  end

  def getInPathTasks(conn, %{"tasks-for" => degrees, "at" => organizationTitle} = _params) do
    json conn, Enum.into(
      Enum.map(
        BackendWeb.DatabaseManager.fetchData(
          "MATCH (:Organization {title:#{organizationTitle}})-[]->(:Executable {title:#{degrees}})-[*..]->(task: Task)
          WITH task, [(task)<-[]-()<-[]-(x:Task) | ID(x)] AS parents,  [(x:Path)<-[]-(task) | [(y:Task)<-[]-(x) | ID(y)]] AS children
          RETURN distinct ID(task) as id, task.subject as subject, task.number as number, task.weight as weight, task.title as title, task.description as description, parents, children
          ORDER BY ID(task)"
        ),
        fn task -> {task["id"], task} end
      ),
      %{}
    )
  end
end
