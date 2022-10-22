import React from 'react';
import Scheduler from '../../controllers/scheduler/Scheduler';
import { SchedulerState } from '../../controllers/scheduler/types/SchedulerState';
import Task from './task';

export const displayCourses = (state: SchedulerState, originID: number) => {
    return Scheduler.tasksToTaskData(state, originID).map(task => {return (<Task task={task} origin={originID} />)})
}