import React from 'react';
import { useState, useEffect } from "react";
import './App.css';



function App() {
  GetData();
  return (
    <div className="App">

    </div>
  );
}


function GetData() {
  useEffect(() => {
    fetch(`http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science`)
     .then((response) => console.log(response));
   }, []);
}

export default App;
