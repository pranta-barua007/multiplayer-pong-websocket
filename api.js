const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const api = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

api.use(helmet());
api.use(cors(corsOptions));

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', express.static('index.html'));

module.exports = api;