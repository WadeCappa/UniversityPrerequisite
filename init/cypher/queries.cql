// Get all executables downstream from a parent executalbe
match (:Executable {title:"B.S in Computer Science"})-[*..]->(t) return t