defmodule Api.Repo.Migrations.CreateSchedule do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS schedule (
          schedule_id bigint,
          title char(120),
          head_bucket bigint,

          FOREIGN KEY (schedule_id) REFERENCES repository(repo_id),
          FOREIGN KEY (head_bucket) REFERENCES bucket(bucket_id),
          PRIMARY KEY (schedule_id)
        );
"""
  end
end
