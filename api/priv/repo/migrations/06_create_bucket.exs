defmodule Api.Repo.Migrations.CreateBucket do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS bucket (
          bucket_id bigint,

          PRIMARY KEY (bucket_id)
        );
      """
  end
end
