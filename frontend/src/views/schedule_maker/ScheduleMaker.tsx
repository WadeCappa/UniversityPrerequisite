import React from 'react';
import './Scheduler.css';
import { useEffect, useState } from 'react';
import Semester from './Semester';
import Header from './Header';
import { displayCourses } from './DisplayCourses';
import { useSearchParams } from 'react-router-dom';

// model
import Scheduler from '../../controllers/scheduler/Scheduler';

type Props = {
  university: string | null;
  degrees: string | null;
}

function ScheduleMaker({university, degrees}: Props) {
  const [queryParameters] = useSearchParams()

  // Get the id of the schedule you are currently working on, query the DB to pull up your progress. If the current ID does not match anything
  //  in the database, you're working on a new schedule. This schedule ID should be the only data collected from the URL.
  const currentWorkingScheduleID: string | null = queryParameters.get("scheduleID")

  const [makerState, setMakerState] = useState(Scheduler.initializeScheduleMakerState((newState) => setMakerState(newState)));

  useEffect(() => {Scheduler.initializeScheduleMakerData(makerState, university, degrees)}, []);  

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
