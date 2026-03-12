const Colyseus = require('colyseus');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const gameServer = new Colyseus.Server({ server });

gameServer.listen(2567);
