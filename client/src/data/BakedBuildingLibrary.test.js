import assert from 'node:assert/strict';
import test from 'node:test';

import {
    BAKED_BUILDING_BLUEPRINTS,
    BakedBuildingPlacementError,
    createBakedBuildingPlan,
    validateBakedBuilding
} from './BakedBuildingLibrary.js';
import {
    STAIR_CONFIGURATION,
    assertStairFlightInvariants,
    validateStaircaseRouting
} from './StructuralMatrixRules.js';

function flatTown(width = 42, height = 32) {
    const rows = Array.from({ length: height }, (_, row) => {
        const cells = Array(width).fill('G');
        if (row === Math.floor(height / 2)) cells.fill('R');
        cells[Math.floor(width / 2)] = 'R';
        return cells.join('');
    });
    return {
        rows,
        elevationRows: Array.from({ length: height }, () => Array(width).fill(1)),
        inhibitorRows: Array.from({ length: height }, () => Array(width).fill(0.12))
    };
}

function worldFootprint(building, width, height) {
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    return building.footprintCells.map((cell) => ({
        col: building.x + offsetX + cell.x,
        row: building.y + offsetY + cell.y
    }));
}

function isolatedCabinParcel(blocker = null) {
    const width = 10;
    const height = 10;
    const rows = Array.from({ length: height }, () => Array(width).fill('G').join(''));
    const elevationRows = Array.from({ length: height }, () => Array(width).fill(1));
    const inhibitorRows = Array.from({ length: height }, () => Array(width).fill(0.1));
    const cells = [];
    for (let row = 2; row <= 6; row++) {
        for (let col = 2; col <= 5; col++) cells.push({ col, row });
    }
    const approach = { col: 4, row: 1 };
    cells.push(approach);
    const row = rows[approach.row].split('');
    row[approach.col] = blocker === 'water' ? '~' : 'R';
    rows[approach.row] = row.join('');
    if (blocker === 'inhibitor') inhibitorRows[approach.row][approach.col] = 0.95;
    const occupied = blocker === 'occupied' ? new Set([`${approach.col},${approach.row}`]) : new Set();
    return { rows, elevationRows, inhibitorRows, area: { cells }, occupied, approach };
}

test('every baked blueprint has a boundary entrance and at least a contiguous 2x3 interior', () => {
    for (const [id, blueprint] of Object.entries(BAKED_BUILDING_BLUEPRINTS)) {
        const validation = validateBakedBuilding(blueprint);
        assert.equal(validation.valid, true, `${id}: ${validation.errors.join(', ')}`);
        assert.ok(Math.min(validation.enterableSpace.width, validation.enterableSpace.height) >= 2, id);
        assert.ok(Math.max(validation.enterableSpace.width, validation.enterableSpace.height) >= 3, id);
    }
    assert.deepEqual(BAKED_BUILDING_BLUEPRINTS.cabin.enterableSpace, {
        x: 1, y: 1, width: 2, height: 3, area: 6
    });
});

test('area baking is deterministic, varied, enterable, and non-overlapping', () => {
    const fixture = flatTown();
    const options = {
        ...fixture,
        seed: 70421,
        townId: 'Luma',
        area: { col: 3, row: 3, width: 36, height: 26 },
        districts: ['civic', 'market', 'residential'],
        minBuildings: 2,
        maxBuildings: 3
    };
    const first = createBakedBuildingPlan(options);
    const second = createBakedBuildingPlan(options);
    assert.deepEqual(first.buildings, second.buildings);
    assert.equal(first.buildings.length, 3);
    assert.equal(new Set(first.buildings.map((building) => building.blueprintId)).size, 3);

    const occupied = new Set();
    for (const building of first.buildings) {
        assert.equal(building.bakedGenerated, true);
        assert.equal(validateBakedBuilding(building).valid, true);
        assert.ok(building.door);
        for (const cell of worldFootprint(building, fixture.rows[0].length, fixture.rows.length)) {
            const key = `${cell.col},${cell.row}`;
            assert.equal(occupied.has(key), false, `${building.id} overlaps at ${key}`);
            occupied.add(key);
            assert.ok(cell.col >= 3 && cell.col < 39 && cell.row >= 3 && cell.row < 29);
        }
        const [approachCol, approachRow] = building.entrance.approachGrid;
        assert.equal(first.occupied.has(`${approachCol},${approachRow}`), true);
        assert.equal(building.entrance.approachReserved, true);
        assert.ok(!['W', '~', 'B'].includes(fixture.rows[approachRow][approachCol]));
        assert.ok(fixture.inhibitorRows[approachRow][approachCol] <= 0.68);

        if (building.stories > 1) {
            assert.equal(building.stairs.length, building.stories - 1);
            assert.equal(building.stairCells.length, (building.stories - 1) * 3);
            assert.equal(validateStaircaseRouting(building.stairs, {
                baseElevation: building.baseElevation,
                stories: building.stories
            }).valid, true);
            const footprintSet = new Set(building.footprintCells.map((cell) => `${cell.x},${cell.y}`));
            for (const stair of building.stairs) {
                const verdict = assertStairFlightInvariants(stair.cells, {
                    footprintSet,
                    door: building.door,
                    configuration: STAIR_CONFIGURATION.SOLID_TRIANGULAR,
                    moduleCount: 1,
                    direction: stair.direction
                });
                assert.equal(verdict.valid, true, verdict.issues.join(', '));
            }
        }
    }
});

test('an exterior approach is a hard reserved traversal cell', () => {
    const open = isolatedCabinParcel();
    const available = createBakedBuildingPlan({
        ...open,
        districts: ['residential'],
        seed: 'single-cabin',
        minBuildings: 1,
        maxBuildings: 1,
        buffer: 0
    });
    assert.equal(available.buildings.length, 1);
    assert.equal(available.buildings[0].blueprintId, 'cabin');
    assert.deepEqual(available.buildings[0].entrance.approachGrid, [open.approach.col, open.approach.row]);
    assert.equal(available.occupied.has(`${open.approach.col},${open.approach.row}`), true);

    for (const blocker of ['water', 'inhibitor', 'occupied']) {
        const fixture = isolatedCabinParcel(blocker);
        const blocked = createBakedBuildingPlan({
            ...fixture,
            districts: ['residential'],
            seed: `single-cabin-${blocker}`,
            minBuildings: 1,
            maxBuildings: 1,
            buffer: 0
        });
        assert.equal(blocked.buildings.length, 0, blocker);
        assert.equal(blocked.diagnostics.complete, false, blocker);
        assert.equal(blocked.diagnostics.shortfall, 1, blocker);
        assert.equal(blocked.diagnostics.reason, 'minimum-not-met', blocker);
    }
});

test('minimum landmark count can be enforced with a typed placement error', () => {
    const fixture = isolatedCabinParcel('inhibitor');
    assert.throws(() => createBakedBuildingPlan({
        ...fixture,
        districts: ['residential'],
        seed: 'required-cabin',
        minBuildings: 1,
        maxBuildings: 1,
        buffer: 0,
        requireMinimum: true
    }), (error) => {
        assert.ok(error instanceof BakedBuildingPlacementError);
        assert.equal(error.code, 'BAKED_MINIMUM_NOT_MET');
        assert.equal(error.diagnostics.shortfall, 1);
        assert.equal(error.partialPlan.buildings.length, 0);
        return true;
    });
});

test('a harbor area permits a lighthouse while inland areas inhibit it', () => {
    const coast = flatTown(44, 30);
    coast.rows = coast.rows.map((row) => `${row.slice(0, 36)}${'~'.repeat(8)}`);
    const harbor = createBakedBuildingPlan({
        ...coast,
        seed: 'harbor',
        townId: 'Seabright',
        area: { col: 20, row: 2, width: 16, height: 26 },
        districts: ['harbor'],
        minBuildings: 2,
        maxBuildings: 2
    });
    assert.ok(harbor.buildings.some((building) => building.blueprintId === 'lighthouse'));
    assert.ok(harbor.buildings.every((building) => building.placementConstraints.inhibitor <= 0.68));

    const inlandFixture = flatTown(44, 30);
    inlandFixture.elevationRows = inlandFixture.elevationRows.map((row) => row.map(() => 5));
    const inland = createBakedBuildingPlan({
        ...inlandFixture,
        seed: 'inland',
        townId: 'Sunvale',
        area: { col: 3, row: 2, width: 38, height: 26 },
        districts: ['civic', 'garden'],
        minBuildings: 2,
        maxBuildings: 3
    });
    assert.ok(inland.buildings.some((building) => building.blueprintId === 'chapel'));
    assert.ok(inland.buildings.every((building) => building.blueprintId !== 'lighthouse'));
});

test('hard inhibitor cells and supplied occupancy are never consumed', () => {
    const fixture = flatTown(34, 26);
    for (let row = 4; row < 22; row++) {
        for (let col = 16; col < 20; col++) fixture.inhibitorRows[row][col] = 0.95;
    }
    const occupied = new Set();
    for (let row = 5; row < 12; row++) {
        for (let col = 5; col < 12; col++) occupied.add(`${col},${row}`);
    }
    const plan = createBakedBuildingPlan({
        ...fixture,
        seed: 'limits',
        area: { col: 2, row: 2, width: 30, height: 22 },
        districts: ['civic', 'market', 'residential'],
        occupied,
        minBuildings: 2,
        maxBuildings: 3
    });
    assert.ok(plan.buildings.length >= 2);
    for (const building of plan.buildings) {
        for (const cell of worldFootprint(building, fixture.rows[0].length, fixture.rows.length)) {
            assert.equal(occupied.has(`${cell.col},${cell.row}`), false);
            assert.ok(fixture.inhibitorRows[cell.row][cell.col] <= 0.68);
        }
    }
});
