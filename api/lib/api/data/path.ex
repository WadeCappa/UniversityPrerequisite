defmodule Api.Path do
  use Ecto.Schema
  import Ecto.Changeset

  schema "path" do
    field :parent_id, :integer
    field :path_id, :integer
  end

  @doc false
  def changeset(path, attrs) do
    path
    |> cast(attrs, [:path_id, :parent_id])
    |> validate_required([:path_id, :parent_id])
  end
end
