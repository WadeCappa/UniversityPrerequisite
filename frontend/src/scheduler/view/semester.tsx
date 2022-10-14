
import { displayCourses } from '../logic/utility/displayTasks';
import { MakerState } from '../logic/types/stateConstructor';
import { onDragOver, onDrop } from '../logic/utility/dragAndDrop';
import { Engine } from '../logic/engine';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  index: number;
  state: MakerState;
  setState: Dispatch<SetStateAction<MakerState>>;
}

function Semester({index, state, setState}: Props) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={onDragOver} onDrop={(event) => setState(onDrop(event, index, state))}>
        <div>Semester {index}</div>
        <div>
            <div>
                courses:
          </div>
          <div>
                {
                  // This is highly coupled. The logic should not know what the interface is. Build a function here that 
                  // takes the cleaned data (the logic cleasns the data) and then displays it as a list of Tasks.
                }
                {displayCourses(state.keyLists[index], state.taskTable, index)}
          </div>
        </div>
      </div>
    )
  }

export default Semester;