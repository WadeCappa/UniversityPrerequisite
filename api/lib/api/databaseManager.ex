defmodule Api.DatabaseManager do
  def createResponse([], data, res), do: res
  def createResponse([head | tail], [], res), do: createResponse(tail, [], Map.put(res, head, nil))
  def createResponse([c | cols], [d | data], res), do: createResponse(cols, data, Map.put(res, c, d))

  def resolveQuery(q) do
    {:ok, res} = Api.Repo.query(q)
    cols = Enum.map(res.columns, fn(s) -> String.to_atom(s) end)
    res.rows |>
      Enum.map(fn(row) -> createResponse(cols, row, %{}) end)
  end
end
