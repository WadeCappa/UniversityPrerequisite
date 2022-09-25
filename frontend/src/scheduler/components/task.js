import { onDragStart } from '../utility/dragAndDrop'

function Task({task, origin}) {
    return (
      <div className="task" draggable="true" onDragStart={(event) => onDragStart(event, origin)} key={`${task.subject} ${task.number}`} id={task.task_id}>
            {task.subject} {task.number} {"->"} {task.title}
      </div>
    )
  }

export default Task;