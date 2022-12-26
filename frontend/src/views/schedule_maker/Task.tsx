import { TaskData } from '../../controllers/scheduler/types/Task';
import React from 'react';
import Scheduler from '../../controllers/scheduler/Scheduler';

type Props = {
  task: TaskData;
  origin: number;
  onEnter: (taskID: number) => void;
  onLeave: (taskID: number) => void;
}

function Task({task, origin, onEnter, onLeave}: Props) {
    return (
      <div 
        className="task" 
        draggable="true" 
        onDragStart={(event) => Scheduler.onDragStart(event, origin)} 
        key={`${task.subject} ${task.number}`} 
        id={String(task.id)}
        onMouseEnter={() => {onEnter(task.id)}}
        onMouseLeave={() => {onLeave(task.id)}}
        >
          <div className='taskLeft'>
            {task.subject} {task.number} {"->"} {task.title} 
          </div>
          <div className='taskRight'>
            Credits: {task.slotWeight}
          </div>  
          
      </div>
    )
  }

export default Task;