import assert from 'node:assert/strict';
import test from 'node:test';
import {
    WORLD_PATH_CONNECTIVITY_VERSION,
    findLogicalWorldPath,
    getWorldPathConnectivityGenerationMetadata,
    isLogicalWorldStepTraversable,
    validateWorldPathConnectivity
} from './WorldPathConnectivity.js';

function createConnectedPlan() {
    return {
        width: 10,
        height: 8,
        center: { x: 5, y: 4 },
        rows: [
            'G~GGTGGGGG',
            'G~GGTGGGGG',
            'G~GGTGGGGG',
            'G~GGTGGGGG',
            'GRRRRRRRGG',
            'G~GGTGADAG',
            'G~GGTGEEEG',
            'G~GGTGAAAG'
        ],
        elevationRows: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
        ],
        buildings: [{
            id: 'cabin',
            x: 1,
            y: 1,
            width: 3,
            height: 3,
            footprintCells: Array.from({ length: 9 }, (_, index) => ({
                x: index % 3,
                y: Math.floor(index / 3)
            })),
            baseElevation: 1,
            stories: 2,
            floors: [{ level: 0 }, { level: 1 }],
            door: { x: 1, y: 0, edge: 'north' },
            entrance: {
                grid: [1, 0],
                edge: 'north',
                approachGrid: [7, 4]
            },
            interior: { openCells: [{ x: 1, y: 1 }] }
        }],
        pathConnectivity: {
            rivers: [{
                id: 'river-lune',
                components: [
                    { id: 'river-lune:north', cells: [[1, 0], [1, 1], [1, 2], [1, 3]] },
                    { id: 'river-lune:south', cells: [[1, 5], [1, 6], [1, 7]] }
                ],
                connectors: [{
                    id: 'river-lune:bridge-underpass',
                    kind: 'bridge-underpass',
                    cells: [[1, 3], [1, 4], [1, 5]]
                }]
            }],
            gates: [{
                id: 'west-gate',
                grid: [4, 4],
                edge: 'west'
            }],
            requiredPaths: [{
                id: 'gate-to-cabin',
                from: [3, 4],
                via: [[7, 4], [7, 5]],
                to: [7, 6]
            }]
        }
    };
}

test('validates connected rivers, gate roads, level buildings, doors, and required paths', () => {
    const result = validateWorldPathConnectivity(createConnectedPlan(), {
        requireStampedDoorSymbols: true
    });

    assert.equal(result.valid, true, result.issues.map((issue) => issue.message).join('\n'));
    assert.equal(result.errorCount, 0);
    assert.deepEqual(result.issues, []);
    assert.equal(result.generationMetadata.formulaVersion, WORLD_PATH_CONNECTIVITY_VERSION);
    assert.deepEqual(result.generationMetadata.rivers, {
        systems: 1,
        continuousSystems: 1,
        components: 2,
        connectors: 1,
        cells: 7
    });
    assert.equal(result.generationMetadata.gates.connected, 1);
    assert.equal(result.generationMetadata.buildings.levelFootprints, 1);
    assert.equal(result.generationMetadata.buildings.connectedDoors, 1);
    assert.equal(result.generationMetadata.requiredPaths.traversable, 1);
    assert.equal(
        getWorldPathConnectivityGenerationMetadata(result),
        result.generationMetadata,
        'the summary should be directly attachable to GeographicWFCGenerator generation metadata'
    );
    assert.doesNotThrow(() => JSON.stringify(result.generationMetadata));
    assert.equal(Object.isFrozen(result.generationMetadata), true);
});

test('reports broken topology deterministically regardless of declaration order', () => {
    const plan = createConnectedPlan();
    plan.rows[0] = `D${plan.rows[0].slice(1)}`;
    plan.rows[4] = `${plan.rows[4].slice(0, 4)}T${plan.rows[4].slice(5)}`;
    plan.rows[6] = `${plan.rows[6].slice(0, 7)}A${plan.rows[6].slice(8)}`;
    plan.elevationRows[4][7] = 4;
    plan.elevationRows[7][8] = 2;
    plan.buildings[0].floors = [{ level: 0 }];
    plan.pathConnectivity.rivers[0].connectors[0] = {
        id: 'river-lune:broken-connector',
        kind: 'bridge-underpass',
        cells: [[1, 3], [1, 5]]
    };
    plan.pathConnectivity.requiredPaths.push({
        id: 'road-across-gate',
        from: [3, 4],
        to: [5, 4]
    });

    const first = validateWorldPathConnectivity(plan, { requireStampedDoorSymbols: true });
    const reordered = structuredClone(plan);
    reordered.pathConnectivity.rivers[0].components.reverse();
    reordered.pathConnectivity.requiredPaths.reverse();
    const second = validateWorldPathConnectivity(reordered, { requireStampedDoorSymbols: true });

    assert.equal(first.valid, false);
    assert.deepEqual(first.issues, second.issues);
    const codes = new Set(first.issues.map((issue) => issue.code));
    for (const expected of [
        'building-base-elevation-mismatch',
        'building-floor-level-missing',
        'building-footprint-not-level',
        'door-hanging',
        'door-landing-blocked',
        'door-threshold-step',
        'gate-blocked',
        'required-path-unreachable',
        'river-connector-gap',
        'river-disconnected'
    ]) {
        assert.equal(codes.has(expected), true, `missing deterministic diagnostic ${expected}`);
    }
    assert.deepEqual(
        first.generationMetadata.issueCodes,
        [...first.generationMetadata.issueCodes].sort()
    );
});

test('reports gates and building approaches that have no road connection', () => {
    const plan = createConnectedPlan();
    plan.rows[4] = 'GGGGGGGGGG';

    const result = validateWorldPathConnectivity(plan, { requireStampedDoorSymbols: true });
    const codes = new Set(result.issues.map((issue) => issue.code));
    assert.equal(codes.has('gate-lane-not-road'), true);
    assert.equal(codes.has('gate-road-component-mismatch'), true);
    assert.equal(codes.has('door-road-disconnected'), true);
    assert.equal(result.generationMetadata.gates.connected, 0);
    assert.equal(result.generationMetadata.buildings.connectedDoors, 0);
});

test('generic village ground no longer satisfies authored road connections', () => {
    const groundOnly = validateWorldPathConnectivity({
        rows: ['...'],
        elevationRows: [[0, 0, 0]]
    });
    assert.equal(groundOnly.generationMetadata.roads.cells, 0);

    const plan = createConnectedPlan();
    plan.rows[4] = '..........';
    const result = validateWorldPathConnectivity(plan, { requireStampedDoorSymbols: true });
    const codes = new Set(result.issues.map((issue) => issue.code));
    assert.equal(codes.has('door-road-disconnected'), true);
    assert.equal(codes.has('gate-lane-not-road'), true);
});

test('building footprints mask buried roads while keeping the door threshold usable', () => {
    const baseline = createConnectedPlan();
    const plan = createConnectedPlan();
    plan.rows[6] = 'G~GGTGRRRG';

    const baselineResult = validateWorldPathConnectivity(baseline, { requireStampedDoorSymbols: true });
    const result = validateWorldPathConnectivity(plan, { requireStampedDoorSymbols: true });

    assert.equal(result.valid, true, result.issues.map((issue) => issue.message).join('\n'));
    assert.equal(result.generationMetadata.roads.cells, baselineResult.generationMetadata.roads.cells,
        'road symbols underneath an occupied footprint must not enter the logical road graph');
    assert.equal(result.generationMetadata.buildings.connectedDoors, 1,
        'the door and first interior landing remain an explicit portal through the footprint mask');
});

test('logical pathfinding cannot shortcut through an occupied building footprint', () => {
    const plan = {
        rows: ['GGGGGGG'],
        elevationRows: [[0, 0, 0, 0, 0, 0, 0]],
        center: { x: 0, y: 0 },
        buildings: [{
            id: 'solid-block',
            originGrid: [2, 0],
            width: 3,
            height: 1
        }]
    };

    assert.equal(findLogicalWorldPath(plan, [0, 0], [6, 0], { buildingCoordinates: 'absolute' }), null);
});

test('gate lanes must be distinct, opposite, adjacent authored road cells', () => {
    const sameLane = validateWorldPathConnectivity({
        rows: ['RRR'],
        elevationRows: [[0, 0, 0]],
        pathConnectivity: {
            gates: [{
                id: 'folded-gate',
                grid: [1, 0],
                insideGrid: [0, 0],
                outsideGrid: [0, 0]
            }]
        }
    });
    const sameLaneCodes = new Set(sameLane.issues.map((issue) => issue.code));
    assert.equal(sameLaneCodes.has('gate-lanes-not-distinct'), true);
    assert.equal(sameLaneCodes.has('gate-lanes-not-opposite'), true);
    assert.equal(sameLane.generationMetadata.gates.connected, 0);

    const distantLane = validateWorldPathConnectivity({
        rows: ['RRRR'],
        elevationRows: [[0, 0, 0, 0]],
        pathConnectivity: {
            gates: [{
                id: 'long-gate',
                grid: [1, 0],
                insideGrid: [0, 0],
                outsideGrid: [3, 0]
            }]
        }
    });
    assert.equal(distantLane.issues.some((issue) => issue.code === 'gate-lane-not-adjacent'), true);
    assert.equal(distantLane.generationMetadata.gates.connected, 0);

    const dottedLanes = validateWorldPathConnectivity({
        rows: ['.R.'],
        elevationRows: [[0, 0, 0]],
        pathConnectivity: {
            gates: [{ id: 'dotted-gate', grid: [1, 0], edge: 'west' }]
        }
    });
    assert.equal(dottedLanes.issues.some((issue) => issue.code === 'gate-lane-not-road'), true);
});

test('road cliffs and disconnected nontrivial road components are errors', () => {
    const cliff = validateWorldPathConnectivity({
        rows: ['RRRR'],
        elevationRows: [[0, 0, 3, 3]]
    });
    const cliffCodes = new Set(cliff.issues.map((issue) => issue.code));
    assert.equal(cliffCodes.has('road-elevation-discontinuity'), true);
    assert.equal(cliffCodes.has('road-components-disconnected'), true);

    const separated = validateWorldPathConnectivity({
        rows: ['RRRGRRR'],
        elevationRows: [[0, 0, 0, 0, 0, 0, 0]],
        pathConnectivity: {
            requiredPaths: [{ id: 'false-field-shortcut', from: [0, 0], to: [6, 0] }]
        }
    });
    const separatedCodes = new Set(separated.issues.map((issue) => issue.code));
    assert.equal(separatedCodes.has('road-components-disconnected'), true);
    assert.equal(separatedCodes.has('required-path-road-component-mismatch'), true);
    assert.equal(separated.generationMetadata.requiredPaths.traversable, 0,
        'walking across generic terrain must not make two road components a valid required route');
});

test('doors and gates must resolve through the same authored road component', () => {
    const plan = createConnectedPlan();
    plan.rows[4] = `${plan.rows[4].slice(0, 6)}G${plan.rows[4].slice(7)}`;

    const result = validateWorldPathConnectivity(plan, { requireStampedDoorSymbols: true });
    const codes = new Set(result.issues.map((issue) => issue.code));
    assert.equal(codes.has('door-gate-road-component-mismatch'), true);
    assert.equal(codes.has('required-path-road-component-mismatch'), true);
    assert.equal(result.generationMetadata.sharedRoadAccess.doorsConnectedToGate, 0);
});

test('logical pathfinding mirrors one-tier player movement and diagonal corner clearance', () => {
    const stepped = {
        rows: ['GGG'],
        elevationRows: [[0, 1, 2]]
    };
    assert.deepEqual(findLogicalWorldPath(stepped, [0, 0], [2, 0]), [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 }
    ]);
    assert.equal(isLogicalWorldStepTraversable(stepped, [0, 0], [1, 0]), true);

    const cliff = { ...stepped, elevationRows: [[0, 2, 2]] };
    assert.equal(findLogicalWorldPath(cliff, [0, 0], [2, 0]), null);
    assert.equal(isLogicalWorldStepTraversable(cliff, [0, 0], [1, 0]), false);

    const blockedCorner = {
        rows: ['GX', 'XG'],
        elevationRows: [[0, 0], [0, 0]]
    };
    assert.equal(findLogicalWorldPath(blockedCorner, [0, 0], [1, 1]), null);
});

test('explicit paired stair connectors can bridge authored floor elevation deltas', () => {
    const plan = {
        rows: ['GG'],
        elevationRows: [[0, 3]],
        pathConnectivity: {
            movementConnectors: [{
                id: 'keep-stair',
                kind: 'stairs',
                from: [0, 0],
                to: [1, 0],
                bidirectional: true
            }]
        }
    };

    assert.deepEqual(findLogicalWorldPath(plan, [0, 0], [1, 0]), [
        { col: 0, row: 0 },
        { col: 1, row: 0 }
    ]);
    assert.equal(isLogicalWorldStepTraversable(plan, [1, 0], [0, 0]), true);
});
