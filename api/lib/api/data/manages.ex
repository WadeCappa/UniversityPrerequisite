defmodule Api.Manages do
  use Ecto.Schema
  import Ecto.Changeset

  schema "manages" do
    field :repo_id, :integer
    field :user_id, :integer
  end

  @doc false
  def changeset(manages, attrs) do
    manages
    |> cast(attrs, [:user_id, :repo_id])
    |> validate_required([:user_id, :repo_id])
  end
end
