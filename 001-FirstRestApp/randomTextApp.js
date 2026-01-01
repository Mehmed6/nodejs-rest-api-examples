import express from "express";

const app = express();

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const createJson = text => {
    return {
        message: text,
        date: new Date().toLocaleString("tr-TR"),
    }
}
const callback = (req, res) => {
    const min = parseInt(req.query.min);
    const bound = parseInt(req.query.bound);
    let text = "";
    let status = 200;

    if (isNaN(min) || isNaN(bound)) {
        text = "Parameters 'min' and 'bound' are required and must be numbers.";
        status = 400;
    }

    if (min >= bound) {
        text = "'min' must be less than 'bound'.";
        status = 400;
    }

    const value = Math.floor(Math.random() * (bound - min)) + min;
    for (let i = 0; i < value; i++)
        text += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));

    res.status(status)
    res.json(createJson(text));
};

app.get("/api/random", (req, res) => callback(req, res));
app.listen(60600, () => console.log("Server running on port 60600"));