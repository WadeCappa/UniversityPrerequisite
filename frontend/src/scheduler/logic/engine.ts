import { makeState } from '../logic/types/stateConstructor';
import { MakerState } from '../logic/types/stateConstructor';
import { dragOver, dragStart, drop } from './utility/dragAndDrop';
import { TaskData } from './types/task';

import { TaskTable } from './types/stateConstructor';

// this should be a class that encapsulates the state. If you want to output the state you must give a component to the class. 

export type Engine = {
  state: MakerState;
  listeners: ((newEngine: Engine) => void)[];
}

function initializeState(f: (newEngine: Engine) => void) {
  return {
    state: makeState({}, [[], [], [], [], [], [], [], [], []]),
    listeners: [f]
  }
}


function notifyListeners(newEngine: Engine) {
  newEngine.listeners.forEach(f => f(newEngine));
}

async function initializeData(oldEngine: Engine) {
  const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json() as TaskTable;
  notifyListeners({
    state: makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[],[],[]]),
    listeners: oldEngine.listeners
  });
}

function onDragStart(event: any, index: number) {
  dragStart(event, index);
}

function onDragOver(event: any) {
  dragOver(event);
}

function onDrop(event: any, newLocation: number, engine: Engine) {
  drop(event, newLocation, engine);
}

function tasksToTaskData(engine: Engine, originID: number): TaskData[] {
  return engine.state.keyLists[originID].map(id => engine.state.taskTable[id].taskData).sort((a, b) => {
    return (a.subject == b.subject) ? Number(a.number < b.number) : Number(a.subject > b.subject);
  })
}


export {
  initializeState,
  notifyListeners,
  initializeData,
  onDragStart,
  onDrop,
  onDragOver,
  tasksToTaskData
}