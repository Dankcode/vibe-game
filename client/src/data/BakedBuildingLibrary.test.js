import assert from 'node:assert/strict';
import test from 'node:test';

import {
    BAKED_BUILDING_BLUEPRINTS,
    BAKED_BUILDING_BLUEPRINT_IDS,
    BakedBuildingPlacementError,
    createBakedBuildingPlan,
    createFixedBakedBuilding,
    validateBakedBuilding
} from './BakedBuildingLibrary.js';
import { BURG_THEME_CATALOG, BURG_THEME_IDS } from './BurgThemeCatalog.js';
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
    assert.equal(BAKED_BUILDING_BLUEPRINT_IDS.length, 56);
    assert.equal(new Set(BAKED_BUILDING_BLUEPRINT_IDS).size, 56);
    assert.ok(new Set(Object.values(BAKED_BUILDING_BLUEPRINTS)
        .map((blueprint) => blueprint.layout.join('\n'))).size >= 8);
    for (const district of ['castle', 'civic', 'market', 'residential', 'artisan', 'garden', 'harbor']) {
        assert.ok(
            Object.values(BAKED_BUILDING_BLUEPRINTS).filter((blueprint) =>
                blueprint.districts[0] === district).length >= 6,
            `${district} needs a deep blueprint family`
        );
    }
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

test('multi-storey landmarks bake distinct room plans and routed vertical connections', () => {
    const keep = createFixedBakedBuilding({
        blueprintId: 'castle-keep',
        centerCol: 12,
        centerRow: 12,
        width: 24,
        height: 24,
        elevationRows: Array.from({ length: 24 }, () => Array(24).fill(3)),
        seed: 'multi-room-keep',
        townId: 'Test Seat',
        district: 'castle'
    });
    assert.equal(keep.floors.length, 3);
    assert.ok(keep.floors.every((floor) => floor.rooms.length >= 2));
    assert.ok(keep.floors.slice(1).every((floor) => floor.verticalConnections.length >= 1));
    assert.ok(new Set(keep.floors.flatMap((floor) => floor.rooms.map((room) => room.type))).size >= 6);
    assert.equal(validateBakedBuilding(keep).valid, true);
});

test('one baked footprint resolves into five manifest-bound architecture families', () => {
    const buildings = BURG_THEME_IDS.map((architectureThemeId) => createFixedBakedBuilding({
        blueprintId: 'castle-keep',
        centerCol: 12,
        centerRow: 12,
        width: 24,
        height: 24,
        elevationRows: Array.from({ length: 24 }, () => Array(24).fill(3)),
        seed: 'same-keep-geometry',
        townId: architectureThemeId,
        district: 'castle',
        architectureThemeId
    }));
    const first = buildings[0];
    for (const building of buildings) {
        const theme = BURG_THEME_CATALOG[building.architectureThemeId];
        assert.ok(theme);
        assert.equal(building.themeLabel, theme.label);
        assert.ok(theme.styles.includes(building.style));
        assert.ok(theme.roofStyles.includes(building.roofStyle));
        assert.ok(theme.roofGeometries.includes(building.roofGeometry));
        assert.ok(theme.facadeKits.includes(building.facadeKit));
        assert.ok(theme.castleKits.includes(building.castleKit));
        assert.deepEqual(building.footprintCells, first.footprintCells);
        assert.deepEqual(building.floors, first.floors);
        assert.equal(validateBakedBuilding(building).valid, true);
    }
    assert.equal(new Set(buildings.map((building) => building.architectureThemeId)).size, 5);
    assert.equal(new Set(buildings.map((building) => building.themePalette.wallColor)).size, 5);
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

test('baked buildings use relief-derived base tiers but never bridge an illegal cliff', () => {
    const safe = isolatedCabinParcel();
    safe.elevationRows = safe.elevationRows.map((row) => row.map(() => 4));
    const reliefProfile = {
        formulaVersion: 'fmg-burg-relief-v1',
        reliefScore: 0.84,
        reliefClass: 'high',
        targetTierSpan: 5,
        baseElevationTier: 4
    };
    const elevated = createBakedBuildingPlan({
        ...safe,
        districts: ['residential'],
        seed: 'elevated-cabin-pad',
        minBuildings: 1,
        maxBuildings: 1,
        buffer: 0,
        reliefProfile
    });
    assert.equal(elevated.buildings.length, 1);
    assert.equal(elevated.buildings[0].baseElevation, 4);
    assert.equal(elevated.buildings[0].placementConstraints.reliefFormulaVersion, 'fmg-burg-relief-v1');
    assert.equal(elevated.buildings[0].placementConstraints.reliefClass, 'high');
    assert.equal(elevated.buildings[0].placementConstraints.elevationSpan, 0);

    const cliff = isolatedCabinParcel();
    for (let row = 2; row <= 6; row++) cliff.elevationRows[row][5] = 4;
    const blocked = createBakedBuildingPlan({
        ...cliff,
        districts: ['residential'],
        seed: 'cliff-cabin-pad',
        minBuildings: 1,
        maxBuildings: 1,
        buffer: 0,
        reliefProfile
    });
    assert.equal(blocked.buildings.length, 0);
    assert.ok(blocked.diagnostics.illegalCliffCandidates > 0);
    assert.equal(blocked.diagnostics.complete, false);
});

test('a redundant formula lane may yield to a cabin but an unlisted source road may not', () => {
    const fixture = isolatedCabinParcel();
    const replaceableRoadCells = new Set();
    const mutable = fixture.rows.map((row) => row.split(''));
    for (let row = 2; row <= 6; row++) {
        for (let col = 2; col <= 5; col++) {
            mutable[row][col] = 'R';
            replaceableRoadCells.add(`${col},${row}`);
        }
    }
    fixture.rows = mutable.map((row) => row.join(''));
    const options = {
        ...fixture,
        districts: ['residential'],
        seed: 'replace-formula-lane',
        minBuildings: 1,
        maxBuildings: 1,
        buffer: 0
    };
    assert.equal(createBakedBuildingPlan(options).buildings.length, 0);
    const replaced = createBakedBuildingPlan({ ...options, replaceableRoadCells });
    assert.equal(replaced.buildings.length, 1);
    assert.equal(replaced.buildings[0].blueprintId, 'cabin');
    assert.deepEqual(replaced.buildings[0].entrance.approachGrid, [fixture.approach.col, fixture.approach.row]);
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
