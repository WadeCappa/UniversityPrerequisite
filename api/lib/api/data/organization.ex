defmodule Api.Organization do
  use Ecto.Schema
  import Ecto.Changeset

  schema "organization" do
    field :description, :string
    field :location, :string
    field :organization_id, :integer
    field :slots_per_bucket, :integer
    field :title, :string
  end

  @doc false
  def changeset(organization, attrs) do
    organization
    |> cast(attrs, [:organization_id, :title, :description, :location, :slots_per_bucket])
    |> validate_required([:organization_id, :slots_per_bucket])
  end
end
