import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)

import DatabaseManager from "../data_management/databaseManager";
import jwt from 'jsonwebtoken';
import TypeBuilder, { User } from "../data_management/typeBuilder";

export default class AuthenticationManager
{
    public static async createNewUser (token: string): Promise<User> {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        });

        const { name, email, picture } = ticket.getPayload();
        console.log(name, email, picture)

        return (await DatabaseManager.runMutation(
            `
                MERGE (u:User {email: "${email}"})
                ON CREATE SET u.name = "${name}", u.picture = "${picture}"
                ON MATCH  SET u.name = "${name}", u.picture = "${picture}"
                RETURN ID(u) as userId, u.email as email, u.name as name
            `
        )).map((r: any) => TypeBuilder.buildUser(r))[0];
    }

    public static async checkIfUserExists (userId: number) {
        return await DatabaseManager.runQuery (
            `
                MATCH (u:User)
                WHERE ID(u) = ${userId}
                RETURN u
            `
        )
    }

    public static generateAccessToken(userId: number) {
        console.log(userId)
        return jwt.sign({id: userId}, process.env.JWT_SECRET, { expiresIn: '1800s' });
    }

    public static authenticateTokenMiddleware(req: any, res: any, next: any) {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        console.log(`looking at token ${token}`)

        if (token === null || token === undefined || token === 'undefined') {
            console.log("no auth token")
            return res.sendStatus(401)
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }

            req.user = user.id
        })
        next()
    }

}