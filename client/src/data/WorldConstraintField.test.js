import assert from 'node:assert/strict';
import test from 'node:test';

import {
    createSettlementConstraintAnchors,
    createWorldConstraintField,
    getWallGateCells,
    isInsideWallBounds,
    isWallBoundaryCell
} from './WorldConstraintField.js';

test('FMG burg metadata produces deterministic wall confinement without town payloads', () => {
    const anchors = createSettlementConstraintAnchors({
        burgs: [{ id: 7, x: 100, y: 80, population: 196, flags: { walls: true } }],
        centerX: 100,
        centerY: 80,
        width: 40,
        height: 30,
        sampleScale: 1
    });
    assert.equal(anchors.length, 1);
    assert.equal(anchors[0].walled, true);
    assert.equal(isInsideWallBounds(20, 15, anchors[0].wallBounds), true);
    assert.equal(isWallBoundaryCell(20, anchors[0].wallBounds.maxRow, anchors[0].wallBounds), true);
    assert.equal(getWallGateCells(anchors[0].wallBounds).length, 2);
});

test('wall interiors strongly inhibit terrain chaos while wilderness stays freer', () => {
    const width = 40;
    const height = 30;
    const fields = Array.from({ length: width * height }, () => ({
        land: 0.9,
        height: 35,
        routeInfluence: 0.05,
        riverInfluence: 0
    }));
    const settlements = createSettlementConstraintAnchors({
        burgs: [{ id: 1, x: 0, y: 0, population: 180, flags: { walls: true } }],
        centerX: 0,
        centerY: 0,
        width,
        height,
        sampleScale: 1
    });
    const result = createWorldConstraintField({ fields, width, height, settlements });
    const center = result.cells[15 * width + 20];
    const corner = result.cells[0];
    assert.equal(center.insideWall, true);
    assert.ok(center.inhibitor >= 0.9);
    assert.ok(center.terrainVariance < corner.terrainVariance);
    assert.ok(center.chaosLimit < corner.chaosLimit);
});

test('high-confidence global water becomes a fixed terrain constraint', () => {
    const result = createWorldConstraintField({
        width: 2,
        height: 1,
        fields: [
            { land: 0.1, riverInfluence: 0 },
            { land: 0.65, riverPathInfluence: 0.9 }
        ]
    });
    assert.equal(result.cells[0].hardWater, true);
    assert.equal(result.cells[1].hardWater, true);
    assert.equal(result.diagnostics.hardWaterCells, 2);
});
