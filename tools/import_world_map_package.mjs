#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE = '/Users/lx/Downloads/Tarig vibe-game-map 2026-06-30-16-29';
const OUTPUT_MODULE = path.join(REPO_ROOT, 'client', 'src', 'data', 'ActiveWorldData.js');
const OUTPUT_ASSET_DIR = path.join(REPO_ROOT, 'client', 'public', 'assets', 'maps');
const OUTPUT_ASSET = path.join(OUTPUT_ASSET_DIR, 'active-world-map.png');
const ASSET_PUBLIC_PATH = '/assets/maps/active-world-map.png';
const SOURCE_TOWN_WIDTH = 80;
const SOURCE_TOWN_HEIGHT = 60;
const TERRAIN_SCALE = 1;
const LEGACY_BUILDING_SCALE = 3;
const NARROW_ROAD_WIDTH = 1;
const MAIN_ROAD_WIDTH = 2;
const DOCK_ROAD_WIDTH = 1;
const WALL_WIDTH = 2;
const MAX_RUNTIME_BUILDINGS = 128;

async function main(argv = process.argv.slice(2)) {
    const sourceDir = path.resolve(argv[0] || DEFAULT_SOURCE);
    const manifest = await readJson(path.join(sourceDir, 'manifest.json'));
    const world = await readJson(path.join(sourceDir, manifest.files.world));
    const townsDir = path.join(sourceDir, manifest.files.towns_directory || 'towns');
    const townFiles = (manifest.files.towns || await listTownFiles(townsDir))
        .map((file) => file.replace(/^towns\//, ''))
        .sort((a, b) => getBurgNumber(a) - getBurgNumber(b));

    const towns = [];
    for (const file of townFiles) {
        const burgId = getBurgNumber(file);
        const town = await readJson(path.join(townsDir, file));
        const burg = world.entities.burgs.find((candidate) => candidate.id === burgId) ||
            manifest.burgs.find((candidate) => candidate.id === burgId);
        if (!burg) continue;
        towns.push(createCompactTown(burg, town, file));
    }

    const locations = towns.map((town) => town.location);
    const activeBuildingScale = towns.every((town) => town.town.sourceFormat === 'matrix-grid-v1') ? 1 : LEGACY_BUILDING_SCALE;
    const payload = {
        world: {
            id: slugify(world.metadata.map_name || manifest.map_name || 'active-world'),
            name: world.metadata.map_name || manifest.map_name || 'Active World',
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
                sourceFile: manifest.files.image
            },
            locations,
            routes: createRoutePayload(world.world.routes || []),
            heightSamples: createHeightSamples(world.world.cells || [])
        },
        towns: Object.fromEntries(towns.map((town) => [town.location.id, town.town]))
    };

    await mkdir(OUTPUT_ASSET_DIR, { recursive: true });
    await writeFile(OUTPUT_ASSET, await readFile(path.join(sourceDir, manifest.files.image)));
    await writeModule(payload);

    console.log(JSON.stringify({
        ok: true,
        sourceDir,
        map: payload.world.name,
        outputModule: path.relative(REPO_ROOT, OUTPUT_MODULE),
        outputAsset: path.relative(REPO_ROOT, OUTPUT_ASSET),
        terrainScale: TERRAIN_SCALE,
        buildingScale: activeBuildingScale,
        towns: towns.length,
        routes: payload.world.routes.length,
        buildings: towns.reduce((sum, town) => sum + town.town.buildings.length, 0)
    }, null, 2));
}

function createCompactTown(burg, town, file) {
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
        ? createTerrainFromMatrix(town.matrix, profile)
        : createTerrain(town, sourceWidth, sourceHeight, profile);
    if (!hasMatrix) {
        overlayCells(rows, town.farms, profile.farmSymbol);
        overlayRoads(rows, town.streets, profile);
        enrichGroundVariants(rows, profile);
        overlayCityWalls(rows, town.walls, profile);
    }

    const buildingCandidates = (town.buildings || [])
        .filter((building) => building.grid_rect)
        .map((building, index) => createBuildingBlueprint(building, town, width, height, elevationRows, index, { matrixMode: hasMatrix }))
        .filter(Boolean);
    const buildings = hasMatrix
        ? buildingCandidates.slice(0, MAX_RUNTIME_BUILDINGS)
        : selectTownBuildings(buildingCandidates, width, height);
    if (hasMatrix) {
        ensureMatrixDoorApproaches(rows, buildings, profile);
    } else {
        alignBuildingEntrances(rows, buildings, profile);
    }
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

function createTerrainFromMatrix(matrix, profile) {
    const height = matrix.block.height;
    const width = matrix.block.width;
    const mutable = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => matrixTerrainCodeToSymbol(matrix.terrain[y]?.[x], profile))
    );
    const elevationRows = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => matrixTerrainCodeToElevation(matrix.terrain[y]?.[x], matrix.solid_height_voxels?.[y]?.[x]))
    );

    ensureHorizontalMainRoad(mutable, profile);

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
    return 0;
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

function createRoadDecorations(rows, buildings, profile, seed) {
    const mutable = rows.map((row) => row.split(''));
    const width = mutable[0]?.length || 0;
    const height = mutable.length;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const random = seededImportRandom(seed + 991);
    const blocked = createBuildingBlockSet(buildings, offsetX, offsetY);
    const decorations = [];
    const occupied = new Set();
    const maxDecorations = profile.cityLike ? 260 : 160;

    for (let y = 2; y < height - 2; y++) {
        for (let x = 2; x < width - 2; x++) {
            if (!isRoadSymbol(mutable[y][x])) continue;
            if (blocked.has(`${x},${y}`)) continue;
            if (decorations.length >= maxDecorations) return decorations;
            const roadNeighbors = countNeighbors(mutable, x, y, (symbol) => isRoadSymbol(symbol));
            const side = findDecorationSide(mutable, x, y);
            if (!side) continue;
            const densityRoll = profile.cityLike ? 0.16 : 0.1;
            const intersectionBonus = roadNeighbors >= 3 ? 0.18 : 0;
            const buildingBonus = isNearBuilding(buildings, x - offsetX, y - offsetY) ? 0.12 : 0;
            if (random() > densityRoll + intersectionBonus + buildingBonus) continue;
            const key = `${x},${y}`;
            if (occupied.has(key)) continue;
            occupied.add(key);
            decorations.push({
                id: `decor-${decorations.length}-${x}-${y}`,
                type: chooseDecorationType({ roadNeighbors, nearBuilding: buildingBonus > 0, profile, random }),
                x: x - offsetX,
                y: y - offsetY,
                offsetX: side.x * 0.28,
                offsetY: side.y * 0.28,
                rotation: side.rotation
            });
        }
    }

    return decorations;
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
    const rect = source.grid_rect;
    if (!rect || rect.width < 1 || rect.height < 1) return null;

    const scale = options.matrixMode ? 1 : LEGACY_BUILDING_SCALE;
    const sourceCenterX = rect.x + rect.width / 2;
    const sourceCenterY = rect.y + rect.height / 2;
    const scaledWidth = options.matrixMode ? rect.width : Math.max(4, Math.ceil(rect.width * scale));
    const scaledHeight = options.matrixMode ? rect.height : Math.max(4, Math.ceil(rect.height * scale));
    const scaledRect = options.matrixMode
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
    if (scaledRect.width < 2 || scaledRect.height < 2) return null;

    const doorGrid = source.door?.grid || [rect.x + Math.floor(rect.width / 2), rect.y + rect.height - 1];
    const door = options.matrixMode
        ? getMatrixDoor(source, scaledRect, doorGrid)
        : scaleDoor(rect, scaledRect, doorGrid);
    const style = ['WOOD', 'TIMBER_FRAME'].includes(source.wall_texture) ? 'timber' : 'stone';
    const floors = options.matrixMode
        ? compactMatrixFloors(source.floors || [], rect, scaledRect)
        : compactFloors(source.floors || [], rect, scaledRect);
    const stories = clamp(Math.floor(source.interior?.floor_count || floors.length || getBuildingStories(source.type)), 1, 3);
    const stairs = options.matrixMode
        ? getMatrixBuildingStairs(source, scaledRect, door, style, stories)
        : getBuildingStairs(source, scaledRect, door, style, stories);
    const baseElevation = getBuildingBaseElevation(elevationRows, scaledRect, door);
    const footprintCells = options.matrixMode ? getMatrixFootprintCells(source, rect, scaledRect) : null;

    return {
        id: `${slugify(town.name)}-${source.id || `building-${index}`}`,
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
        doorStyle: getDoorStyle(source.type, index),
        door,
        stairs,
        footprintCells,
        interior: {
            floorCount: stories,
            floorHeightVoxels: source.interior?.floor_height_voxels || 4,
            wallHeightVoxels: source.interior?.wall_height_voxels || 3,
            hasStairs: Boolean(source.interior?.has_stairs || stairs.length)
        },
        floors,
        roofStyle: source.roof_style,
        sourceColors: {
            wall: source.color,
            roof: source.roof_color
        }
    };
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
        building.stairs = createStairFlightsForBuilding(
            building.width,
            building.height,
            building.door,
            building.style,
            building.stories
        );
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

function ensureMatrixDoorApproaches(rows, buildings, profile) {
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
    }
    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
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
        const approachScore = isDoorApproachSymbol(outsideSymbol) ? 160 : isSoftCarvableApproach(outsideSymbol) ? 60 : -180;
        const roadScore = countNeighbors(mutable, outsideCol, outsideRow, (symbol) => isRoadSymbol(symbol)) * 24;
        const wallPenalty = countNeighbors(mutable, outsideCol, outsideRow, (symbol) => isWallSymbol(symbol)) * 32;
        const score = approachScore + roadScore - wallPenalty - originalDistance * 1.5 - centerDistance;
        if (!best || score > best.score) best = { ...candidate, score };
    }

    if (best) return { x: best.x, y: best.y };
    const fallback = candidates.find((candidate) => {
        const direction = getEdgeDirection(candidate.edge);
        const worldDoorX = building.x + candidate.x;
        const worldDoorY = building.y + candidate.y;
        const worldOutsideX = worldDoorX + direction.x;
        const worldOutsideY = worldDoorY + direction.y;
        return !isInsideOtherBuildingFootprint(building, buildings, worldDoorX, worldDoorY) &&
            !isInsideOtherBuildingFootprint(building, buildings, worldOutsideX, worldOutsideY);
    });
    if (fallback) return { x: fallback.x, y: fallback.y };
    return getCenteredDoor(building.width, building.height, profile.cityLike ? 'south' : 'north');
}

function isInsideOtherBuildingFootprint(building, buildings, worldX, worldY) {
    return buildings.some((other) => other !== building &&
        worldX >= other.x &&
        worldX < other.x + other.width &&
        worldY >= other.y &&
        worldY < other.y + other.height
    );
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
        if (selected.length >= MAX_RUNTIME_BUILDINGS) return;
        if (selectedIds.has(building.id)) continue;
        const x = building.x + offsetX;
        const y = building.y + offsetY;
        if (!canReserveRect(occupied, x, y, building.width, building.height, padding)) continue;
        reserveRect(occupied, x, y, building.width, building.height, padding);
        selected.push(building);
        selectedIds.add(building.id);
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

function getMatrixFootprintCells(source, sourceRect, scaledRect) {
    const cells = new Map();
    for (const floor of source.floors || []) {
        if (floor.level !== 0) continue;
        for (const room of floor.rooms || []) {
            for (const tile of room.tiles || []) {
                const local = toLocalMatrixPoint(tile, sourceRect, scaledRect);
                if (local) cells.set(`${local[0]},${local[1]}`, { x: local[0], y: local[1] });
            }
        }
    }
    if (cells.size > 0) return [...cells.values()];
    const fallback = [];
    for (let y = 0; y < scaledRect.height; y++) {
        for (let x = 0; x < scaledRect.width; x++) fallback.push({ x, y });
    }
    return fallback;
}

function getMatrixDoor(source, scaledRect, doorGrid) {
    const local = toLocalMatrixPoint(doorGrid, source.grid_rect, scaledRect) || [0, 0];
    const explicitDoor = (source.floors || [])
        .flatMap((floor) => floor.rooms || [])
        .flatMap((room) => room.doors || [])
        .find((door) => door.kind === 'exterior');
    const explicitLocal = toLocalMatrixPoint(explicitDoor?.grid, source.grid_rect, scaledRect);
    const x = clamp(explicitLocal?.[0] ?? local[0], 0, scaledRect.width - 1);
    const y = clamp(explicitLocal?.[1] ?? local[1], 0, scaledRect.height - 1);
    return {
        x,
        y,
        edge: explicitDoor?.direction || getDoorEdge(scaledRect.width, scaledRect.height, { x, y })
    };
}

function getMatrixBuildingStairs(source, scaledRect, door, style, stories) {
    const stairs = [];
    const seen = new Set();
    for (const floor of source.floors || []) {
        if (!floor.stairs?.grid) continue;
        const local = toLocalMatrixPoint(floor.stairs.grid, source.grid_rect, scaledRect);
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
    if (stairs.length > 0) return stairs.slice(0, Math.max(0, stories - 1));
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
    return 0;
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
