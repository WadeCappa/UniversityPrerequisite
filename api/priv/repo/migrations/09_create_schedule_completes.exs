defmodule Api.Repo.Migrations.CreateScheduleCompletes do
  use Ecto.Migration

  def up do
      execute """
        CREATE TABLE IF NOT EXISTS schedule_completes (
          schedule_id bigint,
          objective_id bigint,

          FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id),
          FOREIGN KEY (objective_id) REFERENCES objective(objective_id),
          PRIMARY KEY (schedule_id, objective_id)
        );
      """
  end
end
