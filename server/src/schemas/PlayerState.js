const schema = require('@colyseus/schema');

class PlayerState extends schema.Schema { }
schema.defineTypes(PlayerState, {
    x: "number",
    y: "number"
});

module.exports = PlayerState;
