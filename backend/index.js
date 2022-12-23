const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()

const DatabaseManager = require('./data_management/databaseManager.js')
const TypeBuilder = require("./data_management/typeBuilder");
const AuthenticationManager = require('./user_management/authenticationManager.js');

const dbManager = new DatabaseManager();
const authManager = new AuthenticationManager();
const typeBuilder = new TypeBuilder();

const app = express();
const port = process.env.PORT;

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
  );

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
    if (req.session !== undefined)
    {
        const user = await authManager.checkIfUserExists(req, res, dbManager)
        req.user = user
    }
    next()
})

app.post('/auth/login', (req, res) => {
    authManager.handleUserSignin(req, res, dbManager).then(user => {
        req.session.userId = user.id
        res.status(201)
        res.json(user)
    });
})

app.delete("/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

app.get("/auth/me", async (req, res) => {
    res.status(200)
    res.json(req.user)
})

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