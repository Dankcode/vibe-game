import assert from 'node:assert/strict';
import test from 'node:test';

import {
    hasMinimumFreeRectangle,
    planBuildingFurniture,
    validateRoomWalkability
} from '../systems/FurniturePlanner.js';

const rectangle = (width, height) => Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({ x, y }))).flat();

test('the smallest legal cabin preserves a complete 2x3 usable interior', () => {
    const room = rectangle(2, 3);
    assert.equal(hasMinimumFreeRectangle(room), true);
    assert.equal(validateRoomWalkability(new Set(), room, { x: 0, y: 0 }), true);
    assert.equal(validateRoomWalkability(new Set(['1,2']), room, { x: 0, y: 0 }), false);
});

test('furniture is legal only when a connected 2x3 block remains', () => {
    const room = rectangle(4, 4);
    assert.equal(validateRoomWalkability(new Set(['3,0', '3,1', '3,2']), room, { x: 0, y: 0 }), true);
    assert.equal(validateRoomWalkability(new Set(['1,0', '1,1', '1,2', '1,3']), room, { x: 0, y: 0 }), false);
});

test('furniture excludes both legacy stair markers and explicit structural stair cells', () => {
    const building = {
        id: 'mixed-stair-contract',
        width: 7,
        height: 7,
        stories: 1,
        door: { x: 3, y: 0, edge: 'north' },
        stairs: [{ x: 1, y: 1, level: 0, direction: 'east' }],
        stairCells: [{ x: 5, y: 5, level: 0, role: 'lower-stair' }],
        floors: [{
            level: 0,
            rooms: [{ type: 'hall', gridRect: { x: 1, y: 1, width: 5, height: 5 } }]
        }]
    };
    const plan = planBuildingFurniture(building, () => 7);
    const occupied = new Set(plan.map((item) => `${item.cell.x},${item.cell.y}`));
    assert.ok(plan.length > 0);
    assert.equal(occupied.has('1,1'), false, 'legacy stairs must reserve their furniture cell');
    assert.equal(occupied.has('5,5'), false, 'explicit stair cells must reserve their furniture cell');
});
