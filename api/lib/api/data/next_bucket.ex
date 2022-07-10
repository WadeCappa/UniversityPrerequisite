defmodule Api.NextBucket do
  use Ecto.Schema
  import Ecto.Changeset

  schema "next_bucket" do
    field :next, :integer
    field :parent, :integer
  end

  @doc false
  def changeset(next_bucket, attrs) do
    next_bucket
    |> cast(attrs, [:parent, :next])
    |> validate_required([:parent, :next])
  end
end
