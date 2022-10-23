import { makeState } from './types/StateConstructor';
import { SchedulerState } from './types/SchedulerState';
import { dragOver, dragStart, drop } from './DragAndDrop';
import { TaskData, Focus } from './types/Task';
import { Organization } from './types/Organization';
import DataEngine from './DataEngine';
import { Objective } from './types/Objective';

// this should be a class that encapsulates the state. If you want to output the state you must give a component to the class. 

export default class Scheduler {

  public static notifyListeners(newState: SchedulerState) {
    newState.listeners.forEach(f => f(newState));
  }

  public static initializeScheduleMakerState(listeners: (newState: SchedulerState) => void) {
    return {
      state: makeState({}, [[], [], [], [], [], [], [], [], []]),
      listeners: [listeners]
    }
  } 
  
  public static async initializeScheduleMakerData(
    oldState: SchedulerState, 
    university: string | null, 
    degrees: string | null) {

    if (university != null && degrees != null) {
      const response = await DataEngine.GetInPathCourses(university, degrees);
    
      for (const key in response) {
        response[key].taskData.focus = 0;
      }

      Scheduler.notifyListeners({
        state: makeState(response, [Object.keys(response).map(key => Number(key)),[],[],[],[],[],[],[],[]]),
        listeners: oldState.listeners
      });
    }
  }

  public static async initializeObjectivesData(setState: (newState: Objective[]) => void, organizationTitle: string) {
    setState(await DataEngine.GetDegrees(organizationTitle))
  }

  public static async initializeOrganizationData(setState: (newState: Organization[]) => void) {
    setState(await DataEngine.GetOrganizations())
  }
  
  public static visualizeFocus(focus: Focus): string {
    const focusMap = {
      0: 'while',
      1: 'red',
      2: 'yellow'
    }

    return focusMap[focus]
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

  public static clearSemesters(state: SchedulerState) {
    Scheduler.notifyListeners({
      state: makeState(
        state.state.taskTable,
        state.state.keyLists.map((_, index) => {
          if (index == 0) {
            return state.state.keyLists.flat()
          }
          else {
            return []
          }
        })
      ),
      listeners: state.listeners
    })
  }
  
  public static onTaskHover(taskID: number, state: SchedulerState) {
    const newTaskTable = {...state.state.taskTable}
    newTaskTable[taskID].taskData.focus = 1;
    
    newTaskTable[taskID].children.forEach(childrenID => {
      newTaskTable[childrenID].taskData.focus = 2;
    })

    Scheduler.notifyListeners({
      state: makeState(
        newTaskTable,
        state.state.keyLists
      ),
      listeners: state.listeners
    })
  }


}