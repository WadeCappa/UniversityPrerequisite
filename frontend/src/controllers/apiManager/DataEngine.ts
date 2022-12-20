import { TaskTable } from "../scheduler/types/StateConstructor";
import { Organization } from "../scheduler/types/Organization";
import { Objective } from "../scheduler/types/Objective";

export default class DataEngine {
    // should be enviroment variable
    private static url = "http://localhost:3001"

    public static async GetInPathCourses(university: string, degrees: string): Promise<TaskTable> {
        return await (await fetch(`${DataEngine.url}/tasks?tasks-for=${degrees}&at=${university}`)).json() as TaskTable;
    }

    public static async GetOrganizations(): Promise<Organization[]> {
        return await (await fetch(`${DataEngine.url}/organizations/`)).json() as Organization[]
    }

    public static async GetDegrees(organizationTitle: string): Promise<Objective[]> {
        return await (await fetch(`${DataEngine.url}/objectives?orgTitle=${organizationTitle}`)).json() as Objective[]
    }

    public static async GetJWT(email: string, password: string): Promise<string> {
        return await (await fetch(`${DataEngine.url}/auth/signin?email=${email}&password=${password}`)).json() as string
    }

    public static async NewAccount(email: string, password: string): Promise<string> {
        return await (await fetch(`${DataEngine.url}/auth/createAccount?email=${email}&password=${password}`)).json() as string
    }
}