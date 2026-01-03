import {Client} from "pg";

const clientInfoDev = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password : "csd1993",
    database : "postalcodesearchdb_dev"
}

const clientInfo = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password : "csd1993",
    database : "postalcodesearchdb"
}

const connect = async dbClient => {
    try {
        await dbClient.connect();
    } catch (e) {
        console.log(`Connection Error:${e.message}`)
        throw e;
    }
}

export const createDevDbClient = async () => {
    const client = new Client(clientInfoDev);
    await connect(client);

    await client.query("truncate table postal_code_info restart identity");
    await client.query("truncate table postal_code_query_info restart identity");
    await client.query("truncate table postal_codes cascade");

    return client;
}

export const createDbClient = async () => {
    const client = new Client(clientInfo);
    await connect(client);
    return client;
}
