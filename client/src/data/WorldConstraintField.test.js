import assert from 'node:assert/strict';
import test from 'node:test';

import {
    createBlueprintSkeleton,
    createSettlementConstraintAnchors,
    createWorldConstraintField,
    getWallGateCells,
    isInsideWallBounds,
    isWallBoundaryCell
} from './WorldConstraintField.js';

const TEST_BLUEPRINTS = Object.freeze({
    blueprints: [Object.freeze({
        burgId: 7,
        name: 'Blueprint Seat',
        x: 100,
        y: 80,
        anchorX: 100,
        anchorY: 80,
        clusterId: 'state-7',
        hierarchy: 'seat',
        burg: { population: 196, state: 7, culture: 2, flags: { walls: true, capital: true } },
        wallRings: [
            { ring: 0, radius: 12, thickness: 2, heightVoxels: 6, gates: [{ bearing: 0, grand: true }, { bearing: 180, grand: true }] },
            { ring: 1, radius: 7, thickness: 1, heightVoxels: 5, gates: [{ bearing: 0, grand: true }, { bearing: 180, grand: true }] }
        ],
        wards: [
            { ring: 0, district: 'market', wfcPriors: { buildingDensity: 0.9, elevationVariance: 0.12 } },
            { ring: 1, district: 'castle', wfcPriors: { buildingDensity: 0.7, elevationVariance: 0.04 } }
        ],
        castle: { size: { widthTiles: 7, depthTiles: 7 }, ward: 1 },
        roads: [],
        water: { fords: [], bridges: [], waterfalls: [] }
    })],
    globalWater: { crossings: [], waterfalls: [] }
});

test('offline settlement blueprints project deterministic multi-ring confinement without town payloads', () => {
    const anchors = createSettlementConstraintAnchors({
        blueprints: TEST_BLUEPRINTS,
        centerX: 100,
        centerY: 80,
        width: 40,
        height: 30,
        sampleScale: 1
    });
    assert.equal(anchors.length, 1);
    assert.equal(anchors[0].walled, true);
    assert.equal(anchors[0].wallRings.length, 2);
    assert.equal(isInsideWallBounds(20, 15, anchors[0].wallBounds), true);
    assert.equal(isWallBoundaryCell(20, anchors[0].wallBounds.maxRow, anchors[0].wallBounds), true);
    assert.equal(getWallGateCells(anchors[0].wallBounds).length, 2);
});

test('same-cluster settlements outside the visible projected span do not clamp into ghost edge towns', () => {
    const distant = {
        ...TEST_BLUEPRINTS.blueprints[0],
        burgId: 8,
        name: 'Distant Seat',
        x: 1_000,
        y: 1_000,
        anchorX: 1_000,
        anchorY: 1_000
    };
    const anchors = createSettlementConstraintAnchors({
        blueprints: {
            ...TEST_BLUEPRINTS,
            blueprints: [...TEST_BLUEPRINTS.blueprints, distant]
        },
        centerX: 100,
        centerY: 80,
        width: 40,
        height: 30,
        sampleScale: 1
    });
    assert.deepEqual(anchors.map((anchor) => anchor.burg.id), [7]);
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
        blueprints: TEST_BLUEPRINTS,
        centerX: 100,
        centerY: 80,
        width,
        height,
        sampleScale: 1
    });
    const skeleton = createBlueprintSkeleton({ settlements, width, height });
    const result = createWorldConstraintField({ fields, width, height, settlements, skeleton });
    const center = result.cells[15 * width + 20];
    const corner = result.cells[0];
    assert.equal(center.insideWall, true);
    assert.ok(center.inhibitor >= 0.9);
    assert.ok(center.terrainVariance < corner.terrainVariance);
    assert.ok(center.chaosLimit < corner.chaosLimit);
    assert.equal(result.diagnostics.fixedSkeletonHash, skeleton.hash);
    assert.ok(result.diagnostics.fixedBlueprintNodes > 0);
});

test('wall confinement softens uncertain macro water but preserves it outside the town', () => {
    const width = 40;
    const height = 30;
    const fields = Array.from({ length: width * height }, () => ({
        land: 0.08,
        height: 12,
        routeInfluence: 0,
        riverInfluence: 0
    }));
    const settlements = createSettlementConstraintAnchors({
        blueprints: TEST_BLUEPRINTS,
        centerX: 100,
        centerY: 80,
        width,
        height,
        sampleScale: 1
    });
    const skeleton = createBlueprintSkeleton({ settlements, width, height });
    const result = createWorldConstraintField({ fields, width, height, settlements, skeleton });
    const interior = result.cells.find((cell) => cell.insideWall && !cell.blueprintFixed);
    const exterior = result.cells.find((cell) => !cell.insideWall && !cell.blueprintFixed);
    assert.ok(interior);
    assert.ok(exterior);
    assert.equal(interior.hardWater, false);
    assert.equal(exterior.hardWater, true);
    assert.ok(interior.inhibitor >= 0.9);
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
