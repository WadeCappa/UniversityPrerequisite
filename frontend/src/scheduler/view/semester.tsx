import { onDragOver, onDrop } from '../logic/utility/dragAndDrop'
import { displayCourses } from '../logic/utility/displayTasks';
import { MakerState } from '../logic/types/stateConstructor';
import React from 'react';

type Props = {
  index: number;
  state: MakerState;
  setState: (newState: MakerState) => void;
}

function Semester({index, state, setState}: Props) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={onDragOver} onDrop={(event) => onDrop(event, index, state, setState)}>
        <div>Semester {index}</div>
        <div>
            <div>
                courses:
          </div>
          <div>
                {displayCourses(state.keyLists[index], state.taskTable, index)}
          </div>
        </div>
      </div>
    )
  }

export default Semester;