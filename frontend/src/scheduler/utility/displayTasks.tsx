import React from "react";
import Task from "./../components/task";
import { TaskTable } from "../types/stateConstructor";

export const displayCourses = (IDs: number[], table: TaskTable, originID: number) => {
    return IDs.map(id => table[id].taskData).sort((a, b) => {
        return (a.subject == b.subject) ? Number(a.number < b.number) : Number(a.subject > b.subject);
    }).map(task => {return (<Task task={task} origin={originID}/>)})
}