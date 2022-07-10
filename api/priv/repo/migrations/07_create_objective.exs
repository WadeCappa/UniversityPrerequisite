defmodule Api.Repo.Migrations.CreateObjective do
  use Ecto.Migration

  def up do
    execute """
      CREATE TABLE IF NOT EXISTS objective ( 
        objective_id bigint,
        parent_org bigint,
        title char(120),
        description text,

        UNIQUE (parent_org, title),
        FOREIGN KEY (parent_org) REFERENCES organization(organization_id),
        FOREIGN KEY (objective_id) REFERENCES executable(executable_id),
        PRIMARY KEY (objective_id)
      );
    """
  end
end
