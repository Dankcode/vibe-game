// Settlement-blueprint projection shared by the terrain and building waves.
//
// FMG geography is compiled offline into immutable settlement blueprints. Runtime code only
// projects those directives into the current view; population, wall tiers, hierarchy and gate
// intent are never invented here.

import { getActiveTownVector, projectTownVector } from './TownVectorData.js';

const FIXED_LAND_KINDS = new Set(['wall', 'gate', 'road', 'castle-plot', 'bridge', 'dock']);
const FIXED_WATER_KINDS = new Set(['waterfall', 'plunge-pool', 'ford']);
const SKELETON_PRIORITY = Object.freeze({
    road: 1,
    dock: 2,
    'castle-plot': 3,
    wall: 4,
    gate: 5,
    waterfall: 6,
    'plunge-pool': 7,
    bridge: 8,
    ford: 8
});

export function createSettlementConstraintAnchors({
    blueprints = [],
    burgs = [],
    centerX = 0,
    centerY = 0,
    width = 80,
    height = 60,
    sampleScale = 1,
    maxSettlements = 8
} = {}) {
    const blueprintPackage = Array.isArray(blueprints) ? null : blueprints;
    const source = Array.isArray(blueprints) ? blueprints : blueprints?.blueprints;
    const records = Array.isArray(source) ? source.filter(Boolean) : [];
    if (!records.length) return [];

    const burgById = new Map((burgs || []).map((burg) => [Number(burg.id), burg]));
    const nearest = records
        .map((blueprint) => ({
            blueprint,
            distance: Math.hypot(
                blueprintWorldX(blueprint) - Number(centerX || 0),
                blueprintWorldY(blueprint) - Number(centerY || 0)
            )
        }))
        .sort((left, right) => left.distance - right.distance ||
            Number(left.blueprint.burgId || 0) - Number(right.blueprint.burgId || 0))[0];
    if (!nearest) return [];

    const activeClusterId = nearest.blueprint.clusterId ?? `burg-${nearest.blueprint.burgId}`;
    const primaryBurgId = Number(nearest.blueprint.burgId);
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const scale = Math.max(0.01, Number(sampleScale) || 1);
    return records
        .filter((blueprint) => (blueprint.clusterId ?? `burg-${blueprint.burgId}`) === activeClusterId)
        .map((blueprint) => {
            const runtimeBlueprint = resolveBlueprintDirectives(blueprint, blueprintPackage?.globalWater);
            const col = Math.round((blueprintWorldX(blueprint) - centerX) / scale + offsetX);
            const row = Math.round((blueprintWorldY(blueprint) - centerY) / scale + offsetY);
            // Test visibility against the un-clamped projected span. Clamping first turns a
            // distant same-cluster town into a one-cell "ghost" pinned to a viewport edge.
            if (!projectedSettlementIntersectsViewport(
                runtimeBlueprint,
                col,
                row,
                width,
                height,
                0
            )) return null;
            const projectedRings = projectWallRings(blueprint.wallRings, col, row, width, height);
            const outerRing = projectedRings[0] || null;
            // Only the nearest burg owns the active FMG town-vector projection. Same-cluster
            // satellites retain their compiled procedural rings so one source plan cannot be
            // duplicated across the whole view.
            const sourceTownVector = Number(blueprint.burgId) === primaryBurgId
                ? getActiveTownVector(blueprint.burgId)
                : null;
            const projectedTownVector = sourceTownVector
                ? projectTownVector(sourceTownVector, {
                    centerCol: col,
                    centerRow: row,
                    width,
                    height,
                    margin: 2,
                    maximumScale: 1
                })
                : null;
            const hasVectorWalls = Boolean(projectedTownVector?.wallCells?.length);
            const hasVectorInterior = Boolean(projectedTownVector?.insideCellKeys?.size);
            const vectorWallBounds = hasVectorInterior
                ? createVectorWallBounds(projectedTownVector)
                : null;
            const vectorCoverageBounds = projectedTownVector
                ? createVectorCoverageBounds(projectedTownVector)
                : null;
            const fallbackRadius = Math.floor(Number(
                outerRing?.radius ?? runtimeBlueprint.urbanRadius ?? runtimeBlueprint.radius ?? 8
            ) || 8);
            const radius = vectorWallBounds
                ? Math.max(5, Math.ceil(Math.max(vectorWallBounds.width, vectorWallBounds.height) / 2))
                : Math.max(5, fallbackRadius);
            const urbanBounds = vectorWallBounds || vectorCoverageBounds || outerRing?.bounds || createWallBounds(col, row, {
                halfWidth: radius,
                halfHeight: Math.max(4, Math.round(radius * 0.82))
            }, width, height);
            const sourceBurg = burgById.get(Number(blueprint.burgId));
            const burg = sourceBurg || {
                id: Number(blueprint.burgId),
                name: blueprint.name,
                x: blueprint.x,
                y: blueprint.y,
                population: blueprint.population,
                state: blueprint.stateId ?? blueprint.state,
                culture: blueprint.cultureId ?? blueprint.culture,
                flags: { ...(blueprint.flags || {}) }
            };
            const walled = hasVectorWalls ||
                (runtimeBlueprint.hierarchy === 'seat' && projectedRings.length > 0);
            return {
                burg,
                blueprint: runtimeBlueprint,
                clusterId: activeClusterId,
                col,
                row,
                radius,
                walled,
                wallRings: projectedRings,
                wallBounds: urbanBounds,
                townVector: projectedTownVector,
                wards: projectWards(blueprint.wards, projectedRings, urbanBounds),
                castle: projectCastle(blueprint.castle, col, row, width, height)
            };
        })
        .filter(Boolean)
        .sort((left, right) =>
            hierarchyRank(left.blueprint?.hierarchy) - hierarchyRank(right.blueprint?.hierarchy) ||
            Math.hypot(left.col - offsetX, left.row - offsetY) - Math.hypot(right.col - offsetX, right.row - offsetY) ||
            Number(left.burg.id || 0) - Number(right.burg.id || 0))
        .slice(0, Math.max(0, Math.floor(maxSettlements)));
}

function projectedSettlementIntersectsViewport(blueprint, col, row, width, height, margin) {
    const rings = Array.isArray(blueprint?.wallRings) ? blueprint.wallRings : [];
    const fallbackRadius = Math.max(5, Math.floor(Number(
        blueprint?.urbanRadius ?? blueprint?.radius ?? 8
    ) || 8));
    const halfWidth = Math.max(
        fallbackRadius,
        ...rings.map((ring) => Math.max(3, Math.floor(Number(
            ring?.radiusTiles ?? ring?.radiusXTiles ?? ring?.radiusX ?? ring?.radius ?? 3
        ) || 3)))
    );
    const halfHeight = Math.max(
        Math.max(4, Math.round(fallbackRadius * 0.82)),
        ...rings.map((ring) => {
            const ringRadius = Math.max(3, Math.floor(Number(
                ring?.radiusTiles ?? ring?.radius ?? 3
            ) || 3));
            return Math.max(3, Math.floor(Number(
                ring?.radiusYTiles ?? ring?.radiusY ?? ringRadius * 0.82
            ) || ringRadius * 0.82));
        })
    );
    const safeMargin = Math.max(0, Math.floor(Number(margin) || 0));
    return col + halfWidth >= -safeMargin &&
        row + halfHeight >= -safeMargin &&
        col - halfWidth < width + safeMargin &&
        row - halfHeight < height + safeMargin;
}

export function createBlueprintSkeleton({ settlements = [], width = 0, height = 0, sampleScale = 1 } = {}) {
    const cells = new Map();
    const settlementByBurgId = new Map(settlements.map((entry) => [Number(entry.burg?.id), entry]));
    const put = (col, row, value) => {
        if (col < 0 || row < 0 || col >= width || row >= height) return;
        const id = row * width + col;
        const current = cells.get(id);
        if (current && (SKELETON_PRIORITY[current.kind] || 0) > (SKELETON_PRIORITY[value.kind] || 0)) return;
        cells.set(id, Object.freeze({ id, col, row, fixed: true, ...value }));
    };

    for (const settlement of settlements) {
        const townId = Number(settlement.burg?.id);
        const vectorWalls = settlement.townVector?.wallCells || [];
        const hasVectorWalls = vectorWalls.length > 0;
        const vectorGates = hasVectorWalls
            ? (settlement.townVector?.gateCells || []).map((gate, index) => ({
                ...gate,
                id: `vector-gate-${index}`,
                edge: edgeForProjectedGate(settlement, gate),
                widthTiles: 1
            }))
            : [];

        if (hasVectorWalls) {
            for (const cell of vectorWalls) {
                put(cell.col, cell.row, {
                    kind: 'wall',
                    townId,
                    ring: 'vector',
                    vectorHash: settlement.townVector.vectorHash,
                    heightVoxels: settlement.townVector.wallHeightVoxels,
                    thickness: settlement.townVector.walkwayWidth
                });
            }
            for (const gate of vectorGates) {
                put(gate.col, gate.row, {
                    kind: 'gate',
                    townId,
                    ring: 'vector',
                    edge: gate.edge,
                    grand: false,
                    widthTiles: gate.widthTiles,
                    vectorHash: settlement.townVector.vectorHash
                });
            }
        } else {
            for (const ring of settlement.wallRings || []) {
                // Wall silhouettes are collapsed per town+ring instead of always rasterizing the
                // bounding rectangle (the "every city has the same square wall" defect). A seeded
                // superellipse family spans ellipse → squircle → chamfered near-rect with a mild
                // axis stretch, so each settlement ring reads differently while blueprint bounds,
                // thickness, height, and validation stay untouched. Gates snap to the new outline.
                const shape = wallRingShape(townId, ring.ring);
                const ringCells = [];
                forEachShapedBoundaryCell(ring.bounds, ring.thickness, shape, (col, row) => {
                    ringCells.push([col, row]);
                    put(col, row, {
                        kind: 'wall',
                        townId,
                        ring: ring.ring,
                        heightVoxels: ring.heightVoxels,
                        thickness: ring.thickness
                    });
                });
                for (const gate of ring.gates || []) {
                    for (const cell of gate.cells || [gate]) {
                        const snapped = snapToRingOutline(ringCells, cell.col, cell.row);
                        if (!snapped) continue;
                        const inward = inwardDirectionForEdge(gate.edge);
                        for (let depth = -1; depth <= ring.thickness; depth++) {
                            put(snapped[0] + inward.x * depth, snapped[1] + inward.y * depth, {
                                kind: 'gate', townId, ring: ring.ring, edge: gate.edge,
                                grand: gate.grand === true, widthTiles: gate.widthTiles
                            });
                        }
                    }
                }
            }
        }

        const gates = hasVectorWalls
            ? vectorGates
            : settlement.wallRings?.[0]?.gates || [];
        for (const gate of gates) {
            stampGridLine(settlement.col, settlement.row, gate.col, gate.row, (col, row) =>
                put(col, row, { kind: 'road', townId, roadKind: 'gate-road', widthTiles: gate.widthTiles || 1 }));
        }

        for (const road of settlement.blueprint?.roads || []) {
            const polyline = (road.points || [])
                .map((point) => projectWorldPoint(point, settlement, sampleScale))
                .filter(Boolean);
            if (polyline.length >= 2) {
                for (let index = 1; index < polyline.length; index++) {
                    stampGridLine(polyline[index - 1].col, polyline[index - 1].row, polyline[index].col, polyline[index].row,
                        (col, row) => stampWideCell(col, row, road.widthTiles || 1, width, height, (wideCol, wideRow) =>
                            put(wideCol, wideRow, {
                                kind: 'road', townId, roadKind: road.kind || 'road',
                                toBurgId: road.toBurgId ?? null, widthTiles: road.widthTiles || 1
                            })));
                }
                continue;
            }
            const target = settlementByBurgId.get(Number(road.toBurgId ?? road.towardFief ?? road.towardSeat));
            const endpoint = target
                ? { col: target.col, row: target.row }
                : endpointFromBearing(settlement, road.gateBearing ?? road.bearing, width, height);
            if (!endpoint) continue;
            stampGridLine(settlement.col, settlement.row, endpoint.col, endpoint.row, (col, row) =>
                stampWideCell(col, row, road.widthTiles || 1, width, height, (wideCol, wideRow) =>
                    put(wideCol, wideRow, {
                        kind: 'road', townId, roadKind: road.kind || 'road',
                        toBurgId: road.toBurgId ?? null, widthTiles: road.widthTiles || 1
                    })));
        }

        stampWardStreetGrid(settlement, width, height, (col, row, ward) => {
            if (hasVectorWalls && !isInsideWallBounds(col, row, settlement.wallBounds)) return;
            put(col, row, {
                kind: 'road', townId, roadKind: 'ward-street', widthTiles: 1,
                district: ward.district
            });
        });

        const docks = settlement.blueprint?.districtDirectives?.docks;
        if (docks?.enabled) {
            const edge = edgeFromBearing(docks.bearing ?? settlement.blueprint?.water?.shoreBearing ?? 180);
            const direction = directionForEdge(edge);
            const start = endpointFromBearing(settlement, bearingForEdge(edge), width, height);
            const length = clampInteger(docks.minimumLengthTiles ?? 4, 3, 8);
            if (start) {
                for (let step = 0; step < length; step++) {
                    stampWideCell(start.col + direction.x * step, start.row + direction.y * step, 2, width, height,
                        (col, row) => put(col, row, {
                            kind: 'dock', townId, district: 'harbor', edge, step, length
                        }));
                }
            }
        }

        if (settlement.castle) {
            for (let row = settlement.castle.bounds.minRow; row <= settlement.castle.bounds.maxRow; row++) {
                for (let col = settlement.castle.bounds.minCol; col <= settlement.castle.bounds.maxCol; col++) {
                    put(col, row, { kind: 'castle-plot', townId });
                }
            }
        }

        projectWaterSkeleton(settlement, width, height, sampleScale, put);
    }

    const stableCells = [...cells.values()]
        .sort((left, right) => left.id - right.id || left.kind.localeCompare(right.kind));
    return Object.freeze({
        cells,
        hash: hashSkeleton(stableCells),
        diagnostics: Object.freeze({
            cells: stableCells.length,
            walls: stableCells.filter((cell) => cell.kind === 'wall').length,
            vectorWalls: stableCells.filter((cell) => cell.kind === 'wall' && cell.ring === 'vector').length,
            gates: stableCells.filter((cell) => cell.kind === 'gate').length,
            vectorGates: stableCells.filter((cell) => cell.kind === 'gate' && cell.ring === 'vector').length,
            vectorTowns: new Set(stableCells.map((cell) => cell.vectorHash).filter(Boolean)).size,
            roads: stableCells.filter((cell) => cell.kind === 'road').length,
            castles: stableCells.filter((cell) => cell.kind === 'castle-plot').length,
            waterfalls: stableCells.filter((cell) => cell.kind === 'waterfall').length,
            plungePools: stableCells.filter((cell) => cell.kind === 'plunge-pool').length,
            docks: stableCells.filter((cell) => cell.kind === 'dock').length
        })
    });
}

export function createWorldConstraintField({
    fields = [],
    width = 0,
    height = 0,
    settlements = [],
    skeleton = null
} = {}) {
    const cells = new Array(width * height);
    let inhibited = 0;
    let walled = 0;
    let hardWater = 0;
    let fixedNodes = 0;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            const field = fields[id] || {};
            const fixed = skeleton?.cells?.get?.(id) || null;
            let owner = null;
            let ward = null;
            let urbanization = 0;
            let insideWall = false;
            let wallBoundary = fixed?.kind === 'wall' || fixed?.kind === 'gate';
            let nearestTownDistance = Infinity;

            for (const settlement of settlements) {
                const distance = Math.hypot(col - settlement.col, row - settlement.row);
                const localWard = getSettlementWardAt(settlement, col, row);
                const candidateInside = settlement.walled && isInsideWallBounds(col, row, settlement.wallBounds);
                const density = clamp01(localWard?.wfcPriors?.buildingDensity ?? (candidateInside ? 0.82 : 0.46));
                const populationFalloff = Math.min(0.82, 0.82 * Math.exp(-distance / Math.max(1, settlement.radius)));
                const routeBoost = clamp01(field.routeInfluence) * 0.14;
                const candidateUrbanization = candidateInside
                    ? Math.max(0.88, density)
                    : clamp01(populationFalloff * (0.6 + density * 0.4) + routeBoost);
                const ownershipScore = candidateInside ? 2 + candidateUrbanization : candidateUrbanization;
                const currentScore = insideWall ? 2 + urbanization : urbanization;
                if (ownershipScore > currentScore || (ownershipScore === currentScore && distance < nearestTownDistance)) {
                    owner = settlement;
                    ward = localWard;
                    urbanization = candidateUrbanization;
                    insideWall = candidateInside;
                    nearestTownDistance = distance;
                }
            }

            const land = clamp01(field.land);
            const river = Math.max(clamp01(field.riverInfluence), clamp01(field.riverPathInfluence));
            const route = clamp01(field.routeInfluence);
            const macroWater = land <= 0.18 || (river >= 0.82 && land < 0.72);
            const fixedLand = fixed && FIXED_LAND_KINDS.has(fixed.kind);
            const fixedWater = fixed && FIXED_WATER_KINDS.has(fixed.kind);
            const touchesFixedWater = Boolean(fixedLand) && [
                id - 1,
                id + 1,
                id - width,
                id + width
            ].some((neighborId) => {
                const neighbor = skeleton?.cells?.get?.(neighborId);
                return neighbor && FIXED_WATER_KINDS.has(neighbor.kind) &&
                    Math.abs(neighbor.col - col) + Math.abs(neighbor.row - row) === 1;
            });
            // A compiled wall envelope is a stronger urban intent than uncertain FMG shoreline
            // sampling. Inside it, macro water becomes inhibited "soft" terrain that the coupled
            // town wave may stabilize into buildable ground. Explicit parser-authored water
            // (waterfalls, plunge pools and fords) remains hard everywhere, as do all fixed land
            // nodes. This is the confinement rule: walls favor buildings over terrain churn
            // without allowing a variant to erase authored hydrology.
            const hardWaterConstraint = fixedWater || (!fixedLand && macroWater && !insideWall);
            const fixedLandTerrain = touchesFixedWater || land <= 0.5 || river >= 0.55
                ? 'sand'
                : Number(field.height || 0) >= 70
                    ? 'hill'
                    : 'meadow';
            const macroConfidence = clamp01(0.4 + Math.abs(land - 0.5) * 0.34 + Math.max(route, river) * 0.16);
            const inhibitor = clamp01(Math.max(
                macroConfidence,
                fixed ? 1 : insideWall ? 0.94 : 0.42 + urbanization * 0.44
            ));
            const requestedVariance = clamp01(ward?.wfcPriors?.elevationVariance ?? 1);
            const terrainVariance = fixed ? 0 : clamp01((1 - urbanization * 0.82) * requestedVariance);
            const cell = Object.freeze({
                id,
                col,
                row,
                townId: owner?.burg?.id ?? fixed?.townId ?? null,
                clusterId: owner?.clusterId ?? null,
                wardId: ward?.id ?? null,
                district: ward?.district ?? null,
                latitude: Number(owner?.blueprint?.climate?.latitude ?? 0),
                snowline: Number(owner?.blueprint?.climate?.snowline ?? 100),
                urbanization,
                inhibitor,
                chaosLimit: 1 - inhibitor,
                terrainVariance,
                insideWall,
                wallBoundary,
                hardWater: hardWaterConstraint,
                routeInfluence: route,
                riverInfluence: river,
                land,
                skeletonKind: fixed?.kind ?? null,
                fixedTerrain: fixedLand ? fixedLandTerrain : fixedWater ? 'shallow-water' : null,
                blueprintFixed: Boolean(fixed)
            });
            cells[id] = cell;
            if (inhibitor >= 0.72) inhibited++;
            if (insideWall) walled++;
            if (hardWaterConstraint) hardWater++;
            if (fixed) fixedNodes++;
        }
    }

    return {
        cells,
        inhibitorRows: toRows(cells, width, height, (cell) => cell.inhibitor),
        urbanizationRows: toRows(cells, width, height, (cell) => cell.urbanization),
        diagnostics: Object.freeze({
            cells: cells.length,
            inhibitedCells: inhibited,
            walledInteriorCells: walled,
            hardWaterCells: hardWater,
            fixedBlueprintNodes: fixedNodes,
            fixedSkeletonHash: skeleton?.hash || hashSkeleton([]),
            meanInhibitor: cells.length
                ? cells.reduce((sum, cell) => sum + cell.inhibitor, 0) / cells.length
                : 0
        })
    };
}

// Purely projects a parser-provided span into view bounds. It intentionally contains no
// population/tier formula; those decisions belong to the offline compiler.
export function createWallBounds(centerCol, centerRow, span, width = Infinity, height = Infinity) {
    const source = typeof span === 'object' && span ? span : { halfWidth: span, halfHeight: Number(span) * 0.82 };
    const halfWidth = Math.max(1, Math.floor(Number(source.halfWidth ?? source.radiusX ?? source.radius ?? 1) || 1));
    const halfHeight = Math.max(1, Math.floor(Number(source.halfHeight ?? source.radiusY ?? source.radius ?? 1) || 1));
    const maxColLimit = Number.isFinite(width) ? Math.max(0, width - 1) : Infinity;
    const maxRowLimit = Number.isFinite(height) ? Math.max(0, height - 1) : Infinity;
    const minCol = clampInteger(centerCol - halfWidth, 0, maxColLimit);
    const maxCol = clampInteger(centerCol + halfWidth, 0, maxColLimit);
    const minRow = clampInteger(centerRow - halfHeight, 0, maxRowLimit);
    const maxRow = clampInteger(centerRow + halfHeight, 0, maxRowLimit);
    return Object.freeze({
        minCol,
        maxCol,
        minRow,
        maxRow,
        width: maxCol - minCol + 1,
        height: maxRow - minRow + 1,
        halfWidth,
        halfHeight
    });
}

export function isInsideWallBounds(col, row, bounds) {
    if (!bounds) return false;
    if (bounds.insideCellKeys instanceof Set) {
        return bounds.insideCellKeys.has(gridKey(col, row));
    }
    return col > bounds.minCol && col < bounds.maxCol && row > bounds.minRow && row < bounds.maxRow;
}

export function isWallBoundaryCell(col, row, bounds, thickness = 1) {
    if (!bounds) return false;
    if (col < bounds.minCol || col > bounds.maxCol || row < bounds.minRow || row > bounds.maxRow) return false;
    const safeThickness = Math.max(1, Math.floor(Number(thickness) || 1));
    return col < bounds.minCol + safeThickness || col > bounds.maxCol - safeThickness ||
        row < bounds.minRow + safeThickness || row > bounds.maxRow - safeThickness;
}

export function getWallGateCells(bounds, { fourGates = false, gates = null, gateWidth = 1 } = {}) {
    if (!bounds) return [];
    const directives = Array.isArray(gates) && gates.length
        ? gates
        : [
            { bearing: 180, edge: 'south' },
            { bearing: 0, edge: 'north' },
            ...(fourGates ? [{ bearing: 270, edge: 'west' }, { bearing: 90, edge: 'east' }] : [])
        ];
    return directives.map((gate, index) => projectGate(bounds, gate, gateWidth, index));
}

export function getSettlementWardAt(settlement, col, row) {
    if (!settlement) return null;
    if (!isInsideWallBounds(col, row, settlement.wallBounds)) return settlement.walled ? null : settlement.wards?.[0] || null;
    let matched = settlement.wards?.[0] || null;
    for (const ward of settlement.wards || []) {
        if (!ward.bounds || isInsideWallBounds(col, row, ward.bounds)) matched = ward;
    }
    return matched;
}

function projectWallRings(rings, col, row, width, height) {
    return (Array.isArray(rings) ? rings : [])
        .map((ring, index) => {
            const radius = Math.max(3, Math.floor(Number(ring.radiusTiles ?? ring.radius ?? 3) || 3));
            const radiusY = Math.max(3, Math.floor(Number(ring.radiusYTiles ?? ring.radiusY ?? radius * 0.82) || radius * 0.82));
            const bounds = createWallBounds(col, row, { halfWidth: radius, halfHeight: radiusY }, width, height);
            const thickness = clampInteger(ring.thickness ?? 1, 1, 4);
            const gates = getWallGateCells(bounds, {
                gates: ring.gates,
                fourGates: ring.gates?.length >= 4,
                gateWidth: ring.gateWidth ?? (ring.gates?.some((gate) => gate.grand) ? 3 : 1)
            });
            return Object.freeze({
                ...ring,
                ring: Number.isFinite(Number(ring.ring)) ? Number(ring.ring) : index,
                radius,
                radiusY,
                thickness,
                heightVoxels: clampInteger(ring.heightVoxels ?? 4, 3, 9),
                bounds,
                gates: Object.freeze(gates)
            });
        })
        .sort((left, right) => left.ring - right.ring || right.radius - left.radius);
}

function createVectorWallBounds(townVector) {
    const bounds = townVector.bounds;
    return Object.freeze({
        ...bounds,
        halfWidth: Math.max(1, Math.floor((bounds.width - 1) / 2)),
        halfHeight: Math.max(1, Math.floor((bounds.height - 1) / 2)),
        source: 'town-vector',
        vectorHash: townVector.vectorHash,
        insideCellKeys: townVector.insideCellKeys,
        wallCellKeys: townVector.wallCellKeys,
        gateCellKeys: townVector.gateCellKeys
    });
}

function createVectorCoverageBounds(townVector) {
    const bounds = townVector.bounds;
    return Object.freeze({
        ...bounds,
        halfWidth: Math.max(1, Math.floor((bounds.width - 1) / 2)),
        halfHeight: Math.max(1, Math.floor((bounds.height - 1) / 2)),
        source: 'town-vector-coverage',
        vectorHash: townVector.vectorHash
    });
}

function projectWards(wards, rings, urbanBounds) {
    const source = Array.isArray(wards) && wards.length
        ? wards
        : [{ ring: 0, district: 'residential', wfcPriors: { buildingDensity: 0.58, elevationVariance: 0.35 } }];
    return source.map((ward, index) => {
        const ringIndex = clampInteger(ward.ring ?? index, 0, Math.max(0, rings.length - 1));
        const ring = rings[ringIndex];
        return Object.freeze({
            ...ward,
            id: ward.id || `ward-${ringIndex}-${ward.district || 'residential'}`,
            ring: ringIndex,
            bounds: ring?.bounds || urbanBounds,
            district: ward.district || 'residential',
            wfcPriors: Object.freeze({
                buildingDensity: clamp01(ward.wfcPriors?.buildingDensity ?? 0.58),
                elevationVariance: clamp01(ward.wfcPriors?.elevationVariance ?? 0.35),
                archetypeWeights: Object.freeze({ ...(ward.wfcPriors?.archetypeWeights || {}) })
            })
        });
    }).sort((left, right) => left.ring - right.ring);
}

function projectCastle(castle, col, row, width, height) {
    if (!castle) return null;
    const rawSize = castle.sizeTiles ?? castle.size ?? 7;
    const size = Array.isArray(rawSize)
        ? { width: Number(rawSize[0]), height: Number(rawSize[1]) }
        : typeof rawSize === 'object'
            ? {
                width: Number(rawSize.width ?? rawSize.widthTiles),
                height: Number(rawSize.height ?? rawSize.depth ?? rawSize.depthTiles)
            }
            : { width: Number(rawSize), height: Number(rawSize) };
    const castleWidth = clampInteger(size.width || 7, 5, 13);
    const castleHeight = clampInteger(size.height || castleWidth, 5, 13);
    const bounds = createWallBounds(col, row, {
        halfWidth: Math.floor(castleWidth / 2),
        halfHeight: Math.floor(castleHeight / 2)
    }, width, height);
    return Object.freeze({ ...castle, width: castleWidth, height: castleHeight, bounds });
}

function projectGate(bounds, gate, fallbackWidth, index) {
    const rawEdge = String(gate.edge || '').toLowerCase();
    const edge = ['north', 'east', 'south', 'west'].includes(rawEdge)
        ? rawEdge
        : ({ n: 'north', e: 'east', s: 'south', w: 'west' })[rawEdge] || edgeFromBearing(gate.bearing);
    const centerCol = Math.round((bounds.minCol + bounds.maxCol) / 2);
    const centerRow = Math.round((bounds.minRow + bounds.maxRow) / 2);
    const col = edge === 'west' ? bounds.minCol : edge === 'east' ? bounds.maxCol : centerCol;
    const row = edge === 'north' ? bounds.minRow : edge === 'south' ? bounds.maxRow : centerRow;
    const widthTiles = clampInteger(gate.widthTiles ?? gate.width ?? fallbackWidth, 1, 3);
    const half = Math.floor(widthTiles / 2);
    const cells = [];
    for (let offset = -half; offset <= half; offset++) {
        cells.push(edge === 'north' || edge === 'south'
            ? { col: clampInteger(col + offset, bounds.minCol, bounds.maxCol), row }
            : { col, row: clampInteger(row + offset, bounds.minRow, bounds.maxRow) });
    }
    return Object.freeze({
        ...gate,
        id: gate.id || `gate-${index}-${edge}`,
        bearing: normalizeBearing(gate.bearing ?? bearingForEdge(edge)),
        edge,
        col,
        row,
        widthTiles,
        cells: Object.freeze(cells.map(Object.freeze))
    });
}

function projectWaterSkeleton(settlement, width, height, sampleScale, put) {
    const directives = settlement.blueprint?.water || {};
    const originX = blueprintWorldX(settlement.blueprint);
    const originY = blueprintWorldY(settlement.blueprint);
    for (const bridge of directives.bridges || []) {
        const point = projectWorldDirective(bridge, settlement, originX, originY, sampleScale);
        if (point) put(point.col, point.row, { kind: 'bridge', townId: settlement.burg.id, riverId: bridge.riverId });
    }
    for (const ford of directives.fords || []) {
        const point = projectWorldDirective(ford, settlement, originX, originY, sampleScale);
        if (point) put(point.col, point.row, { kind: 'ford', townId: settlement.burg.id, riverId: ford.riverId });
    }
    for (const waterfall of directives.waterfalls || []) {
        const point = projectWorldDirective(waterfall, settlement, originX, originY, sampleScale);
        if (!point) continue;
        const tiers = clampInteger(waterfall.dropTiers ?? 1, 1, 5);
        const widthTiles = clampInteger(waterfall.widthTiles ?? 1, 1, 3);
        const edge = edgeFromBearing(waterfall.bearing ?? 180);
        const direction = directionForEdge(edge);
        for (let tier = 0; tier < tiers; tier++) {
            stampWideCell(point.col + direction.x * tier, point.row + direction.y * tier, widthTiles, width, height,
                (col, row) => put(col, row, {
                    kind: 'waterfall', townId: settlement.burg.id, riverId: waterfall.riverId,
                    directiveId: waterfall.id, tier, dropTiers: tiers, widthTiles, edge,
                    intensity: waterfall.intensity, plungePool: waterfall.plungePool !== false
                }));
        }
        const poolCol = point.col + direction.x * tiers;
        const poolRow = point.row + direction.y * tiers;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (Math.abs(dx) + Math.abs(dy) > 2) continue;
                put(poolCol + dx, poolRow + dy, {
                    kind: 'plunge-pool', townId: settlement.burg.id, riverId: waterfall.riverId,
                    directiveId: waterfall.id, dropTiers: tiers, widthTiles, edge,
                    intensity: waterfall.intensity
                });
            }
        }
    }
}

function projectWorldDirective(directive, settlement, originX, originY, sampleScale) {
    const position = Array.isArray(directive.position)
        ? directive.position
        : [directive.x, directive.y];
    const worldX = Number(position[0]);
    const worldY = Number(position[1]);
    if (!Number.isFinite(worldX) || !Number.isFinite(worldY)) return null;
    return {
        col: Math.round(settlement.col + (worldX - originX) / Math.max(0.01, sampleScale)),
        row: Math.round(settlement.row + (worldY - originY) / Math.max(0.01, sampleScale))
    };
}

function projectWorldPoint(point, settlement, sampleScale) {
    if (!Array.isArray(point) || !Number.isFinite(Number(point[0])) || !Number.isFinite(Number(point[1]))) return null;
    return {
        col: Math.round(settlement.col + (Number(point[0]) - blueprintWorldX(settlement.blueprint)) / Math.max(0.01, sampleScale)),
        row: Math.round(settlement.row + (Number(point[1]) - blueprintWorldY(settlement.blueprint)) / Math.max(0.01, sampleScale))
    };
}

function endpointFromBearing(settlement, bearing, width, height) {
    if (!Number.isFinite(Number(bearing))) return null;
    const direction = directionForEdge(edgeFromBearing(bearing));
    const length = Math.max(settlement.radius + 4, 10);
    return {
        col: clampInteger(settlement.col + direction.x * length, 0, width - 1),
        row: clampInteger(settlement.row + direction.y * length, 0, height - 1)
    };
}

function stampGridLine(fromCol, fromRow, toCol, toRow, visit) {
    let col = Math.round(fromCol);
    let row = Math.round(fromRow);
    const targetCol = Math.round(toCol);
    const targetRow = Math.round(toRow);
    const horizontalFirst = Math.abs(targetCol - col) >= Math.abs(targetRow - row);
    const horizontal = () => {
        while (col !== targetCol) {
            visit(col, row);
            col += Math.sign(targetCol - col);
        }
    };
    const vertical = () => {
        while (row !== targetRow) {
            visit(col, row);
            row += Math.sign(targetRow - row);
        }
    };
    if (horizontalFirst) {
        horizontal();
        vertical();
    } else {
        vertical();
        horizontal();
    }
    visit(col, row);
}

function stampWideCell(col, row, widthTiles, width, height, visit) {
    const safeWidth = clampInteger(widthTiles, 1, 3);
    const radius = Math.floor(safeWidth / 2);
    for (let offset = -radius; offset <= radius; offset++) {
        const x = clampInteger(col + offset, 0, Math.max(0, width - 1));
        const y = clampInteger(row, 0, Math.max(0, height - 1));
        visit(x, y);
    }
}

function stampWardStreetGrid(settlement, width, height, visit) {
    const wards = settlement.wards || [];
    if (!wards.length) return;
    if (!settlement.walled) {
        const span = Math.max(5, Math.min(9, settlement.radius - 1));
        stampGridLine(settlement.col - span, settlement.row, settlement.col + span, settlement.row,
            (col, row) => visit(clampInteger(col, 0, width - 1), clampInteger(row, 0, height - 1), wards[0]));
        stampGridLine(settlement.col, settlement.row - span, settlement.col, settlement.row + span,
            (col, row) => visit(clampInteger(col, 0, width - 1), clampInteger(row, 0, height - 1), wards[0]));
        return;
    }
    for (const ward of wards) {
        // Inner annuli are intentionally left to the aligned gate avenue. Extra lattice streets
        // would fragment their narrow buildable bands below the 4x5 minimum cabin footprint.
        if (ward.ring > 0) continue;
        const bounds = ward.bounds || settlement.wallBounds;
        const minCol = Math.max(1, bounds.minCol + 2);
        const maxCol = Math.min(width - 2, bounds.maxCol - 2);
        const minRow = Math.max(1, bounds.minRow + 2);
        const maxRow = Math.min(height - 2, bounds.maxRow - 2);
        if (minCol > maxCol || minRow > maxRow) continue;
        const spacing = ward.district === 'castle' ? 7 : ward.district === 'market' ? 7 : 8;
        const salt = Number(settlement.burg?.id || 0) + Number(ward.ring || 0) * 3;
        const firstRow = minRow + ((salt % spacing) + spacing) % spacing;
        const firstCol = minCol + (((salt * 3) % spacing) + spacing) % spacing;
        for (let row = firstRow; row <= maxRow; row += spacing) {
            stampGridLine(minCol, row, maxCol, row, (col, laneRow) => visit(col, laneRow, ward));
        }
        for (let col = firstCol; col <= maxCol; col += spacing) {
            stampGridLine(col, minRow, col, maxRow, (laneCol, row) => visit(laneCol, row, ward));
        }
    }
}

function forEachThickBoundaryCell(bounds, thickness, visit) {
    for (let row = bounds.minRow; row <= bounds.maxRow; row++) {
        for (let col = bounds.minCol; col <= bounds.maxCol; col++) {
            if (isWallBoundaryCell(col, row, bounds, thickness)) visit(col, row);
        }
    }
}

// Deterministic wall silhouette per town+ring: superellipse exponent 2 (ellipse) through 7
// (chamfered near-rect) plus a mild axis stretch. Same seed → same silhouette on every client.
function wallRingShape(townId, ringIndex) {
    const hash = hashShapeSeed(`${townId}:wall-ring:${ringIndex}`);
    const exponents = [2, 2.6, 3.4, 4.5, 7];
    return {
        exponent: exponents[hash % exponents.length],
        stretchX: 0.88 + ((hash >>> 3) % 25) / 100
    };
}

function forEachShapedBoundaryCell(bounds, thickness, shape, visit) {
    if (!bounds) return;
    for (let row = bounds.minRow; row <= bounds.maxRow; row++) {
        for (let col = bounds.minCol; col <= bounds.maxCol; col++) {
            if (isShapedWallBoundaryCell(col, row, bounds, thickness, shape)) visit(col, row);
        }
    }
}

function isShapedWallBoundaryCell(col, row, bounds, thickness, shape) {
    const centerX = (bounds.minCol + bounds.maxCol) / 2;
    const centerY = (bounds.minRow + bounds.maxRow) / 2;
    const radiusX = Math.max(1.5, ((bounds.maxCol - bounds.minCol) / 2) * shape.stretchX);
    const radiusY = Math.max(1.5, ((bounds.maxRow - bounds.minRow) / 2) / shape.stretchX);
    const safeThickness = Math.max(1, Math.floor(Number(thickness) || 1));
    const inside = (rx, ry) => {
        const nx = Math.abs(col - centerX) / Math.max(1, rx);
        const ny = Math.abs(row - centerY) / Math.max(1, ry);
        return Math.pow(nx, shape.exponent) + Math.pow(ny, shape.exponent) <= 1;
    };
    return inside(radiusX, radiusY) && !inside(radiusX - safeThickness, radiusY - safeThickness);
}

function snapToRingOutline(ringCells, col, row) {
    let best = null;
    let bestDistance = Infinity;
    for (const cell of ringCells) {
        const distance = Math.abs(cell[0] - col) + Math.abs(cell[1] - row);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = cell;
        }
    }
    return best;
}

function hashShapeSeed(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index++) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function blueprintWorldX(blueprint) {
    return Number(blueprint?.anchorX ?? blueprint?.anchor?.x ?? blueprint?.x ?? 0);
}

function blueprintWorldY(blueprint) {
    return Number(blueprint?.anchorY ?? blueprint?.anchor?.y ?? blueprint?.y ?? 0);
}

function edgeFromBearing(value) {
    const bearing = normalizeBearing(value);
    if (bearing >= 315 || bearing < 45) return 'north';
    if (bearing < 135) return 'east';
    if (bearing < 225) return 'south';
    return 'west';
}

function bearingForEdge(edge) {
    return ({ north: 0, east: 90, south: 180, west: 270 })[edge] ?? 180;
}

function directionForEdge(edge) {
    return ({
        north: { x: 0, y: -1 },
        east: { x: 1, y: 0 },
        south: { x: 0, y: 1 },
        west: { x: -1, y: 0 }
    })[edge] || { x: 0, y: 1 };
}

function inwardDirectionForEdge(edge) {
    const outward = directionForEdge(edge);
    return { x: -outward.x, y: -outward.y };
}

function edgeForProjectedGate(settlement, gate) {
    const dx = Number(gate.col) - Number(settlement.col);
    const dy = Number(gate.row) - Number(settlement.row);
    if (Math.abs(dx) > Math.abs(dy)) return dx >= 0 ? 'east' : 'west';
    return dy >= 0 ? 'south' : 'north';
}

function resolveBlueprintDirectives(blueprint, globalWater = {}) {
    if (!blueprint || !globalWater) return blueprint;
    const crossings = new Map((globalWater.crossings || []).map((entry) => [entry.id, entry]));
    const waterfalls = new Map((globalWater.waterfalls || []).map((entry) => [entry.id, entry]));
    const water = blueprint.water || {};
    const resolveList = (values, index) => (values || [])
        .map((value) => typeof value === 'string' ? index.get(value) : value)
        .filter(Boolean);
    return {
        ...blueprint,
        water: {
            ...water,
            fords: resolveList(water.fords, crossings),
            bridges: resolveList(water.bridges, crossings),
            waterfalls: resolveList(water.waterfalls, waterfalls)
        }
    };
}

function normalizeBearing(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 180;
    return ((number % 360) + 360) % 360;
}

function hierarchyRank(value) {
    return value === 'seat' ? 0 : 1;
}

function hashSkeleton(cells) {
    let hash = 2166136261;
    for (const cell of cells) {
        const value = `${cell.id}:${cell.kind}:${cell.townId ?? ''}:${cell.ring ?? ''};`;
        for (let index = 0; index < value.length; index++) {
            hash ^= value.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
}

function toRows(cells, width, height, project) {
    return Array.from({ length: height }, (_, row) =>
        Array.from({ length: width }, (_, col) => project(cells[row * width + col])));
}

function clamp01(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(1, number));
}

function clampInteger(value, minimum, maximum) {
    const number = Number(value);
    if (!Number.isFinite(number)) return minimum;
    return Math.max(minimum, Math.min(maximum, Math.floor(number)));
}

function gridKey(col, row) {
    return `${Math.floor(Number(col))},${Math.floor(Number(row))}`;
}
