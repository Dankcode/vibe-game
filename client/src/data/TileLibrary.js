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
    ICE: 1,
    DEEP_WATER: 2,
    MARSH_WATER: 4,
    TOWN_WALL: 1,
    BUILDING_FLOOR: 2,
    STONE_BUILDING_WALL: 3,
    TIMBER_BUILDING_WALL: 4,
    DOOR: 5,
    STAIRS: 6,
    STONE_STAIRS: 9,
    TIMBER_STAIRS: 10
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
    WINDOW_UPPER_EAST: 17
};

export const TILE_SYMBOL_LIBRARY = {
    W: { element: ELEMENTS.HYDRO, texture: TEXTURE_IDS.DEEP_WATER, effect: TILE_EFFECTS.WATER, building: BUILDING_PARTS.NONE, height: 0 },
    B: { element: ELEMENTS.HYDRO, texture: TEXTURE_IDS.MARSH_WATER, effect: TILE_EFFECTS.WATER, building: BUILDING_PARTS.NONE, height: 0 },
    S: { element: ELEMENTS.ANEMO, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.WIND, building: BUILDING_PARTS.NONE, height: 0 },
    G: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.DEFAULT, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    F: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.FOREST, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 0 },
    H: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.HILL, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 1 },
    M: { element: ELEMENTS.GEO, texture: TEXTURE_IDS.MOUNTAIN, effect: TILE_EFFECTS.EARTH, building: BUILDING_PARTS.NONE, height: 2 },
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
    D: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.DOOR, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.DOOR, height: 0 },
    E: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.BUILDING_FLOOR, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.FLOOR, height: 0 },
    U: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS, height: 0 },
    1: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_NORTH, height: 0 },
    2: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_SOUTH, height: 0 },
    3: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_WEST, height: 0 },
    4: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.STONE_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_EAST, height: 0 },
    5: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_NORTH, height: 0 },
    6: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_SOUTH, height: 0 },
    7: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_WEST, height: 0 },
    8: { element: ELEMENTS.STRUCTURE, texture: TEXTURE_IDS.TIMBER_STAIRS, effect: TILE_EFFECTS.STRUCTURE, building: BUILDING_PARTS.STAIRS_EAST, height: 0 }
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

function clampInteger(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
}
