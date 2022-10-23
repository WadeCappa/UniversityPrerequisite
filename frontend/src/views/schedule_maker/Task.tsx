import { TaskData } from '../../controllers/scheduler/types/Task';
import React from 'react';
import Scheduler from '../../controllers/scheduler/Scheduler';

type Props = {
  task: TaskData;
  origin: number;
  onHover: (taskID: number) => void;
}

function Task({task, origin, onHover}: Props) {
    return (
      <div 
        className="task" 
        draggable="true" 
        onDragStart={(event) => Scheduler.onDragStart(event, origin)} 
        key={`${task.subject} ${task.number}`} 
        id={String(task.taskID)}
        onMouseEnter={() => {onHover(task.taskID)}}
        onMouseLeave={() => {}}>
          {task.subject} {task.number} {"->"} {task.title}
      </div>
    )
  }

export default Task;