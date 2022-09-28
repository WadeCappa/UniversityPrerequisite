import { Task } from "./task"

export type MakerState = {
    taskTable: TaskTable;
    keyLists: number[][];
}

export type TaskTable = {
    [id: number]: Task;
}

export const makeState = (taskTable: TaskTable, keyLists: number[][]): MakerState => {
    return {taskTable, keyLists}
}