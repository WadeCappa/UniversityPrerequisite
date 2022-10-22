import { TaskTable } from "./types/stateConstructor";

export default class DataEngine {
    public static async GetInPathCourses(): Promise<TaskTable> {
        return await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json() as TaskTable;
    }
}