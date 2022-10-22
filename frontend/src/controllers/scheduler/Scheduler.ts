import { makeState } from './types/StateConstructor';
import { SchedulerState } from './types/SchedulerState';
import { dragOver, dragStart, drop } from './DragAndDrop';
import { TaskData } from './types/Task';
import { TaskTable } from './types/StateConstructor';
import DataEngine from './DataEngine';

// this should be a class that encapsulates the state. If you want to output the state you must give a component to the class. 

export default class Scheduler {

  public static notifyListeners(newState: SchedulerState) {
    newState.listeners.forEach(f => f(newState));
  }

  public static initializeState(f: (newState: SchedulerState) => void) {
    return {
      state: makeState({}, [[], [], [], [], [], [], [], [], []]),
      listeners: [f]
    }
  } 
  
  public static async initializeData(oldState: SchedulerState) {
    const response = await DataEngine.GetInPathCourses();
    Scheduler.notifyListeners({
      state: makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[],[],[]]),
      listeners: oldState.listeners
    });
  }
  
  public static onDragStart(event: any, index: number) {
    dragStart(event, index);
  }
  
  public static onDragOver(event: any) {
    dragOver(event);
  }
  
  public static onDrop(event: any, newLocation: number, state: SchedulerState) {
    drop(event, newLocation, state);
  }
  
  public static tasksToTaskData(state: SchedulerState, originID: number): TaskData[] {
    return state.state.keyLists[originID].map(id => state.state.taskTable[id].taskData).sort((a, b) => {
      return (a.subject == b.subject) ? Number(a.number < b.number) : Number(a.subject > b.subject);
    })
  }
  
  public static addSemester(state: SchedulerState) {
    Scheduler.notifyListeners({
      state: makeState(
        state.state.taskTable, 
        state.state.keyLists.concat([[]])
      ),
      listeners: state.listeners
    })
  }
  
  public static removeSemester(state: SchedulerState) {
    Scheduler.notifyListeners({
      state: makeState(
        state.state.taskTable, 
        state.state.keyLists.map((list, index) => {
          if (index == 0) {
            return list.concat(state.state.keyLists[state.state.keyLists.length - 1])
          } 
          else {
            return list
          }}).slice(0, -1)
      ),
      listeners: state.listeners
    })
  }
  
}