import { makeState } from "../types/stateConstructor";
import { MakerState } from "../types/stateConstructor";
import { Engine, notifyListeners } from "../engine";

export const dragStart = (event: any, originIndex: number) => {
    event
        .dataTransfer
        .setData('text/plain', `{"targetID": ${event.target.id}, "originIndex": ${originIndex}}`);
}

export const dragOver = (event: any) => {
    event.preventDefault();
}

export const drop = (event: any, newLocation: number, engine: Engine): void => {
    event.preventDefault();
    
    const transferData = JSON.parse(event.dataTransfer.getData('text'));

    const newState = makeState(
        engine.state.taskTable,
        engine.state.keyLists.map((l, i) => {
            if (newLocation === transferData.originIndex) {return l}
            if (i === newLocation) {return l.concat(transferData.targetID)}
            if (i === transferData.originIndex) {
                return l.filter(id => id !== transferData.targetID)
            }
            else {return l}
        })
    )

    notifyListeners({state: newState, listeners: engine.listeners})

    event
        .dataTransfer
        .clearData();
}