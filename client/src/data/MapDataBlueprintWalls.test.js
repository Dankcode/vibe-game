import assert from 'node:assert/strict';
import test from 'node:test';

import { applyBlueprintWallHeightsToTileRows } from './MapData.js';
import { createTileCellFromSymbol, tileCellToVoxelColumn } from './TileLibrary.js';
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
