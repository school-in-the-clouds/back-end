const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);


server.get('/', (req, res) => {
    res.send("The Server Is Listening");
  });

module.exports = server;