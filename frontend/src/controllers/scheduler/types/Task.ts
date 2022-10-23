export enum Focus {
    NotInFocus = 0,
    Focus = 1,
    InPath = 2,
}


export type TaskData = {
    taskID: number;
    subject: String;
    number: number;
    slotWeight: number;
    title: String;
    description: String;
    focus: Focus;
}

export type Task = {
    taskData: TaskData;
    parents: number[];
    children: number[];
}

