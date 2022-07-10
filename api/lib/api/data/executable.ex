defmodule Api.Executable do
  use Ecto.Schema
  import Ecto.Changeset

  schema "executable" do
    field :executable_id, :integer
  end

  @doc false
  def changeset(executable, attrs) do
    executable
    |> cast(attrs, [:executable_id])
    |> validate_required([:executable_id])
  end
end
