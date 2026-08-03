import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
    compileTownVectorSet,
    createTownVectorSvg,
    rasterizeStreetVectors,
    toStreetElevationTier,
    rasterizeContours
} from '../../../tools/compile_town_vectors.mjs';
import { ACTIVE_TOWN_VECTORS } from './ActiveTownVectorData.js';
import {
    projectTownVector,
    validateActiveTownVectorSet
} from './TownVectorData.js';
import {
    BURG_THEME_IDS,
    validateManifestBurgThemes
} from './BurgThemeCatalog.js';

const PACKAGE_ROOT = new URL('../../../map-data-package/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', PACKAGE_ROOT), 'utf8'));
const manifestThemes = validateManifestBurgThemes(manifest);
assert.equal(manifestThemes.valid, true, manifestThemes.errors.join('\n'));
const burgIdByFile = new Map((manifest.burgs || []).map((burg) => [
    String(burg.town_file || '').replaceAll('\\', '/'),
    {
        burgId: Number(burg.id),
        themeId: manifestThemes.themeByBurgId.get(Number(burg.id))
    }
]));
const townEntries = (await Promise.all((manifest.files?.towns || []).map(async (sourceFile) => {
    const normalizedFile = String(sourceFile).replaceAll('\\', '/');
    const manifestBurg = burgIdByFile.get(normalizedFile);
    return {
        burgId: manifestBurg.burgId,
        themeId: manifestBurg.themeId,
        sourceFile: normalizedFile,
        town: JSON.parse(await readFile(new URL(normalizedFile, PACKAGE_ROOT), 'utf8'))
    };
}))).sort((left, right) => left.burgId - right.burgId);
const compiled = compileTownVectorSet(townEntries);
const compiledById = new Map(compiled.towns.map((town) => [town.burgId, town]));

function sourceWallCells(town) {
    const values = Array.isArray(town.walls) && town.walls.length
        ? town.walls.map((wall) => [wall.x, wall.y])
        : town.matrix?.city_wall?.wall || [];
    return new Set(values.map(([x, y]) => `${Number(x)},${Number(y)}`));
}

function sourceStreetCells(town) {
    return (town.streets || []).map((street) => ({
        x: Number(street.x),
        y: Number(street.y),
        kind: String(street.kind),
        elevationTier: toStreetElevationTier(street.elevation)
    })).sort((left, right) => left.y - right.y || left.x - right.x ||
        left.kind.localeCompare(right.kind) || left.elevationTier - right.elevationTier);
}

function collectObjectKeys(value, keys = new Set()) {
    if (Array.isArray(value)) {
        for (const item of value) collectObjectKeys(item, keys);
        return keys;
    }
    if (!value || typeof value !== 'object') return keys;
    for (const [key, child] of Object.entries(value)) {
        keys.add(key);
        collectObjectKeys(child, keys);
    }
    return keys;
}

function stableProjectionSnapshot(projection) {
    return {
        burgId: projection.burgId,
        themeId: projection.themeId,
        vectorHash: projection.vectorHash,
        scale: projection.scale,
        bounds: projection.bounds,
        wallCells: projection.wallCells,
        gateCells: projection.gateCells,
        insideCellKeys: [...projection.insideCellKeys].sort(),
        streetCells: projection.streetCells,
        buildings: projection.buildings
    };
}

function assertMinimumInterior(building, context) {
    const interiorWidth = building.width - 2;
    const interiorHeight = building.height - 2;
    assert.ok(
        interiorWidth >= 2 &&
        interiorHeight >= 2 &&
        Math.max(interiorWidth, interiorHeight) >= 3,
        `${context} must retain an interior of at least 2x3 cells; got ` +
        `${interiorWidth}x${interiorHeight}`
    );
}

test('town vector compiler aggregates all FMG burg payloads deterministically', () => {
    assert.equal(townEntries.length, 60);
    assert.equal(new Set(townEntries.map((entry) => entry.burgId)).size, 60);
    assert.equal(townEntries.reduce((total, entry) => total + entry.town.buildings.length, 0), 512);
    assert.equal(townEntries.reduce((total, entry) => total + sourceWallCells(entry.town).size, 0), 5015);
    assert.equal(townEntries.reduce((total, entry) => total + sourceStreetCells(entry.town).length, 0), 30756);

    assert.equal(compiled.coverage.towns, 60);
    assert.equal(compiled.coverage.buildings, 512);
    assert.equal(compiled.coverage.walls, 5015);
    assert.equal(compiled.coverage.streetCells, 30756);
    assert.ok(compiled.coverage.streetSegments > 0);
    assert.ok(compiled.coverage.streetSegments < compiled.coverage.streetCells);
    assert.deepEqual(compileTownVectorSet(townEntries), compiled);
    assert.deepEqual(ACTIVE_TOWN_VECTORS, compiled);
    assert.deepEqual(validateActiveTownVectorSet(compiled), { valid: true, errors: [] });
});

test('manifest themes are hash-authoritative on every town vector and runtime projection', () => {
    assert.deepEqual(
        new Set(compiled.themeCatalog.map((theme) => theme.id)),
        new Set(BURG_THEME_IDS)
    );
    for (const town of compiled.towns) {
        const expected = manifestThemes.themeByBurgId.get(town.burgId);
        assert.equal(town.themeId, expected);
        assert.equal(projectTownVector(town, {
            centerCol: 96,
            centerRow: 72,
            width: 192,
            height: 144,
            maximumScale: 1
        }).themeId, expected);
    }
    const sourceEntry = townEntries[0];
    const alternateThemeId = BURG_THEME_IDS.find((themeId) => themeId !== sourceEntry.themeId);
    const originalSingle = compileTownVectorSet([sourceEntry]);
    const rethemedSingle = compileTownVectorSet([{ ...sourceEntry, themeId: alternateThemeId }]);
    assert.notEqual(rethemedSingle.towns[0].vectorHash, originalSingle.towns[0].vectorHash);
    assert.notEqual(rethemedSingle.contentHash, originalSingle.contentHash);
    assert.throws(
        () => compileTownVectorSet(townEntries.map((entry, index) => index === 0
            ? { ...entry, themeId: undefined }
            : entry)),
        /requires a canonical manifest themeId/
    );
});

test('every compiled wall contour rasterizes exactly to its source wall cells', () => {
    let sourceCellCount = 0;
    let rasterCellCount = 0;
    for (const entry of townEntries) {
        const sourceCells = sourceWallCells(entry.town);
        const town = compiledById.get(entry.burgId);
        const rasterized = rasterizeContours(
            town.walls.contours,
            town.grid.width,
            town.grid.height
        );
        const rasterCells = new Set(rasterized.map(([x, y]) => `${x},${y}`));
        const missingCount = [...sourceCells].filter((key) => !rasterCells.has(key)).length;
        const addedCount = [...rasterCells].filter((key) => !sourceCells.has(key)).length;
        assert.equal(
            missingCount,
            0,
            `burg-${entry.burgId} contour dropped ${missingCount} source wall cells`
        );
        assert.equal(
            addedCount,
            0,
            `burg-${entry.burgId} contour added ${addedCount} non-source wall cells`
        );
        assert.equal(rasterCells.size, rasterized.length);
        sourceCellCount += sourceCells.size;
        rasterCellCount += rasterCells.size;
    }
    assert.equal(sourceCellCount, 5015);
    assert.equal(rasterCellCount, 5015);
});

test('street vectors round-trip every FMG street cell and project exactly at full scale', () => {
    const projectionOptions = {
        centerCol: 96,
        centerRow: 72,
        width: 192,
        height: 144,
        margin: 2,
        maximumScale: 1
    };
    let sourceCellCount = 0;
    let segmentCellCount = 0;
    for (const entry of townEntries) {
        const town = compiledById.get(entry.burgId);
        const sourceCells = sourceStreetCells(entry.town);
        const rasterCells = rasterizeStreetVectors(town.streetVectors);
        assert.deepEqual(
            rasterCells,
            sourceCells,
            `burg-${entry.burgId} street segments must reproduce source cells, kinds, and tiers`
        );
        assert.equal(
            town.streetVectors.segments.reduce((total, segment) => total + segment[5], 0),
            sourceCells.length
        );

        const projection = projectTownVector(town, projectionOptions);
        assert.equal(projection.scale, 1);
        const sourceCenterX = (town.bounds.minX + town.bounds.maxX) / 2;
        const sourceCenterY = (town.bounds.minY + town.bounds.maxY) / 2;
        const expectedProjection = sourceCells.map((cell) => ({
            col: Math.floor(projectionOptions.centerCol + cell.x + 0.5 - sourceCenterX),
            row: Math.floor(projectionOptions.centerRow + cell.y + 0.5 - sourceCenterY),
            kind: cell.kind,
            elevationTier: cell.elevationTier,
            source: 'town-vector'
        })).sort((left, right) => left.row - right.row || left.col - right.col ||
            right.elevationTier - left.elevationTier || left.kind.localeCompare(right.kind));
        assert.deepEqual(
            projection.streetCells,
            expectedProjection,
            `burg-${entry.burgId} full-scale street projection must be exact`
        );
        assert.equal(projection.streetCellKeys.size, sourceCells.length);
        sourceCellCount += sourceCells.length;
        segmentCellCount += town.streetVectors.segments.length;
    }
    assert.equal(sourceCellCount, 30756);
    assert.equal(sourceCellCount, compiled.coverage.streetCells);
    assert.equal(segmentCellCount, compiled.coverage.streetSegments);
});

test('town vector SVG includes compiled street kind and elevation metadata', () => {
    const town = compiled.towns.find((candidate) => candidate.streetVectors.sourceCellCount > 0);
    const svg = createTownVectorSvg(town);
    assert.match(svg, new RegExp(`data-theme-id="${town.themeId}"`));
    assert.match(svg, /data-kind="(?:dirt|main|dock)"/);
    assert.match(svg, /data-elevation-tier="[0-6]"/);
    assert.equal((svg.match(/data-elevation-tier=/g) || []).length, town.streetVectors.segments.length);
});

test('runtime town vectors exclude expanded authoring matrices and voxel payloads', () => {
    const runtimeKeys = collectObjectKeys(ACTIVE_TOWN_VECTORS);
    for (const excludedKey of [
        'tiles',
        'matrix',
        'terrain',
        'streets',
        'farms',
        'doodads',
        'rooms',
        'interiors',
        'voxel_town',
        'voxels',
        'walkable',
        'solid_height_voxels',
        'clearance_height_voxels'
    ]) {
        assert.equal(
            runtimeKeys.has(excludedKey),
            false,
            `runtime vectors must exclude source field ${excludedKey}`
        );
    }
    assert.ok(compiled.coverage.vectorBytes < compiled.coverage.sourceBytes / 100);
    assert.equal(compiled.towns.every((town) => town.walls.sourceCellCount >= 0), true);
    assert.equal(compiled.towns.every((town) => town.streetVectors.sourceCellCount >= 0), true);
    assert.equal(compiled.towns.every((town) => Array.isArray(town.streetVectors.segments)), true);
    assert.equal(compiled.towns.every((town) => Array.isArray(town.buildings)), true);
});

test('runtime projection is deterministic and preserves a small densely walled burg', () => {
    const options = {
        centerCol: 96,
        centerRow: 72,
        width: 192,
        height: 144,
        margin: 2,
        maximumScale: 1
    };
    for (const town of compiled.towns) {
        const first = projectTownVector(town, options);
        const second = projectTownVector(town, options);
        assert.deepEqual(
            stableProjectionSnapshot(first),
            stableProjectionSnapshot(second),
            `burg-${town.burgId} projection changed for identical inputs`
        );
        assert.equal(first.vectorHash, town.vectorHash);
    }

    const denseTown = compiledById.get(39);
    assert.equal(denseTown.buildings.length, 5);
    assert.equal(denseTown.walls.sourceCellCount, 124);
    assert.equal(denseTown.walls.gates.length, 3);
    assert.ok(denseTown.walls.sourceCellCount > denseTown.buildings.length * 20);
    const projectedDenseTown = projectTownVector(denseTown, options);
    assert.equal(projectedDenseTown.buildings.length, 5);
    assert.ok(
        projectedDenseTown.wallCells.length >=
        denseTown.walls.sourceCellCount - denseTown.walls.gates.length
    );
});

test('all projected enterable buildings retain a minimum 2x3 interior', () => {
    let fullScaleBuildingCount = 0;
    let compactScaleBuildingCount = 0;
    for (const maximumScale of [1, 0.25]) {
        for (const town of compiled.towns) {
            const projection = projectTownVector(town, {
                centerCol: 96,
                centerRow: 72,
                width: 192,
                height: 144,
                margin: 2,
                maximumScale
            });
            if (maximumScale === 1) {
                assert.equal(projection.buildings.length, town.buildings.length);
                fullScaleBuildingCount += projection.buildings.length;
            } else {
                assert.ok(projection.buildings.length <= town.buildings.length);
                compactScaleBuildingCount += projection.buildings.length;
            }
            for (const building of projection.buildings) {
                assertMinimumInterior(
                    building,
                    `burg-${town.burgId}/${building.id} at scale ${maximumScale}`
                );
            }
        }
    }
    assert.equal(fullScaleBuildingCount, 512);
    assert.ok(compactScaleBuildingCount > 0);
});
