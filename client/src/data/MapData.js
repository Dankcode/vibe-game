import {
    applyBuildingDoorTexturesToTileRows,
    applyBuildingFloorTexturesToTileRows,
    applyBuildingStoriesToTileRows,
    stampBuildingsOnRows
} from './BuildingData.js';
import { BUILDING_PARTS, MAP_LEGEND, TILE_EFFECTS, TEXTURE_IDS, symbolRowsToTileCells } from './TileLibrary.js';
import {
    createFantasyWorldPlanAt,
    FANTASY_WORLD,
    getDefaultWorldLocation,
    getWorldMapLocations,
    WORLD_VIEW_HEIGHT,
    WORLD_VIEW_WIDTH
} from './FantasyWorldData.js';
import { ELEMENTS } from './TileRegistry.js';
import { stabilizeBuildingElevation } from './StructuralMatrixRules.js';

export const MAP_CHUNK_SIZE = 16;
export { MAP_LEGEND };
export { FANTASY_WORLD, getWorldMapLocations };

const TOWN_ROWS_CACHE = new Map();
const TOWN_ROWS_CACHE_LIMIT = 8;

const DEFAULT_WORLD_LOCATION = getDefaultWorldLocation();
export const MAIN_MAP = createFantasyWorldRowsAt(DEFAULT_WORLD_LOCATION.x, DEFAULT_WORLD_LOCATION.y);

export const WILDLIFE_SPAWNS = [
    {
        id: 'meadow-hare-01',
        species: 'meadowHare',
        habitat: 'meadow',
        x: -8,
        y: -4,
        leashRadius: 4
    }
];

export function createFantasyWorldRowsAt(worldX, worldY, options = {}) {
    const townPlan = createFantasyWorldPlanAt(worldX, worldY, {
        width: options.width || WORLD_VIEW_WIDTH,
        height: options.height || WORLD_VIEW_HEIGHT
    });
    const cacheKey = getTownRowsCacheKey(townPlan);
    if (!options.skipCache && TOWN_ROWS_CACHE.has(cacheKey)) {
        const cached = TOWN_ROWS_CACHE.get(cacheKey);
        TOWN_ROWS_CACHE.delete(cacheKey);
        TOWN_ROWS_CACHE.set(cacheKey, cached);
        return cached;
    }

    const rows = createTownTileRows(townPlan);
    if (!options.skipCache) {
        TOWN_ROWS_CACHE.set(cacheKey, rows);
        while (TOWN_ROWS_CACHE.size > TOWN_ROWS_CACHE_LIMIT) {
            TOWN_ROWS_CACHE.delete(TOWN_ROWS_CACHE.keys().next().value);
        }
    }
    return rows;
}

function getTownRowsCacheKey(townPlan) {
    const townId = townPlan.sourceTown?.id || townPlan.townName || 'town';
    return `${townPlan.world?.id || 'world'}:${townId}:${townPlan.width}x${townPlan.height}`;
}

export function createTownTileRows(townPlan) {
    const buildings = townPlan.buildings || [];
    assignBuildingObstructionTags(buildings, townPlan.sourceTown?.id || townPlan.townName || 'town');
    const terrainRows = removeIsolatedSandRows(townPlan.rows, townPlan.elevationRows);
    const buildingRows = stampBuildingsOnRows(terrainRows, buildings, {
        villageCenter: townPlan.center,
        connectDoors: townPlan.connectDoors ?? false,
        normalizeDoors: !townPlan.sourceTown
    });
    const tileRows = symbolRowsToTileCells(buildingRows);
    applyTownElevationsToTileRows(tileRows, townPlan.elevationRows, buildings);
    applyBuildingStoriesToTileRows(tileRows, buildings);
    applyBuildingFloorTexturesToTileRows(tileRows, buildings);
    applyBuildingDoorTexturesToTileRows(tileRows, buildings);
    tileRows.buildings = buildings;
    tileRows.decorations = townPlan.decorations || [];
    tileRows.seed = townPlan.seed;
    tileRows.townName = townPlan.townName;
    tileRows.townCenter = townPlan.center;
    tileRows.spawn = findGroundSpawn(tileRows, townPlan.center);
    tileRows.generator = townPlan.sourceTown
        ? 'active-world-town-json-v2'
        : 'azgaar-inspired-small-town-v1';
    if (townPlan.sourceTown) tileRows.sourceTown = townPlan.sourceTown;
    if (townPlan.world) tileRows.world = townPlan.world;
    return tileRows;
}

function assignBuildingObstructionTags(buildings, townTag) {
    const normalizedTownTag = slugify(townTag || 'town');
    buildings.forEach((building, index) => {
        if (building.obstructionTag) return;
        const buildingId = building.id || `${building.name || 'building'}-${index}`;
        building.obstructionTag = `building:${normalizedTownTag}:${slugify(buildingId)}`;
    });
}

function applyTownElevationsToTileRows(tileRows, elevationRows = [], buildings = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0 || !Array.isArray(elevationRows)) return tileRows;

    for (let y = 0; y < tileRows.length; y++) {
        for (let x = 0; x < (tileRows[y]?.length || 0); x++) {
            const baseElevation = clampElevation(elevationRows[y]?.[x]);
            const cell = tileRows[y][x];
            if (!cell || cell.element === ELEMENTS.HYDRO || cell.element === ELEMENTS.PYRO) {
                if (cell) cell.height = 0;
                continue;
            }
            cell.height = isCityWallStairCell(cell)
                ? baseElevation
                : Math.max(cell.height || 0, baseElevation);
        }
    }

    stabilizeBuildingElevation(tileRows, elevationRows, buildings, { apron: 1 });

    return tileRows;
}

function clampElevation(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(6, Math.floor(number)));
}

function slugify(value) {
    return String(value || 'item')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'item';
}

function isCityWallStairCell(cell) {
    return [
        BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
        BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
        BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
        BUILDING_PARTS.CITY_WALL_STAIRS_EAST
    ].includes(cell?.building);
}

function findGroundSpawn(tileRows, center = {}) {
    const height = tileRows.length;
    const width = tileRows[0]?.length || 0;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const centerX = Math.max(0, Math.min(width - 1, Math.round(center.x ?? offsetX)));
    const centerY = Math.max(0, Math.min(height - 1, Math.round(center.y ?? offsetY)));
    let best = null;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const cell = tileRows[row][col];
            if (!isGroundSpawnCell(cell)) continue;
            const distance = Math.hypot(col - centerX, row - centerY);
            const roadBias = cell.texture === 2 ? -3 : 0;
            const score = distance + roadBias + (cell.height || 0) * 0.2;
            if (!best || score < best.score) {
                best = {
                    x: col - offsetX,
                    y: row - offsetY,
                    score
                };
            }
        }
    }

    if (best) return { x: best.x, y: best.y };

    carveFallbackSpawnPlaza(tileRows, centerX, centerY);
    return {
        x: centerX - offsetX,
        y: centerY - offsetY
    };
}

function isGroundSpawnCell(cell) {
    return cell &&
        cell.element === ELEMENTS.GEO &&
        cell.building === 0;
}

function carveFallbackSpawnPlaza(tileRows, centerX, centerY) {
    for (let row = centerY - 1; row <= centerY + 1; row++) {
        for (let col = centerX - 1; col <= centerX + 1; col++) {
            const cell = tileRows[row]?.[col];
            if (!cell) continue;
            cell.element = ELEMENTS.GEO;
            cell.texture = TEXTURE_IDS.ROAD;
            cell.effect = TILE_EFFECTS.EARTH;
            cell.building = 0;
            cell.height = Math.max(0, cell.height || 0);
        }
    }
}

function removeIsolatedSandRows(rows = [], elevationRows = []) {
    const mutable = rows.map((row) => row.split(''));
    for (let y = 0; y < mutable.length; y++) {
        for (let x = 0; x < (mutable[y]?.length || 0); x++) {
            if (mutable[y][x] !== 'S') continue;
            const elevation = Number(elevationRows[y]?.[x]) || 0;
            const sandNeighbors = countNeighborSymbols(mutable, x, y, 'S');
            const sameElevationSandNeighbors = countNeighborSymbols(mutable, x, y, 'S', (nx, ny) =>
                (Number(elevationRows[ny]?.[nx]) || 0) === elevation
            );
            const isClustered = sandNeighbors >= 2 &&
                (!elevationRows.length || elevation <= 0 || sameElevationSandNeighbors >= 1);
            if (isClustered) continue;
            mutable[y][x] = getDominantReplacementTerrain(mutable, x, y);
        }
    }
    return mutable.map((row) => row.join(''));
}

function countNeighborSymbols(rows, x, y, symbol, predicate = null) {
    let count = 0;
    for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
            if (ox === 0 && oy === 0) continue;
            const nx = x + ox;
            const ny = y + oy;
            if (rows[ny]?.[nx] !== symbol) continue;
            if (predicate && !predicate(nx, ny)) continue;
            count += 1;
        }
    }
    return count;
}

function getDominantReplacementTerrain(rows, x, y) {
    const counts = new Map();
    const candidates = new Set(['G', 'F', 'H', '.', ':', ';', ',']);
    for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
            if (ox === 0 && oy === 0) continue;
            const neighbor = rows[y + oy]?.[x + ox];
            if (!candidates.has(neighbor)) continue;
            counts.set(neighbor, (counts.get(neighbor) || 0) + 1);
        }
    }

    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'G';
}
