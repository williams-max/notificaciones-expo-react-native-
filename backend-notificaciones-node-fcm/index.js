const express = require('express');
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');


const PORT = process.env.PORT || 4000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(cors({
    origin: '*'
}));

const showRoutes = require("./routes/index.js");
server.use("/api", showRoutes(server));
server.get('/', async (req, res) => {

    res.send("backend node js");
});

function handleErrors(err, req, res, next) {
    console.log(err);


    res.status(500).send('An internal server error occurred');
};

server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on ${PORT}`);
});

