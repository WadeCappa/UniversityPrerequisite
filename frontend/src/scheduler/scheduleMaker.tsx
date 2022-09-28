import React from 'react';
import './scheduler.css';
import { useEffect, useState } from 'react';
import { makeState } from './types/stateConstructor';
import {onDragStart, onDragOver, onDrop} from './utility/dragAndDrop'
import Semester from './components/semester';
import { displayCourses } from './utility/displayTasks';
import Header from './components/header';
import { TaskTable } from './types/stateConstructor';


function ScheduleMaker() {
  const [makerState, setMakerState] = useState(makeState({}, [[], [], [], [], [], [], [], [], []]));

  const getCourses = async () => {
    const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json() as TaskTable;
    setMakerState(makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[],[],[]]));
  }

  useEffect(() => {getCourses()}, []);  

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
