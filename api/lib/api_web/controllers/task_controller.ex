defmodule ApiWeb.TaskController do
  use ApiWeb, :controller

  def index(conn, _params) do
    json(conn, %{test: "data"})
  end
end