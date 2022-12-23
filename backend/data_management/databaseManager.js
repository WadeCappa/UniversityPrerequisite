const neo4j = require('neo4j-driver');
require("dotenv/config"); 

class DatabaseManager
{
    constructor() {
        this.uri = process.env.URI;
        this.user = 'neo4j';
        this.password = process.env.PASSWORD;
        
        // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
        this.driver = neo4j.driver(this.uri, neo4j.auth.basic(this.user, this.password));
    }

    runTransaction = async (databaseTransaction) => {
        const session = this.driver.session({ database: 'neo4j' });
        const result = await databaseTransaction(session);
        session.close();
        return result.records;
    }

    runQuery = async(cypherText) => {
        return await this.runTransaction(async (session) => await session.executeRead(tx => tx.run(cypherText)));
    }

    runMutation = async(cypherText) => {
        return await this.runTransaction(async (session) => await session.executeWrite(tx => tx.run(cypherText)))
    }
};


module.exports = DatabaseManager