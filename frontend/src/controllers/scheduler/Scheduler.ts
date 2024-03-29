import { makeState } from './types/StateConstructor';
import { SchedulerState } from './types/SchedulerState';
import { dragOver, dragStart, drop } from './DragAndDrop';
import { TaskData, Focus } from './types/Task';
import { Organization } from './types/Organization';
import DataEngine from '../apiManager/DataEngine';
import { Objective } from './types/Objective';
import { MakerState } from './types/StateConstructor';
import { DegreeRequirements } from './types/DegreeRequirements';

// this should be a class that encapsulates the state. If you want to output the state you must give a component to the class. 

export default class Scheduler {

  public static notifyListeners(newState: SchedulerState) {
    newState.listeners.forEach(f => f(newState));
  }

  public static initializeScheduleMakerState(listeners: (newState: SchedulerState) => void) {
    return {
      state: makeState({}, [[], [], [], [], [], [], [], [], []], []),
      listeners: [listeners]
    }
  } 
  
  public static async initializeScheduleMakerData (
    oldState: SchedulerState, 
    university: string | null, 
    degrees: string | null,
    jwt: string
  ) {

    if (university != null && degrees != null) {
      const response: any = await DataEngine.GetInPathCourses(university, degrees, jwt);

      const lookupTable = response["taskTable"]
    
      for (const key in lookupTable) {
        lookupTable[key].focus = 0;
      }

      console.log(response)

      Scheduler.notifyListeners({
        state: makeState(
          lookupTable, 
          [Object.keys(lookupTable).map(key => Number(key)),[],[],[],[],[],[],[],[]], 
          response["degreeRequirements"] as DegreeRequirements[]
        ),
        listeners: oldState.listeners
      });
    }
    else {
      console.log("error, univeristy and degrees are null");
    }
  }

  public static async initializeObjectivesData(setState: (newState: [Objective, boolean][]) => void, organizationTitle: string) {
    setState((await DataEngine.GetDegrees(organizationTitle)).map((org) => [org, false]))
  }

  public static async initializeOrganizationData(setState: (newState: Organization[]) => void) {
    setState(await DataEngine.GetOrganizations())
  }

  public static async saveSchedule(state: MakerState, userToken: string) {
    await DataEngine.SaveSchedule(state, userToken)
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
    return state.state.keyLists[originID].map(id => state.state.taskTable[id]).sort((a, b) => {
      return (a.subject == b.subject) ? Number(a.number < b.number) : Number(a.subject > b.subject);
    })
  }
  
  public static addSemester(state: SchedulerState) {
    Scheduler.notifyListeners({
      state: {
        ...state.state,
        keyLists: state.state.keyLists.concat([[]])
      },
      listeners: state.listeners
    })
  }
  
  public static removeSemester(state: SchedulerState) {
    Scheduler.notifyListeners({
      state: {
        ...state.state,
        keyLists: 
          state.state.keyLists.map((list, index) => {
            if (index == 0) {
              return list.concat(state.state.keyLists[state.state.keyLists.length - 1])
            } 
            else {
              return list
          }}).slice(0, -1)
      },
      listeners: state.listeners
    })

    Scheduler.notifyListeners({
      state: {
        ...state.state,
        keyLists:         
          state.state.keyLists.map((list, index) => {
            if (index == 0) {
              return list.concat(state.state.keyLists[state.state.keyLists.length - 1])
            } 
            else {
              return list
          }}).slice(0, -1),
      },
      listeners: state.listeners
    })
  }

  public static sumCurrentTaskWeights(state: SchedulerState, targetIndex: number): number {
    return state.state.keyLists[targetIndex].reduce((cumulativeWeights: number, course: number) => {
      return cumulativeWeights + state.state.taskTable[course].slotWeight
    }, 0)
  }

  public static clearSemesters(state: SchedulerState) {
    Scheduler.notifyListeners({
      state: {
        ...state.state,
        keyLists:         
          state.state.keyLists.map((_, index) => {
            if (index == 0) {
              return state.state.keyLists.flat()
            }
            else {
              return []
            }
        }),
      },
      listeners: state.listeners
    })
  }
  
  public static onTaskMouseEnter(taskID: number, state: SchedulerState) {
    const newTaskTable = {...state.state.taskTable}
    newTaskTable[taskID].focus = 1;

    newTaskTable[taskID].children.forEach(paths => {
      paths.forEach(childID => {
        newTaskTable[childID].focus = 2;
      })
    })

    Scheduler.notifyListeners({
      state: {...state.state, taskTable: newTaskTable},
      listeners: state.listeners
    })
  }

  public static onTaskMouseLeave(taskID: number, state: SchedulerState) {

    Scheduler.notifyListeners({
      state: Scheduler.resetFocus(state),
      listeners: state.listeners
    })
  }

  private static resetFocus(state: SchedulerState): MakerState {
    
    const newTaskTable = {...state.state.taskTable}

    Object.entries(newTaskTable).forEach(key => {
      newTaskTable[Number(key[0])].focus = 0;
      newTaskTable[Number(key[0])].children.forEach(paths => {
        paths.forEach(childID => {
          newTaskTable[childID].focus = 0;
        })
      })
    })

    return {...state.state, taskTable: newTaskTable}
  }
}