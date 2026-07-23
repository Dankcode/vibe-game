import assert from 'node:assert/strict';
import test from 'node:test';

import { ACTIVE_GEOGRAPHY, ACTIVE_TOWNS } from './ActiveWorldData.js';
import { createFantasyWorldPlanAt, getDefaultWorldLocation, getWorldMapLocations } from './FantasyWorldData.js';
import { sampleGeographicField } from './GeographicWFCGenerator.js';
import { WORLD_PALETTE_IDS } from './WorldPalettes.js';
import { validateBakedBuilding } from './BakedBuildingLibrary.js';
import { getBiomeName } from './WorldTileSet.js';

test('active FMG reference is geography-only', () => {
    assert.equal(Object.keys(ACTIVE_TOWNS).length, 0);
    assert.equal(ACTIVE_GEOGRAPHY.cells.length, 7302);
    assert.equal(ACTIVE_GEOGRAPHY.routes.length, 84);
    assert.equal(ACTIVE_GEOGRAPHY.rivers.length, 223);
    assert.equal(ACTIVE_GEOGRAPHY.burgs.length, 60);
    assert.ok(ACTIVE_GEOGRAPHY.burgs.every((burg) => !('townFile' in burg) && !('buildings' in burg)));
});

test('geographic fields interpolate deterministically from FMG cells', () => {
    const location = getDefaultWorldLocation();
    const first = sampleGeographicField(location.x + 0.25, location.y - 0.25, { seed: 42 });
    const second = sampleGeographicField(location.x + 0.25, location.y - 0.25, { seed: 42 });
    assert.deepEqual(first, second);
    assert.ok(first.land >= 0 && first.land <= 1);
    assert.ok(first.height >= 0 && first.height <= 100);
    assert.ok(first.riverInfluence >= 0 && first.riverInfluence <= 1);
});

test('terrain WFC resolves valid chunks and formula buildings without town payloads', () => {
    const location = getDefaultWorldLocation();
    const plan = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
    const variation = createFantasyWorldPlanAt(location.x, location.y, { variant: 1 });
    assert.equal(plan.generation.mode, 'blueprint-first-geographic-wfc');
    assert.equal(plan.generation.blueprintFirst, true);
    assert.equal(plan.generation.townPayloadsRead, false);
    assert.equal(plan.generation.terrainWfc.invalidAdjacencies, 0);
    assert.ok(plan.generation.terrainWfc.fallbacks < plan.generation.terrainWfc.chunks);
    assert.equal(plan.generation.fixedSkeletonHash, variation.generation.fixedSkeletonHash);
    assert.ok(plan.buildings.length >= 4);
    assert.equal(plan.generation.coupledTerrainAndBuildings, true);
    assert.ok(plan.generation.buildingWfc.assignedBuildings >= 1, 'building occupancy must be selected by WFC');
    assert.ok(plan.generation.buildingWfc.bakedBuildings >= 2, 'each qualifying town needs a couple of baked landmarks');
    assert.equal(plan.generation.buildingWfc.wallRings, 3, 'capital seat should project three aligned rings');
    assert.ok(plan.generation.buildingWfc.keeps >= 1, 'capital seat should reserve an enterable keep');
    assert.ok(plan.generation.buildingWfc.insideSiteBuildingRatio >= 0.7, 'walled parcels should resolve mainly to buildings');
    assert.equal(plan.generation.buildingWfc.fallbacks, 0);
    assert.ok(plan.rows.join('').includes('T'), 'FMG wall flags must create physical confinement');
    const compiledWallHeights = plan.wallHeightRows.flat().filter((height) => height > 0);
    assert.equal(compiledWallHeights.length, [...plan.rows.join('')].filter((symbol) => symbol === 'T').length);
    assert.ok(Math.min(...compiledWallHeights) >= 3, 'wall extrusion must retain compiled tier heights');
    assert.ok(Math.max(...compiledWallHeights) > Math.min(...compiledWallHeights), 'capital rings should read as tiered fortifications');
    assert.ok(plan.buildings.some((building) => building.wfcGenerated));
    assert.ok(plan.buildings.some((building) => building.bakedGenerated));
    assert.ok(plan.buildings.every((building) =>
        building.proceduralGenerated && building.enterable && building.door && validateBakedBuilding(building).valid));
    assert.ok(plan.paletteRows.flat().every((paletteId) => WORLD_PALETTE_IDS.includes(paletteId)));
    assert.ok(plan.paletteRows.flat().includes('path'), 'roads and plazas need a contrasting path palette');
});

test('distant FMG regions resolve to distinct coherent palettes', () => {
    const locations = getWorldMapLocations();
    const desert = locations.find((location) => (
        getBiomeName(
            sampleGeographicField(location.x, location.y).biome,
            ACTIVE_GEOGRAPHY.biomes
        ) === 'Hot desert'
    ));
    const forest = getDefaultWorldLocation();
    assert.ok(desert);
    const desertPlan = createFantasyWorldPlanAt(desert.x, desert.y, { variant: 0 });
    const forestPlan = createFantasyWorldPlanAt(forest.x, forest.y, { variant: 0 });
    assert.equal(desertPlan.theme.biome, 'Hot desert');
    assert.equal(desertPlan.theme.paletteId, 'desert');
    assert.notEqual(desertPlan.theme.paletteId, forestPlan.theme.paletteId);
    const desertRatio = desertPlan.paletteRows.flat().filter((paletteId) => paletteId === 'desert').length /
        (desertPlan.width * desertPlan.height);
    assert.ok(desertRatio > 0.45, 'desert region should read as a coherent color neighborhood');
});
