defmodule ApiWeb.RawController do
  use ApiWeb, :controller

  def allOrgTasks(conn, %{"org" => org} = params) do
    query =
      "SELECT subject, number, task.title, task.description, slot_weight
      FROM task, organization
      WHERE organization.title = '#{org}'
      AND parent_org = organization_id;"

    json(conn, %{res: query |> Api.DatabaseManager.resolveQuery})
  end

  def allTasks(conn, _params) do
    query = "SELECT subject, number, title, description, slot_weight FROM task;"
    json(conn, %{res: query |> Api.DatabaseManager.resolveQuery})
  end

  def allOrgObjectives(conn, %{"org" => org} = params) do
    query =
      "SELECT objective_id, parent_org, ob.title, ob.description
      FROM objective as ob, organization
      WHERE organization.title = '#{org}'
      AND parent_org = organization_id;"

    json(conn, %{res: query |> Api.DatabaseManager.resolveQuery})
  end

  def simplifiedTasks(conn, %{"org" => org} = params) do
    query =
      "SELECT subject, number
      FROM task, organization
      WHERE organization.title = '#{org}'
      AND parent_org = organization_id;"

    json(conn, %{res: query |> Api.DatabaseManager.resolveQuery})
  end

  def getTask(conn, %{"subject" => subject, "number" => number} = params) do
    query =
      "SELECT subject, number, task.title, task.description, slot_weight
      FROM task
      WHERE subject = '#{subject}'
      AND number = '#{number}';"

    json(conn, %{res: query |> Api.DatabaseManager.resolveQuery})
  end

  # split up queries logically, figure out what sort of data you have to return
  # and compartimentalize accordingly into controllers. You only need to support
  # a couple of queries. This isn't really an API as much as it is a microservice.

  # Make a plug that takes the JSON output and adds status messages to it, such as
  # OK or FAILED: ERROR_CODE to help the user with the api.
end
