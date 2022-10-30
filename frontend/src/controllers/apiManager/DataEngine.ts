import { TaskTable } from "../scheduler/types/StateConstructor";
import { Organization } from "../scheduler/types/Organization";
import { Objective } from "../scheduler/types/Objective";

export default class DataEngine {
    // should be enviroment variable
    private static url = "http://localhost:4000"

    public static async GetInPathCourses(university: string, degrees: string): Promise<TaskTable> {
        return await (await fetch(`${DataEngine.url}/data/tasks?tasks-for="${degrees}"&at="${university}"`)).json() as TaskTable;
    }

    public static async GetOrganizations(): Promise<Organization[]> {
        return await (await fetch(`${DataEngine.url}/data/organizations/`)).json() as Organization[]
    }

    public static async GetDegrees(organizationTitle: string): Promise<Objective[]> {
        return await (await fetch(`${DataEngine.url}/data/objectives?orgTitle="${organizationTitle}"`)).json() as Objective[]
    }

    public static async GetJWT(email: string, password: string): Promise<string> {
        return await (await fetch(`${DataEngine.url}/auth/signin?email=${email}&password=${password}`)).json() as string
    }
}