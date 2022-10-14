import React from "react";
import Task from "../../view/task";
import { TaskTable } from "../types/stateConstructor";
import { Engine } from "../engine"

export const displayCourses = (IDs: number[], table: TaskTable, originID: number) => {
    return IDs.map(id => table[id].taskData).sort((a, b) => {
        return (a.subject == b.subject) ? Number(a.number < b.number) : Number(a.subject > b.subject);
    }).map(task => {return (<Task task={task} origin={originID}/>)})
}