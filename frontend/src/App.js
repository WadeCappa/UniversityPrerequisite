import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const outputData = (data) => {
  return (
    Object.keys(data).reverse().map(key => {
      let d = data[key]
      return (<Task task={d}/>)
    })
  )
}

function Task({task}) {
  return (
    <div className="task" draggable="true" onDragStart={onDragStart} key={task.data.id} id={`task: ${task.data.subject} ${task.data.number}`}>
      {task.data.subject} {task.data.number} {"->"} {task.data.title}
    </div>
  )
}

function Semester({size, index}) {
  return (
    <div className="semester" key={`semester: ${index + 1}`}>
      <h2>Semester {index}</h2>
      <div onDragOver={onDragOver} onDrop={onDrop}>
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
  const [currentState, setState] = useState([]);

  const getCourses = async () => {
    const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json();
    setState(response);
  }

  useEffect(() => {getCourses()}, []);  

  return (
    <div>

      <div className="row">
        <div className="left">
          {Array.apply(null, Array(8)).map((_,i) => {return <Semester size={6} index={i + 1}/>})}
        </div>
        <div className="right">
          {outputData(currentState)}
        </div>
      </div> 

    </div>
  );
}

export default App;
