import React from 'react';
import './Scheduler.css';
import { useEffect, useState } from 'react';
import Semester from './Semester';
import Header from './Header';
import { displayCourses } from './DisplayCourses';

// model
import Scheduler from '../../controllers/scheduler/Scheduler';

function ScheduleMaker() {
  const [makerState, setMakerState] = useState(Scheduler.initializeState((newState) => setMakerState(newState)));

  useEffect(() => {Scheduler.initializeData(makerState)}, []);  

  return (
    <div>      
      <Header/>
      <div className="row">

        <div className="column">
          <button className="slot" onClick={() => Scheduler.addSemester(makerState)}>Add Semester</button>
          <button className="slot" onClick={() => Scheduler.removeSemester(makerState)}>Remove Semester</button>
          {makerState.state.keyLists.slice(1).map((_,i) => {return <Semester index={makerState.state.keyLists.length - (i + 1)} state={makerState} />})}
        </div>
        <div className="column" onDragOver={Scheduler.onDragOver} onDrop={(event) => Scheduler.onDrop(event, 0, makerState)}>
          <button className="slot">Add Course</button>
          <button className="slot">Prune Courses</button>
          {displayCourses(makerState, 0)}
        </div>
      </div> 

    </div>
  );
}

export default ScheduleMaker;
