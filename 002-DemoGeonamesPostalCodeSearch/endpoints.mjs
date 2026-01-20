import {getPostalCode} from "./postalcodeservice.mjs";

const geoPostalCodeCallback = async (req, res) => {

    try {
        const jsonData = await getPostalCode(req.query.code);

        if (jsonData.myPostalCodes !== undefined)
            res.json(jsonData);
        else
            res.status(400).json(jsonData);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

export const createEndPoints = app => {
    app.get("/api/geo/postalcode", geoPostalCodeCallback);
}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}