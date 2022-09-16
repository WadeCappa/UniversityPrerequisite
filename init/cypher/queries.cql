// Get the paths of all executables downstream from any given executable. 
match (:Executable {title:"B.S in Computer Science"})-[*..]->(t: Task)
match (t)-[h:HAS]->(p:Path)-[con:CONTAINS]->(c:Task) return distinct t.subject, t.number,ID(p), c.subject, c.number
order by ID(p)


// with flat database
match (:Executable {title:"B.S in Computer Science"})-[:REQUIRES*..]->(p:Task)
match (p)-[r :REQUIRES]->(c) return distinct p.subject,p.number, r.pathID, c.subject, c.number