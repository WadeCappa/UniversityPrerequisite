export type Organization = {
    title: string,
    slots_per_bucket: number,
    id: number
}

export type Objective = {
    id: number,
    title: string
}

export type Task = {
    id: number,
    subject: string,
    number: number,
    slotWeight: number,
    title: string,
    description: string,
    parents: number[],
    children: number[][]
}

export type LookupTable = {
    [id: number]: Task;
}

export default class TypeBuilder
{
    public static buildOrganization(record: any): Organization {
        return {
            "title": record.get("title"),
            "slots_per_bucket": record.get("slots_per_bucket").low,
            "id": record.get("ordID").low
        } as Organization
    }

    public static buildObjective(record: any) {
        return {
            "id": record.get("id").low,
            "title": record.get("title"),
        } as Objective
    }

    public static buildTask(record: any) {
        return {
            "id": record.get("id").low,
            "subject": record.get("subject"),
            "number": record.get("number").low,
            "slotWeight": record.get("weight").low,
            "title": record.get("title"),
            "description": record.get("description"),
            "parents": record.get("parents").map((r:any) => r.low),
            "children": record.get("children").map((r:any) => r.map((e:any) => e.low))
        } as Task
    }

    public static buildLookupTable(tasks: Task[]): LookupTable {
        const res = {} as LookupTable
        tasks.forEach(t => res[t.id] = t)
        return res
    }
}