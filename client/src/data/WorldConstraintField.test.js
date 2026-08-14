import assert from 'node:assert/strict';
import test from 'node:test';

import {
    FMG_BURG_RELIEF_FORMULA_VERSION,
    createBlueprintSkeleton,
    createSettlementConstraintAnchors,
    createWorldConstraintField,
    deriveFmgBurgReliefProfile,
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
        burg: { population: 196, state: 7, culture: 2, themeId: 'asian', flags: { walls: true, capital: true } },
        identity: { architectureThemeId: 'asian' },
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
    assert.ok([...skeleton.cells.values()].every((cell) => cell.architectureThemeId === 'asian'));
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

test('FMG height, climate, ward variance and vector tiers deterministically scale burg relief', () => {
    const width = 18;
    const height = 14;
    const insideCellKeys = new Set();
    for (let row = 2; row <= 11; row++) {
        for (let col = 2; col <= 15; col++) insideCellKeys.add(`${col},${row}`);
    }
    const baseSettlement = {
        burg: { id: 777, name: 'Reliefburg' },
        col: 9,
        row: 7,
        radius: 7,
        wallBounds: { minCol: 2, minRow: 2, maxCol: 15, maxRow: 11, insideCellKeys },
        wards: [{ wfcPriors: { elevationVariance: 0.2 } }],
        blueprint: {
            climate: { biome: 'PLAINS', latitude: 18, temperature: 18, snowline: 90 }
        },
        townVector: { streetCells: [{ col: 4, row: 7, elevationTier: 2 }] }
    };
    const lowFields = Array.from({ length: width * height }, () => ({ land: 0.92, height: 32 }));
    const highFields = Array.from({ length: width * height }, (_, id) => ({
        land: 0.92,
        height: 18 + (id % width) * 4 + Math.floor(id / width) * 1.5
    }));
    const highSettlement = {
        ...baseSettlement,
        wards: [{ wfcPriors: { elevationVariance: 0.92 } }],
        blueprint: {
            climate: { biome: 'HIGHLAND', latitude: 58, temperature: -8, snowline: 38 }
        },
        townVector: {
            streetCells: [
                { col: 4, row: 7, elevationTier: 1 },
                { col: 13, row: 7, elevationTier: 6 }
            ]
        }
    };
    const low = deriveFmgBurgReliefProfile({ settlement: baseSettlement, fields: lowFields, width, height });
    const high = deriveFmgBurgReliefProfile({ settlement: highSettlement, fields: highFields, width, height });
    const repeated = deriveFmgBurgReliefProfile({ settlement: highSettlement, fields: highFields, width, height });

    assert.deepEqual(high, repeated);
    assert.equal(high.formulaVersion, FMG_BURG_RELIEF_FORMULA_VERSION);
    assert.ok(high.sampledHeight.range > low.sampledHeight.range);
    assert.ok(high.components.topography > low.components.topography);
    assert.ok(high.components.vectorStreets > low.components.vectorStreets);
    assert.ok(high.reliefScore > low.reliefScore);
    assert.ok(high.targetTierSpan > low.targetTierSpan);
    assert.equal(high.gradientAxis, 'east-west');
});

test('FMG vector streets keep priority and elevation before street-map WFC infill', () => {
    const width = 24;
    const height = 20;
    const insideCellKeys = new Set();
    for (let row = 2; row <= 17; row++) {
        for (let col = 2; col <= 21; col++) insideCellKeys.add(`${col},${row}`);
    }
    const settlement = {
        burg: { id: 901, name: 'Elevated Test Burg', themeId: 'egyptian' },
        architectureThemeId: 'egyptian',
        blueprint: {
            anchorX: 0,
            anchorY: 0,
            hierarchy: 'seat',
            roads: [],
            water: {
                fords: [{ id: 'protected-ford', position: [0, 5], riverId: 'river-test' }]
            },
            identity: { architectureThemeId: 'egyptian' }
        },
        col: 12,
        row: 9,
        radius: 10,
        walled: true,
        wallBounds: {
            minCol: 2,
            minRow: 2,
            maxCol: 21,
            maxRow: 17,
            width: 20,
            height: 16,
            insideCellKeys
        },
        wallRings: [],
        wards: [{ ring: 0, district: 'market' }],
        townVector: {
            vectorHash: 'vector-street-priority',
            wallHeightVoxels: 5,
            walkwayWidth: 1,
            wallCells: [{ col: 2, row: 8 }, { col: 2, row: 9 }],
            gateCells: [{ col: 2, row: 9 }],
            insideCellKeys,
            streetCells: [
                { col: 2, row: 9, kind: 'main', elevationTier: 4, source: 'town-vector' },
                { col: 11, row: 9, kind: 'main', elevationTier: 4, source: 'town-vector' },
                { col: 12, row: 9, kind: 'main', elevationTier: 5, source: 'town-vector' },
                { col: 13, row: 9, kind: 'dirt', elevationTier: 5, source: 'town-vector' }
            ],
            buildings: [{
                id: 'vector-house',
                type: 'HOUSE_LARGE',
                minCol: 7,
                minRow: 5,
                width: 4,
                height: 4,
                door: { x: 2, y: 3, edge: 'south' },
                footprintCells: Array.from({ length: 16 }, (_, index) => ({
                    x: index % 4,
                    y: Math.floor(index / 4)
                }))
            }]
        }
    };
    const skeleton = createBlueprintSkeleton({ settlements: [settlement], width, height });
    const sourceRoad = skeleton.cells.get(9 * width + 12);
    const sourceGate = skeleton.cells.get(9 * width + 2);
    const sourceWall = skeleton.cells.get(8 * width + 2);
    const sourceFord = skeleton.cells.get(14 * width + 12);
    const sourceBuildingPlot = skeleton.cells.get(6 * width + 8);
    assert.equal(sourceRoad.kind, 'road');
    assert.equal(sourceRoad.source, 'town-vector');
    assert.equal(sourceRoad.roadKind, 'town-vector-main');
    assert.equal(sourceRoad.elevationTier, 5);
    assert.equal(sourceRoad.architectureThemeId, 'egyptian');
    assert.equal(sourceGate.kind, 'gate');
    assert.equal(sourceGate.elevationTier, 4, 'the source street tier must survive through a higher-priority gate');
    assert.equal(sourceGate.elevationSource, 'town-vector');
    assert.equal(sourceGate.architectureThemeId, 'egyptian');
    assert.equal(sourceWall.kind, 'wall', 'baked street masks cannot overwrite an FMG vector wall');
    assert.equal(sourceFord.kind, 'ford', 'hard authored water keeps authority over baked street masks');
    assert.equal(sourceBuildingPlot.kind, 'building-plot');
    assert.equal(sourceBuildingPlot.source, 'town-vector-building');
    assert.equal(sourceBuildingPlot.buildingId, 'vector-house');
    assert.ok([...skeleton.cells.values()].every((cell) => cell.architectureThemeId === 'egyptian'));
    assert.ok(skeleton.diagnostics.vectorStreetCells >= 3);
    assert.ok(skeleton.diagnostics.buildingPlotCells >= 12);
    assert.equal(skeleton.diagnostics.vectorBuildingPlots, 1);
    assert.ok(skeleton.diagnostics.streetMapCells > 0);
    assert.ok(Object.keys(skeleton.diagnostics.streetMapModules).length > 0);
    assert.ok(skeleton.diagnostics.streetMapPortalCells > 0);
    assert.ok(skeleton.diagnostics.streetMapUtilityCells > 0);
    assert.ok(Object.keys(skeleton.diagnostics.streetMapUtilityModules).length > 0);
    assert.ok((skeleton.diagnostics.streetMapAnchorKinds.gate || 0) > 0);
    assert.ok((skeleton.diagnostics.streetMapAnchorKinds.ford || 0) > 0);
    assert.ok((skeleton.diagnostics.streetMapAnchorKinds.door || 0) > 0);
    assert.equal(skeleton.diagnostics.reliefFormulaVersion, FMG_BURG_RELIEF_FORMULA_VERSION);
    assert.equal(skeleton.diagnostics.reliefProfiles.length, 1);

    // The generated gate avenue must be a cardinally contiguous path from the burg center to the
    // authored gate, regardless of which 5x5 masks were selected around it.
    for (let col = 2; col <= settlement.col; col++) {
        const cell = skeleton.cells.get(settlement.row * width + col);
        assert.ok(['gate', 'road', 'dock', 'bridge', 'ford'].includes(cell?.kind),
            `gate approach cannot hang at ${col},${settlement.row}`);
    }

    const portalCells = [...skeleton.cells.values()].filter((cell) =>
        cell.source === 'baked-street-wfc' && cell.portal && cell.portalId);
    const semanticStreetCells = [...skeleton.cells.values()].filter((cell) =>
        cell.source === 'baked-street-wfc' && cell.featureKind && Array.isArray(cell.utilityTags));
    assert.ok(semanticStreetCells.length > 0, 'utility metadata must survive the street plan → skeleton boundary');
    const transitionCells = semanticStreetCells.filter((cell) => cell.transition);
    assert.ok(transitionCells.every((cell) =>
        ['east-west', 'north-south'].includes(cell.transitionAxis) &&
        ['north', 'east', 'south', 'west'].includes(cell.transitionDirection)));
    const portalsById = new Map();
    for (const cell of portalCells) {
        if (!portalsById.has(cell.portalId)) portalsById.set(cell.portalId, []);
        portalsById.get(cell.portalId).push(cell);
    }
    const reciprocalPairs = [...portalsById.values()].filter((cells) => cells.length === 2);
    assert.ok(reciprocalPairs.length > 0);
    for (const [left, right] of reciprocalPairs) {
        assert.equal(Math.abs(left.col - right.col) + Math.abs(left.row - right.row), 1);
        assert.equal(left.reciprocalModuleId, right.moduleId);
        assert.equal(right.reciprocalModuleId, left.moduleId);
    }

    const fields = Array.from({ length: width * height }, () => ({
        land: 0.9,
        height: 35,
        routeInfluence: 0,
        riverInfluence: 0
    }));
    const constraints = createWorldConstraintField({
        fields,
        width,
        height,
        settlements: [settlement],
        skeleton
    });
    const sourceRoadConstraint = constraints.cells[9 * width + 12];
    assert.equal(sourceRoadConstraint.fixedElevation, 5);
    assert.equal(sourceRoadConstraint.fixedElevationSource, 'town-vector');
    assert.equal(sourceRoadConstraint.sourceStreetKind, 'main');
    assert.ok(constraints.diagnostics.fixedElevationCells >= 4);
});

test('roadless FMG burg vectors receive connected utility street modules before terrain fill', () => {
    const width = 26;
    const height = 20;
    const settlement = {
        burg: { id: 902, name: 'Roadless Test Burg', population: 42, themeId: 'asian' },
        architectureThemeId: 'asian',
        blueprint: {
            anchorX: 0,
            anchorY: 0,
            hierarchy: 'fief',
            roads: [],
            water: {},
            climate: { latitude: 24, snowline: 100 }
        },
        col: 13,
        row: 10,
        radius: 9,
        walled: false,
        wallBounds: {
            minCol: 2,
            minRow: 2,
            maxCol: 23,
            maxRow: 17,
            width: 22,
            height: 16
        },
        wallRings: [],
        wards: [{ ring: 0, district: 'residential' }],
        townVector: {
            vectorHash: 'roadless-vector',
            wallCells: [],
            gateCells: [],
            streetCells: [],
            buildings: []
        }
    };

    const skeleton = createBlueprintSkeleton({ settlements: [settlement], width, height });
    const generatedRoads = [...skeleton.cells.values()].filter((cell) => cell.kind === 'road');

    assert.ok(generatedRoads.length > 20);
    assert.ok(generatedRoads.every((cell) => cell.source === 'baked-street-wfc'),
        'roadless vectors should use utility modules instead of the legacy ward formula');
    assert.ok(skeleton.diagnostics.streetMapPortalCells > 0);
    assert.ok(skeleton.diagnostics.streetMapUtilityCells > 0);
});

test('FMG river centerlines inhibit overlapping building reservations before terrain collapse', () => {
    const skeleton = {
        cells: new Map([[0, {
            id: 0,
            col: 0,
            row: 0,
            kind: 'building-plot',
            townId: 903,
            buildingId: 'river-overlap-house'
        }]])
    };
    const result = createWorldConstraintField({
        width: 1,
        height: 1,
        fields: [{ land: 0.74, riverInfluence: 0.72, riverPathInfluence: 0.9 }],
        skeleton
    });

    assert.equal(result.cells[0].skeletonKind, 'building-plot');
    assert.equal(result.cells[0].hardWater, true);
    assert.equal(result.cells[0].blueprintFixed, false);
    assert.equal(result.cells[0].fixedTerrain, null);
});
