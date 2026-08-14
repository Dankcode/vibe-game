import assert from 'node:assert/strict';
import test from 'node:test';

import { stampBuildingsOnRows } from './BuildingData.js';
import { ACTIVE_GEOGRAPHY } from './ActiveWorldData.js';
import { ACTIVE_BURG_COUNT } from './ActiveBurgSelection.js';
import { BURG_THEME_IDS, normalizeBurgThemeId } from './BurgThemeCatalog.js';
import {
    createFantasyWorldPlanAt,
    getDefaultWorldLocation,
    getWorldMapLocations
} from './FantasyWorldData.js';
import { BUILDING_PARTS, TILE_SYMBOL_LIBRARY, isBlockWalkable } from './TileLibrary.js';
import { FMG_BURG_RELIEF_FORMULA_VERSION } from './WorldConstraintField.js';
import {
    TERRAIN_MACRO_TILE_LIBRARY_VERSION,
    TERRAIN_PRIMARY_MACRO_SIZE,
    TERRAIN_TRANSITION_MACRO_SIZE
} from './TerrainMacroTileLibrary.js';
import { WORLD_PATH_CONNECTIVITY_VERSION } from './WorldPathConnectivity.js';

const EXPECTED_WORLD_LOCATIONS = ACTIVE_BURG_COUNT;
// Physical footprints deliberately leave room for the fixed gates, roads, plazas and keep
// approaches. Parcel WFC occupancy is checked separately; 43% keeps the town visually dense
// without treating its required public circulation as failed building coverage.
const MINIMUM_URBAN_FOOTPRINT_RATIO = 0.43;
const HARD_WATER_SYMBOLS = new Set(['W', 'I']);
const WALKABLE_APPROACH_PARTS = new Set([
    BUILDING_PARTS.NONE,
    BUILDING_PARTS.STAIRS,
    BUILDING_PARTS.STAIRS_NORTH,
    BUILDING_PARTS.STAIRS_SOUTH,
    BUILDING_PARTS.STAIRS_WEST,
    BUILDING_PARTS.STAIRS_EAST
]);
const DIRECTIONS = Object.freeze([
    Object.freeze({ edge: 'north', x: 0, y: -1 }),
    Object.freeze({ edge: 'east', x: 1, y: 0 }),
    Object.freeze({ edge: 'south', x: 0, y: 1 }),
    Object.freeze({ edge: 'west', x: -1, y: 0 })
]);

let cachedLocationResults;
const cachedRuntimePlans = new Map();

test('all ten active FMG locations generate without terrain or building WFC contradictions', () => {
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

test('all FMG locations use vector tiers as macro inhibitors and place buildings on level pads', () => {
    const failures = [];
    for (const result of successfulLocationResults()) {
        const elevation = result.plan.generation?.elevation || {};
        if (elevation.formulaVersion !== FMG_BURG_RELIEF_FORMULA_VERSION) {
            failures.push(`${locationLabel(result.location)} used relief ${elevation.formulaVersion || 'none'}`);
        }
        if (elevation.vectorElevationMode !== 'soft-macro-inhibitor' ||
            (elevation.vectorElevationCells > 0 && !elevation.vectorElevationConstraintsApplied)) {
            failures.push(`${locationLabel(result.location)} did not apply FMG tiers as macro inhibitors`);
        }
        if (elevation.illegalBuildingCliffs !== 0 || elevation.maximumBuildingElevationSpan > 0) {
            failures.push(
                `${locationLabel(result.location)} has ${elevation.illegalBuildingCliffs} cliff buildings ` +
                `(maximum span ${elevation.maximumBuildingElevationSpan})`
            );
        }
        if (elevation.illegalRoadCliffs !== 0 || elevation.maximumRoadElevationDelta > 1) {
            failures.push(
                `${locationLabel(result.location)} has ${elevation.illegalRoadCliffs} unsafe road edges ` +
                `(maximum delta ${elevation.maximumRoadElevationDelta})`
            );
        }
        if (!Array.isArray(elevation.settlementProfiles) || elevation.settlementProfiles.length === 0) {
            failures.push(`${locationLabel(result.location)} emitted no FMG relief profile`);
        }
    }
    assert.equal(failures.length, 0, formatFailures('burg relief contract failures', failures));
});

test('all FMG locations use coherent macro terrain and logical player connectors', () => {
    const failures = [];
    let checkedRiverSystems = 0;
    let checkedGates = 0;
    let checkedDoors = 0;
    for (const result of successfulLocationResults()) {
        const macro = result.plan.generation?.terrainMacroWfc || {};
        const connectivity = result.plan.generation?.pathConnectivity || {};
        if (macro.libraryVersion !== TERRAIN_MACRO_TILE_LIBRARY_VERSION ||
            macro.primarySize !== TERRAIN_PRIMARY_MACRO_SIZE ||
            macro.transitionSize !== TERRAIN_TRANSITION_MACRO_SIZE || !macro.globalAnchor) {
            failures.push(`${locationLabel(result.location)} emitted an invalid terrain macro contract`);
        }
        if ((macro.primaryModules || 0) === 0 || (macro.isolatedElevationCells || 0) !== 0) {
            failures.push(
                `${locationLabel(result.location)} has ${macro.primaryModules || 0} primary modules and ` +
                `${macro.isolatedElevationCells || 0} generated singleton elevations`
            );
        }
        if (!macro.solved || (macro.incompatibleEdges || 0) !== 0 || (macro.fallbacks || 0) !== 0) {
            failures.push(
                `${locationLabel(result.location)} macro collapse solved=${Boolean(macro.solved)}, ` +
                `incompatible=${macro.incompatibleEdges || 0}, fallbacks=${macro.fallbacks || 0}`
            );
        }
        if (connectivity.formulaVersion !== WORLD_PATH_CONNECTIVITY_VERSION || !connectivity.valid) {
            failures.push(
                `${locationLabel(result.location)} failed logical connectivity: ` +
                `${(connectivity.issueCodes || []).join(', ') || 'missing validator metadata'}`
            );
        }
        const stats = connectivity;
        checkedRiverSystems += stats.rivers?.systems || 0;
        checkedGates += stats.gates?.gates || 0;
        checkedDoors += stats.buildings?.doors || 0;
        if ((stats.rivers?.continuousSystems || 0) !== (stats.rivers?.systems || 0)) {
            failures.push(`${locationLabel(result.location)} contains a disconnected visible river system`);
        }
        if ((stats.gates?.connected || 0) !== (stats.gates?.gates || 0)) {
            failures.push(`${locationLabel(result.location)} contains a hanging or roadless gate`);
        }
        if ((stats.buildings?.connectedDoors || 0) !== (stats.buildings?.doors || 0) ||
            (stats.buildings?.levelFootprints || 0) !== (stats.buildings?.buildings || 0)) {
            failures.push(`${locationLabel(result.location)} contains a hanging door or uneven foundation`);
        }
    }
    assert.ok(checkedRiverSystems > 0, 'the location matrix must exercise FMG river continuity');
    assert.ok(checkedGates > 0, 'the location matrix must exercise wall gates');
    assert.ok(checkedDoors > 0, 'the location matrix must exercise enterable building doors');
    assert.equal(failures.length, 0, formatFailures('macro/path connectivity failures', failures));
});

test('manifest burg themes remain exact through town tiles and both building WFC paths', () => {
    const failures = [];
    const observedThemes = new Set();
    const burgById = new Map(ACTIVE_GEOGRAPHY.burgs.map((burg) => [Number(burg.id), burg]));

    for (const result of successfulLocationResults()) {
        const locationBurgId = Number(String(result.location.id || '').replace(/^burg-/, ''));
        const expectedThemeId = normalizeBurgThemeId(burgById.get(locationBurgId)?.themeId, null);
        const architecture = result.plan.generation?.architectureThemes || {};
        const bySettlement = architecture.bySettlement || {};
        const allowedThemes = new Set(Object.values(bySettlement).filter(Boolean));

        if (!expectedThemeId) {
            failures.push(`${locationLabel(result.location)} has no canonical manifest theme`);
            continue;
        }
        observedThemes.add(expectedThemeId);
        if (result.plan.sourceTown.architectureThemeId !== expectedThemeId) {
            failures.push(`${locationLabel(result.location)} source theme ${result.plan.sourceTown.architectureThemeId} != ${expectedThemeId}`);
        }
        if (result.plan.theme.primaryArchitectureThemeId !== expectedThemeId) {
            failures.push(`${locationLabel(result.location)} primary theme ${result.plan.theme.primaryArchitectureThemeId} != ${expectedThemeId}`);
        }
        for (const building of result.plan.buildings) {
            const ownerThemeId = bySettlement[`burg-${building.burgId}`];
            if (!ownerThemeId || building.architectureThemeId !== ownerThemeId) {
                failures.push(`${locationLabel(result.location)} ${building.id} crossed ${ownerThemeId || 'unknown'} -> ${building.architectureThemeId}`);
            }
            if (!building.facadeKit || !building.roofGeometry || !building.themePalette) {
                failures.push(`${locationLabel(result.location)} ${building.id} lacks themed render metadata`);
            }
        }
        for (const themeId of result.plan.architectureThemeRows.flat().filter(Boolean)) {
            if (!allowedThemes.has(themeId)) {
                failures.push(`${locationLabel(result.location)} rendered unowned tile theme ${themeId}`);
            }
        }
    }

    assert.deepEqual([...observedThemes].sort(), [...BURG_THEME_IDS].sort());
    assert.equal(failures.length, 0, formatFailures('burg architecture theme leakage', failures));
});

test('every view projects at most one source wall system with deterministic procedural fallbacks', () => {
    const failures = [];

    for (const result of successfulLocationResults()) {
        const buildings = result.plan.generation?.buildingWfc || {};
        if ((buildings.walledAreas || 0) > 1) {
            failures.push(`${locationLabel(result.location)} projected ${buildings.walledAreas} independent wall systems`);
        }
        if ((buildings.walledAreas || 0) === 1) {
            if ((buildings.vectorWallSystems || 0) === 1 && buildings.wallRings !== 0) {
                failures.push(`${locationLabel(result.location)} mixed FMG vector walls with ${buildings.wallRings} formula rings`);
            }
            if ((buildings.vectorWallSystems || 0) === 0 && buildings.wallRings !== 3) {
                failures.push(`${locationLabel(result.location)} projected ${buildings.wallRings} fallback rings instead of 3`);
            }
            if ((buildings.bakedBuildings || 0) < 2) {
                failures.push(`${locationLabel(result.location)} emitted fewer than two baked landmarks`);
            }
        }
    }

    assert.equal(failures.length, 0, formatFailures('blueprint settlement hierarchy failures', failures));
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
        WALKABLE_APPROACH_PARTS.has(tile.building) &&
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
