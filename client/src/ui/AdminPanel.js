import { FANTASY_WORLD, getWorldMapLocations } from '../data/MapData.js';

export class AdminPanel {
    constructor(options) {
        this.onTeleport = options.onTeleport;
        this.onStartCombat = options.onStartCombat;
        this.onToggleCollisionDebug = options.onToggleCollisionDebug;
        this.collisionDebugEnabled = false;
        this.locations = getWorldMapLocations();

        this.toggleButton = document.getElementById('admin-toggle');
        this.panel = document.getElementById('admin-panel');
        this.message = document.getElementById('admin-message');
        this.mapCard = document.getElementById('world-map-card');
        this.locationList = document.getElementById('world-location-list');
        this.worldXInput = document.getElementById('world-map-x-input');
        this.worldYInput = document.getElementById('world-map-y-input');
        this.teleportButton = document.getElementById('world-teleport-button');
        this.combatButton = document.getElementById('start-combat-button');
        this.collisionButton = document.getElementById('collision-debug-button');
        this.closeButton = document.getElementById('admin-close-button');

        this.renderWorldMap();
        this.setCoordinates(this.locations[0]?.x ?? 0, this.locations[0]?.y ?? 0);
        this.bindEvents();
    }

    bindEvents() {
        this.toggleButton.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.setOpen(false));
        this.teleportButton.addEventListener('click', () => this.teleportToInputs());
        this.collisionButton.addEventListener('click', () => this.toggleCollisionDebug());
        this.combatButton.addEventListener('click', () => {
            this.setOpen(false);
            this.onStartCombat();
        });
    }

    renderWorldMap() {
        if (!this.mapCard || !this.locationList) return;
        this.mapCard.innerHTML = '';
        this.locationList.innerHTML = '';

        for (const [fromId, toId] of FANTASY_WORLD.routes) {
            const from = this.locations.find((location) => location.id === fromId);
            const to = this.locations.find((location) => location.id === toId);
            if (!from || !to) continue;
            this.mapCard.appendChild(this.createRouteElement(from, to));
        }

        for (const location of this.locations) {
            const point = document.createElement('button');
            point.type = 'button';
            point.className = `world-point ${location.type === 'capital' ? 'is-major' : ''}`;
            point.title = `${location.name} (${location.x}, ${location.y})`;
            point.style.left = `${(location.x / FANTASY_WORLD.width) * 100}%`;
            point.style.top = `${(location.y / FANTASY_WORLD.height) * 100}%`;
            point.addEventListener('click', () => this.teleportToLocation(location));
            this.mapCard.appendChild(point);

            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = location.name;
            button.addEventListener('click', () => this.teleportToLocation(location));
            this.locationList.appendChild(button);
        }
    }

    createRouteElement(from, to) {
        const route = document.createElement('div');
        route.className = 'world-route';
        const x1 = (from.x / FANTASY_WORLD.width) * 100;
        const y1 = (from.y / FANTASY_WORLD.height) * 100;
        const x2 = (to.x / FANTASY_WORLD.width) * 100;
        const y2 = (to.y / FANTASY_WORLD.height) * 100;
        const dx = x2 - x1;
        const dy = y2 - y1;
        route.style.left = `${x1}%`;
        route.style.top = `${y1}%`;
        route.style.width = `${Math.hypot(dx, dy)}%`;
        route.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
        return route;
    }

    teleportToLocation(location) {
        this.setCoordinates(location.x, location.y);
        this.onTeleport({
            worldX: location.x,
            worldY: location.y,
            location
        });
        this.setMessage(`Arrived at ${location.name}.`, 'success');
        this.setOpen(false);
    }

    teleportToInputs() {
        const worldX = clampInteger(this.worldXInput.value, 0, FANTASY_WORLD.width - 1);
        const worldY = clampInteger(this.worldYInput.value, 0, FANTASY_WORLD.height - 1);
        this.setCoordinates(worldX, worldY);
        this.onTeleport({ worldX, worldY });
        this.setMessage(`Arrived at ${worldX}, ${worldY}.`, 'success');
        this.setOpen(false);
    }

    setCoordinates(worldX, worldY) {
        if (this.worldXInput) this.worldXInput.value = String(worldX);
        if (this.worldYInput) this.worldYInput.value = String(worldY);
    }

    toggle() {
        this.setOpen(!this.panel.classList.contains('is-open'));
    }

    setOpen(isOpen) {
        this.panel.classList.toggle('is-open', isOpen);
        this.toggleButton.setAttribute('aria-expanded', String(isOpen));
    }

    toggleCollisionDebug() {
        this.collisionDebugEnabled = !this.collisionDebugEnabled;
        this.collisionButton.setAttribute('aria-pressed', String(this.collisionDebugEnabled));
        this.collisionButton.classList.toggle('is-active', this.collisionDebugEnabled);
        this.onToggleCollisionDebug(this.collisionDebugEnabled);
        this.setMessage(
            this.collisionDebugEnabled ? 'Collision foot area visible.' : 'Collision foot area hidden.',
            'success'
        );
    }

    setMessage(text, tone = 'neutral') {
        this.message.textContent = text;
        this.message.dataset.tone = tone;
    }
}

function clampInteger(value, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.max(min, Math.min(max, Math.round(number)));
}
