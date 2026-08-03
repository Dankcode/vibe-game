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

test('the active baked core remains fixed while vector constraints retain priority', () => {
    const location = getDefaultWorldLocation();
    const plan = createGeographicWorldPlan({
        worldX: location.x,
        worldY: location.y,
        includeTerrainSnapshot: true
    });
    const partial = plan.generation.partialBake;
    assert.equal(partial.registryCompatible, true);
    assert.ok(partial.appliedCells > 0);
    assert.equal(
        partial.candidateCells,
        partial.appliedCells + partial.constraintConflicts,
        'every current baked candidate must either apply or yield to a fixed vector constraint'
    );

    const offsetX = Math.floor(plan.width / 2);
    const offsetY = Math.floor(plan.height / 2);
    let candidates = 0;
    let applied = 0;
    let superseded = 0;
    for (let row = 0; row < plan.height; row++) {
        for (let col = 0; col < plan.width; col++) {
            const key = createWorldSampleKey(
                plan.world.sampleCenterX + (col - offsetX) * WORLD_SAMPLE_SCALE,
                plan.world.sampleCenterY + (row - offsetY) * WORLD_SAMPLE_SCALE,
                WORLD_SAMPLE_SCALE
            );
            const baked = BAKED_PARTIAL_CHUNKS.cells[key];
            if (!baked) continue;
            candidates++;
            if (plan.terrainTileIds[row * plan.width + col] === baked[0]) applied++;
            else superseded++;
        }
    }
    assert.equal(candidates, partial.candidateCells);
    assert.equal(applied, partial.appliedCells);
    assert.equal(superseded, partial.constraintConflicts);
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
    const firstBuildings = indexPlanBuildings(first);
    const shiftedBuildings = indexPlanBuildings(shifted);
    let checkedBuildings = 0;
    for (const [id, building] of firstBuildings) {
        if (!shiftedBuildings.has(id)) continue;
        checkedBuildings++;
        assert.deepEqual(
            shiftedBuildings.get(id),
            building,
            `one-sample pan moved global building module ${id}`
        );
    }
    assert.ok(checkedBuildings > 0, 'the pan fixture must compare world-anchored building modules');
});

test('a pan across the 5x5 macro and 8x8 terrain frame boundary stays identical', () => {
    const first = createGeographicWorldPlan({
        worldX: 411 * WORLD_SAMPLE_SCALE,
        worldY: 128 * WORLD_SAMPLE_SCALE,
        variant: 3,
        includeTerrainSnapshot: true,
        useBakedPartialChunks: false
    });
    const shifted = createGeographicWorldPlan({
        worldX: 412 * WORLD_SAMPLE_SCALE,
        worldY: 128 * WORLD_SAMPLE_SCALE,
        variant: 3,
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
        assert.deepEqual(shiftedCell, cell, `macro/frame boundary changed global cell ${key}`);
    }
    assert.equal(checked, first.height * (first.width - 1));
});

function indexPlanBuildings(plan) {
    const originCol = Math.round(plan.world.originX / WORLD_SAMPLE_SCALE);
    const originRow = Math.round(plan.world.originY / WORLD_SAMPLE_SCALE);
    const offsetX = Math.floor(plan.width / 2);
    const offsetY = Math.floor(plan.height / 2);
    return new Map((plan.buildings || []).map((building) => {
        const [approachGridCol, approachGridRow] = building.entrance?.approachGrid || [];
        const approach = Number.isFinite(approachGridCol) && Number.isFinite(approachGridRow)
            ? { col: originCol + approachGridCol, row: originRow + approachGridRow }
            : building.exteriorApproach || (
                Number.isFinite(building.entrance?.x) && Number.isFinite(building.entrance?.y)
                    ? building.entrance
                    : null
            );
        return [building.id, {
            col: originCol + building.x + offsetX,
            row: originRow + building.y + offsetY,
            width: building.width,
            height: building.height,
            baseElevation: building.baseElevation,
            approach: approach && !Number.isFinite(approachGridCol)
                ? {
                    col: originCol + approach.x + offsetX,
                    row: originRow + approach.y + offsetY
                }
                : approach
        }];
    }));
}

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
