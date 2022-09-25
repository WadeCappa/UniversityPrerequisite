import { onDragOver, onDrop } from '../utility/dragAndDrop'
import { displayCourses } from '../utility/displayTasks';

function Semester({index, state, setState}) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={onDragOver} onDrop={(event) => onDrop(event, index, state, setState)}>
        <div>Semester {index}</div>
        <div>
            <div>
                courses:
          </div>
          <div>
                {displayCourses(state.keyLists[index], state.table, index)}
          </div>
        </div>
      </div>
    )
  }

export default Semester;