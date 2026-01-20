import {fetchData} from "./service.mjs";

const geoWikiCallback = async (req, res) => {
    try {
        const query = req.query.q;
        const findData = await fetchData(query);

        if (findData.geonames.length !== undefined) {
             res.json(findData);
        }
        else
            res.status(400).json(findData);

    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export const createEndpoints = app => {
    app.get("/api/geo/mongo", geoWikiCallback);
}

export const startService =(app, port) =>{
    app.listen(port, () => console.log(`Listening on port ${port}`));
}