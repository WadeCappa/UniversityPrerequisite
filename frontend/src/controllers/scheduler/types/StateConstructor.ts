import { TaskData } from "./Task"

export type MakerState = {
    taskTable: TaskTable;
    keyLists: number[][];
}

export type TaskTable = {
    [id: number]: TaskData;
}

export function makeState (taskTable: TaskTable, keyLists: number[][]): MakerState {
    return {taskTable, keyLists}
}