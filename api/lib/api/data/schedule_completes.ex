defmodule Api.ScheduleCompletes do
  use Ecto.Schema
  import Ecto.Changeset

  schema "schedule_completes" do
    field :objective_id, :integer
    field :schedule_id, :integer
  end

  @doc false
  def changeset(schedule_completes, attrs) do
    schedule_completes
    |> cast(attrs, [:schedule_id, :objective_id])
    |> validate_required([:schedule_id, :objective_id])
  end
end
