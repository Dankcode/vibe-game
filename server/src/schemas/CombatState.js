const schema = require('@colyseus/schema');
const { Schema, type, MapSchema } = schema;

class CombatActorState extends Schema {
    constructor() {
        super();
        this.id = '';
        this.name = '';
        this.team = 'party';
        this.hp = 1;
        this.maxHp = 1;
        this.ready = false;
        this.guarding = false;
    }
}

type('string')(CombatActorState.prototype, 'id');
type('string')(CombatActorState.prototype, 'name');
type('string')(CombatActorState.prototype, 'team');
type('int32')(CombatActorState.prototype, 'hp');
type('int32')(CombatActorState.prototype, 'maxHp');
type('boolean')(CombatActorState.prototype, 'ready');
type('boolean')(CombatActorState.prototype, 'guarding');

class CombatState extends Schema {
    constructor() {
        super();
        this.encounterId = '';
        this.phase = 'planning';
        this.round = 1;
        this.activeActorId = 'Party planning';
        this.party = new MapSchema();
        this.enemies = new MapSchema();
    }
}

type('string')(CombatState.prototype, 'encounterId');
type('string')(CombatState.prototype, 'phase');
type('int32')(CombatState.prototype, 'round');
type('string')(CombatState.prototype, 'activeActorId');
type({ map: CombatActorState })(CombatState.prototype, 'party');
type({ map: CombatActorState })(CombatState.prototype, 'enemies');

module.exports = {
    CombatActorState,
    CombatState
};
