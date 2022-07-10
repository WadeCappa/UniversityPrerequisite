defmodule Api.Repo.Migrations.CreatePath do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS path (
          path_id bigint, 
          parent_id bigint,

          FOREIGN KEY (parent_id) REFERENCES executable(executable_id),
          PRIMARY KEY (path_id)
        );
      """
  end
end
