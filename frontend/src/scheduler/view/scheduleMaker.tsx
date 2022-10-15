import React from 'react';
import './scheduler.css';
import { useEffect, useState } from 'react';
import Semester from './semester';
import Header from './header';
import { displayCourses } from './displayCourses';

// model
import { initializeState, initializeData, onDrop, onDragOver } from '../logic/engine';

function ScheduleMaker() {
  const [makerState, setMakerState] = useState(initializeState((newState) => setMakerState(newState)));

  useEffect(() => {initializeData(makerState)}, []);  

  return (
    <div>      
      <Header/>
      <div className="row">

        <div className="column">
          {makerState.state.keyLists.slice(1).map((_,i) => {return <Semester index={makerState.state.keyLists.length - (i + 1)} engine={makerState} />})}
        </div>
        <div className="column" onDragOver={onDragOver} onDrop={(event) => onDrop(event, 0, makerState)}>
          {displayCourses(makerState, 0)}
        </div>
      </div> 

    </div>
  );
}

export default ScheduleMaker;
