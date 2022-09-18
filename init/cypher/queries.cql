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
MATCH (:Executable {title:"B.S in Computer Science"})-[*..]->(n: Task)
WITH n, [(n)<-[]-()<-[]-(x:Task) | ID(x)] as parents,  [(x:Task)<-[]-()<-[]-(n) | ID(x)] as children
RETURN ID(n), n.subject, n.number, n.title,n.weight, parents, children