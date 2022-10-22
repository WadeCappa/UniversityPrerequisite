
import { Engine, onDragOver, onDrop } from '../../controllers/scheduler/engine';
import React from 'react';

import { displayCourses } from "./displayCourses"

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
            {displayCourses(engine, index)}
          </div>
        </div>
      </div>
    )
  }

export default Semester;