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
    W: { element: ELEMENTS.HYDRO, texture: 2, effect: ELEMENTS.HYDRO, building: 0, maxZ: 0 },
    B: { element: ELEMENTS.HYDRO, texture: 4, effect: ELEMENTS.HYDRO, building: 0, maxZ: 0 },
    S: { element: ELEMENTS.ANEMO, texture: 0, effect: ELEMENTS.ANEMO, building: 0, maxZ: 0 },
    G: { element: ELEMENTS.GEO, texture: 0, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    F: { element: ELEMENTS.GEO, texture: 1, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    H: { element: ELEMENTS.GEO, texture: 3, effect: ELEMENTS.GEO, building: 0, maxZ: 1 },
    M: { element: ELEMENTS.GEO, texture: 4, effect: ELEMENTS.GEO, building: 0, maxZ: 2 },
    P: { element: ELEMENTS.CRYO, texture: 0, effect: ELEMENTS.CRYO, building: 0, maxZ: 2 },
    I: { element: ELEMENTS.CRYO, texture: 1, effect: ELEMENTS.CRYO, building: 0, maxZ: 0 },
    L: { element: ELEMENTS.PYRO, texture: 0, effect: ELEMENTS.PYRO, building: 0, maxZ: 2 },
    R: { element: ELEMENTS.GEO, texture: 2, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    T: { element: ELEMENTS.STRUCTURE, texture: 1, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 2 },
    X: { element: ELEMENTS.STRUCTURE, texture: 0, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 1 },
    A: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 2 },
    C: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 2 },
    N: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 6, maxZ: 2 },
    O: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 7, maxZ: 2 },
    J: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 8, maxZ: 2 },
    K: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 9, maxZ: 2 },
    Q: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 6, maxZ: 2 },
    V: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 7, maxZ: 2 },
    Y: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 8, maxZ: 2 },
    Z: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 9, maxZ: 2 },
    D: { element: ELEMENTS.STRUCTURE, texture: 2, effect: ELEMENTS.STRUCTURE, building: 2, maxZ: 0, walkable: true },
    E: { element: ELEMENTS.STRUCTURE, texture: 2, effect: ELEMENTS.STRUCTURE, building: 3, maxZ: 0, walkable: true },
    U: { element: ELEMENTS.STRUCTURE, texture: 6, effect: ELEMENTS.STRUCTURE, building: 4, maxZ: 0, walkable: true },
    1: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 10, maxZ: 0, walkable: true },
    2: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 11, maxZ: 0, walkable: true },
    3: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 12, maxZ: 0, walkable: true },
    4: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 13, maxZ: 0, walkable: true },
    5: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 10, maxZ: 0, walkable: true },
    6: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 11, maxZ: 0, walkable: true },
    7: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 12, maxZ: 0, walkable: true },
    8: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 13, maxZ: 0, walkable: true }
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
        this.voxelMatrix = this.createVoxelMatrix(normalized);
        this.voxelColumnMap = new Map();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const gridX = x - this.offsetX;
                const gridY = y - this.offsetY;
                const column = this.voxelMatrix.columns[y][x];
                const block = this.getTopVoxel(column);
                this.voxelColumnMap.set(this.getColumnKey(gridX, gridY), column);
                this.surfaceMap.set(this.getColumnKey(gridX, gridY), {
                    x: gridX,
                    y: gridY,
                    z: block.z,
                    element: block.element,
                    texture: block.texture,
                    effect: block.effect,
                    building: block.building,
                    walkable: block.walkable ?? WALKABLE_ELEMENTS.has(block.element)
                });
            }
        }
    }

    normalizeRows(rows) {
        if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_MAP;
        const normalized = rows
            .map((row) => {
                if (typeof row === 'string') {
                    return row.trim().toUpperCase().replace(/[^WBSGFHMPILRTXACNOJKQVYZDEU12345678]/g, 'W');
                }
                if (Array.isArray(row)) return row.map((cell) => this.normalizeCell(cell));
                return null;
            })
            .filter((row) => row && row.length > 0);

        if (normalized.length === 0) return DEFAULT_MAP;

        const width = normalized[0].length;
        if (width === 0 || normalized.some((row) => row.length !== width)) return DEFAULT_MAP;
        return normalized;
    }

    resolveBlock(rawCell) {
        if (typeof rawCell === 'string') return this.normalizeCell(MAP_LEGEND[rawCell] || MAP_LEGEND.W);
        return this.normalizeCell(rawCell);
    }

    normalizeCell(rawCell) {
        if (typeof rawCell === 'string') return this.normalizeCell(MAP_LEGEND[rawCell.toUpperCase()] || MAP_LEGEND.W);
        if (Array.isArray(rawCell)) {
            return this.createBlock({
                element: rawCell[0],
                texture: rawCell[1],
                effect: rawCell[2],
                building: rawCell[3],
                maxZ: rawCell[4]
            });
        }
        if (rawCell && typeof rawCell === 'object') {
            return this.createBlock({
                element: rawCell.element ?? rawCell.e,
                texture: rawCell.texture ?? rawCell.textureValue ?? rawCell.t,
                effect: rawCell.effect ?? rawCell.fx,
                building: rawCell.building ?? rawCell.b,
                maxZ: rawCell.height ?? rawCell.maxZ ?? rawCell.h,
                walkable: rawCell.walkable
            });
        }
        return this.createBlock(MAP_LEGEND.W);
    }

    createVoxelMatrix(rows) {
        return {
            encoding: 'voxel-matrix-v1',
            width: this.width,
            height: this.height,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            columns: rows.map((row) => {
                const cells = Array.isArray(row) ? row : [...row];
                return cells.map((cell) => this.createVoxelColumn(cell));
            })
        };
    }

    createVoxelColumn(rawCell) {
        const cell = this.resolveBlock(rawCell);
        const maxZ = Math.max(0, cell.maxZ);
        const column = [];

        if (this.isStackedBuildingWall(cell)) {
            column.push(this.createVoxelBlock({
                z: 0,
                element: ELEMENTS.GEO,
                texture: 0,
                effect: ELEMENTS.GEO,
                building: 0
            }));
            for (let z = 1; z <= maxZ; z++) {
                column.push(this.createVoxelBlock({
                    z,
                    element: cell.element,
                    texture: cell.texture,
                    effect: cell.effect,
                    building: this.getBuildingPartAtElevation(cell.building, z)
                }));
            }
            return column;
        }

        if (this.isStackedWalkableStructure(cell)) {
            column.push(this.createVoxelBlock({
                z: 0,
                element: cell.element,
                texture: cell.texture,
                effect: cell.effect,
                building: cell.building
            }));
            if (maxZ > 0) {
                column.push(this.createVoxelBlock({
                    z: maxZ,
                    element: cell.element,
                    texture: cell.texture,
                    effect: cell.effect,
                    building: cell.building
                }));
            }
            return column;
        }

        for (let z = 0; z <= maxZ; z++) {
            const isSurface = z === maxZ;
            column.push(this.createVoxelBlock({
                z,
                element: isSurface ? cell.element : ELEMENTS.GEO,
                texture: isSurface ? cell.texture : 0,
                effect: isSurface ? cell.effect : ELEMENTS.GEO,
                building: isSurface ? cell.building : 0
            }));
        }

        return column;
    }

    createVoxelBlock({ z = 0, element = ELEMENTS.VOID, texture = 0, effect = 0, building = 0 } = {}) {
        const normalizedElement = this.clampInteger(element, ELEMENTS.VOID);
        const textureValue = this.clampInteger(texture, 0);
        return {
            z: this.clampInteger(z, 0),
            element: normalizedElement,
            texture: textureValue,
            effect: this.clampInteger(effect, 0),
            building: this.clampInteger(building, 0),
            walkable: this.isWalkableBlock(normalizedElement, textureValue)
        };
    }

    getTopVoxel(column) {
        if (!Array.isArray(column) || column.length === 0) return this.createVoxelBlock();
        return column.reduce((top, voxel) => voxel.z > top.z ? voxel : top, column[0]);
    }

    isStackedBuildingWall(cell) {
        return cell.element === ELEMENTS.STRUCTURE &&
            cell.maxZ >= 2 &&
            (cell.building === 1 || this.isLowerWindowPart(cell.building));
    }

    isStackedWalkableStructure(cell) {
        return cell.element === ELEMENTS.STRUCTURE &&
            cell.maxZ > 0 &&
            [3, 4, 10, 11, 12, 13].includes(cell.building);
    }

    isLowerWindowPart(building) {
        return [6, 7, 8, 9].includes(building);
    }

    getBuildingPartAtElevation(building, elevation) {
        if (!this.isLowerWindowPart(building)) return building;
        const upperWindowParts = { 6: 14, 7: 15, 8: 16, 9: 17 };
        return elevation % 2 === 0 ? upperWindowParts[building] : building;
    }

    createBlock({ element = ELEMENTS.VOID, texture = 0, effect = 0, building = 0, maxZ = 0, walkable } = {}) {
        const normalizedElement = this.clampInteger(element, ELEMENTS.VOID);
        const textureValue = this.clampInteger(texture, 0);
        return {
            element: normalizedElement,
            texture: textureValue,
            effect: this.clampInteger(effect, 0),
            building: this.clampInteger(building, 0),
            maxZ: this.clampInteger(maxZ, 0),
            walkable: walkable ?? this.isWalkableBlock(normalizedElement, textureValue)
        };
    }

    isWalkableBlock(element, texture) {
        if (element === ELEMENTS.STRUCTURE) {
            return [2, 5, 6, 7, 8, 9, 10].includes(texture);
        }
        return WALKABLE_ELEMENTS.has(element);
    }

    clampInteger(value, fallback) {
        const number = Number(value);
        return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
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
        const spawn = this.findHighestWalkable();
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

    findHighestWalkable() {
        let best = null;
        for (const surface of this.surfaceMap.values()) {
            if (!surface.walkable) continue;
            if (!best || surface.z > best.z) best = surface;
        }
        return best || this.findNearestWalkable(0, 0);
    }

    canOccupyTile(x, y, fromX = x, fromY = y) {
        const surface = this.getSurfaceAt(x, y);
        if (!surface?.walkable) return false;

        const fromSurface = this.getSurfaceAt(fromX, fromY);
        const fromZ = fromSurface?.z ?? surface.z;
        const elevationDiff = surface.z - fromZ;
        if (Math.abs(elevationDiff) <= 1) return true;
        return Math.abs(elevationDiff) === 2 &&
            (this.isStairSurface(surface) || this.isStairSurface(fromSurface));
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

    isStairSurface(surface) {
        return [4, 10, 11, 12, 13].includes(surface?.building);
    }

    getSurfaceAt(x, y) {
        return this.surfaceMap.get(this.getColumnKey(x, y));
    }

    getVoxelColumnAt(x, y) {
        return this.voxelColumnMap.get(this.getColumnKey(x, y)) || null;
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
