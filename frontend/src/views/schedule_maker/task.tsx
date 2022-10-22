import { TaskData } from '../../controllers/scheduler/types/task';
import React from 'react';
import { onDragStart } from '../../controllers/scheduler/engine';

type Props = {
  task: TaskData;
  origin: number;
}

function Task({task, origin}: Props) {
    return (
      <div className="task" draggable="true" onDragStart={(event) => onDragStart(event, origin)} key={`${task.subject} ${task.number}`} id={String(task.taskID)}>
            {task.subject} {task.number} {"->"} {task.title}
      </div>
    )
  }

export default Task;