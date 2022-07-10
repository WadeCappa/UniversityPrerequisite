defmodule Api.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "task" do
    field :description, :string
    field :number, :string
    field :parent_org, :integer
    field :slot_weight, :integer
    field :subject, :string
    field :task_id, :integer 
    field :title, :string
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:task_id, :parent_org, :subject, :number, :slot_weight, :title, :description])
    |> validate_required([:task_id, :parent_org, :subject, :number, :slot_weight])
  end
end
