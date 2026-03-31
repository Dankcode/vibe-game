const Colyseus = require('colyseus');
const http = require('http');
const express = require('express');
const WorldRoom = require('./rooms/WorldRoom');

const os = require('os');
const app = express();
const server = http.createServer(app);
const gameServer = new Colyseus.Server({ server });

// Function to get local LAN IP
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}

// Define room handlers
gameServer.define('world', WorldRoom);

const PORT = 2567;
const HOST = '0.0.0.0';
const LAN_IP = getLocalIp();

gameServer.listen(PORT, HOST);

console.log(`[Server] Game server listening on ${HOST}:${PORT}`);
console.log(`[Server] LAN Access: ws://${LAN_IP}:${PORT}`);
console.log(`[Server] Invitation Link for LAN players: http://${LAN_IP}:3000`);
