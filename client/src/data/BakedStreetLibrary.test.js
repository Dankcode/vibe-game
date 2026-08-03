import assert from 'node:assert/strict';
import test from 'node:test';

import {
    BAKED_STREET_MODULE_BY_ID,
    BAKED_STREET_MODULE_SIZE,
    BAKED_STREET_MODULES,
    BAKED_STREET_TRANSITION_SIZE,
    createBakedStreetPlan,
    streetModulesCompatible
} from './BakedStreetLibrary.js';
import { BURG_THEME_IDS } from './BurgThemeCatalog.js';

test('the baked street catalog covers every connector mask plus civic and stepped variants', () => {
    assert.ok(BAKED_STREET_MODULES.length >= 20);
    assert.deepEqual(
        [...new Set(BAKED_STREET_MODULES.map((module) => module.mask))].sort((a, b) => a - b),
        Array.from({ length: 16 }, (_, index) => index)
    );
    assert.ok(BAKED_STREET_MODULES.some((module) => module.spaceType === 'market-square'));
    assert.ok(BAKED_STREET_MODULES.some((module) => module.spaceType === 'stair-street'));
    assert.equal(BAKED_STREET_MODULE_SIZE, 5);
    assert.equal(BAKED_STREET_TRANSITION_SIZE, 3);
    assert.ok(BAKED_STREET_MODULES.every((module) =>
        module.pattern.length === BAKED_STREET_MODULE_SIZE &&
        module.pattern.every((row) => row.length === BAKED_STREET_MODULE_SIZE)));
});

test('the solved assignment rasterizes exact 5x5 masks with adjacent reciprocal portals', () => {
    const insideCellKeys = new Set();
    for (let row = 0; row < 35; row++) {
        for (let col = 0; col < 40; col++) insideCellKeys.add(`${col},${row}`);
    }
    const plan = createBakedStreetPlan({
        bounds: { minCol: 0, minRow: 0, maxCol: 39, maxRow: 34 },
        insideCellKeys,
        sourceStreetCells: [
            { col: 10, row: 15, elevationTier: 1 },
            { col: 30, row: 15, elevationTier: 5 }
        ],
        seed: 'exact-five-cell-raster',
        district: 'market',
        spacing: 7,
        gridOriginCol: 10,
        gridOriginRow: 15,
        reliefProfile: {
            formulaVersion: 'fmg-burg-relief-v1',
            reliefScore: 0.9,
            reliefClass: 'high',
            targetTierSpan: 5,
            baseElevationTier: 3,
            gradientAxis: 'east-west',
            gradientSign: 1
        }
    });
    const cellByKey = new Map(plan.cells.map((cell) => [`${cell.col},${cell.row}`, cell]));
    const nodeById = new Map(plan.nodes.map((node) => [node.id, node]));
    const opposite = { north: 'south', east: 'west', south: 'north', west: 'east' };
    const delta = {
        north: [0, -2], east: [2, 0], south: [0, 2], west: [-2, 0]
    };
    const checkedEdges = new Set();

    assert.equal(plan.diagnostics.moduleSize, 5);
    assert.equal(plan.diagnostics.transitionSize, 3);
    assert.equal(plan.diagnostics.requestedSpacing, 7, 'legacy spacing requests are normalized to the common grid');
    assert.ok(plan.nodes.length > 20);
    assert.ok(plan.nodes.every((node) =>
        (node.col - 10) % BAKED_STREET_MODULE_SIZE === 0 &&
        (node.row - 15) % BAKED_STREET_MODULE_SIZE === 0));

    for (const node of plan.nodes) {
        const module = BAKED_STREET_MODULE_BY_ID.get(plan.assignment.get(node.id));
        for (let localRow = 0; localRow < BAKED_STREET_MODULE_SIZE; localRow++) {
            for (let localCol = 0; localCol < BAKED_STREET_MODULE_SIZE; localCol++) {
                const symbol = module.pattern[localRow][localCol];
                if (symbol === ' ') continue;
                const cell = cellByKey.get(`${node.col + localCol - 2},${node.row + localRow - 2}`);
                assert.ok(cell, `${module.id} must stamp ${localCol},${localRow}`);
                assert.equal(cell.patternSymbol, symbol);
                assert.equal(cell.moduleSize, BAKED_STREET_MODULE_SIZE);
            }
        }

        for (const neighborRef of node.neighbors) {
            const moduleHasPortal = module.connectors.includes(neighborRef.direction);
            if (!moduleHasPortal) continue;
            const neighbor = nodeById.get(neighborRef.id);
            const targetModule = BAKED_STREET_MODULE_BY_ID.get(plan.assignment.get(neighbor.id));
            assert.ok(targetModule.connectors.includes(opposite[neighborRef.direction]));
            const [dx, dy] = delta[neighborRef.direction];
            const [targetDx, targetDy] = delta[opposite[neighborRef.direction]];
            const portal = cellByKey.get(`${node.col + dx},${node.row + dy}`);
            const reciprocal = cellByKey.get(`${neighbor.col + targetDx},${neighbor.row + targetDy}`);
            assert.ok(portal?.portal, `${node.id} ${neighborRef.direction} portal must be stamped`);
            assert.ok(reciprocal?.portal, `${neighbor.id} reciprocal portal must be stamped`);
            assert.equal(portal.portalDirection, neighborRef.direction);
            assert.equal(reciprocal.portalDirection, opposite[neighborRef.direction]);
            assert.equal(portal.portalId, reciprocal.portalId);
            assert.equal(Math.abs(portal.col - reciprocal.col) + Math.abs(portal.row - reciprocal.row), 1);

            if (checkedEdges.has(portal.portalId)) continue;
            checkedEdges.add(portal.portalId);
            const steps = Math.abs(neighbor.col - node.col) + Math.abs(neighbor.row - node.row);
            let previous = null;
            for (let step = 0; step <= steps; step++) {
                const progress = step / steps;
                const col = Math.round(node.col + (neighbor.col - node.col) * progress);
                const row = Math.round(node.row + (neighbor.row - node.row) * progress);
                const cell = cellByKey.get(`${col},${row}`);
                assert.ok(cell, `reciprocal portal path must be contiguous at ${col},${row}`);
                if (Number.isFinite(previous?.elevationTier) && Number.isFinite(cell.elevationTier)) {
                    assert.ok(Math.abs(previous.elevationTier - cell.elevationTier) <= 1,
                        `portal ramp cannot jump between ${previous.col},${previous.row} and ${col},${row}`);
                }
                previous = cell;
            }
        }
    }

    const transitions = plan.cells.filter((cell) => cell.transition);
    assert.ok(transitions.length > 0, 'high-relief reciprocal portals should encode transition tiles');
    assert.ok(transitions.every((cell) =>
        cell.transitionSize === BAKED_STREET_TRANSITION_SIZE &&
        cell.transitionPatternSymbol === 'R' &&
        cell.transitionLocalCol >= 0 && cell.transitionLocalCol < BAKED_STREET_TRANSITION_SIZE &&
        cell.transitionLocalRow >= 0 && cell.transitionLocalRow < BAKED_STREET_TRANSITION_SIZE));
    const transitionGroups = new Map();
    for (const cell of transitions) {
        if (!transitionGroups.has(cell.transitionId)) transitionGroups.set(cell.transitionId, []);
        transitionGroups.get(cell.transitionId).push(cell);
    }
    const expectedLocalCells = new Set(Array.from(
        { length: BAKED_STREET_TRANSITION_SIZE * BAKED_STREET_TRANSITION_SIZE },
        (_, index) => `${index % BAKED_STREET_TRANSITION_SIZE},${Math.floor(index / BAKED_STREET_TRANSITION_SIZE)}`
    ));
    for (const [transitionId, cells] of transitionGroups) {
        assert.equal(
            cells.length,
            BAKED_STREET_TRANSITION_SIZE * BAKED_STREET_TRANSITION_SIZE,
            `${transitionId} must rasterize all nine logical cells`
        );
        assert.deepEqual(
            new Set(cells.map((cell) => `${cell.transitionLocalCol},${cell.transitionLocalRow}`)),
            expectedLocalCells,
            `${transitionId} must cover every 3x3 local coordinate`
        );
        assert.equal(cells.filter((cell) => cell.transitionCenterline).length, BAKED_STREET_TRANSITION_SIZE);
        const centerline = cells.filter((cell) => cell.transitionCenterline);
        const horizontal = centerline.every((cell) => cell.transitionLocalRow === 1);
        const vertical = centerline.every((cell) => cell.transitionLocalCol === 1);
        assert.notEqual(horizontal, vertical, `${transitionId} must expose one cardinal centerline`);
        centerline.sort((left, right) => horizontal
            ? left.transitionLocalCol - right.transitionLocalCol
            : left.transitionLocalRow - right.transitionLocalRow);
        for (let index = 1; index < centerline.length; index++) {
            assert.ok(Math.abs(centerline[index].elevationTier - centerline[index - 1].elevationTier) <= 1,
                `${transitionId} centerline must remain pathable`);
        }
        for (const cell of cells) {
            const longitudinalIndex = horizontal ? cell.transitionLocalCol : cell.transitionLocalRow;
            assert.equal(
                cell.elevationTier,
                centerline[longitudinalIndex].elevationTier,
                `${transitionId} apron tiers must follow the centerline ramp`
            );
        }
        assert.equal(new Set(cells.map((cell) => cell.col)).size, BAKED_STREET_TRANSITION_SIZE);
        assert.equal(new Set(cells.map((cell) => cell.row)).size, BAKED_STREET_TRANSITION_SIZE);
    }

    assert.equal(cellByKey.get('10,15').elevationTier, 1, 'the exact FMG source tier remains authoritative');
    assert.equal(cellByKey.get('30,15').elevationTier, 5, 'the second FMG source tier remains authoritative');
});

test('a clipped transition apron is omitted instead of emitting a partial 3x3 module', () => {
    const fullInside = new Set();
    for (let row = 0; row <= 4; row++) {
        for (let col = 0; col <= 9; col++) fullInside.add(`${col},${row}`);
    }
    const options = {
        bounds: { minCol: 0, minRow: 0, maxCol: 9, maxRow: 4 },
        seed: 'no-partial-transition-patches',
        spacing: 5,
        gridOriginCol: 2,
        gridOriginRow: 2,
        reliefProfile: {
            formulaVersion: 'fmg-burg-relief-v1',
            reliefScore: 0.9,
            reliefClass: 'high',
            targetTierSpan: 5,
            baseElevationTier: 3,
            gradientAxis: 'east-west',
            gradientSign: 1
        }
    };
    const complete = createBakedStreetPlan({ ...options, insideCellKeys: fullInside });
    assert.equal(complete.nodes.length, 2);
    assert.equal(
        complete.cells.filter((cell) => cell.transition).length,
        BAKED_STREET_TRANSITION_SIZE * BAKED_STREET_TRANSITION_SIZE
    );

    const clippedInside = new Set(fullInside);
    clippedInside.delete('4,1');
    const clipped = createBakedStreetPlan({ ...options, insideCellKeys: clippedInside });
    assert.equal(clipped.nodes.length, 2, 'clipping the apron must not alter the five-cell node lattice');
    assert.equal(clipped.cells.filter((cell) => cell.transition).length, 0);
    const cellByKey = new Map(clipped.cells.map((cell) => [`${cell.col},${cell.row}`, cell]));
    let previous = null;
    for (let col = 2; col <= 7; col++) {
        const cell = cellByKey.get(`${col},2`);
        assert.ok(cell, `the reciprocal portal centerline must remain pathable at ${col},2`);
        if (previous) assert.ok(Math.abs(previous.elevationTier - cell.elevationTier) <= 1);
        previous = cell;
    }
});

test('vertical reciprocal portals transpose the complete 3x3 ramp around a pathable centerline', () => {
    const insideCellKeys = new Set();
    for (let row = 0; row <= 9; row++) {
        for (let col = 0; col <= 4; col++) insideCellKeys.add(`${col},${row}`);
    }
    const plan = createBakedStreetPlan({
        bounds: { minCol: 0, minRow: 0, maxCol: 4, maxRow: 9 },
        insideCellKeys,
        seed: 'vertical-three-by-three-transition',
        spacing: 5,
        gridOriginCol: 2,
        gridOriginRow: 2,
        reliefProfile: {
            formulaVersion: 'fmg-burg-relief-v1',
            reliefScore: 0.9,
            reliefClass: 'high',
            targetTierSpan: 5,
            baseElevationTier: 3,
            gradientAxis: 'north-south',
            gradientSign: 1
        }
    });
    const transitions = plan.cells.filter((cell) => cell.transition);
    assert.equal(plan.nodes.length, 2);
    assert.equal(
        transitions.length,
        BAKED_STREET_TRANSITION_SIZE * BAKED_STREET_TRANSITION_SIZE
    );
    assert.equal(new Set(transitions.map((cell) => cell.transitionId)).size, 1);
    assert.equal(new Set(transitions.map((cell) => cell.transitionLocalCol)).size, 3);
    assert.equal(new Set(transitions.map((cell) => cell.transitionLocalRow)).size, 3);
    assert.ok(transitions.filter((cell) => cell.transitionCenterline)
        .every((cell) => cell.transitionLocalCol === 1));

    const cellByKey = new Map(plan.cells.map((cell) => [`${cell.col},${cell.row}`, cell]));
    let previous = null;
    for (let row = 2; row <= 7; row++) {
        const cell = cellByKey.get(`2,${row}`);
        assert.ok(cell, `the vertical reciprocal portal centerline must continue at 2,${row}`);
        if (previous) assert.ok(Math.abs(previous.elevationTier - cell.elevationTier) <= 1);
        previous = cell;
    }
});

test('street-map WFC is deterministic, connector-safe and carries FMG elevation anchors', () => {
    const insideCellKeys = new Set();
    for (let row = 2; row <= 32; row++) {
        for (let col = 2; col <= 38; col++) insideCellKeys.add(`${col},${row}`);
    }
    const sourceStreetCells = [];
    for (let index = 0; index < 30; index++) {
        sourceStreetCells.push({
            col: 5 + index,
            row: 17,
            kind: 'main',
            elevationTier: Math.min(6, 1 + Math.floor(index / 6))
        });
    }
    const options = {
        bounds: { minCol: 2, minRow: 2, maxCol: 38, maxRow: 32 },
        insideCellKeys,
        sourceStreetCells,
        seed: 'elevated-market-grid',
        district: 'market',
        spacing: 5,
        walled: true
    };
    const first = createBakedStreetPlan(options);
    const second = createBakedStreetPlan(options);
    assert.deepEqual(first, second);
    assert.ok(first.nodes.length >= 20);
    assert.ok(first.cells.length > 0);
    assert.ok(first.diagnostics.fixedAnchors >= 1);
    assert.ok(first.diagnostics.sourceAnchors >= 1);
    assert.ok(first.diagnostics.elevatedCells >= 1);
    assert.ok(new Set(first.cells.map((cell) => cell.elevationTier).filter(Number.isFinite)).size >= 2);
    assert.ok(first.cells.every((cell) => insideCellKeys.has(`${cell.col},${cell.row}`)));

    const nodeById = new Map(first.nodes.map((node) => [node.id, node]));
    for (const node of first.nodes) {
        for (const neighbor of node.neighbors) {
            assert.equal(
                streetModulesCompatible(
                    first.assignment.get(node.id),
                    first.assignment.get(neighbor.id),
                    neighbor.direction
                ),
                true,
                `${node.id} -> ${neighbor.id}`
            );
            assert.ok(nodeById.has(neighbor.id));
        }
    }

    const themedPlans = BURG_THEME_IDS.map((architectureThemeId) => createBakedStreetPlan({
        ...options,
        architectureThemeId
    }));
    for (const [index, plan] of themedPlans.entries()) {
        assert.equal(plan.architectureThemeId, BURG_THEME_IDS[index]);
        assert.ok(plan.cells.every((cell) => cell.architectureThemeId === BURG_THEME_IDS[index]));
        assert.deepEqual(
            plan.cells.map(({ architectureThemeId: _theme, ...cell }) => cell),
            first.cells,
            'architecture selection must theme an identical WFC street topology'
        );
    }
    assert.equal(new Set(themedPlans.map((plan) => plan.diagnostics.planHash)).size, BURG_THEME_IDS.length);
});

test('high FMG relief creates a larger stepped street tier range than low relief', () => {
    const insideCellKeys = new Set();
    for (let row = 1; row <= 31; row++) {
        for (let col = 1; col <= 37; col++) insideCellKeys.add(`${col},${row}`);
    }
    const options = {
        bounds: { minCol: 1, minRow: 1, maxCol: 37, maxRow: 31 },
        insideCellKeys,
        seed: 'relief-comparison',
        district: 'residential',
        spacing: 5,
        walled: true
    };
    const low = createBakedStreetPlan({
        ...options,
        reliefProfile: {
            formulaVersion: 'fmg-burg-relief-v1',
            reliefScore: 0.12,
            reliefClass: 'low',
            targetTierSpan: 1,
            baseElevationTier: 2,
            gradientAxis: 'east-west',
            gradientSign: 1
        }
    });
    const high = createBakedStreetPlan({
        ...options,
        reliefProfile: {
            formulaVersion: 'fmg-burg-relief-v1',
            reliefScore: 0.9,
            reliefClass: 'high',
            targetTierSpan: 5,
            baseElevationTier: 3,
            gradientAxis: 'east-west',
            gradientSign: 1
        }
    });

    assert.equal(low.diagnostics.reliefFormulaVersion, 'fmg-burg-relief-v1');
    assert.equal(high.diagnostics.reliefClass, 'high');
    assert.ok(high.diagnostics.elevationRange > low.diagnostics.elevationRange);
    assert.ok(high.diagnostics.steppedCells >= low.diagnostics.steppedCells);
    assert.equal(high.diagnostics.targetTierSpan, 5);
});
