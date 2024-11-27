const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.listen(port, function () {
    console.log("Server is listening at port: " + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

app.use('/api', api);
