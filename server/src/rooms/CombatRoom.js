const Colyseus = require('colyseus');
const { CombatActorState, CombatState } = require('../schemas/CombatState');

class CombatRoom extends Colyseus.Room {
    onCreate(options) {
        this.maxClients = 4;
        this.pendingActions = new Map();
        this.setState(new CombatState());
        this.state.encounterId = options.encounterId || 'meadow-hare-demo';
        this.addEnemy('wildlife_meadow_hare', 'Meadow Hare', 12);

        this.onMessage('combat:action', (client, data) => this.handleAction(client, data));
        console.log(`[CombatRoom] Created co-op encounter ${this.state.encounterId}`);
    }

    onJoin(client, options) {
        const actor = new CombatActorState();
        actor.id = client.sessionId;
        actor.name = options.userId || `Player ${this.state.party.size + 1}`;
        actor.team = 'party';
        actor.hp = 20;
        actor.maxHp = 20;
        this.state.party.set(client.sessionId, actor);
        this.broadcastLog(`${actor.name} joined the party.`);
        this.broadcastSnapshot();
    }

    onLeave(client, consented) {
        const actor = this.state.party.get(client.sessionId);
        if (actor) {
            this.broadcastLog(`${actor.name} left combat.`);
            this.state.party.delete(client.sessionId);
            this.pendingActions.delete(client.sessionId);
            this.broadcastSnapshot();
        }
    }

    addEnemy(id, name, hp) {
        const enemy = new CombatActorState();
        enemy.id = id;
        enemy.name = name;
        enemy.team = 'enemy';
        enemy.hp = hp;
        enemy.maxHp = hp;
        this.state.enemies.set(id, enemy);
    }

    handleAction(client, data) {
        const actor = this.state.party.get(client.sessionId);
        if (!actor || actor.hp <= 0 || this.state.phase !== 'planning') return;

        const action = data.action || 'ready';
        const targetId = data.targetId || 'wildlife_meadow_hare';
        this.pendingActions.set(client.sessionId, { action, targetId });
        actor.ready = true;
        actor.guarding = action === 'guard';
        this.broadcastLog(`${actor.name} chose ${action}.`);

        if (this.allLivingPartyReady()) {
            this.resolveRound();
        } else {
            this.broadcastSnapshot();
        }
    }

    allLivingPartyReady() {
        const livingParty = [...this.state.party.values()].filter((actor) => actor.hp > 0);
        return livingParty.length > 0 && livingParty.every((actor) => this.pendingActions.has(actor.id));
    }

    resolveRound() {
        this.state.phase = 'resolving';
        this.state.activeActorId = 'Resolving';
        const enemy = this.getPrimaryEnemy();

        if (enemy) {
            for (const actor of this.state.party.values()) {
                const queued = this.pendingActions.get(actor.id);
                if (!queued || actor.hp <= 0) continue;
                if (queued.action === 'attack') {
                    enemy.hp = Math.max(0, enemy.hp - 3);
                    this.broadcastLog(`${actor.name} hit ${enemy.name} for 3.`);
                }
            }
        }

        if (!enemy || enemy.hp <= 0) {
            this.state.phase = 'victory';
            this.state.activeActorId = 'Victory';
            this.broadcastLog('The party won the encounter.');
            this.broadcastSnapshot();
            return;
        }

        const target = this.getFirstLivingPartyActor();
        if (target) {
            const damage = target.guarding ? 1 : 2;
            target.hp = Math.max(0, target.hp - damage);
            this.broadcastLog(`${enemy.name} strikes ${target.name} for ${damage}.`);
        }

        for (const actor of this.state.party.values()) {
            actor.ready = false;
            actor.guarding = false;
        }
        this.pendingActions.clear();
        this.state.round += 1;
        this.state.phase = 'planning';
        this.state.activeActorId = 'Party planning';
        this.broadcastSnapshot();
    }

    getPrimaryEnemy() {
        return [...this.state.enemies.values()].find((enemy) => enemy.hp > 0);
    }

    getFirstLivingPartyActor() {
        return [...this.state.party.values()].find((actor) => actor.hp > 0);
    }

    broadcastLog(message) {
        this.broadcast('combat:log', { message });
    }

    broadcastSnapshot() {
        this.broadcast('combat:snapshot', this.createSnapshot());
    }

    createSnapshot() {
        return {
            encounterId: this.state.encounterId,
            phase: this.state.phase,
            round: this.state.round,
            activeActorId: this.state.activeActorId,
            party: [...this.state.party.values()].map((actor) => this.serializeActor(actor)),
            enemies: [...this.state.enemies.values()].map((actor) => this.serializeActor(actor))
        };
    }

    serializeActor(actor) {
        return {
            id: actor.id,
            name: actor.name,
            team: actor.team,
            hp: actor.hp,
            maxHp: actor.maxHp,
            ready: actor.ready,
            guarding: actor.guarding
        };
    }
}

module.exports = CombatRoom;
