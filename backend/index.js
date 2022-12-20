const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const DatabaseManager = require('./data_management/runCypher.js')
const TypeBuilder = require("./data_management/typeBuilder")

const dbManager = new DatabaseManager();
const typeBuilder = new TypeBuilder();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/organizations', (req, res) => {
    dbManager.runQuery("match (o: Organization) return ID(o) as ordID, o.title as title, o.slots_per_bucket as slots_per_bucket").then((output) => {
        res.json(output.map(r => typeBuilder.buildOrganization(r)));
    })
});

app.get('/objectives', (req, res) => {
    const orgTitle = req.query.orgTitle;

    dbManager.runQuery(`match (:Organization {title:"${orgTitle}"})-[]->(r:Objective) return ID(r) as id, r.title as title`).then((output) => {
        res.json(output.map(r => typeBuilder.buildObjective(r)));
    })
})

app.get('/tasks', (req, res) => {
    const degrees = req.query.for;
    const orgTitle = req.query.at

    dbManager.runQuery(
        `
            MATCH (:Organization {title:"${orgTitle}"})-[]->(:Executable {title:"${degrees}"})-[*..]->(task: Task)
            WITH task, [(task)<-[]-()<-[]-(x:Task) | ID(x)] AS parents,  [(x:Path)<-[]-(task) | [(y:Task)<-[]-(x) | ID(y)]] AS children
            RETURN distinct ID(task) as id, task.subject as subject, task.number as number, task.weight as weight, task.title as title, task.description as description, parents, children
            ORDER BY ID(task)
        `
    ).then((output) => {
        res.json(typeBuilder.buildLookupTable(output.map(r => typeBuilder.buildTask(r))));
    })
})

app.listen(port, () => console.log(`Listening on ${port}!`));