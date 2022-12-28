import express from "express"
import bodyParser from "body-parser";
import cors from "cors"

import * as dotenv from "dotenv";
dotenv.config({ path:  __dirname+'/.env' });

import cookieParser from "cookie-parser"

import DatabaseManager from "./data_management/databaseManager";
import AuthenticationManager from "./user_management/authenticationManager";
import TypeBuilder, { DegreeRequirement, LookupTable, Task, User } from "./data_management/typeBuilder";
import DataHandler from "./dataHandler";

const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3001/tasks?for=B.S%20in%20Computer%20Science&at=Washington%20State%20University"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
);

// Configuring body parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/auth/login', (req: any, res: any) => {
    AuthenticationManager.createNewUser(req.body.token).then((user: User) => {
        res.status(201)
        res.json(AuthenticationManager.generateAccessToken(user.id))
    });
})

app.delete("/auth/logout", async (req: any, res: any) => {
    // destroy jwt token
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

app.get("/auth/me", async (req: any, res: any) => {
    res.status(200)
    res.json(req.user)
})

app.get('/organizations', (req: any, res: any) => {
    DatabaseManager.runQuery("match (o: Organization) return ID(o) as ordID, o.title as title, o.slots_per_bucket as slots_per_bucket").then((output) => {
        // make sure r is of the correct type
        res.json(output.map(r => TypeBuilder.buildOrganization(r)));
    })
});

app.get('/parent_organization', (req: any, res: any) => {
    const orgTitle = req.query.orgTitle;

    DatabaseManager.runQuery(`match (o: Organization {title:"${orgTitle}"}) return ID(o) as ordID, o.title as title, o.slots_per_bucket as slots_per_bucket`).then((output) => {
        // make sure r is of the correct type
        res.json(output.map(r => TypeBuilder.buildOrganization(r)));
    })
})

app.get('/objectives', (req: any, res: any) => {
    const orgTitle = req.query.orgTitle;

    DatabaseManager.runQuery(`match (:Organization {title:"${orgTitle}"})-[]->(r:Objective) return ID(r) as id, r.title as title`).then((output) => {
        // make sure r is of the correct type
        res.json(output.map(r => TypeBuilder.buildObjective(r)));
    })
})

app.get('/tasks', async (req: any, res: any) => {
    // make sure values exist before running query
    const degrees: number[] = req.query.for.split(',').map((d:any) => Number(d));
    const orgTitle: string = req.query.at

    const lookupTable: LookupTable = await DataHandler.GetLookupTable(orgTitle, degrees)
    const degreeRequirements: DegreeRequirement[] = await DataHandler.GetDegreeRequirements(degrees)

    res.json({
        taskTable: lookupTable,
        degreeRequirements: degreeRequirements
    });
})

app.post('/saveSchedule', AuthenticationManager.authenticateTokenMiddleware, (req: any, res: any) => {
    const degreeIDs: number[] = req.body.degrees 
    const schedule: number[][] = req.body.schedule 
    const userId: number = req.user

    DataHandler.InitializeSchedule(degreeIDs, schedule, userId)
})

app.listen(port, () => console.log(`Listening on ${port}!`));