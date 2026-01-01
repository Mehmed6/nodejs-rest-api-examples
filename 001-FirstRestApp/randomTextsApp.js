import express from "express";

const app = express();

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const createOkJson = texts => {
    return {
        message: texts,
        date: new Date().toLocaleString("tr-TR"),
    }
}
const createErrorJson = text => {
    return {
        message: text,
        date: new Date().toLocaleString("tr-TR"),
    }
}

const callback = (req, res) => {
    const min = parseInt(req.query.min);
    const bound = parseInt(req.query.bound);
    let len = parseInt(req.params.len);
    let texts = [];
    let text = "";

    if (isNaN(min) || isNaN(bound) || isNaN(len)) {
        res.json(createErrorJson("Parameters 'min','bound' and 'length' are required and must be numbers."))
        return;
    }

    if (min >= bound) {
        res.json(createErrorJson("'min' must be less than 'bound'."));
        return;
    }

    while (len-- > 0) {
        const value = Math.floor(Math.random() * (bound - min)) + min;
        for (let i =0; i < value; i++)
            text += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
        texts.push(text);
        text = "";
    }

    res.json(createOkJson(texts));

}

app.get("/api/generator/texts/:len", (req, res) => callback(req, res));
app.listen(60601, () => console.log("Server running on port 60601"));