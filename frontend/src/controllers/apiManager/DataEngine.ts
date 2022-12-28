import { MakerState, TaskTable } from "../scheduler/types/StateConstructor";
import { Organization } from "../scheduler/types/Organization";
import { Objective } from "../scheduler/types/Objective";

type Request = {
    url: string,
    method: string, 
    body: string,
    jwt: string
}

export default class DataEngine {
    // should be enviroment variable
    private static url = "http://localhost:3001"

    public static async GetInPathCourses(university: string, degrees: string, jwt: string): Promise<TaskTable> {
        return await (await this.BundleRequest({
            url: `${DataEngine.url}/tasks?for=${degrees}&at=${university}`,
            method: "GET", 
            jwt: jwt
        } as Request )).json() as TaskTable;
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

    public static async Login(userId: string): Promise<Response> {
        return await this.BundleRequest({
            url: `${DataEngine.url}/auth/login`,
            method: "POST",
            body: JSON.stringify({
                token: userId
            }),
        } as Request);
    }

    public static async SaveSchedule(state: MakerState, userToken: string): Promise<Response> {
        console.log(`looking at token: ${userToken}`)
        return await this.BundleRequest({
            url: `${DataEngine.url}/saveSchedule`,
            method: "POST",
            jwt: userToken,
            body: JSON.stringify({
                token: userToken,
                schedule: state.keyLists,
                degrees: state.degreeReqs
            }),
        } as Request);
    }

    private static async BundleRequest(message: Request): Promise<Response> {
        return await fetch(message.url, {
                method: message.method,
                headers:{
                  'Content-Type': 'application/json',
                  'authorization': `bearer ${message.jwt}`,
                },
                body: message.body,
                credentials: "same-origin",
            }
        )
    }
}