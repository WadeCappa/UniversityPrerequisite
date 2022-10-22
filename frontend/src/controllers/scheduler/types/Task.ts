export type TaskData = {
    taskID: number;
    subject: String;
    number: number;
    slotWeight: number;
    title: String;
    description: String;
}

export type Task = {
    taskData: TaskData;
    parents: number[];
    children: number[];
}

