import { makeState } from '../logic/types/stateConstructor';
import { MakerState } from '../logic/types/stateConstructor';
import { onDragOver, onDragStart, onDrop } from './utility/dragAndDrop';

import { TaskTable } from './types/stateConstructor';

// this should be a class that encapsulates the state. If you want to output the state you must give a component to the class. 

export class Engine {
  state: MakerState;
  listeners: ((newState: MakerState) => void)[];

  constructor () {
    this.state = makeState({}, [[], [], [], [], [], [], [], [], []]);
    this.listeners = [];
  }

  notifyListeners(newState: MakerState) {
    this.state = newState;
    this.listeners.forEach(f => f(newState));
  }

  async initializeData() {
    const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json() as TaskTable;
    this.notifyListeners(makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[],[],[]]));
  }

  onDragStart(event: any, index: number) {
    onDragStart(event, index);
  }

  onDragOver(event: any) {
    onDragOver(event);
  }

  onDrop(event: any, newLocation: number) {
    this.notifyListeners(onDrop(event, newLocation, this.state));
  }
}

