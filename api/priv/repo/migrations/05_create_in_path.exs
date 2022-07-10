defmodule Api.Repo.Migrations.CreateInPath do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS in_path ( 
          parent_path bigint, 
          child_executable_id bigint,

          FOREIGN KEY (parent_path) REFERENCES path(path_id),
          FOREIGN KEY (child_executable_id) REFERENCES executable(executable_id),
          PRIMARY KEY (parent_path, child_executable_id)
        );      
      """
  end
end
