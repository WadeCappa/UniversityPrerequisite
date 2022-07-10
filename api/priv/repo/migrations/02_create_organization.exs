defmodule Api.Repo.Migrations.CreateOrganization do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS organization (
          organization_id bigint,
          title char(120),
          description text, 
          location text,
          slots_per_bucket INT,

          FOREIGN KEY (organization_id) REFERENCES repository(repo_id),
          PRIMARY KEY (organization_id)
        );
      """
  end
end
