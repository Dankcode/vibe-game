import assert from 'node:assert/strict';
import test from 'node:test';

import { stampBuildingsOnRows } from './BuildingData.js';
import {
    createFantasyWorldPlanAt,
    getDefaultWorldLocation,
    getWorldMapLocations
} from './FantasyWorldData.js';
import { BUILDING_PARTS, TILE_SYMBOL_LIBRARY, isBlockWalkable } from './TileLibrary.js';

const EXPECTED_WORLD_LOCATIONS = 50;
const MINIMUM_URBAN_FOOTPRINT_RATIO = 0.45;
const HARD_WATER_SYMBOLS = new Set(['W', 'I']);
const DIRECTIONS = Object.freeze([
    Object.freeze({ edge: 'north', x: 0, y: -1 }),
    Object.freeze({ edge: 'east', x: 1, y: 0 }),
    Object.freeze({ edge: 'south', x: 0, y: 1 }),
    Object.freeze({ edge: 'west', x: -1, y: 0 })
]);

let cachedLocationResults;
const cachedRuntimePlans = new Map();

test('all 50 FMG locations generate without terrain or building WFC contradictions', () => {
    const results = getLocationResults();
    assert.equal(results.length, EXPECTED_WORLD_LOCATIONS);

    const failures = [];
    for (const result of results) {
        if (result.error) {
            failures.push(`${locationLabel(result.location)} threw ${formatError(result.error)}`);
            continue;
        }

        const terrain = result.plan.generation?.terrainWfc || {};
        const buildings = result.plan.generation?.buildingWfc || {};
        if (terrain.invalidAdjacencies !== 0) {
            failures.push(`${locationLabel(result.location)} has ${terrain.invalidAdjacencies} invalid terrain adjacencies`);
        }
        if (buildings.contradictions !== 0) {
            failures.push(`${locationLabel(result.location)} has ${buildings.contradictions} building contradictions`);
        }
    }

    assert.equal(failures.length, 0, formatFailures('location generation failures', failures));
});

test('runtime building stamping preserves every non-gate city wall and hard-water cell', () => {
    const failures = [];
    let protectedWallCells = 0;
    let protectedWaterCells = 0;

    for (const result of successfulLocationResults()) {
        const runtime = materializeRuntimePlan(result);
        for (let row = 0; row < result.plan.height; row++) {
            for (let col = 0; col < result.plan.width; col++) {
                const sourceSymbol = result.plan.rows[row]?.[col];
                const runtimeSymbol = runtime.rows[row]?.[col];
                if (sourceSymbol === 'T') {
                    protectedWallCells++;
                    if (runtimeSymbol !== sourceSymbol) {
                        failures.push(`${locationLabel(result.location)} wall ${col},${row}: T -> ${runtimeSymbol}`);
                    }
                } else if (HARD_WATER_SYMBOLS.has(sourceSymbol)) {
                    protectedWaterCells++;
                    if (runtimeSymbol !== sourceSymbol) {
                        failures.push(`${locationLabel(result.location)} hard water ${col},${row}: ${sourceSymbol} -> ${runtimeSymbol}`);
                    }
                }
            }
        }
    }

    assert.ok(protectedWallCells > 0, 'the FMG integration fixture must exercise at least one non-gate city wall');
    assert.ok(protectedWaterCells > 0, 'the FMG integration fixture must exercise at least one hard-water cell');
    assert.equal(failures.length, 0, formatFailures('protected terrain overwritten at runtime', failures));
});

test('every generated building has an in-bounds, walkable, unoccupied exterior approach', () => {
    const failures = [];
    let checkedBuildings = 0;

    for (const result of successfulLocationResults()) {
        const runtime = materializeRuntimePlan(result);
        const occupied = collectBuildingFootprints(runtime.buildings, result.plan.width, result.plan.height);

        for (const building of runtime.buildings) {
            checkedBuildings++;
            const approach = getExteriorApproach(building, result.plan.width, result.plan.height);
            if (!approach) {
                failures.push(`${locationLabel(result.location)} ${building.id} has no exterior-facing door`);
                continue;
            }
            if (!isInBounds(approach.col, approach.row, result.plan.width, result.plan.height)) {
                failures.push(`${locationLabel(result.location)} ${building.id} approach ${approach.col},${approach.row} is out of bounds`);
                continue;
            }

            const key = `${approach.col},${approach.row}`;
            const occupants = occupied.get(key) || [];
            if (occupants.length > 0) {
                failures.push(`${locationLabel(result.location)} ${building.id} approach ${key} overlaps ${occupants.join(', ')}`);
                continue;
            }

            const symbol = runtime.rows[approach.row]?.[approach.col];
            if (!isWalkableUnoccupiedSymbol(symbol)) {
                failures.push(`${locationLabel(result.location)} ${building.id} approach ${key} is blocked by ${symbol}`);
            }
        }
    }

    assert.ok(checkedBuildings > 0, 'the FMG integration fixture must generate buildings');
    assert.equal(failures.length, 0, formatFailures('blocked building approaches', failures));
});

test('default constrained settlement has meaningful building footprint coverage', () => {
    const defaultLocation = getDefaultWorldLocation();
    const result = getLocationResults().find(({ location }) =>
        location.id === defaultLocation.id ||
        (location.x === defaultLocation.x && location.y === defaultLocation.y));

    assert.ok(result, `default location ${locationLabel(defaultLocation)} must be part of the FMG location matrix`);
    assert.ifError(result.error);

    const diagnostics = result.plan.generation?.buildingWfc || {};
    assert.ok(diagnostics.walledAreas >= 1, 'default coverage fixture must include a constrained walled settlement');
    assert.ok(diagnostics.urbanAreaCells > 0, 'default coverage fixture must report constrained urban cells');
    assert.ok(diagnostics.buildingFootprintCells > 0, 'default coverage fixture must report building footprint cells');

    const actualRatio = diagnostics.buildingFootprintCells / diagnostics.urbanAreaCells;
    assert.ok(
        Math.abs(actualRatio - diagnostics.urbanFootprintRatio) < 1e-12,
        `reported urban footprint ratio ${diagnostics.urbanFootprintRatio} must match ${actualRatio}`
    );
    assert.ok(
        actualRatio >= MINIMUM_URBAN_FOOTPRINT_RATIO,
        `expected at least ${MINIMUM_URBAN_FOOTPRINT_RATIO * 100}% constrained urban footprint coverage; got ${(actualRatio * 100).toFixed(1)}%`
    );
});

function getLocationResults() {
    if (cachedLocationResults) return cachedLocationResults;
    cachedLocationResults = getWorldMapLocations().map((location) => {
        try {
            return {
                location,
                plan: createFantasyWorldPlanAt(location.x, location.y, { variant: 0 }),
                error: null
            };
        } catch (error) {
            return { location, plan: null, error };
        }
    });
    return cachedLocationResults;
}

function successfulLocationResults() {
    return getLocationResults().filter((result) => result.plan && !result.error);
}

function materializeRuntimePlan(result) {
    const cacheKey = result.location.id || `${result.location.x},${result.location.y}`;
    if (cachedRuntimePlans.has(cacheKey)) return cachedRuntimePlans.get(cacheKey);

    const buildings = structuredClone(result.plan.buildings || []);
    const rows = stampBuildingsOnRows(result.plan.rows, buildings, {
        villageCenter: result.plan.center,
        connectDoors: result.plan.connectDoors ?? false,
        normalizeDoors: result.plan.procedural !== false
    });
    const runtime = { rows, buildings };
    cachedRuntimePlans.set(cacheKey, runtime);
    return runtime;
}

function collectBuildingFootprints(buildings, width, height) {
    const occupied = new Map();
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (const building of buildings) {
        for (const cell of getFootprintCells(building)) {
            const col = building.x + cell.x + offsetX;
            const row = building.y + cell.y + offsetY;
            const key = `${col},${row}`;
            if (!occupied.has(key)) occupied.set(key, []);
            occupied.get(key).push(building.id);
        }
    }
    return occupied;
}

function getFootprintCells(building) {
    if (Array.isArray(building.footprintCells) && building.footprintCells.length > 0) {
        return building.footprintCells.map((cell) => ({
            x: Math.floor(cell.x),
            y: Math.floor(cell.y)
        }));
    }
    return Array.from({ length: building.height }, (_, y) =>
        Array.from({ length: building.width }, (_, x) => ({ x, y }))).flat();
}

function getExteriorApproach(building, width, height) {
    if (!building.door) return null;
    const footprint = new Set(getFootprintCells(building).map((cell) => `${cell.x},${cell.y}`));
    const explicitDirection = DIRECTIONS.find((direction) => direction.edge === building.door.edge);
    const direction = explicitDirection || DIRECTIONS.find((candidate) =>
        !footprint.has(`${building.door.x + candidate.x},${building.door.y + candidate.y}`));
    if (!direction) return null;

    return {
        col: building.x + building.door.x + direction.x + Math.floor(width / 2),
        row: building.y + building.door.y + direction.y + Math.floor(height / 2)
    };
}

function isWalkableUnoccupiedSymbol(symbol) {
    const tile = TILE_SYMBOL_LIBRARY[symbol];
    return Boolean(
        tile &&
        tile.building === BUILDING_PARTS.NONE &&
        isBlockWalkable(tile.element, tile.texture, tile.building)
    );
}

function isInBounds(col, row, width, height) {
    return col >= 0 && row >= 0 && col < width && row < height;
}

function locationLabel(location) {
    return `${location.name || location.id || 'unknown'} (${location.id || `${location.x},${location.y}`})`;
}

function formatError(error) {
    const code = error?.code ? `${error.code}: ` : '';
    return `${code}${error?.message || String(error)}`;
}

function formatFailures(label, failures, limit = 20) {
    if (!failures.length) return label;
    const shown = failures.slice(0, limit).map((failure) => `- ${failure}`).join('\n');
    const remainder = failures.length > limit ? `\n- ...and ${failures.length - limit} more` : '';
    return `${label}:\n${shown}${remainder}`;
}
