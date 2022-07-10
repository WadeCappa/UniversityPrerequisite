defmodule Api.Bucket do
  use Ecto.Schema
  import Ecto.Changeset

  schema "bucket" do
    field :bucket_id, :integer
  end

  @doc false
  def changeset(bucket, attrs) do
    bucket
    |> cast(attrs, [:bucket_id])
    |> validate_required([:bucket_id])
  end
end
