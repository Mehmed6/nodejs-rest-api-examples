import {fetchWikiSearchInfo} from "./geonamesWikisearch.mjs";
import {dataFromMongoDB, save} from "./repository.mjs";


const mongoCallback = async (req, res) => {
    try {
        const query = req.query.q;
        const fromMongoDB = await dataFromMongoDB(query);

        if (fromMongoDB.length !== 0) {
             return res.json(fromMongoDB);
        }
        else {
            const result = await fetchWikiSearchInfo(query);

            if (result.geonames.length > 0) {
                res.json(result);
                await save(query, result)
            }
            else
                res.status(400).json({query, error: "No data found"});
        }


    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export const createEndpoints = app => {
    app.get("/api/geo/mongo", mongoCallback);
}

export const startService =(app, port) =>{
    app.listen(port, () => console.log(`Listening on port ${port}`));
}