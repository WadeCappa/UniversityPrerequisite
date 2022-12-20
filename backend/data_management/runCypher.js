const neo4j = require('neo4j-driver');

class DatabaseManager
{
    constructor() {
        this.uri = process.env.URI;
        this.user = 'neo4j';
        this.password = process.env.PASSWORD;
        
        // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
        this.driver = neo4j.driver(this.uri, neo4j.auth.basic(this.user, this.password));
    }

    runQuery = async(cypherText) => {
        const session = this.driver.session({ database: 'neo4j' });
        const result = await this.queryDatabase(cypherText, session);
        session.close();
        return result.records;
    }

    queryDatabase = async(cypherText, session) => {
        return await session.executeRead(tx => tx.run(cypherText));
    }

};


module.exports = DatabaseManager