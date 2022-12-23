const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const DatabaseManager = require('../data_management/databaseManager')

class AuthenticationManager 
{
    handleUserSignin = async (req, res, dbManager) => {    
        const { token }  = req.body    
    
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        });
    
        const { name, email, picture } = ticket.getPayload();  
    
        return await dbManager.runQuery(
            `
                MERGE (u:User {email: "${email}"})
                ON CREATE SET u.name = "${name}", u.picture = "${picture}"
                ON MATCH  SET u.name = "${name}", u.picture = "${picture}"
                RETURN u
            `
        );
    }
    
    checkIfUserExists = async (req, res, dbManager) => {
        return await dbManager.runQuery (
            `
                MATCH (u:User) 
                WHERE ID(u) = ${req.session.userId} 
                RETURN u
            `
        )
    }
}

module.exports = AuthenticationManager