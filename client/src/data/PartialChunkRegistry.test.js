import assert from 'node:assert/strict';
import test from 'node:test';

import { ACTIVE_WORLD } from './ActiveWorldData.js';
import { BAKED_PARTIAL_CHUNKS } from './BakedChunkData.js';
import { getDefaultWorldLocation } from './FantasyWorldData.js';
import {
    TERRAIN_WFC_CHUNK_SIZE,
    WORLD_SAMPLE_SCALE,
    createGeographicWorldPlan
} from './GeographicWFCGenerator.js';
import {
    createWorldSampleKey,
    validatePartialChunkRegistry
} from './PartialChunkRegistry.js';
import { GEOGRAPHIC_TILES } from './WorldTileSet.js';

const registryOptions = {
    generationVersion: ACTIVE_WORLD.generationVersion,
    worldContentHash: ACTIVE_WORLD.contentHash,
    sampleScale: WORLD_SAMPLE_SCALE,
    chunkSize: TERRAIN_WFC_CHUNK_SIZE,
    allowedTileIds: new Set(GEOGRAPHIC_TILES.map((tile) => tile.id))
};

test('generated partial chunks are source-hashed, strict, and uniquely anchored', () => {
    const result = validatePartialChunkRegistry(BAKED_PARTIAL_CHUNKS, registryOptions);
    assert.equal(result.valid, true, result.errors.join('\n'));
    assert.equal(result.compatible, true, result.compatibilityErrors.join('\n'));
    assert.equal(result.anchorCount, 1);
    assert.equal(result.cellCount, 3 * TERRAIN_WFC_CHUNK_SIZE * 3 * TERRAIN_WFC_CHUNK_SIZE);
    assert.equal(BAKED_PARTIAL_CHUNKS.bakedSettlements, BAKED_PARTIAL_CHUNKS.anchors.length);
    assert.equal(
        new Set(BAKED_PARTIAL_CHUNKS.anchors.map((anchor) => anchor.key)).size,
        BAKED_PARTIAL_CHUNKS.anchors.length
    );
});

test('a partial bake from another world hash is rejected instead of leaking into terrain', () => {
    const stale = {
        ...BAKED_PARTIAL_CHUNKS,
        worldContentHash: '0'.repeat(64)
    };
    const result = validatePartialChunkRegistry(stale, registryOptions);
    assert.equal(result.valid, true);
    assert.equal(result.compatible, false);
    assert.ok(result.compatibilityErrors.some((error) => error.includes('worldContentHash')));
});

test('the active baked core remains fixed after terrain seam repair', () => {
    const location = getDefaultWorldLocation();
    const plan = createGeographicWorldPlan({
        worldX: location.x,
        worldY: location.y,
        includeTerrainSnapshot: true
    });
    const partial = plan.generation.partialBake;
    assert.equal(partial.registryCompatible, true);
    assert.equal(partial.constraintConflicts, 0);
    assert.ok(partial.appliedCells > 0);

    const offsetX = Math.floor(plan.width / 2);
    const offsetY = Math.floor(plan.height / 2);
    let checked = 0;
    for (let row = 0; row < plan.height; row++) {
        for (let col = 0; col < plan.width; col++) {
            const key = createWorldSampleKey(
                plan.world.sampleCenterX + (col - offsetX) * WORLD_SAMPLE_SCALE,
                plan.world.sampleCenterY + (row - offsetY) * WORLD_SAMPLE_SCALE,
                WORLD_SAMPLE_SCALE
            );
            const baked = BAKED_PARTIAL_CHUNKS.cells[key];
            if (!baked) continue;
            checked++;
            assert.equal(plan.terrainTileIds[row * plan.width + col], baked[0], `baked terrain drifted at ${key}`);
        }
    }
    assert.equal(checked, partial.appliedCells);
});

test('sub-tile view jitter snaps to one canonical global sample lattice', () => {
    const location = getDefaultWorldLocation();
    const first = createGeographicWorldPlan({
        worldX: location.x,
        worldY: location.y,
        includeTerrainSnapshot: true
    });
    const jittered = createGeographicWorldPlan({
        worldX: location.x + WORLD_SAMPLE_SCALE * 0.1,
        worldY: location.y - WORLD_SAMPLE_SCALE * 0.1,
        includeTerrainSnapshot: true
    });
    assert.equal(first.world.sampleCenterX, jittered.world.sampleCenterX);
    assert.equal(first.world.sampleCenterY, jittered.world.sampleCenterY);
    assert.deepEqual(first.terrainTileIds, jittered.terrainTileIds);
    assert.deepEqual(first.elevationRows, jittered.elevationRows);
});

test('a one-sample pan preserves every overlapping terrain and visual cell', () => {
    const location = getDefaultWorldLocation();
    const first = createGeographicWorldPlan({
        worldX: location.x,
        worldY: location.y,
        variant: 2,
        includeTerrainSnapshot: true,
        useBakedPartialChunks: false
    });
    const shifted = createGeographicWorldPlan({
        worldX: location.x + WORLD_SAMPLE_SCALE,
        worldY: location.y,
        variant: 2,
        includeTerrainSnapshot: true,
        useBakedPartialChunks: false
    });
    const firstCells = indexPlanCells(first);
    const shiftedCells = indexPlanCells(shifted);
    let checked = 0;
    for (const [key, cell] of firstCells) {
        const shiftedCell = shiftedCells.get(key);
        if (!shiftedCell) continue;
        checked++;
        assert.deepEqual(shiftedCell, cell, `one-sample pan changed global cell ${key}`);
    }
    assert.equal(checked, first.height * (first.width - 1));
});

function indexPlanCells(plan) {
    const cells = new Map();
    for (let row = 0; row < plan.height; row++) {
        for (let col = 0; col < plan.width; col++) {
            const id = row * plan.width + col;
            const key = createWorldSampleKey(
                plan.world.originX + col * WORLD_SAMPLE_SCALE,
                plan.world.originY + row * WORLD_SAMPLE_SCALE,
                WORLD_SAMPLE_SCALE
            );
            cells.set(key, {
                terrain: plan.terrainTileIds[id],
                elevation: plan.elevationRows[row][col],
                symbol: plan.rows[row][col],
                palette: plan.paletteRows[row][col],
                visualVariant: plan.visualVariantRows[row][col]
            });
        }
    }
    return cells;
}
