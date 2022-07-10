defmodule Api.Repo.Migrations.CreateExecutable do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS executable (
          executable_id bigint,

          PRIMARY KEY (executable_id)
        );
      """
  end
end
