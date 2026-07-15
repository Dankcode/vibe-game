import assert from 'node:assert/strict';
import test from 'node:test';

import {
    ContextualBuildingWFCError,
    bakeContextualBuildings,
    normalizeGeographicPrior,
    normalizeSiteDoorContract,
    solveContextualBuildingWFC,
    validateBakedBuilding,
    validateContextualAssignment,
    validateContextualBuildingWFC
} from './ContextualBuildingWFC.js';

function fixture({ inhibitor = 0.68 } = {}) {
    const sites = [];
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            const inside = col < 3;
            sites.push({
                id: `site-${row}-${col}`,
                x: col * 8,
                y: row * 9,
                width: 7,
                height: 8,
                areaId: inside ? 'town-wall' : null,
                withinWalls: inside,
                geography: {
                    land: 0.92,
                    height: 31,
                    routeInfluence: row === 0 ? 0.8 : 0.25,
                    settlementInfluence: inside ? 0.9 : 0.05,
                    treeCover: 0.42,
                    inhibitor
                }
            });
        }
    }
    return {
        sites,
        areas: [{ id: 'town-wall', siteIds: sites.filter((site) => site.areaId).map((site) => site.id), minimumBuildings: 2 }]
    };
}

function normalized(result) {
    return {
        assignment: [...result.assignment].sort(([a], [b]) => a.localeCompare(b)),
        buildings: result.buildings.map((building) => ({
            id: building.id,
            siteId: building.siteId,
            module: building.wfcModuleId,
            bounds: [building.x, building.y, building.width, building.height],
            door: building.door
        }))
    };
}

test('wall confinement generates buildings while exterior parcels remain terrain', () => {
    const data = fixture();
    const result = solveContextualBuildingWFC({ ...data, seed: 'wall-context' });
    const siteById = new Map(data.sites.map((site) => [site.id, site]));
    assert.ok(result.buildings.length >= 2);
    assert.equal(result.diagnostics.outsideBuildings, 0);
    assert.ok([...result.assignment].every(([siteId, moduleId]) =>
        siteById.get(siteId).withinWalls || moduleId.startsWith('terrain-')));
    assert.equal(result.diagnostics.fallbacks, 0);
    assert.equal(validateContextualBuildingWFC({ result, ...data, seed: 'wall-context' }), true);
});

test('contextual collapse is deterministic and independent of site input order', () => {
    const data = fixture();
    const first = solveContextualBuildingWFC({ ...data, seed: 'stable-world' });
    const reordered = solveContextualBuildingWFC({ ...data, sites: [...data.sites].reverse(), seed: 'stable-world' });
    assert.deepEqual(normalized(first), normalized(reordered));
});

test('every baked building has a contiguous 2x3-or-larger interior and enterable door', () => {
    const data = fixture();
    const result = solveContextualBuildingWFC({ ...data, seed: 'enterable-buildings' });
    for (const building of result.buildings) {
        assert.ok(Math.min(building.interior.width, building.interior.height) >= 2);
        assert.ok(Math.max(building.interior.width, building.interior.height) >= 3);
        assert.equal(building.interiorCells.length, building.interior.width * building.interior.height);
        assert.equal(building.enterable, true);
        assert.equal(building.baked, true);
        assert.equal(validateBakedBuilding(building), true);
    }
});

test('site entrance contracts reserve an exterior approach and restrict deterministic door edges', () => {
    const sites = [
        {
            id: 'south-cabin', x: 0, y: 0, width: 7, height: 8,
            areaId: 'gated', withinWalls: true,
            allowedDoorEdges: ['west', 'south'],
            reservedExteriorApproach: { edge: 'south' },
            geography: { land: 1, settlementInfluence: 1, inhibitor: 0.4 }
        },
        {
            id: 'north-cabin', x: 8, y: 0, width: 7, height: 8,
            areaId: 'gated', withinWalls: true,
            allowedDoorEdges: ['north'],
            reservedExteriorApproaches: ['north'],
            geography: { land: 1, settlementInfluence: 1, inhibitor: 0.4 }
        }
    ];
    const areas = [{ id: 'gated', siteIds: sites.map((site) => site.id), minimumBuildings: 2 }];
    const first = solveContextualBuildingWFC({ sites, areas, seed: 'legal-doors' });
    const replay = solveContextualBuildingWFC({ sites: [...sites].reverse(), areas, seed: 'legal-doors' });
    assert.deepEqual(normalized(first), normalized(replay));
    assert.equal(first.buildings.find((building) => building.siteId === 'south-cabin').door.edge, 'south');
    assert.equal(first.buildings.find((building) => building.siteId === 'north-cabin').door.edge, 'north');

    const siteById = new Map(sites.map((site) => [site.id, site]));
    const occupied = new Set(first.buildings.flatMap((building) => building.footprintCells
        .map((cell) => `${building.x + cell.x},${building.y + cell.y}`)));
    for (const building of first.buildings) {
        const approach = building.exteriorApproach;
        const site = siteById.get(building.siteId);
        assert.equal(approach.reserved, true);
        assert.equal(approach.source, 'site-contract');
        assert.ok(!occupied.has(`${approach.x},${approach.y}`));
        assert.ok(approach.x >= site.x && approach.x < site.x + site.width);
        assert.ok(approach.y >= site.y && approach.y < site.y + site.height);
        assert.equal(validateBakedBuilding(building, { site }), true);
    }
    assert.deepEqual(normalizeSiteDoorContract(sites[0]).legalDoorEdges, ['south']);
});

test('a required building without a legal reserved approach contradicts explicitly', () => {
    const sites = [{
        id: 'sealed-lot', x: 0, y: 0, width: 7, height: 8,
        areaId: 'sealed', withinWalls: true,
        allowedDoorEdges: ['north'],
        reservedExteriorApproach: { edge: 'south' },
        geography: { land: 1, settlementInfluence: 1 }
    }];
    assert.throws(
        () => solveContextualBuildingWFC({
            sites,
            areas: [{ id: 'sealed', siteIds: ['sealed-lot'], minimumBuildings: 1 }],
            seed: 'sealed'
        }),
        (error) => error instanceof ContextualBuildingWFCError && error.code === 'CONTEXTUAL_WFC_NO_LEGAL_DOOR_EDGE'
    );
});

test('building modules retain deterministic cottage and shop variety across seeds', () => {
    const data = fixture({ inhibitor: 0.12 });
    const observed = new Set();
    for (let index = 0; index < 16; index++) {
        const seed = `variety-${index}`;
        const first = solveContextualBuildingWFC({ ...data, seed });
        const replay = solveContextualBuildingWFC({ ...data, seed });
        assert.deepEqual(normalized(first), normalized(replay));
        for (const building of first.buildings) observed.add(building.wfcModuleId);
    }
    assert.ok(observed.has('building-cottage'));
    assert.ok(observed.has('building-shop'));
    assert.ok(observed.size >= 4, `expected broad deterministic module variety, received ${[...observed].join(', ')}`);
});

test('global JSON-derived prior is numeric-only and high confidence inhibits entropy', () => {
    const prior = normalizeGeographicPrior({
        land: 0.8,
        height: 72,
        river: 0.1,
        route: 0.7,
        confidence: 0.9,
        townPayload: { buildings: ['must-not-be-read'] },
        buildingName: 'ignored'
    });
    assert.deepEqual(Object.keys(prior), [
        'land', 'height', 'riverInfluence', 'routeInfluence', 'settlementInfluence', 'treeCover', 'inhibitor'
    ]);
    assert.equal(prior.height, 0.72);
    assert.equal(prior.inhibitor, 0.9);
    assert.ok(!('townPayload' in prior));

    const low = solveContextualBuildingWFC({ ...fixture({ inhibitor: 0 }), seed: 'inhibitor' });
    const high = solveContextualBuildingWFC({ ...fixture({ inhibitor: 0.92 }), seed: 'inhibitor' });
    assert.ok(high.diagnostics.meanDomainSize < low.diagnostics.meanDomainSize);
});

test('undersized walled areas contradict instead of falling back to invalid cabins', () => {
    const sites = [
        { id: 'tiny-a', x: 0, y: 0, width: 3, height: 4, areaId: 'tiny', withinWalls: true, geography: { land: 1 } },
        { id: 'tiny-b', x: 4, y: 0, width: 3, height: 4, areaId: 'tiny', withinWalls: true, geography: { land: 1 } }
    ];
    assert.throws(
        () => solveContextualBuildingWFC({ sites, areas: [{ id: 'tiny', minimumBuildings: 2 }], seed: 'too-small' }),
        (error) => error instanceof ContextualBuildingWFCError && error.code === 'CONTEXTUAL_WFC_AREA_CAPACITY'
    );
});

test('validators reject an exterior building assignment and a malformed baked interior', () => {
    const data = fixture();
    const result = solveContextualBuildingWFC({ ...data, seed: 'validator' });
    const exterior = data.sites.find((site) => !site.withinWalls);
    const invalidAssignment = new Map(result.assignment);
    invalidAssignment.set(exterior.id, 'building-cabin');
    assert.throws(
        () => validateContextualAssignment({ assignment: invalidAssignment, ...data, seed: 'validator' }),
        (error) => error instanceof ContextualBuildingWFCError && error.code === 'WFC_INVALID_RESULT'
    );

    const malformed = { ...result.buildings[0], interior: { x: 1, y: 1, width: 1, height: 2 } };
    assert.throws(
        () => validateBakedBuilding(malformed),
        (error) => error instanceof ContextualBuildingWFCError && error.code === 'CONTEXTUAL_WFC_INTERIOR_TOO_SMALL'
    );
});

test('standalone baking rejects building modules that do not fit a parcel', () => {
    assert.throws(
        () => bakeContextualBuildings({
            assignment: new Map([['small', 'building-cabin']]),
            sites: [{ id: 'small', x: 0, y: 0, width: 3, height: 3 }],
            seed: 'no-fit'
        }),
        (error) => error instanceof ContextualBuildingWFCError && error.code === 'CONTEXTUAL_WFC_BUILDING_CAPACITY'
    );
});
