defmodule Api.Repo.Migrations.CreateManages do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE manages (
          user_id bigint,
          repo_id bigint,

          FOREIGN KEY (user_id) REFERENCES user_table(user_id),
          FOREIGN KEY (repo_id) REFERENCES repository(repo_id),
          PRIMARY KEY (user_id, repo_id)
        );
      """
  end
end