defmodule BackendWeb.DatabaseManager do

  def startDBConnection do
    {:ok, _pid} = Bolt.Sips.start_link(url: "prereq://localhost", port: 7687, basic_auth: [username: "neo4j", password: "localpass"])
  end

  def fetchData(cypherQuery) do
    %Bolt.Sips.Response{results: res} = Bolt.Sips.query!(Bolt.Sips.conn(), cypherQuery)
    res
  end
end
