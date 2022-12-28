import { DegreeRequirements } from "./DegreeRequirements";
import { TaskData } from "./Task"

export type MakerState = {
    taskTable: TaskTable,
    keyLists: number[][],
    degreeReqs: DegreeRequirements[]
}

export type TaskTable = {
    [id: number]: TaskData;
}

export function makeState (taskTable: TaskTable, keyLists: number[][], degreeReqs: DegreeRequirements[]): MakerState {
    return {taskTable, keyLists, degreeReqs}
}