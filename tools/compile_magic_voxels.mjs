#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    createFantasyWorldRowsAt,
    FANTASY_WORLD,
    getWorldMapLocations,
    MAP_CHUNK_SIZE
} from '../client/src/data/MapData.js';
import {
    BUILDING_PARTS,
    createVoxelMatrix
} from '../client/src/data/TileLibrary.js';
import {
    ELEMENTS,
    getTileDefinition
} from '../client/src/data/TileRegistry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const CHUNK_SIZE_X = MAP_CHUNK_SIZE || 16;
const CHUNK_SIZE_Y = MAP_CHUNK_SIZE || 16;
const CHUNK_SIZE_Z = 256;
const CHUNK_VOLUME = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z;
const HEIGHTMAP_SCALE = 65535;
const DEFAULT_WINDOW_WIDTH = 64;
const DEFAULT_WINDOW_HEIGHT = 48;

export const ELEMENTAL_BITS = Object.freeze({
    FIRE: 1 << 0,
    WATER: 1 << 1,
    EARTH: 1 << 2,
    WIND: 1 << 3,
    HOLY: 1 << 4,
    DARK: 1 << 5
});

export const METADATA_FLAGS = Object.freeze({
    SOLID: 1 << 0,
    WALKABLE_SURFACE: 1 << 1,
    LIQUID: 1 << 2,
    STAIR_CONNECTOR: 1 << 3,
    INTERIOR: 1 << 4,
    ROOF: 1 << 5,
    OBSTRUCTION_HIDING: 1 << 6,
    RESERVED: 1 << 7
});

const MAGIC_VOXEL_SPEC = Object.freeze({
    schema: 'magic-voxel-spec-v1',
    chunkDimensions: {
        x: CHUNK_SIZE_X,
        y: CHUNK_SIZE_Y,
        z: CHUNK_SIZE_Z
    },
    indexFormula: '((localY * 16) + localX) * 256 + z',
    buffers: {
        blockId: {
            type: 'Uint16Array',
            bytesPerVoxel: 2,
            description: 'Structural and visual block assignment. 0 is air; non-zero ids resolve through blockRegistry.'
        },
        elementalMatrix: {
            type: 'Uint8Array',
            bytesPerVoxel: 1,
            bits: ELEMENTAL_BITS,
            description: 'Localized magic traits packed into Fire, Water, Earth, Wind, Holy, and Dark bit masks.'
        },
        metadataFlags: {
            type: 'Uint8Array',
            bytesPerVoxel: 1,
            bits: METADATA_FLAGS,
            description: 'Physical and runtime-render flags. OBSTRUCTION_HIDING marks upper layers that can cull when an entity enters lower bounds.'
        }
    },
    serialization: {
        encoding: 'base64',
        endian: 'little',
        denseChunkBytes: CHUNK_VOLUME * 4
    }
});

function parseArgs(argv) {
    const options = {
        outDir: path.join(REPO_ROOT, 'shared', 'magic-voxels'),
        width: DEFAULT_WINDOW_WIDTH,
        height: DEFAULT_WINDOW_HEIGHT,
        mode: 'default-burg',
        burgId: null,
        worldX: null,
        worldY: null
    };

    for (let index = 0; index < argv.length; index++) {
        const arg = argv[index];
        const next = () => argv[++index];

        if (arg === '--out') options.outDir = path.resolve(REPO_ROOT, next());
        else if (arg === '--width') options.width = clampInteger(next(), DEFAULT_WINDOW_WIDTH, 16, 512);
        else if (arg === '--height') options.height = clampInteger(next(), DEFAULT_WINDOW_HEIGHT, 16, 512);
        else if (arg === '--world-x') {
            options.worldX = clampInteger(next(), 0, 0, FANTASY_WORLD.width - 1);
            options.mode = 'coordinate';
        } else if (arg === '--world-y') {
            options.worldY = clampInteger(next(), 0, 0, FANTASY_WORLD.height - 1);
            options.mode = 'coordinate';
        } else if (arg === '--burg') {
            options.burgId = String(next() || '').trim();
            options.mode = 'burg';
        } else if (arg === '--all-burgs') {
            options.mode = 'all-burgs';
        } else if (arg === '--help' || arg === '-h') {
            options.help = true;
        } else {
            throw new Error(`Unknown argument: ${arg}`);
        }
    }

    if (options.mode === 'coordinate' && (!Number.isFinite(options.worldX) || !Number.isFinite(options.worldY))) {
        throw new Error('Coordinate mode requires --world-x and --world-y.');
    }

    return options;
}

function printHelp() {
    console.log(`
Magic Voxel compiler

Usage:
  node tools/compile_magic_voxels.mjs [options]

Options:
  --out <dir>          Output directory. Default: shared/magic-voxels
  --width <tiles>      Local window width. Default: 64
  --height <tiles>     Local window height. Default: 48
  --burg <id>          Compile a window centered on one burg.
  --all-burgs          Compile one local window for every burg in the static fantasy map.
  --world-x <coord>    Compile a window centered on an explicit world x coordinate.
  --world-y <coord>    Compile a window centered on an explicit world y coordinate.
`);
}

export async function main(argv = process.argv.slice(2)) {
    const options = parseArgs(argv);
    if (options.help) {
        printHelp();
        return;
    }

    const layout = createStandardLayoutPayload();
    const templates = selectVillageTemplates(layout, options);

    await mkdir(options.outDir, { recursive: true });
    const layoutPath = path.join(options.outDir, 'layout.magic-voxel.json');
    await writeJson(layoutPath, layout);

    const windows = [];
    for (const template of templates) {
        const compiled = await compileVillageWindow(template, layout, options);
        const windowDir = path.join(options.outDir, 'chunks', compiled.window.id);
        await mkdir(windowDir, { recursive: true });

        const chunkSummaries = [];
        for (const chunk of compiled.chunks) {
            const fileName = `chunk_${chunk.chunk.x}_${chunk.chunk.y}.magic-voxel.json`;
            const chunkPath = path.join(windowDir, fileName);
            await writeJson(chunkPath, chunk);
            chunkSummaries.push({
                chunkX: chunk.chunk.x,
                chunkY: chunk.chunk.y,
                file: path.relative(options.outDir, chunkPath),
                nonAirVoxels: chunk.stats.nonAirVoxels,
                obstructionHidingVoxels: chunk.stats.obstructionHidingVoxels
            });
        }

        windows.push({
            ...compiled.window,
            chunks: chunkSummaries
        });
    }

    const manifest = {
        schema: 'magic-voxel-manifest-v1',
        generatedAt: new Date().toISOString(),
        spec: MAGIC_VOXEL_SPEC,
        layout: path.relative(options.outDir, layoutPath),
        windows
    };
    const manifestPath = path.join(options.outDir, 'manifest.magic-voxel.json');
    await writeJson(manifestPath, manifest);

    console.log(JSON.stringify({
        ok: true,
        outDir: path.relative(REPO_ROOT, options.outDir),
        layout: path.relative(REPO_ROOT, layoutPath),
        manifest: path.relative(REPO_ROOT, manifestPath),
        windows: windows.length,
        chunks: windows.reduce((count, window) => count + window.chunks.length, 0)
    }, null, 2));
}

export function createStandardLayoutPayload() {
    const heightmap = createWorldHeightmap(FANTASY_WORLD.width, FANTASY_WORLD.height, FANTASY_WORLD.seed);
    const burgs = getWorldMapLocations().map((location) => ({
        id: location.id,
        name: location.name,
        type: location.type,
        x: location.x,
        y: location.y,
        population: location.population,
        culture: location.culture,
        chunkX: Math.floor(location.x / CHUNK_SIZE_X),
        chunkY: Math.floor(location.y / CHUNK_SIZE_Y)
    }));

    return {
        schema: 'magic-voxel-layout-v1',
        spec: MAGIC_VOXEL_SPEC,
        world: {
            id: FANTASY_WORLD.id,
            name: FANTASY_WORLD.name,
            seed: FANTASY_WORLD.seed,
            width: FANTASY_WORLD.width,
            height: FANTASY_WORLD.height,
            coordinateSystem: {
                worldX: 'east-positive integer map coordinate',
                worldY: 'south-positive integer map coordinate',
                localX: 'window-relative tile coordinate',
                localY: 'window-relative tile coordinate',
                voxelZ: 'vertical block coordinate, 0 through 255'
            }
        },
        macroContinentalLayout: {
            source: 'static-fmg-test-world',
            description: 'Frozen fantasy-map-generator-style test world converted into deterministic Magic Voxel windows.',
            seaLevel: 0.12,
            mapScale: '1 world coordinate = 1 local tile before chunking'
        },
        heightmap: {
            width: FANTASY_WORLD.width,
            height: FANTASY_WORLD.height,
            type: 'Uint16Array',
            scale: HEIGHTMAP_SCALE,
            min: heightmap.min,
            max: heightmap.max,
            encoding: 'base64',
            data: encodeTypedArray(heightmap.values)
        },
        burgs,
        routes: FANTASY_WORLD.routes.map((route) => {
            if (Array.isArray(route)) return { from: route[0], to: route[1] };
            return {
                id: route.id,
                kind: route.kind,
                points: route.points
            };
        })
    };
}

export function selectVillageTemplates(layout, options) {
    const burgs = layout.burgs;
    if (options.mode === 'coordinate') {
        return [createVillageTemplateFromLayout(layout, {
            id: `world-${options.worldX}-${options.worldY}`,
            name: `World ${options.worldX}, ${options.worldY}`,
            type: 'coordinate',
            x: options.worldX,
            y: options.worldY,
            population: 0,
            culture: 'wild'
        }, options)];
    }

    if (options.mode === 'all-burgs') {
        return burgs.map((burg) => createVillageTemplateFromLayout(layout, burg, options));
    }

    if (options.mode === 'burg') {
        const burg = burgs.find((candidate) => candidate.id === options.burgId);
        if (!burg) throw new Error(`Unknown burg id: ${options.burgId}`);
        return [createVillageTemplateFromLayout(layout, burg, options)];
    }

    const capital = burgs.find((burg) => burg.type === 'capital') || burgs[0];
    return [createVillageTemplateFromLayout(layout, capital, options)];
}

export function createVillageTemplateFromLayout(layout, burg, options = {}) {
    const width = clampInteger(options.width, DEFAULT_WINDOW_WIDTH, CHUNK_SIZE_X, 512);
    const height = clampInteger(options.height, DEFAULT_WINDOW_HEIGHT, CHUNK_SIZE_Y, 512);
    const centerX = clampInteger(burg.x, 0, 0, layout.world.width - 1);
    const centerY = clampInteger(burg.y, 0, 0, layout.world.height - 1);
    const originX = centerX - Math.floor(width / 2);
    const originY = centerY - Math.floor(height / 2);

    return {
        schema: 'magic-voxel-village-template-v1',
        id: slugify(`${burg.id}-${centerX}-${centerY}`),
        burg,
        sourceLayout: layout.world.id,
        width,
        height,
        center: { x: centerX, y: centerY },
        origin: { x: originX, y: originY },
        scale: {
            worldToLocal: 1,
            localToVoxel: 1,
            chunkSize: CHUNK_SIZE_X,
            verticalLimit: CHUNK_SIZE_Z
        }
    };
}

export async function compileVillageWindow(template, layout, options = {}) {
    assertLayoutPayload(layout);
    const tileRows = createFantasyWorldRowsAt(template.center.x, template.center.y, {
        width: template.width,
        height: template.height
    });
    const matrix = createVoxelMatrix(tileRows);
    const blockRegistry = createBlockRegistry();
    const chunkMap = new Map();

    for (let localY = 0; localY < matrix.height; localY++) {
        for (let localX = 0; localX < matrix.width; localX++) {
            const column = matrix.columns[localY]?.[localX] || [];
            const topZ = column.reduce((value, block) => Math.max(value, block.z), 0);
            const worldX = template.origin.x + localX;
            const worldY = template.origin.y + localY;
            const chunkX = Math.floor(worldX / CHUNK_SIZE_X);
            const chunkY = Math.floor(worldY / CHUNK_SIZE_Y);
            const chunk = getOrCreateChunk(chunkMap, chunkX, chunkY, layout, template, blockRegistry);
            const chunkLocalX = positiveModulo(worldX, CHUNK_SIZE_X);
            const chunkLocalY = positiveModulo(worldY, CHUNK_SIZE_Y);

            for (const block of column) {
                if (block.z < 0 || block.z >= CHUNK_SIZE_Z) {
                    throw new Error(`Voxel z ${block.z} exceeds Magic Voxel chunk height at ${worldX},${worldY}.`);
                }
                const offset = getChunkOffset(chunkLocalX, chunkLocalY, block.z);
                const blockId = blockRegistry.getId(block);
                chunk.blockIds[offset] = blockId;
                chunk.elementalMatrix[offset] = getElementalMask(block, worldX, worldY, layout);
                chunk.metadataFlags[offset] = getMetadataFlags(block, topZ);
            }
        }
    }

    const chunks = [...chunkMap.values()]
        .sort((a, b) => a.chunk.y - b.chunk.y || a.chunk.x - b.chunk.x)
        .map((chunk) => serializeChunk(chunk, blockRegistry));

    return {
        window: {
            schema: 'magic-voxel-window-v1',
            id: template.id,
            burgId: template.burg.id,
            name: template.burg.name,
            centerWorld: template.center,
            originWorld: template.origin,
            width: matrix.width,
            height: matrix.height,
            sourceGenerator: tileRows.generator || 'fantasy-world-data',
            decorations: (tileRows.decorations || []).length,
            buildings: (tileRows.buildings || []).map((building) => ({
                id: building.id,
                name: building.name,
                x: building.x,
                y: building.y,
                width: building.width,
                height: building.height,
                stories: building.stories,
                style: building.style,
                door: building.door,
                stairs: building.stairs || []
            }))
        },
        chunks
    };
}

function assertLayoutPayload(layout) {
    if (!layout || layout.schema !== 'magic-voxel-layout-v1') {
        throw new Error('Village generator expected a magic-voxel-layout-v1 payload.');
    }
    if (!layout.world || !Number.isFinite(layout.world.width) || !Number.isFinite(layout.world.height)) {
        throw new Error('Layout payload is missing world dimensions.');
    }
    if (!Array.isArray(layout.burgs)) {
        throw new Error('Layout payload is missing burg coordinates.');
    }
}

function createBlockRegistry() {
    const entries = [{
        id: 0,
        key: 'air',
        element: ELEMENTS.VOID,
        texture: 0,
        building: BUILDING_PARTS.NONE,
        label: 'Air',
        walkable: false,
        pattern: 'air'
    }];
    const idByKey = new Map([['air', 0]]);

    return {
        getId(block) {
            const key = `${block.element}:${block.textureValue ?? block.texture ?? 0}:${block.building ?? 0}`;
            if (idByKey.has(key)) return idByKey.get(key);
            const id = entries.length;
            if (id > 65535) throw new Error('Magic Voxel block registry exceeded uint16 capacity.');
            const texture = block.textureValue ?? block.texture ?? 0;
            const definition = getTileDefinition(block.element, texture);
            idByKey.set(key, id);
            entries.push({
                id,
                key,
                element: block.element,
                texture,
                building: block.building ?? BUILDING_PARTS.NONE,
                label: definition.label,
                walkable: Boolean(definition.walkable),
                pattern: definition.pattern
            });
            return id;
        },
        toJSON() {
            return entries;
        }
    };
}

function getOrCreateChunk(chunkMap, chunkX, chunkY, layout, template, blockRegistry) {
    const key = `${chunkX},${chunkY}`;
    if (chunkMap.has(key)) return chunkMap.get(key);

    const chunk = {
        schema: 'magic-voxel-chunk-v1',
        chunk: {
            x: chunkX,
            y: chunkY,
            z: 0,
            width: CHUNK_SIZE_X,
            depth: CHUNK_SIZE_Y,
            height: CHUNK_SIZE_Z,
            originWorldX: chunkX * CHUNK_SIZE_X,
            originWorldY: chunkY * CHUNK_SIZE_Y,
            originWorldZ: 0
        },
        source: {
            worldId: layout.world.id,
            windowId: template.id,
            burgId: template.burg.id
        },
        blockIds: new Uint16Array(CHUNK_VOLUME),
        elementalMatrix: new Uint8Array(CHUNK_VOLUME),
        metadataFlags: new Uint8Array(CHUNK_VOLUME),
        blockRegistry
    };
    chunkMap.set(key, chunk);
    return chunk;
}

function serializeChunk(chunk, blockRegistry) {
    let nonAirVoxels = 0;
    let obstructionHidingVoxels = 0;
    for (let index = 0; index < CHUNK_VOLUME; index++) {
        if (chunk.blockIds[index] !== 0) nonAirVoxels++;
        if ((chunk.metadataFlags[index] & METADATA_FLAGS.OBSTRUCTION_HIDING) !== 0) obstructionHidingVoxels++;
    }

    return {
        schema: chunk.schema,
        spec: MAGIC_VOXEL_SPEC,
        chunk: chunk.chunk,
        source: chunk.source,
        stats: {
            nonAirVoxels,
            obstructionHidingVoxels,
            blockRegistrySize: blockRegistry.toJSON().length
        },
        blockRegistry: blockRegistry.toJSON(),
        buffers: {
            blockId: serializeBuffer(chunk.blockIds),
            elementalMatrix: serializeBuffer(chunk.elementalMatrix),
            metadataFlags: serializeBuffer(chunk.metadataFlags)
        }
    };
}

function serializeBuffer(typedArray) {
    return {
        type: typedArray.constructor.name,
        length: typedArray.length,
        byteLength: typedArray.byteLength,
        encoding: 'base64',
        data: encodeTypedArray(typedArray)
    };
}

function encodeTypedArray(typedArray) {
    return Buffer
        .from(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength)
        .toString('base64');
}

function getChunkOffset(localX, localY, z) {
    return ((localY * CHUNK_SIZE_X) + localX) * CHUNK_SIZE_Z + z;
}

function getElementalMask(block, worldX, worldY, layout) {
    let mask = elementToMask(block.element) | elementToMask(block.effect);
    const nearestBurg = getNearestBurg(layout.burgs, worldX, worldY, 24);
    if (nearestBurg && block.element === ELEMENTS.STRUCTURE) {
        if (nearestBurg.type === 'capital') mask |= ELEMENTAL_BITS.HOLY;
        if (nearestBurg.type === 'fortress') mask |= ELEMENTAL_BITS.DARK | ELEMENTAL_BITS.EARTH;
        if (nearestBurg.type === 'mining') mask |= ELEMENTAL_BITS.EARTH;
    }
    if (nearestBurg && ['port', 'harbor'].includes(nearestBurg.type) && block.element === ELEMENTS.HYDRO) {
        mask |= ELEMENTAL_BITS.WATER | ELEMENTAL_BITS.WIND;
    }
    return mask & 0xff;
}

function elementToMask(element) {
    switch (element) {
        case ELEMENTS.PYRO:
            return ELEMENTAL_BITS.FIRE;
        case ELEMENTS.HYDRO:
        case ELEMENTS.CRYO:
            return ELEMENTAL_BITS.WATER;
        case ELEMENTS.GEO:
        case ELEMENTS.STRUCTURE:
            return ELEMENTAL_BITS.EARTH;
        case ELEMENTS.ANEMO:
            return ELEMENTAL_BITS.WIND;
        default:
            return 0;
    }
}

function getMetadataFlags(block, topZ) {
    const texture = block.textureValue ?? block.texture ?? 0;
    const definition = getTileDefinition(block.element, texture);
    const building = block.building ?? BUILDING_PARTS.NONE;
    const isTop = block.z === topZ;
    const isLiquid = block.element === ELEMENTS.HYDRO || block.element === ELEMENTS.PYRO;
    const isStairs = [
        BUILDING_PARTS.STAIRS,
        BUILDING_PARTS.STAIRS_NORTH,
        BUILDING_PARTS.STAIRS_SOUTH,
        BUILDING_PARTS.STAIRS_WEST,
        BUILDING_PARTS.STAIRS_EAST,
        BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
        BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
        BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
        BUILDING_PARTS.CITY_WALL_STAIRS_EAST
    ].includes(building);
    const isInterior = [
        BUILDING_PARTS.DOOR,
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
    ].includes(building);
    const isRoof = building === BUILDING_PARTS.ROOF;
    const canHideAsObstruction = block.z > 0 && (
        block.element === ELEMENTS.STRUCTURE ||
        block.element === ELEMENTS.GEO ||
        block.element === ELEMENTS.CRYO ||
        block.element === ELEMENTS.ANEMO ||
        isRoof
    );

    let flags = METADATA_FLAGS.SOLID;
    if (isTop && definition.walkable) flags |= METADATA_FLAGS.WALKABLE_SURFACE;
    if (isLiquid) flags |= METADATA_FLAGS.LIQUID;
    if (isStairs) flags |= METADATA_FLAGS.STAIR_CONNECTOR;
    if (isInterior) flags |= METADATA_FLAGS.INTERIOR;
    if (isRoof) flags |= METADATA_FLAGS.ROOF;
    if (canHideAsObstruction) flags |= METADATA_FLAGS.OBSTRUCTION_HIDING;
    return flags & 0xff;
}

function getNearestBurg(burgs, worldX, worldY, radius) {
    let nearest = null;
    let bestDistanceSq = radius * radius;
    for (const burg of burgs) {
        const dx = burg.x - worldX;
        const dy = burg.y - worldY;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq <= bestDistanceSq) {
            bestDistanceSq = distanceSq;
            nearest = burg;
        }
    }
    return nearest;
}

function createMacroHeightmap(width, height, seed) {
    const values = new Uint16Array(width * height);
    let min = HEIGHTMAP_SCALE;
    let max = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const value = Math.round(sampleMacroHeight(x, y, width, height, seed) * HEIGHTMAP_SCALE);
            values[y * width + x] = value;
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
    }
    return { values, min, max };
}

function createWorldHeightmap(width, height, seed) {
    if (!Array.isArray(FANTASY_WORLD.heightSamples) || FANTASY_WORLD.heightSamples.length === 0) {
        return createMacroHeightmap(width, height, seed);
    }

    const samples = FANTASY_WORLD.heightSamples
        .map(([x, y, elevation]) => ({
            x: Number(x),
            y: Number(y),
            elevation: clamp(Number(elevation) / 100, 0, 1)
        }))
        .filter((sample) => Number.isFinite(sample.x) && Number.isFinite(sample.y));
    if (samples.length === 0) return createMacroHeightmap(width, height, seed);

    const values = new Uint16Array(width * height);
    let min = HEIGHTMAP_SCALE;
    let max = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const elevation = getNearestHeightSample(samples, x, y);
            const value = Math.round(elevation * HEIGHTMAP_SCALE);
            values[y * width + x] = value;
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
    }

    return { values, min, max };
}

function getNearestHeightSample(samples, x, y) {
    let nearest = samples[0];
    let nearestDistance = Infinity;
    for (const sample of samples) {
        const dx = sample.x - x;
        const dy = sample.y - y;
        const distance = dx * dx + dy * dy;
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = sample;
        }
    }
    return nearest.elevation;
}

function sampleMacroHeight(x, y, width, height, seed) {
    const nx = x / width;
    const ny = y / height;
    const coast = Math.min(nx, ny, 1 - nx, 1 - ny);
    const continental = 1.1 - Math.hypot(nx - 0.54, ny - 0.52) * 1.42;
    const ridge = Math.max(0, 0.17 - Math.abs((nx - 0.62) * 0.72 - (ny - 0.48))) * 3.2;
    const elevation = continental + ridge + smoothNoise(x, y, 0.018, seed) * 0.35;
    const coastFalloff = clamp(coast / 0.075, 0, 1);
    return clamp(((elevation * coastFalloff) + 0.18) / 1.72, 0, 1);
}

function smoothNoise(x, y, scale, seed) {
    return (
        valueNoise(x * scale, y * scale, seed) * 0.55 +
        valueNoise(x * scale * 2.1, y * scale * 2.1, seed + 97) * 0.3 +
        valueNoise(x * scale * 4.6, y * scale * 4.6, seed + 211) * 0.15
    );
}

function valueNoise(x, y, seed) {
    const value = Math.sin((x + seed * 0.013) * 12.9898 + (y - seed * 0.021) * 78.233) * 43758.5453;
    return (value - Math.floor(value)) * 2 - 1;
}

function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
}

function clampInteger(value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, Math.floor(number)));
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'window';
}

async function writeJson(filePath, data) {
    await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
