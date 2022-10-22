import { TaskTable } from "./types/StateConstructor";
import { Organization } from "./types/Organization";

export default class DataEngine {
    public static async GetInPathCourses(): Promise<TaskTable> {
        return await (await fetch('http://localhost:8081/tasks-for/B.S%20in%20Computer%20Science')).json() as TaskTable;
    }

    public static async GetOrganizations(): Promise<Organization[]> {
        return await (await fetch('http://localhost:8081/orgs')).json() as Organization[]
    }
}

