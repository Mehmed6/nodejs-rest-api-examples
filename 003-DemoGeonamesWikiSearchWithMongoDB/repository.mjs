import {MongoClient} from 'mongodb';

const MongoDbURL = 'mongodb://localhost:27017';

const connect = async () => await MongoClient.connect(MongoDbURL);

export const dataFromMongoDB = async (query) => {
    let client = null;

    try {
        client = await connect();
        const db = client.db("wikiGeonamesDB");
        const collection = db.collection("wiki");
        query = query.toLowerCase();
        const data =  await collection.find({query}).toArray();

        if (data.length !== 0) {
            const queryCount = data[0].queryCount + 1;
            await collection.updateOne({query}, {$set: {lastQueryDateTime: new Date(), queryCount: queryCount}});
        }

        return data;
    }
    finally {
        if (client) await client.close();
    }
}

export const save = async (query, data) => {
    let client = null;

    try {
        client = await connect();
        console.log("Connected to MongoDB");
        const db = client.db("wikiGeonamesDB");
        const collection = db.collection("wiki");
        data.query = query;
        data.lastQueryDateTime = new Date();
        data.queryCount = 1;
        const id = await collection.insertOne(data);

        console.log("Data inserted with id:", id.insertedId);
    }
    finally {
        if (client) await client.close();
    }
}