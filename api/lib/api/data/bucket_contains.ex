defmodule Api.BucketContains do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bucket_contains" do
    field :bucket_id, :integer
    field :task_id, :integer
  end

  @doc false
  def changeset(bucket_contains, attrs) do
    bucket_contains
    |> cast(attrs, [:bucket_id, :task_id])
    |> validate_required([:bucket_id, :task_id])
  end
end
