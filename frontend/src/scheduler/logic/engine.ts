import { makeState } from '../logic/types/stateConstructor';
import { MakerState } from '../logic/types/stateConstructor';

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
    this.listeners.forEach(f => f(newState));
  }

  async initializeData() {
    const response = await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json() as TaskTable;
    this.state = makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[],[],[]]);
    this.notifyListeners(this.state);
  }
}

