defmodule Api.Repo.Migrations.CreateUserTable do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE user_table (
          user_id bigint,
          username char(60),

          PRIMARY KEY (user_id)
        );
        """
  end
end
