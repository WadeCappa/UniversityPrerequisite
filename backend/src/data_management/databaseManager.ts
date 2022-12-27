import neo4j, { QueryResult, Session } from "neo4j-driver";

export  default class DatabaseManager
{
    private static async runTransaction (databaseTransaction: (s: Session) => Promise<QueryResult>) {
        const driver = neo4j.driver(process.env.URI, neo4j.auth.basic('neo4j', process.env.PASSWORD));
        const session = driver.session({ database: 'neo4j' });
        const result = await databaseTransaction(session);
        session.close();
        return result.records;
    }

    public static async runQuery (cypherText: string) {
        return await this.runTransaction(async (session: Session) => await session.executeRead(tx => tx.run(cypherText)));
    }

    public static async runMutation (cypherText: string) {
        return await this.runTransaction(async (session: Session) => await session.executeWrite(tx => tx.run(cypherText)))
    }
};