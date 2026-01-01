import express from "express";

const app = express();

const createJson = (text, req) => {
    return {
        message: text,
        status: req.query.married === "" ? "married" : "not married",
        date: new Date().toLocaleString("tr-TR"),
        remoteAddress: req.connection.remoteAddress.substring("::ffff:".length),
        remotePort: req.connection.remotePort,
        localPort: req.connection.remotePort

    }
}

const isUndefined = param => param === undefined;

const callback = (req, res) => {
    let text = "Parameters required -> ";
    let status = 200;

    if (isUndefined(req.query.first_name)) {
        text += "first_name ";
        status = 400;
    }
    if (isUndefined(req.query.last_name)) {
        text += "last_name ";
        status = 400;
    }

    if (status === 200) {
        text = `Merhaba ${req.query.first_name} ${req.query.last_name}`;
    }

    res.status(status);
    res.json(createJson(text, req));
}

app.get("/api/greetings", (req, res) => callback(req, res));
app.listen(50500, () => console.log("Server running on port 5050"));