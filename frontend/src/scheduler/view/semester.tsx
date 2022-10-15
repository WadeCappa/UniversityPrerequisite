
import { displayCourses } from '../logic/utility/displayTasks';
import { MakerState } from '../logic/types/stateConstructor';
import { Engine, onDragOver, onDrop, notifyListeners } from '../logic/engine';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  index: number;
  engine: Engine;
}

function Semester({index, engine}: Props) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={onDragOver} onDrop={(event) => onDrop(event, index, engine)}>
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
                {displayCourses(engine.state.keyLists[index], engine.state.taskTable, index)}
          </div>
        </div>
      </div>
    )
  }

export default Semester;