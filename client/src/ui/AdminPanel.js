import { MAIN_MAP, createRandomMapRows } from '../data/MapData.js';

export class AdminPanel {
    constructor(options) {
        this.onApplyMap = options.onApplyMap;
        this.onRandomizeMap = options.onRandomizeMap;
        this.onStartCombat = options.onStartCombat;

        this.toggleButton = document.getElementById('admin-toggle');
        this.panel = document.getElementById('admin-panel');
        this.mapInput = document.getElementById('map-array-input');
        this.message = document.getElementById('admin-message');
        this.applyButton = document.getElementById('apply-map-button');
        this.randomButton = document.getElementById('random-map-button');
        this.combatButton = document.getElementById('start-combat-button');
        this.closeButton = document.getElementById('admin-close-button');

        this.mapInput.value = MAIN_MAP.join('\n');
        this.bindEvents();
    }

    bindEvents() {
        this.toggleButton.addEventListener('click', () => this.setOpen(!this.panel.classList.contains('is-open')));
        this.closeButton.addEventListener('click', () => this.setOpen(false));
        this.applyButton.addEventListener('click', () => this.applyCurrentMap());
        this.randomButton.addEventListener('click', () => this.randomizeMap());
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
        this.mapInput.value = rows.join('\n');
        this.onRandomizeMap(rows);
        this.setMessage(`Randomized ${rows[0].length} x ${rows.length} world.`, 'success');
    }

    parseMapRows(value) {
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

        const allowed = new Set(['W', 'B', 'S', 'G', 'F', 'H', 'M', 'P', 'I', 'L', 'R', 'T', 'X']);
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

        return rows;
    }

    setMapRows(rows) {
        this.mapInput.value = rows.join('\n');
    }

    setMessage(text, tone = 'neutral') {
        this.message.textContent = text;
        this.message.dataset.tone = tone;
    }
}
