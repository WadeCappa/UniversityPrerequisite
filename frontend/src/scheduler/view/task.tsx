import { TaskData } from '../logic/types/task'
import React from 'react';
import { Engine } from "../logic/engine"
import {onDragStart} from "../logic/utility/dragAndDrop"

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