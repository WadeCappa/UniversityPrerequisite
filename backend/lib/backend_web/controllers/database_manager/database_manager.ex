defmodule BackendWeb.DatabaseManager do

  def startDBConnection do
    {:ok, _pid} = Bolt.Sips.start_link(url: "prereq://localhost", port: 7687, basic_auth: [username: "neo4j", password: "localpass"])
  end

  def runCypher(cypher) do
    # do pattern matching here to handle errors
    %{results: res} = sendCommand(cypher)
    res
  end

  def sendCommand(cypher) do
    Bolt.Sips.query(Bolt.Sips.conn(), cypher)
  end

end
