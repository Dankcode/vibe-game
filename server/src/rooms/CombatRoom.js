const Colyseus = require('colyseus');

class CombatRoom extends Colyseus.Room {
    onCreate(options) { }
    onJoin(client, options) { }
    onLeave(client, consented) { }
}

module.exports = CombatRoom;
