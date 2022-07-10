defmodule Api.Repo.Migrations.CreateBucketContains do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS bucket_contains (
          bucket_id bigint,
          task_id bigint,

          FOREIGN KEY (bucket_id) REFERENCES bucket(bucket_id),
          FOREIGN KEY (task_id) REFERENCES task(task_id),
          PRIMARY KEY (bucket_id, task_id)
        );
      """
  end
end
