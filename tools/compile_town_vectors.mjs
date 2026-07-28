#!/usr/bin/env node

// Offline town-vector compiler.
//
// The large per-burg town payloads are an authoring input only. This compiler extracts the
// stable geometry that generation needs (wall contours, gates, and building footprints), writes
// compact immutable vector assets, and deliberately leaves tile matrices, rooms, doodads, and
// voxel dumps outside the runtime bundle.

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const TOWN_VECTOR_SCHEMA = 'vibe-game-burg-vectors';
export const TOWN_VECTOR_SCHEMA_VERSION = 1;
export const TOWN_VECTOR_GENERATION_VERSION = 'fmg-town-vectors-v1';
export const TOWN_VECTOR_QUANTIZATION = 4;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE_DIR = path.join(REPO_ROOT, 'map-data-package');
const OUTPUT_MODULE = path.join(REPO_ROOT, 'client', 'src', 'data', 'ActiveTownVectorData.js');
const OUTPUT_ASSET_DIR = path.join(REPO_ROOT, 'client', 'public', 'assets', 'maps', 'towns');

export function compileTownVectorSet(entries = [], options = {}) {
    const towns = entries
        .map((entry) => compileTownVector(entry.town, {
            burgId: entry.burgId,
            sourceFile: entry.sourceFile
        }))
        .sort((left, right) => left.burgId - right.burgId);
    const packageBase = {
        schema: TOWN_VECTOR_SCHEMA,
        schemaVersion: TOWN_VECTOR_SCHEMA_VERSION,
        generationVersion: options.generationVersion || TOWN_VECTOR_GENERATION_VERSION,
        coordinateSpace: 'burg-local-grid',
        quantization: TOWN_VECTOR_QUANTIZATION,
        towns
    };
    const contentHash = hashCanonical(packageBase);
    return {
        ...packageBase,
        contentHash,
        coverage: Object.freeze({
            towns: towns.length,
            walls: sum(towns, (town) => town.walls.sourceCellCount),
            wallContours: sum(towns, (town) => town.walls.contours.length),
            wallComponents: sum(towns, (town) => town.walls.componentCount),
            gates: sum(towns, (town) => town.walls.gates.length),
            buildings: sum(towns, (town) => town.buildings.length),
            sourceBytes: sum(entries, (entry) => Buffer.byteLength(JSON.stringify(entry.town))),
            vectorBytes: Buffer.byteLength(JSON.stringify(towns))
        })
    };
}

export function compileTownVector(town, { burgId, sourceFile = '' } = {}) {
    validateTownSource(town, burgId);
    const grid = {
        width: positiveInteger(town.grid.width),
        height: positiveInteger(town.grid.height),
        tileSizeMapUnits: roundNumber(town.grid.tile_size_map_units, 6)
    };
    const wallCells = normalizeGridCells(
        Array.isArray(town.walls) && town.walls.length
            ? town.walls
            : town.matrix?.city_wall?.wall,
        grid
    );
    const contours = traceCellContours(wallCells);
    const gates = normalizePointList(town.matrix?.city_wall?.gates, grid)
        .map(([x, y]) => [x + 0.5, y + 0.5]);
    const buildings = (town.buildings || [])
        .map((building, index) => compileBuildingVector(building, grid, town.grid.origin, index))
        .sort((left, right) => left.id.localeCompare(right.id));
    const bounds = geometryBounds({
        grid,
        wallCells,
        buildings
    });
    const recordBase = {
        id: `burg-${positiveInteger(burgId)}`,
        burgId: positiveInteger(burgId),
        name: String(town.name || `Burg ${burgId}`),
        seed: integer(town.seed),
        sourceFile: String(sourceFile || ''),
        grid,
        bounds,
        walls: {
            contours,
            gates,
            heightVoxels: clampInteger(town.matrix?.city_wall?.height_voxels, 1, 16, 4),
            walkwayWidth: clampInteger(town.matrix?.city_wall?.walkway_width_blocks, 1, 6, 1),
            sourceCellCount: wallCells.length,
            componentCount: countGridComponents(wallCells)
        },
        buildings
    };
    return {
        ...recordBase,
        vectorHash: hashCanonical(recordBase)
    };
}

export function traceCellContours(values = []) {
    const cellSet = new Set(values.map(([x, y]) => gridKey(x, y)));
    const edges = [];
    const pushEdge = (fromX, fromY, toX, toY) => {
        edges.push({
            id: edges.length,
            from: [fromX, fromY],
            to: [toX, toY]
        });
    };

    for (const value of values) {
        const x = integer(value[0]);
        const y = integer(value[1]);
        if (!cellSet.has(gridKey(x, y - 1))) pushEdge(x, y, x + 1, y);
        if (!cellSet.has(gridKey(x + 1, y))) pushEdge(x + 1, y, x + 1, y + 1);
        if (!cellSet.has(gridKey(x, y + 1))) pushEdge(x + 1, y + 1, x, y + 1);
        if (!cellSet.has(gridKey(x - 1, y))) pushEdge(x, y + 1, x, y);
    }

    const byStart = new Map();
    for (const edge of edges) {
        const key = gridKey(edge.from[0], edge.from[1]);
        if (!byStart.has(key)) byStart.set(key, []);
        byStart.get(key).push(edge);
    }
    for (const candidates of byStart.values()) {
        candidates.sort((left, right) =>
            left.to[1] - right.to[1] || left.to[0] - right.to[0] || left.id - right.id);
    }

    const unused = new Set(edges.map((edge) => edge.id));
    const contours = [];
    while (unused.size) {
        const startEdge = edges[[...unused].sort((a, b) => compareEdges(edges[a], edges[b]))[0]];
        unused.delete(startEdge.id);
        const points = [startEdge.from, startEdge.to];
        let current = startEdge.to;
        const startKey = gridKey(startEdge.from[0], startEdge.from[1]);
        let guard = edges.length + 1;
        while (gridKey(current[0], current[1]) !== startKey && guard-- > 0) {
            const next = (byStart.get(gridKey(current[0], current[1])) || [])
                .filter((edge) => unused.has(edge.id))
                .sort((left, right) => compareNextEdge(points.at(-2), current, left, right))[0];
            if (!next) break;
            unused.delete(next.id);
            points.push(next.to);
            current = next.to;
        }
        const simplified = simplifyOrthogonalPath(points);
        if (simplified.length >= 4 && pointsEqual(simplified[0], simplified.at(-1))) {
            contours.push(canonicalizeClosedPolygon(simplified));
        }
    }
    return contours.sort((left, right) =>
        Math.abs(polygonArea(right)) - Math.abs(polygonArea(left)) ||
        comparePoints(left[0], right[0]));
}

export function rasterizeContours(contours = [], width = 0, height = 0) {
    const cells = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const point = [x + 0.5, y + 0.5];
            const crossings = contours.reduce((count, contour) =>
                count + Number(pointInPolygon(point, contour)), 0);
            if (crossings % 2 === 1) cells.push([x, y]);
        }
    }
    return cells;
}

export function createTownVectorSvg(town) {
    const wallPath = town.walls.contours.map((contour) =>
        `${contour.map(([x, y], index) => `${index ? 'L' : 'M'}${formatNumber(x)} ${formatNumber(y)}`).join(' ')} Z`
    ).join(' ');
    const buildings = town.buildings.map((building) => {
        const points = building.polygon.map(([x, y]) => `${formatNumber(x)},${formatNumber(y)}`).join(' ');
        return `<polygon points="${points}" fill="${escapeXml(building.color)}" fill-opacity="0.76" stroke="#1f2533" stroke-width="0.18"/>`;
    }).join('');
    const gates = town.walls.gates.map(([x, y]) =>
        `<circle cx="${formatNumber(x)}" cy="${formatNumber(y)}" r="0.55" fill="#ffd166"/>`
    ).join('');
    return [
        '<svg xmlns="http://www.w3.org/2000/svg"',
        ` viewBox="0 0 ${town.grid.width} ${town.grid.height}"`,
        ` data-burg-id="${town.burgId}" data-vector-hash="${town.vectorHash}">`,
        '<rect width="100%" height="100%" fill="#e8f2df"/>',
        wallPath
            ? `<path d="${wallPath}" fill="#667085" fill-rule="evenodd"/>`
            : '',
        buildings,
        gates,
        '</svg>'
    ].join('');
}

function compileBuildingVector(building, grid, origin, index) {
    const rect = normalizeRect(building.grid_rect, grid);
    const polygon = normalizeBuildingPolygon(building.footprint, rect, grid, origin);
    const door = normalizeBuildingDoor(building.door?.grid, rect);
    const floors = clampInteger(
        building.interior?.floor_count ?? building.floors?.length,
        1,
        3,
        1
    );
    const stairs = (building.floors || [])
        .map((floor) => normalizePoint(floor?.stairs?.grid, grid))
        .filter(Boolean);
    return {
        id: String(building.id || `building-${String(index + 1).padStart(3, '0')}`),
        type: String(building.type || 'HOUSE_LARGE'),
        polygon,
        gridRect: rect,
        door,
        floors,
        floorHeightVoxels: clampInteger(building.interior?.floor_height_voxels, 1, 6, 2),
        wallHeightVoxels: clampInteger(building.interior?.wall_height_voxels, 1, 12, floors * 2),
        stairs,
        roofStyle: String(building.roof_style || 'gabled'),
        wallTexture: String(building.wall_texture || 'timber'),
        color: normalizeColor(building.color, '#d5b57a'),
        roofColor: normalizeColor(building.roof_color, '#b75a48')
    };
}

function normalizeBuildingPolygon(footprint, rect, grid, origin) {
    const tileSize = Number(grid.tileSizeMapUnits) || 1;
    const safeOrigin = Array.isArray(origin) ? origin : [0, 0];
    const source = (Array.isArray(footprint) ? footprint : [])
        .filter((point) => Array.isArray(point) && point.length >= 2)
        .map(([x, y]) => [
            quantize((Number(x) - Number(safeOrigin[0] || 0)) / tileSize),
            quantize((Number(y) - Number(safeOrigin[1] || 0)) / tileSize)
        ])
        .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
    const fallback = [
        [rect.x, rect.y],
        [rect.x + rect.width, rect.y],
        [rect.x + rect.width, rect.y + rect.height],
        [rect.x, rect.y + rect.height],
        [rect.x, rect.y]
    ];
    if (source.length < 4) return fallback;
    if (!pointsEqual(source[0], source.at(-1))) source.push([...source[0]]);
    return canonicalizeClosedPolygon(source);
}

function normalizeBuildingDoor(value, rect) {
    const point = Array.isArray(value) && value.length >= 2
        ? [integer(value[0]), integer(value[1])]
        : [rect.x + Math.floor(rect.width / 2), rect.y + rect.height - 1];
    return [
        clampInteger(point[0], rect.x, rect.x + rect.width - 1, rect.x),
        clampInteger(point[1], rect.y, rect.y + rect.height - 1, rect.y)
    ];
}

function normalizeRect(value, grid) {
    const x = clampInteger(value?.x, 0, grid.width - 1, 0);
    const y = clampInteger(value?.y, 0, grid.height - 1, 0);
    return {
        x,
        y,
        width: clampInteger(value?.width, 1, grid.width - x, 1),
        height: clampInteger(value?.height, 1, grid.height - y, 1)
    };
}

function geometryBounds({ grid, wallCells, buildings }) {
    const points = [
        ...wallCells.flatMap(([x, y]) => [[x, y], [x + 1, y + 1]]),
        ...buildings.flatMap((building) => building.polygon)
    ];
    if (!points.length) return { minX: 0, minY: 0, maxX: grid.width, maxY: grid.height };
    return {
        minX: clampNumber(Math.floor(Math.min(...points.map((point) => point[0]))), 0, grid.width),
        minY: clampNumber(Math.floor(Math.min(...points.map((point) => point[1]))), 0, grid.height),
        maxX: clampNumber(Math.ceil(Math.max(...points.map((point) => point[0]))), 0, grid.width),
        maxY: clampNumber(Math.ceil(Math.max(...points.map((point) => point[1]))), 0, grid.height)
    };
}

function normalizeGridCells(values, grid) {
    const cells = new Map();
    for (const value of Array.isArray(values) ? values : []) {
        const point = Array.isArray(value) ? value : [value?.x, value?.y];
        const x = integer(point[0]);
        const y = integer(point[1]);
        if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) continue;
        cells.set(gridKey(x, y), [x, y]);
    }
    return [...cells.values()].sort(comparePoints);
}

function normalizePointList(values, grid) {
    return (Array.isArray(values) ? values : [])
        .map((value) => normalizePoint(value, grid))
        .filter(Boolean)
        .sort(comparePoints);
}

function normalizePoint(value, grid) {
    if (!Array.isArray(value) || value.length < 2) return null;
    const x = integer(value[0]);
    const y = integer(value[1]);
    if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) return null;
    return [x, y];
}

function countGridComponents(values) {
    const remaining = new Set(values.map(([x, y]) => gridKey(x, y)));
    let count = 0;
    while (remaining.size) {
        count++;
        const first = remaining.values().next().value;
        remaining.delete(first);
        const queue = [first];
        while (queue.length) {
            const [x, y] = queue.pop().split(',').map(Number);
            for (const key of [
                gridKey(x + 1, y),
                gridKey(x - 1, y),
                gridKey(x, y + 1),
                gridKey(x, y - 1)
            ]) {
                if (remaining.delete(key)) queue.push(key);
            }
        }
    }
    return count;
}

function simplifyOrthogonalPath(points) {
    if (points.length <= 3) return points.map((point) => [...point]);
    const output = [points[0]];
    for (let index = 1; index < points.length - 1; index++) {
        const previous = output.at(-1);
        const current = points[index];
        const next = points[index + 1];
        const collinear = (previous[0] === current[0] && current[0] === next[0]) ||
            (previous[1] === current[1] && current[1] === next[1]);
        if (!collinear) output.push(current);
    }
    output.push(points.at(-1));
    return output;
}

function canonicalizeClosedPolygon(points) {
    const open = pointsEqual(points[0], points.at(-1)) ? points.slice(0, -1) : [...points];
    const forward = rotatePolygonToLowest(open);
    const backward = rotatePolygonToLowest([...open].reverse());
    const chosen = JSON.stringify(forward) <= JSON.stringify(backward) ? forward : backward;
    return [...chosen.map((point) => point.map((value) => quantize(value))), [...chosen[0]]];
}

function rotatePolygonToLowest(points) {
    if (!points.length) return [];
    let index = 0;
    for (let candidate = 1; candidate < points.length; candidate++) {
        if (comparePoints(points[candidate], points[index]) < 0) index = candidate;
    }
    return [...points.slice(index), ...points.slice(0, index)].map((point) => [...point]);
}

function pointInPolygon([x, y], polygon) {
    let inside = false;
    for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
        const [xi, yi] = polygon[index];
        const [xj, yj] = polygon[previous];
        const intersects = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / ((yj - yi) || Number.EPSILON) + xi);
        if (intersects) inside = !inside;
    }
    return inside;
}

function polygonArea(points) {
    let area = 0;
    for (let index = 0; index < points.length - 1; index++) {
        area += points[index][0] * points[index + 1][1] - points[index + 1][0] * points[index][1];
    }
    return area / 2;
}

function compareEdges(left, right) {
    return comparePoints(left.from, right.from) || comparePoints(left.to, right.to) || left.id - right.id;
}

function compareNextEdge(previous, current, left, right) {
    const incoming = [current[0] - previous[0], current[1] - previous[1]];
    const rank = (edge) => {
        const outgoing = [edge.to[0] - current[0], edge.to[1] - current[1]];
        const cross = incoming[0] * outgoing[1] - incoming[1] * outgoing[0];
        const dot = incoming[0] * outgoing[0] + incoming[1] * outgoing[1];
        return cross < 0 ? 0 : dot > 0 ? 1 : cross > 0 ? 2 : 3;
    };
    return rank(left) - rank(right) || comparePoints(left.to, right.to) || left.id - right.id;
}

function comparePoints(left, right) {
    return Number(left?.[1] || 0) - Number(right?.[1] || 0) ||
        Number(left?.[0] || 0) - Number(right?.[0] || 0);
}

function pointsEqual(left, right) {
    return Boolean(left && right && left[0] === right[0] && left[1] === right[1]);
}

function validateTownSource(town, burgId) {
    if (!town || typeof town !== 'object' || Array.isArray(town)) {
        throw new Error(`Town source for burg ${String(burgId)} must be an object.`);
    }
    if (!town.grid || !Number.isFinite(Number(town.grid.width)) || !Number.isFinite(Number(town.grid.height))) {
        throw new Error(`Town source for burg ${String(burgId)} must define a finite grid.`);
    }
    if (!Array.isArray(town.buildings)) {
        throw new Error(`Town source for burg ${String(burgId)} must define buildings.`);
    }
}

function canonicalize(value) {
    if (Array.isArray(value)) return value.map(canonicalize);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.keys(value).sort()
        .map((key) => [key, canonicalize(value[key])]));
}

function hashCanonical(value) {
    return createHash('sha256').update(JSON.stringify(canonicalize(value))).digest('hex');
}

function normalizeColor(value, fallback) {
    const color = String(value || '').trim();
    return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : fallback;
}

function escapeXml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    })[character]);
}

function formatNumber(value) {
    return Number(value).toFixed(2).replace(/\.?0+$/, '');
}

function quantize(value) {
    return Math.round(Number(value) * TOWN_VECTOR_QUANTIZATION) / TOWN_VECTOR_QUANTIZATION;
}

function positiveInteger(value) {
    return Math.max(1, integer(value));
}

function integer(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.floor(number) : 0;
}

function roundNumber(value, precision) {
    const factor = 10 ** precision;
    return Math.round(Number(value || 0) * factor) / factor;
}

function clampInteger(value, minimum, maximum, fallback = minimum) {
    const number = Number(value);
    const candidate = Number.isFinite(number) ? Math.floor(number) : fallback;
    return Math.min(maximum, Math.max(minimum, candidate));
}

function clampNumber(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, Number(value) || 0));
}

function gridKey(x, y) {
    return `${x},${y}`;
}

function sum(values, project) {
    return values.reduce((total, value) => total + Number(project(value) || 0), 0);
}

async function readJson(filePath) {
    return JSON.parse(await readFile(filePath, 'utf8'));
}

async function loadTownEntries(sourceDir, manifest) {
    const burgByFile = new Map((manifest.burgs || []).map((burg) => [
        String(burg.town_file || '').replaceAll('\\', '/'),
        Number(burg.id)
    ]));
    const files = Array.isArray(manifest.files?.towns) ? manifest.files.towns : [];
    return Promise.all(files.map(async (relativeFile) => {
        const normalized = String(relativeFile).replaceAll('\\', '/');
        const filePath = path.resolve(sourceDir, normalized);
        const relative = path.relative(sourceDir, filePath);
        if (relative.startsWith('..') || path.isAbsolute(relative)) {
            throw new Error(`Town vector source escapes the package root: ${normalized}`);
        }
        const inferredId = Number(normalized.match(/burg-(\d+)\.json$/)?.[1]);
        return {
            burgId: burgByFile.get(normalized) || inferredId,
            sourceFile: normalized,
            town: await readJson(filePath)
        };
    }));
}

async function writeTownVectorOutputs(vectorPackage) {
    await mkdir(path.dirname(OUTPUT_MODULE), { recursive: true });
    await mkdir(OUTPUT_ASSET_DIR, { recursive: true });
    const banner = '// Generated by tools/compile_town_vectors.mjs. Do not edit by hand.\n\n';
    await writeFile(
        OUTPUT_MODULE,
        `${banner}export const ACTIVE_TOWN_VECTORS = ${JSON.stringify(vectorPackage)};\n`
    );
    const assetManifest = {
        schema: vectorPackage.schema,
        schemaVersion: vectorPackage.schemaVersion,
        generationVersion: vectorPackage.generationVersion,
        contentHash: vectorPackage.contentHash,
        towns: vectorPackage.towns.map((town) => ({
            burgId: town.burgId,
            vectorHash: town.vectorHash,
            json: `burg-${town.burgId}.vector.json`,
            svg: `burg-${town.burgId}.svg`
        }))
    };
    await writeFile(
        path.join(OUTPUT_ASSET_DIR, 'manifest.json'),
        `${JSON.stringify(assetManifest, null, 2)}\n`
    );
    await Promise.all(vectorPackage.towns.flatMap((town) => [
        writeFile(
            path.join(OUTPUT_ASSET_DIR, `burg-${town.burgId}.vector.json`),
            `${JSON.stringify(town)}\n`
        ),
        writeFile(
            path.join(OUTPUT_ASSET_DIR, `burg-${town.burgId}.svg`),
            `${createTownVectorSvg(town)}\n`
        )
    ]));
}

async function main(argv = process.argv.slice(2)) {
    const sourceDir = path.resolve(argv[0] || DEFAULT_SOURCE_DIR);
    const manifest = await readJson(path.join(sourceDir, 'manifest.json'));
    const entries = await loadTownEntries(sourceDir, manifest);
    const vectorPackage = compileTownVectorSet(entries);
    await writeTownVectorOutputs(vectorPackage);
    console.log(JSON.stringify({
        ok: true,
        sourceDir,
        outputModule: path.relative(REPO_ROOT, OUTPUT_MODULE),
        outputAssetDirectory: path.relative(REPO_ROOT, OUTPUT_ASSET_DIR),
        contentHash: vectorPackage.contentHash,
        ...vectorPackage.coverage
    }, null, 2));
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === __filename) {
    main().catch((error) => {
        console.error(error.stack || error.message || error);
        process.exitCode = 1;
    });
}
