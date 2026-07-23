#!/usr/bin/env node

// Partial chunk baker — coordinate-driven, NO burg/town data traversal.
//
// Bakes ONE 3x3-chunk core (3 x TERRAIN_WFC_CHUNK_SIZE = 24x24 sample cells) centered on a world
// coordinate and MERGES it into client/src/data/BakedChunkData.js. Run it again with different
// coordinates to bake additional cores incrementally; existing baked cells are preserved.
//
//   node tools/bake_partial_chunks.mjs                       # bake the default spawn view core
//   node tools/bake_partial_chunks.mjs --world-x 161 --world-y 306
//   node tools/bake_partial_chunks.mjs --reset               # start from an empty registry
//
// Only the core terrain (tile id + elevation per global grid cell) is baked — a few KB per core
// instead of the old full-town voxel dumps. The runtime terrain WFC welds baked cores into the
// live generated world by injecting them as fixed, pre-collapsed cells
// (see GeographicWFCGenerator.getBakedPartialCell), so the surrounding wave propagates around
// the baked city core exactly like any other fixed constraint.
//
// Determinism contract: the bake calls the exact same createGeographicWorldPlan the clients run,
// so a baked core equals what runtime generation would have produced — baking only removes the
// city-core solve cost and pins the persistent shared world.

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    createGeographicWorldPlan,
    TERRAIN_WFC_CHUNK_SIZE,
    WORLD_SAMPLE_SCALE
} from '../client/src/data/GeographicWFCGenerator.js';
import { ACTIVE_WORLD } from '../client/src/data/ActiveWorldData.js';
import { getDefaultWorldLocation } from '../client/src/data/FantasyWorldData.js';
import { BAKED_PARTIAL_CHUNKS } from '../client/src/data/BakedChunkData.js';
import { GEOGRAPHIC_TILES } from '../client/src/data/WorldTileSet.js';
import {
    PARTIAL_CHUNK_SCHEMA,
    PARTIAL_CHUNK_SCHEMA_VERSION,
    createWorldSampleKey,
    validatePartialChunkRegistry
} from '../client/src/data/PartialChunkRegistry.js';

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(__filename), '..');
const OUTPUT_MODULE = path.join(REPO_ROOT, 'client', 'src', 'data', 'BakedChunkData.js');
const CORE_CHUNK_WINDOW = 3;

function readArg(name) {
    const index = process.argv.indexOf(name);
    return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
    const reset = process.argv.includes('--reset');
    const defaultLocation = getDefaultWorldLocation();
    const anchor = {
        x: Number(readArg('--world-x') ?? defaultLocation.x),
        y: Number(readArg('--world-y') ?? defaultLocation.y)
    };
    if (!Number.isFinite(anchor.x) || !Number.isFinite(anchor.y)) {
        throw new Error('Partial chunk anchor coordinates must be finite numbers.');
    }

    const started = Date.now();
    const plan = createGeographicWorldPlan({
        worldX: anchor.x,
        worldY: anchor.y,
        includeTerrainSnapshot: true,
        // A reset must be a clean solve from the active FMG constraints. Reusing the currently
        // generated registry here would recursively preserve stale cells from an older map.
        useBakedPartialChunks: false
    });
    if (!Array.isArray(plan.terrainTileIds)) {
        throw new Error('Plan did not include a terrain snapshot; cannot bake.');
    }

    const halfSpan = Math.floor((CORE_CHUNK_WINDOW * TERRAIN_WFC_CHUNK_SIZE) / 2);
    const offsetX = Math.floor(plan.width / 2);
    const offsetY = Math.floor(plan.height / 2);
    const existingStatus = validatePartialChunkRegistry(BAKED_PARTIAL_CHUNKS, {
        generationVersion: ACTIVE_WORLD.generationVersion,
        worldContentHash: ACTIVE_WORLD.contentHash,
        sampleScale: WORLD_SAMPLE_SCALE,
        chunkSize: TERRAIN_WFC_CHUNK_SIZE,
        allowedTileIds: new Set(GEOGRAPHIC_TILES.map((tile) => tile.id))
    });
    const mergeExisting = !reset && existingStatus.compatible;
    const cells = mergeExisting ? { ...(BAKED_PARTIAL_CHUNKS.cells || {}) } : {};
    const anchors = mergeExisting
        ? (BAKED_PARTIAL_CHUNKS.anchors || []).map((entry) => ({ ...entry }))
        : [];
    let bakedCells = 0;
    for (let row = offsetY - halfSpan; row < offsetY + halfSpan; row++) {
        for (let col = offsetX - halfSpan; col < offsetX + halfSpan; col++) {
            if (row < 0 || col < 0 || row >= plan.height || col >= plan.width) continue;
            const tileId = plan.terrainTileIds[row * plan.width + col];
            if (!tileId) continue;
            const globalX = plan.world.sampleCenterX + (col - offsetX) * WORLD_SAMPLE_SCALE;
            const globalY = plan.world.sampleCenterY + (row - offsetY) * WORLD_SAMPLE_SCALE;
            const key = createWorldSampleKey(globalX, globalY, WORLD_SAMPLE_SCALE);
            cells[key] = [tileId, plan.elevationRows[row][col]];
            bakedCells++;
        }
    }

    const anchorKey = createWorldSampleKey(anchor.x, anchor.y, WORLD_SAMPLE_SCALE);
    const nextAnchor = {
        key: anchorKey,
        worldX: anchor.x,
        worldY: anchor.y,
        cellCount: bakedCells
    };
    const existingAnchorIndex = anchors.findIndex((entry) => entry.key === anchorKey);
    if (existingAnchorIndex >= 0) anchors[existingAnchorIndex] = nextAnchor;
    else anchors.push(nextAnchor);
    anchors.sort((left, right) => left.key.localeCompare(right.key));

    const orderedCells = Object.fromEntries(Object.entries(cells).sort(([left], [right]) => (
        compareCellKeys(left, right)
    )));
    const payload = {
        schema: PARTIAL_CHUNK_SCHEMA,
        schemaVersion: PARTIAL_CHUNK_SCHEMA_VERSION,
        generationVersion: ACTIVE_WORLD.generationVersion,
        worldContentHash: ACTIVE_WORLD.contentHash,
        sampleScale: WORLD_SAMPLE_SCALE,
        chunkSize: TERRAIN_WFC_CHUNK_SIZE,
        coreChunkWindow: CORE_CHUNK_WINDOW,
        bakedSettlements: anchors.length,
        anchors,
        cells: orderedCells
    };
    const validation = validatePartialChunkRegistry(payload, {
        generationVersion: ACTIVE_WORLD.generationVersion,
        worldContentHash: ACTIVE_WORLD.contentHash,
        sampleScale: WORLD_SAMPLE_SCALE,
        chunkSize: TERRAIN_WFC_CHUNK_SIZE,
        allowedTileIds: new Set(GEOGRAPHIC_TILES.map((tile) => tile.id))
    });
    if (!validation.compatible) {
        throw new Error(
            `Generated partial chunk registry is invalid:\n${[
                ...validation.errors,
                ...validation.compatibilityErrors
            ].join('\n')}`
        );
    }
    const source = '// Generated by tools/bake_partial_chunks.mjs. Do not edit by hand.\n' +
        '//\n' +
        '// Partial baked chunks: 3x3-chunk cores pre-collapsed on the global sample grid; the\n' +
        '// runtime terrain WFC injects them as fixed cells and generates the rest of the world\n' +
        '// around them (see GeographicWFCGenerator.getBakedPartialCell).\n' +
        `export const BAKED_PARTIAL_CHUNKS = ${JSON.stringify(payload)};\n`;
    await writeFile(OUTPUT_MODULE, source, 'utf8');

    console.log(JSON.stringify({
        ok: true,
        outputModule: path.relative(REPO_ROOT, OUTPUT_MODULE),
        anchor,
        bakedCellsThisRun: bakedCells,
        totalBakedCells: Object.keys(orderedCells).length,
        bakedSettlements: anchors.length,
        reset,
        mergedExistingRegistry: mergeExisting,
        discardedStaleRegistry: !reset && !mergeExisting && Boolean(Object.keys(BAKED_PARTIAL_CHUNKS.cells || {}).length),
        generationVersion: ACTIVE_WORLD.generationVersion,
        worldContentHash: ACTIVE_WORLD.contentHash,
        coreChunkWindow: CORE_CHUNK_WINDOW,
        chunkSize: TERRAIN_WFC_CHUNK_SIZE,
        elapsedMs: Date.now() - started
    }, null, 2));
}

function compareCellKeys(left, right) {
    const [leftX, leftY] = left.split(':').map(Number);
    const [rightX, rightY] = right.split(':').map(Number);
    return leftY - rightY || leftX - rightX;
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
