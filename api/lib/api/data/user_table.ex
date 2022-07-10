defmodule Api.UserTable do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_table" do
    field :user_id, :integer
    field :username, :string
  end

  @doc false
  def changeset(user_table, attrs) do
    user_table
    |> cast(attrs, [:user_id, :username])
    |> validate_required([:user_id, :username])
  end
end
