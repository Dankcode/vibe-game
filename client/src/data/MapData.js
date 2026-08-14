import {
    applyBuildingDoorTexturesToTileRows,
    applyBuildingFloorTexturesToTileRows,
    applyBuildingStoriesToTileRows,
    stampBuildingsOnRows
} from './BuildingData.js';
import { normalizeBurgThemeId } from './BurgThemeCatalog.js';
import { BUILDING_PARTS, MAP_LEGEND, TILE_EFFECTS, TEXTURE_IDS, symbolRowsToTileCells } from './TileLibrary.js';
import {
    createFantasyWorldPlanAt,
    FANTASY_WORLD,
    getDefaultWorldLocation,
    getWorldMapLocations,
    WORLD_VIEW_HEIGHT,
    WORLD_VIEW_WIDTH
} from './FantasyWorldData.js';
import { ELEMENTS, isArchitectureThemeSurface } from './TileRegistry.js';
import { stabilizeBuildingElevation } from './StructuralMatrixRules.js';

export const MAP_CHUNK_SIZE = 16;
export { MAP_LEGEND };
export { FANTASY_WORLD, getWorldMapLocations };

const TOWN_ROWS_CACHE = new Map();
const TOWN_ROWS_CACHE_LIMIT = 8;

const DEFAULT_WORLD_LOCATION = getDefaultWorldLocation();
export const MAIN_MAP = createFantasyWorldRowsAt(DEFAULT_WORLD_LOCATION.x, DEFAULT_WORLD_LOCATION.y);
export const WILDLIFE_SPAWNS = createWildlifeSpawnsForMap(MAIN_MAP);

export function createFantasyWorldRowsAt(worldX, worldY, options = {}) {
    const townPlan = createFantasyWorldPlanAt(worldX, worldY, {
        width: options.width || WORLD_VIEW_WIDTH,
        height: options.height || WORLD_VIEW_HEIGHT,
        variant: options.variant || 0
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
    return [
        townPlan.world?.id || 'world',
        townId,
        townPlan.width,
        townPlan.height,
        townPlan.variant || 0,
        townPlan.generationVersion || 'v1',
        townPlan.contentHash || 'unhashed'
    ].join(':');
}

export function createTownTileRows(townPlan) {
    const buildings = townPlan.buildings || [];
    assignBuildingObstructionTags(buildings, townPlan.sourceTown?.id || townPlan.townName || 'town');
    const terrainRows = removeIsolatedSandRows(townPlan.rows, townPlan.elevationRows);
    const buildingRows = stampBuildingsOnRows(terrainRows, buildings, {
        villageCenter: townPlan.center,
        connectDoors: townPlan.connectDoors ?? false,
        normalizeDoors: townPlan.procedural !== false
    });
    const tileRows = symbolRowsToTileCells(buildingRows);
    applyVisualVariantRowsToTileRows(tileRows, townPlan.visualVariantRows);
    applyPaletteRowsToTileRows(tileRows, townPlan.paletteRows);
    applyTownElevationsToTileRows(tileRows, townPlan.elevationRows, buildings);
    applyBlueprintWallHeightsToTileRows(tileRows, townPlan.wallHeightRows, townPlan.elevationRows);
    applyBuildingStoriesToTileRows(tileRows, buildings);
    applyBuildingFloorTexturesToTileRows(tileRows, buildings);
    applyBuildingDoorTexturesToTileRows(tileRows, buildings);
    applyArchitectureThemeRowsToTileRows(
        tileRows,
        townPlan.architectureThemeRows,
        buildings,
        { primaryArchitectureThemeId: townPlan.theme?.primaryArchitectureThemeId }
    );
    tileRows.buildings = buildings;
    tileRows.decorations = townPlan.decorations || [];
    tileRows.seed = townPlan.seed;
    tileRows.variant = townPlan.variant || 0;
    tileRows.generationVersion = townPlan.generationVersion;
    tileRows.contentHash = townPlan.contentHash;
    tileRows.visualVariantRows = (townPlan.visualVariantRows || []).slice();
    tileRows.paletteRows = (townPlan.paletteRows || []).map((row) => row.slice());
    tileRows.architectureThemeRows = tileRows.map((row) =>
        row.map((cell) => cell.architectureThemeId)
    );
    tileRows.wallHeightRows = (townPlan.wallHeightRows || []).map((row) => row.slice());
    tileRows.townName = townPlan.townName;
    tileRows.townCenter = townPlan.center;
    tileRows.theme = townPlan.theme ? { ...townPlan.theme } : undefined;
    tileRows.generation = townPlan.generation ? { ...townPlan.generation } : undefined;
    tileRows.spawn = findGroundSpawn(tileRows, townPlan.center, {
        buildings,
        decorations: tileRows.decorations
    });
    tileRows.generator = townPlan.generation?.mode || 'geographic-wfc';
    if (townPlan.sourceTown) tileRows.sourceTown = townPlan.sourceTown;
    if (townPlan.world) tileRows.world = townPlan.world;
    return tileRows;
}

export function applyVisualVariantRowsToTileRows(tileRows, variantRows = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return tileRows;
    for (let y = 0; y < tileRows.length; y++) {
        const variantRow = variantRows[y];
        for (let x = 0; x < (tileRows[y]?.length || 0); x++) {
            const raw = typeof variantRow === 'string' ? variantRow[x] : variantRow?.[x];
            const parsed = typeof raw === 'string' ? Number.parseInt(raw, 36) : Number(raw);
            tileRows[y][x].visualVariant = Number.isFinite(parsed)
                ? Math.max(0, Math.min(35, Math.floor(parsed)))
                : 0;
        }
    }
    return tileRows;
}

export function applyPaletteRowsToTileRows(tileRows, paletteRows = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return tileRows;
    for (let y = 0; y < tileRows.length; y++) {
        for (let x = 0; x < (tileRows[y]?.length || 0); x++) {
            const paletteId = paletteRows[y]?.[x];
            tileRows[y][x].paletteId = typeof paletteId === 'string' && paletteId
                ? paletteId
                : 'meadow';
        }
    }
    return tileRows;
}

/**
 * Attach manifest-authoritative burg ownership after building stamping. Explicit
 * ownership rows constrain streets and city walls, while a building's own theme
 * wins for its footprint. Building expansion never infers ownership for a door
 * approach; any themed approach must come from an explicit ownership row.
 */
export function applyArchitectureThemeRowsToTileRows(
    tileRows,
    architectureThemeRows = [],
    buildings = [],
    options = {}
) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return tileRows;
    const hasOwnershipRows = Array.isArray(architectureThemeRows) && architectureThemeRows.length > 0;
    const primaryArchitectureThemeId = normalizeBurgThemeId(
        options.primaryArchitectureThemeId,
        null
    );

    for (let y = 0; y < tileRows.length; y++) {
        for (let x = 0; x < (tileRows[y]?.length || 0); x++) {
            const cell = tileRows[y][x];
            if (!cell) continue;
            const ownedThemeId = hasOwnershipRows
                ? normalizeBurgThemeId(architectureThemeRows[y]?.[x], null)
                : null;
            cell.architectureThemeId = ownedThemeId || (
                !hasOwnershipRows && primaryArchitectureThemeId &&
                isArchitectureThemeSurface(cell.element, cell.texture)
                    ? primaryArchitectureThemeId
                    : null
            );
        }
    }

    const offsetX = Math.floor((tileRows[0]?.length || 0) / 2);
    const offsetY = Math.floor(tileRows.length / 2);
    for (const building of Array.isArray(buildings) ? buildings : []) {
        const buildingThemeId = normalizeBurgThemeId(
            building?.architectureThemeId,
            primaryArchitectureThemeId
        );
        if (!buildingThemeId) continue;
        for (const { x: localX, y: localY } of getArchitectureBuildingFootprint(building)) {
            const row = Math.floor(Number(building.y) || 0) + localY + offsetY;
            const col = Math.floor(Number(building.x) || 0) + localX + offsetX;
            const cell = tileRows[row]?.[col];
            if (cell) cell.architectureThemeId = buildingThemeId;
        }
    }

    return tileRows;
}

function getArchitectureBuildingFootprint(building = {}) {
    const width = Math.max(1, Math.floor(Number(building.width) || 1));
    const height = Math.max(1, Math.floor(Number(building.height) || 1));
    if (Array.isArray(building.footprintCells) && building.footprintCells.length > 0) {
        return building.footprintCells
            .map((cell) => ({
                x: Math.floor(Number(cell?.x)),
                y: Math.floor(Number(cell?.y))
            }))
            .filter((cell) => Number.isFinite(cell.x) && Number.isFinite(cell.y) &&
                cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height);
    }
    return Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => ({ x, y }))
    ).flat();
}

export function createWildlifeSpawnsForMap(tileRows, options = {}) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return [];
    const height = tileRows.length;
    const width = tileRows[0]?.length || 0;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const seed = options.seed ?? tileRows.seed ?? 1;
    const candidates = [];
    for (let row = 1; row < height - 1; row++) {
        for (let col = 1; col < width - 1; col++) {
            const cell = tileRows[row]?.[col];
            if (!cell || cell.element !== ELEMENTS.GEO || cell.building !== BUILDING_PARTS.NONE) continue;
            if (![TEXTURE_IDS.DEFAULT, TEXTURE_IDS.FOREST, TEXTURE_IDS.GARDEN_GROUND].includes(cell.texture)) continue;
            const x = col - offsetX;
            const y = row - offsetY;
            const spawnDistance = tileRows.spawn ? Math.hypot(x - tileRows.spawn.x, y - tileRows.spawn.y) : Infinity;
            if (spawnDistance < 5) continue;
            candidates.push({ x, y, score: hashMapSeed(`${seed}:wildlife:${x}:${y}`) });
        }
    }
    candidates.sort((a, b) => a.score - b.score || a.y - b.y || a.x - b.x);
    const target = Math.max(2, Math.min(7, Math.floor(candidates.length / 450)));
    const selected = [];
    for (const candidate of candidates) {
        if (selected.length >= target) break;
        if (selected.some((other) => Math.hypot(other.x - candidate.x, other.y - candidate.y) < 9)) continue;
        selected.push(candidate);
    }
    return selected.map((candidate, index) => ({
        id: `meadow-hare-${String(index + 1).padStart(2, '0')}-${candidate.score.toString(16).slice(0, 4)}`,
        species: 'meadowHare',
        habitat: 'meadow',
        x: candidate.x,
        y: candidate.y,
        leashRadius: 3 + (candidate.score % 3),
        seed: candidate.score
    }));
}

function hashMapSeed(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index++) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function assignBuildingObstructionTags(buildings, townTag) {
    const normalizedTownTag = slugify(townTag || 'town');
    buildings.forEach((building, index) => {
        if (building.obstructionTag) return;
        const buildingId = building.id || `${building.name || 'building'}-${index}`;
        building.obstructionTag = `building:${normalizedTownTag}:${slugify(buildingId)}`;
    });
}

export function applyTownElevationsToTileRows(tileRows, elevationRows = [], buildings = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0 || !Array.isArray(elevationRows)) return tileRows;

    for (let y = 0; y < tileRows.length; y++) {
        for (let x = 0; x < (tileRows[y]?.length || 0); x++) {
            const baseElevation = clampElevation(elevationRows[y]?.[x]);
            const cell = tileRows[y][x];
            if (!cell) continue;
            if (cell.element === ELEMENTS.HYDRO) {
                // Deep ocean remains the zero datum. FMG rivers, marshes, falls and shallow
                // channels retain their collapsed macro tier so water can cross elevated towns
                // without turning into a sea-level trench at materialization time.
                cell.height = cell.texture === TEXTURE_IDS.DEEP_WATER ? 0 : baseElevation;
                continue;
            }
            if (cell.element === ELEMENTS.PYRO) {
                cell.height = 0;
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

export function applyBlueprintWallHeightsToTileRows(tileRows, wallHeightRows = [], elevationRows = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0 || !Array.isArray(wallHeightRows)) return tileRows;

    for (let y = 0; y < tileRows.length; y++) {
        for (let x = 0; x < (tileRows[y]?.length || 0); x++) {
            const cell = tileRows[y][x];
            const wallHeight = Number(wallHeightRows[y]?.[x]);
            if (!Number.isFinite(wallHeight) || wallHeight <= 0) continue;
            if (cell?.element !== ELEMENTS.STRUCTURE || cell.building !== BUILDING_PARTS.WALL || cell.texture !== TEXTURE_IDS.TOWN_WALL) continue;

            const baseElevation = clampElevation(elevationRows[y]?.[x]);
            const heightVoxels = Math.max(3, Math.min(9, Math.floor(wallHeight)));
            cell.buildingBaseElevation = baseElevation;
            cell.buildingGroundElevation = baseElevation;
            cell.buildingGroundFloorZ = baseElevation;
            cell.height = baseElevation + heightVoxels - 1;
        }
    }

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

function findGroundSpawn(tileRows, center = {}, worldFeatures = {}) {
    const height = tileRows.length;
    const width = tileRows[0]?.length || 0;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const centerX = Math.max(0, Math.min(width - 1, Math.round(center.x ?? offsetX)));
    const centerY = Math.max(0, Math.min(height - 1, Math.round(center.y ?? offsetY)));
    const entranceY = Math.max(centerY, Math.round(height * 0.78));
    const decorations = worldFeatures.decorations || [];
    const buildings = worldFeatures.buildings || [];
    let best = null;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const cell = tileRows[row][col];
            if (!isGroundSpawnCell(cell)) continue;
            const worldX = col - offsetX;
            const worldY = row - offsetY;
            const distance = Math.hypot(col - centerX, row - entranceY);
            const roadBias = [TEXTURE_IDS.ROAD, TEXTURE_IDS.CITY_COBBLE, TEXTURE_IDS.CITY_PLAZA].includes(cell.texture) ? -5 : 0;
            const nearbyLife = decorations.reduce((count, decoration) => {
                const decorDistance = Math.hypot(worldX - decoration.x, worldY - decoration.y);
                return count + (decorDistance <= 8 ? (8 - decorDistance) / 8 : 0);
            }, 0);
            const buildingDistance = buildings.reduce((nearest, building) => {
                const buildingX = building.x + (building.width || 1) / 2;
                const buildingY = building.y + (building.height || 1) / 2;
                return Math.min(nearest, Math.hypot(worldX - buildingX, worldY - buildingY));
            }, Infinity);
            const neighborhoodBias = Number.isFinite(buildingDistance)
                ? Math.abs(Math.max(3, buildingDistance) - 7) * 0.55
                : 0;
            const score = distance * 0.85 + roadBias + neighborhoodBias - Math.min(6, nearbyLife) * 0.95 + (cell.height || 0) * 0.2;
            if (!best || score < best.score) {
                best = {
                    x: worldX,
                    y: worldY,
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
