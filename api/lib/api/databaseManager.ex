defmodule Api.DatabaseManager do
  def createResponse([], data, res), do: res
  def createResponse([head | tail], [], res), do: createResponse(tail, [], Map.put(res, head, nil))
  def createResponse([c | cols], [d | data], res), do: createResponse(cols, data, Map.put(res, c, d))

  def cleanStrings([], res), do: Enum.reverse(res)
  def cleanStrings([head | tail], res) when is_binary(head), do: cleanStrings(tail, [String.trim(head) | res])
  def cleanStrings([head | tail], res), do: cleanStrings(tail, [head | res])

  def resolveQuery(q) do
    {:ok, res} = Api.Repo.query(q)
    cols = Enum.map(res.columns, fn(s) -> String.to_atom(s) end)
    res.rows |>
      Enum.map(fn(row) -> cleanStrings(row, []) end) |>
      Enum.map(fn(row) -> createResponse(cols, row, %{}) end)
  end
end
