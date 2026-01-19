import {MongoClient} from 'mongodb';

const MongoDbURL = 'mongodb://localhost:27017';

const connect = async () => await MongoClient.connect(MongoDbURL);

export const dataFromMongoDB = async (query) => {
    let client = null;

    try {
        client = await connect();
        const db = client.db("wikiGeonamesDB");
        const collection = db.collection("wiki");
        return await collection.find({query: {$regex: query, $options: 'i'}}).toArray();
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
        const newData = {data, query};
        const id = await collection.insertOne(newData);

        console.log("Data inserted with id:", id.insertedId);
    }
    finally {
        if (client) await client.close();
    }
}