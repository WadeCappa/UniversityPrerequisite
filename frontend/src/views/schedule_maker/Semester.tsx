
import Scheduler from '../../controllers/scheduler/Scheduler';
import { SchedulerState } from '../../controllers/scheduler/types/SchedulerState';
import React from 'react';

import { displayCourses, displayCapacity } from "./DisplayCourses"

type Props = {
  index: number;
  state: SchedulerState;
}

function Semester({index, state}: Props) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={Scheduler.onDragOver} onDrop={(event) => Scheduler.onDrop(event, index, state)}>
        <div style={{display:'flex'}}>
          <div className='taskLeft'>Semester {index}</div>
          <div className='taskRight'>
            {displayCapacity(state, index)}
          </div>
        </div>
        <div>
            <div>
              courses:
          </div>
          <div>
            {displayCourses(state, index)}
          </div>
        </div>
      </div>
    )
  }

export default Semester;