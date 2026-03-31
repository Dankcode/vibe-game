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
type("float64")(PlayerState.prototype, "x");
type("float64")(PlayerState.prototype, "y");
type("float64")(PlayerState.prototype, "z");
type({ map: "number" })(PlayerState.prototype, "inventory");

module.exports = PlayerState;
