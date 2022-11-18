defmodule BackendWeb.DatabaseManager do

  def startDBConnection do
    {:ok, _pid} = Bolt.Sips.start_link(url: "prereq://localhost", port: 7687, basic_auth: [username: "neo4j", password: "localpass"])
  end

  def runCypher(cypher) do
    # do pattern matching here to handle errors
    res = case sendCommand(cypher) do
      {:ok, %Bolt.Sips.Response{results: data}} -> data
      {:error, %Bolt.Sips.Error{code: error_code, message: error_message}} -> %{code: error_code, message: error_message}
    end

    res
  end

  def sendCommand(cypher) do
    Bolt.Sips.query(Bolt.Sips.conn(), cypher)
  end

end
