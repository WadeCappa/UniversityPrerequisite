SELECT parent_id, objective_id, path_id, child_executable_id 
FROM path, task, objective, in_path 
WHERE (path.parent_id = objective.objective_id OR path.parent_id = task.task_id) 
AND (task.parent_org = 322548944 OR objective.parent_org = 322548944) 
AND in_path.parent_path = path.path_id 
order by parent_id, path_id;

SELECT parent_id, path_id, child_executable_id
FROM path, in_path, (
    SELECT (executable_id)
    FROM executable, task 
    WHERE executable.executable_id = task.task_id 
    AND task.parent_org = 322548944 
    UNION 
    SELECT (executable_id)
    FROM executable, objective 
    WHERE executable.executable_id = objective.objective_id
    AND objective.parent_org = 322548944 
) as exe 
WHERE path.parent_id = exe.executable_id
AND in_path.parent_path = path.path_id
ORDER BY parent_id, path_id;