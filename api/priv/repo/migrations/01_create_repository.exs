defmodule Api.Repo.Migrations.CreateRepository do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS repository (
          repo_id bigint,

          PRIMARY KEY (repo_id)
        );
      """
  end
end
