import { isBurgThemeId } from './BurgThemeCatalog.js';

export const SETTLEMENT_BLUEPRINT_SCHEMA_VERSION = 2;
export const SETTLEMENT_BLUEPRINT_MAX_BYTES = 48 * 1024;
export const SETTLEMENT_HIERARCHIES = Object.freeze(['seat', 'fief']);
export const SETTLEMENT_DISTRICTS = Object.freeze([
    'castle',
    'civic',
    'market',
    'residential',
    'artisan',
    'harbor'
]);

export const SETTLEMENT_BLUEPRINT_SCHEMA = Object.freeze({
    schema: 'vibe-game-settlement-blueprints',
    schemaVersion: SETTLEMENT_BLUEPRINT_SCHEMA_VERSION,
    coordinateSpace: 'fmg-svg-pixels',
    wallRadiusUnits: 'local-tiles',
    gateBearingConvention: 'degrees-clockwise-from-north',
    requiredBlueprintFields: Object.freeze([
        'burgId',
        'x',
        'y',
        'anchorX',
        'anchorY',
        'clusterId',
        'hierarchy',
        'wallRings',
        'wards',
        'roads',
        'climate',
        'water',
        'districtDirectives'
    ])
});

export class SettlementBlueprintValidationError extends Error {
    constructor(errors) {
        super(`Invalid settlement blueprint payload:\n${errors.map((error) => `- ${error}`).join('\n')}`);
        this.name = 'SettlementBlueprintValidationError';
        this.code = 'INVALID_SETTLEMENT_BLUEPRINT';
        this.errors = errors;
    }
}

/** Validate one compiled burg blueprint, including strict no-unexplained-output fields. */
export function validateSettlementBlueprint(blueprint) {
    const errors = [];
    validateBlueprintShape(blueprint, errors, `blueprint[${blueprint?.burgId ?? '?'}]`);
    return { valid: errors.length === 0, errors };
}

export function assertSettlementBlueprint(blueprint) {
    const result = validateSettlementBlueprint(blueprint);
    if (!result.valid) throw new SettlementBlueprintValidationError(result.errors);
    return blueprint;
}

/** Validate the generated ACTIVE_SETTLEMENT_BLUEPRINTS object and cross-burg hierarchy. */
export function validateSettlementBlueprintSet(payload, options = {}) {
    const errors = [];
    const label = 'settlementBlueprints';
    if (!isRecord(payload)) {
        return { valid: false, errors: [`${label} must be an object.`] };
    }
    rejectUnknownKeys(payload, TOP_LEVEL_FIELDS, label, errors);
    if (payload.schema !== SETTLEMENT_BLUEPRINT_SCHEMA.schema) {
        errors.push(`${label}.schema must be ${SETTLEMENT_BLUEPRINT_SCHEMA.schema}.`);
    }
    if (payload.schemaVersion !== SETTLEMENT_BLUEPRINT_SCHEMA_VERSION) {
        errors.push(`${label}.schemaVersion must be ${SETTLEMENT_BLUEPRINT_SCHEMA_VERSION}.`);
    }
    if (payload.wallRadiusUnits !== 'local-tiles') {
        errors.push(`${label}.wallRadiusUnits must be local-tiles.`);
    }
    if (!Array.isArray(payload.blueprints)) {
        errors.push(`${label}.blueprints must be an array.`);
    } else {
        payload.blueprints.forEach((blueprint, index) => validateBlueprintShape(
            blueprint,
            errors,
            `${label}.blueprints[${index}]`
        ));
    }
    if (!Array.isArray(payload.clusters)) errors.push(`${label}.clusters must be an array.`);
    else payload.clusters.forEach((cluster, index) => validateClusterShape(cluster, errors, `${label}.clusters[${index}]`));
    validateGlobalWater(payload.globalWater, errors, `${label}.globalWater`);
    validateCoverage(payload.coverage, errors, `${label}.coverage`);
    validateHierarchy(payload, errors);

    const expectedCount = options.expectedCount ?? payload.coverage?.blueprintCount;
    if (Number.isInteger(expectedCount) && payload.blueprints?.length !== expectedCount) {
        errors.push(`${label}.blueprints must contain ${expectedCount} records.`);
    }
    const byteLimit = options.byteLimit ?? payload.coverage?.byteLimit ?? SETTLEMENT_BLUEPRINT_MAX_BYTES;
    const blueprintBytes = utf8ByteLength(JSON.stringify(payload.blueprints || []));
    if (blueprintBytes > byteLimit) {
        errors.push(`${label}.blueprints is ${blueprintBytes} bytes; limit is ${byteLimit}.`);
    }
    if (Number.isInteger(payload.coverage?.blueprintBytes) && payload.coverage.blueprintBytes !== blueprintBytes) {
        errors.push(`${label}.coverage.blueprintBytes does not match the serialized blueprint array.`);
    }
    return { valid: errors.length === 0, errors, blueprintBytes };
}

export const validateSettlementBlueprintCollection = validateSettlementBlueprintSet;
export const validateSettlementBlueprints = validateSettlementBlueprintSet;

export function assertSettlementBlueprintSet(payload, options = {}) {
    const result = validateSettlementBlueprintSet(payload, options);
    if (!result.valid) throw new SettlementBlueprintValidationError(result.errors);
    return payload;
}

export const assertSettlementBlueprintCollection = assertSettlementBlueprintSet;
export const assertSettlementBlueprints = assertSettlementBlueprintSet;

function validateBlueprintShape(blueprint, errors, path) {
    if (!isRecord(blueprint)) {
        errors.push(`${path} must be an object.`);
        return;
    }
    rejectUnknownKeys(blueprint, BLUEPRINT_FIELDS, path, errors);
    requireInteger(blueprint.burgId, `${path}.burgId`, errors, 1);
    requireString(blueprint.id, `${path}.id`, errors);
    requireString(blueprint.name, `${path}.name`, errors);
    requireFinite(blueprint.x, `${path}.x`, errors);
    requireFinite(blueprint.y, `${path}.y`, errors);
    requireFinite(blueprint.anchorX, `${path}.anchorX`, errors);
    requireFinite(blueprint.anchorY, `${path}.anchorY`, errors);
    requireInteger(blueprint.anchorCell, `${path}.anchorCell`, errors, 0);
    requirePositive(blueprint.tileScale, `${path}.tileScale`, errors);
    requireString(blueprint.clusterId, `${path}.clusterId`, errors);
    requireInteger(blueprint.tier, `${path}.tier`, errors, 1, 3);
    if (!SETTLEMENT_HIERARCHIES.includes(blueprint.hierarchy)) {
        errors.push(`${path}.hierarchy must be seat or fief.`);
    }
    requireIntegerArray(blueprint.seatOf, `${path}.seatOf`, errors);
    if (blueprint.hierarchy === 'seat' && blueprint.liegeBurgId !== null) {
        errors.push(`${path}.liegeBurgId must be null for a seat.`);
    }
    if (blueprint.hierarchy === 'fief') {
        requireInteger(blueprint.liegeBurgId, `${path}.liegeBurgId`, errors, 1);
        if (blueprint.seatOf?.length) errors.push(`${path}.seatOf must be empty for a fief.`);
    }
    validateBurgRecord(blueprint.burg, errors, `${path}.burg`);
    if (blueprint.burg?.flags?.walls !== (blueprint.hierarchy === 'seat')) {
        errors.push(`${path}.burg.flags.walls must reflect the compiled hierarchy (seat only).`);
    }
    validateWallRings(blueprint, errors, path);
    validateCastle(blueprint.castle, blueprint, errors, `${path}.castle`);
    validateWards(blueprint.wards, blueprint, errors, `${path}.wards`);
    validateRoads(blueprint.roads, blueprint, errors, `${path}.roads`);
    validateClimate(blueprint.climate, errors, `${path}.climate`);
    validateLocalWater(blueprint.water, errors, `${path}.water`);
    validateDistrictDirectives(blueprint.districtDirectives, errors, `${path}.districtDirectives`);
    validateInhibitors(blueprint.inhibitors, errors, `${path}.inhibitors`);
    validateIdentity(blueprint.identity, errors, `${path}.identity`);
    if (blueprint.identity?.architectureThemeId !== blueprint.burg?.themeId) {
        errors.push(`${path}.identity.architectureThemeId must match ${path}.burg.themeId.`);
    }
    validateRegion(blueprint.region, errors, `${path}.region`);
    validateLoreHooks(blueprint.loreHooks, errors, `${path}.loreHooks`);
    if (!/^[0-9a-f]{20}$/.test(String(blueprint.skeletonHash || ''))) {
        errors.push(`${path}.skeletonHash must be a 20-character lowercase hex hash.`);
    }
}

function validateBurgRecord(burg, errors, path) {
    if (!isRecord(burg)) {
        errors.push(`${path} must be an object.`);
        return;
    }
    rejectUnknownKeys(burg, BURG_FIELDS, path, errors);
    requireString(burg.group, `${path}.group`, errors);
    requirePositive(burg.population, `${path}.population`, errors);
    requireInteger(burg.state, `${path}.state`, errors, 0);
    requireInteger(burg.culture, `${path}.culture`, errors, 0);
    if (!isBurgThemeId(burg.themeId)) errors.push(`${path}.themeId must be a canonical burg theme ID.`);
    requireInteger(burg.cell, `${path}.cell`, errors, 0);
    requireInteger(burg.feature, `${path}.feature`, errors, 0);
    if (!isRecord(burg.flags)) errors.push(`${path}.flags must be an object.`);
    else {
        rejectUnknownKeys(burg.flags, FLAG_FIELDS, `${path}.flags`, errors);
        for (const field of FLAG_FIELDS) {
            if (typeof burg.flags[field] !== 'boolean') errors.push(`${path}.flags.${field} must be boolean.`);
        }
    }
}

function validateWallRings(blueprint, errors, path) {
    if (!Array.isArray(blueprint.wallRings)) {
        errors.push(`${path}.wallRings must be an array.`);
        return;
    }
    if (blueprint.hierarchy === 'fief' && blueprint.wallRings.length !== 0) {
        errors.push(`${path} is a fief and cannot contain wall rings.`);
    }
    if (blueprint.hierarchy === 'seat' && blueprint.wallRings.length === 0) {
        errors.push(`${path} is a seat and must contain at least one wall ring.`);
    }
    if (blueprint.hierarchy === 'seat' && blueprint.burg?.flags?.capital && blueprint.wallRings.length !== 3) {
        errors.push(`${path} is a capital seat and must contain three wall rings.`);
    }
    let previousRadius = Infinity;
    let alignedGateBearings = null;
    blueprint.wallRings.forEach((ring, index) => {
        const ringPath = `${path}.wallRings[${index}]`;
        if (!isRecord(ring)) {
            errors.push(`${ringPath} must be an object.`);
            return;
        }
        rejectUnknownKeys(ring, WALL_RING_FIELDS, ringPath, errors);
        if (ring.ring !== index) errors.push(`${ringPath}.ring must equal its outer-to-inner index ${index}.`);
        requirePositive(ring.radius, `${ringPath}.radius`, errors);
        requirePositive(ring.thickness, `${ringPath}.thickness`, errors);
        requirePositive(ring.heightVoxels, `${ringPath}.heightVoxels`, errors);
        if (ring.radius >= previousRadius) errors.push(`${ringPath}.radius must be smaller than the previous outer ring.`);
        previousRadius = ring.radius;
        if (!Array.isArray(ring.gates) || ring.gates.length === 0) errors.push(`${ringPath}.gates must be non-empty.`);
        else {
            const bearings = ring.gates.map((gate, gateIndex) => {
                validateGate(gate, errors, `${ringPath}.gates[${gateIndex}]`);
                return gate?.bearing;
            });
            if (alignedGateBearings && JSON.stringify(bearings) !== JSON.stringify(alignedGateBearings)) {
                errors.push(`${ringPath}.gates must align bearing-for-bearing with the outer ring.`);
            }
            alignedGateBearings ||= bearings;
        }
    });
}

function validateGate(gate, errors, path) {
    if (!isRecord(gate)) {
        errors.push(`${path} must be an object.`);
        return;
    }
    rejectUnknownKeys(gate, GATE_FIELDS, path, errors);
    requireBearing(gate.bearing, `${path}.bearing`, errors);
    if (!['N', 'E', 'S', 'W'].includes(gate.edge)) errors.push(`${path}.edge must be N, E, S or W.`);
    if (typeof gate.grand !== 'boolean') errors.push(`${path}.grand must be boolean.`);
    requireNullableInteger(gate.towardRoute, `${path}.towardRoute`, errors);
    requireNullableInteger(gate.towardFief, `${path}.towardFief`, errors);
}

function validateCastle(castle, blueprint, errors, path) {
    if (castle === null) {
        if (blueprint.hierarchy === 'seat' && (blueprint.burg?.flags?.capital || blueprint.burg?.flags?.citadel)) {
            errors.push(`${path} is required for a capital/citadel seat.`);
        }
        return;
    }
    if (!isRecord(castle)) {
        errors.push(`${path} must be null or an object.`);
        return;
    }
    rejectUnknownKeys(castle, CASTLE_FIELDS, path, errors);
    if (castle.ward !== blueprint.wallRings.length - 1) errors.push(`${path}.ward must be the innermost ring.`);
    if (!isRecord(castle.size)) errors.push(`${path}.size must be an object.`);
    else {
        rejectUnknownKeys(castle.size, CASTLE_SIZE_FIELDS, `${path}.size`, errors);
        requirePositive(castle.size.widthTiles, `${path}.size.widthTiles`, errors);
        requirePositive(castle.size.depthTiles, `${path}.size.depthTiles`, errors);
    }
    requirePositive(castle.keepHeight, `${path}.keepHeight`, errors);
    requireBearing(castle.gateBearing, `${path}.gateBearing`, errors);
}

function validateWards(wards, blueprint, errors, path) {
    if (!Array.isArray(wards) || wards.length === 0) {
        errors.push(`${path} must be a non-empty array.`);
        return;
    }
    if (blueprint.hierarchy === 'seat' && wards.length !== blueprint.wallRings.length) {
        errors.push(`${path} must contain one ward per wall-ring interior/annulus.`);
    }
    wards.forEach((ward, index) => {
        const wardPath = `${path}[${index}]`;
        if (!isRecord(ward)) {
            errors.push(`${wardPath} must be an object.`);
            return;
        }
        rejectUnknownKeys(ward, WARD_FIELDS, wardPath, errors);
        requireInteger(ward.ring, `${wardPath}.ring`, errors, 0);
        requireFinite(ward.innerRadius, `${wardPath}.innerRadius`, errors, 0);
        requirePositive(ward.outerRadius, `${wardPath}.outerRadius`, errors);
        if (ward.innerRadius >= ward.outerRadius) errors.push(`${wardPath} must have innerRadius < outerRadius.`);
        if (!SETTLEMENT_DISTRICTS.includes(ward.district)) errors.push(`${wardPath}.district is unsupported.`);
        if (!isRecord(ward.wfcPriors)) errors.push(`${wardPath}.wfcPriors must be an object.`);
        else {
            rejectUnknownKeys(ward.wfcPriors, WFC_PRIOR_FIELDS, `${wardPath}.wfcPriors`, errors);
            requireUnitInterval(ward.wfcPriors.buildingDensity, `${wardPath}.wfcPriors.buildingDensity`, errors);
            requireUnitInterval(ward.wfcPriors.elevationVariance, `${wardPath}.wfcPriors.elevationVariance`, errors);
            if (!isRecord(ward.wfcPriors.archetypeWeights) || Object.keys(ward.wfcPriors.archetypeWeights).length === 0) {
                errors.push(`${wardPath}.wfcPriors.archetypeWeights must be a non-empty object.`);
            } else {
                for (const [archetype, weight] of Object.entries(ward.wfcPriors.archetypeWeights)) {
                    if (!archetype || !Number.isFinite(weight) || weight < 0) {
                        errors.push(`${wardPath}.wfcPriors.archetypeWeights.${archetype} must be non-negative.`);
                    }
                }
            }
        }
    });
}

function validateRoads(roads, blueprint, errors, path) {
    if (!Array.isArray(roads)) {
        errors.push(`${path} must be an array.`);
        return;
    }
    roads.forEach((road, index) => {
        const roadPath = `${path}[${index}]`;
        if (!isRecord(road)) {
            errors.push(`${roadPath} must be an object.`);
            return;
        }
        rejectUnknownKeys(road, ROAD_FIELDS, roadPath, errors);
        requireString(road.id, `${roadPath}.id`, errors);
        requireNullableInteger(road.routeId, `${roadPath}.routeId`, errors);
        requireString(road.kind, `${roadPath}.kind`, errors);
        requirePositive(road.widthTiles, `${roadPath}.widthTiles`, errors);
        requireBearing(road.gateBearing, `${roadPath}.gateBearing`, errors);
        if (road.seatGateBearing !== undefined) requireBearing(road.seatGateBearing, `${roadPath}.seatGateBearing`, errors);
        if (road.toBurgId !== undefined) requireInteger(road.toBurgId, `${roadPath}.toBurgId`, errors, 1);
        if (!Array.isArray(road.points) || road.points.length < 2) errors.push(`${roadPath}.points must contain at least two coordinates.`);
        else road.points.forEach((point, pointIndex) => validatePoint(point, errors, `${roadPath}.points[${pointIndex}]`));
    });
    if (blueprint.hierarchy === 'fief' && !roads.some((road) => (
        road.kind === 'fief-link' && road.toBurgId === blueprint.liegeBurgId
    ))) {
        errors.push(`${path} must include a fief-link road reaching liege burg ${blueprint.liegeBurgId}.`);
    }
}

function validateClimate(climate, errors, path) {
    validateStrictRecord(climate, CLIMATE_FIELDS, path, errors);
    if (!isRecord(climate)) return;
    requireFinite(climate.longitude, `${path}.longitude`, errors);
    requireFinite(climate.latitude, `${path}.latitude`, errors);
    requireFinite(climate.temperature, `${path}.temperature`, errors);
    requireFinite(climate.snowline, `${path}.snowline`, errors);
    requireString(climate.biome, `${path}.biome`, errors, true);
}

function validateLocalWater(water, errors, path) {
    validateStrictRecord(water, LOCAL_WATER_FIELDS, path, errors);
    if (!isRecord(water)) return;
    requireIntegerArray(water.riverIds, `${path}.riverIds`, errors);
    requireStringArray(water.fords, `${path}.fords`, errors);
    requireStringArray(water.bridges, `${path}.bridges`, errors);
    requireStringArray(water.waterfalls, `${path}.waterfalls`, errors);
    if (water.shoreBearing !== null) requireBearing(water.shoreBearing, `${path}.shoreBearing`, errors);
}

function validateDistrictDirectives(directives, errors, path) {
    validateStrictRecord(directives, DISTRICT_DIRECTIVE_FIELDS, path, errors);
    if (!isRecord(directives)) return;
    validateEnabledObject(directives.docks, DOCK_FIELDS, `${path}.docks`, errors);
    if (isRecord(directives.docks)) {
        if (directives.docks.bearing !== null) requireBearing(directives.docks.bearing, `${path}.docks.bearing`, errors);
        requireFinite(directives.docks.minimumLengthTiles, `${path}.docks.minimumLengthTiles`, errors, 0);
    }
    validateEnabledObject(directives.plaza, PLAZA_FIELDS, `${path}.plaza`, errors);
    if (isRecord(directives.plaza)) requireFinite(directives.plaza.radiusTiles, `${path}.plaza.radiusTiles`, errors, 0);
    validateEnabledObject(directives.temple, TEMPLE_FIELDS, `${path}.temple`, errors);
    if (isRecord(directives.temple)) requireNullableInteger(directives.temple.religionId, `${path}.temple.religionId`, errors);
    validateStrictRecord(directives.watchtowers, WATCHTOWER_FIELDS, `${path}.watchtowers`, errors);
    if (isRecord(directives.watchtowers)) requireInteger(directives.watchtowers.count, `${path}.watchtowers.count`, errors, 0);
    validateEnabledObject(directives.signpost, SIGNPOST_FIELDS, `${path}.signpost`, errors);
    if (isRecord(directives.signpost)) requireStringArray(directives.signpost.destinations, `${path}.signpost.destinations`, errors);
}

function validateInhibitors(inhibitors, errors, path) {
    validateStrictRecord(inhibitors, INHIBITOR_FIELDS, path, errors);
    if (!isRecord(inhibitors)) return;
    for (const field of INHIBITOR_FIELDS) requireFinite(inhibitors[field], `${path}.${field}`, errors, 0);
    requireUnitInterval(inhibitors.chaosCap, `${path}.chaosCap`, errors);
}

function validateIdentity(identity, errors, path) {
    validateStrictRecord(identity, IDENTITY_FIELDS, path, errors);
    if (!isRecord(identity)) return;
    for (const field of ['stateName', 'stateForm', 'stateColor', 'cultureName', 'cultureType', 'cultureColor', 'religionName']) {
        requireString(identity[field], `${path}.${field}`, errors, true);
    }
    if (!isBurgThemeId(identity.architectureThemeId)) {
        errors.push(`${path}.architectureThemeId must be a canonical burg theme ID.`);
    }
    requireNullableInteger(identity.religionId, `${path}.religionId`, errors);
    requireNullableInteger(identity.provinceId, `${path}.provinceId`, errors);
}

function validateRegion(region, errors, path) {
    if (region === null) return;
    validateStrictRecord(region, REGION_FIELDS, path, errors);
    if (!isRecord(region)) return;
    requireInteger(region.id, `${path}.id`, errors, 1);
    requireString(region.name, `${path}.name`, errors);
    requireString(region.fullName, `${path}.fullName`, errors);
    requireString(region.color, `${path}.color`, errors);
}

function validateLoreHooks(hooks, errors, path) {
    if (!Array.isArray(hooks)) {
        errors.push(`${path} must be an array.`);
        return;
    }
    hooks.forEach((hook, index) => {
        const hookPath = `${path}[${index}]`;
        validateStrictRecord(hook, LORE_FIELDS, hookPath, errors);
        if (!isRecord(hook)) return;
        requireString(hook.id, `${hookPath}.id`, errors);
        requireString(hook.title, `${hookPath}.title`, errors);
        requireString(hook.summary, `${hookPath}.summary`, errors, true);
        if (!/^[0-9a-f]{12}$/.test(String(hook.sourceHash || ''))) errors.push(`${hookPath}.sourceHash must be a 12-character hex hash.`);
    });
}

function validateClusterShape(cluster, errors, path) {
    validateStrictRecord(cluster, CLUSTER_FIELDS, path, errors);
    if (!isRecord(cluster)) return;
    requireString(cluster.id, `${path}.id`, errors);
    requireInteger(cluster.state, `${path}.state`, errors, 0);
    requireString(cluster.stateName, `${path}.stateName`, errors, true);
    requireInteger(cluster.seatBurgId, `${path}.seatBurgId`, errors, 1);
    requireIntegerArray(cluster.memberBurgIds, `${path}.memberBurgIds`, errors);
    requireIntegerArray(cluster.fiefBurgIds, `${path}.fiefBurgIds`, errors);
    requireStringArray(cluster.roadIds, `${path}.roadIds`, errors);
    requireFinite(cluster.anchorX, `${path}.anchorX`, errors);
    requireFinite(cluster.anchorY, `${path}.anchorY`, errors);
}

function validateGlobalWater(water, errors, path) {
    validateStrictRecord(water, GLOBAL_WATER_FIELDS, path, errors);
    if (!isRecord(water)) return;
    if (!Array.isArray(water.rivers)) errors.push(`${path}.rivers must be an array.`);
    else water.rivers.forEach((river, index) => validateSimpleDirective(river, GLOBAL_RIVER_FIELDS, errors, `${path}.rivers[${index}]`));
    if (!Array.isArray(water.crossings)) errors.push(`${path}.crossings must be an array.`);
    else water.crossings.forEach((crossing, index) => validateSimpleDirective(crossing, CROSSING_FIELDS, errors, `${path}.crossings[${index}]`));
    if (!Array.isArray(water.waterfalls)) errors.push(`${path}.waterfalls must be an array.`);
    else water.waterfalls.forEach((waterfall, index) => validateSimpleDirective(waterfall, WATERFALL_FIELDS, errors, `${path}.waterfalls[${index}]`));
}

function validateCoverage(coverage, errors, path) {
    validateStrictRecord(coverage, COVERAGE_FIELDS, path, errors);
    if (!isRecord(coverage)) return;
    for (const field of ['inputFieldCount', 'consumedFieldCount', 'ignoredFieldCount', 'blueprintCount', 'clusterCount', 'seatCount', 'fiefCount', 'blueprintBytes', 'byteLimit']) {
        requireInteger(coverage[field], `${path}.${field}`, errors, 0);
    }
    requireStringArray(coverage.consumedFields, `${path}.consumedFields`, errors);
    if (!Array.isArray(coverage.ignoredFields)) errors.push(`${path}.ignoredFields must be an array.`);
    if (!Array.isArray(coverage.unexplainedFields)) errors.push(`${path}.unexplainedFields must be an array.`);
    else if (coverage.unexplainedFields.length) errors.push(`${path}.unexplainedFields must be empty.`);
    if (coverage.withinByteLimit !== true) errors.push(`${path}.withinByteLimit must be true.`);
}

function validateHierarchy(payload, errors) {
    if (!Array.isArray(payload.blueprints) || !Array.isArray(payload.clusters)) return;
    const blueprintsById = new Map(payload.blueprints.map((blueprint) => [blueprint.burgId, blueprint]));
    const clusterIds = new Set(payload.clusters.map((cluster) => cluster.id));
    for (const blueprint of payload.blueprints) {
        if (!clusterIds.has(blueprint.clusterId)) errors.push(`Burg ${blueprint.burgId} references missing cluster ${blueprint.clusterId}.`);
    }
    for (const cluster of payload.clusters) {
        const members = (cluster.memberBurgIds || []).map((burgId) => blueprintsById.get(burgId)).filter(Boolean);
        const seats = members.filter((blueprint) => blueprint.hierarchy === 'seat');
        if (seats.length !== 1) errors.push(`Cluster ${cluster.id} must contain exactly one seat; found ${seats.length}.`);
        if (seats[0]?.burgId !== cluster.seatBurgId) errors.push(`Cluster ${cluster.id} seatBurgId does not match its seat blueprint.`);
        for (const fiefId of cluster.fiefBurgIds || []) {
            const fief = blueprintsById.get(fiefId);
            if (!fief || fief.hierarchy !== 'fief' || fief.liegeBurgId !== cluster.seatBurgId) {
                errors.push(`Cluster ${cluster.id} has invalid fief ${fiefId}.`);
                continue;
            }
            const roadId = `fief-${fiefId}-to-seat-${cluster.seatBurgId}`;
            const seat = seats[0];
            if (!fief.roads.some((road) => road.id === roadId && road.toBurgId === cluster.seatBurgId)) {
                errors.push(`Fief ${fiefId} lacks compiled road ${roadId} to its seat.`);
            }
            if (!seat?.roads.some((road) => road.id === roadId && road.toBurgId === fiefId)) {
                errors.push(`Seat ${cluster.seatBurgId} lacks reciprocal road ${roadId} to fief ${fiefId}.`);
            }
            const seatRoad = seat?.roads.find((road) => road.id === roadId && road.toBurgId === fiefId);
            const gateBearings = new Set(seat?.wallRings?.[0]?.gates?.map((gate) => gate.bearing) || []);
            if (seatRoad && !gateBearings.has(seatRoad.seatGateBearing)) {
                errors.push(`Fief road ${roadId} does not terminate at a compiled seat gate.`);
            }
        }
    }
}

function validateSimpleDirective(value, fields, errors, path) {
    validateStrictRecord(value, fields, path, errors);
}

function validateEnabledObject(value, fields, path, errors) {
    validateStrictRecord(value, fields, path, errors);
    if (isRecord(value) && typeof value.enabled !== 'boolean') errors.push(`${path}.enabled must be boolean.`);
}

function validatePoint(point, errors, path) {
    if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite)) {
        errors.push(`${path} must be a finite [x, y] coordinate.`);
    }
}

function validateStrictRecord(value, fields, path, errors) {
    if (!isRecord(value)) {
        errors.push(`${path} must be an object.`);
        return;
    }
    rejectUnknownKeys(value, fields, path, errors);
}

function rejectUnknownKeys(value, allowed, path, errors) {
    for (const field of Object.keys(value)) {
        if (!allowed.includes(field)) errors.push(`${path}.${field} is unexplained by the schema.`);
    }
}

function requireString(value, path, errors, allowEmpty = false) {
    if (typeof value !== 'string' || (!allowEmpty && value.length === 0)) errors.push(`${path} must be ${allowEmpty ? 'a string' : 'a non-empty string'}.`);
}

function requireFinite(value, path, errors, minimum = -Infinity) {
    if (!Number.isFinite(value) || value < minimum) errors.push(`${path} must be a finite number >= ${minimum}.`);
}

function requirePositive(value, path, errors) {
    if (!Number.isFinite(value) || value <= 0) errors.push(`${path} must be a positive number.`);
}

function requireInteger(value, path, errors, minimum = -Infinity, maximum = Infinity) {
    if (!Number.isInteger(value) || value < minimum || value > maximum) errors.push(`${path} must be an integer from ${minimum} to ${maximum}.`);
}

function requireNullableInteger(value, path, errors) {
    if (value !== null && !Number.isInteger(value)) errors.push(`${path} must be null or an integer.`);
}

function requireBearing(value, path, errors) {
    if (!Number.isFinite(value) || value < 0 || value >= 360) errors.push(`${path} must be degrees clockwise from north in [0, 360).`);
}

function requireUnitInterval(value, path, errors) {
    if (!Number.isFinite(value) || value < 0 || value > 1) errors.push(`${path} must be in [0, 1].`);
}

function requireIntegerArray(value, path, errors) {
    if (!Array.isArray(value) || !value.every(Number.isInteger)) errors.push(`${path} must be an integer array.`);
}

function requireStringArray(value, path, errors) {
    if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) errors.push(`${path} must be a string array.`);
}

function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function utf8ByteLength(value) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(value).length;
    return unescape(encodeURIComponent(value)).length;
}

const TOP_LEVEL_FIELDS = ['schema', 'schemaVersion', 'generationVersion', 'coordinateSpace', 'wallRadiusUnits', 'blueprints', 'clusters', 'globalWater', 'coverage'];
const BLUEPRINT_FIELDS = ['id', 'burgId', 'name', 'x', 'y', 'anchorX', 'anchorY', 'anchorCell', 'tileScale', 'clusterId', 'tier', 'hierarchy', 'seatOf', 'liegeBurgId', 'burg', 'wallRings', 'castle', 'wards', 'roads', 'climate', 'water', 'districtDirectives', 'inhibitors', 'identity', 'region', 'loreHooks', 'skeletonHash'];
const BURG_FIELDS = ['group', 'population', 'state', 'culture', 'themeId', 'cell', 'feature', 'flags'];
const FLAG_FIELDS = ['capital', 'port', 'citadel', 'plaza', 'walls', 'temple'];
const WALL_RING_FIELDS = ['ring', 'radius', 'thickness', 'heightVoxels', 'gates'];
const GATE_FIELDS = ['bearing', 'towardRoute', 'towardFief', 'grand', 'edge'];
const CASTLE_FIELDS = ['ward', 'size', 'keepHeight', 'gateBearing'];
const CASTLE_SIZE_FIELDS = ['widthTiles', 'depthTiles'];
const WARD_FIELDS = ['ring', 'innerRadius', 'outerRadius', 'district', 'wfcPriors'];
const WFC_PRIOR_FIELDS = ['buildingDensity', 'archetypeWeights', 'elevationVariance'];
const ROAD_FIELDS = ['id', 'routeId', 'kind', 'widthTiles', 'gateBearing', 'seatGateBearing', 'toBurgId', 'points'];
const CLIMATE_FIELDS = ['longitude', 'latitude', 'temperature', 'snowline', 'biome'];
const LOCAL_WATER_FIELDS = ['riverIds', 'fords', 'bridges', 'waterfalls', 'shoreBearing'];
const DISTRICT_DIRECTIVE_FIELDS = ['docks', 'plaza', 'temple', 'watchtowers', 'signpost'];
const DOCK_FIELDS = ['enabled', 'bearing', 'minimumLengthTiles'];
const PLAZA_FIELDS = ['enabled', 'radiusTiles'];
const TEMPLE_FIELDS = ['enabled', 'religionId'];
const WATCHTOWER_FIELDS = ['count'];
const SIGNPOST_FIELDS = ['enabled', 'destinations'];
const INHIBITOR_FIELDS = ['gridWidth', 'gridHeight', 'maxFloors', 'buildingHint', 'roomHint', 'streetIntensity', 'wallEvidence', 'farmHint', 'decorBudget', 'chaosCap'];
const IDENTITY_FIELDS = ['stateName', 'stateForm', 'stateColor', 'cultureName', 'cultureType', 'cultureColor', 'architectureThemeId', 'religionId', 'religionName', 'provinceId'];
const REGION_FIELDS = ['id', 'name', 'fullName', 'color'];
const LORE_FIELDS = ['id', 'title', 'summary', 'sourceHash'];
const CLUSTER_FIELDS = ['id', 'state', 'stateName', 'seatBurgId', 'memberBurgIds', 'fiefBurgIds', 'roadIds', 'anchorX', 'anchorY'];
const GLOBAL_WATER_FIELDS = ['rivers', 'crossings', 'waterfalls'];
const GLOBAL_RIVER_FIELDS = ['id', 'widthTiles', 'intensity', 'sourceCell', 'mouthCell'];
const CROSSING_FIELDS = ['id', 'kind', 'routeId', 'riverId', 'x', 'y', 'widthTiles'];
const WATERFALL_FIELDS = ['id', 'riverId', 'x', 'y', 'sourceCell', 'targetCell', 'dropTiers', 'widthTiles', 'intensity', 'bearing', 'plungePool', 'walkableOutflow'];
const COVERAGE_FIELDS = ['sourceSchemaVersion', 'inputFieldCount', 'consumedFieldCount', 'ignoredFieldCount', 'consumedFields', 'ignoredFields', 'unexplainedFields', 'blueprintCount', 'clusterCount', 'seatCount', 'fiefCount', 'blueprintBytes', 'byteLimit', 'withinByteLimit'];
