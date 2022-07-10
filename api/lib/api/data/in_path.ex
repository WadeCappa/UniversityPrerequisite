defmodule Api.InPath do
  use Ecto.Schema
  import Ecto.Changeset

  schema "in_path" do
    field :child_executable_id, :integer
    field :parent_path, :integer
  end

  @doc false
  def changeset(in_path, attrs) do
    in_path
    |> cast(attrs, [:parent_path, :child_executable_id])
    |> validate_required([:parent_path, :child_executable_id])
  end
end
