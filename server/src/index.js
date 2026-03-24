const Colyseus = require('colyseus');
const http = require('http');
const express = require('express');
const WorldRoom = require('./rooms/WorldRoom');

const app = express();
const server = http.createServer(app);
const gameServer = new Colyseus.Server({ server });

// Define room handlers
gameServer.define('world', WorldRoom);

gameServer.listen(2567);

console.log('[Server] Game server listening on port 2567');
