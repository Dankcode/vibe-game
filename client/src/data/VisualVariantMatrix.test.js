import assert from 'node:assert/strict';
import test from 'node:test';

import { createFantasyWorldPlanAt, getDefaultWorldLocation } from './FantasyWorldData.js';
import { applyPaletteRowsToTileRows, applyVisualVariantRowsToTileRows } from './MapData.js';
import { createTileCell, createVoxelMatrix, getTopVoxel } from './TileLibrary.js';

test('matrix visual variants survive the tile and voxel pipeline', () => {
    const rows = [
        [createTileCell({ element: 1 }), createTileCell({ element: 1 })],
        [createTileCell({ element: 1 }), createTileCell({ element: 1 })]
    ];
    applyVisualVariantRowsToTileRows(rows, ['05', 'az']);
    applyPaletteRowsToTileRows(rows, [['meadow', 'forest'], ['coast', 'crystal']]);

    assert.deepEqual(rows.map((row) => row.map((cell) => cell.visualVariant)), [
        [0, 5],
        [10, 35]
    ]);

    const matrix = createVoxelMatrix(rows);
    assert.deepEqual(matrix.columns.map((row) => row.map((column) => getTopVoxel(column).visualVariant)), [
        [0, 5],
        [10, 35]
    ]);
    assert.deepEqual(matrix.columns.map((row) => row.map((column) => getTopVoxel(column).paletteId)), [
        ['meadow', 'forest'],
        ['coast', 'crystal']
    ]);
});

test('geographic replay is deterministic while variants reshape local detail over stable FMG macro geography', () => {
    const location = getDefaultWorldLocation();
    const base = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
    const exactReplay = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
    const replay = createFantasyWorldPlanAt(location.x, location.y, { variant: 1 });

    assert.deepEqual(exactReplay, base);
    assert.equal(replay.width, base.width);
    assert.equal(replay.height, base.height);
    assert.equal(replay.world.centerX, base.world.centerX);
    assert.equal(replay.world.centerY, base.world.centerY);
    assert.equal(replay.generation.townPayloadsRead, false);
    assert.notEqual(replay.contentHash, base.contentHash);
    assert.equal(replay.visualVariantRows.length, base.rows.length);

    let terrainDifferences = 0;
    let visualDifferences = 0;
    let macroWaterDifferences = 0;
    const total = base.width * base.height;
    const isMacroWater = (symbol) => ['W', '~', 'I'].includes(symbol);
    for (let y = 0; y < base.visualVariantRows.length; y++) {
        for (let x = 0; x < base.visualVariantRows[y].length; x++) {
            if (base.rows[y][x] !== replay.rows[y][x]) terrainDifferences++;
            if (base.visualVariantRows[y][x] !== replay.visualVariantRows[y][x]) visualDifferences++;
            if (isMacroWater(base.rows[y][x]) !== isMacroWater(replay.rows[y][x])) macroWaterDifferences++;
        }
    }
    assert.ok(terrainDifferences / total > 0.1, 'variant should materially reshape local terrain detail');
    assert.ok(terrainDifferences / total < 0.7, 'variant should still resemble the same FMG region');
    assert.ok(visualDifferences / total > 0.3, 'variant should visibly recolor surface motifs');
    assert.ok(macroWaterDifferences / total < 0.1, 'FMG coastline macro structure should remain recognizable');
});
