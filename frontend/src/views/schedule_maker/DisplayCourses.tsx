import React from 'react';
import Scheduler from '../../controllers/scheduler/Scheduler';
import { SchedulerState } from '../../controllers/scheduler/types/SchedulerState';
import Task from './Task';

export const displayCourses = (state: SchedulerState, originID: number) => {
    return Scheduler.tasksToTaskData(state, originID).map(task => {return (
        <div style={{backgroundColor:`${Scheduler.visualizeFocus(task.focus)}`}}>
            <Task 
                task={task} 
                origin={originID} 
                onEnter={(taskID: number) => {Scheduler.onTaskMouseEnter(taskID, state)}}
                onLeave={(taskID: number) => {Scheduler.onTaskMouseLeave(taskID, state)}}
            />
        </div>

    )})
}

export const displayCapacity = (state: SchedulerState, originID: number) => {
    return (
        <div>
            {Scheduler.sumCurrentTaskWeights(state, originID)} / 18
        </div>
    )
}