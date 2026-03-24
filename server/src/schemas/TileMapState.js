const schema = require('@colyseus/schema');
const { Schema, type, MapSchema } = require('@colyseus/schema');
const PlayerState = require('./PlayerState');

class TileMapState extends Schema {
    constructor() {
        super();
        this.players = new MapSchema();
    }
}

type({ map: PlayerState })(TileMapState.prototype, "players");

module.exports = TileMapState;
