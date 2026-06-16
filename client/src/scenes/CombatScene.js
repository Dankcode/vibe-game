export class CombatScene {
    constructor(options) {
        this.client = options.client;
        this.userId = options.userId;
        this.onExit = options.onExit;

        this.overlay = document.getElementById('combat-scene');
        this.status = document.getElementById('combat-status');
        this.roundReadout = document.getElementById('combat-round');
        this.turnReadout = document.getElementById('combat-turn');
        this.partyList = document.getElementById('combat-party-list');
        this.enemyList = document.getElementById('combat-enemy-list');
        this.log = document.getElementById('combat-log');
        this.attackButton = document.getElementById('combat-attack-button');
        this.guardButton = document.getElementById('combat-guard-button');
        this.readyButton = document.getElementById('combat-ready-button');
        this.leaveButton = document.getElementById('combat-leave-button');

        this.attackButton.addEventListener('click', () => this.sendAction('attack'));
        this.guardButton.addEventListener('click', () => this.sendAction('guard'));
        this.readyButton.addEventListener('click', () => this.sendAction('ready'));
        this.leaveButton.addEventListener('click', () => this.leave());
    }

    async enter(encounterId = 'meadow-hare-demo') {
        this.overlay.classList.add('is-open');
        if (!this.client) {
            this.setStatus('Combat unavailable while offline.');
            return;
        }

        this.setStatus('Joining co-op combat...');

        try {
            this.room = await this.client.joinOrCreate('combat', {
                userId: this.userId,
                encounterId
            });
            this.bindRoom();
            this.setStatus('Co-op combat ready.');
        } catch (error) {
            console.error('[CombatScene] Failed to join combat:', error);
            this.setStatus('Could not join combat room.');
        }
    }

    bindRoom() {
        if (!this.room) return;

        this.room.onMessage('combat:snapshot', (snapshot) => this.renderSnapshot(snapshot));
        this.room.onMessage('combat:log', (entry) => this.appendLog(entry.message));
    }

    sendAction(action) {
        if (!this.room) {
            this.appendLog('No combat room connected.');
            return;
        }

        const targetId = action === 'attack' ? 'wildlife_meadow_hare' : '';
        this.room.send('combat:action', {
            action,
            targetId
        });
    }

    renderSnapshot(snapshot) {
        this.roundReadout.textContent = `${snapshot.round}`;
        this.turnReadout.textContent = snapshot.activeActorId || 'Waiting';
        this.renderList(this.partyList, snapshot.party || [], 'ally');
        this.renderList(this.enemyList, snapshot.enemies || [], 'enemy');
        this.setStatus(snapshot.phase === 'planning' ? 'Choose an action.' : 'Resolving turn.');
    }

    renderList(container, actors, type) {
        container.innerHTML = '';
        for (const actor of actors) {
            const item = document.createElement('li');
            item.className = `combat-actor ${type}`;
            const name = document.createElement('span');
            name.textContent = actor.name;
            const hp = document.createElement('meter');
            hp.min = 0;
            hp.max = actor.maxHp;
            hp.value = actor.hp;
            const value = document.createElement('strong');
            value.textContent = `${actor.hp}/${actor.maxHp}`;
            item.append(name, hp, value);
            container.appendChild(item);
        }
    }

    appendLog(message) {
        const entry = document.createElement('li');
        entry.textContent = message;
        this.log.prepend(entry);
        while (this.log.children.length > 5) {
            this.log.removeChild(this.log.lastChild);
        }
    }

    setStatus(message) {
        this.status.textContent = message;
    }

    async leave() {
        if (this.room) {
            await this.room.leave();
            this.room = null;
        }
        this.overlay.classList.remove('is-open');
        this.onExit?.();
    }
}
