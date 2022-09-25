import { makeState } from "./stateConstructor";

export const onDragStart = (event, originIndex) => {
    event
        .dataTransfer
        .setData('text/plain', `{"targetID": ${event.target.id}, "originIndex": ${originIndex}}`);
}

export const onDragOver = (event) => {
    event.preventDefault();
}

export const onDrop = (event, newLocation, state, newState) => {
    event.preventDefault();
    
    const transferData = JSON.parse(event.dataTransfer.getData('text'));
    console.log(newLocation, transferData.targetID, transferData.originIndex)

    newState(makeState(
        state.table,
        state.keyLists.map((l, i) => {
            if (newLocation === transferData.originIndex) {return l}
            if (i === newLocation) {return l.concat(transferData.targetID)}
            if (i === transferData.originIndex) {
                console.log(l, transferData.targetID)
                return l.filter(id => id !== transferData.targetID)
            }
            else {return l}
        })
    ))

    event
        .dataTransfer
        .clearData();
}