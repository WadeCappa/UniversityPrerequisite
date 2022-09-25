import Task from "../components/task";

export const displayCourses = (IDs, table, originID) => {
    return IDs.map(id => table[id].data).sort((a, b) => {
        if (a.subject == b.subject) {
            return a.number < b.number; 
        }
        else {
            return a.subject > b.subject;
        }
    }).map(task => {return (<Task task={task} origin={originID}/>)})
}