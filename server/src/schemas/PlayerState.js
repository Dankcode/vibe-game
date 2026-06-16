const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const type = schema.type;

class PlayerState extends Schema {
    constructor() {
        super();
        // Initialize empty inventory
        this.inventory = new MapSchema();
        this.centerX = 0;
        this.centerY = 0;
        this.centerZ = 0;
    }
}

type("string")(PlayerState.prototype, "userId");
type("float64")(PlayerState.prototype, "x");
type("float64")(PlayerState.prototype, "y");
type("float64")(PlayerState.prototype, "z");
type("float32")(PlayerState.prototype, "centerX");
type("float32")(PlayerState.prototype, "centerY");
type("float32")(PlayerState.prototype, "centerZ");
type("int32")(PlayerState.prototype, "tileX");
type("int32")(PlayerState.prototype, "tileY");
type("int32")(PlayerState.prototype, "tileZ");
type("int32")(PlayerState.prototype, "chunkX");
type("int32")(PlayerState.prototype, "chunkY");
type({ map: "number" })(PlayerState.prototype, "inventory");

module.exports = PlayerState;
