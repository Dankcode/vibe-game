#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    BUILDING_FLOOR_HEIGHT,
    BUILDING_PART_TAGS,
    BUILDING_PLACEMENT_TAGS,
    createBuildingLevelReferences,
    createRoofLevelReference,
    createStairFlight,
    STAIR_CONFIGURATION,
    validateStaircaseRouting
} from '../client/src/data/StructuralMatrixRules.js';
import { BUILDING_PARTS } from '../client/src/data/TileLibrary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DROP_SOURCE_DIR = path.join(REPO_ROOT, 'world-map-source');
const OUTPUT_MODULE = path.join(REPO_ROOT, 'client', 'src', 'data', 'ActiveWorldData.js');
const OUTPUT_ASSET_DIR = path.join(REPO_ROOT, 'client', 'public', 'assets', 'maps');
const OUTPUT_ASSET = path.join(OUTPUT_ASSET_DIR, 'map-data.png');
const ASSET_PUBLIC_PATH = '/assets/maps/map-data.png';
const EXPORTED_MAP_DATA_NAME = 'map-data';
const ACTIVE_WORLD_ID = EXPORTED_MAP_DATA_NAME;
const ACTIVE_WORLD_NAME = EXPORTED_MAP_DATA_NAME;
const SOURCE_TOWN_WIDTH = 80;
const SOURCE_TOWN_HEIGHT = 60;
const TERRAIN_SCALE = 1;
const LEGACY_BUILDING_SCALE = 3;
const NARROW_ROAD_WIDTH = 1;
const MAIN_ROAD_WIDTH = 2;
const DOCK_ROAD_WIDTH = 1;
const WALL_WIDTH = 2;
const THICK_CITY_WALL_LAYERS = 4;

async function main(argv = process.argv.slice(2)) {
    const sourceDir = await resolveSourceDir(argv[0]);
    const manifest = await readJson(path.join(sourceDir, 'manifest.json'));
    const worldFile = await resolveMapDataFile(sourceDir, manifest.files?.world, ['map-data.json']);
    const imageFile = await resolveMapDataFile(sourceDir, manifest.files?.image, ['map-data.png']);
    const world = await readJson(worldFile);
    const townsDir = path.join(sourceDir, manifest.files.towns_directory || 'towns');
    const townFiles = (manifest.files.towns || await listTownFiles(townsDir))
        .map((file) => file.replace(/^towns\//, ''))
        .sort((a, b) => getBurgNumber(a) - getBurgNumber(b));

    const heightSamples = createHeightSamples(world.world.cells || []);
    const towns = [];
    for (const file of townFiles) {
        const burgId = getBurgNumber(file);
        const town = await readJson(path.join(townsDir, file));
        const burg = world.entities.burgs.find((candidate) => candidate.id === burgId) ||
            manifest.burgs.find((candidate) => candidate.id === burgId);
        if (!burg) continue;
        towns.push(createCompactTown(burg, town, file, heightSamples));
    }

    const locations = towns.map((town) => town.location);
    const activeBuildingScale = towns.every((town) => town.town.sourceFormat === 'matrix-grid-v1') ? 1 : LEGACY_BUILDING_SCALE;
    const payload = {
        world: {
            id: ACTIVE_WORLD_ID,
            name: ACTIVE_WORLD_NAME,
            sourceName: EXPORTED_MAP_DATA_NAME,
            seed: Number(world.metadata.seed || manifest.seed || 0),
            width: world.world.width,
            height: world.world.height,
            source: manifest.source,
            exportedAt: manifest.exported_at,
            importScale: TERRAIN_SCALE,
            buildingScale: activeBuildingScale,
            image: {
                src: ASSET_PUBLIC_PATH,
                width: world.image.width,
                height: world.image.height,
                coordinateSpace: world.image.coordinate_space,
                sourceFile: path.basename(imageFile)
            },
            locations,
            routes: createRoutePayload(world.world.routes || []),
            heightSamples
        },
        towns: Object.fromEntries(towns.map((town) => [town.location.id, town.town]))
    };

    await mkdir(OUTPUT_ASSET_DIR, { recursive: true });
    await writeFile(OUTPUT_ASSET, await readFile(imageFile));
    await writeModule(payload);

    console.log(JSON.stringify({
        ok: true,
        sourceDir,
        map: payload.world.sourceName,
        outputModule: path.relative(REPO_ROOT, OUTPUT_MODULE),
        outputAsset: path.relative(REPO_ROOT, OUTPUT_ASSET),
        terrainScale: TERRAIN_SCALE,
        buildingScale: activeBuildingScale,
        towns: towns.length,
        routes: payload.world.routes.length,
        buildings: towns.reduce((sum, town) => sum + town.town.buildings.length, 0)
    }, null, 2));
}

function createCompactTown(burg, town, file, heightSamples = []) {
    const hasMatrix = isTownMatrix(town.matrix);
    const sourceWidth = hasMatrix
        ? town.matrix.block.width
        : Math.min(SOURCE_TOWN_WIDTH, town.grid.width);
    const sourceHeight = hasMatrix
        ? town.matrix.block.height
        : Math.min(SOURCE_TOWN_HEIGHT, town.grid.height);
    const width = sourceWidth;
    const height = sourceHeight;
    const profile = createTownProfile(burg, town);
    const { rows, elevationRows } = hasMatrix
        ? createTerrainFromMatrix(town.matrix, profile, { burg, town, heightSamples })
        : createTerrain(town, sourceWidth, sourceHeight, profile);
    if (!hasMatrix) {
        overlayCells(rows, town.farms, profile.farmSymbol);
        overlayRoads(rows, town.streets, profile);
        enrichGroundVariants(rows, profile);
        overlayCityWalls(rows, town.walls, profile);
    }

    const buildingCandidates = (town.buildings || [])
        .map((building, index) => createBuildingBlueprint(building, town, width, height, elevationRows, index, { matrixMode: hasMatrix }))
        .filter(Boolean);
    const buildings = hasMatrix
        ? buildingCandidates
        : selectTownBuildings(buildingCandidates, width, height);
    auditTownCongruence(burg, town, buildingCandidates, buildings);
    if (hasMatrix) {
        alignMatrixBuildingEntrances(rows, buildings, profile);
        ensureMatrixDoorApproaches(rows, elevationRows, buildings, profile);
        // Final coherence pass: door-approach clamping above can leave single raised cells; absorb
        // any sub-cluster elevation island (the runtime plateau apron re-flattens door approaches).
        enforceElevationClusterCoherence(rows.map((row) => row.split('')), elevationRows);
    } else {
        alignBuildingEntrances(rows, buildings, profile);
    }
    refreshBuildingMatrices(buildings);
    const decorations = createRoadDecorations(rows, buildings, profile, town.seed || burg.id || 1);

    return {
        location: {
            id: `burg-${burg.id}`,
            burgId: burg.id,
            name: burg.name,
            type: normalizeBurgType(burg),
            x: roundCoordinate(burg.coordinate_center?.[0] ?? town.grid.center?.[0] ?? 0),
            y: roundCoordinate(burg.coordinate_center?.[1] ?? town.grid.center?.[1] ?? 0),
            population: burg.population || 0,
            culture: burg.culture,
            state: burg.state,
            townFile: `towns/${file}`,
            flags: burg.flags || {},
            grid: {
                width,
                height,
                sourceWidth,
                sourceHeight,
                terrainScale: TERRAIN_SCALE,
                buildingScale: hasMatrix ? 1 : LEGACY_BUILDING_SCALE,
                tileSizeMapUnits: town.grid.tile_size_map_units,
                origin: town.grid.origin,
                center: town.grid.center
            },
            summary: {
                biome: town.biome,
                density: town.density,
                buildings: buildings.length,
                streets: town.streets?.length || 0,
                walls: town.walls?.length || 0,
                farms: town.farms?.length || 0,
                doodads: town.doodads?.length || 0,
                generatedDecorations: decorations.length
            }
        },
        town: {
            id: `burg-${burg.id}`,
            name: town.name,
            seed: town.seed,
            biome: town.biome,
            density: town.density,
            width,
            height,
            terrainScale: TERRAIN_SCALE,
            buildingScale: hasMatrix ? 1 : LEGACY_BUILDING_SCALE,
            sourceFormat: hasMatrix ? 'matrix-grid-v1' : 'legacy-town-v1',
            rows,
            elevationRows: elevationRows.map((row) => row.join('')),
            buildings,
            decorations,
            connections: town.connections,
            worldCenter: town.grid.center,
            origin: town.grid.origin,
            tileSizeMapUnits: town.grid.tile_size_map_units,
            stats: {
                tiles: town.tiles?.length || 0,
                streets: town.streets?.length || 0,
                buildings: town.buildings?.length || 0,
                runtimeBuildings: buildings.length,
                walls: town.walls?.length || 0,
                farms: town.farms?.length || 0,
                doodads: town.doodads?.length || 0,
                generatedDecorations: decorations.length
            }
        }
    };
}

function createTownProfile(burg, town) {
    const type = normalizeBurgType(burg);
    const dense = ['HIGH', 'EXTREME'].includes(String(town.density || '').toUpperCase());
    const cityLike = dense || ['capital', 'port', 'fortress'].includes(type);
    return {
        type,
        biome: town.biome,
        cityLike,
        roadSymbol: cityLike ? ':' : '.',
        mainRoadSymbol: cityLike ? ';' : 'R',
        dockSymbol: type === 'port' ? ';' : ':',
        baseGroundSymbol: cityLike ? ':' : 'G',
        villageGroundSymbol: cityLike ? ':' : '.',
        plazaSymbol: ';',
        farmSymbol: ',',
        shallowWaterSymbol: '~',
        wallSymbol: 'T'
    };
}

function isTownMatrix(matrix) {
    return matrix?.schema === 'vibe-game-town-matrix' &&
        Array.isArray(matrix.terrain) &&
        Number.isFinite(matrix.block?.width) &&
        Number.isFinite(matrix.block?.height);
}

function createTerrain(town, sourceWidth, sourceHeight, profile) {
    const mutable = Array.from({ length: sourceHeight }, () => Array.from({ length: sourceWidth }, () => profile.baseGroundSymbol));
    const elevationRows = Array.from({ length: sourceHeight }, () => Array.from({ length: sourceWidth }, () => 0));

    for (const tile of town.tiles || []) {
        if (!isInside(tile.x, tile.y, sourceWidth, sourceHeight)) continue;
        const symbol = terrainTileToSymbol(tile, profile);
        const elevation = terrainTileToElevation(tile);
        mutable[tile.y][tile.x] = symbol;
        elevationRows[tile.y][tile.x] = elevation;
    }

    return {
        rows: mutable.map((row) => row.join('')),
        elevationRows
    };
}

function createTerrainFromMatrix(matrix, profile, context = {}) {
    const height = matrix.block.height;
    const width = matrix.block.width;
    const mutable = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => matrixTerrainCodeToSymbol(matrix.terrain[y]?.[x], profile))
    );
    const elevationRows = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => matrixTerrainCodeToElevation(matrix.terrain[y]?.[x], matrix.solid_height_voxels?.[y]?.[x]))
    );

    ensureHorizontalMainRoad(mutable, profile);
    const tilt = computeTownTilt(context.burg, context.heightSamples, context.town);
    const bandGrid = createTerraceBandGrid(width, height, tilt, matrix);
    applyTerracedElevation(mutable, elevationRows, bandGrid);
    normalizeLooseSurfaceClusters(mutable, profile);
    infillTownOpenSpaces(mutable, elevationRows, profile, context.town?.seed || context.burg?.id || 1);
    enforceElevationClusterCoherence(mutable, elevationRows);
    applyMatrixCityWallWorks(mutable, elevationRows, matrix, bandGrid);

    return {
        rows: mutable.map((row) => row.join('')),
        elevationRows
    };
}

function matrixTerrainCodeToSymbol(code, profile) {
    switch (Number(code)) {
        case 2:
            return 'S';
        case 3:
        case 4:
            return profile.villageGroundSymbol;
        case 5:
            return 'P';
        case 6:
            return 'I';
        case 8:
            return 'L';
        case 9:
        case 10:
            return 'H';
        case 11:
            return '~';
        case 12:
            return 'W';
        case 13:
            return profile.mainRoadSymbol;
        case 14:
            return profile.roadSymbol;
        case 15:
        case 16:
            return profile.dockSymbol;
        case 17:
            return profile.farmSymbol;
        case 18:
            return 'E';
        case 19:
            return 'T';
        case 20:
            return '9';
        case 21:
            return profile.mainRoadSymbol;
        case 0:
        case 1:
        default:
            return 'G';
    }
}

function matrixTerrainCodeToElevation(code, solidHeight = 0) {
    const terrain = Number(code);
    if (terrain === 11 || terrain === 12) return 0;
    if (terrain === 19 || terrain === 20) return Math.max(2, Math.min(4, Math.floor(Number(solidHeight) || 2)));
    if (terrain === 9 || terrain === 10) return 1;
    return 0;
}

// Town elevation model (context.md PLAN 2 §I): a uniform terraced tilt derived from the world
// height gradient at the burg's position — e.g. the east side of a town sits a couple of tiles
// above the west side — with terrace bands ≥ 6 cells wide, 1-tier steps (always walkable), and
// cluster coherence so no isolated raised cells survive. Per-cell random relief is forbidden.
const MIN_TERRACE_BAND_CELLS = 6;
const MAX_TERRACE_TIERS = 3;
const MIN_RELIEF_CLUSTER_CELLS = 8;
const MIN_SURFACE_CLUSTER_CELLS = 5;
const MIN_OPEN_SPACE_INFILL_CELLS = 18;
const TERRACE_DROP_PER_TIER = 4;
const TILT_SAMPLE_COUNT = 48;
const FALLBACK_TILT = Object.freeze({ direction: { x: 0.86, y: 0.5 }, magnitude: 0.12 });

function computeTownTilt(burg, heightSamples = [], town = null) {
    const centerX = Number(burg?.coordinate_center?.[0] ?? town?.grid?.center?.[0] ?? 0);
    const centerY = Number(burg?.coordinate_center?.[1] ?? town?.grid?.center?.[1] ?? 0);
    const neighbors = (heightSamples || [])
        .filter((sample) => Array.isArray(sample) && sample.length >= 3)
        .map(([x, y, h]) => ({
            dx: x - centerX,
            dy: y - centerY,
            h: Number(h) || 0,
            distance: Math.hypot(x - centerX, y - centerY)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, TILT_SAMPLE_COUNT);
    if (neighbors.length < 6) return createFallbackTownTilt(centerX, centerY);

    let sumW = 0;
    let meanX = 0;
    let meanY = 0;
    let meanH = 0;
    for (const sample of neighbors) {
        const w = 1 / (1 + sample.distance);
        sumW += w;
        meanX += w * sample.dx;
        meanY += w * sample.dy;
        meanH += w * sample.h;
    }
    meanX /= sumW;
    meanY /= sumW;
    meanH /= sumW;

    let sxx = 0;
    let syy = 0;
    let sxy = 0;
    let sxh = 0;
    let syh = 0;
    for (const sample of neighbors) {
        const w = 1 / (1 + sample.distance);
        const dx = sample.dx - meanX;
        const dy = sample.dy - meanY;
        const dh = sample.h - meanH;
        sxx += w * dx * dx;
        syy += w * dy * dy;
        sxy += w * dx * dy;
        sxh += w * dx * dh;
        syh += w * dy * dh;
    }
    const det = sxx * syy - sxy * sxy;
    if (!Number.isFinite(det) || Math.abs(det) < 1e-6) return createFallbackTownTilt(centerX, centerY);
    const gx = (syy * sxh - sxy * syh) / det;
    const gy = (sxx * syh - sxy * sxh) / det;
    const magnitude = Math.hypot(gx, gy);
    if (!Number.isFinite(magnitude) || magnitude < 0.035) return createFallbackTownTilt(centerX, centerY);
    return {
        direction: { x: gx / magnitude, y: gy / magnitude },
        magnitude: Math.max(magnitude, FALLBACK_TILT.magnitude * 0.75)
    };
}

function createFallbackTownTilt(centerX = 0, centerY = 0) {
    const flipX = Math.sin(centerY * 0.017) < -0.35 ? -1 : 1;
    const flipY = Math.cos(centerX * 0.013) < -0.6 ? -1 : 1;
    const x = FALLBACK_TILT.direction.x * flipX;
    const y = FALLBACK_TILT.direction.y * flipY;
    const length = Math.max(1e-6, Math.hypot(x, y));
    return {
        direction: { x: x / length, y: y / length },
        magnitude: FALLBACK_TILT.magnitude
    };
}

function createTerraceBandGrid(width, height, tilt, matrix) {
    const grid = Array.from({ length: height }, () => Array(width).fill(0));
    const cellSizeMapUnits = Number(matrix?.block?.size_map_units) || 1;
    const projectedExtentCells = Math.abs(tilt.direction.x) * width + Math.abs(tilt.direction.y) * height;
    const dropAcrossTown = tilt.magnitude * projectedExtentCells * cellSizeMapUnits;
    const maxTiersBySize = Math.max(0, Math.floor(Math.min(width, height) / MIN_TERRACE_BAND_CELLS) - 1);
    const tiers = Math.max(0, Math.min(
        Math.round(dropAcrossTown / TERRACE_DROP_PER_TIER),
        MAX_TERRACE_TIERS,
        maxTiersBySize
    ));
    if (tiers === 0) return grid;

    let pMin = Infinity;
    let pMax = -Infinity;
    for (const [cx, cy] of [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]]) {
        const p = tilt.direction.x * cx + tilt.direction.y * cy;
        pMin = Math.min(pMin, p);
        pMax = Math.max(pMax, p);
    }
    const span = Math.max(1e-6, pMax - pMin);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const p = tilt.direction.x * x + tilt.direction.y * y;
            grid[y][x] = Math.min(tiers, Math.floor(((p - pMin) / span) * (tiers + 1)));
        }
    }
    return grid;
}

function applyTerracedElevation(mutable, elevationRows, bandGrid) {
    for (let y = 0; y < mutable.length; y++) {
        for (let x = 0; x < (mutable[y]?.length || 0); x++) {
            if (['W', '~'].includes(mutable[y][x])) {
                elevationRows[y][x] = 0;
                continue;
            }
            elevationRows[y][x] = clamp((elevationRows[y]?.[x] || 0) + (bandGrid[y]?.[x] || 0), 0, 6);
        }
    }
}

// Generalized cluster rule (extends the sand rule to all elevation): any same-elevation island of
// open ground smaller than MIN_RELIEF_CLUSTER_CELLS is absorbed into the dominant neighboring level,
// so isolated raised floor tiles cannot exist by construction. Structures and water are barriers.
function enforceElevationClusterCoherence(mutable, elevationRows, minCluster = MIN_RELIEF_CLUSTER_CELLS) {
    const height = mutable.length;
    const width = mutable[0]?.length || 0;
    const coherent = (x, y) => isOpenGroundElevationSymbol(mutable[y]?.[x]) || isRoadSymbol(mutable[y]?.[x]) || mutable[y]?.[x] === 'P';

    for (let pass = 0; pass < 4; pass++) {
        const visited = new Set();
        let changed = false;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const key = `${x},${y}`;
                if (visited.has(key) || !coherent(x, y)) continue;
                const level = elevationRows[y][x];
                const region = [];
                const queue = [[x, y]];
                visited.add(key);
                const borderLevels = new Map();
                while (queue.length > 0) {
                    const [cx, cy] = queue.pop();
                    region.push([cx, cy]);
                    for (const [nx, ny] of [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]) {
                        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
                        if (!coherent(nx, ny)) continue;
                        const neighborLevel = elevationRows[ny][nx];
                        if (neighborLevel === level) {
                            const neighborKey = `${nx},${ny}`;
                            if (!visited.has(neighborKey)) {
                                visited.add(neighborKey);
                                queue.push([nx, ny]);
                            }
                        } else {
                            borderLevels.set(neighborLevel, (borderLevels.get(neighborLevel) || 0) + 1);
                        }
                    }
                }
                if (region.length >= minCluster || borderLevels.size === 0) continue;
                const dominant = [...borderLevels.entries()].sort((a, b) => b[1] - a[1])[0][0];
                for (const [rx, ry] of region) elevationRows[ry][rx] = dominant;
                changed = true;
            }
        }
        if (!changed) break;
    }
}

function isOpenGroundElevationSymbol(symbol) {
    return ['G', 'F', 'S', 'H', 'M', ','].includes(symbol);
}

function normalizeLooseSurfaceClusters(mutable, profile, minCluster = MIN_SURFACE_CLUSTER_CELLS) {
    const height = mutable.length;
    const width = mutable[0]?.length || 0;
    const looseSymbols = new Set(['P', 'E']);
    const replacement = profile.villageGroundSymbol || 'G';
    const visited = new Set();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const symbol = mutable[y]?.[x];
            const key = `${x},${y}`;
            if (!looseSymbols.has(symbol) || visited.has(key)) continue;

            const region = [];
            const queue = [[x, y]];
            visited.add(key);
            while (queue.length > 0) {
                const [cx, cy] = queue.pop();
                region.push([cx, cy]);
                for (const [nx, ny] of [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]) {
                    const neighborKey = `${nx},${ny}`;
                    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
                    if (visited.has(neighborKey) || mutable[ny]?.[nx] !== symbol) continue;
                    visited.add(neighborKey);
                    queue.push([nx, ny]);
                }
            }

            if (region.length >= minCluster) continue;
            for (const [rx, ry] of region) mutable[ry][rx] = replacement;
        }
    }
}

function infillTownOpenSpaces(mutable, elevationRows, profile, seed) {
    const height = mutable.length;
    const width = mutable[0]?.length || 0;
    const visited = new Set();

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const key = `${x},${y}`;
            if (visited.has(key) || !isOpenSpaceInfillSymbol(mutable[y]?.[x])) continue;

            const region = [];
            const queue = [[x, y]];
            visited.add(key);
            while (queue.length > 0) {
                const [cx, cy] = queue.pop();
                region.push([cx, cy]);
                for (const [nx, ny] of [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]) {
                    const neighborKey = `${nx},${ny}`;
                    if (nx <= 0 || ny <= 0 || nx >= width - 1 || ny >= height - 1) continue;
                    if (visited.has(neighborKey) || !isOpenSpaceInfillSymbol(mutable[ny]?.[nx])) continue;
                    visited.add(neighborKey);
                    queue.push([nx, ny]);
                }
            }

            if (region.length < MIN_OPEN_SPACE_INFILL_CELLS) continue;
            stampOpenSpaceInfillRegion(mutable, elevationRows, region, profile, seed);
        }
    }
}

function stampOpenSpaceInfillRegion(mutable, elevationRows, region, profile, seed) {
    const seedValue = Number.isFinite(Number(seed)) ? Number(seed) : hashString(seed);
    const regionSet = new Set(region.map(([x, y]) => `${x},${y}`));
    const stride = profile.cityLike ? 4 : 5;
    const coverageMod = profile.cityLike ? 3 : 4;
    const kit = profile.cityLike
        ? [';', ',', profile.villageGroundSymbol || 'G']
        : [profile.farmSymbol || ',', ',', 'F', profile.villageGroundSymbol || 'G'];
    const sorted = [...region].sort((a, b) =>
        hashString(`${seedValue}:${a[0]}:${a[1]}`) - hashString(`${seedValue}:${b[0]}:${b[1]}`)
    );
    const maxClusters = Math.max(1, Math.floor(region.length / (profile.cityLike ? 22 : 28)));
    let clusters = 0;

    for (const [x, y] of sorted) {
        if (clusters >= maxClusters) break;
        if (((x + y + seedValue) % stride) !== 0) continue;
        if ((hashString(`${seedValue}:open:${x}:${y}`) % coverageMod) !== 0) continue;
        if (countNeighbors(mutable, x, y, (symbol) => isRoadSymbol(symbol) || isWallSymbol(symbol)) > 1) continue;

        const symbol = kit[hashString(`${seedValue}:kit:${x}:${y}`) % kit.length];
        const cluster = getInfillClusterCells(x, y, hashString(`${seedValue}:shape:${x}:${y}`));
        if (!cluster.every(([cx, cy]) => regionSet.has(`${cx},${cy}`))) continue;
        const clusterElevation = mostCommonElevation(cluster, elevationRows);
        for (const [cx, cy] of cluster) {
            mutable[cy][cx] = symbol;
            if (elevationRows[cy]?.[cx] !== undefined) elevationRows[cy][cx] = clusterElevation;
        }
        clusters++;
    }
}

function getInfillClusterCells(x, y, salt) {
    const horizontal = salt % 2 === 0;
    const cells = [[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]];
    if (horizontal) {
        cells.push([x - 1, y], [x - 1, y + 1]);
    } else {
        cells.push([x, y - 1], [x + 1, y - 1]);
    }
    return cells;
}

function mostCommonElevation(cells, elevationRows) {
    const counts = new Map();
    for (const [x, y] of cells) {
        const elevation = Math.max(0, Math.floor(Number(elevationRows[y]?.[x]) || 0));
        counts.set(elevation, (counts.get(elevation) || 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 0;
}

function isOpenSpaceInfillSymbol(symbol) {
    return ['G', 'F', 'S', 'H', 'M', ','].includes(symbol);
}

function applyMatrixCityWallWorks(mutable, elevationRows, matrix, bandGrid = null) {
    const cityWall = matrix.city_wall;
    if (!cityWall || !Array.isArray(cityWall.wall) || !Array.isArray(cityWall.walkway)) return;

    const walkwaySet = coordinateSet(cityWall.walkway);
    const gateSet = coordinateSet(cityWall.gates || []);
    const wallHeight = clamp(Math.floor(cityWall.height_voxels || 3), 2, 3);
    const bandAt = (col, row) => Math.max(0, Math.floor(bandGrid?.[row]?.[col] || 0));

    for (const [x, y] of cityWall.wall) {
        const normal = findCityWallInteriorDirection(x, y, walkwaySet);
        if (!normal) continue;
        paintThickCityWallSegment(mutable, elevationRows, x, y, normal, wallHeight, bandAt);
    }

    for (const [x, y] of cityWall.walkway) {
        if (!isInside(x, y, mutable[0]?.length || 0, mutable.length)) continue;
        mutable[y][x] = '9';
        elevationRows[y][x] = clamp(bandAt(x, y) + wallHeight, 0, 6);
    }

    for (const [x, y] of cityWall.gates || []) {
        const normal = findCityWallInteriorDirection(x, y, walkwaySet) ||
            findNearestCityWallInteriorDirection(x, y, walkwaySet);
        if (!normal) continue;
        carveCityWallGate(mutable, elevationRows, x, y, normal, wallHeight, bandAt);
        placeCityWallStairsNearGate(mutable, elevationRows, x, y, normal, wallHeight, gateSet, bandAt);
    }
}

function paintThickCityWallSegment(mutable, elevationRows, x, y, normal, wallHeight, bandAt = () => 0) {
    const symbols = ['T', '9', '9', 'T'];
    for (let layer = 0; layer < THICK_CITY_WALL_LAYERS; layer++) {
        const col = x + normal.x * layer;
        const row = y + normal.y * layer;
        if (!isInside(col, row, mutable[0]?.length || 0, mutable.length)) continue;
        if (['W', '~'].includes(mutable[row][col])) continue;
        mutable[row][col] = symbols[layer];
        elevationRows[row][col] = clamp(bandAt(col, row) + wallHeight, 0, 6);
    }
}

function carveCityWallGate(mutable, elevationRows, x, y, normal, wallHeight, bandAt = () => 0) {
    const symbols = ['D', '9', '9', 'D'];
    for (let layer = 0; layer < THICK_CITY_WALL_LAYERS; layer++) {
        const col = x + normal.x * layer;
        const row = y + normal.y * layer;
        if (!isInside(col, row, mutable[0]?.length || 0, mutable.length)) continue;
        mutable[row][col] = symbols[layer];
        elevationRows[row][col] = symbols[layer] === '9'
            ? clamp(bandAt(col, row) + wallHeight, 0, 6)
            : bandAt(col, row);
    }
}

function placeCityWallStairsNearGate(mutable, elevationRows, x, y, normal, wallHeight, gateSet, bandAt = () => 0) {
    const tangentOptions = normal.x !== 0
        ? [{ x: 0, y: 1 }, { x: 0, y: -1 }]
        : [{ x: 1, y: 0 }, { x: -1, y: 0 }];
    const runLength = 4;

    for (const tangent of tangentOptions) {
        const gateBand = bandAt(x, y);
        const walkCells = [];
        const supportCells = [];
        for (let step = 0; step < runLength; step++) {
            const walkCol = x + normal.x + tangent.x * (step + 1);
            const walkRow = y + normal.y + tangent.y * (step + 1);
            const supportCol = walkCol + normal.x;
            const supportRow = walkRow + normal.y;
            if (!isInside(walkCol, walkRow, mutable[0]?.length || 0, mutable.length)) continue;
            if (!isInside(supportCol, supportRow, mutable[0]?.length || 0, mutable.length)) continue;
            if (gateSet.has(`${walkCol},${walkRow}`) || gateSet.has(`${supportCol},${supportRow}`)) continue;
            if (!['9', 'R', '.', ':', ';', 'D'].includes(mutable[walkRow][walkCol])) continue;
            if (!['9', 'R', '.', ':', ';', 'T'].includes(mutable[supportRow][supportCol])) continue;
            const height = clamp(gateBand + Math.ceil(((step + 1) / runLength) * wallHeight), 1, 6);
            walkCells.push({ col: walkCol, row: walkRow, height });
            supportCells.push({ col: supportCol, row: supportRow, height: clamp(gateBand + wallHeight, 1, 6) });
        }
        if (walkCells.length < runLength || supportCells.length < runLength) continue;
        const stairSymbol = getWallStairSymbolForDirection(tangent);
        for (const cell of supportCells) {
            mutable[cell.row][cell.col] = 'T';
            elevationRows[cell.row][cell.col] = cell.height;
        }
        for (const cell of walkCells) {
            mutable[cell.row][cell.col] = stairSymbol;
            elevationRows[cell.row][cell.col] = cell.height;
        }
        return;
    }
}

function findCityWallInteriorDirection(x, y, walkwaySet) {
    return [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ].find((direction) => walkwaySet.has(`${x + direction.x},${y + direction.y}`)) || null;
}

function findNearestCityWallInteriorDirection(x, y, walkwaySet) {
    let best = null;
    for (const key of walkwaySet) {
        const [wx, wy] = key.split(',').map(Number);
        const dx = wx - x;
        const dy = wy - y;
        const distance = Math.abs(dx) + Math.abs(dy);
        if (distance < 1 || distance > THICK_CITY_WALL_LAYERS) continue;
        const direction = Math.abs(dx) >= Math.abs(dy)
            ? { x: Math.sign(dx), y: 0 }
            : { x: 0, y: Math.sign(dy) };
        if (!best || distance < best.distance) best = { distance, direction };
    }
    return best?.direction || null;
}

function coordinateSet(cells = []) {
    return new Set((cells || [])
        .filter((cell) => Array.isArray(cell) && cell.length >= 2)
        .map(([x, y]) => `${Math.round(x)},${Math.round(y)}`));
}

function getWallStairSymbolForDirection(direction) {
    if (direction.y < 0) return '!';
    if (direction.y > 0) return '@';
    if (direction.x < 0) return '#';
    return '$';
}

function ensureHorizontalMainRoad(mutable, profile) {
    let best = { y: Math.floor(mutable.length / 2), score: -1 };
    for (let y = 0; y < mutable.length; y++) {
        const score = mutable[y].reduce((sum, symbol) => sum + (symbol === profile.mainRoadSymbol ? 3 : isRoadSymbol(symbol) ? 1 : 0), 0);
        if (score > best.score) best = { y, score };
    }
    if (best.score < 3) return;

    for (let x = 1; x < mutable[best.y].length - 1; x++) {
        const symbol = mutable[best.y][x];
        if (['W', '~', 'T', 'A', 'C', 'N', 'O', 'J', 'K', 'Q', 'V', 'Y', 'Z', 'E'].includes(symbol)) continue;
        mutable[best.y][x] = profile.mainRoadSymbol;
    }
}

function terrainTileToSymbol(tile, profile) {
    switch (tile.type) {
        case 'WATER_DEEP':
            return 'W';
        case 'WATER_SHALLOW':
            return profile.shallowWaterSymbol;
        case 'SAND':
        case 'MUD':
        case 'DIRT':
            return profile.villageGroundSymbol;
        case 'ROAD_DIRT':
            return profile.roadSymbol;
        case 'ROAD_MAIN':
            return profile.mainRoadSymbol;
        case 'DOCK':
            return profile.dockSymbol;
        case 'FARM':
            return profile.farmSymbol;
        case 'BUILDING_FLOOR':
            return 'E';
        case 'WALL':
            return profile.wallSymbol;
        case 'GRASS':
        default:
            return elevationToGroundSymbol(tile.elevation);
    }
}

function terrainTileToElevation(tile) {
    if (tile.type === 'WATER_DEEP' || tile.type === 'WATER_SHALLOW') return 0;
    const value = Number(tile.elevation);
    if (!Number.isFinite(value)) return 0;
    if (value >= 0.78) return 2;
    if (value >= 0.58) return 1;
    return 0;
}

function elevationToGroundSymbol(elevation) {
    const value = Number(elevation);
    if (!Number.isFinite(value)) return 'G';
    if (value >= 0.78) return 'M';
    if (value >= 0.58) return 'H';
    return 'G';
}

function overlayCells(rows, cells = [], symbol, width = 1) {
    const mutable = rows.map((row) => row.split(''));
    for (const cell of cells || []) {
        stampCell(mutable, cell.x, cell.y, symbol, width);
    }
    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function overlayRoads(rows, streets = [], profile) {
    const mutable = rows.map((row) => row.split(''));
    for (const street of streets || []) {
        const width = getRoadWidth(street);
        const symbol = getRoadSymbol(street, profile);
        stampCell(mutable, street.x, street.y, symbol, width);
    }
    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function getRoadSymbol(street, profile) {
    if (street.type === 'DOCK') return profile.dockSymbol;
    if (street.type === 'ROAD_MAIN' || street.kind === 'main') return profile.mainRoadSymbol;
    return profile.roadSymbol;
}

function getRoadWidth(street) {
    if (street.type === 'ROAD_MAIN' || street.kind === 'main') return MAIN_ROAD_WIDTH;
    if (street.type === 'DOCK') return DOCK_ROAD_WIDTH;
    return NARROW_ROAD_WIDTH;
}

function stampCell(grid, centerX, centerY, value, width = 1) {
    const before = Math.max(0, Math.floor((width - 1) / 2));
    const after = Math.max(0, Math.ceil((width - 1) / 2));
    for (let y = centerY - before; y <= centerY + after; y++) {
        for (let x = centerX - before; x <= centerX + after; x++) {
            if (grid[y]?.[x] === undefined) continue;
            grid[y][x] = value;
        }
    }
}

function enrichGroundVariants(rows, profile) {
    const mutable = rows.map((row) => row.split(''));
    for (let y = 1; y < mutable.length - 1; y++) {
        for (let x = 1; x < mutable[y].length - 1; x++) {
            if (!['G', 'S', 'F'].includes(mutable[y][x])) continue;
            const roadNeighbors = countNeighbors(mutable, x, y, (symbol) => isRoadSymbol(symbol));
            if (roadNeighbors >= 2) mutable[y][x] = profile.villageGroundSymbol;
            else if (profile.cityLike && roadNeighbors >= 1) mutable[y][x] = profile.villageGroundSymbol;
            else if (mutable[y][x] === 'F') mutable[y][x] = profile.farmSymbol;
        }
    }
    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function overlayCityWalls(rows, walls = [], profile) {
    const mutable = rows.map((row) => row.split(''));
    const wallCells = (walls || []).filter((cell) => isInside(cell.x, cell.y, mutable[0]?.length || 0, mutable.length));
    for (const cell of wallCells) {
        stampCell(mutable, cell.x, cell.y, profile.wallSymbol, WALL_WIDTH);
    }

    let stairIndex = 0;
    for (let index = 0; index < wallCells.length; index += 9) {
        const cell = wallCells[index];
        const stair = chooseWallStair(mutable, cell.x, cell.y, stairIndex++);
        if (!stair) continue;
        mutable[cell.y][cell.x] = stair.symbol;
    }

    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function chooseWallStair(mutable, x, y, salt = 0) {
    const candidates = [
        { dx: 0, dy: -1, symbol: '!', rotation: 0 },
        { dx: 0, dy: 1, symbol: '@', rotation: Math.PI },
        { dx: -1, dy: 0, symbol: '#', rotation: Math.PI / 2 },
        { dx: 1, dy: 0, symbol: '$', rotation: -Math.PI / 2 }
    ];
    const ordered = candidates.slice(salt % candidates.length).concat(candidates.slice(0, salt % candidates.length));
    return ordered.find((candidate) => isWallApproachSymbol(mutable[y + candidate.dy]?.[x + candidate.dx])) ||
        ordered.find((candidate) => mutable[y + candidate.dy]?.[x + candidate.dx] !== undefined) ||
        null;
}

// Road-shoulder decoration pass (context.md PLAN 2 §H.4, implemented): deterministic, seeded
// lamp/sign/barrel/crate/plant props along road shoulders, blocked around building footprints.
// Terrain-level infill (§H.1 ground variety clusters) lives in infillTownOpenSpaces() above.
//
// NEXT PHASE (§H.2–3, scaffolded below — planNegativeSpaceInfill and friends): themed PROP regions
// on the remaining open ground (market stalls, yard gardens, green trees/wells) with a flood-fill
// corridor guarantee. Wire-up when implemented:
//   const props = planNegativeSpaceInfill(rows, buildings, profile, seed);
//   return [...props, ...roadDecorations].slice(0, 340);   // runtime caps at 360
function createRoadDecorations(rows, buildings, profile, seed) {
    return [];
}

// ---------------------------------------------------------------------------------------------
// SCAFFOLD — Negative-space PROP infill (context.md PLAN 2 §H.2–3). Plan-only stubs; bodies are
// intentionally unimplemented. Call graph when built:
//
//   planNegativeSpaceInfill(rows, buildings, profile, seed)      → decoration records
//     ├─ classifyInfillRegion(mutable, regionCells, buildingCells)
//     ├─ fillInfillRegion(regionCells, regionType, mutable, seedValue, offsetX, offsetY)
//     │    └─ regionStaysConnected(freeCellKeys, anchorKeys)
//     └─ (output merges with createRoadDecorations() above, cap 340)
//
// Output schema matches existing decorations: { type, x, y, offsetX?, offsetY?, rotation? } in
// world-centered grid coords, rendered by client/src/systems/WorldGenerator.createWorldDecoration().
// New prop types tree/well/stall/woodpile/boulder/cart/garden have mesh-builder stubs there —
// implement both sides together, or emit only existing types (crate/barrel/sign/plant/shrub/lamp).
// Determinism contract: every random choice must come from hashString(`${seedValue}:...`), same as
// infillTownOpenSpaces(), so a re-import of the same package furnishes identically.
// ---------------------------------------------------------------------------------------------

// Region finder + orchestrator. Flood-fill 4-connected open-ground cells (isOpenSpaceInfillSymbol),
// EXCLUDING building footprint cells and the 2-cell approach in front of every building door.
// Regions < 12 cells stay empty (breathing room). Per kept region: classify → fill → collect.
function planNegativeSpaceInfill(rows, buildings, profile, seed) {
    // TODO(§H.2): reuse the flood-fill pattern from infillTownOpenSpaces(); build buildingCells via
    // getImportBuildingFootprint() world keys and doorApproaches via getDoorEdge()/getEdgeDirection().
    return [];
}

// Classify a region by what it touches (§H.2):
//   'crop'    — > 40% of region cells are farm ','
//   'market'  — ≥ 4 edge contacts with plaza 'P' or profile.mainRoadSymbol
//   'staging' — ≥ 6 contacts with city wall 'T'/'9' and wall contact > building contact
//   'yard'    — ≥ 4 edge contacts with building footprints or 'E'
//   'green'   — fallback (trees, well, shrubs, boulders)
function classifyInfillRegion(mutable, regionCells, buildingCells) {
    // TODO(§H.2): count 4-neighbor contacts per the table; return the region type string.
    return 'green';
}

// Budgeted prop placement (§H.3). Kits and budgets (fraction of region cells, hard cap per region):
//   market:  ['stall','crate','barrel','cart','sign']  0.28 / 26
//   crop:    ['plant','plant','shrub']                 0.20 / 24
//   staging: ['crate','barrel','cart','woodpile']      0.22 / 20
//   yard:    ['garden','woodpile','barrel','shrub']    0.22 / 18
//   green:   ['tree','shrub','boulder','plant','well'] 0.16 / 16 ('well' max once per region)
// Placement rules: never on anchor cells (region cells adjacent to a road or door approach — those
// are the corridor mouths), never orthogonally adjacent to an already placed prop, and every
// placement must keep regionStaysConnected() true or be reverted. That is the "filling WITH spaces"
// contract — props plus guaranteed walkable negative space, not clutter.
function fillInfillRegion(regionCells, regionType, mutable, seedValue, offsetX, offsetY) {
    // TODO(§H.3): deterministic order via hashString sort; emit { type, x, y, offsetX, offsetY,
    // rotation } with jitter in [-0.18, 0.18] and rotation for stall/cart/sign.
    return [];
}

// Corridor guarantee (§H.3): multi-source BFS over remaining free region cells starting from every
// free anchor; false when any free cell is unreachable (caller reverts the placement). Mirrors
// FurniturePlanner.validateRoomWalkability(), which does the same for room interiors.
function regionStaysConnected(freeCellKeys, anchorKeys) {
    // TODO(§H.3): BFS 4-connected; return visitedCount === freeCellKeys.size.
    return true;
}

function chooseDecorationType({ roadNeighbors, nearBuilding, profile, random }) {
    if (roadNeighbors >= 3 && random() < 0.5) return profile.cityLike ? 'lamp' : 'sign';
    if (nearBuilding && random() < 0.62) return random() < 0.55 ? 'barrel' : 'crate';
    if (random() < 0.35) return 'sign';
    return random() < 0.5 ? 'plant' : 'shrub';
}

function findDecorationSide(mutable, x, y) {
    const candidates = [
        { x: 0, y: -1, rotation: 0 },
        { x: 0, y: 1, rotation: Math.PI },
        { x: -1, y: 0, rotation: Math.PI / 2 },
        { x: 1, y: 0, rotation: -Math.PI / 2 }
    ];
    return candidates.find((candidate) => isDecorationShoulderSymbol(mutable[y + candidate.y]?.[x + candidate.x])) || null;
}

function createBuildingBlockSet(buildings, offsetX, offsetY) {
    const blocked = new Set();
    for (const building of buildings) {
        for (let y = building.y - 1; y <= building.y + building.height; y++) {
            for (let x = building.x - 1; x <= building.x + building.width; x++) {
                blocked.add(`${x + offsetX},${y + offsetY}`);
            }
        }
    }
    return blocked;
}

function isNearBuilding(buildings, x, y) {
    return buildings.some((building) =>
        x >= building.x - 2 &&
        y >= building.y - 2 &&
        x <= building.x + building.width + 1 &&
        y <= building.y + building.height + 1
    );
}

function countNeighbors(mutable, x, y, predicate) {
    let count = 0;
    for (const offset of [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ]) {
        if (predicate(mutable[y + offset.y]?.[x + offset.x])) count++;
    }
    return count;
}

function isRoadSymbol(symbol) {
    return ['R', '.', ':', ';'].includes(symbol);
}

function isDoorApproachSymbol(symbol) {
    return ['R', '.', ':', ';', ',', 'G', 'F', 'S', 'H'].includes(symbol);
}

function isSoftCarvableApproach(symbol) {
    return ['G', 'F', 'S', 'H', ',', '.', ':'].includes(symbol);
}

function isWallSymbol(symbol) {
    return ['T', '9', '!', '@', '#', '$', 'A', 'C', 'N', 'O', 'J', 'K', 'Q', 'V', 'Y', 'Z'].includes(symbol);
}

function isDecorationShoulderSymbol(symbol) {
    return ['G', 'F', 'S', 'H', '.', ',', ':'].includes(symbol);
}

function isWallApproachSymbol(symbol) {
    return ['R', '.', ':', ';', 'G', 'S', ','].includes(symbol);
}

function createBuildingBlueprint(source, town, width, height, elevationRows, index, options = {}) {
    const rect = getSourceBuildingBounds(source, options);
    if (!rect || rect.width < 1 || rect.height < 1) return null;

    const scale = options.matrixMode ? 1 : LEGACY_BUILDING_SCALE;
    const sourceCenterX = rect.x + rect.width / 2;
    const sourceCenterY = rect.y + rect.height / 2;
    const scaledWidth = options.matrixMode ? rect.width : Math.max(4, Math.ceil(rect.width * scale));
    const scaledHeight = options.matrixMode ? rect.height : Math.max(4, Math.ceil(rect.height * scale));
    let scaledRect = options.matrixMode
        ? {
            x: clamp(Math.round(rect.x), 0, width - rect.width),
            y: clamp(Math.round(rect.y), 0, height - rect.height),
            width: rect.width,
            height: rect.height
        }
        : {
            x: clamp(Math.round(sourceCenterX - scaledWidth / 2), 1, width - scaledWidth - 1),
            y: clamp(Math.round(sourceCenterY - scaledHeight / 2), 1, height - scaledHeight - 1),
            width: Math.min(scaledWidth, width - 2),
            height: Math.min(scaledHeight, height - 2)
        };
    if (!isInside(scaledRect.x, scaledRect.y, width, height)) return null;
    scaledRect.width = Math.min(scaledRect.width, width - scaledRect.x);
    scaledRect.height = Math.min(scaledRect.height, height - scaledRect.y);
    if (scaledRect.width < 2 || scaledRect.height < 2) {
        scaledRect = repairSubMinimalFootprint(scaledRect, width, height);
    }
    if (scaledRect.width < 1 || scaledRect.height < 1) return null;

    const doorGrid = source.door?.grid || [rect.x + Math.floor(rect.width / 2), rect.y + rect.height - 1];
    const door = options.matrixMode
        ? getMatrixDoor(source, rect, scaledRect, doorGrid)
        : scaleDoor(rect, scaledRect, doorGrid);
    const style = ['WOOD', 'TIMBER_FRAME'].includes(source.wall_texture) ? 'timber' : 'stone';
    const architecture = createBuildingArchitecture(source, scaledRect, index);
    const floors = options.matrixMode
        ? compactMatrixFloors(source.floors || [], rect, scaledRect)
        : compactFloors(source.floors || [], rect, scaledRect);
    const stories = clamp(Math.floor(source.interior?.floor_count || floors.length || getBuildingStories(source.type)), 1, 3);
    const rawStairs = options.matrixMode
        ? getMatrixBuildingStairs(source, rect, scaledRect, door, style, stories)
        : getBuildingStairs(source, scaledRect, door, style, stories);
    const baseElevation = getBuildingBaseElevation(elevationRows, scaledRect, door);
    const footprintCells = options.matrixMode ? getMatrixFootprintCells(source, rect, scaledRect, { door }) : null;
    const stairs = normalizeBuildingStairs(rawStairs, scaledRect, door, style, stories, footprintCells);

    const id = `${slugify(town.name)}-${source.id || `building-${index}`}`;
    return {
        id,
        obstructionTag: `building:${slugify(town.id || town.name)}:${slugify(id)}`,
        name: `${titleCase(source.type)} ${index + 1}`,
        sourceType: source.type,
        priority: getBuildingPriority(source.type),
        x: scaledRect.x - Math.floor(width / 2),
        y: scaledRect.y - Math.floor(height / 2),
        width: scaledRect.width,
        height: scaledRect.height,
        stories,
        baseElevation,
        style,
        architectureStyle: architecture.style,
        facadeVariant: architecture.facadeVariant,
        doorStyle: getDoorStyle(source.type, index),
        door,
        stairs,
        stairCells: flattenStairCells(stairs),
        footprintCells,
        matrix: null,
        interior: {
            floorCount: stories,
            floorHeightVoxels: source.interior?.floor_height_voxels || 4,
            wallHeightVoxels: source.interior?.wall_height_voxels || 3,
            hasStairs: Boolean(source.interior?.has_stairs || stairs.length)
        },
        floors,
        roofStyle: source.roof_style || architecture.roofStyle,
        sourceColors: {
            wall: source.color,
            roof: source.roof_color
        }
    };
}

function createBuildingArchitecture(source, scaledRect, index = 0) {
    const type = String(source.type || '').toLowerCase();
    const seed = hashString(`${source.id || ''}:${type}:${scaledRect.width}x${scaledRect.height}:${index}`);
    const large = scaledRect.width >= 9 && scaledRect.height >= 9;
    const tall = Number(source.interior?.floor_count || 0) >= 3 || type.includes('tower') || type.includes('keep');
    const civic = ['hall', 'temple', 'market', 'guild', 'palace', 'castle'].some((token) => type.includes(token));
    const styles = tall
        ? ['tower', 'gatehouse', 'stepped']
        : civic
            ? ['courtyard', 'gabled', 'arcade', 'market']
            : large
                ? ['courtyard', 'crosswing', 'stepped', 'gabled']
                : ['gabled', 'bayfront', 'lean-to', 'stepped'];
    const roofStyles = {
        tower: ['slate', 'copper', 'tower'],
        gatehouse: ['slate', 'stone'],
        stepped: ['clay', 'slate'],
        courtyard: ['clay', 'courtyard'],
        crosswing: ['slate', 'gabled'],
        gabled: ['gabled', 'clay'],
        arcade: ['stone', 'slate'],
        market: ['market', 'thatch'],
        bayfront: ['clay', 'gabled'],
        'lean-to': ['thatch', 'timber']
    };
    const style = styles[seed % styles.length];
    const roofs = roofStyles[style] || ['timber'];
    return {
        style,
        facadeVariant: seed % 17,
        roofStyle: roofs[Math.floor(seed / 17) % roofs.length]
    };
}

function refreshBuildingMatrices(buildings = []) {
    for (const building of buildings) {
        building.matrix = createBuildingStructuralMatrix(building);
    }
}

function createBuildingStructuralMatrix(building) {
    const footprint = getImportBuildingFootprint(building);
    const baseElevation = Math.max(0, Math.floor(building.baseElevation || 0));
    const stories = Math.max(1, Math.floor(building.stories || 1));
    const floorHeight = BUILDING_FLOOR_HEIGHT;
    const floorRefs = createBuildingLevelReferences(baseElevation, stories, { floorHeight });
    const roofRef = createRoofLevelReference(baseElevation, stories, { floorHeight });
    const roofLevel = roofRef.z;
    const stairCells = new Map((building.stairCells || []).map((cell) => [`${cell.x},${cell.y}`, cell]));
    const cells = footprint.cells
        .map((cell) => {
            const key = `${cell.x},${cell.y}`;
            const edge = getFootprintCellEdge(footprint.set, building, cell.x, cell.y);
            const stair = stairCells.get(key);
            const isDoor = building.door?.x === cell.x && building.door?.y === cell.y;
            const role = isDoor
                ? 'door'
                : stair
                    ? `stair-${stair.role}`
                    : edge
                        ? 'shell'
                        : 'interior';
            const stairLevel = Math.max(0, Math.floor(stair?.level || 0));
            const stairBaseZ = baseElevation + stairLevel * floorHeight;
            const stairDestinationZ = Math.min(roofLevel, baseElevation + (stairLevel + 1) * floorHeight);
            const stairSurfaceZ = stair
                ? stairBaseZ + Math.max(0, Math.floor(stair.height || 0))
                : null;
            return {
                x: cell.x,
                y: cell.y,
                role,
                edge,
                ground: {
                    z: baseElevation,
                    levelIndex: 0,
                    part: BUILDING_PARTS.GROUND_FLOOR
                },
                floors: floorRefs.map((level) => ({
                    index: level.index,
                    z: level.z,
                    part: level.part
                })),
                roof: {
                    index: roofRef.index,
                    z: roofRef.z,
                    part: roofRef.part
                },
                stair: stair ? {
                    role: stair.role,
                    level: stairLevel,
                    baseZ: stairBaseZ,
                    baseLevelTag: floorRefs[stairLevel]?.tag || 'ground-floor',
                    anchorZ: stairBaseZ,
                    placementZ: stairSurfaceZ,
                    surfaceZ: stairSurfaceZ,
                    surfaceLevelTag: getStairSurfaceLevelTag(stair, stairSurfaceZ, stairBaseZ, stairDestinationZ, floorRefs),
                    destinationZ: stairDestinationZ,
                    destinationLevelTag: floorRefs[stairLevel + 1]?.tag || roofRef.tag,
                    partTag: getStairMatrixPartTag(stair.role),
                    placementTag: ['lower-stair', 'upper-stair'].includes(stair.role)
                        ? BUILDING_PLACEMENT_TAGS.STAIR_SURFACE
                        : BUILDING_PLACEMENT_TAGS.NONE,
                    direction: stair.direction || 'east',
                    sector: stair.sector || null,
                    module: Math.max(0, Math.floor(stair.module || 0))
                } : null
            };
        })
        .sort((a, b) => (a.y - b.y) || (a.x - b.x));

    return {
        schema: 'vibe-game-building-structure-v3',
        width: building.width,
        height: building.height,
        baseElevation,
        groundFloorZ: baseElevation,
        floorHeight,
        roofLevel,
        stories,
        vertical: {
            groundFloorZ: baseElevation,
            baseElevation,
            floorHeight,
            levelTags: floorRefs.map((level) => ({
                index: level.index,
                tag: level.tag,
                kind: level.kind,
                z: level.z,
                part: level.part
            })),
            roof: roofRef,
            supportsBasements: true,
            supportsDungeons: true
        },
        levels: floorRefs,
        cells
    };
}

function getStairSurfaceLevelTag(stair, surfaceZ, baseZ, destinationZ, floorRefs) {
    if (stair.role === 'upper-stair') {
        return floorRefs.find((level) => level.z === destinationZ)?.tag || 'floor-2';
    }
    if (stair.role === 'lower-stair') {
        return floorRefs.find((level) => level.z === baseZ)?.tag || 'ground-floor';
    }
    return floorRefs.find((level) => level.z === surfaceZ)?.tag ||
        floorRefs.find((level) => level.z === baseZ)?.tag ||
        'ground-floor';
}

function getStairMatrixPartTag(role) {
    if (role === 'upper-stair') return BUILDING_PART_TAGS.STAIR_UPPER;
    if (role === 'support') return BUILDING_PART_TAGS.STAIR_SUPPORT;
    if (role === 'air' || role === 'pass-through-air') return BUILDING_PART_TAGS.STAIR_AIR_SHAFT;
    return BUILDING_PART_TAGS.STAIR_LOWER;
}

function getFootprintCellEdge(footprintSet, building, localX, localY) {
    if (building?.door?.x === localX && building?.door?.y === localY && building.door.edge) return building.door.edge;
    for (const [edge, key] of [
        ['north', `${localX},${localY - 1}`],
        ['east', `${localX + 1},${localY}`],
        ['south', `${localX},${localY + 1}`],
        ['west', `${localX - 1},${localY}`]
    ]) {
        if (!footprintSet.has(key)) return edge;
    }
    return null;
}

function alignBuildingEntrances(rows, buildings, profile) {
    const mutable = rows.map((row) => row.split(''));
    const height = mutable.length;
    const width = mutable[0]?.length || 0;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);

    for (const building of buildings) {
        const door = findBestBuildingDoor(building, buildings, mutable, offsetX, offsetY, profile);
        if (!door) continue;
        building.door = door;
        ensureDoorEntryFootprint(building);
        const rawStairs = createStairFlightsForBuilding(
            building.width,
            building.height,
            building.door,
            building.style,
            building.stories
        );
        building.stairs = normalizeBuildingStairs(
            rawStairs,
            building,
            building.door,
            building.style,
            building.stories,
            building.footprintCells
        );
        building.stairCells = flattenStairCells(building.stairs);
        const edge = getDoorEdge(building.width, building.height, door);
        const direction = getEdgeDirection(edge);
        const row = building.y + door.y + direction.y + offsetY;
        const col = building.x + door.x + direction.x + offsetX;
        if (mutable[row]?.[col] !== undefined && !isDoorApproachSymbol(mutable[row][col])) {
            mutable[row][col] = profile.roadSymbol;
        }
    }

    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function alignMatrixBuildingEntrances(rows, buildings, profile) {
    const mutable = rows.map((row) => row.split(''));
    const width = mutable[0]?.length || 0;
    const height = mutable.length;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (const building of buildings) {
        const door = findBestMatrixDoor(building, buildings, mutable, offsetX, offsetY, profile);
        if (door) building.door = door;
        ensureDoorEntryFootprint(building);
        const rawStairs = createStairFlightsForBuilding(
            building.width,
            building.height,
            building.door,
            building.style,
            building.stories
        );
        building.stairs = normalizeBuildingStairs(
            rawStairs,
            building,
            building.door,
            building.style,
            building.stories,
            building.footprintCells
        );
        building.stairCells = flattenStairCells(building.stairs);
    }
}

function findBestMatrixDoor(building, buildings, mutable, offsetX, offsetY, profile) {
    const footprint = getImportBuildingFootprint(building);
    const candidates = [];
    for (const cell of footprint.cells) {
        for (const edge of ['north', 'east', 'south', 'west']) {
            const direction = getEdgeDirection(edge);
            const localOutsideX = cell.x + direction.x;
            const localOutsideY = cell.y + direction.y;
            if (footprint.set.has(`${localOutsideX},${localOutsideY}`)) continue;
            candidates.push({ x: cell.x, y: cell.y, edge });
        }
    }

    let best = null;
    for (const candidate of candidates) {
        const direction = getEdgeDirection(candidate.edge);
        if (!isUsableDoorCandidate(building, buildings, footprint, candidate, mutable, offsetX, offsetY, profile)) continue;
        const worldDoorX = building.x + candidate.x;
        const worldDoorY = building.y + candidate.y;
        const worldOutsideX = worldDoorX + direction.x;
        const worldOutsideY = worldDoorY + direction.y;
        const outsideRow = worldOutsideY + offsetY;
        const outsideCol = worldOutsideX + offsetX;
        const outsideSymbol = mutable[outsideRow]?.[outsideCol];
        if (outsideSymbol === undefined) continue;
        if (isInsideOtherBuildingFootprint(building, buildings, worldOutsideX, worldOutsideY)) continue;
        if (isWallSymbol(outsideSymbol)) continue;
        if (['W', '~'].includes(outsideSymbol)) continue;
        const originalDistance = building.door
            ? Math.abs(candidate.x - building.door.x) + Math.abs(candidate.y - building.door.y)
            : 0;
        const interior = getDoorInteriorCell(candidate);
        const interiorDepth = countInteriorDoorDepth(footprint.set, interior.x, interior.y, direction);
        const cornerPenalty = isFootprintDoorCorner(footprint.set, candidate.x, candidate.y) ? 900 : 0;
        const approachScore = isRoadSymbol(outsideSymbol) ? 180 : isSoftCarvableApproach(outsideSymbol) ? 90 : 0;
        const roadScore = countNeighbors(mutable, outsideCol, outsideRow, (symbol) => isRoadSymbol(symbol)) * 30;
        const centerDistance = Math.abs(candidate.x - (building.width - 1) / 2) +
            Math.abs(candidate.y - (building.height - 1) / 2);
        const score = approachScore + roadScore + interiorDepth * 45 - originalDistance * 3 - centerDistance - cornerPenalty;
        if (!best || score > best.score) best = { ...candidate, score };
    }

    if (best) return { x: best.x, y: best.y, edge: best.edge };
    return building.door;
}

function ensureMatrixDoorApproaches(rows, elevationRows, buildings, profile) {
    const mutable = rows.map((row) => row.split(''));
    const width = mutable[0]?.length || 0;
    const height = mutable.length;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (const building of buildings) {
        if (!building.door) continue;
        const edge = getDoorEdge(building.width, building.height, building.door);
        const direction = getEdgeDirection(edge);
        const row = building.y + building.door.y + direction.y + offsetY;
        const col = building.x + building.door.x + direction.x + offsetX;
        if (mutable[row]?.[col] === undefined) continue;
        if (['W', '~', 'T', '9', 'A', 'C', 'N', 'O', 'J', 'K', 'Q', 'V', 'Y', 'Z'].includes(mutable[row][col])) continue;
        mutable[row][col] = isRoadSymbol(mutable[row][col]) ? mutable[row][col] : profile.roadSymbol;
        if (elevationRows[row]?.[col] !== undefined) elevationRows[row][col] = building.baseElevation || 0;
    }
    ensureHorizontalRoadPriority(mutable, elevationRows, profile);
    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function ensureHorizontalRoadPriority(mutable, elevationRows, profile) {
    const usedRows = new Set();
    let balance = countRoadOrientation(mutable);
    for (let attempt = 0; attempt < 5 && balance.horizontal < balance.vertical; attempt++) {
        const row = findHorizontalRoadRow(mutable, profile, usedRows);
        if (!Number.isInteger(row)) break;
        carveHorizontalRoadRow(mutable, elevationRows, row, profile);
        usedRows.add(row);
        balance = countRoadOrientation(mutable);
    }
}

function countRoadOrientation(mutable) {
    let horizontal = 0;
    let vertical = 0;
    for (let y = 0; y < mutable.length; y++) {
        for (let x = 0; x < (mutable[y]?.length || 0); x++) {
            if (!isRoadSymbol(mutable[y][x])) continue;
            if (isRoadSymbol(mutable[y][x - 1]) || isRoadSymbol(mutable[y][x + 1])) horizontal++;
            if (isRoadSymbol(mutable[y - 1]?.[x]) || isRoadSymbol(mutable[y + 1]?.[x])) vertical++;
        }
    }
    return { horizontal, vertical };
}

function findHorizontalRoadRow(mutable, profile, usedRows) {
    const centerY = (mutable.length - 1) / 2;
    let best = null;
    for (let y = 1; y < mutable.length - 1; y++) {
        if (usedRows.has(y) || usedRows.has(y - 1) || usedRows.has(y + 1)) continue;
        let roadScore = 0;
        let carveable = 0;
        let blocked = 0;
        let verticalContact = 0;
        for (const symbol of mutable[y] || []) {
            if (isRoadSymbol(symbol)) roadScore += symbol === profile.mainRoadSymbol ? 4 : 2;
            if (isHorizontalRoadCarvable(symbol)) carveable += 1;
            else blocked += 1;
        }
        for (let x = 0; x < (mutable[y]?.length || 0); x++) {
            if (!isHorizontalRoadCarvable(mutable[y][x])) continue;
            if (isRoadSymbol(mutable[y - 1]?.[x]) || isRoadSymbol(mutable[y + 1]?.[x])) verticalContact += 1;
        }
        const score = carveable * 1.4 + roadScore * 0.25 - verticalContact * 1.2 - blocked * 2 - Math.abs(y - centerY) * 0.08;
        if (!best || score > best.score) best = { y, score };
    }
    return best?.y;
}

function carveHorizontalRoadRow(mutable, elevationRows, row, profile) {
    for (let x = 1; x < (mutable[row]?.length || 1) - 1; x++) {
        if (!isHorizontalRoadCarvable(mutable[row][x])) continue;
        mutable[row][x] = profile.mainRoadSymbol;
        // Keep the terraced elevation: roads follow the terrain and step 1 tier at terrace
        // boundaries (walkable ramps) instead of punching flat z0 trenches through terraces.
    }
}

function isHorizontalRoadCarvable(symbol) {
    return isRoadSymbol(symbol) || ['G', 'F', 'S', 'H', 'M', ',', '.'].includes(symbol);
}

function findBestBuildingDoor(building, buildings, mutable, offsetX, offsetY, profile) {
    const candidates = [];
    for (let x = 1; x < building.width - 1; x++) {
        candidates.push({ x, y: 0, edge: 'north' });
        candidates.push({ x, y: building.height - 1, edge: 'south' });
    }
    for (let y = 1; y < building.height - 1; y++) {
        candidates.push({ x: 0, y, edge: 'west' });
        candidates.push({ x: building.width - 1, y, edge: 'east' });
    }

    let best = null;
    for (const candidate of candidates) {
        const direction = getEdgeDirection(candidate.edge);
        const footprint = getImportBuildingFootprint(building);
        if (!isUsableDoorCandidate(building, buildings, footprint, candidate, mutable, offsetX, offsetY, profile)) continue;
        const worldDoorX = building.x + candidate.x;
        const worldDoorY = building.y + candidate.y;
        const worldOutsideX = worldDoorX + direction.x;
        const worldOutsideY = worldDoorY + direction.y;
        if (isInsideOtherBuildingFootprint(building, buildings, worldDoorX, worldDoorY)) continue;
        if (isInsideOtherBuildingFootprint(building, buildings, worldOutsideX, worldOutsideY)) continue;
        const outsideRow = building.y + candidate.y + direction.y + offsetY;
        const outsideCol = building.x + candidate.x + direction.x + offsetX;
        if (mutable[outsideRow]?.[outsideCol] === undefined) continue;
        const outsideSymbol = mutable[outsideRow][outsideCol];
        const originalDistance = building.door
            ? Math.abs(candidate.x - building.door.x) + Math.abs(candidate.y - building.door.y)
            : 0;
        const centerDistance = Math.abs(candidate.x - (building.width - 1) / 2) +
            Math.abs(candidate.y - (building.height - 1) / 2);
        const interior = getDoorInteriorCell(candidate);
        const interiorDepth = countInteriorDoorDepth(footprint.set, interior.x, interior.y, direction);
        const approachScore = isDoorApproachSymbol(outsideSymbol) ? 160 : isSoftCarvableApproach(outsideSymbol) ? 60 : -180;
        const roadScore = countNeighbors(mutable, outsideCol, outsideRow, (symbol) => isRoadSymbol(symbol)) * 24;
        const wallPenalty = countNeighbors(mutable, outsideCol, outsideRow, (symbol) => isWallSymbol(symbol)) * 32;
        const score = approachScore + roadScore + interiorDepth * 45 - wallPenalty - originalDistance * 1.5 - centerDistance;
        if (!best || score > best.score) best = { ...candidate, score };
    }

    if (best) return { x: best.x, y: best.y };
    const fallback = candidates.find((candidate) => {
        const footprint = getImportBuildingFootprint(building);
        return isUsableDoorCandidate(building, buildings, footprint, candidate, mutable, offsetX, offsetY, profile, { allowSoftOutside: true });
    });
    if (fallback) return { x: fallback.x, y: fallback.y, edge: fallback.edge };
    const centered = getCenteredDoor(building.width, building.height, profile.cityLike ? 'south' : 'north');
    return { ...centered, edge: getDoorEdge(building.width, building.height, centered) };
}

function isUsableDoorCandidate(building, buildings, footprint, candidate, mutable, offsetX, offsetY, profile, options = {}) {
    if (!candidate?.edge) return false;
    if (isFootprintDoorCorner(footprint.set, candidate.x, candidate.y)) return false;
    const direction = getEdgeDirection(candidate.edge);
    const interior = getDoorInteriorCell(candidate);
    if (!footprint.set.has(`${interior.x},${interior.y}`)) return false;
    if (isFootprintEdgeCell(footprint.set, interior.x, interior.y)) return false;
    if (countInteriorDoorDepth(footprint.set, interior.x, interior.y, direction) < 2) return false;

    const worldDoorX = building.x + candidate.x;
    const worldDoorY = building.y + candidate.y;
    const worldOutsideX = worldDoorX + direction.x;
    const worldOutsideY = worldDoorY + direction.y;
    if (isInsideOtherBuildingFootprint(building, buildings, worldDoorX, worldDoorY)) return false;
    if (isInsideOtherBuildingFootprint(building, buildings, worldOutsideX, worldOutsideY)) return false;

    const outsideRow = worldOutsideY + offsetY;
    const outsideCol = worldOutsideX + offsetX;
    const outsideSymbol = mutable[outsideRow]?.[outsideCol];
    if (outsideSymbol === undefined) return false;
    if (['W', '~'].includes(outsideSymbol)) return false;
    if (isWallSymbol(outsideSymbol)) return false;
    if (isDoorApproachSymbol(outsideSymbol) || isRoadSymbol(outsideSymbol)) return true;
    return options.allowSoftOutside || isSoftCarvableApproach(outsideSymbol) || outsideSymbol === profile.roadSymbol;
}

function getDoorInteriorCell(candidate) {
    const direction = getEdgeDirection(candidate.edge);
    return {
        x: candidate.x - direction.x,
        y: candidate.y - direction.y
    };
}

function countInteriorDoorDepth(footprintSet, x, y, outsideDirection) {
    let depth = 0;
    for (let step = 0; step < 4; step++) {
        const col = x - outsideDirection.x * step;
        const row = y - outsideDirection.y * step;
        if (!footprintSet.has(`${col},${row}`)) break;
        if (isFootprintEdgeCell(footprintSet, col, row)) break;
        depth++;
    }
    return depth;
}

function isFootprintDoorCorner(footprintSet, x, y) {
    const exposed = [
        `${x},${y - 1}`,
        `${x + 1},${y}`,
        `${x},${y + 1}`,
        `${x - 1},${y}`
    ].filter((key) => !footprintSet.has(key)).length;
    return exposed > 1;
}

function ensureDoorEntryFootprint(building) {
    if (!building?.door) return;
    const initialFootprint = getImportBuildingFootprint(building);
    if (isFootprintDoorCorner(initialFootprint.set, building.door.x, building.door.y)) {
        const replacement = findInteriorSafeDoor(building, initialFootprint);
        if (replacement) building.door = replacement;
    }
    const edge = building.door.edge || getDoorEdge(building.width, building.height, building.door);
    const outward = getEdgeDirection(edge);
    const tangentOptions = outward.x !== 0
        ? [{ x: 0, y: 1 }, { x: 0, y: -1 }]
        : [{ x: 1, y: 0 }, { x: -1, y: 0 }];
    const footprint = getImportBuildingFootprint(building);
    const cells = new Map(footprint.cells.map((cell) => [`${cell.x},${cell.y}`, cell]));
    const add = (x, y) => {
        if (x < 0 || y < 0 || x >= building.width || y >= building.height) return;
        cells.set(`${x},${y}`, { x, y });
    };

    add(building.door.x, building.door.y);
    for (let depth = 1; depth <= 3; depth++) {
        const x = building.door.x - outward.x * depth;
        const y = building.door.y - outward.y * depth;
        add(x, y);
        for (const tangent of tangentOptions) {
            add(x + tangent.x, y + tangent.y);
        }
    }
    for (const tangent of tangentOptions) {
        add(building.door.x + tangent.x, building.door.y + tangent.y);
    }

    building.footprintCells = [...cells.values()]
        .sort((a, b) => (a.y - b.y) || (a.x - b.x));
}

function findInteriorSafeDoor(building, footprint = getImportBuildingFootprint(building)) {
    let best = null;
    for (const cell of footprint.cells) {
        for (const edge of ['north', 'east', 'south', 'west']) {
            const outward = getEdgeDirection(edge);
            if (footprint.set.has(`${cell.x + outward.x},${cell.y + outward.y}`)) continue;
            if (isFootprintDoorCorner(footprint.set, cell.x, cell.y)) continue;
            const interior = { x: cell.x - outward.x, y: cell.y - outward.y };
            if (!footprint.set.has(`${interior.x},${interior.y}`)) continue;
            if (isFootprintEdgeCell(footprint.set, interior.x, interior.y)) continue;
            const currentDistance = building.door
                ? Math.abs(cell.x - building.door.x) + Math.abs(cell.y - building.door.y)
                : 0;
            const centerDistance = Math.abs(cell.x - (building.width - 1) / 2) +
                Math.abs(cell.y - (building.height - 1) / 2);
            const score = currentDistance * 0.5 + centerDistance;
            if (!best || score < best.score) best = { x: cell.x, y: cell.y, edge, score };
        }
    }
    return best ? { x: best.x, y: best.y, edge: best.edge } : null;
}

function isInsideOtherBuildingFootprint(building, buildings, worldX, worldY) {
    return buildings.some((other) => other !== building && importBuildingContains(other, worldX, worldY));
}

function importBuildingContains(building, worldX, worldY) {
    const footprint = getImportBuildingFootprint(building);
    return footprint.set.has(`${worldX - building.x},${worldY - building.y}`);
}

function getImportBuildingFootprint(building) {
    const cells = Array.isArray(building.footprintCells) && building.footprintCells.length > 0
        ? building.footprintCells
            .map((cell) => ({ x: Math.floor(cell.x), y: Math.floor(cell.y) }))
            .filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < building.width && cell.y < building.height)
        : Array.from({ length: building.height }, (_, y) =>
            Array.from({ length: building.width }, (_, x) => ({ x, y }))
        ).flat();
    return {
        cells,
        set: new Set(cells.map((cell) => `${cell.x},${cell.y}`))
    };
}

function getEdgeDirection(edge) {
    return {
        north: { x: 0, y: -1 },
        south: { x: 0, y: 1 },
        west: { x: -1, y: 0 },
        east: { x: 1, y: 0 }
    }[edge] || { x: 0, y: 1 };
}

function selectTownBuildings(buildings, width, height) {
    const occupied = Array.from({ length: height }, () => Array.from({ length: width }, () => false));
    const sorted = [...buildings].sort((a, b) =>
        b.priority - a.priority ||
        (b.width * b.height) - (a.width * a.height) ||
        a.id.localeCompare(b.id)
    );
    const selected = [];
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);

    placeBuildingsWithPadding(sorted, selected, occupied, offsetX, offsetY, 1);
    placeBuildingsWithPadding(sorted, selected, occupied, offsetX, offsetY, 0);
    if (selected.length === 0 && sorted.length > 0) selected.push(sorted[0]);
    attachCompatibleBuildingLots(selected, width, height);

    return selected;
}

function attachCompatibleBuildingLots(buildings, width, height) {
    const sorted = [...buildings].sort((a, b) => a.priority - b.priority);
    for (const building of sorted) {
        if (building.width < 5 || building.height < 5) continue;
        const target = findAttachmentTarget(building, buildings);
        if (!target) continue;
        const moved = getAttachedRect(building, target);
        if (!moved) continue;
        if (moved.x < -Math.floor(width / 2) + 1 || moved.y < -Math.floor(height / 2) + 1) continue;
        if (moved.x + building.width > Math.floor(width / 2) - 1) continue;
        if (moved.y + building.height > Math.floor(height / 2) - 1) continue;
        if (!canMoveToSharedWallRect(building, moved, buildings)) continue;
        building.x = moved.x;
        building.y = moved.y;
        building.attachedTo = target.id;
    }
}

function findAttachmentTarget(building, buildings) {
    let best = null;
    for (const target of buildings) {
        if (target === building) continue;
        if (!canSharePartyWall(building, target)) continue;
        const gapX = getAxisGap(building.x, building.x + building.width - 1, target.x, target.x + target.width - 1);
        const gapY = getAxisGap(building.y, building.y + building.height - 1, target.y, target.y + target.height - 1);
        const overlapX = getAxisOverlap(building.x, building.x + building.width - 1, target.x, target.x + target.width - 1);
        const overlapY = getAxisOverlap(building.y, building.y + building.height - 1, target.y, target.y + target.height - 1);
        const canAttachX = gapX >= 1 && gapX <= 3 && overlapY >= Math.min(building.height, target.height) * 0.45;
        const canAttachY = gapY >= 1 && gapY <= 3 && overlapX >= Math.min(building.width, target.width) * 0.45;
        if (!canAttachX && !canAttachY) continue;
        const score = Math.min(gapX || Infinity, gapY || Infinity) + Math.abs((building.width * building.height) - (target.width * target.height)) * 0.02;
        if (!best || score < best.score) best = { target, score };
    }
    return best?.target || null;
}

function getAttachedRect(building, target) {
    const gapX = getAxisGap(building.x, building.x + building.width - 1, target.x, target.x + target.width - 1);
    const gapY = getAxisGap(building.y, building.y + building.height - 1, target.y, target.y + target.height - 1);
    const overlapX = getAxisOverlap(building.x, building.x + building.width - 1, target.x, target.x + target.width - 1);
    const overlapY = getAxisOverlap(building.y, building.y + building.height - 1, target.y, target.y + target.height - 1);
    const attachHorizontally = gapX >= 1 && gapX <= 3 && overlapY >= Math.min(building.height, target.height) * 0.45;
    const attachVertically = gapY >= 1 && gapY <= 3 && overlapX >= Math.min(building.width, target.width) * 0.45;
    if (attachHorizontally && (!attachVertically || gapX <= gapY)) {
        return {
            x: building.x < target.x ? target.x - building.width + 1 : target.x + target.width - 1,
            y: clamp(building.y, target.y - Math.floor(building.height * 0.25), target.y + target.height - Math.ceil(building.height * 0.75))
        };
    }
    if (attachVertically) {
        return {
            x: clamp(building.x, target.x - Math.floor(building.width * 0.25), target.x + target.width - Math.ceil(building.width * 0.75)),
            y: building.y < target.y ? target.y - building.height + 1 : target.y + target.height - 1
        };
    }
    return null;
}

function canMoveToSharedWallRect(building, moved, buildings) {
    const next = { ...building, x: moved.x, y: moved.y };
    return buildings.every((other) => {
        if (other === building) return true;
        return !rectsOverlapBeyondSharedWall(next, other);
    });
}

function rectsOverlapBeyondSharedWall(a, b) {
    const overlapX = getAxisOverlap(a.x, a.x + a.width - 1, b.x, b.x + b.width - 1);
    const overlapY = getAxisOverlap(a.y, a.y + a.height - 1, b.y, b.y + b.height - 1);
    if (overlapX <= 0 || overlapY <= 0) return false;
    return overlapX > 1 && overlapY > 1;
}

function canSharePartyWall(a, b) {
    return a.style === b.style || a.sourceType === b.sourceType || [a.sourceType, b.sourceType].every((type) => String(type).startsWith('HOUSE'));
}

function getAxisOverlap(aMin, aMax, bMin, bMax) {
    return Math.max(0, Math.min(aMax, bMax) - Math.max(aMin, bMin) + 1);
}

function getAxisGap(aMin, aMax, bMin, bMax) {
    if (aMax < bMin) return bMin - aMax;
    if (bMax < aMin) return aMin - bMax;
    return 0;
}

function placeBuildingsWithPadding(buildings, selected, occupied, offsetX, offsetY, padding) {
    const selectedIds = new Set(selected.map((building) => building.id));
    for (const building of buildings) {
        if (selectedIds.has(building.id)) continue;
        const x = building.x + offsetX;
        const y = building.y + offsetY;
        const footprint = getImportBuildingFootprint(building);
        if (!canReserveFootprint(occupied, x, y, footprint.cells, padding)) continue;
        reserveFootprint(occupied, x, y, footprint.cells, padding);
        selected.push(building);
        selectedIds.add(building.id);
    }
}

function repairSubMinimalFootprint(rect, width, height) {
    const targetWidth = Math.min(Math.max(2, rect.width), width);
    const targetHeight = Math.min(Math.max(2, rect.height), height);
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    return {
        x: clamp(Math.round(centerX - targetWidth / 2), 0, Math.max(0, width - targetWidth)),
        y: clamp(Math.round(centerY - targetHeight / 2), 0, Math.max(0, height - targetHeight)),
        width: targetWidth,
        height: targetHeight
    };
}

function auditTownCongruence(burg, town, candidates, buildings) {
    const sourceBuildings = town.buildings?.length || 0;
    const runtimeBuildings = buildings.length;
    const dropped = candidates
        .filter((candidate) => !buildings.some((building) => building.id === candidate.id))
        .map((building) => building.id);
    if (sourceBuildings !== runtimeBuildings || dropped.length > 0) {
        console.warn(JSON.stringify({
            type: 'town-congruence-audit',
            burgId: burg.id,
            town: town.name,
            sourceBuildings,
            candidateBuildings: candidates.length,
            runtimeBuildings,
            dropped
        }));
    }
}

function canReserveFootprint(occupied, x, y, cells, padding = 0) {
    for (const cell of cells) {
        for (let row = y + cell.y - padding; row <= y + cell.y + padding; row++) {
            for (let col = x + cell.x - padding; col <= x + cell.x + padding; col++) {
                if (!isInside(col, row, occupied[0].length, occupied.length)) return false;
                if (occupied[row][col]) return false;
            }
        }
    }
    return true;
}

function reserveFootprint(occupied, x, y, cells, padding = 0) {
    for (const cell of cells) {
        for (let row = y + cell.y - padding; row <= y + cell.y + padding; row++) {
            for (let col = x + cell.x - padding; col <= x + cell.x + padding; col++) {
                if (isInside(col, row, occupied[0].length, occupied.length)) occupied[row][col] = true;
            }
        }
    }
}

function canReserveRect(occupied, x, y, width, height, padding = 0) {
    for (let row = y - padding; row < y + height + padding; row++) {
        for (let col = x - padding; col < x + width + padding; col++) {
            if (!isInside(col, row, occupied[0].length, occupied.length)) return false;
            if (occupied[row][col]) return false;
        }
    }
    return true;
}

function reserveRect(occupied, x, y, width, height, padding = 0) {
    for (let row = y - padding; row < y + height + padding; row++) {
        for (let col = x - padding; col < x + width + padding; col++) {
            if (isInside(col, row, occupied[0].length, occupied.length)) occupied[row][col] = true;
        }
    }
}

function scaleDoor(sourceRect, scaledRect, doorGrid) {
    const sourceLocalX = clamp(Math.round(doorGrid[0] - sourceRect.x), 0, sourceRect.width - 1);
    const sourceLocalY = clamp(Math.round(doorGrid[1] - sourceRect.y), 0, sourceRect.height - 1);
    let x = scaleLocalCoordinate(sourceLocalX, sourceRect.width, scaledRect.width);
    let y = scaleLocalCoordinate(sourceLocalY, sourceRect.height, scaledRect.height);
    if (sourceLocalX === 0) x = 0;
    if (sourceLocalX === sourceRect.width - 1) x = scaledRect.width - 1;
    if (sourceLocalY === 0) y = 0;
    if (sourceLocalY === sourceRect.height - 1) y = scaledRect.height - 1;
    return {
        x: clamp(x, 0, scaledRect.width - 1),
        y: clamp(y, 0, scaledRect.height - 1)
    };
}

function compactFloors(floors, sourceRect, scaledRect) {
    return floors.slice(0, 3).map((floor) => ({
        level: floor.level,
        elevationVoxels: floor.elevation_voxels,
        rooms: (floor.rooms || []).map((room) => ({
            id: room.id,
            type: room.type,
            name: room.name,
            floor: room.floor,
            gridRect: scaleRoomRect(room.grid_rect, sourceRect, scaledRect),
            doors: (room.doors || []).map((door) => ({
                id: door.id,
                kind: door.kind,
                grid: scaleInteriorPoint(door.grid, sourceRect, scaledRect),
                connectsTo: door.connects_to
            }))
        })),
        stairs: floor.stairs ? {
            id: floor.stairs.id,
            grid: scaleInteriorPoint(floor.stairs.grid, sourceRect, scaledRect),
            connectsToLevel: floor.stairs.connects_to_level
        } : null
    }));
}

function compactMatrixFloors(floors, sourceRect, scaledRect) {
    return floors.slice(0, 3).map((floor) => ({
        level: floor.level,
        elevationVoxels: floor.elevation_voxels,
        rooms: (floor.rooms || []).map((room) => ({
            id: room.id,
            type: room.type,
            name: room.name,
            floor: room.floor,
            gridRect: room.grid_rect ? {
                x: clamp(Math.round(room.grid_rect.x - sourceRect.x), 0, scaledRect.width - 1),
                y: clamp(Math.round(room.grid_rect.y - sourceRect.y), 0, scaledRect.height - 1),
                width: clamp(Math.round(room.grid_rect.width), 1, scaledRect.width),
                height: clamp(Math.round(room.grid_rect.height), 1, scaledRect.height)
            } : null,
            tiles: (room.tiles || [])
                .map((tile) => toLocalMatrixPoint(tile, sourceRect, scaledRect))
                .filter(Boolean),
            doors: (room.doors || []).map((door) => ({
                id: door.id,
                kind: door.kind,
                grid: toLocalMatrixPoint(door.grid, sourceRect, scaledRect),
                direction: door.direction,
                connectsTo: door.connects_to
            }))
        })),
        stairs: floor.stairs ? {
            id: floor.stairs.id,
            grid: toLocalMatrixPoint(floor.stairs.grid, sourceRect, scaledRect),
            connectsToLevel: floor.stairs.connects_to_level
        } : null
    }));
}

function getSourceBuildingBounds(source, options = {}) {
    if (options.matrixMode) {
        const cells = collectSourceBuildingCells(source);
        if (cells.length > 0) return boundsFromCells(cells);
    }

    if (source.grid_rect && Number.isFinite(source.grid_rect.x) && Number.isFinite(source.grid_rect.y)) {
        return {
            x: Math.floor(source.grid_rect.x),
            y: Math.floor(source.grid_rect.y),
            width: Math.max(1, Math.floor(source.grid_rect.width || 1)),
            height: Math.max(1, Math.floor(source.grid_rect.height || 1))
        };
    }

    return null;
}

function getMatrixFootprintCells(source, sourceRect, scaledRect, options = {}) {
    const cells = new Map();
    for (const point of collectSourceBuildingCells(source)) {
        const local = toLocalMatrixPoint([point.x, point.y], sourceRect, scaledRect);
        if (local) cells.set(`${local[0]},${local[1]}`, { x: local[0], y: local[1] });
    }
    if (cells.size > 0) {
        return shapeMatrixFootprintCells([...cells.values()], source, scaledRect, options);
    }
    const fallback = [];
    for (let y = 0; y < scaledRect.height; y++) {
        for (let x = 0; x < scaledRect.width; x++) fallback.push({ x, y });
    }
    return shapeMatrixFootprintCells(fallback, source, scaledRect, options);
}

function collectSourceBuildingCells(source) {
    const cells = new Map();
    const addPoint = (point) => {
        const normalized = normalizeGridPoint(point);
        if (!normalized) return;
        cells.set(`${normalized.x},${normalized.y}`, normalized);
    };

    for (const point of source.footprintCells || []) addPoint(point);
    for (const point of source.footprint_cells || []) addPoint(point);
    for (const point of source.footprint_tiles || []) addPoint(point);
    for (const point of source.grid_cells || []) addPoint(point);
    for (const point of source.cells || []) addPoint(point);
    for (const point of source.tiles || []) addPoint(point);
    for (const floor of source.floors || []) {
        if (Number(floor.level || 0) !== 0) continue;
        for (const room of floor.rooms || []) {
            for (const point of room.tiles || []) addPoint(point);
            for (const point of room.cells || []) addPoint(point);
            for (const point of room.grid_cells || []) addPoint(point);
            for (const point of rasterizeSourcePolygon(room.polygon || room.outline || room.vertices || room.points)) {
                addPoint(point);
            }
        }
    }
    for (const point of rasterizeSourcePolygon(source.polygon || source.outline || source.vertices || source.points)) {
        addPoint(point);
    }

    return [...cells.values()].sort((a, b) => (a.y - b.y) || (a.x - b.x));
}

function normalizeGridPoint(point) {
    if (Array.isArray(point) && point.length >= 2) {
        return {
            x: Math.round(Number(point[0])),
            y: Math.round(Number(point[1]))
        };
    }
    if (point && typeof point === 'object') {
        const x = point.x ?? point.gridX ?? point.col ?? point.column ?? point[0];
        const y = point.y ?? point.gridY ?? point.row ?? point[1];
        if (Number.isFinite(Number(x)) && Number.isFinite(Number(y))) {
            return {
                x: Math.round(Number(x)),
                y: Math.round(Number(y))
            };
        }
    }
    return null;
}

function rasterizeSourcePolygon(points) {
    const polygon = (points || [])
        .map((point) => normalizeGridPoint(point))
        .filter(Boolean);
    if (polygon.length < 3) return [];

    const bounds = boundsFromCells(polygon);
    const cells = [];
    for (let y = bounds.y; y < bounds.y + bounds.height; y++) {
        for (let x = bounds.x; x < bounds.x + bounds.width; x++) {
            if (isPointInsidePolygon(x + 0.5, y + 0.5, polygon)) cells.push({ x, y });
        }
    }
    return cells;
}

function isPointInsidePolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x;
        const yi = polygon[i].y;
        const xj = polygon[j].x;
        const yj = polygon[j].y;
        const intersects = ((yi > y) !== (yj > y)) &&
            x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1) + xi;
        if (intersects) inside = !inside;
    }
    return inside;
}

function boundsFromCells(cells) {
    const xs = cells.map((cell) => cell.x);
    const ys = cells.map((cell) => cell.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    return {
        x: minX,
        y: minY,
        width: Math.max(1, maxX - minX + 1),
        height: Math.max(1, maxY - minY + 1)
    };
}

function shapeMatrixFootprintCells(cells, source, scaledRect, options = {}) {
    if (scaledRect.width < 7 || scaledRect.height < 7 || cells.length < scaledRect.width * scaledRect.height * 0.92) {
        return cells;
    }

    const footprint = new Map(cells.map((cell) => [`${cell.x},${cell.y}`, cell]));
    const protectedCells = new Set();
    if (options.door) protectedCells.add(`${options.door.x},${options.door.y}`);
    for (const stair of options.stairs || []) protectedCells.add(`${stair.x},${stair.y}`);

    const variant = hashString(`${source.id || source.type || 'building'}:${scaledRect.width}x${scaledRect.height}`) % 9;
    const notchWidth = clamp(Math.floor(scaledRect.width * 0.28), 2, Math.max(2, scaledRect.width - 4));
    const notchHeight = clamp(Math.floor(scaledRect.height * 0.28), 2, Math.max(2, scaledRect.height - 4));
    const removals = [];

    if (variant === 0) {
        addCornerNotch(removals, scaledRect, 'northwest', notchWidth, notchHeight);
        addFacadeBays(removals, scaledRect, 'south', 1, 2);
    } else if (variant === 1) {
        addCornerNotch(removals, scaledRect, 'southeast', notchWidth, notchHeight);
        addFacadeBays(removals, scaledRect, 'west', 1, 2);
    } else if (variant === 2) {
        addCornerNotch(removals, scaledRect, 'northeast', notchWidth, notchHeight);
        addCornerNotch(removals, scaledRect, 'southwest', Math.max(2, notchWidth - 1), Math.max(2, notchHeight - 1));
    } else if (variant === 3) {
        addSideNotch(removals, scaledRect, 'north', notchWidth + 1, notchHeight);
        addFacadeBays(removals, scaledRect, 'south', 1, 3);
    } else if (variant === 4) {
        addSideNotch(removals, scaledRect, 'east', notchWidth, notchHeight + 1);
        addFacadeBays(removals, scaledRect, 'north', 1, 2);
    } else if (variant === 5 && scaledRect.width >= 9 && scaledRect.height >= 9) {
        addCenteredCourtyard(removals, scaledRect, Math.max(2, Math.floor(scaledRect.width * 0.28)), Math.max(2, Math.floor(scaledRect.height * 0.28)));
    } else if (variant === 6) {
        addSideNotch(removals, scaledRect, 'west', Math.max(2, notchWidth - 1), notchHeight + 1);
        addSideNotch(removals, scaledRect, 'east', Math.max(2, notchWidth - 1), notchHeight);
    } else if (variant === 7) {
        addSideNotch(removals, scaledRect, 'north', Math.max(3, notchWidth), Math.max(2, notchHeight - 1));
        addSideNotch(removals, scaledRect, 'south', Math.max(3, notchWidth - 1), Math.max(2, notchHeight - 1));
    } else {
        addFacadeBays(removals, scaledRect, 'north', 1, 3);
        addFacadeBays(removals, scaledRect, 'east', 1, 3);
    }

    for (const key of removals) {
        if (protectedCells.has(key)) continue;
        footprint.delete(key);
    }

    const shaped = [...footprint.values()];
    if (shaped.length < cells.length * 0.62 || !isConnectedFootprint(shaped)) return cells;
    return shaped;
}

function addCornerNotch(removals, rect, corner, width, height) {
    const xStart = corner.includes('west') ? 0 : rect.width - width;
    const yStart = corner.includes('north') ? 0 : rect.height - height;
    for (let y = yStart; y < yStart + height; y++) {
        for (let x = xStart; x < xStart + width; x++) removals.push(`${x},${y}`);
    }
}

function addSideNotch(removals, rect, side, width, height) {
    const xStart = side === 'east' ? rect.width - width : side === 'west' ? 0 : Math.floor((rect.width - width) / 2);
    const yStart = side === 'south' ? rect.height - height : side === 'north' ? 0 : Math.floor((rect.height - height) / 2);
    for (let y = yStart; y < yStart + height; y++) {
        for (let x = xStart; x < xStart + width; x++) removals.push(`${x},${y}`);
    }
}

function addCenteredCourtyard(removals, rect, width, height) {
    const xStart = clamp(Math.floor((rect.width - width) / 2), 2, Math.max(2, rect.width - width - 2));
    const yStart = clamp(Math.floor((rect.height - height) / 2), 2, Math.max(2, rect.height - height - 2));
    for (let y = yStart; y < yStart + height; y++) {
        for (let x = xStart; x < xStart + width; x++) removals.push(`${x},${y}`);
    }
}

function addFacadeBays(removals, rect, side, depth = 1, spacing = 3) {
    const horizontal = side === 'north' || side === 'south';
    const span = horizontal ? rect.width : rect.height;
    const safeDepth = clamp(depth, 1, horizontal ? rect.height - 4 : rect.width - 4);
    for (let along = 2; along < span - 2; along += spacing + 1) {
        for (let inset = 0; inset < safeDepth; inset++) {
            const x = horizontal
                ? along
                : side === 'west' ? inset : rect.width - 1 - inset;
            const y = horizontal
                ? side === 'north' ? inset : rect.height - 1 - inset
                : along;
            removals.push(`${x},${y}`);
        }
    }
}

function isConnectedFootprint(cells) {
    if (cells.length === 0) return false;
    const set = new Set(cells.map((cell) => `${cell.x},${cell.y}`));
    const stack = [cells[0]];
    const seen = new Set();
    while (stack.length) {
        const cell = stack.pop();
        const key = `${cell.x},${cell.y}`;
        if (seen.has(key)) continue;
        seen.add(key);
        for (const offset of [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ]) {
            const nextKey = `${cell.x + offset.x},${cell.y + offset.y}`;
            if (set.has(nextKey) && !seen.has(nextKey)) stack.push({ x: cell.x + offset.x, y: cell.y + offset.y });
        }
    }
    return seen.size === cells.length;
}

function hashString(value) {
    let hash = 0;
    for (const char of String(value)) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    return Math.abs(hash);
}

function getMatrixDoor(source, sourceRect, scaledRect, doorGrid) {
    const local = toLocalMatrixPoint(doorGrid, sourceRect, scaledRect) || [0, 0];
    const explicitDoor = (source.floors || [])
        .flatMap((floor) => floor.rooms || [])
        .flatMap((room) => room.doors || [])
        .find((door) => door.kind === 'exterior');
    const explicitLocal = toLocalMatrixPoint(explicitDoor?.grid, sourceRect, scaledRect);
    const x = clamp(explicitLocal?.[0] ?? local[0], 0, scaledRect.width - 1);
    const y = clamp(explicitLocal?.[1] ?? local[1], 0, scaledRect.height - 1);
    return {
        x,
        y,
        edge: explicitDoor?.direction || getDoorEdge(scaledRect.width, scaledRect.height, { x, y })
    };
}

function getMatrixBuildingStairs(source, sourceRect, scaledRect, door, style, stories) {
    const stairs = [];
    const seen = new Set();
    for (const floor of source.floors || []) {
        if (!floor.stairs?.grid) continue;
        const local = toLocalMatrixPoint(floor.stairs.grid, sourceRect, scaledRect);
        if (!local) continue;
        const connectsTo = Number(floor.stairs.connects_to_level);
        if (!Number.isFinite(connectsTo) || connectsTo <= Number(floor.level || 0)) continue;
        const key = `${local[0]},${local[1]},${floor.level}`;
        if (seen.has(key)) continue;
        seen.add(key);
        stairs.push({
            x: local[0],
            y: local[1],
            direction: getOppositeDoorDirection(scaledRect.width, scaledRect.height, door),
            style,
            level: Math.max(0, Math.floor(floor.level || 0))
        });
    }
    if (stairs.length > 0) {
        const limit = Math.max(1, stories - 1);
        return stairs.slice(0, limit).map((stair, index) => ({
            ...stair,
            destination: stories <= 1 ? 'roof' : 'floor',
            level: index
        }));
    }
    return createStairFlightsForBuilding(scaledRect.width, scaledRect.height, door, style, stories);
}

function toLocalMatrixPoint(point, sourceRect, scaledRect) {
    if (!Array.isArray(point)) return null;
    const x = Math.round(point[0] - sourceRect.x);
    const y = Math.round(point[1] - sourceRect.y);
    if (x < 0 || y < 0 || x >= scaledRect.width || y >= scaledRect.height) return null;
    return [x, y];
}

function scaleRoomRect(roomRect, sourceRect, scaledRect) {
    if (!roomRect) return null;
    const scaleX = scaledRect.width / sourceRect.width;
    const scaleY = scaledRect.height / sourceRect.height;
    const x = clamp(Math.floor((roomRect.x - sourceRect.x) * scaleX), 0, scaledRect.width - 1);
    const y = clamp(Math.floor((roomRect.y - sourceRect.y) * scaleY), 0, scaledRect.height - 1);
    return {
        x,
        y,
        width: clamp(Math.ceil(roomRect.width * scaleX), 1, scaledRect.width - x),
        height: clamp(Math.ceil(roomRect.height * scaleY), 1, scaledRect.height - y)
    };
}

function scaleInteriorPoint(point, sourceRect, scaledRect) {
    if (!Array.isArray(point)) return null;
    const localX = clamp(Math.round(point[0] - sourceRect.x), 0, sourceRect.width - 1);
    const localY = clamp(Math.round(point[1] - sourceRect.y), 0, sourceRect.height - 1);
    return [
        scaleLocalCoordinate(localX, sourceRect.width, scaledRect.width),
        scaleLocalCoordinate(localY, sourceRect.height, scaledRect.height)
    ];
}

function scaleLocalCoordinate(sourceLocal, sourceSize, targetSize) {
    if (sourceSize <= 1) return Math.floor(targetSize / 2);
    return clamp(Math.round((sourceLocal / (sourceSize - 1)) * (targetSize - 1)), 0, targetSize - 1);
}

function getBuildingStairs(source, scaledRect, door, style, stories) {
    if (stories <= 1 && source?.interior?.has_stairs) {
        return [{
            ...createStairsForBuilding(scaledRect.width, scaledRect.height, door, style, 0),
            destination: 'roof'
        }];
    }
    if (stories <= 1) return [];
    return createStairFlightsForBuilding(scaledRect.width, scaledRect.height, door, style, stories);
}

function createStairFlightsForBuilding(width, height, door, style, stories) {
    const flights = [];
    const base = createStairsForBuilding(width, height, door, style, 0);
    flights.push(base);
    for (let level = 1; level < stories - 1; level++) {
        flights.push(createStairsForBuilding(width, height, door, style, level, flights[level - 1]));
    }
    return flights;
}

function createStairsForBuilding(width, height, door, style, level = 0, previous = null) {
    const direction = getOppositeDoorDirection(width, height, door);
    const edge = getDoorEdge(width, height, door);
    const alongX = direction === 'east' || direction === 'west';
    const sideStep = level % 2 === 0 ? 0 : 3;
    const sideSign = (door.x <= width / 2 || door.y <= height / 2) ? 1 : -1;
    const minX = width > 2 ? 1 : 0;
    const maxX = width > 2 ? width - 2 : width - 1;
    const minY = height > 2 ? 1 : 0;
    const maxY = height > 2 ? height - 2 : height - 1;
    const baseX = edge === 'west' ? maxX : edge === 'east' ? minX : door.x <= width / 2 ? maxX : minX;
    const baseY = edge === 'north' ? maxY : edge === 'south' ? minY : door.y <= height / 2 ? maxY : minY;
    let x = alongX ? baseX + level * (direction === 'east' ? 2 : -2) : baseX + sideStep * sideSign;
    let y = alongX ? baseY + sideStep * sideSign : baseY + level * (direction === 'south' ? 2 : -2);
    x = clamp(x, minX, maxX);
    y = clamp(y, minY, maxY);

    if (previous && Math.abs(previous.x - x) + Math.abs(previous.y - y) < 3) {
        if (alongX) y = clamp(y + (y <= height / 2 ? 3 : -3), minY, maxY);
        else x = clamp(x + (x <= width / 2 ? 3 : -3), minX, maxX);
    }

    return {
        x,
        y,
        direction,
        style,
        level
    };
}

function normalizeBuildingStairs(rawStairs, rect, door, style, stories, footprintCells = null) {
    const hasRoofFallback = Math.floor(stories || 1) <= 1 &&
        (rawStairs || []).some((stair) => stair?.destination === 'roof');
    const levels = hasRoofFallback ? 1 : Math.max(0, Math.floor(stories || 1) - 1);
    if (levels <= 0) return [];

    const width = Math.max(1, Math.floor(rect.width || 1));
    const height = Math.max(1, Math.floor(rect.height || 1));
    const footprint = createStairFootprint(width, height, footprintCells);
    const candidates = getLogicalStairCandidates(width, height, footprint, door);
    if (candidates.length === 0) {
        return [];
    }

    const normalized = [];
    const usedCells = new Set();
    for (let level = 0; level < levels; level++) {
        const desired = rawStairs?.[level] || rawStairs?.[0] || normalized[level - 1] || {
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
            direction: getOppositeDoorDirection(width, height, door)
        };
        const previous = normalized[level - 1] || null;
        const used = new Set(normalized.map((stair) => `${stair.x},${stair.y}`));
        const available = candidates.filter((candidate) =>
            isCompleteStairCandidate(candidate) &&
            getBlockingStairCellKeys(candidate.cells).every((key) => !usedCells.has(key))
        );
        if (available.length === 0) break;
        const best = [...available]
            .sort((a, b) =>
                scoreLogicalStairCandidate(a, desired, previous, door, width, height, used) -
                scoreLogicalStairCandidate(b, desired, previous, door, width, height, used)
            )[0];
        for (const key of getBlockingStairCellKeys(best.cells)) usedCells.add(key);
        normalized.push({
            x: best.x,
            y: best.y,
            direction: best.direction || desired.direction || getOppositeDoorDirection(width, height, door),
            style,
            level,
            destination: hasRoofFallback ? 'roof' : 'floor',
            cells: best.cells.map((cell) => ({ ...cell, level }))
        });
    }
    if (normalized.length !== levels) return [];
    return validateImportedStairRoutes(normalized, stories);
}

function flattenStairCells(stairs = []) {
    return stairs.flatMap((stair) => (stair.cells || [{
        x: stair.x,
        y: stair.y,
        direction: stair.direction,
        role: 'stair',
        height: 2,
        level: stair.level || 0
    }])
        .filter((cell) => !['landing', 'pass-through-air'].includes(cell.role))
        .map((cell) => ({
        x: cell.x,
        y: cell.y,
        direction: cell.direction || stair.direction,
        role: normalizeStairCellRole(cell.role),
        sector: cell.sector,
        module: Math.max(0, Math.floor(cell.module || 0)),
        height: Math.max(0, Math.floor(cell.height ?? 2)),
        level: Math.max(0, Math.floor(cell.level ?? stair.level ?? 0)),
        destination: stair.destination || 'floor'
    })));
}

function validateImportedStairRoutes(stairs, stories) {
    const validation = validateStaircaseRouting(stairs, {
        baseElevation: 0,
        stories
    });
    if (validation.valid) return stairs;
    return [];
}

function normalizeStairCellRole(role) {
    if (role === 'support') return 'support';
    if (role === 'air') return 'air';
    if (role === 'lower-stair') return 'lower-stair';
    if (role === 'upper-stair') return 'upper-stair';
    return 'stair';
}

function isCompleteStairCandidate(candidate) {
    const cells = Array.isArray(candidate?.cells) ? candidate.cells : [];
    const byModule = new Map();
    for (const cell of cells) {
        const module = Math.max(0, Math.floor(cell.module || 0));
        if (!byModule.has(module)) byModule.set(module, []);
        byModule.get(module).push(cell);
    }
    if (byModule.size === 0) return false;
    for (const moduleCells of byModule.values()) {
        const roles = new Set(moduleCells.map((cell) => cell.role));
        if (!roles.has('air') || !roles.has('lower-stair') || !roles.has('upper-stair') || !roles.has('support')) return false;
        if (moduleCells.length !== 4) return false;
    }
    return true;
}

function getBlockingStairCellKeys(cells = []) {
    return cells
        .filter((cell) => !['pass-through-air', 'landing'].includes(cell.role))
        .map((cell) => `${cell.x},${cell.y}`);
}

function createStairFootprint(width, height, footprintCells = null) {
    const cells = Array.isArray(footprintCells) && footprintCells.length > 0
        ? footprintCells
            .map((cell) => ({ x: Math.floor(cell.x), y: Math.floor(cell.y) }))
            .filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height)
        : Array.from({ length: height }, (_, y) =>
            Array.from({ length: width }, (_, x) => ({ x, y }))
        ).flat();
    const set = new Set(cells.map((cell) => `${cell.x},${cell.y}`));
    return { cells, set };
}

function getLogicalStairCandidates(width, height, footprint, door) {
    const candidates = [];
    for (const cell of footprint.cells) {
        if (isFootprintEdgeCell(footprint.set, cell.x, cell.y)) continue;
        if (cell.x === door?.x && cell.y === door?.y) continue;
        const wallOffsets = getAdjacentWallOffsets(footprint.set, cell.x, cell.y);
        if (wallOffsets.length === 0) continue;
        for (const direction of ['east', 'south', 'west', 'north']) {
            const run = createStairFlight({
                origin: cell,
                direction,
                footprintSet: footprint.set,
                door,
                configuration: STAIR_CONFIGURATION.SOLID_TRIANGULAR,
                level: 0
            });
            if (!run) continue;
            if (!hasUpperStairFloorExit(run, footprint.set)) continue;
            const cornerDistance = Math.min(cell.x, cell.y, width - 1 - cell.x, height - 1 - cell.y);
            candidates.push({
                x: cell.x,
                y: cell.y,
                direction,
                cells: run,
                wallAdjacency: wallOffsets.length,
                cornerDistance
            });
        }
    }
    return candidates;
}

function hasUpperStairFloorExit(cells = [], footprintSet = new Set()) {
    const occupied = new Set(cells.map((cell) => `${cell.x},${cell.y}`));
    for (const cell of cells) {
        if (cell.role !== 'upper-stair') continue;
        for (const offset of [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ]) {
            const x = cell.x + offset.x;
            const y = cell.y + offset.y;
            const key = `${x},${y}`;
            if (!footprintSet.has(key)) continue;
            if (occupied.has(key)) continue;
            if (isFootprintEdgeCell(footprintSet, x, y)) continue;
            return true;
        }
    }
    return false;
}

function scoreLogicalStairCandidate(candidate, desired, previous, door, width, height, used) {
    const desiredDistance = Math.abs(candidate.x - desired.x) + Math.abs(candidate.y - desired.y);
    const doorDistance = door ? Math.abs(candidate.x - door.x) + Math.abs(candidate.y - door.y) : 0;
    const centerDistance = Math.abs(candidate.x - (width - 1) / 2) + Math.abs(candidate.y - (height - 1) / 2);
    const reusePenalty = used.has(`${candidate.x},${candidate.y}`) ? 12 : 0;
    const spacingPenalty = previous
        ? Math.abs((Math.abs(candidate.x - previous.x) + Math.abs(candidate.y - previous.y)) - 3) * 2
        : 0;
    const cornerPenalty = candidate.wallAdjacency > 1 ? 8 : 0;
    return desiredDistance * 2 + doorDistance * 0.35 + centerDistance * 0.15 + reusePenalty + spacingPenalty + cornerPenalty;
}

function isFootprintEdgeCell(set, x, y) {
    return !set.has(`${x},${y - 1}`) ||
        !set.has(`${x + 1},${y}`) ||
        !set.has(`${x},${y + 1}`) ||
        !set.has(`${x - 1},${y}`);
}

function getAdjacentWallOffsets(set, x, y) {
    return [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 }
    ].filter((offset) => {
        const nx = x + offset.x;
        const ny = y + offset.y;
        return set.has(`${nx},${ny}`) && isFootprintEdgeCell(set, nx, ny);
    });
}

function directionToOffset(direction) {
    return {
        north: { x: 0, y: -1 },
        south: { x: 0, y: 1 },
        west: { x: -1, y: 0 },
        east: { x: 1, y: 0 }
    }[direction] || { x: 0, y: 1 };
}

function getOppositeDoorDirection(width, height, door) {
    const edge = getDoorEdge(width, height, door);
    return edge === 'north' ? 'south'
        : edge === 'south' ? 'north'
            : edge === 'west' ? 'east'
                : 'west';
}

function getDoorEdge(width, height, door) {
    if (door?.edge) return door.edge;
    if (door.y === 0) return 'north';
    if (door.y === height - 1) return 'south';
    if (door.x === 0) return 'west';
    if (door.x === width - 1) return 'east';
    return 'south';
}

function getCenteredDoor(width, height, edge) {
    if (edge === 'north') return { x: Math.floor(width / 2), y: 0 };
    if (edge === 'south') return { x: Math.floor(width / 2), y: height - 1 };
    if (edge === 'west') return { x: 0, y: Math.floor(height / 2) };
    return { x: width - 1, y: Math.floor(height / 2) };
}

function getRectBaseElevation(elevationRows, rect) {
    const values = [];
    for (let y = rect.y; y < rect.y + rect.height; y++) {
        for (let x = rect.x; x < rect.x + rect.width; x++) {
            const value = elevationRows[y]?.[x];
            if (Number.isFinite(value)) values.push(value);
        }
    }
    if (!values.length) return 0;
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)];
}

function getBuildingBaseElevation(elevationRows, rect, door) {
    if (!Array.isArray(elevationRows) || !rect) return 0;
    const values = [];
    const sample = (x, y) => {
        const value = elevationRows[y]?.[x];
        if (Number.isFinite(value)) values.push(clamp(Math.floor(value), 0, 6));
    };

    for (let y = rect.y; y < rect.y + rect.height; y++) {
        for (let x = rect.x; x < rect.x + rect.width; x++) sample(x, y);
    }

    if (door) {
        const doorX = rect.x + clamp(Math.floor(door.x || 0), 0, rect.width - 1);
        const doorY = rect.y + clamp(Math.floor(door.y || 0), 0, rect.height - 1);
        sample(doorX, doorY);
        const edge = door.edge || getDoorEdge(rect.width, rect.height, door);
        const direction = getEdgeDirection(edge);
        sample(doorX + direction.x, doorY + direction.y);
    }

    return values.length ? Math.max(0, ...values) : 0;
}

function getBuildingStories(type) {
    if (type === 'TOWER' || type === 'CHURCH' || type === 'MANOR') return 3;
    if (type === 'TAVERN' || type === 'BLACKSMITH' || type === 'HOUSE_LARGE') return 2;
    return 1;
}

function getBuildingPriority(type) {
    return {
        MANOR: 100,
        CHURCH: 95,
        TOWER: 92,
        TAVERN: 88,
        BLACKSMITH: 84,
        HOUSE_LARGE: 76,
        FARM_HOUSE: 62,
        HOUSE_SMALL: 50
    }[type] || 40;
}

function getDoorStyle(type, index) {
    if (type === 'TOWER' || type === 'MANOR') return 'iron';
    if (type === 'TAVERN' || index % 3 === 2) return 'painted';
    return 'oak';
}

function createRoutePayload(routes) {
    return routes
        .filter((route) => Array.isArray(route.points) && route.points.length >= 2)
        .slice(0, 90)
        .map((route) => ({
            id: route.id,
            kind: route.kind,
            points: simplifyPoints(route.points, 2).map(([x, y]) => [roundCoordinate(x), roundCoordinate(y)])
        }));
}

function simplifyPoints(points, step) {
    if (points.length <= 3) return points;
    const simplified = [points[0]];
    for (let index = step; index < points.length - 1; index += step) simplified.push(points[index]);
    simplified.push(points[points.length - 1]);
    return simplified;
}

function createHeightSamples(cells) {
    return cells
        .filter((cell, index) => index % 12 === 0 && Array.isArray(cell.coordinate))
        .map((cell) => [
            roundCoordinate(cell.coordinate[0]),
            roundCoordinate(cell.coordinate[1]),
            Math.round(Number(cell.elevation ?? cell.height ?? 0))
        ]);
}

function normalizeBurgType(burg) {
    if (burg.flags?.capital || burg.group === 'capital') return 'capital';
    if (burg.flags?.port) return 'port';
    if (burg.flags?.citadel || burg.flags?.walls) return 'fortress';
    return 'borough';
}

async function writeModule(payload) {
    const source = `// Generated by tools/import_world_map_package.mjs. Do not edit by hand.\n\n` +
        `export const ACTIVE_WORLD = ${JSON.stringify(payload.world, null, 2)};\n\n` +
        `export const ACTIVE_TOWNS = ${JSON.stringify(payload.towns, null, 2)};\n`;
    await writeFile(OUTPUT_MODULE, source, 'utf8');
}

async function listTownFiles(townsDir) {
    return (await readdir(townsDir))
        .filter((file) => /^burg-\d+\.json$/.test(file))
        .map((file) => `towns/${file}`);
}

async function resolveSourceDir(explicitSource) {
    if (explicitSource) return path.resolve(explicitSource);

    const dropped = await findDroppedMapPackage(DROP_SOURCE_DIR);
    if (dropped) return dropped;

    throw new Error(`Missing map package. Place manifest.json, map-data.json, map-data.png, towns/, and map assets in ${path.relative(REPO_ROOT, DROP_SOURCE_DIR)} or pass an explicit source path.`);
}

async function resolveMapDataFile(sourceDir, manifestFile, preferredNames) {
    for (const fileName of preferredNames) {
        const candidate = path.join(sourceDir, fileName);
        try {
            await readFile(candidate);
            return candidate;
        } catch {}
    }

    if (manifestFile) {
        const manifestCandidate = path.join(sourceDir, manifestFile);
        try {
            await readFile(manifestCandidate);
            return manifestCandidate;
        } catch {}
    }

    throw new Error(`Missing map data file. Tried ${preferredNames.join(', ')} in ${path.relative(REPO_ROOT, sourceDir)}.`);
}

async function findDroppedMapPackage(sourceRoot) {
    try {
        await readFile(path.join(sourceRoot, 'manifest.json'));
        return sourceRoot;
    } catch {}

    try {
        const entries = await readdir(sourceRoot, { withFileTypes: true });
        const candidates = [];
        for (const entry of entries) {
            if (!entry.isDirectory()) continue;
            const candidate = path.join(sourceRoot, entry.name);
            try {
                const manifest = await readJson(path.join(candidate, 'manifest.json'));
                if (manifest?.schema === 'vibe-game-map-package') candidates.push(candidate);
            } catch {}
        }
        candidates.sort((a, b) => b.localeCompare(a));
        return candidates[0] || null;
    } catch {
        return null;
    }
}

async function readJson(filePath) {
    return JSON.parse(await readFile(filePath, 'utf8'));
}

function isInside(x, y, width, height) {
    return x >= 0 && y >= 0 && x < width && y < height;
}

function roundCoordinate(value) {
    return Math.round(Number(value) * 100) / 100;
}

function getBurgNumber(file) {
    return Number(String(file).match(/burg-(\d+)\.json$/)?.[1] || 0);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, Math.floor(value)));
}

function slugify(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'world';
}

function titleCase(value) {
    return String(value || 'Building')
        .toLowerCase()
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function seededImportRandom(seed) {
    let state = Math.abs(Math.floor(Number(seed) || 1)) || 1;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
