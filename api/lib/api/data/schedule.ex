defmodule Api.Schedule do
  use Ecto.Schema
  import Ecto.Changeset

  schema "schedule" do
    field :head_bucket, :integer
    field :schedule_id, :integer
    field :title, :string
  end

  @doc false
  def changeset(schedule, attrs) do
    schedule
    |> cast(attrs, [:schedule_id, :title, :head_bucket])
    |> validate_required([:schedule_id, :head_bucket])
  end
end
