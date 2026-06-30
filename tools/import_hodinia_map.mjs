#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE = '/Users/lx/Downloads/Hodinia vibe-game-map 2026-06-29-23-06';
const OUTPUT_MODULE = path.join(REPO_ROOT, 'client', 'src', 'data', 'HodiniaWorldData.js');
const OUTPUT_ASSET_DIR = path.join(REPO_ROOT, 'client', 'public', 'assets', 'maps');
const OUTPUT_ASSET = path.join(OUTPUT_ASSET_DIR, 'hodinia-world-map.png');
const ASSET_PUBLIC_PATH = '/assets/maps/hodinia-world-map.png';
const MAX_TOWN_WIDTH = 80;
const MAX_TOWN_HEIGHT = 60;

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
    const routes = createRoutePayload(world.world.routes || []);
    const heightSamples = createHeightSamples(world.world.cells || []);
    const output = {
        world: {
            id: slugify(world.metadata.map_name || manifest.map_name || 'hodinia'),
            name: world.metadata.map_name || manifest.map_name || 'Hodinia',
            seed: Number(world.metadata.seed || manifest.seed || 0),
            width: world.world.width,
            height: world.world.height,
            source: manifest.source,
            exportedAt: manifest.exported_at,
            image: {
                src: ASSET_PUBLIC_PATH,
                width: world.image.width,
                height: world.image.height,
                coordinateSpace: world.image.coordinate_space,
                sourceFile: manifest.files.image
            },
            locations,
            routes,
            heightSamples
        },
        towns: Object.fromEntries(towns.map((town) => [town.location.id, town.town]))
    };

    await mkdir(OUTPUT_ASSET_DIR, { recursive: true });
    const imageBuffer = await readFile(path.join(sourceDir, manifest.files.image));
    await writeFile(OUTPUT_ASSET, imageBuffer);
    await writeModule(output);

    console.log(JSON.stringify({
        ok: true,
        sourceDir,
        outputModule: path.relative(REPO_ROOT, OUTPUT_MODULE),
        outputAsset: path.relative(REPO_ROOT, OUTPUT_ASSET),
        towns: towns.length,
        routes: routes.length
    }, null, 2));
}

function createCompactTown(burg, town, file) {
    const width = Math.min(MAX_TOWN_WIDTH, town.grid.width);
    const height = Math.min(MAX_TOWN_HEIGHT, town.grid.height);
    const rows = createTerrainRows(town, width, height);
    overlayCells(rows, town.farms, 'F');
    overlayCells(rows, town.streets, (street) => street.type === 'DOCK' ? 'R' : 'R');
    overlayCells(rows, town.walls, 'X');

    const buildings = (town.buildings || [])
        .filter((building) => building.grid_rect)
        .map((building, index) => createBuildingBlueprint(building, town, width, height, index))
        .filter(Boolean);

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
                doodads: town.doodads?.length || 0
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
            rows,
            buildings,
            connections: town.connections,
            worldCenter: town.grid.center,
            origin: town.grid.origin,
            tileSizeMapUnits: town.grid.tile_size_map_units,
            stats: {
                tiles: town.tiles?.length || 0,
                streets: town.streets?.length || 0,
                buildings: town.buildings?.length || 0,
                walls: town.walls?.length || 0,
                farms: town.farms?.length || 0,
                doodads: town.doodads?.length || 0
            }
        }
    };
}

function createTerrainRows(town, width, height) {
    const mutable = Array.from({ length: height }, () => Array.from({ length: width }, () => 'G'));
    for (const tile of town.tiles || []) {
        if (!isInside(tile.x, tile.y, width, height)) continue;
        mutable[tile.y][tile.x] = terrainTileToSymbol(tile);
    }
    return mutable.map((row) => row.join(''));
}

function terrainTileToSymbol(tile) {
    switch (tile.type) {
        case 'WATER_DEEP':
            return 'W';
        case 'WATER_SHALLOW':
            return 'B';
        case 'SAND':
            return 'S';
        case 'MUD':
        case 'DIRT':
            return 'S';
        case 'ROAD_DIRT':
        case 'ROAD_MAIN':
        case 'DOCK':
            return 'R';
        case 'FARM':
            return 'F';
        case 'BUILDING_FLOOR':
            return 'E';
        case 'WALL':
            return 'X';
        case 'GRASS':
        default:
            return elevationToGroundSymbol(tile.elevation);
    }
}

function elevationToGroundSymbol(elevation) {
    const value = Number(elevation);
    if (!Number.isFinite(value)) return 'G';
    if (value >= 0.78) return 'M';
    if (value >= 0.63) return 'H';
    return 'G';
}

function overlayCells(rows, cells = [], symbolOrFactory) {
    const mutable = rows.map((row) => row.split(''));
    for (const cell of cells || []) {
        if (!isInside(cell.x, cell.y, mutable[0].length, mutable.length)) continue;
        mutable[cell.y][cell.x] = typeof symbolOrFactory === 'function'
            ? symbolOrFactory(cell)
            : symbolOrFactory;
    }
    rows.splice(0, rows.length, ...mutable.map((row) => row.join('')));
}

function createBuildingBlueprint(source, town, width, height, index) {
    const rect = source.grid_rect;
    if (!rect || rect.width < 2 || rect.height < 2) return null;
    if (!isInside(rect.x, rect.y, width, height)) return null;
    const clampedWidth = Math.min(rect.width, width - rect.x);
    const clampedHeight = Math.min(rect.height, height - rect.y);
    if (clampedWidth < 2 || clampedHeight < 2) return null;

    const doorGrid = source.door?.grid || [rect.x + Math.floor(clampedWidth / 2), rect.y + clampedHeight - 1];
    const door = {
        x: clamp(Math.round(doorGrid[0] - rect.x), 0, clampedWidth - 1),
        y: clamp(Math.round(doorGrid[1] - rect.y), 0, clampedHeight - 1)
    };
    const style = source.wall_texture === 'WOOD' ? 'timber' : 'stone';
    const stories = getBuildingStories(source.type, clampedWidth, clampedHeight);
    const stairs = stories > 1 && clampedWidth >= 4 && clampedHeight >= 4
        ? [createStairsForBuilding(clampedWidth, clampedHeight, door, style)]
        : [];

    return {
        id: `${town.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${source.id || `building-${index}`}`,
        name: `${titleCase(source.type)} ${index + 1}`,
        sourceType: source.type,
        x: rect.x - Math.floor(width / 2),
        y: rect.y - Math.floor(height / 2),
        width: clampedWidth,
        height: clampedHeight,
        stories,
        style,
        doorStyle: getDoorStyle(source.type, index),
        door,
        stairs
    };
}

function createStairsForBuilding(width, height, door, style) {
    const doorEdge = getDoorEdge(width, height, door);
    const direction = doorEdge === 'north' ? 'south'
        : doorEdge === 'south' ? 'north'
            : doorEdge === 'west' ? 'east'
                : 'west';
    const x = doorEdge === 'west' ? width - 2
        : doorEdge === 'east' ? 1
            : door.x <= width / 2 ? width - 2 : 1;
    const y = doorEdge === 'north' ? height - 2
        : doorEdge === 'south' ? 1
            : door.y <= height / 2 ? height - 2 : 1;
    return {
        x: clamp(x, 1, width - 2),
        y: clamp(y, 1, height - 2),
        direction,
        style
    };
}

function getDoorEdge(width, height, door) {
    if (door.y === 0) return 'north';
    if (door.y === height - 1) return 'south';
    if (door.x === 0) return 'west';
    if (door.x === width - 1) return 'east';
    return 'south';
}

function getBuildingStories(type, width, height) {
    if (type === 'TOWER' || type === 'CHURCH' || type === 'MANOR') return 3;
    if (type === 'TAVERN' || type === 'BLACKSMITH' || type === 'HOUSE_LARGE') return 2;
    if (width >= 5 && height >= 5) return 2;
    return 1;
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
    for (let index = step; index < points.length - 1; index += step) {
        simplified.push(points[index]);
    }
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
    const source = `// Generated by tools/import_hodinia_map.mjs. Do not edit by hand.\n\n` +
        `export const HODINIA_WORLD = ${JSON.stringify(payload.world, null, 2)};\n\n` +
        `export const HODINIA_TOWNS = ${JSON.stringify(payload.towns, null, 2)};\n`;
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
    return Math.max(min, Math.min(max, value));
}

function slugify(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'hodinia';
}

function titleCase(value) {
    return String(value || 'Building')
        .toLowerCase()
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
