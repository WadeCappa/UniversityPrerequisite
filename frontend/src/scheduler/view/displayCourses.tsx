import React from 'react';
import { Engine, tasksToTaskData } from '../logic/engine';
import Task from './task';

export const displayCourses = (engine: Engine, originID: number) => {
    return tasksToTaskData(engine, originID).map(task => {return (<Task task={task} origin={originID} />)})
}