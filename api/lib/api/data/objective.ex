defmodule Api.Objective do
  use Ecto.Schema
  import Ecto.Changeset

  schema "objective" do
    field :description, :string
    field :objective_id, :integer
    field :parent_org, :integer
    field :title, :string
  end

  @doc false
  def changeset(objective, attrs) do
    objective
    |> cast(attrs, [:objective_id, :parent_org, :title, :description])
    |> validate_required([:objective_id, :parent_org])
  end
end
