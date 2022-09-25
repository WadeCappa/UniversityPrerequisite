import './scheduler.css';
import { useEffect, useState } from 'react';
import { makeState } from './utility/stateConstructor';
import {onDragStart, onDragOver, onDrop} from './utility/dragAndDrop'
import Semester from './components/semester';
import { displayCourses } from './utility/displayTasks';


function ScheduleMaker() {
  const [makerState, setMakerState] = useState(makeState(null, [[], [], [], [], [], [], []]));

  const getCourses = async () => {
    const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json();
    setMakerState(makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[]]));
  }

  useEffect(() => {getCourses()}, []);  

  return (
    <div>

      <div className="row">
        <div className="left">
          {makerState.keyLists.slice(1).map((_,i) => {return <Semester index={i + 1} state={makerState} setState={setMakerState}/>})}
        </div>
        <div className="right" onDragOver={onDragOver} onDrop={(event) => onDrop(event, 0, makerState, setMakerState)}>
          {displayCourses(makerState.keyLists[0], makerState.table, 0)}
        </div>
      </div> 

    </div>
  );
}

export default ScheduleMaker;
