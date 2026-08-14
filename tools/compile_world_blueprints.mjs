#!/usr/bin/env node

// Offline FMG settlement compiler.
//
// This module intentionally reads only the global map-data document. The per-burg town_file
// references and every building payload remain outside the compiler boundary. town_summary is
// treated as a compact numeric inhibitor: it bounds density, height, decor and street priors but
// never supplies a baked street/building layout.

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    isBurgThemeId,
    validateManifestBurgThemes
} from '../client/src/data/BurgThemeCatalog.js';
import { resolveActiveBurgIds } from '../client/src/data/ActiveBurgSelection.js';

export const SETTLEMENT_BLUEPRINT_SCHEMA_VERSION = 2;
export const SETTLEMENT_BLUEPRINT_GENERATION_VERSION = 'fmg-blueprint-wfc-v11';
// Ten active settlements fit comfortably beneath this budget. Keeping the cap tight prevents a
// future FMG import from silently restoring the previous sixty-burg runtime payload.
export const SETTLEMENT_BLUEPRINT_SIZE_LIMIT = 48 * 1024;

const DEFAULT_SOURCE = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'map-data-package',
    'map-data.json'
);
const DISTRICT_ARCHETYPES = Object.freeze({
    castle: { keep: 1, manor: 0.55, garrison: 0.8, house: 0.08 },
    civic: { hall: 0.9, temple: 0.55, manor: 0.35, house: 0.25 },
    market: { market: 1, shop: 0.85, inn: 0.55, house: 0.35 },
    residential: { house: 1, cabin: 0.45, inn: 0.18, shop: 0.2 },
    artisan: { workshop: 1, house: 0.62, shop: 0.42, warehouse: 0.25 },
    harbor: { dock: 1, warehouse: 0.8, inn: 0.52, house: 0.3 }
});
const DENSITY_PRIORS = Object.freeze({
    VERY_SPARSE: 0.2,
    SPARSE: 0.34,
    MEDIUM: 0.56,
    DENSE: 0.72,
    EXTREME: 0.84
});
// Exact source-schema allowlists keep the coverage audit honest. Broad descendant prefixes made
// a newly exported nested field look "consumed" even when no formula knew it existed.
const CONSUMED_FIELD_PATTERNS = Object.freeze([
    /^metadata\.(?:seed|map_id|width|height|schema_version)$/,
    /^entities\.burgs\[\]\.(?:cell|culture|feature|group|id|name|original_population_points|population|state)$/,
    /^entities\.burgs\[\]\.(?:coordinate_center|geo_coordinate)\[\]$/,
    /^entities\.burgs\[\]\.flags\.(?:capital|citadel|plaza|port|temple|walls)$/,
    /^entities\.burgs\[\]\.town_summary\.(?:biome|buildings|density|doodads|farms|floors|rooms|streets|walls)$/,
    /^entities\.burgs\[\]\.town_summary\.grid\.(?:height|tile_size_map_units|width)$/,
    /^entities\.burgs\[\]\.town_summary\.grid\.(?:center|origin)\[\]$/,
    /^entities\.states\[\]\.(?:burgs|capital|cells|center_cell|color|culture|form|full_name|id|name)$/,
    /^entities\.states\[\]\.neighbors\[\]$/,
    /^entities\.states\[\]\.population\.(?:rural_points|urban_points)$/,
    /^entities\.cultures\[\]\.(?:center_cell|color|id|name|type)$/,
    /^entities\.provinces\[\]\.(?:burg|cell_count|center_cell|color|full_name|id|name)$/,
    /^entities\.religions\[\]\.(?:center_cell|color|id|name|type)$/,
    /^world\.cells\[\]\.(?:area|biome|burg|culture|elevation|feature|flux|good|height|id|market|population_points|province|religion|river|state|temp|terrain)$/,
    /^world\.cells\[\]\.(?:coordinate|geo_coordinate|neighbors)\[\]$/,
    /^world\.routes\[\]\.(?:feature|id|kind)$/,
    /^world\.routes\[\]\.cells\[\]$/,
    /^world\.routes\[\]\.points\[\]\[\]$/,
    /^world\.rivers\[\]\.(?:basin|discharge|id|length|mouth_cell|name|parent|source_cell|type|width)$/,
    /^world\.rivers\[\]\.cells\[\]$/,
    /^world\.(?:width|height)$/,
    /^legacy_fmg_refs\.biomes\[\]$/,
    /^legacy_fmg_refs\.notes\[\]\.(?:id|legend|name)$/
]);

/**
 * Compile the full, deterministic data-only blueprint payload consumed by runtime WFC.
 * No filesystem access occurs here, which keeps repeatability testable with an in-memory source.
 */
export function compileWorldBlueprints(source, options = {}) {
    validateSource(source);
    const sourceBurgs = sortByNumericId(source.entities.burgs);
    const activeBurgIds = normalizeActiveBurgIds(options.activeBurgIds, sourceBurgs);
    const burgs = activeBurgIds
        ? sourceBurgs.filter((burg) => activeBurgIds.has(number(burg.id)))
        : sourceBurgs;
    const burgThemeById = normalizeBurgThemeById(options.burgThemeById, burgs, {
        allowExtraAssignments: Boolean(activeBurgIds)
    });
    const cells = sortByNumericId(source.world.cells);
    const states = sortByNumericId(source.entities.states || []);
    const cultures = sortByNumericId(source.entities.cultures || []);
    const provinces = sortByNumericId(source.entities.provinces || []);
    const religions = sortByNumericId(source.entities.religions || []);
    const routes = sortByNumericId(source.world.routes || []);
    const rivers = sortByNumericId(source.world.rivers || []);
    const cellsById = new Map(cells.map((cell) => [number(cell.id), cell]));
    const stateById = new Map(states.map((state) => [number(state.id), state]));
    const cultureById = new Map(cultures.map((culture) => [number(culture.id), culture]));
    const provinceById = new Map(provinces.map((province) => [number(province.id), province]));
    const religionById = new Map(religions.map((religion) => [number(religion.id), religion]));
    const context = {
        source,
        cells,
        cellsById,
        stateById,
        cultureById,
        burgThemeById,
        provinceById,
        religionById,
        routes,
        rivers,
        notes: Array.isArray(source.legacy_fmg_refs?.notes) ? source.legacy_fmg_refs.notes : []
    };

    const burgFacts = burgs.map((burg) => compileBurgFacts(burg, context));
    const clusters = compileClusters(burgFacts, states);
    const roleByBurgId = new Map();
    for (const cluster of clusters) {
        for (const burgId of cluster.memberBurgIds) {
            roleByBurgId.set(burgId, {
                clusterId: cluster.id,
                hierarchy: burgId === cluster.seatBurgId ? 'seat' : 'fief',
                liegeBurgId: burgId === cluster.seatBurgId ? null : cluster.seatBurgId,
                seatOf: burgId === cluster.seatBurgId ? [...cluster.fiefBurgIds] : []
            });
        }
    }

    const factsById = new Map(burgFacts.map((facts) => [facts.burgId, facts]));
    const globalWater = compileGlobalWater(context);
    const blueprints = burgFacts.map((facts) => compileBlueprint(
        facts,
        roleByBurgId.get(facts.burgId),
        factsById,
        globalWater,
        context
    ));
    const blueprintById = new Map(blueprints.map((blueprint) => [blueprint.burgId, blueprint]));
    const compiledClusters = clusters.map((cluster) => ({
        ...cluster,
        roadIds: cluster.fiefBurgIds.map((burgId) => fiefRoadId(burgId, cluster.seatBurgId)),
        anchorX: blueprintById.get(cluster.seatBurgId)?.anchorX || 0,
        anchorY: blueprintById.get(cluster.seatBurgId)?.anchorY || 0
    }));
    const blueprintBytes = Buffer.byteLength(JSON.stringify(blueprints));
    const coverage = compileBlueprintCoverage(source, {
        blueprintCount: blueprints.length,
        clusterCount: compiledClusters.length,
        seatCount: blueprints.filter((blueprint) => blueprint.hierarchy === 'seat').length,
        fiefCount: blueprints.filter((blueprint) => blueprint.hierarchy === 'fief').length,
        blueprintBytes
    });

    return {
        schema: 'vibe-game-settlement-blueprints',
        schemaVersion: SETTLEMENT_BLUEPRINT_SCHEMA_VERSION,
        generationVersion: options.generationVersion || SETTLEMENT_BLUEPRINT_GENERATION_VERSION,
        coordinateSpace: source.image?.coordinate_space || 'fmg-svg-pixels',
        wallRadiusUnits: 'local-tiles',
        blueprints,
        clusters: compiledClusters,
        globalWater,
        coverage
    };
}

/** Report which map-data fields are compiler inputs and which stay at another import boundary. */
export function compileBlueprintCoverage(source, compiled = {}) {
    const fieldPaths = [...collectLeafPaths(source)].sort();
    const consumedFields = [];
    const ignoredFields = [];
    const unexplainedFields = [];
    for (const field of fieldPaths) {
        const ignoredReason = ignoredFieldReason(field);
        if (ignoredReason) {
            ignoredFields.push({ field, reason: ignoredReason });
        } else if (isConsumedField(field)) {
            consumedFields.push(field);
        } else {
            unexplainedFields.push(field);
        }
    }
    const blueprintBytes = nonNegativeInteger(compiled.blueprintBytes);
    return {
        sourceSchemaVersion: number(source.metadata?.schema_version),
        inputFieldCount: fieldPaths.length,
        consumedFieldCount: consumedFields.length,
        ignoredFieldCount: ignoredFields.length,
        consumedFields,
        ignoredFields,
        unexplainedFields,
        blueprintCount: nonNegativeInteger(compiled.blueprintCount),
        clusterCount: nonNegativeInteger(compiled.clusterCount),
        seatCount: nonNegativeInteger(compiled.seatCount),
        fiefCount: nonNegativeInteger(compiled.fiefCount),
        blueprintBytes,
        byteLimit: SETTLEMENT_BLUEPRINT_SIZE_LIMIT,
        withinByteLimit: blueprintBytes <= SETTLEMENT_BLUEPRINT_SIZE_LIMIT
    };
}

export const compileSettlementBlueprints = compileWorldBlueprints;
export const createBlueprintCoverageReport = compileBlueprintCoverage;

function validateSource(source) {
    if (!source?.world || !Array.isArray(source.world.cells) || source.world.cells.length === 0) {
        throw new Error('Settlement blueprint compiler requires non-empty world.cells.');
    }
    if (!source?.entities || !Array.isArray(source.entities.burgs)) {
        throw new Error('Settlement blueprint compiler requires entities.burgs.');
    }
}

function compileBurgFacts(burg, context) {
    const sourceCell = context.cellsById.get(number(burg.cell));
    const coordinate = coordinateOfBurg(burg, sourceCell);
    const anchor = findStableInlandAnchor(burg, sourceCell, context.cellsById, coordinate);
    const flags = compactFlags(burg.flags);
    const population = Math.max(1, round(burg.population ?? burg.original_population_points, 2));
    const summary = burg.town_summary || {};
    const tileScale = clamp(round(summary.grid?.tile_size_map_units, 3) || 1, 0.25, 4);
    const density = densityPrior(summary.density, burg.group, population);
    return {
        burgId: number(burg.id),
        name: String(burg.name || `Burg ${burg.id}`),
        group: String(burg.group || 'town'),
        x: round(coordinate[0], 2),
        y: round(coordinate[1], 2),
        anchorX: anchor.x,
        anchorY: anchor.y,
        anchorCell: anchor.cell,
        tileScale,
        population,
        state: number(burg.state),
        culture: number(burg.culture),
        themeId: context.burgThemeById.get(number(burg.id)),
        cell: number(burg.cell),
        feature: number(burg.feature),
        flags,
        geoCoordinate: Array.isArray(burg.geo_coordinate)
            ? [round(burg.geo_coordinate[0], 4), round(burg.geo_coordinate[1], 4)]
            : [0, 0],
        tier: compileTier({ flags, group: burg.group, population, summary }),
        density,
        summary,
        sourceCell
    };
}

function compileClusters(burgFacts, states) {
    const grouped = new Map();
    for (const facts of burgFacts) {
        const key = facts.state > 0 ? `state-${facts.state}` : `independent-${facts.burgId}`;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push(facts);
    }
    const stateById = new Map(states.map((state) => [number(state.id), state]));
    return [...grouped.entries()].map(([id, members]) => {
        members.sort(compareSeatDominance);
        const seat = members[0];
        const memberBurgIds = members.map((member) => member.burgId).sort((a, b) => a - b);
        return {
            id,
            state: seat.state,
            stateName: String(stateById.get(seat.state)?.name || ''),
            seatBurgId: seat.burgId,
            memberBurgIds,
            fiefBurgIds: memberBurgIds.filter((burgId) => burgId !== seat.burgId)
        };
    }).sort((a, b) => a.seatBurgId - b.seatBurgId || a.id.localeCompare(b.id));
}

function compareSeatDominance(a, b) {
    const score = (facts) => (
        Number(facts.flags.walls) * 1_000_000_000
        + Number(facts.flags.capital) * 100_000_000
        + Number(facts.flags.citadel) * 10_000_000
        + facts.population * 1_000
        + (10_000 - facts.burgId)
    );
    return score(b) - score(a) || a.burgId - b.burgId;
}

function compileBlueprint(facts, role, factsById, globalWater, context) {
    const seatFacts = factsById.get(role.liegeBurgId || facts.burgId);
    const baseRings = role.hierarchy === 'seat' ? compileBaseWallRings(facts) : [];
    const roads = compileRoads(facts, role, seatFacts, factsById, baseRings, context);
    const gates = compileGates(roads, facts, role, factsById);
    const wallRings = baseRings.map((ring) => ({
        ...ring,
        gates: gates.map((gate) => ({ ...gate, grand: facts.flags.capital || gate.grand }))
    }));
    const castle = compileCastle(facts, role, wallRings, gates, context.stateById.get(facts.state));
    const wards = compileWards(facts, role, wallRings, castle, context.cultureById.get(facts.culture));
    const water = compileLocalWater(facts, globalWater, wallRings);
    const region = compileRegion(facts, context);
    const identity = compileIdentity(facts, context, region);
    const districtDirectives = compileDistrictDirectives(
        facts,
        role,
        gates,
        water,
        identity,
        factsById,
        context.stateById.get(facts.state)
    );
    const blueprint = {
        id: `burg-${facts.burgId}`,
        burgId: facts.burgId,
        name: facts.name,
        x: facts.x,
        y: facts.y,
        anchorX: facts.anchorX,
        anchorY: facts.anchorY,
        anchorCell: facts.anchorCell,
        tileScale: facts.tileScale,
        clusterId: role.clusterId,
        tier: facts.tier,
        hierarchy: role.hierarchy,
        seatOf: [...role.seatOf],
        liegeBurgId: role.liegeBurgId,
        burg: {
            group: facts.group,
            population: facts.population,
            state: facts.state,
            culture: facts.culture,
            themeId: facts.themeId,
            cell: facts.cell,
            feature: facts.feature,
            flags: { ...facts.flags, walls: role.hierarchy === 'seat' }
        },
        wallRings,
        castle,
        wards,
        roads,
        climate: compileClimate(facts),
        water,
        districtDirectives,
        inhibitors: compileInhibitors(facts),
        identity,
        region,
        loreHooks: compileLoreHooks(facts, context.notes)
    };
    blueprint.skeletonHash = hashObject({
        anchorX: blueprint.anchorX,
        anchorY: blueprint.anchorY,
        wallRings: blueprint.wallRings,
        castle: blueprint.castle,
        roads: blueprint.roads,
        water: blueprint.water
    });
    return blueprint;
}

function compileBaseWallRings(facts) {
    const ringCount = facts.flags.capital ? 3 : facts.tier >= 2 ? 2 : 1;
    const populationRadius = Math.sqrt(Math.max(1, facts.population)) * 0.54;
    const summaryRadius = Math.sqrt(Math.max(1, number(facts.summary.streets))) * 0.12;
    const outerRadius = clamp(Math.round(13 + populationRadius + summaryRadius), 16, 29);
    const radii = ringCount === 3
        ? [outerRadius, Math.max(11, Math.round(outerRadius * 0.68)), Math.max(6, Math.round(outerRadius * 0.36))]
        : ringCount === 2
            ? [outerRadius, Math.max(7, Math.round(outerRadius * 0.48))]
            : [outerRadius];
    return radii.map((radius, ring) => ({
        ring,
        radius,
        thickness: ring === 0 ? 2 : 1,
        heightVoxels: Math.max(3, 6 - ring),
        gates: []
    }));
}

function compileRoads(facts, role, seatFacts, factsById, baseRings, context) {
    const nearbyRoutes = compileNearbyRoutes(facts, context.routes);
    const roads = [...nearbyRoutes];
    if (role.hierarchy === 'fief' && seatFacts) {
        roads.push(compileFiefRoad(facts, seatFacts, baseRings, factsById));
    } else if (role.hierarchy === 'seat') {
        for (const fiefBurgId of role.seatOf) {
            const fief = factsById.get(fiefBurgId);
            if (fief) roads.push(compileFiefRoad(facts, fief, baseRings, factsById, true));
        }
    }
    return dedupeBy(roads, (road) => road.id)
        .sort((a, b) => a.id.localeCompare(b.id));
}

function compileNearbyRoutes(facts, routes) {
    const candidates = [];
    for (const route of routes) {
        const points = normalizePoints(route.points);
        if (points.length < 2) continue;
        let nearestIndex = 0;
        let nearestDistance = Infinity;
        for (let index = 0; index < points.length; index += 1) {
            const distance = pointDistance([facts.anchorX, facts.anchorY], points[index]);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        }
        const touchesCell = Array.isArray(route.cells) && route.cells.some((cell) => number(cell) === facts.cell);
        if (!touchesCell && nearestDistance > 34) continue;
        const first = points[Math.max(0, nearestIndex - 1)];
        const second = points[Math.min(points.length - 1, nearestIndex + 1)];
        const directionPoint = pointDistance(first, [facts.anchorX, facts.anchorY]) >= pointDistance(second, [facts.anchorX, facts.anchorY])
            ? first
            : second;
        candidates.push({
            id: `route-${number(route.id)}`,
            routeId: number(route.id),
            kind: String(route.kind || 'road'),
            widthTiles: roadWidth(route.kind),
            gateBearing: bearingDegrees([facts.anchorX, facts.anchorY], directionPoint),
            points: [roundPoint(first), roundPoint(second)],
            distance: nearestDistance
        });
    }
    return candidates
        .sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id))
        .slice(0, 2)
        .map(({ distance: _distance, ...road }) => road);
}

function compileFiefRoad(origin, destination, originRings, _factsById, originIsSeat = false) {
    const seat = originIsSeat ? origin : destination;
    const fief = originIsSeat ? destination : origin;
    // Fief links share one of four cardinal gates so every satellite road reaches a real opening
    // even when a seat governs many villages in the same directional belt.
    const seatBearing = quantizeBearing(
        bearingDegrees([seat.anchorX, seat.anchorY], [fief.anchorX, fief.anchorY]),
        90
    );
    const outerRadius = originIsSeat
        ? (originRings[0]?.radius || 0)
        : compileBaseWallRings(seat)[0]?.radius || 0;
    const gatePoint = projectBearing(
        seat.anchorX,
        seat.anchorY,
        outerRadius * seat.tileScale,
        seatBearing
    );
    return {
        id: fiefRoadId(fief.burgId, seat.burgId),
        routeId: null,
        kind: 'fief-link',
        widthTiles: fief.population >= 100 ? 2 : 1,
        gateBearing: originIsSeat ? seatBearing : bearingDegrees([fief.anchorX, fief.anchorY], gatePoint),
        seatGateBearing: seatBearing,
        toBurgId: destination.burgId,
        points: originIsSeat
            ? [roundPoint(gatePoint), [fief.anchorX, fief.anchorY]]
            : [[fief.anchorX, fief.anchorY], roundPoint(gatePoint)]
    };
}

function compileGates(roads, facts, role, factsById) {
    if (role.hierarchy !== 'seat') return [];
    const candidates = roads.map((road) => ({
        bearing: quantizeBearing(road.seatGateBearing ?? road.gateBearing, 45),
        towardRoute: road.routeId,
        towardFief: road.kind === 'fief-link'
            ? road.toBurgId
            : null,
        grand: road.kind !== 'trails'
    }));
    if (candidates.length === 0) {
        const firstFief = role.seatOf.map((burgId) => factsById.get(burgId)).find(Boolean);
        candidates.push({
            bearing: firstFief
                ? quantizeBearing(bearingDegrees([facts.anchorX, facts.anchorY], [firstFief.anchorX, firstFief.anchorY]), 45)
                : 180,
            towardRoute: null,
            towardFief: firstFief?.burgId || null,
            grand: facts.flags.capital
        });
    }
    return dedupeBy(candidates, (gate) => String(gate.bearing))
        .slice(0, 4)
        .sort((a, b) => a.bearing - b.bearing)
        .map((gate) => ({ ...gate, edge: bearingEdge(gate.bearing) }));
}

function compileCastle(facts, role, wallRings, gates, state) {
    if (role.hierarchy !== 'seat' || wallRings.length === 0) return null;
    const isDucal = /duchy|kingdom|monarchy|empire|principality/i.test(String(state?.form || state?.full_name || ''));
    if (!facts.flags.capital && !facts.flags.citadel && !isDucal) return null;
    const size = clamp(5 + facts.tier + Math.round(Math.sqrt(facts.population) / 7), 7, 12);
    return {
        ward: wallRings.length - 1,
        size: { widthTiles: size, depthTiles: Math.max(6, size - 1) },
        keepHeight: clamp(7 + facts.tier * 2 + Math.round(facts.population / 120), 9, 16),
        gateBearing: gates[0]?.bearing ?? 180
    };
}

function compileWards(facts, role, wallRings, castle, culture) {
    const cultureType = String(culture?.type || '').toLowerCase();
    if (role.hierarchy === 'fief') {
        const radius = clamp(Math.round(6 + Math.sqrt(facts.population) * 0.45), 8, 13);
        return [ward(0, 0, radius, cultureType.includes('hunting') ? 'artisan' : 'residential', facts, 0)];
    }
    return wallRings.map((ring, index) => {
        const innerRadius = wallRings[index + 1]?.radius || 0;
        let district = 'residential';
        if (index === wallRings.length - 1) district = castle ? 'castle' : 'civic';
        else if (index === wallRings.length - 2) district = 'market';
        else if (facts.flags.port && index === 0) district = 'harbor';
        else if (/industrial|hunting|nomadic/.test(cultureType)) district = 'artisan';
        return ward(index, innerRadius, ring.radius, district, facts, index);
    });
}

function ward(ring, innerRadius, outerRadius, district, facts, index) {
    const densityAdjustment = district === 'castle' ? -0.13 : district === 'market' ? 0.09 : 0;
    const variance = district === 'castle' || district === 'civic' ? 0.04 : 0.1 + index * 0.035;
    return {
        ring,
        innerRadius,
        outerRadius,
        district,
        wfcPriors: {
            buildingDensity: clamp(round(facts.density + densityAdjustment, 3), 0.12, 0.92),
            archetypeWeights: { ...DISTRICT_ARCHETYPES[district] },
            elevationVariance: round(variance, 3)
        }
    };
}

function compileGlobalWater(context) {
    const waterfalls = [];
    const riverSummaries = [];
    for (const river of context.rivers) {
        const riverId = number(river.id);
        const riverCells = (Array.isArray(river.cells) ? river.cells : [])
            .map((cellId) => context.cellsById.get(number(cellId)))
            .filter(Boolean);
        riverSummaries.push({
            id: riverId,
            widthTiles: waterWidthTiles(river.width),
            intensity: waterIntensity(river.discharge),
            sourceCell: number(river.source_cell),
            mouthCell: number(river.mouth_cell)
        });
        for (let index = 0; index < riverCells.length - 1; index += 1) {
            const from = riverCells[index];
            let target = riverCells[index + 1];
            let drop = heightOf(from) - heightOf(target);
            if (index + 2 < riverCells.length) {
                const secondTarget = riverCells[index + 2];
                const secondDrop = heightOf(from) - heightOf(secondTarget);
                if (secondDrop > drop) {
                    target = secondTarget;
                    drop = secondDrop;
                }
            }
            if (drop < 6) continue;
            const position = coordinateOfCell(target);
            waterfalls.push({
                id: `waterfall-${riverId}-${number(from.id)}-${number(target.id)}`,
                riverId,
                x: round(position[0], 2),
                y: round(position[1], 2),
                sourceCell: number(from.id),
                targetCell: number(target.id),
                dropTiers: clamp(Math.round(drop / 5), 1, 8),
                widthTiles: waterWidthTiles(river.width),
                intensity: waterIntensity(river.discharge),
                bearing: bearingDegrees(coordinateOfCell(from), position),
                plungePool: true,
                walkableOutflow: true
            });
            if (target === riverCells[index + 2]) index += 1;
        }
    }
    const crossings = compileWaterCrossings(context);
    return {
        rivers: riverSummaries.sort((a, b) => a.id - b.id),
        crossings,
        waterfalls: dedupeBy(waterfalls, (waterfall) => waterfall.id)
            .sort((a, b) => a.riverId - b.riverId || a.sourceCell - b.sourceCell)
    };
}

function compileWaterCrossings(context) {
    const riverAtCell = new Map();
    for (const river of context.rivers) {
        for (const cellId of river.cells || []) riverAtCell.set(number(cellId), river);
    }
    const crossings = [];
    for (const route of context.routes) {
        const seenRiverIds = new Set();
        for (const cellIdValue of route.cells || []) {
            const cellId = number(cellIdValue);
            const river = riverAtCell.get(cellId);
            if (!river || seenRiverIds.has(number(river.id))) continue;
            seenRiverIds.add(number(river.id));
            const cell = context.cellsById.get(cellId);
            const position = coordinateOfCell(cell);
            const bridge = number(river.width) >= 2.2 || number(river.discharge) >= 120;
            crossings.push({
                id: `${bridge ? 'bridge' : 'ford'}-${number(route.id)}-${number(river.id)}`,
                kind: bridge ? 'bridge' : 'ford',
                routeId: number(route.id),
                riverId: number(river.id),
                x: round(position[0], 2),
                y: round(position[1], 2),
                widthTiles: waterWidthTiles(river.width)
            });
        }
    }
    return crossings.sort((a, b) => a.routeId - b.routeId || a.riverId - b.riverId);
}

function compileLocalWater(facts, globalWater, wallRings) {
    const influenceRadius = Math.max(34, (wallRings[0]?.radius || 13) * facts.tileScale * 2.2);
    const near = (directive) => pointDistance(
        [facts.anchorX, facts.anchorY],
        [number(directive.x), number(directive.y)]
    ) <= influenceRadius;
    const byDistance = (a, b) => (
        pointDistance([facts.anchorX, facts.anchorY], [a.x, a.y])
        - pointDistance([facts.anchorX, facts.anchorY], [b.x, b.y])
    );
    const waterfalls = globalWater.waterfalls.filter(near).sort(byDistance).slice(0, 6);
    const crossings = globalWater.crossings.filter(near).sort(byDistance).slice(0, 8);
    const riverIds = new Set([
        ...waterfalls.map((waterfall) => waterfall.riverId),
        ...crossings.map((crossing) => crossing.riverId)
    ]);
    if (facts.sourceCell && number(facts.sourceCell.river) > 0) riverIds.add(number(facts.sourceCell.river));
    const nearestWater = [...waterfalls, ...crossings]
        .sort((a, b) => (
            pointDistance([facts.anchorX, facts.anchorY], [a.x, a.y])
            - pointDistance([facts.anchorX, facts.anchorY], [b.x, b.y])
        ))[0];
    return {
        riverIds: [...riverIds].sort((a, b) => a - b),
        fords: crossings.filter((crossing) => crossing.kind === 'ford').map((crossing) => crossing.id),
        bridges: crossings.filter((crossing) => crossing.kind === 'bridge').map((crossing) => crossing.id),
        waterfalls: waterfalls.map((waterfall) => waterfall.id),
        shoreBearing: nearestWater
            ? bearingDegrees([facts.anchorX, facts.anchorY], [nearestWater.x, nearestWater.y])
            : null
    };
}

function compileDistrictDirectives(facts, role, gates, water, identity, factsById, state) {
    const fiefNames = role.seatOf.map((burgId) => factsById.get(burgId)?.name).filter(Boolean);
    const liegeName = role.liegeBurgId ? factsById.get(role.liegeBurgId)?.name : null;
    const waterBearing = water.shoreBearing ?? gates[0]?.bearing ?? 180;
    return {
        docks: {
            enabled: facts.flags.port,
            bearing: facts.flags.port ? quantizeBearing(waterBearing, 45) : null,
            minimumLengthTiles: facts.flags.port ? clamp(3 + facts.tier, 4, 7) : 0
        },
        plaza: {
            enabled: facts.flags.plaza || role.hierarchy === 'seat',
            radiusTiles: facts.flags.plaza || role.hierarchy === 'seat' ? 2 + facts.tier : 0
        },
        temple: {
            enabled: facts.flags.temple,
            religionId: facts.flags.temple ? identity.religionId : null
        },
        watchtowers: {
            count: role.hierarchy === 'seat'
                ? Math.max(4, gates.length * 2 + Math.min(4, (state?.neighbors || []).length))
                : 0
        },
        signpost: {
            enabled: role.hierarchy === 'fief' || role.seatOf.length > 0,
            destinations: role.hierarchy === 'fief' ? [liegeName].filter(Boolean) : fiefNames
        }
    };
}

function compileClimate(facts) {
    const longitude = round(facts.geoCoordinate[0], 4);
    const latitude = round(facts.geoCoordinate[1], 4);
    const temperature = round(facts.sourceCell?.temp, 2);
    const snowline = clamp(round(84 - Math.abs(latitude) * 0.72 + temperature * 0.12, 2), 18, 88);
    return {
        longitude,
        latitude,
        temperature,
        snowline,
        biome: String(facts.summary.biome || '')
    };
}

function compileInhibitors(facts) {
    const summary = facts.summary || {};
    const streets = nonNegativeInteger(summary.streets);
    const gridArea = Math.max(1, number(summary.grid?.width) * number(summary.grid?.height));
    const normalizedStreets = clamp(streets / gridArea, 0, 1);
    return {
        gridWidth: nonNegativeInteger(summary.grid?.width),
        gridHeight: nonNegativeInteger(summary.grid?.height),
        maxFloors: clamp(nonNegativeInteger(summary.floors) || 1, 1, 8),
        buildingHint: nonNegativeInteger(summary.buildings),
        roomHint: nonNegativeInteger(summary.rooms),
        streetIntensity: round(normalizedStreets, 4),
        wallEvidence: nonNegativeInteger(summary.walls),
        farmHint: nonNegativeInteger(summary.farms),
        decorBudget: nonNegativeInteger(summary.doodads),
        chaosCap: round(clamp(0.68 - facts.density * 0.42 - normalizedStreets * 0.35, 0.16, 0.58), 3)
    };
}

function compileIdentity(facts, context, region) {
    const state = context.stateById.get(facts.state);
    const culture = context.cultureById.get(facts.culture);
    const religionId = number(facts.sourceCell?.religion) || facts.culture;
    const religion = context.religionById.get(religionId);
    return {
        stateName: String(state?.name || ''),
        stateForm: String(state?.form || ''),
        stateColor: normalizeColor(state?.color),
        cultureName: String(culture?.name || ''),
        cultureType: String(culture?.type || ''),
        cultureColor: normalizeColor(culture?.color),
        architectureThemeId: facts.themeId,
        religionId: religion?.id ? number(religion.id) : null,
        religionName: String(religion?.name || ''),
        provinceId: region?.id || null
    };
}

function compileRegion(facts, context) {
    const direct = [...context.provinceById.values()].find((province) => number(province.burg) === facts.burgId);
    const province = direct || context.provinceById.get(number(facts.sourceCell?.province));
    if (!province) return null;
    return {
        id: number(province.id),
        name: String(province.name || ''),
        fullName: String(province.full_name || province.name || ''),
        color: normalizeColor(province.color)
    };
}

function compileLoreHooks(facts, notes) {
    const needle = facts.name.toLocaleLowerCase('en-US');
    return notes
        .filter((note) => `${note?.name || ''} ${note?.legend || ''}`.toLocaleLowerCase('en-US').includes(needle))
        .sort((a, b) => String(a.id).localeCompare(String(b.id)))
        .slice(0, 1)
        .map((note) => {
            const legend = String(note.legend || '').replace(/\s+/g, ' ').trim();
            return {
                id: String(note.id || ''),
                title: String(note.name || ''),
                summary: legend.length > 64 ? `${legend.slice(0, 63)}…` : legend,
                sourceHash: createHash('sha256').update(legend).digest('hex').slice(0, 12)
            };
        });
}

function findStableInlandAnchor(burg, sourceCell, cellsById, fallbackCoordinate) {
    if (!sourceCell) return { x: round(fallbackCoordinate[0], 2), y: round(fallbackCoordinate[1], 2), cell: number(burg.cell) };
    const queue = [{ cell: sourceCell, depth: 0 }];
    const seen = new Set([number(sourceCell.id)]);
    const candidates = [];
    while (queue.length) {
        const current = queue.shift();
        if (isLandCell(current.cell)) {
            const neighbors = (current.cell.neighbors || []).map((id) => cellsById.get(number(id))).filter(Boolean);
            const landNeighbors = neighbors.filter(isLandCell).length;
            const coordinate = coordinateOfCell(current.cell);
            const distance = pointDistance(fallbackCoordinate, coordinate);
            if (distance <= 24) {
                candidates.push({
                    cell: current.cell,
                    coordinate,
                    score: landNeighbors * 20 + heightOf(current.cell) * 0.25 - current.depth * 5 - distance * 0.15
                });
            }
        }
        if (current.depth >= 3) continue;
        for (const neighborId of current.cell.neighbors || []) {
            const id = number(neighborId);
            if (seen.has(id)) continue;
            seen.add(id);
            const neighbor = cellsById.get(id);
            if (neighbor) queue.push({ cell: neighbor, depth: current.depth + 1 });
        }
    }
    candidates.sort((a, b) => b.score - a.score || number(a.cell.id) - number(b.cell.id));
    const chosen = candidates[0] || { cell: sourceCell, coordinate: coordinateOfCell(sourceCell) };
    return {
        x: round(chosen.coordinate[0], 2),
        y: round(chosen.coordinate[1], 2),
        cell: number(chosen.cell.id)
    };
}

function compileTier({ flags, group, population, summary }) {
    if (flags.capital || population >= 180) return 3;
    if (flags.citadel || flags.walls || group === 'town' || population >= 80 || number(summary.walls) > 0) return 2;
    return 1;
}

function densityPrior(value, group, population) {
    const named = DENSITY_PRIORS[String(value || '').toUpperCase()];
    if (Number.isFinite(named)) return named;
    if (group === 'capital') return 0.82;
    if (group === 'town' || population >= 80) return 0.55;
    return 0.3;
}

function collectLeafPaths(value, pathPrefix = '', output = new Set()) {
    if (Array.isArray(value)) {
        if (value.length === 0) output.add(`${pathPrefix}[]`);
        else for (const item of value) collectLeafPaths(item, `${pathPrefix}[]`, output);
        return output;
    }
    if (value && typeof value === 'object') {
        const entries = Object.entries(value);
        if (entries.length === 0 && pathPrefix) output.add(pathPrefix);
        for (const [key, child] of entries) {
            collectLeafPaths(child, pathPrefix ? `${pathPrefix}.${key}` : key, output);
        }
        return output;
    }
    if (pathPrefix) output.add(pathPrefix);
    return output;
}

function ignoredFieldReason(field) {
    if (field === 'entities.burgs[].town_file') {
        return 'Dedicated town payload locator is an explicit trust-boundary exclusion and is never opened.';
    }
    if (field === 'entities.burgs[].town_summary.file') {
        return 'Summary file locator is not generation data; compact sibling metrics are compiled instead.';
    }
    if (field.startsWith('image.')) return 'Copied by the map asset importer; it does not constrain settlement WFC.';
    if (field.startsWith('world.features[]')) return 'Retained by ACTIVE_GEOGRAPHY for map topology; settlement constraints use cells.';
    if (field.startsWith('world.map_coordinates.')) return 'Global map bounds remain ACTIVE_GEOGRAPHY metadata; burg geo coordinates drive climate.';
    if (field.startsWith('metadata.') && ![
        'metadata.seed',
        'metadata.map_id',
        'metadata.width',
        'metadata.height',
        'metadata.schema_version'
    ].includes(field)) {
        return 'Owned by the package/import provenance layer rather than settlement synthesis.';
    }
    return null;
}

function isConsumedField(field) {
    return CONSUMED_FIELD_PATTERNS.some((pattern) => pattern.test(field));
}

function fiefRoadId(fiefBurgId, seatBurgId) {
    return `fief-${fiefBurgId}-to-seat-${seatBurgId}`;
}

function compactFlags(flags = {}) {
    return {
        capital: Boolean(flags.capital),
        port: Boolean(flags.port),
        citadel: Boolean(flags.citadel),
        plaza: Boolean(flags.plaza),
        walls: Boolean(flags.walls),
        temple: Boolean(flags.temple)
    };
}

function coordinateOfBurg(burg, cell) {
    if (Array.isArray(burg.coordinate_center) && burg.coordinate_center.length >= 2) return burg.coordinate_center;
    return coordinateOfCell(cell);
}

function coordinateOfCell(cell) {
    if (Array.isArray(cell?.coordinate) && cell.coordinate.length >= 2) return [number(cell.coordinate[0]), number(cell.coordinate[1])];
    return [0, 0];
}

function normalizePoints(points) {
    return (Array.isArray(points) ? points : [])
        .filter((point) => Array.isArray(point) && point.length >= 2)
        .map((point) => [number(point[0]), number(point[1])]);
}

function roundPoint(point) {
    return [round(point?.[0], 2), round(point?.[1], 2)];
}

function projectBearing(x, y, distance, bearing) {
    const radians = bearing * Math.PI / 180;
    return [x + Math.sin(radians) * distance, y - Math.cos(radians) * distance];
}

function bearingDegrees(from, to) {
    const dx = number(to?.[0]) - number(from?.[0]);
    const dy = number(to?.[1]) - number(from?.[1]);
    if (Math.abs(dx) < 0.0001 && Math.abs(dy) < 0.0001) return 0;
    return round((Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360, 2);
}

function quantizeBearing(value, step) {
    return (Math.round(number(value) / step) * step + 360) % 360;
}

function bearingEdge(bearing) {
    const normalized = (number(bearing) + 360) % 360;
    if (normalized >= 315 || normalized < 45) return 'N';
    if (normalized < 135) return 'E';
    if (normalized < 225) return 'S';
    return 'W';
}

function pointDistance(left, right) {
    return Math.hypot(number(left?.[0]) - number(right?.[0]), number(left?.[1]) - number(right?.[1]));
}

function heightOf(cell) {
    return number(cell?.elevation ?? cell?.height);
}

function isLandCell(cell) {
    return cell?.terrain === 'land' || heightOf(cell) >= 20;
}

function roadWidth(kind) {
    if (kind === 'searoutes') return 3;
    if (kind === 'trails') return 1;
    return 2;
}

function waterWidthTiles(width) {
    return clamp(Math.round(1 + Math.sqrt(Math.max(0, number(width)))), 1, 6);
}

function waterIntensity(discharge) {
    return round(clamp(Math.log10(Math.max(1, number(discharge))) / 3, 0.1, 1), 3);
}

function normalizeColor(value) {
    const color = String(value || '').toLowerCase();
    return /^#[0-9a-f]{6}$/.test(color) ? color : '#7ecf9b';
}

function hashObject(value) {
    return createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 20);
}

function dedupeBy(values, keyOf) {
    const seen = new Set();
    return values.filter((value) => {
        const key = keyOf(value);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function sortByNumericId(values) {
    return [...(Array.isArray(values) ? values : [])].sort((a, b) => number(a.id) - number(b.id));
}

function nonNegativeInteger(value) {
    return Math.max(0, Math.floor(number(value)));
}

function number(value) {
    const candidate = Number(value);
    return Number.isFinite(candidate) ? candidate : 0;
}

function round(value, precision = 2) {
    const factor = 10 ** precision;
    return Math.round(number(value) * factor) / factor;
}

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

async function main(argv = process.argv.slice(2)) {
    const sourcePath = path.resolve(argv[0] || DEFAULT_SOURCE);
    const source = JSON.parse(await readFile(sourcePath, 'utf8'));
    const manifestPath = path.resolve(argv[1] || path.join(path.dirname(sourcePath), 'manifest.json'));
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    const themeValidation = validateManifestBurgThemes(manifest);
    if (!themeValidation.valid) {
        throw new Error(`Invalid burg theme manifest:\n${themeValidation.errors.map((error) => `- ${error}`).join('\n')}`);
    }
    const activeBurgIds = resolveActiveBurgIds(manifest);
    const compiled = compileWorldBlueprints(source, {
        burgThemeById: themeValidation.themeByBurgId,
        activeBurgIds
    });
    console.log(JSON.stringify({
        ok: compiled.coverage.unexplainedFields.length === 0 && compiled.coverage.withinByteLimit,
        source: sourcePath,
        generationVersion: compiled.generationVersion,
        blueprints: compiled.blueprints.length,
        clusters: compiled.clusters.length,
        seats: compiled.coverage.seatCount,
        fiefs: compiled.coverage.fiefCount,
        waterfalls: compiled.globalWater.waterfalls.length,
        blueprintBytes: compiled.coverage.blueprintBytes,
        byteLimit: compiled.coverage.byteLimit,
        unexplainedFields: compiled.coverage.unexplainedFields
    }, null, 2));
    if (!compiled.coverage.withinByteLimit || compiled.coverage.unexplainedFields.length) process.exitCode = 1;
}

function normalizeActiveBurgIds(value, burgs) {
    if (value === undefined || value === null) return null;
    if (!Array.isArray(value) && !(value instanceof Set)) {
        throw new Error('activeBurgIds must be an array or Set.');
    }
    const result = new Set([...value].map(Number));
    if (!result.size) throw new Error('activeBurgIds cannot be empty.');
    const sourceIds = new Set(burgs.map((burg) => number(burg.id)));
    const missing = [...result].filter((burgId) => !sourceIds.has(burgId));
    if (missing.length) {
        throw new Error(`activeBurgIds references unknown burgs: ${missing.join(', ')}.`);
    }
    return result;
}

function normalizeBurgThemeById(value, burgs, { allowExtraAssignments = false } = {}) {
    const source = value instanceof Map
        ? value
        : value && typeof value === 'object' && !Array.isArray(value)
            ? new Map(Object.entries(value).map(([burgId, themeId]) => [Number(burgId), themeId]))
            : new Map();
    const result = new Map();
    const errors = [];
    for (const burg of burgs) {
        const burgId = number(burg.id);
        const themeId = source.get(burgId) ?? source.get(String(burgId));
        if (!isBurgThemeId(themeId)) {
            errors.push(`burg ${burgId} must have a manifest-authoritative themeId.`);
            continue;
        }
        result.set(burgId, themeId);
    }
    const burgIds = new Set(burgs.map((burg) => number(burg.id)));
    for (const burgId of source.keys()) {
        if (!allowExtraAssignments && !burgIds.has(Number(burgId))) {
            errors.push(`theme mapping contains unknown burg ${String(burgId)}.`);
        }
    }
    if (errors.length) throw new Error(`Invalid burg theme mapping:\n${errors.map((error) => `- ${error}`).join('\n')}`);
    return result;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
    main().catch((error) => {
        console.error(error.stack || error.message || error);
        process.exitCode = 1;
    });
}
