import logo from './logo.svg';
import './App.css';
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

const displayCourses = (state, setState) => {
  return (
    coursesAsArray(state).sort((a, b) => {
      if (a.subject == b.subject) { return a.number > b.number; }
      else return a.subject > b.subject;
    }).map(task => {
      return (<Task task={task}/>)
    })
  )
}

function Task({task}) {
  return (
    <div className="task" draggable="true" onDragStart={(event) => onDragStart(event)} key={task.task_id} id={task.task_id}>
      {task.subject} {task.number} {"->"} {task.title}
    </div>
  )
}

function Semester({size, index}) {
  return (
    <div className="semester" key={`semester: ${index}`}>
      <div>Semester {index}</div>
      <div onDragOver={onDragOver} onDrop={(event) => onDrop(event)}>
        courses:
      </div>
    </div>
  )
}

function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  event.preventDefault();

  event.target.appendChild(
    document.getElementById(
      event.dataTransfer.getData('text')
    )
  );

  event
    .dataTransfer
    .clearData();
}


function App() {
  const [lookupTable, initTable] = useState([]);

  const getCourses = async () => {
    const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json();
    initTable(response);
  }

  useEffect(() => {getCourses()}, []);  

  return (
    <div>

      <div className="row">
        <div className="left">
          {Array.apply(null, Array(8)).map((_,i) => {return <Semester size={6} index={i + 1}/>})}
        </div>
        <div className="right">
          {displayCourses(lookupTable)}
        </div>
      </div> 

    </div>
  );
}

export default App;
