defmodule Api.Repo.Migrations.CreateNextBucket do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS next_bucket ( 
          parent bigint,
          next bigint,

          FOREIGN KEY (parent) REFERENCES bucket(bucket_id),
          FOREIGN KEY (next) REFERENCES bucket(bucket_id),
          PRIMARY KEY (parent, next)
        );
      """
  end
end
