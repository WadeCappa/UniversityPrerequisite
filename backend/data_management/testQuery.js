const DatabaseManager = require('./runCypher.js')




const dbManager = new DatabaseManager();

(async() => {
    await dbManager.runQuery(`match (:Executable {title:"B.S in Computer Science"})-[:REQUIRES*..]->(p:Task)
    match (p)-[r :REQUIRES]->(c) return distinct p.subject,p.number, r.pathID, c.subject, c.number`);
})();