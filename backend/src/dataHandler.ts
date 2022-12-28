import DatabaseManager from "./data_management/databaseManager";
import TypeBuilder, { DegreeRequirement, LookupTable } from "./data_management/typeBuilder";

export default class DataHandler
{
    public static async GetLookupTable(orgTitle: string, degrees: number[]): Promise<LookupTable>
    {
        return TypeBuilder.buildLookupTable((await DatabaseManager.runQuery(
            `
                MATCH (:Organization {title:"${orgTitle}"})-[]->(exe:Executable)-[*..]->(task: Task)
                WHERE ${degrees.map(id => `ID(exe) = ${id}`).join(' OR ')}
                WITH task, [(task)<-[]-()<-[]-(x:Task) | ID(x)] AS parents,  [(x:Path)<-[]-(task) | [(y:Task)<-[]-(x) | ID(y)]] AS children
                RETURN distinct ID(task) as id, task.subject as subject, task.number as number, task.weight as weight, task.title as title, task.description as description, parents, children
                ORDER BY ID(task)
            `
        )).map(r => TypeBuilder.buildTask(r)));
    }

    public static async GetDegreeRequirements(degrees: number[]): Promise<DegreeRequirement[]> 
    {
        return (await DatabaseManager.runQuery(
            `
                MATCH (exe:Executable)-[]->()-[]->(task: Task)
                WHERE ${degrees.map(id => `ID(exe) = ${id}`).join(' OR ')}
                WITH exe, [(x:Path)<-[]-(exe) | [(y:Task)<-[]-(x) | ID(y)]] AS children
                RETURN distinct ID(exe) as id, exe.title as title, exe.description as description, children
                ORDER BY ID(exe)
            `
        )).map(d => TypeBuilder.buildDegreeRequirement(d))
    }

    public static async InitializeSchedule(degrees: number[], schedule: number[][], userId: number) 
    {
        const [head, ...tail] = schedule;
        const dependentExecutables: [string, string][] = tail.map((l, i) => {
            if (l.length > 0) {
                return [
                    `-[:BUILT_FROM]->(e${i}:Executable)`,
                    `WHERE ${l.map(t => `ID(e${i})=${t}`).join(' OR ')}`
                ]
            }
            else {
                return ["", ""]
            }
        })

        console.log(dependentExecutables)

        const cypherText =             
            `
                MATCH (exe:Executable) 
                ${dependentExecutables.map((l, i) => `CREATE (s:Schedule)-[:COMPOSED_OF]->(sem${i}:Semester)${l[0]}`).join('\n')}
                CREATE (s)-[:MIGHT_USE]->(b:ScheduleBench)-[:BUILD_FROM]->(e:Executable) 
                WHERE ${degrees.map(id => `ID(exe) = ${id}`).join(' OR ')} AND
                ${head.map(t => `ID(e)=${t}`).join(' OR ')} AND
                ${dependentExecutables.map((l, i) => l[1]).join('\n')}
            `

        console.log(cypherText)

        // DatabaseManager.runMutation(
        //     cypherText
        // )
    }
}