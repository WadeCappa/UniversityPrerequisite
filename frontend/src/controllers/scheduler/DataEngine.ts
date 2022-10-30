import { TaskTable } from "./types/StateConstructor";
import { Organization } from "./types/Organization";
import { Objective } from "./types/Objective";

export default class DataEngine {
    // should be enviroment variable
    private static url = "http://localhost:4000/data"

    public static async GetInPathCourses(university: string, degrees: string): Promise<TaskTable> {
        return await (await fetch(`${DataEngine.url}/tasks?tasks-for="${degrees}"&at="${university}"`)).json() as TaskTable;
    }

    public static async GetOrganizations(): Promise<Organization[]> {
        return await (await fetch(`${DataEngine.url}/organizations/`)).json() as Organization[]
    }

    public static async GetDegrees(organizationTitle: string): Promise<Objective[]> {
        return await (await fetch(`${DataEngine.url}/objectives?orgTitle="${organizationTitle}"`)).json() as Objective[]
    }
}

