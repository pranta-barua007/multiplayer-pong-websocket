const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const api = express();

api.use(helmet({
    contentSecurityPolicy: false,
}));
api.use(cors());

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', express.static('index.html'));

module.exports = api;