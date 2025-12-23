const fs = require("node:fs");
const path = require("node:path");

const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT;
const FILEPATH = path.join(__dirname, "data", "task.json");

const app = express();


const initFile = () => {
    fs.writeFileSync(FILEPATH, "[]")
}

app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
    if (!fs.existsSync(FILEPATH)) {
        initFile();
    }

    const data = JSON.parse(fs.readFileSync(FILEPATH));

    if (req.query.id) {
        const id = req.query.id;
        const result = data.filter(e => e.id == id);

        if (result[0]) {
            res.status(200);
            res.json(result[0]);
        } else {
            res.status(404);
            res.json("not found");
        }
    } else {
        res.status(200);
        res.json(data);
    }
})

app.post("/tasks", (req, res) => {
    if (!fs.existsSync(FILEPATH)) {
        initFile();
    }

    console.log(req.body);

});

// app.patch();

// app.delete();


app.listen(PORT);