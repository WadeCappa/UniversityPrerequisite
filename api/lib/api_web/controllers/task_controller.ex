defmodule ApiWeb.TaskController do
  use ApiWeb, :controller

  def createResponse([], data, res), do: res
  def createResponse([head | tail], [], res), do: createResponse(tail, [], Map.put(res, head, nil))
  def createResponse([c | cols], [d | data], res), do: createResponse(cols, data, Map.put(res, c, d)) 

  def index(conn, _params) do
    {:ok, res} = Api.Repo.query("select * from task;")
    cols = Enum.map(res.columns, fn(s) -> String.to_atom(s) end)

    roles = Enum.map(res.rows, fn(row) -> 
      createResponse(cols, row, %{})
    end)

    json(conn, %{data: roles})
  end
end