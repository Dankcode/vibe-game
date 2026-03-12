const Colyseus = require('colyseus');

class WorldRoom extends Colyseus.Room {
    onCreate(options) { }
    onJoin(client, options) { }
    onLeave(client, consented) { }
}

module.exports = WorldRoom;
