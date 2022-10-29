defmodule BackendWeb.ServeData do
  use BackendWeb, :controller

  def getOrganizations(conn, _params) do
    {:ok, _pid} = Bolt.Sips.start_link(url: "prereq://localhost", port: 7687, basic_auth: [username: "neo4j", password: "localpass"])

    connection = Bolt.Sips.conn()
    res = Bolt.Sips.query!(connection, "match (o: Organization) return ID(o), o.title, o.slots_per_bucket")

    IO.inspect(res)

    text conn, "backend!"
  end
end
