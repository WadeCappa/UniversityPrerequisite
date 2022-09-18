// Get the paths of all executables downstream from any given executable. 
match (:Executable {title:"B.S in Computer Science"})-[*..]->(t: Task)
match (t)-[h:HAS]->(p:Path)-[con:CONTAINS]->(c:Task) return distinct t.subject, t.number,ID(p), c.subject, c.number
order by ID(p)


// with flat database
match (:Executable {title:"B.S in Computer Science"})-[:REQUIRES*..]->(p:Task)
match (p)-[r :REQUIRES]->(c) return distinct p.subject,p.number, r.pathID, c.subject, c.number


// A more complete query that gets all parents and children. Must make this distinct and refine data returned. 
MATCH (:Executable {title:"B.S in Computer Science"})-[*..]->(n: Task)
WITH n, [(n)<-[]-()<-[]-(x:Task) | x] as parents,  [(x:Task)<-[]-()<-[]-(n) | x] as children
RETURN n, parents, children


// relates each node with parents and siblings.
MATCH (:Executable {title:"B.S in Computer Science"})-[*..]->(task: Task)
WITH task, [(task)<-[]-()<-[]-(x:Task) | ID(x)] AS parents,  [(x:Path)<-[]-(task) | [(y:Task)<-[]-(x) | ID(y)]] AS children
RETURN distinct ID(task), task.subject, task.number, parents, children
ORDER BY ID(task)