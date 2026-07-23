#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    ACTIVE_GEOGRAPHY,
    ACTIVE_SETTLEMENT_BLUEPRINTS,
    ACTIVE_TOWNS,
    ACTIVE_WORLD
} from '../client/src/data/ActiveWorldData.js';
import { createFantasyWorldPlanAt, getDefaultWorldLocation } from '../client/src/data/FantasyWorldData.js';
import { WORLD_PALETTE_IDS } from '../client/src/data/WorldPalettes.js';
import { validateBakedBuilding } from '../client/src/data/BakedBuildingLibrary.js';
import { BAKED_PARTIAL_CHUNKS } from '../client/src/data/BakedChunkData.js';
import {
    TERRAIN_WFC_CHUNK_SIZE,
    WORLD_SAMPLE_SCALE
} from '../client/src/data/GeographicWFCGenerator.js';
import { validatePartialChunkRegistry } from '../client/src/data/PartialChunkRegistry.js';
import { GEOGRAPHIC_TILES } from '../client/src/data/WorldTileSet.js';
import {
    SETTLEMENT_BLUEPRINT_MAX_BYTES,
    validateSettlementBlueprintSet
} from '../client/src/data/SettlementBlueprint.js';
import { SETTLEMENT_BLUEPRINT_GENERATION_VERSION } from './compile_world_blueprints.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const activeModulePath = path.join(repoRoot, 'client', 'src', 'data', 'ActiveWorldData.js');
const importerPath = path.join(repoRoot, 'tools', 'import_world_map_package.mjs');
const compilerPath = path.join(repoRoot, 'tools', 'compile_world_blueprints.mjs');
const EXPECTED_SETTLEMENTS = 60;

assert.equal(ACTIVE_WORLD.generationVersion, SETTLEMENT_BLUEPRINT_GENERATION_VERSION);
assert.equal(ACTIVE_WORLD.sourceName, 'Masia');
assert.match(ACTIVE_WORLD.contentHash || '', /^[a-f0-9]{64}$/);
assert.equal(Object.keys(ACTIVE_TOWNS).length, 0, 'town payload archive must remain empty');
assert.equal(ACTIVE_GEOGRAPHY.schema, 'vibe-game-active-geography');
assert.equal(ACTIVE_GEOGRAPHY.cells.length, 7302);
assert.equal(ACTIVE_GEOGRAPHY.biomes.length, 13);
assert.equal(ACTIVE_GEOGRAPHY.routes.length, 84);
assert.equal(ACTIVE_GEOGRAPHY.rivers.length, 223);
assert.equal(ACTIVE_GEOGRAPHY.burgs.length, EXPECTED_SETTLEMENTS);
const blueprintValidation = validateSettlementBlueprintSet(ACTIVE_SETTLEMENT_BLUEPRINTS, {
    expectedCount: EXPECTED_SETTLEMENTS,
    byteLimit: SETTLEMENT_BLUEPRINT_MAX_BYTES
});
assert.equal(blueprintValidation.valid, true, blueprintValidation.errors?.join('\n'));
assert.equal(ACTIVE_SETTLEMENT_BLUEPRINTS.blueprints.length, EXPECTED_SETTLEMENTS);
assert.equal(ACTIVE_SETTLEMENT_BLUEPRINTS.coverage.unexplainedFields.length, 0);
assert.ok(
    Buffer.byteLength(JSON.stringify(ACTIVE_SETTLEMENT_BLUEPRINTS.blueprints)) <=
    SETTLEMENT_BLUEPRINT_MAX_BYTES
);
for (const cluster of ACTIVE_SETTLEMENT_BLUEPRINTS.clusters) {
    const members = ACTIVE_SETTLEMENT_BLUEPRINTS.blueprints.filter((blueprint) => blueprint.clusterId === cluster.id);
    assert.equal(members.filter((blueprint) => blueprint.hierarchy === 'seat').length, 1, `${cluster.id} needs one seat`);
    assert.ok(members.filter((blueprint) => blueprint.hierarchy === 'fief').every((blueprint) =>
        blueprint.wallRings.length === 0 && blueprint.roads.some((road) => road.toBurgId === blueprint.liegeBurgId)
    ), `${cluster.id} fiefs must be unwalled and gate-linked`);
}
assert.ok(ACTIVE_SETTLEMENT_BLUEPRINTS.blueprints
    .filter((blueprint) => blueprint.burg.flags.capital)
    .every((blueprint) => blueprint.wallRings.length === 3 && blueprint.castle));
assert.ok(ACTIVE_SETTLEMENT_BLUEPRINTS.globalWater.waterfalls.length > 0);
assert.ok(ACTIVE_GEOGRAPHY.cells.every((cell) =>
    Number.isFinite(cell.x) && Number.isFinite(cell.y) && Number.isFinite(cell.height) &&
    Array.isArray(cell.neighbors) && (cell.land === 0 || cell.land === 1)
));
assert.ok(ACTIVE_WORLD.locations.every((location) => !('townFile' in location)));
assert.ok(ACTIVE_GEOGRAPHY.burgs.every((burg) => !('townFile' in burg) && !('buildings' in burg)));
const partialChunkValidation = validatePartialChunkRegistry(BAKED_PARTIAL_CHUNKS, {
    generationVersion: ACTIVE_WORLD.generationVersion,
    worldContentHash: ACTIVE_WORLD.contentHash,
    sampleScale: WORLD_SAMPLE_SCALE,
    chunkSize: TERRAIN_WFC_CHUNK_SIZE,
    allowedTileIds: new Set(GEOGRAPHIC_TILES.map((tile) => tile.id))
});
assert.equal(partialChunkValidation.valid, true, partialChunkValidation.errors.join('\n'));
assert.equal(
    partialChunkValidation.compatible,
    true,
    partialChunkValidation.compatibilityErrors.join('\n')
);
assert.ok(partialChunkValidation.cellCount > 0, 'active world must publish a partial baked terrain core');

const importerSource = await readFile(importerPath, 'utf8');
const compilerSource = await readFile(compilerPath, 'utf8');
assert.doesNotMatch(importerSource, /readJson\([^\n]*(?:town|building)/i, 'importer must not parse town/building JSON');
assert.doesNotMatch(importerSource, /readdir\([^\n]*(?:town|building)/i, 'importer must not enumerate town/building JSON');
assert.doesNotMatch(compilerSource, /readJson\([^\n]*(?:town|building)/i, 'compiler must not parse town/building JSON');
assert.doesNotMatch(compilerSource, /readdir\([^\n]*(?:town|building)/i, 'compiler must not enumerate town/building JSON');

const activeModuleStats = await stat(activeModulePath);
assert.ok(activeModuleStats.size < 5_000_000, `active geography module should stay compact; got ${activeModuleStats.size} bytes`);

const location = getDefaultWorldLocation();
const base = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
const exactReplay = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
const variation = createFantasyWorldPlanAt(location.x, location.y, { variant: 1 });

assert.equal(hashPlan(exactReplay), hashPlan(base), 'same FMG coordinate and seed must replay exactly');
assert.notEqual(hashPlan(variation), hashPlan(base), 'a new variant must create a distinct world');
assert.equal(base.generation.mode, 'blueprint-first-geographic-wfc');
assert.equal(base.generation.blueprintFirst, true);
assert.equal(base.generation.townPayloadsRead, false);
assert.equal(base.generation.terrainWfc.invalidAdjacencies, 0);
assert.ok(base.generation.terrainWfc.fallbacks < base.generation.terrainWfc.chunks);
assert.equal(base.generation.partialBake.registryCompatible, true);
assert.ok(base.generation.partialBake.appliedCells > 0);
assert.equal(base.generation.partialBake.constraintConflicts, 0);
assert.equal(base.generation.coupledTerrainAndBuildings, true);
assert.equal(base.generation.couplingMode, 'shared-constraint-sequential-wfc');
assert.equal(base.generation.worldAnchoredChunks, true);
assert.equal(base.generation.minimumInterior, '2x3');
assert.ok(base.generation.constraintField.inhibitedCells > 0, 'FMG geography must inhibit local entropy');
assert.ok(base.generation.buildingWfc.walledAreas >= 1, 'FMG wall flags must produce confined towns');
assert.ok(base.generation.buildingWfc.walledAreas <= 1, 'a view may contain at most one wall system');
assert.equal(base.generation.buildingWfc.wallRings, 3, 'capital seats must render three wall rings');
assert.ok(base.generation.buildingWfc.keeps >= 1, 'capital/citadel seats must render a fixed keep');
assert.ok(base.generation.buildingWfc.wardWaves >= 2, 'capital interiors must solve as separate ward waves');
assert.ok(base.generation.buildingWfc.wallCells > 0, 'confined towns must stamp physical walls');
assert.ok(base.generation.buildingWfc.assignedBuildings >= 1, 'WFC must choose building occupancy');
assert.ok(base.generation.buildingWfc.bakedBuildings >= 2, 'qualifying town areas must receive baked landmarks');
assert.ok(base.generation.buildingWfc.insideSiteBuildingRatio >= 0.7, 'walled parcel assignments must be mainly buildings');
assert.equal(base.generation.buildingWfc.fallbacks, 0);
assert.equal(base.generation.buildingWfc.contradictions, 0);
assert.equal(base.generation.fixedSkeletonHash, variation.generation.fixedSkeletonHash,
    'variant seeds may reshape wards but not the parser-fixed skeleton');
assert.ok(base.rows.length === base.height && base.rows.every((row) => row.length === base.width));
assert.ok(base.elevationRows.length === base.height && base.elevationRows.every((row) => row.length === base.width));
assert.ok(base.wallHeightRows.length === base.height && base.wallHeightRows.every((row) => row.length === base.width));
assert.ok(base.paletteRows.length === base.height && base.paletteRows.every((row) => row.length === base.width));
assert.ok(base.visualVariantRows.length === base.height && base.visualVariantRows.every((row) => row.length === base.width));
assert.ok(base.elevationRows.flat().every((value) => Number.isInteger(value) && value >= 0 && value <= 6));
assert.ok(base.paletteRows.flat().every((paletteId) => WORLD_PALETTE_IDS.includes(paletteId)));
assert.ok(base.visualVariantRows.every((row) => /^[0-5]+$/.test(row)));
const wallHeights = [];
for (let row = 0; row < base.height; row++) {
    for (let col = 0; col < base.width; col++) {
        if (base.rows[row][col] === 'T') wallHeights.push(base.wallHeightRows[row][col]);
        else assert.equal(base.wallHeightRows[row][col], 0, 'only fixed wall nodes may request wall extrusion');
    }
}
assert.ok(wallHeights.length > 0 && wallHeights.every((height) => height >= 3 && height <= 9));
assert.ok(Math.max(...wallHeights) > Math.min(...wallHeights), 'capital walls must preserve tiered compiled heights');
assert.ok(base.buildings.length >= 4, 'default generated settlement should have explorable structures');
assert.ok(base.buildings.some((building) => building.blueprintId === 'castle-keep' && building.enterable),
    'default capital must contain an enterable fixed keep');
assert.ok(base.decorations.length >= 20, 'default region should have biome detail');
const waterfallDecorations = base.decorations.filter((decoration) => decoration.type === 'waterfall');
const gatehouseDecorations = base.decorations.filter((decoration) => decoration.type === 'archway' && decoration.gatehouse);
assert.ok(gatehouseDecorations.length > 0, 'compiled capital gates must emit gatehouse renderer directives');
assert.ok(gatehouseDecorations.every((decoration) => decoration.widthTiles >= 1 && decoration.blueprintFixed));
assert.ok(waterfallDecorations.length > 0, 'compiled water drops must survive as runtime waterfall directives');
assert.ok(waterfallDecorations.every((decoration) =>
    decoration.blueprintFixed && decoration.dropTiers >= 1 && decoration.widthTiles >= 1 && decoration.plungePool !== false));
assert.deepEqual(
    variation.decorations.filter((decoration) => decoration.type === 'waterfall')
        .map((decoration) => [decoration.directiveId, decoration.x, decoration.y, decoration.dropTiers]),
    waterfallDecorations.map((decoration) => [decoration.directiveId, decoration.x, decoration.y, decoration.dropTiers]),
    'waterfall skeleton directives must remain fixed across variants'
);

const buildingCells = new Set();
for (const building of base.buildings) {
    assert.ok(building.proceduralGenerated, 'all buildings must be formula-generated');
    assert.equal(building.enterable, true, `${building.id} must be enterable`);
    assert.ok(building.door, `${building.id} must have a door`);
    const interiorValidation = validateBakedBuilding(building);
    assert.equal(interiorValidation.valid, true, `${building.id}: ${interiorValidation.errors.join(', ')}`);
    assert.ok(Math.min(interiorValidation.enterableSpace.width, interiorValidation.enterableSpace.height) >= 2);
    assert.ok(Math.max(interiorValidation.enterableSpace.width, interiorValidation.enterableSpace.height) >= 3);
    const footprint = building.footprintCells?.length
        ? building.footprintCells
        : Array.from({ length: building.height }, (_, y) => Array.from({ length: building.width }, (_, x) => ({ x, y }))).flat();
    assert.ok(footprint.some((cell) => cell.x === building.door.x && cell.y === building.door.y), `${building.id} door must be on its footprint`);
    for (const cell of footprint) {
        const col = building.x + cell.x + Math.floor(base.width / 2);
        const row = building.y + cell.y + Math.floor(base.height / 2);
        assert.ok(col >= 0 && row >= 0 && col < base.width && row < base.height, `${building.id} footprint must stay in bounds`);
        assert.ok(!['W', '~', 'B', 'I'].includes(base.rows[row][col]), `${building.id} cannot occupy water`);
        const key = `${col},${row}`;
        assert.ok(!buildingCells.has(key), `generated building overlap at ${key}`);
        buildingCells.add(key);
    }
}

let terrainDifferences = 0;
let macroWaterDifferences = 0;
let visualDifferences = 0;
const paletteSet = new Set(base.paletteRows.flat());
const variantSet = new Set(base.visualVariantRows.join(''));
const total = base.width * base.height;
const macroWater = (symbol) => ['W', '~', 'I'].includes(symbol);
for (let y = 0; y < base.height; y++) {
    for (let x = 0; x < base.width; x++) {
        if (base.rows[y][x] !== variation.rows[y][x]) terrainDifferences++;
        if (macroWater(base.rows[y][x]) !== macroWater(variation.rows[y][x])) macroWaterDifferences++;
        if (base.visualVariantRows[y][x] !== variation.visualVariantRows[y][x]) visualDifferences++;
    }
}
assert.ok(terrainDifferences / total > 0.1 && terrainDifferences / total < 0.7);
assert.ok(macroWaterDifferences / total < 0.1, 'variant must preserve recognizable FMG coastlines');
assert.ok(visualDifferences / total > 0.3);
assert.ok(paletteSet.size >= 4, 'default region should expose several coherent palette neighborhoods');
assert.equal(variantSet.size, 6, 'finite material cache should exercise all six visual variants');

console.log(JSON.stringify({
    ok: true,
    generationVersion: ACTIVE_WORLD.generationVersion,
    contentHash: ACTIVE_WORLD.contentHash,
    activeModuleBytes: activeModuleStats.size,
    geography: {
        cells: ACTIVE_GEOGRAPHY.cells.length,
        biomes: ACTIVE_GEOGRAPHY.biomes.length,
        routes: ACTIVE_GEOGRAPHY.routes.length,
        rivers: ACTIVE_GEOGRAPHY.rivers.length,
        burgAnchors: ACTIVE_GEOGRAPHY.burgs.length,
        settlementBlueprints: ACTIVE_SETTLEMENT_BLUEPRINTS.blueprints.length,
        clusters: ACTIVE_SETTLEMENT_BLUEPRINTS.clusters.length,
        waterfalls: ACTIVE_SETTLEMENT_BLUEPRINTS.globalWater.waterfalls.length,
        unexplainedFields: ACTIVE_SETTLEMENT_BLUEPRINTS.coverage.unexplainedFields.length
    },
    defaultRegion: {
        location: base.townName,
        biome: base.theme.biome,
        palette: base.theme.paletteId,
        seed: base.seed,
        buildings: base.buildings.length,
        decorations: base.decorations.length,
        palettes: paletteSet.size,
        visualVariants: variantSet.size,
        terrainWfc: base.generation.terrainWfc,
        buildingWfc: base.generation.buildingWfc,
        constraintField: base.generation.constraintField
    },
    variation: {
        terrainHammingRatio: round(terrainDifferences / total),
        macroWaterHammingRatio: round(macroWaterDifferences / total),
        visualHammingRatio: round(visualDifferences / total)
    }
}, null, 2));

function hashPlan(plan) {
    return createHash('sha256').update(JSON.stringify({
        rows: plan.rows,
        elevations: plan.elevationRows,
        palettes: plan.paletteRows,
        variants: plan.visualVariantRows,
        buildings: plan.buildings,
        decorations: plan.decorations,
        seed: plan.seed
    })).digest('hex');
}

function round(value) {
    return Math.round(value * 10000) / 10000;
}
