import { makeState } from './types/StateConstructor';
import { SchedulerState } from './types/SchedulerState';
import { dragOver, dragStart, drop } from './DragAndDrop';
import { TaskData, Focus } from './types/Task';
import { Organization } from './types/Organization';
import DataEngine from './DataEngine';
import { Objective } from './types/Objective';
import { MakerState } from './types/StateConstructor';

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
      0: 'white',
      1: 'red',
      2: 'yellow',
      3: 'green'
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
    Scheduler.resetFocus(state);
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

  private static resetFocus(state: SchedulerState): MakerState {
    
    const newTaskTable = {...state.state.taskTable}
    Object.entries(newTaskTable).forEach(key => {
      newTaskTable[Number(key[0])].taskData.focus = 0;
      newTaskTable[Number(key[0])].children.forEach(paths => {
        paths.forEach(childID => {
          newTaskTable[childID].taskData.focus = 0;
        })
      })
    })

    return makeState(newTaskTable, state.state.keyLists)
  }
  
  public static onTaskMouseEnter(taskID: number, state: SchedulerState) {
    const newTaskTable = {...state.state.taskTable}
    newTaskTable[taskID].taskData.focus = 1;

    newTaskTable[taskID].children.forEach(paths => {
      paths.forEach(childID => {
        newTaskTable[childID].taskData.focus = 2;
      })
    })

    Scheduler.notifyListeners({
      state: makeState(
        newTaskTable,
        state.state.keyLists
      ),
      listeners: state.listeners
    })
  }

  public static onTaskMouseLeave(taskID: number, state: SchedulerState) {

    Scheduler.notifyListeners({
      state: Scheduler.resetFocus(state),
      listeners: state.listeners
    })
  }
}