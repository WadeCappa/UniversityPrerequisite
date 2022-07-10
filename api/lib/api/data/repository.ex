defmodule Api.Repository do
  use Ecto.Schema
  import Ecto.Changeset

  schema "repository" do
    field :repo_id, :integer
  end

  @doc false
  def changeset(repository, attrs) do
    repository
    |> cast(attrs, [:repo_id])
    |> validate_required([:repo_id])
  end
end
