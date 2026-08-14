import assert from 'node:assert/strict';
import test from 'node:test';

import { ACTIVE_GEOGRAPHY, ACTIVE_SETTLEMENT_BLUEPRINTS, ACTIVE_TOWNS } from './ActiveWorldData.js';
import { ACTIVE_BURG_COUNT, ACTIVE_BURG_IDS } from './ActiveBurgSelection.js';
import { createFantasyWorldPlanAt, getDefaultWorldLocation, getWorldMapLocations } from './FantasyWorldData.js';
import {
    WORLD_SAMPLE_SCALE,
    sampleGeographicField
} from './GeographicWFCGenerator.js';
import { WORLD_PALETTE_IDS } from './WorldPalettes.js';
import { validateBakedBuilding } from './BakedBuildingLibrary.js';
import { getBiomeName } from './WorldTileSet.js';
import {
    FMG_BURG_RELIEF_FORMULA_VERSION,
    createBlueprintSkeleton,
    createSettlementConstraintAnchors
} from './WorldConstraintField.js';
import {
    TERRAIN_MACRO_TILE_LIBRARY_VERSION,
    TERRAIN_PRIMARY_MACRO_SIZE,
    TERRAIN_TRANSITION_MACRO_SIZE
} from './TerrainMacroTileLibrary.js';

test('active FMG reference is geography-only', () => {
    assert.equal(Object.keys(ACTIVE_TOWNS).length, 0);
    assert.equal(ACTIVE_GEOGRAPHY.cells.length, 7302);
    assert.equal(ACTIVE_GEOGRAPHY.routes.length, 84);
    assert.equal(ACTIVE_GEOGRAPHY.rivers.length, 223);
    assert.equal(ACTIVE_GEOGRAPHY.burgs.length, ACTIVE_BURG_COUNT);
    assert.deepEqual(ACTIVE_GEOGRAPHY.burgs.map((burg) => burg.id), ACTIVE_BURG_IDS);
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

test('FMG height data produces genuinely high stacked WFC towns', () => {
    const locations = getWorldMapLocations();
    const lowLocation = locations.find((location) => location.id === 'burg-15');
    const highLocation = locations.find((location) => location.id === 'burg-45');
    assert.ok(lowLocation && highLocation);
    assert.ok(
        sampleGeographicField(highLocation.x, highLocation.y).height >
        sampleGeographicField(lowLocation.x, lowLocation.y).height + 30
    );

    const lowPlan = createFantasyWorldPlanAt(lowLocation.x, lowLocation.y, { variant: 0 });
    const highPlan = createFantasyWorldPlanAt(highLocation.x, highLocation.y, { variant: 0 });
    assert.equal(highPlan.generation.elevation.formulaVersion, FMG_BURG_RELIEF_FORMULA_VERSION);
    assert.ok(highPlan.generation.elevation.terrainTierMaximum >= 5);
    assert.ok(
        highPlan.generation.elevation.terrainTierRange >=
        lowPlan.generation.elevation.terrainTierRange + 2
    );
    // Roadless lowland burgs may contain more total street cells than compact highland towns, so
    // compare the achieved tier span rather than a raw count of modules whose style happens to be
    // tagged as steps.
    assert.ok(
        highPlan.generation.elevation.generatedStreetElevationRange >=
        lowPlan.generation.elevation.generatedStreetElevationRange + 2
    );
    assert.ok(
        highPlan.generation.elevation.buildingBaseElevationMaximum >
        lowPlan.generation.elevation.buildingBaseElevationMaximum
    );
    assert.equal(highPlan.generation.elevation.illegalBuildingCliffs, 0);
});

test('terrain WFC resolves valid chunks with compact burg vectors and formula infill', () => {
    const location = getWorldMapLocations().find((candidate) => candidate.id === 'burg-2');
    assert.ok(location, 'the active set must retain burg-2 as a vector and formula-infill fixture');
    const plan = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
    const variation = createFantasyWorldPlanAt(location.x, location.y, { variant: 1 });
    assert.equal(plan.generation.mode, 'blueprint-first-geographic-wfc');
    assert.equal(plan.generation.blueprintFirst, true);
    assert.equal(plan.generation.townPayloadsRead, false);
    assert.equal(plan.generation.terrainWfc.invalidAdjacencies, 0);
    assert.ok(plan.generation.terrainWfc.fallbacks < plan.generation.terrainWfc.chunks);
    assert.equal(plan.generation.fixedSkeletonHash, variation.generation.fixedSkeletonHash);
    assert.equal(plan.generation.elevation.formulaVersion, FMG_BURG_RELIEF_FORMULA_VERSION);
    assert.equal(plan.generation.elevation.vectorElevationMode, 'soft-macro-inhibitor');
    assert.equal(plan.generation.elevation.vectorElevationConstraintsApplied, true);
    assert.equal(plan.generation.elevation.illegalBuildingCliffs, 0);
    assert.equal(plan.generation.elevation.illegalRoadCliffs, 0);
    assert.equal(plan.generation.terrainMacroWfc.libraryVersion, TERRAIN_MACRO_TILE_LIBRARY_VERSION);
    assert.equal(plan.generation.terrainMacroWfc.primarySize, TERRAIN_PRIMARY_MACRO_SIZE);
    assert.equal(plan.generation.terrainMacroWfc.transitionSize, TERRAIN_TRANSITION_MACRO_SIZE);
    assert.equal(plan.generation.terrainMacroWfc.globalAnchor, true);
    assert.equal(plan.generation.terrainMacroWfc.solved, true);
    assert.equal(plan.generation.terrainMacroWfc.incompatibleEdges, 0);
    assert.equal(plan.generation.terrainMacroWfc.fallbacks, 0);
    assert.equal(plan.generation.terrainMacroWfc.isolatedElevationCells, 0);
    assert.ok(plan.generation.terrainMacroWfc.primaryModules > 0);
    assert.equal(plan.generation.pathConnectivity.valid, true);
    assert.equal(plan.generation.pathConnectivity.buildings.connectedDoors,
        plan.generation.pathConnectivity.buildings.doors);
    assert.ok(plan.generation.elevation.settlementProfiles.length >= 1);
    assert.ok(plan.buildings.length >= 4);
    assert.equal(plan.generation.coupledTerrainAndBuildings, true);
    assert.ok(plan.generation.buildingWfc.assignedBuildings >= 1, 'building occupancy must be selected by WFC');
    assert.ok(plan.generation.buildingWfc.bakedBuildings >= 2, 'each qualifying town needs a couple of baked landmarks');
    assert.equal(plan.generation.buildingWfc.vectorWallSystems, 1, 'the primary burg should use one FMG vector wall system');
    assert.equal(plan.generation.buildingWfc.wallRings, 0, 'source vector walls replace population-derived rings');
    assert.ok(plan.generation.buildingWfc.vectorBuildings >= 1, 'FMG footprints should become fixed enterable buildings');
    assert.ok(plan.generation.buildingWfc.keeps >= 1, 'capital manor data should become an enterable keep');
    assert.ok(plan.generation.buildingWfc.insideSiteBuildingRatio >= 0.7, 'walled parcels should resolve mainly to buildings');
    assert.equal(plan.generation.buildingWfc.fallbacks, 0);
    assert.ok(plan.rows.join('').includes('T'), 'FMG wall flags must create physical confinement');
    const compiledWallHeights = plan.wallHeightRows.flat().filter((height) => height > 0);
    assert.equal(compiledWallHeights.length, [...plan.rows.join('')].filter((symbol) => symbol === 'T').length);
    assert.ok(Math.min(...compiledWallHeights) >= 3, 'wall extrusion must retain compiled tier heights');
    assert.equal(new Set(compiledWallHeights).size, 1, 'a source-authored wall system should retain one FMG wall height');
    assert.ok(plan.buildings.some((building) => building.wfcGenerated));
    assert.ok(plan.buildings.some((building) => building.bakedGenerated));
    assert.ok(plan.buildings.some((building) => building.vectorGenerated));
    assert.ok(plan.buildings.every((building) =>
        building.proceduralGenerated && building.enterable && building.door && validateBakedBuilding(building).valid));
    assert.ok(plan.paletteRows.flat().every((paletteId) => WORLD_PALETTE_IDS.includes(paletteId)));
    assert.ok(plan.paletteRows.flat().includes('path'), 'roads and plazas need a contrasting path palette');
});

test('source street tiers inhibit macro collapse while final player roads stay traversable', () => {
    const location = getDefaultWorldLocation();
    const plan = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
    const anchors = createSettlementConstraintAnchors({
        blueprints: ACTIVE_SETTLEMENT_BLUEPRINTS,
        burgs: ACTIVE_GEOGRAPHY.burgs,
        centerX: plan.world.sampleCenterX,
        centerY: plan.world.sampleCenterY,
        width: plan.width,
        height: plan.height,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    const offsetX = Math.floor(plan.width / 2);
    const offsetY = Math.floor(plan.height / 2);
    const fields = Array.from({ length: plan.width * plan.height }, (_, id) => {
        const col = id % plan.width;
        const row = Math.floor(id / plan.width);
        return sampleGeographicField(
            plan.world.sampleCenterX + (col - offsetX) * WORLD_SAMPLE_SCALE,
            plan.world.sampleCenterY + (row - offsetY) * WORLD_SAMPLE_SCALE,
            { seed: plan.seed }
        );
    });
    const skeleton = createBlueprintSkeleton({
        settlements: anchors,
        fields,
        width: plan.width,
        height: plan.height,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    const fixedSourceCells = [...skeleton.cells.values()].filter((cell) =>
        (cell.source === 'town-vector' || cell.elevationSource === 'town-vector') &&
        Number.isFinite(cell.elevationTier));
    assert.ok(fixedSourceCells.length > 0);
    assert.equal(plan.generation.vectorStreets.cells, skeleton.diagnostics.vectorStreetCells);
    assert.equal(plan.generation.vectorStreets.streetMapCells, skeleton.diagnostics.streetMapCells);
    assert.deepEqual(plan.generation.vectorStreets.streetMapModules, skeleton.diagnostics.streetMapModules);

    const violations = [];
    let adjustedSourceCells = 0;
    const roadSymbols = new Set(['R', ':', ';', '=']);
    for (const cell of fixedSourceCells) {
        if (plan.elevationRows[cell.row][cell.col] !== cell.elevationTier) adjustedSourceCells++;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const col = cell.col + dx;
            const row = cell.row + dy;
            const symbol = plan.rows[row]?.[col];
            if (!roadSymbols.has(plan.rows[cell.row]?.[cell.col]) || !roadSymbols.has(symbol)) continue;
            const difference = Math.abs(
                plan.elevationRows[cell.row][cell.col] - plan.elevationRows[row][col]
            );
            if (difference > 1) violations.push(`${cell.col},${cell.row} -> ${col},${row}: ${difference}`);
        }
    }
    assert.ok(adjustedSourceCells > 0, 'contradictory raw FMG tiers should yield to macro path safety');
    assert.deepEqual(violations, [], 'FMG-guided roads must form one-tier player ramps');
    assert.equal(plan.generation.elevation.illegalRoadCliffs, 0);
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
