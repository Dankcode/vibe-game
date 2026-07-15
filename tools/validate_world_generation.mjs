#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ACTIVE_GEOGRAPHY, ACTIVE_TOWNS, ACTIVE_WORLD } from '../client/src/data/ActiveWorldData.js';
import { createFantasyWorldPlanAt, getDefaultWorldLocation } from '../client/src/data/FantasyWorldData.js';
import { WORLD_PALETTE_IDS } from '../client/src/data/WorldPalettes.js';
import { validateBakedBuilding } from '../client/src/data/BakedBuildingLibrary.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const activeModulePath = path.join(repoRoot, 'client', 'src', 'data', 'ActiveWorldData.js');
const importerPath = path.join(repoRoot, 'tools', 'import_world_map_package.mjs');

assert.equal(ACTIVE_WORLD.generationVersion, 'fmg-constrained-wfc-v2');
assert.match(ACTIVE_WORLD.contentHash || '', /^[a-f0-9]{64}$/);
assert.equal(Object.keys(ACTIVE_TOWNS).length, 0, 'town payload archive must remain empty');
assert.equal(ACTIVE_GEOGRAPHY.schema, 'vibe-game-active-geography');
assert.equal(ACTIVE_GEOGRAPHY.cells.length, 7302);
assert.equal(ACTIVE_GEOGRAPHY.biomes.length, 13);
assert.equal(ACTIVE_GEOGRAPHY.routes.length, 71);
assert.equal(ACTIVE_GEOGRAPHY.rivers.length, 223);
assert.equal(ACTIVE_GEOGRAPHY.burgs.length, 50);
assert.ok(ACTIVE_GEOGRAPHY.cells.every((cell) =>
    Number.isFinite(cell.x) && Number.isFinite(cell.y) && Number.isFinite(cell.height) &&
    Array.isArray(cell.neighbors) && (cell.land === 0 || cell.land === 1)
));
assert.ok(ACTIVE_WORLD.locations.every((location) => !('townFile' in location)));
assert.ok(ACTIVE_GEOGRAPHY.burgs.every((burg) => !('townFile' in burg) && !('buildings' in burg)));

const importerSource = await readFile(importerPath, 'utf8');
assert.doesNotMatch(importerSource, /readJson\([^\n]*(?:town|building)/i, 'importer must not parse town/building JSON');
assert.doesNotMatch(importerSource, /readdir\([^\n]*(?:town|building)/i, 'importer must not enumerate town/building JSON');

const activeModuleStats = await stat(activeModulePath);
assert.ok(activeModuleStats.size < 5_000_000, `active geography module should stay compact; got ${activeModuleStats.size} bytes`);

const location = getDefaultWorldLocation();
const base = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
const exactReplay = createFantasyWorldPlanAt(location.x, location.y, { variant: 0 });
const variation = createFantasyWorldPlanAt(location.x, location.y, { variant: 1 });

assert.equal(hashPlan(exactReplay), hashPlan(base), 'same FMG coordinate and seed must replay exactly');
assert.notEqual(hashPlan(variation), hashPlan(base), 'a new variant must create a distinct world');
assert.equal(base.generation.mode, 'geographic-wfc');
assert.equal(base.generation.townPayloadsRead, false);
assert.equal(base.generation.terrainWfc.invalidAdjacencies, 0);
assert.ok(base.generation.terrainWfc.fallbacks < base.generation.terrainWfc.chunks);
assert.equal(base.generation.coupledTerrainAndBuildings, true);
assert.equal(base.generation.minimumInterior, '2x3');
assert.ok(base.generation.constraintField.inhibitedCells > 0, 'FMG geography must inhibit local entropy');
assert.ok(base.generation.buildingWfc.walledAreas >= 1, 'FMG wall flags must produce confined towns');
assert.ok(base.generation.buildingWfc.wallCells > 0, 'confined towns must stamp physical walls');
assert.ok(base.generation.buildingWfc.assignedBuildings >= 1, 'WFC must choose building occupancy');
assert.ok(base.generation.buildingWfc.bakedBuildings >= 2, 'qualifying town areas must receive baked landmarks');
assert.ok(base.generation.buildingWfc.insideSiteBuildingRatio >= 0.7, 'walled parcel assignments must be mainly buildings');
assert.equal(base.generation.buildingWfc.fallbacks, 0);
assert.equal(base.generation.buildingWfc.contradictions, 0);
assert.ok(base.rows.length === base.height && base.rows.every((row) => row.length === base.width));
assert.ok(base.elevationRows.length === base.height && base.elevationRows.every((row) => row.length === base.width));
assert.ok(base.paletteRows.length === base.height && base.paletteRows.every((row) => row.length === base.width));
assert.ok(base.visualVariantRows.length === base.height && base.visualVariantRows.every((row) => row.length === base.width));
assert.ok(base.elevationRows.flat().every((value) => Number.isInteger(value) && value >= 0 && value <= 6));
assert.ok(base.paletteRows.flat().every((paletteId) => WORLD_PALETTE_IDS.includes(paletteId)));
assert.ok(base.visualVariantRows.every((row) => /^[0-5]+$/.test(row)));
assert.ok(base.buildings.length >= 4, 'default generated settlement should have explorable structures');
assert.ok(base.decorations.length >= 20, 'default region should have biome detail');

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
        burgAnchors: ACTIVE_GEOGRAPHY.burgs.length
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
