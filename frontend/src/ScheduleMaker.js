import logo from './logo.svg';
import './Scheduler.css';
import { useEffect, useState } from 'react';

// try this:
//  the state of each semester and queue REACTS to the HTML elements in it. After a 
//  drop operation you scan through the state of the element (onDrop={(event) => onDrop(event); updateState(state, setState);})
//  and then add the IDs of the new Tasks to your state. The problem is removing an item from the state when dragged out.
// Solution: Don't worry about it. During validation you scan through an element and reset its state according to the elements
//  that it has. To do this refresh all semesters on change, validate all of them. 

const coursesAsArray = (lookupTable) => {
    return (
        Object.keys(lookupTable).map(key => {
            return (lookupTable[key].data)
        })
    )
}

const displayCourses = (IDs, table, originID) => {
    return IDs.map(id => table[id].data).sort((a, b) => {
        if (a.subject == b.subject) {
            return a.number > b.number; 
        }
        else {
            return a.subject > b.subject;
        }
    }).map(task => {return (<Task task={task} origin={originID}/>)})
}



const onDragStart = (event, originIndex) => {
    event
        .dataTransfer
        .setData('text/plain', `{"targetID": ${event.target.id}, "originIndex": ${originIndex}}`);
}

const onDragOver = (event) => {
    event.preventDefault();
}

const onDrop = (event, newLocation, state, newState) => {
    event.preventDefault();
    
    const transferData = JSON.parse(event.dataTransfer.getData('text'));
    console.log(newLocation, transferData.targetID, transferData.originIndex)

    newState(makeState(
        state.table,
        state.keyLists.map((l, i) => {
            if (newLocation === transferData.originIndex) {return l}
            if (i === newLocation) {return l.concat(transferData.targetID)}
            if (i === transferData.originIndex) {
                console.log(l, transferData.targetID)
                return l.filter(id => id !== transferData.targetID)
            }
            else {return l}
        })
    ))

    event
        .dataTransfer
        .clearData();
}




const makeState = (table, keyLists) => {
    return {table, keyLists}
}

function Task({task, origin}) {
    return (
      <div className="task" draggable="true" onDragStart={(event) => onDragStart(event, origin)} key={`${task.subject} ${task.number}`} id={task.task_id}>
            {task.subject} {task.number} {"->"} {task.title}
      </div>
    )
  }
  
  function Semester({index, state, setState}) {
    return (
      <div className="semester" key={`semester: ${index}`} onDragOver={onDragOver} onDrop={(event) => onDrop(event, index, state, setState)}>
        <div>Semester {index}</div>
        <div>
            <div>
                courses:
          </div>
          <div>
                {displayCourses(state.keyLists[index], state.table, index)}
          </div>
        </div>
      </div>
    )
  }


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
