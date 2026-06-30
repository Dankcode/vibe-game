import { ELEMENTS, getTileDefinition } from './TileRegistry.js';

export const TILE_EFFECTS = {
    NONE: 0,
    EARTH: ELEMENTS.GEO,
    WATER: ELEMENTS.HYDRO,
    WIND: ELEMENTS.ANEMO,
    ICE: ELEMENTS.CRYO,
    FIRE: ELEMENTS.PYRO,
    STRUCTURE: ELEMENTS.STRUCTURE
};

export const TEXTURE_IDS = {
    DEFAULT: 0,
    FOREST: 1,
    ROAD: 2,
    HILL: 3,
    MOUNTAIN: 4,
    VILLAGE_GROUND: 5,
    CITY_COBBLE: 6,
    CITY_PLAZA: 7,
    GARDEN_GROUND: 8,
    ICE: 1,
    SHALLOW_WATER: 1,
    DEEP_WATER: 2,
    COASTAL_WATER: 3,
    MARSH_WATER: 4,
    TOWN_WALL: 1,
    BUILDING_FLOOR: 2,
    STONE_BUILDING_WALL: 3,
    TIMBER_BUILDING_WALL: 4,
    DOOR: 5,
    OAK_DOOR: 5,
    STAIRS: 6,
    IRON_DOOR: 7,
    PAINTED_DOOR: 8,
    STONE_STAIRS: 9,
    TIMBER_STAIRS: 10,
    WOOD_FLOOR: 11,
    STONE_FLOOR: 12,
    CITY_WALL_WALKWAY: 13,
    CITY_WALL_STAIRS: 14
};

export const DOOR_STYLE_TEXTURES = {
    oak: TEXTURE_IDS.OAK_DOOR,
    iron: TEXTURE_IDS.IRON_DOOR,
    painted: TEXTURE_IDS.PAINTED_DOOR
};

export const BUILDING_PARTS = {
    NONE: 0,
    WALL: 1,
    DOOR: 2,
    FLOOR: 3,
    STAIRS: 4,
    ROOF: 5,
    WINDOW_LOWER_NORTH: 6,
    WINDOW_LOWER_SOUTH: 7,
    WINDOW_LOWER_WEST: 8,
    WINDOW_LOWER_EAST: 9,
    STAIRS_NORTH: 10,
    STAIRS_SOUTH: 11,
    STAIRS_WEST: 12,
    STAIRS_EAST: 13,
    WINDOW_UPPER_NORTH: 14,
    WINDOW_UPPER_SOUTH: 15,
    WINDOW_UPPER_WEST: 16,
    WINDOW_UPPER_EAST: 17,
    CITY_WALL_WALKWAY: 18,
    CITY_WALL_STAIRS_NORTH: 19,
    CITY_WALL_STAIRS_SOUTH: 20,
    CITY_WALL_STAIRS_WEST: 21,
    CITY_WALL_STAIRS_EAST: 22
};

export const TILE_SYMBOL_LIBRARY = {
    W: { element: ELEMENTS.HYDRO, texture: TEXTURE_IDS.DEEP_WATER, effect: TILE_EFFECTS.WATER, building: BUILDING_PARTS.NONE, height: 0 },
    '~': { element: ELEMENTS.HYDRO, texture: TEXTURE_IDS.SHALLOW_WATER, effect: TILE_EFFECTS.WATER, building: BUILDING_PARTS.NONE, height: 0 },
    B: { element: ELEMENTS.HYDRO, texture: TEXTURE_IDS.MARSH_WATER, effect: TILE_EFFECTS.WATER, building: BUILDING_PARTS.NONE, height: 0 },
    S: { element: ELEMENTS.ANEMO, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.WIND, building: BUILDING_PARTS.NONE, height: 0 },
    G: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    F: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.FOREST, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    H: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.HILL, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 1 },
    M: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.MOUNTAIN, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 2 },
    '.': { element: ELEMENTS.GEO, texture: TEXTURE_IDS.VILLAGE_GROUND, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    ':': { element: ELEMENTS.GEO, texture: TEXTURE_IDS.CITY_COBBLE, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    ';': { element: ELEMENTS.GEO, texture: TEXTURE_IDS.CITY_PLAZA, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    ',': { element: ELEMENTS.GEO, texture: TEXTURE_IDS.GARDEN_GROUND, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    P: { element: ELEMENTS.CRYO, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.ICE, building: BUILDING_PARTS.NONE, height: 2 },
    I: { element: ELEMENTS.CRYO, texture: TEXTURE_IDS.ICE, effect: TILE_EFFECTS.ICE, building: BUILDING_PARTS.NONE, height: 0 },
    L: { element: ELEMENTS.PYRO, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.FIRE, building: BUILDING_PARTS.NONE, height: 2 },
    R: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.ROAD, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    T: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TOWN_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WALL, height: 2 },
    X: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WALL, height: 1 },
    A: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WALL, height: 2 },
    C: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WALL, height: 2 },
    N: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_NORTH, height: 2 },
    O: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_SOUTH, height: 2 },
    J: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_WEST, height: 2 },
    K: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_EAST, height: 2 },
    Q: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_NORTH, height: 2 },
    V: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_SOUTH, height: 2 },
    Y: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_WEST, height: 2 },
    Z: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_BUILDING_WALL, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.WINDOW_LOWER_EAST, height: 2 },
    D: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.BUILDING_FLOOR, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.DOOR, height: 0 },
    E: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.BUILDING_FLOOR, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.FLOOR, height: 0 },
    U: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS, height: 0 },
    1: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_NORTH, height: 0 },
    2: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_SOUTH, height: 0 },
    3: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_WEST, height: 0 },
    4: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_EAST, height: 0 },
    5: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_NORTH, height: 0 },
    6: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_SOUTH, height: 0 },
    7: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_WEST, height: 0 },
    8: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_EAST, height: 0 },
    9: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.CITY_WALL_WALKWAY, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.CITY_WALL_WALKWAY, height: 2 },
    '!': { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.CITY_WALL_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.CITY_WALL_STAIRS_NORTH, height: 2 },
    '@': { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.CITY_WALL_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH, height: 2 },
    '#': { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.CITY_WALL_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.CITY_WALL_STAIRS_WEST, height: 2 },
    '$': { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.CITY_WALL_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.CITY_WALL_STAIRS_EAST, height: 2 }
};

export const TILE_SYMBOLS = Object.keys(TILE_SYMBOL_LIBRARY);

export function createTileCell({ element = ELEMENTS.VOID, texture = 0, effect = TILE_EFFECTS.NONE, building = BUILDING_PARTS.NONE, height = 0 } = {}) {
    return {
        element: clampInteger(element, ELEMENTS.VOID),
        texture: clampInteger(texture, 0),
        effect: clampInteger(effect, TILE_EFFECTS.NONE),
        building: clampInteger(building, BUILDING_PARTS.NONE),
        height: clampInteger(height, 0)
    };
}

export function createVoxelBlock({ element = ELEMENTS.VOID, texture = 0, effect = TILE_EFFECTS.NONE, building = BUILDING_PARTS.NONE, z = 0 } = {}) {
    const textureValue = clampInteger(texture, 0);
    const blockElement = clampInteger(element, ELEMENTS.VOID);
    return {
        z: clampInteger(z, 0),
        element: blockElement,
        texture: textureValue,
        textureValue,
        effect: clampInteger(effect, TILE_EFFECTS.NONE),
        building: clampInteger(building, BUILDING_PARTS.NONE),
        definition: getTileDefinition(blockElement, textureValue)
    };
}

export function createTileCellFromSymbol(symbol) {
    return createTileCell(TILE_SYMBOL_LIBRARY[String(symbol).toUpperCase()] || TILE_SYMBOL_LIBRARY.W);
}

export function normalizeTileCell(rawCell) {
    if (typeof rawCell === 'string') return createTileCellFromSymbol(rawCell);
    if (Array.isArray(rawCell)) {
        return createTileCell({
            element: rawCell[0],
            texture: rawCell[1],
            effect: rawCell[2],
            building: rawCell[3],
            height: rawCell[4]
        });
    }
    if (rawCell && typeof rawCell === 'object') {
        const element = rawCell.element ?? rawCell.e;
        const texture = rawCell.texture ?? rawCell.textureValue ?? rawCell.t;
        const effect = rawCell.effect ?? rawCell.fx;
        const building = rawCell.building ?? rawCell.b;
        const height = rawCell.height ?? rawCell.maxZ ?? rawCell.h;
        return createTileCell({ element, texture, effect, building, height });
    }
    return createTileCellFromSymbol('W');
}

export function tileCellToBlockInfo(rawCell) {
    const cell = normalizeTileCell(rawCell);
    const definition = getTileDefinition(cell.element, cell.texture);
    return {
        element: cell.element,
        textureValue: cell.texture,
        effect: cell.effect,
        building: cell.building,
        maxZ: cell.height,
        walkable: definition.walkable,
        definition
    };
}

export function tileCellToVoxelColumn(rawCell) {
    const cell = normalizeTileCell(rawCell);
    const maxZ = Math.max(0, cell.height);
    const column = [];

    if (isStackedBuildingWall(cell)) {
        column.push(createVoxelBlock({
            z: 0,
            element: ELEMENTS.GEO,
            texture: TEXTURE_IDS.DEFAULT,
            effect: TILE_EFFECTS.EARTH,
            building: BUILDING_PARTS.NONE
        }));
        for (let z = 1; z <= maxZ; z++) {
            column.push(createVoxelBlock({
                z,
                element: cell.element,
                texture: cell.texture,
                effect: cell.effect,
                building: getBuildingPartAtElevation(cell.building, z)
            }));
        }
        return column;
    }

    if (isStackedWalkableStructure(cell)) {
        column.push(createVoxelBlock({
            z: 0,
            element: cell.element,
            texture: cell.texture,
            effect: cell.effect,
            building: cell.building
        }));
        if (maxZ > 0) {
            column.push(createVoxelBlock({
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
        column.push(createVoxelBlock({
            z,
            element: isSurface ? cell.element : ELEMENTS.GEO,
            texture: isSurface ? cell.texture : TEXTURE_IDS.DEFAULT,
            effect: isSurface ? cell.effect : TILE_EFFECTS.EARTH,
            building: isSurface ? cell.building : BUILDING_PARTS.NONE
        }));
    }

    return column;
}

export function createVoxelMatrix(rows, legend = {}) {
    const normalizedRows = normalizeTileRowsWithLegend(rows, legend);
    const height = normalizedRows.length;
    const width = normalizedRows[0]?.length || 0;
    return {
        encoding: 'voxel-matrix-v1',
        width,
        height,
        offsetX: Math.floor(width / 2),
        offsetY: Math.floor(height / 2),
        columns: normalizedRows.map((row) => row.map((cell) => tileCellToVoxelColumn(cell)))
    };
}

export function getVoxelColumn(matrix, gridX, gridY) {
    if (!matrix?.columns) return null;
    const x = gridX + matrix.offsetX;
    const y = gridY + matrix.offsetY;
    return matrix.columns[y]?.[x] || null;
}

export function getTopVoxel(column) {
    if (!Array.isArray(column) || column.length === 0) return null;
    return column.reduce((top, block) => block.z > top.z ? block : top, column[0]);
}

export function symbolRowsToTileCells(rows) {
    return rows.map((row) => [...String(row)].map((symbol) => createTileCellFromSymbol(symbol)));
}

export function normalizeTileRows(rows) {
    if (!Array.isArray(rows)) return [];
    return rows
        .filter((row) => Array.isArray(row) || typeof row === 'string')
        .map((row) => {
            if (typeof row === 'string') return [...row.trim().toUpperCase()].map((symbol) => createTileCellFromSymbol(symbol));
            return row.map((cell) => normalizeTileCell(cell));
        })
        .filter((row) => row.length > 0);
}

export function normalizeTileRowsWithLegend(rows, legend = {}) {
    if (!Array.isArray(rows)) return [];
    return rows
        .filter((row) => Array.isArray(row) || typeof row === 'string')
        .map((row) => {
            if (typeof row === 'string') {
                return [...row.trim().toUpperCase()].map((symbol) => {
                    const legendCell = legend[symbol] || legend[symbol.toUpperCase?.()];
                    return normalizeTileCell(legendCell || symbol);
                });
            }
            return row.map((cell) => normalizeTileCell(cell));
        })
        .filter((row) => row.length > 0);
}

export function serializeTileRowsForAdmin(rows) {
    const normalized = normalizeTileRows(rows);
    return JSON.stringify(normalized, null, 2);
}

export function tileCellToSymbol(rawCell) {
    const cell = normalizeTileCell(rawCell);
    let fallback = 'W';
    for (const [symbol, candidate] of Object.entries(TILE_SYMBOL_LIBRARY)) {
        if (candidate.element !== cell.element) continue;
        if (fallback === 'W') fallback = symbol;
        if (candidate.texture === cell.texture && candidate.building === cell.building && candidate.height === cell.height) {
            return symbol;
        }
    }
    return fallback;
}

export function tileRowsToSymbolRows(rows) {
    return normalizeTileRows(rows).map((row) => row.map((cell) => tileCellToSymbol(cell)).join(''));
}

export const MAP_LEGEND = Object.fromEntries(
    Object.entries(TILE_SYMBOL_LIBRARY).map(([symbol, cell]) => [symbol, tileCellToBlockInfo(cell)])
);

function isStackedBuildingWall(cell) {
    return cell.element === ELEMENTS.STRUCTURE &&
        cell.height >= 2 &&
        (cell.building === BUILDING_PARTS.WALL || isLowerWindowPart(cell.building));
}

function isStackedWalkableStructure(cell) {
    return cell.element === ELEMENTS.STRUCTURE &&
        cell.height > 0 &&
        [
            BUILDING_PARTS.FLOOR,
            BUILDING_PARTS.STAIRS,
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST,
            BUILDING_PARTS.CITY_WALL_WALKWAY,
            BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
            BUILDING_PARTS.CITY_WALL_STAIRS_EAST
        ].includes(cell.building);
}

function isLowerWindowPart(buildingPart) {
    return [
        BUILDING_PARTS.WINDOW_LOWER_NORTH,
        BUILDING_PARTS.WINDOW_LOWER_SOUTH,
        BUILDING_PARTS.WINDOW_LOWER_WEST,
        BUILDING_PARTS.WINDOW_LOWER_EAST
    ].includes(buildingPart);
}

function getUpperWindowPart(buildingPart) {
    return {
        [BUILDING_PARTS.WINDOW_LOWER_NORTH]: BUILDING_PARTS.WINDOW_UPPER_NORTH,
        [BUILDING_PARTS.WINDOW_LOWER_SOUTH]: BUILDING_PARTS.WINDOW_UPPER_SOUTH,
        [BUILDING_PARTS.WINDOW_LOWER_WEST]: BUILDING_PARTS.WINDOW_UPPER_WEST,
        [BUILDING_PARTS.WINDOW_LOWER_EAST]: BUILDING_PARTS.WINDOW_UPPER_EAST
    }[buildingPart] || buildingPart;
}

function getBuildingPartAtElevation(buildingPart, elevation) {
    if (!isLowerWindowPart(buildingPart)) return buildingPart;
    return elevation % 2 === 0 ? getUpperWindowPart(buildingPart) : buildingPart;
}

function clampInteger(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
}
