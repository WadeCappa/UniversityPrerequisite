import { TaskData } from "./Task"

export type MakerState = {
    taskTable: TaskTable,
    keyLists: number[][],
    degreeIDs: number[]
}

export type TaskTable = {
    [id: number]: TaskData;
}

export function makeState (taskTable: TaskTable, keyLists: number[][], degreeIDs: number[]): MakerState {
    return {taskTable, keyLists, degreeIDs}
}