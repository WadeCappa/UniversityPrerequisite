defmodule UniversityPrerequisiteBackendWeb.PageController do
  use UniversityPrerequisiteBackendWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
