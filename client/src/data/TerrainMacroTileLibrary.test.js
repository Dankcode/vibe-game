import assert from 'node:assert/strict';
import test from 'node:test';

import {
    TERRAIN_MACRO_TILE_BY_ID,
    TERRAIN_MACRO_TILES,
    TERRAIN_PRIMARY_MACRO_SIZE,
    TERRAIN_PRIMARY_MACRO_TILES,
    TERRAIN_TRANSITION_MACRO_SIZE,
    TERRAIN_TRANSITION_MACRO_TILES,
    applyTerrainMacroTileToElevationRows,
    collapseTerrainMacroTileGrid,
    createDeterministicTerrainMacroPatch,
    createTerrainMacroElevationPatch,
    findIsolatedElevationSpikes,
    getTerrainMacroEdgeSignature,
    selectTerrainMacroTile,
    terrainMacroTilesCompatible,
    validateTerrainMacroTile
} from './TerrainMacroTileLibrary.js';

const LOW_RELIEF = Object.freeze({
    formulaVersion: 'fmg-burg-relief-v1',
    reliefScore: 0.08,
    reliefClass: 'low',
    targetTierSpan: 1,
    baseElevationTier: 1,
    gradientAxis: 'east-west',
    gradientSign: 1
});

const HIGH_RELIEF = Object.freeze({
    formulaVersion: 'fmg-burg-relief-v1',
    reliefScore: 0.94,
    reliefClass: 'high',
    targetTierSpan: 6,
    baseElevationTier: 1,
    gradientAxis: 'north-south',
    gradientSign: -1
});

test('catalog provides coherent 5x5 primary and 3x3 transition families', () => {
    assert.equal(TERRAIN_PRIMARY_MACRO_TILES.length, 19);
    assert.equal(TERRAIN_TRANSITION_MACRO_TILES.length, 13);
    assert.equal(TERRAIN_MACRO_TILES.length, 32);
    assert.equal(TERRAIN_MACRO_TILE_BY_ID.size, TERRAIN_MACRO_TILES.length);
    assert.deepEqual(
        [...new Set(TERRAIN_PRIMARY_MACRO_TILES.map((tile) => tile.family))].sort(),
        ['ramp', 'stair', 'terraced', 'uniform']
    );
    assert.deepEqual(
        [...new Set(TERRAIN_TRANSITION_MACRO_TILES.map((tile) => tile.family))].sort(),
        ['ramp', 'stair', 'terraced', 'uniform']
    );

    for (const tile of TERRAIN_PRIMARY_MACRO_TILES) {
        assert.equal(tile.size, TERRAIN_PRIMARY_MACRO_SIZE);
        assert.ok(tile.relativeElevationRows.every((row) => row.length === TERRAIN_PRIMARY_MACRO_SIZE));
    }
    for (const tile of TERRAIN_TRANSITION_MACRO_TILES) {
        assert.equal(tile.size, TERRAIN_TRANSITION_MACRO_SIZE);
        assert.ok(tile.relativeElevationRows.every((row) => row.length === TERRAIN_TRANSITION_MACRO_SIZE));
    }
});

test('every catalog patch has continuous cardinal slopes and no isolated one-cell spikes', () => {
    for (const tile of TERRAIN_MACRO_TILES) {
        const validation = validateTerrainMacroTile(tile);
        assert.equal(validation.valid, true, `${tile.id}: ${validation.errors.join(', ')}`);
        assert.equal(validation.maximumAdjacentDelta <= 1, true, tile.id);
        assert.deepEqual(validation.isolatedSpikes, [], tile.id);
        assert.deepEqual(findIsolatedElevationSpikes(tile.relativeElevationRows), [], tile.id);
        assert.ok(Object.isFrozen(tile));
        assert.ok(Object.isFrozen(tile.relativeElevationRows));
        assert.ok(tile.relativeElevationRows.every(Object.isFrozen));
    }
});

test('edge descriptors expose full elevations and three-anchor connectors', () => {
    const ramp = TERRAIN_MACRO_TILE_BY_ID.get('terrain-primary-ramp-graded-east-up');
    const east = getTerrainMacroEdgeSignature(ramp, 'east', { baseElevation: 2 });
    const north = getTerrainMacroEdgeSignature(ramp, 'north', { baseElevation: 2 });
    assert.deepEqual(east.tiers, [4, 4, 4, 4, 4]);
    assert.equal(east.elevationSignature, '4,4,4,4,4');
    assert.equal(east.signature, east.elevationSignature);
    assert.equal(east.connectorSignature, '4,4,4');
    assert.deepEqual(east.relativeTiers, [2, 2, 2, 2, 2]);
    assert.equal(east.normalizedSignature, '0,0,0,0,0');
    assert.deepEqual(north.tiers, [2, 2, 3, 3, 4]);
    assert.deepEqual(north.connectorTiers, [2, 3, 4]);
    assert.equal(north.relativeConnectorSignature, '0,1,2');
});

test('compatibility uses exact same-size edges and connectors across primary/transition sizes', () => {
    const primaryFlat = TERRAIN_MACRO_TILE_BY_ID.get('terrain-primary-uniform');
    const transitionFlat = TERRAIN_MACRO_TILE_BY_ID.get('terrain-transition-uniform');
    const primaryRamp = TERRAIN_MACRO_TILE_BY_ID.get('terrain-primary-ramp-graded-east-up');
    const transitionRamp = TERRAIN_MACRO_TILE_BY_ID.get('terrain-transition-stair-three-step-east-up');

    assert.equal(terrainMacroTilesCompatible(primaryFlat, primaryFlat, 'east', {
        leftBaseElevation: 2,
        rightBaseElevation: 2
    }), true);
    assert.equal(terrainMacroTilesCompatible(primaryFlat, primaryFlat, 'east', {
        leftBaseElevation: 2,
        rightBaseElevation: 3
    }), false);
    assert.equal(terrainMacroTilesCompatible(primaryFlat, transitionFlat, 'east', {
        leftBaseElevation: 2,
        rightBaseElevation: 2
    }), true);
    assert.equal(terrainMacroTilesCompatible(primaryRamp, transitionRamp, 'north', {
        leftBaseElevation: 0,
        rightBaseElevation: 0,
        mode: 'connector'
    }), true);
    assert.equal(terrainMacroTilesCompatible(primaryRamp, transitionRamp, 'north', {
        mode: 'exact'
    }), false);
});

test('selection is stable for seed and FMG relief while retaining seeded variety', () => {
    const options = {
        seed: 'burg-42:macro:3,7',
        reliefProfile: HIGH_RELIEF,
        role: 'primary',
        baseElevation: 1
    };
    const first = selectTerrainMacroTile(options);
    const second = selectTerrainMacroTile(options);
    assert.strictEqual(first, second);

    const ids = new Set(Array.from({ length: 128 }, (_, index) =>
        selectTerrainMacroTile({ ...options, seed: `burg-42:macro:${index}` })?.id));
    assert.ok(ids.size >= 4, `expected seeded variety, received ${[...ids].join(', ')}`);
});

test('FMG high relief deterministically favors larger tiers, stairs and the authored gradient', () => {
    const sample = (reliefProfile) => Array.from({ length: 512 }, (_, index) =>
        selectTerrainMacroTile({
            seed: `relief-distribution:${index}`,
            reliefProfile,
            role: 'primary',
            baseElevation: 1,
            maximumElevation: 6
        }));
    const low = sample(LOW_RELIEF);
    const high = sample(HIGH_RELIEF);
    const averageSpan = (tiles) => tiles.reduce((sum, tile) => sum + tile.tierSpan, 0) / tiles.length;
    const stairCount = (tiles) => tiles.filter((tile) => tile.family === 'stair').length;
    const authoredGradientCount = high.filter((tile) =>
        tile.gradientAxis === HIGH_RELIEF.gradientAxis && tile.gradientSign === HIGH_RELIEF.gradientSign).length;
    const oppositeGradientCount = high.filter((tile) =>
        tile.gradientAxis === HIGH_RELIEF.gradientAxis && tile.gradientSign === -HIGH_RELIEF.gradientSign).length;

    assert.ok(averageSpan(high) > averageSpan(low) + 1.5, `${averageSpan(low)} -> ${averageSpan(high)}`);
    assert.ok(stairCount(high) > stairCount(low) * 4, `${stairCount(low)} -> ${stairCount(high)}`);
    assert.ok(authoredGradientCount > oppositeGradientCount * 1.4,
        `${authoredGradientCount} authored vs ${oppositeGradientCount} opposite`);
});

test('absolute and relative edge constraints filter deterministic selection', () => {
    const absolute = selectTerrainMacroTile({
        seed: 'constrained-flat-north',
        role: 'primary',
        baseElevation: 2,
        reliefProfile: HIGH_RELIEF,
        edgeConstraints: { north: [2, 2, 2, 2, 2] }
    });
    assert.ok(absolute);
    assert.deepEqual(getTerrainMacroEdgeSignature(absolute, 'north', { baseElevation: 2 }).tiers, [2, 2, 2, 2, 2]);

    const relative = selectTerrainMacroTile({
        seed: 'constrained-ramp-north',
        role: 'primary',
        baseElevation: 1,
        reliefProfile: HIGH_RELIEF,
        allowedFamilies: ['ramp'],
        edgeConstraints: { north: { relativeSignature: '0,0,1,1,2' } }
    });
    assert.equal(relative?.id, 'terrain-primary-ramp-graded-east-up');

    const impossible = selectTerrainMacroTile({
        role: 'transition',
        edgeConstraints: { north: 99 }
    });
    assert.equal(impossible, null);
});

test('patch instantiation clamps deterministically and recalculates actual signatures', () => {
    const patch = createTerrainMacroElevationPatch({
        tile: 'terrain-primary-stair-high-relief-east-up',
        baseElevation: 4,
        minimumElevation: 0,
        maximumElevation: 6
    });
    assert.equal(patch.clampedCells, 10);
    assert.equal(patch.minimumElevation, 4);
    assert.equal(patch.maximumElevation, 6);
    assert.equal(patch.tierSpan, 2);
    assert.deepEqual(patch.edgeSignatures.north.tiers, [4, 5, 6, 6, 6]);
    assert.ok(Object.isFrozen(patch));
    assert.ok(patch.elevationRows.every(Object.isFrozen));

    const deterministic = createDeterministicTerrainMacroPatch({
        seed: 'burg-7:transition:11',
        role: 'transition',
        reliefProfile: HIGH_RELIEF,
    });
    assert.ok(deterministic);
    assert.equal(deterministic.size, 3);
    assert.equal(deterministic.baseElevation, HIGH_RELIEF.baseElevationTier);
    assert.strictEqual(
        deterministic.tile,
        selectTerrainMacroTile({
            seed: 'burg-7:transition:11',
            role: 'transition',
            reliefProfile: HIGH_RELIEF,
        })
    );
});

test('application mutates only in-bounds non-authoritative cells', () => {
    const elevationRows = Array.from({ length: 7 }, () => Array(8).fill(0));
    elevationRows[2][3] = 5;
    elevationRows[2][5] = 6;
    elevationRows[3][4] = 4;
    elevationRows[4][5] = 3;
    const hardAuthoritativeCells = new Set(['3,2', 2 * 8 + 5]);
    const hardAuthoritativeRows = Array.from({ length: 7 }, () => Array(8).fill(false));
    hardAuthoritativeRows[3][4] = true;
    const result = applyTerrainMacroTileToElevationRows({
        elevationRows,
        tile: 'terrain-primary-stair-high-relief-east-up',
        originCol: 2,
        originRow: 1,
        baseElevation: 1,
        hardAuthoritativeCells,
        hardAuthoritativeRows,
        isHardAuthoritative: ({ col, row }) => col === 5 && row === 4
    });

    assert.equal(result.attemptedCells, 25);
    assert.equal(result.appliedCells, 21);
    assert.equal(result.preservedCells, 4);
    assert.equal(result.outOfBoundsCells, 0);
    assert.equal(elevationRows[2][3], 5);
    assert.equal(elevationRows[2][5], 6);
    assert.equal(elevationRows[3][4], 4);
    assert.equal(elevationRows[4][5], 3);
    assert.equal(elevationRows[1][2], 1);
    assert.equal(elevationRows[1][6], 5);
    assert.ok(result.cells.every((cell) => !['3,2', '5,2', '4,3', '5,4'].includes(`${cell.col},${cell.row}`)));
});

test('application clips at world edges and repairs a generated one-cell peak around hard cells', () => {
    const clippedRows = Array.from({ length: 4 }, () => Array(4).fill(0));
    const clipped = applyTerrainMacroTileToElevationRows({
        elevationRows: clippedRows,
        tile: 'terrain-primary-uniform',
        originCol: 2,
        originRow: 2,
        baseElevation: 2
    });
    assert.equal(clipped.appliedCells, 4);
    assert.equal(clipped.outOfBoundsCells, 21);

    const elevationRows = Array.from({ length: 7 }, () => Array(7).fill(0));
    const protectedRing = new Set();
    for (let row = 2; row <= 4; row++) {
        for (let col = 2; col <= 4; col++) {
            if (col !== 3 || row !== 3) protectedRing.add(`${col},${row}`);
        }
    }
    const repaired = applyTerrainMacroTileToElevationRows({
        elevationRows,
        tile: 'terrain-primary-terraced-plateau',
        originCol: 1,
        originRow: 1,
        hardAuthoritativeCells: protectedRing
    });
    assert.equal(elevationRows[3][3], 0);
    assert.ok(repaired.repairedSpikes >= 1);
    assert.deepEqual(findIsolatedElevationSpikes(elevationRows), []);
    assert.ok([...protectedRing].every((key) => {
        const [col, row] = key.split(',').map(Number);
        return elevationRows[row][col] === 0;
    }));
});

test('macro-grid collapse is world-coordinate deterministic and propagates exact primary edges', () => {
    const nodes = [];
    for (let macroRow = -8; macroRow <= -6; macroRow++) {
        for (let macroCol = 41; macroCol <= 44; macroCol++) {
            nodes.push({
                id: `source-${macroCol}-${macroRow}`,
                macroCol,
                macroRow,
                role: 'primary',
                baseElevation: 1,
                reliefProfile: HIGH_RELIEF,
                allowedFamilies: ['uniform', 'terraced', 'ramp', 'stair']
            });
        }
    }
    const first = collapseTerrainMacroTileGrid({
        nodes,
        seed: 'world-seed:macro-collapse'
    });
    const reordered = collapseTerrainMacroTileGrid({
        nodes: [...nodes].reverse(),
        seed: 'world-seed:macro-collapse'
    });

    assert.equal(first.solved, true);
    assert.equal(first.assignments.length, nodes.length);
    assert.equal(first.diagnostics.incompatibleEdgeCount, 0);
    assert.equal(first.diagnostics.fallbackCount, 0);
    assert.ok(first.diagnostics.compatibilityChecks > 0);
    assert.equal(first.diagnostics.worldCoordinateDeterministic, true);
    assert.equal(first.diagnostics.assignmentHash, reordered.diagnostics.assignmentHash);
    assert.deepEqual(
        first.assignments.map(({ worldKey, tileId, baseElevation }) => ({ worldKey, tileId, baseElevation })),
        reordered.assignments.map(({ worldKey, tileId, baseElevation }) => ({ worldKey, tileId, baseElevation }))
    );

    for (const assignment of first.assignments) {
        for (const neighbor of [
            { key: `${assignment.macroCol + 1},${assignment.macroRow}`, direction: 'east' },
            { key: `${assignment.macroCol},${assignment.macroRow + 1}`, direction: 'south' }
        ]) {
            const adjacent = first.assignment.get(neighbor.key);
            if (!adjacent) continue;
            assert.equal(terrainMacroTilesCompatible(assignment.tile, adjacent.tile, neighbor.direction, {
                leftBaseElevation: assignment.baseElevation,
                rightBaseElevation: adjacent.baseElevation
            }), true, `${assignment.worldKey} -> ${neighbor.key}`);
        }
    }
});

test('macro collapse selects 3x3 transition states and propagates cross-size connectors', () => {
    const transition = collapseTerrainMacroTileGrid({
        gridWidth: 3,
        gridHeight: 2,
        worldOriginMacroCol: 90,
        worldOriginMacroRow: -12,
        seed: 'transition-grid',
        role: 'transition',
        reliefProfile: HIGH_RELIEF,
        baseElevation: 2
    });
    assert.equal(transition.solved, true);
    assert.equal(transition.assignments.length, 6);
    assert.ok(transition.assignments.every((assignment) =>
        assignment.role === 'transition' && assignment.patch.size === TERRAIN_TRANSITION_MACRO_SIZE));
    assert.equal(transition.diagnostics.incompatibleEdgeCount, 0);

    const mixed = collapseTerrainMacroTileGrid({
        seed: 'cross-size-connector',
        allowFallback: false,
        nodes: [
            {
                macroCol: 5,
                macroRow: 7,
                role: 'primary',
                baseElevation: 0,
                fixedTileId: 'terrain-primary-ramp-graded-east-up'
            },
            {
                macroCol: 6,
                macroRow: 7,
                role: 'transition',
                baseElevation: 2,
                fixedTileId: 'terrain-transition-uniform'
            }
        ]
    });
    assert.equal(mixed.solved, true);
    assert.equal(mixed.diagnostics.edges, 1);
    assert.equal(mixed.diagnostics.incompatibleEdgeCount, 0);
    assert.ok(mixed.diagnostics.compatibilityChecks > 0);
});

test('collapse diagnostics expose contradictions and connector-safe fallbacks', () => {
    const restricted = collapseTerrainMacroTileGrid({
        seed: 'restricted-families',
        nodes: [
            { macroCol: -2, macroRow: 4, baseElevation: 0, allowedFamilies: ['uniform'] },
            { macroCol: -1, macroRow: 4, baseElevation: 1, allowedFamilies: ['uniform'] }
        ]
    });
    assert.equal(restricted.solved, true);
    assert.equal(restricted.diagnostics.reason, 'solved-with-fallback');
    assert.equal(restricted.diagnostics.initialIncompatibleEdges.length, 1);
    assert.equal(restricted.diagnostics.incompatibleEdgeCount, 0);
    assert.equal(restricted.diagnostics.fallbackAttempts, 1);
    assert.equal(restricted.diagnostics.fallbacks[0].stage, 'expanded-families');
    assert.equal(restricted.diagnostics.fallbacks[0].used, true);

    const contradictoryNodes = [
        {
            macroCol: 0,
            macroRow: 0,
            role: 'primary',
            baseElevation: 0,
            fixedTileId: 'terrain-primary-uniform'
        },
        {
            macroCol: 1,
            macroRow: 0,
            role: 'primary',
            baseElevation: 1,
            fixedTileId: 'terrain-primary-uniform'
        }
    ];
    const strict = collapseTerrainMacroTileGrid({
        nodes: contradictoryNodes,
        seed: 'incompatible-uniforms',
        allowFallback: false
    });
    assert.equal(strict.solved, false);
    assert.equal(strict.assignments.length, 0);
    assert.equal(strict.diagnostics.initialIncompatibleEdges.length, 1);
    assert.equal(strict.diagnostics.incompatibleEdgeCount, 1);
    assert.equal(strict.diagnostics.initialIncompatibleEdges[0].reason, 'no-compatible-state-pair');
    assert.equal(strict.diagnostics.contradictions[0].code, 'WFC_CONTRADICTION');
    assert.equal(strict.diagnostics.fallbackAttempts, 0);

    const recovered = collapseTerrainMacroTileGrid({
        nodes: contradictoryNodes,
        seed: 'incompatible-uniforms',
        allowFallback: true
    });
    assert.equal(recovered.solved, true);
    assert.equal(recovered.diagnostics.reason, 'solved-with-fallback');
    assert.equal(recovered.diagnostics.initialIncompatibleEdges.length, 1);
    assert.equal(recovered.diagnostics.incompatibleEdgeCount, 0);
    assert.equal(recovered.diagnostics.fallbackCount, 1);
    assert.equal(recovered.diagnostics.fallbackAttempts, 2);
    assert.equal(recovered.diagnostics.fallbacks[0].stage, 'expanded-families');
    assert.equal(recovered.diagnostics.fallbacks[0].used, false);
    assert.equal(recovered.diagnostics.fallbacks[1].stage, 'uniform-components');
    assert.equal(recovered.diagnostics.fallbacks[1].used, true);
    assert.equal(recovered.diagnostics.fallbackAssignments, 1);
    assert.deepEqual(recovered.assignments.map((assignment) => assignment.baseElevation), [1, 1]);
});

test('invalid tile and direction inputs fail with explicit integration errors', () => {
    assert.throws(() => createTerrainMacroElevationPatch({ tile: 'missing-tile' }), /Unknown terrain macro tile/);
    assert.throws(() => getTerrainMacroEdgeSignature('terrain-primary-uniform', 'up'), /Unknown terrain macro direction/);
    assert.throws(() => applyTerrainMacroTileToElevationRows({
        elevationRows: [],
        tile: 'terrain-primary-uniform'
    }), /elevationRows must be a non-empty/);
    assert.throws(() => collapseTerrainMacroTileGrid({
        nodes: [{ baseElevation: 2 }]
    }), /requires absolute macroCol and macroRow/);
});
