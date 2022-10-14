import { makeState } from "../types/stateConstructor";
import { MakerState } from "../types/stateConstructor";

export const onDragStart = (event: any, originIndex: number) => {
    event
        .dataTransfer
        .setData('text/plain', `{"targetID": ${event.target.id}, "originIndex": ${originIndex}}`);
}

export const onDragOver = (event: any) => {
    event.preventDefault();
}

export const onDrop = (event: any, newLocation: number, state: MakerState): MakerState => {
    event.preventDefault();
    
    const transferData = JSON.parse(event.dataTransfer.getData('text'));

    const newState = makeState(
        state.taskTable,
        state.keyLists.map((l, i) => {
            if (newLocation === transferData.originIndex) {return l}
            if (i === newLocation) {return l.concat(transferData.targetID)}
            if (i === transferData.originIndex) {
                return l.filter(id => id !== transferData.targetID)
            }
            else {return l}
        })
    )

    event
        .dataTransfer
        .clearData();

    return newState;
}