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
        this.title = this.panel?.querySelector('.admin-title');
        this.message = document.getElementById('admin-message');
        this.mapCard = document.getElementById('world-map-card');
        this.burgMapCard = document.getElementById('burg-map-card');
        this.locationList = document.getElementById('world-location-list');
        this.worldXInput = document.getElementById('world-map-x-input');
        this.worldYInput = document.getElementById('world-map-y-input');
        this.teleportButton = document.getElementById('world-teleport-button');
        this.combatButton = document.getElementById('start-combat-button');
        this.collisionButton = document.getElementById('collision-debug-button');
        this.closeButton = document.getElementById('admin-close-button');

        this.renderWorldMap();
        this.renderBurgMap(null, []);
        if (this.title) this.title.textContent = `${FANTASY_WORLD.name} Map`;
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

        if (FANTASY_WORLD.image?.src) {
            const image = document.createElement('img');
            image.className = 'world-map-image';
            image.src = FANTASY_WORLD.image.src;
            image.alt = `${FANTASY_WORLD.name} world map`;
            this.mapCard.appendChild(image);
        }

        this.mapCard.appendChild(this.createRouteOverlay());

        for (const location of this.locations) {
            const point = document.createElement('button');
            point.type = 'button';
            point.className = `world-point ${location.type === 'capital' ? 'is-major' : ''}`;
            point.title = `${location.name} (${Math.round(location.x)}, ${Math.round(location.y)})`;
            point.setAttribute('aria-label', `Teleport to ${location.name}`);
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

    renderBurgMap(rows, players = []) {
        if (!this.burgMapCard) return;
        if (!Array.isArray(rows) || rows.length === 0) {
            this.currentBurgRows = null;
            const label = document.createElement('div');
            this.burgMapCard.innerHTML = '';
            label.className = 'burg-map-label';
            label.textContent = 'No burg loaded';
            this.burgMapCard.appendChild(label);
            return;
        }

        const height = rows.length;
        const width = rows[0]?.length || 0;
        if (this.currentBurgRows !== rows) {
            this.currentBurgRows = rows;
            this.burgMapCard.innerHTML = '';
            const grid = document.createElement('div');
            grid.className = 'burg-map-grid';
            grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const cell = document.createElement('span');
                    cell.className = `burg-map-cell ${classifyBurgMapCell(rows[y][x])}`;
                    grid.appendChild(cell);
                }
            }
            this.burgMapCard.appendChild(grid);
        } else {
            this.burgMapCard.querySelectorAll('.burg-player-point, .burg-map-label').forEach((node) => node.remove());
        }

        const offsetX = Math.floor(width / 2);
        const offsetY = Math.floor(height / 2);
        for (const player of players) {
            const x = Number(player?.x);
            const y = Number(player?.y);
            if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
            const point = document.createElement('span');
            point.className = `burg-player-point ${player.local ? 'local' : 'remote'}`;
            point.title = player.label || (player.local ? 'You' : 'Player');
            point.style.left = `${((x + offsetX + 0.5) / width) * 100}%`;
            point.style.top = `${((y + offsetY + 0.5) / height) * 100}%`;
            this.burgMapCard.appendChild(point);
        }

        const label = document.createElement('div');
        label.className = 'burg-map-label';
        label.textContent = rows.townName || rows.sourceTown?.name || 'Current burg';
        this.burgMapCard.appendChild(label);
    }

    createRouteOverlay() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('world-route-overlay');
        svg.setAttribute('viewBox', `0 0 ${FANTASY_WORLD.width} ${FANTASY_WORLD.height}`);
        svg.setAttribute('aria-hidden', 'true');

        for (const route of FANTASY_WORLD.routes || []) {
            if (Array.isArray(route.points) && route.points.length >= 2) {
                const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                polyline.setAttribute('points', route.points.map(([x, y]) => `${x},${y}`).join(' '));
                polyline.setAttribute('class', `world-route-line ${route.kind || 'route'}`);
                svg.appendChild(polyline);
                continue;
            }

            if (Array.isArray(route) && route.length >= 2) {
                const from = this.locations.find((location) => location.id === route[0]);
                const to = this.locations.find((location) => location.id === route[1]);
                if (!from || !to) continue;
                const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                polyline.setAttribute('points', `${from.x},${from.y} ${to.x},${to.y}`);
                polyline.setAttribute('class', 'world-route-line');
                svg.appendChild(polyline);
            }
        }

        return svg;
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

function classifyBurgMapCell(cell) {
    if (!cell) return 'water';
    if (cell.element === 2) return 'water';
    if (cell.building === 2) return 'door';
    if ([4, 10, 11, 12, 13, 19, 20, 21, 22].includes(cell.building)) return 'stair';
    if ([1, 6, 7, 8, 9, 14, 15, 16, 17].includes(cell.building)) return 'wall';
    if (cell.element === 6 || cell.building === 3) return 'building';
    if (cell.element === 1 && [2, 5, 6, 7].includes(cell.texture)) return 'road';
    return 'ground';
}

function clampInteger(value, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.max(min, Math.min(max, Math.round(number)));
}
