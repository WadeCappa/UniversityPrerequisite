defmodule Api.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def up do
    execute """
      CREATE TABLE IF NOT EXISTS task (
        task_id bigint,
        parent_org bigint, 
        subject char(10),
        number char(10),
        slot_weight INT,
        title char(120),
        description char(360), 
        
        UNIQUE (parent_org, subject, number),
        FOREIGN KEY (parent_org) REFERENCES organization(organization_id),
        FOREIGN KEY (task_id) REFERENCES executable(executable_id),
        PRIMARY KEY (task_id)
      );
    """
  end
end
