import express from "express";

const app = express();

const firstHelloGetCallback = (req, res) => {
    console.log("Hello World!");
    const now = new Date().toLocaleString("tr-TR");

    res.json({ message: `Hello ${req.params.name}`, "date": now });
}

const greetingsHiCallback = (req, res) => {
    console.log("Hi there!");
    const now = new Date().toLocaleString("tr-TR");
    res.json({message: `Merhaba ${req.query.name} ${req.query.age}`, "date": now });
}

app.get("/first/app/:name", (req, res) => firstHelloGetCallback(req, res));
app.get("/greetings/hi", (req, res) => greetingsHiCallback(req, res));

app.listen(50500, () => console.log("Server running on port 5050"));