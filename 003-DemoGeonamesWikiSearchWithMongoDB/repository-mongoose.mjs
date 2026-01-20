import mongoose from "mongoose";

const BASE_URL = 'mongodb://localhost:27017/wikiGeonamesDB';
mongoose.connect(BASE_URL);

const schemaJson = {
    geonames: Array,
    query: String,
    lastQueryDateTime: Date,
    queryCount: Number
}

const schema = new mongoose.Schema(schemaJson, {collection: "wiki", versionKey: false});
const wiki = mongoose.model("wiki", schema);

export const dataFromMongoose = async (query) => {
    query = query.toLowerCase();
    const result = await wiki.find({query});

    if (result[0] !== undefined) {
        const queryCount = result[0].queryCount + 1;
        await wiki.updateOne({query}, {$set: {lastQueryDateTime: new Date(), queryCount: queryCount}});
    }

    return result;
}

export const saveMongoose = async (query, json) => {
    json.query = query;
    json.lastQueryDateTime = new Date();
    json.queryCount = 1;
    await wiki.create(json);
}