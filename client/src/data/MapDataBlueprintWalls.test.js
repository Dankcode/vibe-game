import assert from 'node:assert/strict';
import test from 'node:test';

import {
    applyArchitectureThemeRowsToTileRows,
    applyBlueprintWallHeightsToTileRows,
    applyTownElevationsToTileRows
} from './MapData.js';
import {
    createTileCellFromSymbol,
    symbolRowsToTileCells,
    tileCellToVoxelColumn
} from './TileLibrary.js';
import { ELEMENTS } from './TileRegistry.js';

test('compiled wall tiers extrude from terrain elevation by their blueprint voxel height', () => {
    const tileRows = [[createTileCellFromSymbol('T')]];

    applyBlueprintWallHeightsToTileRows(tileRows, [[5]], [[2]]);

    assert.equal(tileRows[0][0].buildingGroundElevation, 2);
    assert.equal(tileRows[0][0].height, 6);

    const column = tileCellToVoxelColumn(tileRows[0][0]);
    assert.equal(column.length, 7);
    assert.deepEqual(column.slice(0, 2).map((block) => block.element), [ELEMENTS.GEO, ELEMENTS.GEO]);
    assert.equal(column.filter((block) => block.element === ELEMENTS.STRUCTURE).length, 5);
    assert.equal(column.at(-1).z, 6);
});

test('elevated FMG channels retain their tier while deep ocean stays at the zero datum', () => {
    const tileRows = symbolRowsToTileCells(['W~B']);

    applyTownElevationsToTileRows(tileRows, [[5, 4, 3]], []);

    assert.equal(tileRows[0][0].height, 0, 'deep ocean remains the world water datum');
    assert.equal(tileRows[0][1].height, 4, 'shallow river channels retain macro elevation');
    assert.equal(tileRows[0][2].height, 3, 'marsh and plunge-pool water retains macro elevation');
});

test('burg ownership rows theme town surfaces and building footprints take precedence', () => {
    const tileRows = symbolRowsToTileCells([
        'GR;TG',
        'GACRG',
        'GGGGG',
        'GGGGG',
        'GGGGG'
    ]);
    const architectureThemeRows = Array.from({ length: 5 }, () => Array(5).fill(null));
    architectureThemeRows[0][1] = 'Asian';
    architectureThemeRows[0][2] = 'middle-eastern';
    architectureThemeRows[0][3] = 'northern-european';
    architectureThemeRows[1][1] = 'asian';
    architectureThemeRows[1][2] = 'asian';
    architectureThemeRows[1][3] = 'asian';

    applyArchitectureThemeRowsToTileRows(tileRows, architectureThemeRows, [{
        x: -1,
        y: -1,
        width: 2,
        height: 1,
        footprintCells: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
        architectureThemeId: 'egyptian'
    }], { primaryArchitectureThemeId: 'southern-european' });

    assert.equal(tileRows[0][1].architectureThemeId, 'asian');
    assert.equal(tileRows[0][2].architectureThemeId, 'middle-eastern');
    assert.equal(tileRows[0][3].architectureThemeId, 'northern-european');
    assert.equal(tileRows[1][1].architectureThemeId, 'egyptian');
    assert.equal(tileRows[1][2].architectureThemeId, 'egyptian');
    assert.equal(tileRows[1][3].architectureThemeId, 'asian');
    assert.equal(tileRows[2][2].architectureThemeId, null);
});

test('legacy plans use the primary theme only on architecture surfaces', () => {
    const tileRows = symbolRowsToTileCells(['RGAT']);

    applyArchitectureThemeRowsToTileRows(tileRows, [], [], {
        primaryArchitectureThemeId: 'southern-european'
    });

    assert.equal(tileRows[0][0].architectureThemeId, 'southern-european');
    assert.equal(tileRows[0][1].architectureThemeId, null);
    assert.equal(tileRows[0][2].architectureThemeId, 'southern-european');
    assert.equal(tileRows[0][3].architectureThemeId, 'southern-european');
});
