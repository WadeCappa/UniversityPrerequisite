defmodule ApiWeb.ObjectiveTasksController do
  use ApiWeb, :controller

  def objectiveTasks(conn, %{"objective" => objective, "organization" => organization} = params) do
    taskQuery =
      "SELECT subject, number, task.title, task.description, slot_weight, task_id
      FROM task, organization
      WHERE organization.title = '#{organization}'
      AND parent_org = organization_id;"

    prereqQuery =
      "SELECT
      FROM task, organization, path
      WHERE organization.title = '#{organization}'
      AND parent_org = organization_id;"

    tasks   = taskQuery   |> Api.DatabaseManager.resolveQuery
    prereqs = prereqQuery |> Api.DatabaseManager.resolveQuery
  end
end
