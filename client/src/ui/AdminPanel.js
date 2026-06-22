import { MAIN_MAP, createRandomMapRows } from '../data/MapData.js';
import { normalizeTileCell, normalizeTileRows, serializeTileRowsForAdmin, symbolRowsToTileCells, TILE_SYMBOLS } from '../data/TileLibrary.js';

export class AdminPanel {
    constructor(options) {
        this.onApplyMap = options.onApplyMap;
        this.onRandomizeMap = options.onRandomizeMap;
        this.onStartCombat = options.onStartCombat;
        this.onToggleCollisionDebug = options.onToggleCollisionDebug;
        this.collisionDebugEnabled = false;

        this.toggleButton = document.getElementById('admin-toggle');
        this.panel = document.getElementById('admin-panel');
        this.mapInput = document.getElementById('map-array-input');
        this.message = document.getElementById('admin-message');
        this.applyButton = document.getElementById('apply-map-button');
        this.randomButton = document.getElementById('random-map-button');
        this.combatButton = document.getElementById('start-combat-button');
        this.collisionButton = document.getElementById('collision-debug-button');
        this.closeButton = document.getElementById('admin-close-button');

        this.mapInput.value = serializeTileRowsForAdmin(MAIN_MAP);
        this.bindEvents();
    }

    bindEvents() {
        this.toggleButton.addEventListener('click', () => this.setOpen(!this.panel.classList.contains('is-open')));
        this.closeButton.addEventListener('click', () => this.setOpen(false));
        this.applyButton.addEventListener('click', () => this.applyCurrentMap());
        this.randomButton.addEventListener('click', () => this.randomizeMap());
        this.collisionButton.addEventListener('click', () => this.toggleCollisionDebug());
        this.combatButton.addEventListener('click', () => {
            this.setOpen(false);
            this.onStartCombat();
        });
    }

    setOpen(isOpen) {
        this.panel.classList.toggle('is-open', isOpen);
        this.toggleButton.setAttribute('aria-expanded', String(isOpen));
    }

    applyCurrentMap() {
        try {
            const rows = this.parseMapRows(this.mapInput.value);
            this.onApplyMap(rows);
            this.setMessage(`Applied ${rows[0].length} x ${rows.length} array map.`, 'success');
        } catch (error) {
            this.setMessage(error.message, 'error');
        }
    }

    randomizeMap() {
        const rows = createRandomMapRows();
        this.mapInput.value = serializeTileRowsForAdmin(rows);
        this.onRandomizeMap(rows);
        this.setMessage(`Randomized ${rows[0].length} x ${rows.length} world.`, 'success');
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

    parseMapRows(value) {
        const trimmed = value.trim();
        const rows = trimmed.startsWith('[')
            ? this.parseJsonMapRows(trimmed)
            : this.parseSymbolMapRows(trimmed);

        this.validateRectangularRows(rows);
        return rows;
    }

    parseJsonMapRows(value) {
        let parsed;
        try {
            parsed = JSON.parse(value);
        } catch (error) {
            throw new Error(`Map JSON is invalid: ${error.message}`);
        }

        if (!Array.isArray(parsed)) {
            throw new Error('Map JSON must be an array of rows.');
        }

        const rows = parsed.map((row) => {
            if (!Array.isArray(row)) {
                throw new Error('Each map row in JSON must be an array.');
            }
            return row.map((cell) => normalizeTileCell(cell));
        });

        return normalizeTileRows(rows);
    }

    parseSymbolMapRows(value) {
        const rows = value
            .split('\n')
            .map((row) => row.trim().toUpperCase())
            .filter(Boolean);

        if (rows.length < 4) {
            throw new Error('Map needs at least 4 rows.');
        }

        const width = rows[0].length;
        if (width < 4) {
            throw new Error('Map rows need at least 4 columns.');
        }

        const allowed = new Set(TILE_SYMBOLS);
        for (const row of rows) {
            if (row.length !== width) {
                throw new Error('Every map row must have the same width.');
            }
            for (const char of row) {
                if (!allowed.has(char)) {
                    throw new Error(`Unknown map symbol "${char}".`);
                }
            }
        }

        return symbolRowsToTileCells(rows);
    }

    validateRectangularRows(rows) {
        if (rows.length < 4) {
            throw new Error('Map needs at least 4 rows.');
        }

        const width = rows[0]?.length || 0;
        if (width < 4) {
            throw new Error('Map rows need at least 4 columns.');
        }

        if (rows.some((row) => row.length !== width)) {
            throw new Error('Every map row must have the same width.');
        }
    }

    setMapRows(rows) {
        this.mapInput.value = serializeTileRowsForAdmin(rows);
    }

    setMessage(text, tone = 'neutral') {
        this.message.textContent = text;
        this.message.dataset.tone = tone;
    }
}
