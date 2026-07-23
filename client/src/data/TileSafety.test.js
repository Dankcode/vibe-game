import assert from 'node:assert/strict';
import test from 'node:test';

import {
    BUILDING_PARTS,
    TEXTURE_IDS,
    TILE_SYMBOL_LIBRARY,
    createTileCell,
    createVoxelBlock,
    isBlockWalkable,
    tileCellToVoxelColumn
} from './TileLibrary.js';
import { ELEMENTS, getTileDefinition, isTileWalkable } from './TileRegistry.js';

test('voxel choke point strips stale building parts and references from terrain', () => {
    const staleTerrain = createVoxelBlock({
        element: ELEMENTS.GEO,
        texture: TEXTURE_IDS.DEFAULT,
        building: BUILDING_PARTS.WINDOW_LOWER_NORTH,
        buildingGroundFloorZ: 2,
        buildingLevelIndex: 1,
        buildingPartTag: 'window',
        buildingPlacementTag: 'wall'
    });

    assert.equal(staleTerrain.building, BUILDING_PARTS.NONE);
    assert.equal(staleTerrain.walkable, true);
    assert.equal('buildingGroundFloorZ' in staleTerrain, false);
    assert.equal('buildingLevelIndex' in staleTerrain, false);
    assert.equal('buildingPartTag' in staleTerrain, false);
    assert.equal('buildingPlacementTag' in staleTerrain, false);

    const staleCell = createTileCell({
        element: ELEMENTS.HYDRO,
        texture: TEXTURE_IDS.SHALLOW_WATER,
        building: BUILDING_PARTS.DOOR,
        height: 1
    });
    const column = tileCellToVoxelColumn(staleCell);
    assert.ok(column.length > 0);
    assert.ok(column.every((block) => block.building === BUILDING_PARTS.NONE));
});

test('voxel choke point preserves legitimate structure parts', () => {
    const window = createVoxelBlock({
        element: ELEMENTS.STRUCTURE,
        texture: TEXTURE_IDS.STONE_BUILDING_WALL,
        building: BUILDING_PARTS.WINDOW_LOWER_EAST,
        buildingPartTag: 'window'
    });

    assert.equal(window.building, BUILDING_PARTS.WINDOW_LOWER_EAST);
    assert.equal(window.buildingPartTag, 'window');
    assert.equal(window.walkable, false);
});

test('existing shallow-water symbol is the walkable ford while deep water stays blocked', () => {
    const shallow = getTileDefinition(ELEMENTS.HYDRO, TEXTURE_IDS.SHALLOW_WATER);
    const deep = getTileDefinition(ELEMENTS.HYDRO, TEXTURE_IDS.DEEP_WATER);
    const ground = getTileDefinition(ELEMENTS.GEO, TEXTURE_IDS.DEFAULT);

    assert.equal(TILE_SYMBOL_LIBRARY['~'].texture, TEXTURE_IDS.SHALLOW_WATER);
    assert.equal(shallow.walkable, true);
    assert.equal(shallow.moveCost, 1.6);
    assert.ok(shallow.moveCost > ground.moveCost);
    assert.equal(shallow.waterDepth, 'shallow');
    assert.equal(shallow.crossing, 'ford');
    assert.equal(shallow.traversal, 'wade');
    assert.equal(isTileWalkable(ELEMENTS.HYDRO, TEXTURE_IDS.SHALLOW_WATER), true);
    assert.equal(isBlockWalkable(ELEMENTS.HYDRO, TEXTURE_IDS.SHALLOW_WATER), true);

    assert.equal(TILE_SYMBOL_LIBRARY.W.texture, TEXTURE_IDS.DEEP_WATER);
    assert.equal(deep.walkable, false);
    assert.equal(deep.moveCost, Infinity);
    assert.equal(deep.waterDepth, 'deep');
    assert.equal(deep.crossing, null);
    assert.equal(deep.traversal, 'blocked');
    assert.equal(isTileWalkable(ELEMENTS.HYDRO, TEXTURE_IDS.DEEP_WATER), false);
    assert.equal(isBlockWalkable(ELEMENTS.HYDRO, TEXTURE_IDS.DEEP_WATER), false);
});
