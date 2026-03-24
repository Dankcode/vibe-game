const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const type = schema.type;

class PlayerState extends Schema {
    constructor() {
        super();
        // Initialize empty inventory
        this.inventory = new MapSchema();
    }
}

type("string")(PlayerState.prototype, "userId");
type("number")(PlayerState.prototype, "x");
type("number")(PlayerState.prototype, "y");
type("number")(PlayerState.prototype, "z");
type({ map: "number" })(PlayerState.prototype, "inventory");

module.exports = PlayerState;
