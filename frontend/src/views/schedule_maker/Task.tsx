import { TaskData } from '../../controllers/scheduler/types/Task';
import React from 'react';
import Scheduler from '../../controllers/scheduler/Scheduler';

type Props = {
  task: TaskData;
  origin: number;
}

function Task({task, origin}: Props) {
    return (
      <div className="task" draggable="true" onDragStart={(event) => Scheduler.onDragStart(event, origin)} key={`${task.subject} ${task.number}`} id={String(task.taskID)}>
            {task.subject} {task.number} {"->"} {task.title}
      </div>
    )
  }

export default Task;