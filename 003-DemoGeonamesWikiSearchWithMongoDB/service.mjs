import {dataFromMongoDB, save} from "./repository.mjs";
import {fetchWikiSearchInfo} from "./geonamesWikisearch.mjs";
import {dataFromMongoose, saveMongoose} from "./repository-mongoose.mjs";

const fetchDataByMongoDb = async (query) => {
    const data = await dataFromMongoDB(query);

    if (data.length !== 0)
        return {"geonames": data[0].geonames};

    const jsonData = await fetchWikiSearchInfo(query);

    if (jsonData.geonames.length !== 0)
        await save(query, jsonData);

    return {"geonames": jsonData.geonames};
}

const fetchDataByMongoose = async (query) => {
    const data = await dataFromMongoose(query);

    if (data[0] !== undefined)
        return {"geonames" : data[0].geonames};

    const jsonData = await fetchWikiSearchInfo(query);

    await saveMongoose(query, jsonData);

    return {"geonames": jsonData.geonames};
}

export const fetchData = async (query) => {
    return await fetchDataByMongoose(query);
}
