const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const DatabaseManager = require('../data_management/databaseManager')
const jwt = require('jsonwebtoken');

class AuthenticationManager 
{
    createNewUser = async (token, dbManager) => {       
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        });

        const { name, email, picture } = ticket.getPayload();  
    
        return await dbManager.runMutation(
            `
                MERGE (u:User {email: "${email}"})
                ON CREATE SET u.name = "${name}", u.picture = "${picture}"
                ON MATCH  SET u.name = "${name}", u.picture = "${picture}"
                RETURN ID(u) as userId, u.email as email, u.name as name
            `
        );
    }
    
    checkIfUserExists = async (userId, dbManager) => {
        return await dbManager.runQuery (
            `
                MATCH (u:User) 
                WHERE ID(u) = ${userId} 
                RETURN u
            `
        )
    }

    generateAccessToken(user_id, user_email, user_name) {
        return jwt.sign({user_id, user_email, user_name}, process.env.JWT_SECRET, { expiresIn: '1800s' });
    }

    authenticateTokenMiddleware(req, res, next) {
        const authHeader = req.headers['authorization']
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1]

        console.log(`looking at token ${token}`)
      
        if (token === null || token === undefined || token === 'undefined') {
            console.log("no auth token")
            return res.sendStatus(401)
        }
      
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }      
            req.user = user
        })
        next()
    }
      
}

module.exports = AuthenticationManager