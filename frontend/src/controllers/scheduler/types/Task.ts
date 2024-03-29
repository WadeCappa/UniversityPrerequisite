export enum Focus {
    NotInFocus = 0,
    Focus = 1,
    InPath = 2,
}

export type TaskData = {
    id: number;
    subject: String;
    number: number;
    slotWeight: number;
    title: String;
    description: String;
    focus: Focus;
    parents: number[];
    children: number[][];
}

