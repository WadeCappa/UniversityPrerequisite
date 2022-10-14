import React from 'react';
import './scheduler.css';
import { useEffect, useState } from 'react';
import { makeState } from '../logic/types/stateConstructor';
import {onDragStart, onDragOver, onDrop} from '../logic/utility/dragAndDrop'
import Semester from './semester';
import { displayCourses } from '../logic/utility/displayTasks';
import Header from './header';
import { TaskTable } from '../logic/types/stateConstructor';

// model
import { Engine } from '../logic/engine';

function ScheduleMaker() {
  const logicEngine: Engine = new Engine();
  const [makerState, setMakerState] = useState(logicEngine.state);
  logicEngine.listeners.push((newState) => setMakerState(newState));


  useEffect(() => {logicEngine.initializeData()}, []);  

  return (
    <div>      
      <Header/>
      <div className="row">

        <div className="column">
          {makerState.keyLists.slice(1).map((_,i) => {return <Semester index={makerState.keyLists.length - (i + 1)} state={makerState} setState={setMakerState}/>})}
        </div>
        <div className="column" onDragOver={onDragOver} onDrop={(event) => onDrop(event, 0, makerState, setMakerState)}>
          {displayCourses(makerState.keyLists[0], makerState.taskTable, 0)}
        </div>
      </div> 

    </div>
  );
}

export default ScheduleMaker;
