import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const outputData = (data) => {
  return (
    Object.keys(data).map(key => {
      let d = data[key]
      return (<li key={d.data.id}>{d.data.subject}: {d.data.number} {"->"} {d.data.title}</li>)
    })
  )
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

      {outputData(currentState)}

    </div>
  );
}

export default App;
