const ELEMENTS = {
    VOID: 0,
    GEO: 1,
    HYDRO: 2,
    ANEMO: 3,
    CRYO: 4,
    PYRO: 5,
    STRUCTURE: 6
};

const MAP_LEGEND = {
    W: { element: ELEMENTS.HYDRO, maxZ: 0 },
    B: { element: ELEMENTS.HYDRO, maxZ: 0 },
    S: { element: ELEMENTS.ANEMO, maxZ: 1 },
    G: { element: ELEMENTS.GEO, maxZ: 1 },
    F: { element: ELEMENTS.GEO, maxZ: 1 },
    H: { element: ELEMENTS.GEO, maxZ: 2 },
    M: { element: ELEMENTS.GEO, maxZ: 3 },
    P: { element: ELEMENTS.CRYO, maxZ: 4 },
    I: { element: ELEMENTS.CRYO, maxZ: 0 },
    L: { element: ELEMENTS.PYRO, maxZ: 2 },
    R: { element: ELEMENTS.GEO, maxZ: 1 },
    T: { element: ELEMENTS.STRUCTURE, maxZ: 3 },
    X: { element: ELEMENTS.STRUCTURE, maxZ: 2 }
};

const DEFAULT_MAP = [
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    'WWWWWWGSSSSSWWWWWWWWWWWWWWWWWW',
    'WWWWWGSSSSSGGWWWWWWWWHHHHWWWWW',
    'WWWWGGGGSSGGGGWWWWWHHHHHHGHWWW',
    'WWWWGGGGGGGGGGGWHHHHMMMMHHGGWW',
    'WWWGGGHHGGGGGGGWHHHHMMMMHHGGWW',
    'WWWGGHHMMHGGGGGWHHMMMMMMMHGGWW',
    'WWWGGHMMMHGGGGGWHHMMMMMMMHGGWW',
    'WWGGHMMMMHGHHHHWHMMPPPPMHGGWWW',
    'WWGGHMMMMHHHHHHWHHMPPPPMHHGWWW',
    'WWGGHMMMHHGHGGGHHHMMPPMMMHGGWW',
    'WWGGGHHHHGGGGGGHWWHHMMMMMHGWWW',
    'WWWGGGGGGGGGWGGHWWWWWHHHHHGGWW',
    'WWWWWGGGGGGWWGGHWWHHWWHHHGGWWW',
    'WWWWWGGGGGWBBWGHWWWHWWHHGGGWWW',
    'WWWWWGGGGGWWBBGWWWWWHWHHGGWWWW',
    'WWWWWGGGGGBBBBWWWWWWWHHHGWWWWW',
    'WWWWWGGGGGWBBWWWWWHWHWWHWWWWWW',
    'WWWWWWGGGGWWWWWHHHHWWHHWWWWWWW',
    'WWWWWWWGGGWHHHHHHMMHWHGWWWWWWW',
    'WWWWWWWWWWHHMMMMMMMHWHGGWWWWWW',
    'WWWWWWWWHHMMMMLLMMHHWHHGWWWWWW',
    'WWWWWWWWHHMMMLLLMMHHWWHGWWWWWW',
    'WWWWWWWWHHMMMMLLMMHWWWHWWWWWWW',
    'WWWWWWWWHHHHMMMMHHWWWWWWWWWWWW',
    'WWWWWWWWWHHHHHHHHHWWWWWWWWWWWW',
    'WWWWWWWWIIIHWHHHWWWWWWWWWWWWWW',
    'WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW',
    'WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW',
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'
];

const WALKABLE_ELEMENTS = new Set([ELEMENTS.GEO, ELEMENTS.ANEMO, ELEMENTS.CRYO]);

class WorldSurface {
    constructor(rows = DEFAULT_MAP) {
        this.loadRows(rows);
    }

    loadRows(rows) {
        const normalized = this.normalizeRows(rows);
        this.rows = normalized;
        this.height = normalized.length;
        this.width = normalized[0].length;
        this.offsetX = Math.floor(this.width / 2);
        this.offsetY = Math.floor(this.height / 2);
        this.surfaceMap = new Map();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const symbol = normalized[y][x];
                const block = MAP_LEGEND[symbol] || { element: ELEMENTS.VOID, maxZ: 0 };
                const gridX = x - this.offsetX;
                const gridY = y - this.offsetY;
                this.surfaceMap.set(this.getColumnKey(gridX, gridY), {
                    x: gridX,
                    y: gridY,
                    z: block.maxZ,
                    element: block.element,
                    walkable: WALKABLE_ELEMENTS.has(block.element)
                });
            }
        }
    }

    normalizeRows(rows) {
        if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_MAP;
        const normalized = rows.map((row) => String(row).trim().toUpperCase()).filter(Boolean);
        if (normalized.length === 0) return DEFAULT_MAP;

        const width = normalized[0].length;
        if (width === 0 || normalized.some((row) => row.length !== width)) {
            return DEFAULT_MAP;
        }

        return normalized.map((row) => row.replace(/[^WBSGFHMPILRTX]/g, 'W'));
    }

    resolveCenter(centerX, centerY, previous) {
        const tileX = Math.round(this.clampNumber(centerX, previous?.centerX ?? 0));
        const tileY = Math.round(this.clampNumber(centerY, previous?.centerY ?? 0));
        const surface = this.getSurfaceAt(tileX, tileY);

        if (!surface || !surface.walkable) {
            return this.resolveFallback(previous);
        }

        if (previous) {
            if (!this.canMoveBetween(previous.tileX, previous.tileY, tileX, tileY)) {
                return this.resolveFallback(previous);
            }
        }

        return {
            centerX: this.clampNumber(centerX, tileX),
            centerY: this.clampNumber(centerY, tileY),
            centerZ: surface.z,
            tileX,
            tileY,
            tileZ: surface.z,
            valid: true
        };
    }

    resolveFallback(previous) {
        if (previous) {
            return { ...previous, valid: false };
        }
        return this.resolveNearestWalkable(0, 0);
    }

    resolveNearestWalkable(startX, startY) {
        const spawn = this.findNearestWalkable(startX, startY);
        return {
            centerX: spawn.x,
            centerY: spawn.y,
            centerZ: spawn.z,
            tileX: spawn.x,
            tileY: spawn.y,
            tileZ: spawn.z,
            valid: false
        };
    }

    findNearestWalkable(startX, startY, maxRadius = 48) {
        const originX = Math.round(startX);
        const originY = Math.round(startY);
        for (let radius = 0; radius <= maxRadius; radius++) {
            for (let x = originX - radius; x <= originX + radius; x++) {
                for (let y = originY - radius; y <= originY + radius; y++) {
                    if (Math.abs(x - originX) !== radius && Math.abs(y - originY) !== radius) continue;
                    const surface = this.getSurfaceAt(x, y);
                    if (surface?.walkable) return surface;
                }
            }
        }
        return { x: 0, y: 0, z: 0 };
    }

    canOccupyTile(x, y, fromX = x, fromY = y) {
        const surface = this.getSurfaceAt(x, y);
        if (!surface?.walkable) return false;

        const fromSurface = this.getSurfaceAt(fromX, fromY);
        const fromZ = fromSurface?.z ?? surface.z;
        return surface.z - fromZ < 2;
    }

    canMoveBetween(fromX, fromY, toX, toY) {
        if (fromX === toX && fromY === toY) {
            return this.canOccupyTile(toX, toY, fromX, fromY);
        }

        if (!this.canOccupyTile(toX, toY, fromX, fromY)) return false;

        const dx = toX - fromX;
        const dy = toY - fromY;
        if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
            return this.canOccupyTile(toX, fromY, fromX, fromY) &&
                this.canOccupyTile(fromX, toY, fromX, fromY);
        }

        return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
    }

    getSurfaceAt(x, y) {
        return this.surfaceMap.get(this.getColumnKey(x, y));
    }

    getColumnKey(x, y) {
        return `${x},${y}`;
    }

    clampNumber(value, fallback) {
        return Number.isFinite(value) ? Math.max(-10000, Math.min(10000, value)) : fallback;
    }
}

module.exports = {
    DEFAULT_MAP,
    WorldSurface
};
