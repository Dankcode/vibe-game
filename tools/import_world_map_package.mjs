#!/usr/bin/env node

// Geography-only FMG importer.
//
// The runtime world is generated mathematically from the global FMG cell graph. Dedicated town
// and building JSON payloads are intentionally outside this import boundary: settlements, lots,
// buildings, terrain detail, and visual variants are derived later from these compact geographic
// priors plus the deterministic world seed. Burg flags, population, routes, water, biome and
// elevation become numeric WFC inhibitors; no dedicated town/building payload is imported.

import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    compileWorldBlueprints,
    SETTLEMENT_BLUEPRINT_GENERATION_VERSION
} from './compile_world_blueprints.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE_DIR = path.join(REPO_ROOT, 'map-data-package');
const OUTPUT_MODULE = path.join(REPO_ROOT, 'client', 'src', 'data', 'ActiveWorldData.js');
const OUTPUT_ASSET_DIR = path.join(REPO_ROOT, 'client', 'public', 'assets', 'maps');
const OUTPUT_ASSET = path.join(OUTPUT_ASSET_DIR, 'map-data.png');
const ASSET_PUBLIC_PATH = '/assets/maps/map-data.png';
const WORLD_ID = 'auzoryia';
const WORLD_NAME = 'Auzoryia';
const GENERATION_VERSION = SETTLEMENT_BLUEPRINT_GENERATION_VERSION;
const ROUTE_POINT_STEP = 2;

async function main(argv = process.argv.slice(2)) {
    const sourceDir = path.resolve(argv[0] || DEFAULT_SOURCE_DIR);
    const manifest = await readJson(path.join(sourceDir, 'manifest.json'));
    const worldFile = path.resolve(sourceDir, manifest.files?.world || 'map-data.json');
    const imageFile = path.resolve(sourceDir, manifest.files?.image || 'map-data.png');
    const source = await readJson(worldFile);
    validateSource(source, manifest);

    const cells = (source.world.cells || []).map(compactCell);
    const geography = {
        schema: 'vibe-game-active-geography',
        schemaVersion: 1,
        biomes: [...(source.legacy_fmg_refs?.biomes || [])],
        cells,
        features: (source.world.features || []).map(compactFeature),
        routes: (source.world.routes || []).map(compactRoute),
        rivers: (source.world.rivers || []).map(compactRiver),
        states: compactColorEntities(source.entities?.states),
        cultures: compactColorEntities(source.entities?.cultures),
        provinces: compactColorEntities(source.entities?.provinces),
        burgs: (source.entities?.burgs || []).map((burg) => compactBurg(burg, cells))
    };
    const settlementBlueprints = compileWorldBlueprints(source, {
        generationVersion: GENERATION_VERSION
    });

    const contentHash = createHash('sha256')
        .update(JSON.stringify({ generationVersion: GENERATION_VERSION, geography, settlementBlueprints }))
        .digest('hex');
    const image = source.image || {};
    const world = {
        id: WORLD_ID,
        name: WORLD_NAME,
        sourceName: source.metadata?.map_name || manifest.map_name || 'map-data',
        generationVersion: GENERATION_VERSION,
        contentHash,
        seed: normalizeSeed(source.metadata?.seed ?? manifest.seed),
        mapId: source.metadata?.map_id ?? null,
        width: Number(source.world.width || source.metadata?.width || image.width || 640),
        height: Number(source.world.height || source.metadata?.height || image.height || 360),
        source: source.metadata?.source || manifest.source || 'Azgaar Fantasy Map Generator',
        exportedAt: source.metadata?.exported_at || manifest.exported_at || null,
        image: {
            src: ASSET_PUBLIC_PATH,
            width: Number(image.width || source.world.width || 640),
            height: Number(image.height || source.world.height || 360),
            coordinateSpace: image.coordinate_space || 'fmg-svg-pixels',
            sourceFile: path.basename(imageFile)
        },
        locations: geography.burgs.map(toWorldLocation),
        routes: geography.routes
    };

    await mkdir(OUTPUT_ASSET_DIR, { recursive: true });
    await copyFile(imageFile, OUTPUT_ASSET);
    await writeModule({ world, geography, settlementBlueprints });

    console.log(JSON.stringify({
        ok: true,
        mode: 'geography-only',
        sourceDir,
        outputModule: path.relative(REPO_ROOT, OUTPUT_MODULE),
        outputAsset: path.relative(REPO_ROOT, OUTPUT_ASSET),
        contentHash,
        cells: geography.cells.length,
        biomes: geography.biomes.length,
        routes: geography.routes.length,
        rivers: geography.rivers.length,
        burgAnchors: geography.burgs.length,
        settlementBlueprints: settlementBlueprints.blueprints.length,
        settlementClusters: settlementBlueprints.clusters.length,
        settlementBlueprintBytes: settlementBlueprints.coverage.blueprintBytes,
        settlementCoverageUnexplained: settlementBlueprints.coverage.unexplainedFields.length,
        excludedTownPayloads: true
    }, null, 2));
}

function validateSource(source, manifest) {
    if (!source?.world || !Array.isArray(source.world.cells)) {
        throw new Error('FMG map-data JSON must include world.cells.');
    }
    if (!source?.entities || !Array.isArray(source.entities.burgs)) {
        throw new Error('FMG map-data JSON must include entities.burgs.');
    }
    if (source.world.cells.length === 0) throw new Error('FMG world.cells cannot be empty.');
    const schemaVersion = Number(source.metadata?.schema_version || manifest.schema_version || 0);
    if (schemaVersion < 2) throw new Error(`Unsupported FMG map schema version ${schemaVersion}.`);
}

function compactCell(cell = {}) {
    const coordinate = Array.isArray(cell.coordinate) ? cell.coordinate : [0, 0];
    return {
        id: Number(cell.id),
        x: round(coordinate[0], 3),
        y: round(coordinate[1], 3),
        height: round(cell.elevation ?? cell.height, 2),
        land: cell.terrain === 'land' ? 1 : 0,
        biome: finiteInteger(cell.biome),
        state: finiteInteger(cell.state),
        culture: finiteInteger(cell.culture),
        province: finiteInteger(cell.province),
        river: finiteInteger(cell.river),
        flux: round(cell.flux, 2),
        burg: finiteInteger(cell.burg),
        neighbors: Array.isArray(cell.neighbors)
            ? cell.neighbors.map(finiteInteger).filter(Number.isFinite)
            : []
    };
}

function compactFeature(feature = {}, index = 0) {
    return {
        id: finiteInteger(feature.id ?? index),
        type: String(feature.type || (feature.land ? 'land' : 'feature')),
        group: String(feature.group || ''),
        cells: finiteInteger(feature.cells),
        area: round(feature.area, 2)
    };
}

function compactRoute(route = {}) {
    const points = Array.isArray(route.points) ? route.points : [];
    const simplified = points
        .filter((_, index) => index === 0 || index === points.length - 1 || index % ROUTE_POINT_STEP === 0)
        .map((point) => [round(point?.[0], 2), round(point?.[1], 2)]);
    return {
        id: finiteInteger(route.id),
        kind: String(route.kind || 'route'),
        feature: finiteInteger(route.feature),
        points: simplified,
        cells: Array.isArray(route.cells) ? route.cells.map(finiteInteger).filter(Number.isFinite) : []
    };
}

function compactRiver(river = {}) {
    return {
        id: finiteInteger(river.id),
        name: String(river.name || ''),
        type: String(river.type || 'river'),
        width: round(river.width, 3),
        discharge: round(river.discharge, 2),
        sourceCell: finiteInteger(river.source_cell),
        mouthCell: finiteInteger(river.mouth_cell),
        basin: finiteInteger(river.basin),
        parent: finiteInteger(river.parent),
        cells: Array.isArray(river.cells) ? river.cells.map(finiteInteger).filter(Number.isFinite) : []
    };
}

function compactColorEntities(records = []) {
    return (Array.isArray(records) ? records : []).map((record) => ({
        id: finiteInteger(record.id),
        name: String(record.name || ''),
        color: normalizeColor(record.color)
    }));
}

function compactBurg(burg = {}, cells = []) {
    const cell = cells.find((candidate) => candidate.id === Number(burg.cell));
    const coordinate = Array.isArray(burg.coordinate_center)
        ? burg.coordinate_center
        : [cell?.x || 0, cell?.y || 0];
    return {
        id: finiteInteger(burg.id),
        name: String(burg.name || `Burg ${burg.id}`),
        group: String(burg.group || 'town'),
        cell: finiteInteger(burg.cell),
        x: round(coordinate[0], 2),
        y: round(coordinate[1], 2),
        population: Math.max(1, round(burg.population ?? burg.original_population_points, 2)),
        state: finiteInteger(burg.state),
        culture: finiteInteger(burg.culture),
        flags: {
            capital: Boolean(burg.flags?.capital || burg.group === 'capital'),
            port: Boolean(burg.flags?.port),
            citadel: Boolean(burg.flags?.citadel),
            plaza: Boolean(burg.flags?.plaza),
            walls: Boolean(burg.flags?.walls),
            temple: Boolean(burg.flags?.temple)
        }
    };
}

function toWorldLocation(burg) {
    return {
        id: `burg-${burg.id}`,
        burgId: burg.id,
        name: burg.name,
        type: burg.flags.capital ? 'capital' : burg.flags.citadel ? 'fortress' : burg.group || 'town',
        x: burg.x,
        y: burg.y,
        population: burg.population,
        state: burg.state,
        culture: burg.culture,
        cell: burg.cell,
        flags: { ...burg.flags }
    };
}

async function writeModule(payload) {
    const banner = '// Generated by tools/import_world_map_package.mjs from FMG geography only.\n' +
        '// Dedicated town/building JSON payloads are intentionally excluded.\n\n';
    const source = `${banner}export const ACTIVE_WORLD = ${JSON.stringify(payload.world, null, 2)};\n\n` +
        `export const ACTIVE_GEOGRAPHY = ${JSON.stringify(payload.geography, null, 2)};\n\n` +
        `export const ACTIVE_SETTLEMENT_BLUEPRINTS = ${JSON.stringify(payload.settlementBlueprints, null, 2)};\n\n` +
        'export const ACTIVE_TOWNS = Object.freeze({});\n';
    await writeFile(OUTPUT_MODULE, source);
}

async function readJson(filePath) {
    return JSON.parse(await readFile(filePath, 'utf8'));
}

function normalizeSeed(value) {
    const number = Number(value);
    if (Number.isFinite(number)) return Math.floor(number);
    return createHash('sha256').update(String(value || 'world')).digest().readUInt32LE(0);
}

function normalizeColor(value) {
    const color = String(value || '').trim();
    return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : '#7ecf9b';
}

function finiteInteger(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.floor(number) : 0;
}

function round(value, precision = 2) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
}

main().catch((error) => {
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
});
