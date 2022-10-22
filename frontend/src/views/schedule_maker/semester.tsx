
import Scheduler from '../../controllers/scheduler/Scheduler';
import { SchedulerState } from '../../controllers/scheduler/types/SchedulerState';
import React from 'react';

import { displayCourses } from "./displayCourses"

type Props = {
  index: number;
  state: SchedulerState;
}

function Semester({index, state}: Props) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={Scheduler.onDragOver} onDrop={(event) => Scheduler.onDrop(event, index, state)}>
        <div>Semester {index}</div>
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