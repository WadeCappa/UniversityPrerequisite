import { makeState } from "./types/StateConstructor";
import Scheduler from "./Scheduler";
import { SchedulerState } from "./types/SchedulerState";

export const dragStart = (event: any, originIndex: number) => {
    event
        .dataTransfer
        .setData('text/plain', `{"targetID": ${event.target.id}, "originIndex": ${originIndex}}`);
}

export const dragOver = (event: any) => {
    event.preventDefault();
}

export const drop = (event: any, newLocation: number, state: SchedulerState): void => {
    event.preventDefault();
    
    const transferData = JSON.parse(event.dataTransfer.getData('text'));

    const newState = makeState(
        state.state.taskTable,
        state.state.keyLists.map((l, i) => {
            if (newLocation === transferData.originIndex) {return l}
            if (i === newLocation) {return l.concat(transferData.targetID)}
            if (i === transferData.originIndex) {
                return l.filter(id => id !== transferData.targetID)
            }
            else {return l}
        })
    )

    Scheduler.notifyListeners({state: newState, listeners: state.listeners})

    event
        .dataTransfer
        .clearData();
}