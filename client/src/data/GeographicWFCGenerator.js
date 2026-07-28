import { ACTIVE_GEOGRAPHY, ACTIVE_SETTLEMENT_BLUEPRINTS, ACTIVE_WORLD } from './ActiveWorldData.js';
import {
    hashWaveSeed,
    solveWaveFunctionCollapse,
    WaveFunctionCollapseError
} from './WaveFunctionCollapse.js';
import {
    GEOGRAPHIC_TILES,
    GEOGRAPHIC_TILE_BY_ID,
    getBiomeName,
    getTerrainDomain,
    getTerrainWeight,
    terrainWaveCompatible
} from './WorldTileSet.js';
import { planTownWave } from './TownWavePlanner.js';
import {
    createSettlementConstraintAnchors,
    createBlueprintSkeleton,
    createWorldConstraintField,
    getSettlementWardAt,
    isInsideWallBounds
} from './WorldConstraintField.js';
import {
    CONTEXTUAL_WFC_MODULES,
    solveContextualBuildingWFC
} from './ContextualBuildingWFC.js';
import {
    createBakedBuildingPlan,
    createFixedBakedBuilding,
    validateBakedBuilding
} from './BakedBuildingLibrary.js';
import { BAKED_PARTIAL_CHUNKS } from './BakedChunkData.js';
import {
    getPartialChunkCell,
    validatePartialChunkRegistry
} from './PartialChunkRegistry.js';
import {
    getActiveTownVectorHash,
    getActiveTownVectorSummary
} from './TownVectorData.js';

// Compact view window (was 80x60): ~19% fewer generated columns per view, directly cutting the
// tile/mesh count that made LOD heavy. The smaller window pairs with steeper elevation macro
// scaling below so views feel dense and vertical instead of wide and flat. (64x48 was probed but
// triggers a pathological clipped-settlement solve at burg-9 — do not shrink further without
// profiling that case.)
export const GEOGRAPHIC_WORLD_VIEW_WIDTH = 72;
export const GEOGRAPHIC_WORLD_VIEW_HEIGHT = 54;
export const WORLD_SAMPLE_SCALE = 0.64;
export const TERRAIN_WFC_CHUNK_SIZE = 8;
const TERRAIN_WFC_HALO_CHUNKS = 1;

const PARTIAL_CHUNK_REGISTRY_STATUS = validatePartialChunkRegistry(BAKED_PARTIAL_CHUNKS, {
    generationVersion: ACTIVE_WORLD.generationVersion,
    worldContentHash: ACTIVE_WORLD.contentHash,
    sampleScale: WORLD_SAMPLE_SCALE,
    chunkSize: TERRAIN_WFC_CHUNK_SIZE,
    allowedTileIds: new Set(GEOGRAPHIC_TILES.map((tile) => tile.id))
});
const ACTIVE_PARTIAL_CHUNK_REGISTRY = PARTIAL_CHUNK_REGISTRY_STATUS.compatible
    ? BAKED_PARTIAL_CHUNKS
    : null;

const CELL_BUCKET_SIZE = 18;
const PATH_BUCKET_SIZE = 12;
const MAX_DECORATIONS = 150;
const SETTLEMENT_ARCHETYPES = Object.freeze({
    cottage: Object.freeze({ weight: 2.2, minSpan: 3, maxSpan: 7 }),
    townhouse: Object.freeze({ weight: 1.7, minSpan: 4, maxSpan: 9 }),
    workshop: Object.freeze({ weight: 1.15, minSpan: 4, maxSpan: 9 }),
    bayfront: Object.freeze({ weight: 0.9, minSpan: 4, maxSpan: 9 }),
    hall: Object.freeze({ weight: 0.55, minSpan: 5, maxSpan: 11 }),
    manor: Object.freeze({ weight: 0.42, minSpan: 6, maxSpan: 12 }),
    tower: Object.freeze({ weight: 0.36, minSpan: 4, maxSpan: 7 })
});
const LANDMARK_ARCHETYPES = new Set(['hall', 'manor', 'tower']);
const CARDINALS = Object.freeze([
    Object.freeze({ x: 1, y: 0, name: 'east' }),
    Object.freeze({ x: -1, y: 0, name: 'west' }),
    Object.freeze({ x: 0, y: 1, name: 'south' }),
    Object.freeze({ x: 0, y: -1, name: 'north' })
]);

let geographyIndex = null;

export function createGeographicWorldPlan({
    worldX,
    worldY,
    width = GEOGRAPHIC_WORLD_VIEW_WIDTH,
    height = GEOGRAPHIC_WORLD_VIEW_HEIGHT,
    variant = 0,
    includeTerrainSnapshot = false,
    useBakedPartialChunks = true
} = {}) {
    const safeWidth = clampInteger(width, 32, 112);
    const safeHeight = clampInteger(height, 24, 84);
    const centerX = clampNumber(worldX, 0, ACTIVE_WORLD.width, ACTIVE_WORLD.width / 2);
    const centerY = clampNumber(worldY, 0, ACTIVE_WORLD.height, ACTIVE_WORLD.height / 2);
    // Every view samples the same world-anchored lattice. Without this snap, two overlapping
    // views centered a fraction of a tile apart would address different cells and could shift a
    // partial baked core. The requested center is still retained for map/UI navigation below.
    const sampleCenterX = snapWorldSampleCoordinate(centerX);
    const sampleCenterY = snapWorldSampleCoordinate(centerY);
    const safeVariant = Math.max(0, Math.floor(Number(variant) || 0));
    // Variant randomness is world-anchored. A center-dependent seed made every overlapping
    // viewport a different universe even when both addressed the same global sample cells.
    const seed = hashWaveSeed(`${ACTIVE_WORLD.seed}:variant:${safeVariant}`);
    const viewSeed = hashWaveSeed(
        `${seed}:view:${round(sampleCenterX, 3)}:${round(sampleCenterY, 3)}`
    );
    const index = getGeographyIndex();
    const fields = sampleRegionFields(index, {
        centerX: sampleCenterX,
        centerY: sampleCenterY,
        width: safeWidth,
        height: safeHeight,
        seed
    });
    const rawSettlementAnchors = createSettlementConstraintAnchors({
        blueprints: ACTIVE_SETTLEMENT_BLUEPRINTS,
        burgs: index.burgs,
        centerX: sampleCenterX,
        centerY: sampleCenterY,
        width: safeWidth,
        height: safeHeight,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    // Blueprint anchors, wall rings and roads are parser-authored fixed nodes. They deliberately
    // bypass the old variant-dependent inland stabilization pass.
    const settlementAnchors = rawSettlementAnchors;
    const fixedSkeleton = createBlueprintSkeleton({
        settlements: settlementAnchors,
        width: safeWidth,
        height: safeHeight,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    const constraints = createWorldConstraintField({
        fields,
        width: safeWidth,
        height: safeHeight,
        settlements: settlementAnchors,
        skeleton: fixedSkeleton
    });
    // Terrain is solved in a canonical chunk-aligned halo, then cropped. Full global chunks and
    // the extra seam margin mean the same sample cell sees the same WFC graph even when it sits
    // on two different viewport edges.
    const terrainFrame = createTerrainGenerationFrame({
        index,
        centerX: sampleCenterX,
        centerY: sampleCenterY,
        width: safeWidth,
        height: safeHeight,
        seed
    });
    const frameCollapse = collapseTerrain(
        terrainFrame.fields,
        terrainFrame.width,
        terrainFrame.height,
        seed,
        terrainFrame.constraints,
        useBakedPartialChunks
    );
    const frameElevationRows = createElevationRows(
        terrainFrame.fields,
        frameCollapse.tileIds,
        terrainFrame.width,
        terrainFrame.height,
        seed,
        terrainFrame.constraints,
        frameCollapse.bakedCellIds
    );
    const collapse = cropTerrainCollapse(
        frameCollapse,
        terrainFrame,
        safeWidth,
        safeHeight,
        constraints,
        fields,
        useBakedPartialChunks
    );
    const elevationRows = cropTerrainRows(frameElevationRows, terrainFrame, safeWidth, safeHeight);
    const rows = createTerrainRows(collapse.tileIds, safeWidth, safeHeight);
    const paletteRows = createPaletteRows(collapse.tileIds, fields, safeWidth, safeHeight, constraints);

    overlayGeographicWaterAndRoutes(rows, paletteRows, elevationRows, fields, safeWidth, safeHeight, constraints);
    const settlement = synthesizeSettlements({
        rows,
        paletteRows,
        elevationRows,
        fields,
        centerX: sampleCenterX,
        centerY: sampleCenterY,
        width: safeWidth,
        height: safeHeight,
        seed,
        variant: safeVariant,
        index,
        anchors: settlementAnchors,
        constraintField: constraints,
        skeleton: fixedSkeleton
    });
    const decorations = synthesizeDecorations({
        rows,
        paletteRows,
        elevationRows,
        fields,
        buildings: settlement.buildings,
        settlements: settlement.settlements,
        skeleton: fixedSkeleton,
        seed,
        width: safeWidth,
        height: safeHeight
    });
    const visualVariantRows = createVisualVariantRows({
        rows,
        paletteRows,
        seed,
        centerX: sampleCenterX,
        centerY: sampleCenterY,
        width: safeWidth,
        height: safeHeight
    });
    const wallHeightRows = createBlueprintWallHeightRows(fixedSkeleton, safeWidth, safeHeight);
    const dominantBiome = getDominantBiome(fields);
    const dominantPalette = getDominantPalette(paletteRows, rows);
    const nearestBurg = findNearestBurg(index, sampleCenterX, sampleCenterY);
    const regionName = getRegionName(nearestBurg, dominantBiome, sampleCenterX, sampleCenterY);
    const stateColor = index.stateById.get(dominantBiome.state)?.color || '#65d58d';
    const cultureColor = index.cultureById.get(dominantBiome.culture)?.color || '#7d76e8';
    const activeTownVectorHash = getActiveTownVectorHash();
    const contentHash = `${ACTIVE_WORLD.contentHash}:${activeTownVectorHash}:${viewSeed.toString(16).padStart(8, '0')}`;
    const sourceAnchor = nearestBurg && nearestBurg.distance <= Math.max(safeWidth, safeHeight) * WORLD_SAMPLE_SCALE * 0.58
        ? nearestBurg.burg
        : null;

    return {
        rows,
        elevationRows,
        wallHeightRows,
        paletteRows,
        visualVariantRows,
        // Pre-overlay terrain snapshot for the partial-chunk bake tool: the raw collapsed tile ids
        // (no water/route overlay, no settlement stamping) so baked cells can be re-fixed into the
        // terrain WFC without freezing structure symbols as terrain.
        terrainTileIds: includeTerrainSnapshot ? collapse.tileIds.slice() : undefined,
        buildings: settlement.buildings,
        decorations,
        connectDoors: false,
        procedural: true,
        width: safeWidth,
        height: safeHeight,
        center: { x: Math.floor(safeWidth / 2), y: Math.floor(safeHeight / 2) },
        townName: regionName,
        seed,
        variant: safeVariant,
        generationVersion: ACTIVE_WORLD.generationVersion,
        contentHash,
        townVectorSchemaVersion: getActiveTownVectorSummary().schemaVersion,
        townVectorHash: activeTownVectorHash,
        sourceTown: {
            id: sourceAnchor ? `burg-${sourceAnchor.id}` : `region-${Math.round(centerX)}-${Math.round(centerY)}`,
            name: regionName,
            biome: dominantBiome.name,
            generated: true,
            requestedWorldX: centerX,
            requestedWorldY: centerY,
            stats: {
                buildings: settlement.buildings.length,
                bakedBuildings: settlement.diagnostics.bakedBuildings,
                decorations: decorations.length,
                wfcChunks: collapse.diagnostics.chunks,
                wfcFallbacks: collapse.diagnostics.fallbacks
            }
        },
        theme: {
            id: dominantPalette,
            paletteId: dominantPalette,
            biome: dominantBiome.name,
            stateColor,
            cultureColor,
            skyColor: getThemeSkyColor(dominantPalette),
            fogColor: getThemeFogColor(dominantPalette)
        },
        world: {
            id: ACTIVE_WORLD.id,
            name: ACTIVE_WORLD.name,
            seed: ACTIVE_WORLD.seed,
            variant: safeVariant,
            variantSeed: seed,
            generationVersion: ACTIVE_WORLD.generationVersion,
            contentHash,
            townVectorSchemaVersion: getActiveTownVectorSummary().schemaVersion,
            townVectorHash: activeTownVectorHash,
            centerX,
            centerY,
            sampleCenterX,
            sampleCenterY,
            originX: sampleCenterX - safeWidth * WORLD_SAMPLE_SCALE / 2,
            originY: sampleCenterY - safeHeight * WORLD_SAMPLE_SCALE / 2,
            locations: settlement.settlements.map((entry) => `burg-${entry.burg.id}`),
            source: ACTIVE_WORLD.source,
            image: ACTIVE_WORLD.image,
            sampleScale: WORLD_SAMPLE_SCALE
        },
        generation: {
            mode: 'blueprint-first-geographic-wfc',
            macroReference: 'offline FMG settlement blueprints + compact burg vectors + global cell graph',
            townPayloadsRead: false,
            townVectors: getActiveTownVectorSummary(),
            terrainWfc: collapse.diagnostics,
            partialBake: collapse.diagnostics.partialBake,
            buildingWfc: settlement.diagnostics,
            constraintField: constraints.diagnostics,
            settlements: settlement.settlements.length,
            coupledTerrainAndBuildings: true,
            couplingMode: 'shared-constraint-sequential-wfc',
            worldAnchoredChunks: true,
            minimumInterior: '2x3',
            blueprintFirst: true,
            activeClusterId: settlementAnchors[0]?.clusterId ?? null,
            fixedSkeletonHash: fixedSkeleton.hash,
            fixedSkeleton: fixedSkeleton.diagnostics
        }
    };
}

function createBlueprintWallHeightRows(skeleton, width, height) {
    const rows = Array.from({ length: height }, () => Array(width).fill(0));
    for (const cell of skeleton?.cells?.values?.() || []) {
        if (cell.kind !== 'wall' || rows[cell.row]?.[cell.col] === undefined) continue;
        rows[cell.row][cell.col] = clampInteger(cell.heightVoxels ?? 4, 3, 9);
    }
    return rows;
}

export function sampleGeographicField(worldX, worldY, options = {}) {
    return sampleField(getGeographyIndex(), Number(worldX), Number(worldY), options.seed || ACTIVE_WORLD.seed);
}

function getGeographyIndex() {
    if (geographyIndex) return geographyIndex;
    const cells = ACTIVE_GEOGRAPHY.cells || [];
    const cellById = new Map(cells.map((cell) => [cell.id, cell]));
    const cellBuckets = createBuckets(cells, CELL_BUCKET_SIZE);
    const routePoints = [];
    for (const route of ACTIVE_GEOGRAPHY.routes || []) {
        if (!/road|trail/i.test(route.kind || '')) continue;
        for (const point of route.points || []) {
            routePoints.push({ x: Number(point[0]), y: Number(point[1]), kind: route.kind, id: route.id });
        }
    }
    const riverPoints = [];
    for (const river of ACTIVE_GEOGRAPHY.rivers || []) {
        let previous = null;
        for (const cellId of river.cells || []) {
            const cell = cellById.get(cellId);
            if (!cell) continue;
            if (previous) {
                const distance = Math.hypot(cell.x - previous.x, cell.y - previous.y);
                const steps = Math.max(1, Math.ceil(distance / 1.4));
                for (let step = 1; step <= steps; step++) {
                    const amount = step / steps;
                    riverPoints.push({
                        x: lerp(previous.x, cell.x, amount),
                        y: lerp(previous.y, cell.y, amount),
                        id: river.id,
                        width: river.width || 0
                    });
                }
            } else {
                riverPoints.push({ x: cell.x, y: cell.y, id: river.id, width: river.width || 0 });
            }
            previous = cell;
        }
    }
    geographyIndex = {
        cells,
        cellById,
        cellBuckets,
        routeBuckets: createBuckets(routePoints, PATH_BUCKET_SIZE),
        riverBuckets: createBuckets(riverPoints, PATH_BUCKET_SIZE),
        burgs: ACTIVE_GEOGRAPHY.burgs || [],
        stateById: new Map((ACTIVE_GEOGRAPHY.states || []).map((record) => [record.id, record])),
        cultureById: new Map((ACTIVE_GEOGRAPHY.cultures || []).map((record) => [record.id, record]))
    };
    return geographyIndex;
}

function createBuckets(records, bucketSize) {
    const buckets = new Map();
    for (const record of records) {
        const key = bucketKey(record.x, record.y, bucketSize);
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push(record);
    }
    return { bucketSize, buckets, records };
}

function sampleRegionFields(index, { centerX, centerY, width, height, seed }) {
    const fields = new Array(width * height);
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const globalX = centerX + (col - offsetX) * WORLD_SAMPLE_SCALE;
            const globalY = centerY + (row - offsetY) * WORLD_SAMPLE_SCALE;
            fields[row * width + col] = {
                ...sampleField(index, globalX, globalY, seed),
                globalX,
                globalY,
                globalCol: Math.round(globalX / WORLD_SAMPLE_SCALE),
                globalRow: Math.round(globalY / WORLD_SAMPLE_SCALE),
                row,
                col
            };
        }
    }
    return fields;
}

function createTerrainGenerationFrame({ index, centerX, centerY, width, height, seed }) {
    const centerGlobalCol = Math.round(centerX / WORLD_SAMPLE_SCALE);
    const centerGlobalRow = Math.round(centerY / WORLD_SAMPLE_SCALE);
    const requestedMinCol = centerGlobalCol - Math.floor(width / 2);
    const requestedMinRow = centerGlobalRow - Math.floor(height / 2);
    const requestedMaxColExclusive = requestedMinCol + width;
    const requestedMaxRowExclusive = requestedMinRow + height;
    const halo = TERRAIN_WFC_HALO_CHUNKS * TERRAIN_WFC_CHUNK_SIZE;
    const minCol = Math.floor(requestedMinCol / TERRAIN_WFC_CHUNK_SIZE) * TERRAIN_WFC_CHUNK_SIZE - halo;
    const minRow = Math.floor(requestedMinRow / TERRAIN_WFC_CHUNK_SIZE) * TERRAIN_WFC_CHUNK_SIZE - halo;
    const maxColExclusive = Math.ceil(requestedMaxColExclusive / TERRAIN_WFC_CHUNK_SIZE) *
        TERRAIN_WFC_CHUNK_SIZE + halo;
    const maxRowExclusive = Math.ceil(requestedMaxRowExclusive / TERRAIN_WFC_CHUNK_SIZE) *
        TERRAIN_WFC_CHUNK_SIZE + halo;
    const frameWidth = maxColExclusive - minCol;
    const frameHeight = maxRowExclusive - minRow;
    const frameCenterCol = minCol + Math.floor(frameWidth / 2);
    const frameCenterRow = minRow + Math.floor(frameHeight / 2);
    const frameCenterX = frameCenterCol * WORLD_SAMPLE_SCALE;
    const frameCenterY = frameCenterRow * WORLD_SAMPLE_SCALE;
    const frameFields = sampleRegionFields(index, {
        centerX: frameCenterX,
        centerY: frameCenterY,
        width: frameWidth,
        height: frameHeight,
        seed
    });
    const frameAnchors = createSettlementConstraintAnchors({
        blueprints: ACTIVE_SETTLEMENT_BLUEPRINTS,
        burgs: index.burgs,
        centerX: frameCenterX,
        centerY: frameCenterY,
        width: frameWidth,
        height: frameHeight,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    const frameSkeleton = createBlueprintSkeleton({
        settlements: frameAnchors,
        width: frameWidth,
        height: frameHeight,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    const frameConstraints = createWorldConstraintField({
        fields: frameFields,
        width: frameWidth,
        height: frameHeight,
        settlements: frameAnchors,
        skeleton: frameSkeleton
    });
    return {
        fields: frameFields,
        constraints: frameConstraints,
        width: frameWidth,
        height: frameHeight,
        minCol,
        minRow,
        cropCol: requestedMinCol - minCol,
        cropRow: requestedMinRow - minRow
    };
}

function cropTerrainCollapse(
    frameCollapse,
    frame,
    width,
    height,
    requestedConstraints,
    requestedFields,
    useBakedPartialChunks
) {
    const tileIds = new Array(width * height);
    const bakedCellIds = new Set();
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            const frameId = (frame.cropRow + row) * frame.width + frame.cropCol + col;
            tileIds[id] = frameCollapse.tileIds[frameId];
            if (frameCollapse.bakedCellIds.has(frameId)) bakedCellIds.add(id);
        }
    }
    const invalidAdjacencySamples = listTerrainAdjacencyIssues(
        tileIds,
        width,
        height,
        requestedConstraints
    );
    const candidateCells = requestedFields.reduce((count, field) =>
        count + (getBakedPartialCell(field, useBakedPartialChunks) ? 1 : 0), 0);
    return {
        tileIds,
        bakedCellIds,
        diagnostics: {
            ...frameCollapse.diagnostics,
            frameWidth: frame.width,
            frameHeight: frame.height,
            haloChunks: TERRAIN_WFC_HALO_CHUNKS,
            invalidAdjacencies: invalidAdjacencySamples.length,
            invalidAdjacencySamples: invalidAdjacencySamples.slice(0, 12),
            partialBake: {
                ...frameCollapse.diagnostics.partialBake,
                candidateCells,
                appliedCells: bakedCellIds.size,
                constraintConflicts: Math.max(0, candidateCells - bakedCellIds.size)
            }
        }
    };
}

function cropTerrainRows(frameRows, frame, width, height) {
    return Array.from({ length: height }, (_, row) =>
        frameRows[frame.cropRow + row].slice(frame.cropCol, frame.cropCol + width));
}

function sampleField(index, x, y, seed) {
    const candidates = nearestRecords(index.cellBuckets, x, y, 6);
    const weighted = candidates.map((cell) => {
        const distance = Math.hypot(cell.x - x, cell.y - y);
        return { cell, distance, weight: 1 / (5 + distance * distance) };
    });
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0) || 1;
    const noise = fractalNoise(x, y, seed);
    const land = clamp01(weighted.reduce((sum, entry) => sum + entry.cell.land * entry.weight, 0) / total + noise * 0.035);
    const height = clampNumber(
        weighted.reduce((sum, entry) => sum + entry.cell.height * entry.weight, 0) / total + noise * 4.8,
        0,
        100,
        20
    );
    const nearestRiver = nearestPathDistance(index.riverBuckets, x, y, 4);
    const riverPathInfluence = nearestRiver ? Math.max(0, 1 - nearestRiver.distance / 2.2) : 0;
    const cellRiver = weighted.reduce((sum, entry) => {
        if (!entry.cell.river) return sum;
        return sum + entry.weight * (0.38 + Math.min(0.62, (entry.cell.flux || 0) / 180));
    }, 0) / total;
    const riverInfluence = Math.max(cellRiver, riverPathInfluence);
    const route = nearestPathDistance(index.routeBuckets, x, y, 3);
    return {
        land,
        height,
        biome: weightedVote(weighted, 'biome'),
        state: weightedVote(weighted, 'state'),
        culture: weightedVote(weighted, 'culture'),
        riverInfluence: clamp01(riverInfluence),
        riverPathInfluence: clamp01(riverPathInfluence),
        routeInfluence: route ? clamp01(1 - route.distance / 1.35) : 0,
        nearestCell: weighted[0]?.cell?.id ?? 0,
        noise
    };
}

function nearestRecords(index, x, y, count) {
    const records = [];
    const baseX = Math.floor(x / index.bucketSize);
    const baseY = Math.floor(y / index.bucketSize);
    for (let radius = 0; radius <= 4 && records.length < count * 3; radius++) {
        for (let by = baseY - radius; by <= baseY + radius; by++) {
            for (let bx = baseX - radius; bx <= baseX + radius; bx++) {
                if (radius > 0 && bx > baseX - radius && bx < baseX + radius && by > baseY - radius && by < baseY + radius) continue;
                records.push(...(index.buckets.get(`${bx},${by}`) || []));
            }
        }
    }
    const source = records.length ? records : index.records;
    return source
        .map((record) => ({ record, distance: Math.hypot(record.x - x, record.y - y) }))
        .sort((a, b) => a.distance - b.distance || Number(a.record.id || 0) - Number(b.record.id || 0))
        .slice(0, count)
        .map((entry) => entry.record);
}

function nearestPathDistance(index, x, y, count) {
    const nearest = nearestRecords(index, x, y, count)[0];
    return nearest ? { ...nearest, distance: Math.hypot(nearest.x - x, nearest.y - y) } : null;
}

function collapseTerrain(fields, width, height, seed, constraintField, useBakedPartialChunks) {
    const tileIds = new Array(width * height);
    const bakedCellIds = new Set();
    const chunkGroups = createGlobalTerrainChunkGroups(fields);
    let chunks = 0;
    let fallbacks = 0;
    for (const chunk of chunkGroups) {
        chunks++;
        const nodes = [];
        const domains = new Map();
        const fixed = new Map();
        const localIdByGlobalId = new Map(chunk.cells.map((cell) => [cell.globalId, cell.id]));
        for (const cell of chunk.cells) {
            const neighbors = [];
            for (const direction of CARDINALS) {
                const neighborGlobalId = globalSampleGridKey(
                    cell.globalCol + direction.x,
                    cell.globalRow + direction.y
                );
                if (!localIdByGlobalId.has(neighborGlobalId)) continue;
                neighbors.push({ id: neighborGlobalId, direction: direction.name });
            }
            nodes.push({ id: cell.globalId, neighbors });
            const constraint = constraintField?.cells?.[cell.id];
            // Partial baked chunk merge (the 3x3-chunk settlement cores baked by
            // tools/bake_partial_chunks.mjs): a baked cell is authoritative — it enters
            // the chunk solve pre-collapsed and the wave propagates the live world
            // around it, welding baked city cores into generated terrain seamlessly.
            const baked = getBakedPartialCell(fields[cell.id], useBakedPartialChunks);
            if (baked) {
                domains.set(cell.globalId, [baked.tileId]);
                fixed.set(cell.globalId, baked.tileId);
                bakedCellIds.add(cell.id);
                continue;
            }
            const domain = getConstrainedTerrainDomain(fields[cell.id], constraint);
            domains.set(cell.globalId, domain);
            const fixedTerrain = getFixedTerrainModule(
                cell.id,
                fields,
                constraintField,
                width,
                height
            );
            if (fixedTerrain && domain.includes(fixedTerrain)) {
                fixed.set(cell.globalId, fixedTerrain);
            }
        }
        try {
            const assignment = solveWaveFunctionCollapse({
                nodes,
                tiles: GEOGRAPHIC_TILES,
                domains,
                fixed,
                compatible: terrainWaveCompatible,
                seed: `${seed}:terrain:${chunk.chunkCol}:${chunk.chunkRow}`,
                nodeWeights: (globalId, tileId) => {
                    const id = localIdByGlobalId.get(globalId);
                    return getConstrainedTerrainWeight(
                        fields[id],
                        constraintField?.cells?.[id],
                        tileId
                    );
                }
            });
            for (const [globalId, tileId] of assignment) {
                tileIds[localIdByGlobalId.get(globalId)] = tileId;
            }
        } catch (error) {
            if (!(error instanceof WaveFunctionCollapseError)) throw error;
            fallbacks++;
            for (const node of nodes) {
                const id = localIdByGlobalId.get(node.id);
                tileIds[id] = chooseWeightedTerrain(
                    fields[id],
                    domains.get(node.id),
                    `${seed}:terrain-cell:${node.id}`,
                    constraintField?.cells?.[id]
                );
            }
        }
    }
    const repair = repairTerrainTransitions(
        tileIds,
        fields,
        width,
        height,
        seed,
        constraintField,
        bakedCellIds
    );
    const appliedBakedCellIds = new Set([...bakedCellIds].filter((id) => (
        tileIds[id] === getBakedPartialCell(fields[id], useBakedPartialChunks)?.tileId
    )));
    const invalidAdjacencySamples = listTerrainAdjacencyIssues(tileIds, width, height, constraintField);
    return {
        tileIds,
        bakedCellIds: appliedBakedCellIds,
        diagnostics: {
            chunks,
            fallbacks,
            chunkSize: TERRAIN_WFC_CHUNK_SIZE,
            invalidAdjacencies: invalidAdjacencySamples.length,
            invalidAdjacencySamples: invalidAdjacencySamples.slice(0, 12),
            partialBake: {
                requested: useBakedPartialChunks !== false,
                registryValid: PARTIAL_CHUNK_REGISTRY_STATUS.valid,
                registryCompatible: PARTIAL_CHUNK_REGISTRY_STATUS.compatible,
                registryCells: PARTIAL_CHUNK_REGISTRY_STATUS.cellCount || 0,
                candidateCells: bakedCellIds.size + repair.bakedConstraintConflicts,
                appliedCells: appliedBakedCellIds.size,
                constraintConflicts: repair.bakedConstraintConflicts,
                compatibilityErrors: [...PARTIAL_CHUNK_REGISTRY_STATUS.compatibilityErrors]
            }
        }
    };
}

function createGlobalTerrainChunkGroups(fields) {
    const groups = new Map();
    for (let id = 0; id < fields.length; id++) {
        const field = fields[id] || {};
        const globalCol = Number.isFinite(field.globalCol)
            ? field.globalCol
            : Math.round(Number(field.globalX || 0) / WORLD_SAMPLE_SCALE);
        const globalRow = Number.isFinite(field.globalRow)
            ? field.globalRow
            : Math.round(Number(field.globalY || 0) / WORLD_SAMPLE_SCALE);
        const chunkCol = Math.floor(globalCol / TERRAIN_WFC_CHUNK_SIZE);
        const chunkRow = Math.floor(globalRow / TERRAIN_WFC_CHUNK_SIZE);
        const key = `${chunkCol},${chunkRow}`;
        if (!groups.has(key)) groups.set(key, { chunkCol, chunkRow, cells: [] });
        groups.get(key).cells.push({
            id,
            globalCol,
            globalRow,
            globalId: globalSampleGridKey(globalCol, globalRow)
        });
    }
    return [...groups.values()]
        .map((group) => ({
            ...group,
            cells: group.cells.sort((left, right) =>
                left.globalRow - right.globalRow || left.globalCol - right.globalCol)
        }))
        .sort((left, right) => left.chunkRow - right.chunkRow || left.chunkCol - right.chunkCol);
}

function globalSampleGridKey(col, row) {
    return `${col},${row}`;
}

function globalFieldSampleKey(field) {
    return globalSampleGridKey(
        Number.isFinite(field?.globalCol)
            ? field.globalCol
            : Math.round(Number(field?.globalX || 0) / WORLD_SAMPLE_SCALE),
        Number.isFinite(field?.globalRow)
            ? field.globalRow
            : Math.round(Number(field?.globalY || 0) / WORLD_SAMPLE_SCALE)
    );
}

function getConstrainedTerrainDomain(field, constraint) {
    if (constraint?.fixedTerrain) return [constraint.fixedTerrain];
    const base = getTerrainDomain(field, ACTIVE_GEOGRAPHY.biomes);
    if (constraint?.hardWater) {
        return constraint.land <= 0.16
            ? ['deep-water', 'shallow-water']
            : ['shallow-water', 'wetland', 'sand'];
    }

    const candidates = [...new Set([...base, 'meadow', 'savanna', 'sand', 'tundra'])];
    if ((constraint?.urbanization || 0) >= 0.55) {
        const settled = candidates
            .filter((tileId) => {
                const spec = GEOGRAPHIC_TILE_BY_ID.get(tileId);
                return spec?.tags.has('land') &&
                    !spec.tags.has('relief') &&
                    !spec.tags.has('trees') &&
                    !spec.tags.has('ice');
            })
            .sort((left, right) =>
                getTerrainWeight(field, right, ACTIVE_GEOGRAPHY.biomes) -
                getTerrainWeight(field, left, ACTIVE_GEOGRAPHY.biomes));
        return settled.slice(0, Math.max(2, Math.min(3, settled.length)));
    }

    const ranked = candidates.sort((left, right) =>
        getTerrainWeight(field, right, ACTIVE_GEOGRAPHY.biomes) -
        getTerrainWeight(field, left, ACTIVE_GEOGRAPHY.biomes));
    const inhibitor = constraint?.inhibitor || 0;
    const keepCount = Math.max(3, Math.ceil(ranked.length * (1 - inhibitor * 0.45)));
    return ranked.slice(0, keepCount);
}

function getConstrainedTerrainWeight(field, constraint, tileId) {
    const spec = GEOGRAPHIC_TILE_BY_ID.get(tileId);
    let weight = getTerrainWeight(field, tileId, ACTIVE_GEOGRAPHY.biomes);
    const urbanization = constraint?.urbanization || 0;
    if (constraint?.fixedTerrain) {
        weight *= tileId === constraint.fixedTerrain ? 24 : 0.0001;
    } else if (constraint?.hardWater) {
        weight *= spec?.tags.has('water') ? 8 : 0.02;
    } else if (urbanization > 0) {
        if (spec?.tags.has('relief') || spec?.tags.has('trees') || spec?.tags.has('water')) {
            weight *= Math.max(0.025, (1 - urbanization) ** 2);
        } else {
            weight *= 1 + urbanization * 3.8;
        }
    }
    const latitude = Math.abs(Number(constraint?.latitude) || 0);
    if (latitude >= 45) {
        if (['taiga', 'tundra', 'glacier', 'mountain'].includes(tileId)) weight *= 2.3;
        if (['desert', 'savanna', 'jungle'].includes(tileId)) weight *= 0.18;
    } else if (latitude <= 14) {
        if (['savanna', 'jungle', 'desert'].includes(tileId)) weight *= 1.55;
        if (['taiga', 'tundra', 'glacier'].includes(tileId)) weight *= 0.35;
    }
    const sharpen = 1 + (constraint?.inhibitor || 0) * 0.75;
    return Math.max(0.0001, Math.pow(weight, sharpen));
}

function getFixedTerrainModule(id, fields, constraintField, width, height) {
    const constraint = constraintField?.cells?.[id];
    if (constraint?.fixedTerrain) return constraint.fixedTerrain;
    if (!constraint?.hardWater) return null;
    if (constraint.land > 0.16) return 'shallow-water';
    const row = Math.floor(id / width);
    const col = id % width;
    const surrounded = CARDINALS.every(({ x, y }) => {
        const neighborCol = col + x;
        const neighborRow = row + y;
        if (neighborCol < 0 || neighborRow < 0 || neighborCol >= width || neighborRow >= height) return false;
        const neighbor = constraintField.cells[neighborRow * width + neighborCol];
        return neighbor && neighbor.hardWater && neighbor.land <= 0.22;
    });
    return surrounded ? 'deep-water' : 'shallow-water';
}

function chooseWeightedTerrain(field, domain, seed, constraint = null) {
    return [...domain]
        .map((tileId) => ({
            tileId,
            score: getConstrainedTerrainWeight(field, constraint, tileId) * (0.92 + keyedUnit(`${seed}:${tileId}`) * 0.16)
        }))
        .sort((a, b) => b.score - a.score || a.tileId.localeCompare(b.tileId))[0]?.tileId || 'meadow';
}

function repairTerrainTransitions(tileIds, fields, width, height, seed, constraintField, bakedCellIds = new Set()) {
    let bakedConstraintConflicts = 0;
    for (let id = 0; id < tileIds.length; id++) {
        const fixed = getFixedTerrainModule(id, fields, constraintField, width, height);
        if (!fixed) continue;
        if (bakedCellIds.has(id) && tileIds[id] !== fixed) {
            bakedCellIds.delete(id);
            bakedConstraintConflicts++;
        }
        tileIds[id] = fixed;
    }
    // Chunk WFC intentionally runs in small windows, so this deterministic seam pass reconciles
    // chunk boundaries and fixed blueprint nodes. Physical skeleton nodes are stamped later;
    // their semantic underlay may become coast/hill here without moving or deleting the node.
    for (let pass = 0; pass < 16; pass++) {
        let changes = 0;
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const id = row * width + col;
                for (const [dx, dy] of [[1, 0], [0, 1]]) {
                    const nx = col + dx;
                    const ny = row + dy;
                    if (nx >= width || ny >= height) continue;
                    const neighborId = ny * width + nx;
                    if (terrainWaveCompatible(tileIds[id], tileIds[neighborId])) continue;
                    changes += reconcileTerrainPair(
                        tileIds,
                        id,
                        neighborId,
                        fields,
                        constraintField,
                        seed,
                        pass,
                        bakedCellIds
                    );
                }
            }
        }
        if (changes === 0) break;
    }
    return { bakedConstraintConflicts };
}

function reconcileTerrainPair(tileIds, id, neighborId, fields, constraintField, seed, pass, bakedCellIds) {
    const left = GEOGRAPHIC_TILE_BY_ID.get(tileIds[id]);
    const right = GEOGRAPHIC_TILE_BY_ID.get(tileIds[neighborId]);
    if (!left || !right) return 0;
    const leftBaked = bakedCellIds?.has(id) === true;
    const rightBaked = bakedCellIds?.has(neighborId) === true;
    if (leftBaked && rightBaked) return 0;
    if (leftBaked || rightBaked) {
        const bakedId = leftBaked ? id : neighborId;
        const liveId = leftBaked ? neighborId : id;
        const bridge = findBridgeTerrain(tileIds[bakedId], fields[liveId]);
        if (!bridge || bridge === tileIds[liveId]) return 0;
        tileIds[liveId] = bridge;
        return 1;
    }
    const leftWater = left.tags.has('water');
    const rightWater = right.tags.has('water');
    const leftHard = constraintField?.cells?.[id]?.hardWater === true;
    const rightHard = constraintField?.cells?.[neighborId]?.hardWater === true;

    if (leftWater !== rightWater) {
        const waterId = leftWater ? id : neighborId;
        const landId = leftWater ? neighborId : id;
        let changes = 0;
        if (tileIds[waterId] !== 'shallow-water') {
            tileIds[waterId] = 'shallow-water';
            changes++;
        }
        if (tileIds[landId] !== 'sand') {
            tileIds[landId] = 'sand';
            changes++;
        }
        return changes;
    }

    if (Math.abs(left.band - right.band) > 1) {
        const highId = left.band > right.band ? id : neighborId;
        if ((highId === id && leftHard) || (highId === neighborId && rightHard)) return 0;
        if (tileIds[highId] === 'hill') return 0;
        tileIds[highId] = 'hill';
        return 1;
    }

    const hotId = left.tags.has('hot') ? id : right.tags.has('hot') ? neighborId : null;
    if (hotId !== null && !constraintField?.cells?.[hotId]?.hardWater) {
        const other = hotId === id ? right : left;
        const replacement = other.band >= 2 ? 'hill' : 'meadow';
        if (tileIds[hotId] !== replacement) {
            tileIds[hotId] = replacement;
            return 1;
        }
    }

    const pairKeys = [globalFieldSampleKey(fields[id]), globalFieldSampleKey(fields[neighborId])].sort();
    const targetId = leftHard && !rightHard
        ? neighborId
        : rightHard && !leftHard
            ? id
            : keyedUnit(`${seed}:seam:${pass}:${pairKeys[0]}:${pairKeys[1]}`) < 0.5 ? id : neighborId;
    const otherId = targetId === id ? neighborId : id;
    const bridge = findBridgeTerrain(tileIds[otherId], fields[targetId]);
    if (!bridge || bridge === tileIds[targetId]) return 0;
    tileIds[targetId] = bridge;
    return 1;
}

function findBridgeTerrain(otherTileId, field) {
    const domain = getTerrainDomain(field, ACTIVE_GEOGRAPHY.biomes);
    return [...domain, 'shallow-water', 'sand', 'wetland', 'meadow', 'hill']
        .filter((tileId, index, list) => list.indexOf(tileId) === index)
        .filter((tileId) => terrainWaveCompatible(tileId, otherTileId))
        .sort((a, b) => getTerrainWeight(field, b, ACTIVE_GEOGRAPHY.biomes) - getTerrainWeight(field, a, ACTIVE_GEOGRAPHY.biomes))[0] || 'meadow';
}

function listTerrainAdjacencyIssues(tileIds, width, height, constraintField = null) {
    const issues = [];
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            for (const neighborId of [col + 1 < width ? id + 1 : -1, row + 1 < height ? id + width : -1]) {
                if (neighborId < 0 || terrainWaveCompatible(tileIds[id], tileIds[neighborId])) continue;
                const neighborRow = Math.floor(neighborId / width);
                const neighborCol = neighborId % width;
                const constraint = constraintField?.cells?.[id];
                const neighborConstraint = constraintField?.cells?.[neighborId];
                issues.push({
                    from: { col, row, tileId: tileIds[id], fixed: constraint?.fixedTerrain || null, hardWater: constraint?.hardWater === true, kind: constraint?.skeletonKind || null },
                    to: { col: neighborCol, row: neighborRow, tileId: tileIds[neighborId], fixed: neighborConstraint?.fixedTerrain || null, hardWater: neighborConstraint?.hardWater === true, kind: neighborConstraint?.skeletonKind || null }
                });
            }
        }
    }
    return issues;
}

function createTerrainRows(tileIds, width, height) {
    return Array.from({ length: height }, (_, row) => Array.from({ length: width }, (_, col) =>
        GEOGRAPHIC_TILE_BY_ID.get(tileIds[row * width + col])?.symbol || 'G').join(''));
}

function createPaletteRows(tileIds, fields, width, height, constraintField = null) {
    return Array.from({ length: height }, (_, row) => Array.from({ length: width }, (_, col) =>
        getRegionalPalette(
            tileIds[row * width + col],
            fields[row * width + col],
            constraintField?.cells?.[row * width + col]
        )));
}

function getRegionalPalette(tileId, field, constraint = null) {
    if (['deep-water', 'shallow-water'].includes(tileId)) return 'coast';
    if (tileId === 'wetland') return 'wetland';
    if (tileId === 'crystal') return 'crystal';
    if (tileId === 'glacier') return 'tundra';
    const biome = getBiomeName(field?.biome, ACTIVE_GEOGRAPHY.biomes);
    const regional = ({
        Marine: 'coast',
        'Hot desert': 'desert',
        'Cold desert': 'tundra',
        Savanna: 'savanna',
        Grassland: 'meadow',
        'Tropical seasonal forest': 'jungle',
        'Temperate deciduous forest': 'forest',
        'Tropical rainforest': 'jungle',
        'Temperate rainforest': 'forest',
        Taiga: 'taiga',
        Tundra: 'tundra',
        Glacier: 'alpine',
        Wetland: 'wetland'
    })[biome] || GEOGRAPHIC_TILE_BY_ID.get(tileId)?.paletteId || 'meadow';
    if (tileId === 'sand' && Number(field?.land) < 0.7) return 'coast';
    if (tileId === 'mountain' && ['meadow', 'forest', 'taiga', 'tundra'].includes(regional)) return 'alpine';
    const latitude = Math.abs(Number(constraint?.latitude) || 0);
    if (latitude >= 45) {
        if (regional === 'forest' || regional === 'jungle') return 'taiga';
        if (regional === 'meadow' || regional === 'savanna' || regional === 'desert') return 'tundra';
    } else if (latitude >= 42 && regional === 'jungle') {
        return 'forest';
    } else if (latitude <= 14) {
        if (regional === 'forest') return 'jungle';
        if (regional === 'meadow') return 'savanna';
    }
    return regional;
}

function createElevationRows(fields, tileIds, width, height, seed, constraintField, bakedCellIds = new Set()) {
    const rows = Array.from({ length: height }, () => Array(width).fill(0));
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            const spec = GEOGRAPHIC_TILE_BY_ID.get(tileIds[id]);
            if (spec?.tags.has('water')) continue;
            // Steeper macro scaling (was /14): when the FMG height field allows it, terrain climbs
            // to high multi-tier terraces so compact views gain verticality — e.g. the east side of
            // a view sitting several walkable tiers above the west.
            const macro = Math.max(0, Math.floor(((fields[id].height || 20) - 19) / 11));
            const variance = constraintField?.cells?.[id]?.terrainVariance ?? 1;
            const globalCol = Number.isFinite(fields[id].globalCol)
                ? fields[id].globalCol
                : Math.round(Number(fields[id].globalX || 0) / WORLD_SAMPLE_SCALE);
            const globalRow = Number.isFinite(fields[id].globalRow)
                ? fields[id].globalRow
                : Math.round(Number(fields[id].globalY || 0) / WORLD_SAMPLE_SCALE);
            const detail = valueNoise(globalCol, globalRow, 5.5, seed + 1709) * 1.25 * variance;
            rows[row][col] = clampInteger(Math.round(macro + detail), 0, 6);
        }
    }
    smoothTerraceClusters(rows, tileIds, width, height);
    for (let pass = 0; pass < 4; pass++) {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                if (isWaterSymbol(GEOGRAPHIC_TILE_BY_ID.get(tileIds[row * width + col])?.symbol)) continue;
                const neighbors = CARDINALS
                    .map(({ x, y }) => rows[row + y]?.[col + x])
                    .filter(Number.isFinite);
                const minimum = neighbors.length ? Math.min(...neighbors) : rows[row][col];
                if (rows[row][col] > minimum + 1) rows[row][col] = minimum + 1;
            }
        }
    }
    // Baked settlement-core cells keep their baked elevation exactly (applied after smoothing so
    // live smoothing around the core cannot drift the welded city terrain).
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            const baked = bakedCellIds.has(id) ? getBakedPartialCell(fields[id], true) : null;
            if (baked && Number.isFinite(baked.elevation)) rows[row][col] = baked.elevation;
        }
    }
    return rows;
}

// Lookup into the partial baked chunk registry by global sample-grid coordinates. Baked cores are
// keyed on the same rounded global grid the field sampler uses, so any view window that overlaps a
// settlement core aligns cell-for-cell regardless of where the view is centered.
function getBakedPartialCell(field, enabled = true) {
    if (!enabled || !ACTIVE_PARTIAL_CHUNK_REGISTRY) return null;
    return getPartialChunkCell(ACTIVE_PARTIAL_CHUNK_REGISTRY, field, WORLD_SAMPLE_SCALE);
}

function smoothTerraceClusters(rows, tileIds, width, height) {
    for (let pass = 0; pass < 3; pass++) {
        const next = rows.map((row) => row.slice());
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const spec = GEOGRAPHIC_TILE_BY_ID.get(tileIds[row * width + col]);
                if (spec?.tags.has('water')) continue;
                const neighbors = [];
                for (let oy = -1; oy <= 1; oy++) {
                    for (let ox = -1; ox <= 1; ox++) {
                        const neighborSpec = GEOGRAPHIC_TILE_BY_ID.get(tileIds[(row + oy) * width + col + ox]);
                        const value = rows[row + oy]?.[col + ox];
                        if (Number.isFinite(value) && !neighborSpec?.tags.has('water')) neighbors.push(value);
                    }
                }
                if (neighbors.length < 5) continue;
                neighbors.sort((a, b) => a - b);
                next[row][col] = neighbors[Math.floor(neighbors.length / 2)];
            }
        }
        for (let row = 0; row < height; row++) rows[row] = next[row];
    }
}

function overlayGeographicWaterAndRoutes(rows, paletteRows, elevationRows, fields, width, height, constraintField = null) {
    const mutable = rows.map((row) => row.split(''));
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (constraintField?.cells?.[row * width + col]?.blueprintFixed) continue;
            const field = fields[row * width + col];
            if (field.riverPathInfluence >= 0.35 && field.land >= 0.42) {
                mutable[row][col] = field.riverPathInfluence > 0.72 ? '~' : 'B';
                paletteRows[row][col] = 'coast';
                elevationRows[row][col] = 0;
            } else if (field.routeInfluence >= 0.63 && isLandSymbol(mutable[row][col])) {
                mutable[row][col] = 'R';
                paletteRows[row][col] = 'path';
                elevationRows[row][col] = Math.min(elevationRows[row][col], 3);
            }
        }
    }
    smoothRoadElevations(mutable, elevationRows);
    for (let row = 0; row < height; row++) rows[row] = mutable[row].join('');
}

function synthesizeSettlements({
    rows,
    paletteRows,
    elevationRows,
    fields,
    centerX,
    centerY,
    width,
    height,
    seed,
    index,
    anchors = [],
    constraintField,
    skeleton
}) {
    const mutable = rows.map((row) => row.split(''));
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const occupied = new Set();
    const buildings = [];
    const settlements = [];
    const aggregate = {
        sites: 0,
        assignedBuildings: 0,
        bakedBuildings: 0,
        vectorBuildings: 0,
        rejectedVectorBuildings: 0,
        vectorRejectionReasons: {},
        fixedBakedAssignments: 0,
        compactAdjacencyFallbacks: 0,
        forcedBuildingAnchors: 0,
        walledAreas: 0,
        wallCells: 0,
        wallRings: 0,
        vectorWallSystems: 0,
        keeps: 0,
        wardWaves: 0,
        urbanAreaCells: 0,
        buildingFootprintCells: 0,
        fallbacks: 0
    };

    for (const sourceEntry of anchors) {
        const entry = { ...sourceEntry };
        const radius = entry.radius;
        if (entry.col < 3 || entry.row < 3 || entry.col >= width - 3 || entry.row >= height - 3) continue;
        const settlement = {
            ...entry,
            radius,
            walled: entry.walled === true,
            wallBounds: entry.wallBounds,
            wallRings: entry.wallRings || [],
            wards: entry.wards || [],
            castle: entry.castle || null,
            accent: mixRegionalAccent(
                index.stateById.get(entry.burg.state)?.color,
                index.cultureById.get(entry.burg.culture)?.color
            )
        };
        const envelope = stampSettlementEnvelope({
            mutable,
            paletteRows,
            elevationRows,
            settlement,
            constraintField,
            skeleton,
            width,
            height
        });
        const districtRows = createSettlementDistrictRows({ mutable, settlement, width, height });
        const inhibitorRows = createPlacementInhibitorRows({
            mutable,
            elevationRows,
            settlement,
            plateau: envelope.plateau,
            constraintField,
            width,
            height
        });
        const bakedPlan = createWardBakedBuildingPlan({
            mutable,
            elevationRows,
            inhibitorRows,
            districtRows,
            settlement,
            occupied,
            width,
            height,
            fixedSeed: `${ACTIVE_WORLD.seed}:fixed-landmarks:${settlement.burg.id}`
        });
        const parcelSites = createContextualParcelSites({
            mutable,
            elevationRows,
            fields,
            constraintField,
            settlement,
            occupied: bakedPlan.occupied,
            offsetX,
            offsetY,
            width,
            height,
            seed
        });
        const bakedWave = createBakedWaveAnchors({
            buildings: bakedPlan.buildings,
            settlement,
            fields,
            constraintField,
            offsetX,
            offsetY,
            width
        });
        const sites = [...bakedWave.sites, ...parcelSites];
        let contextual = {
            assignment: new Map(),
            buildings: [],
            diagnostics: {
                sites: sites.length,
                buildings: 0,
                forcedBuildingAnchors: 0,
                fallbacks: 0,
                moduleHistogram: {}
            }
        };
        if (sites.length) {
            const generatedMinimum = parcelSites.length && bakedPlan.diagnostics.vectorBuildings === 0
                ? Math.min(parcelSites.length, Math.max(1, Math.ceil(parcelSites.length * (settlement.walled ? 0.72 : 0.48))))
                : 0;
            const minimumBuildings = bakedWave.sites.length + generatedMinimum;
            const areas = createWardWaveAreas({
                settlement,
                sites,
                bakedSiteIds: bakedWave.siteIds,
                totalMinimum: minimumBuildings
            });
            contextual = solveContextualBuildingWFC({
                sites,
                areas,
                seed: `${seed}:building-wave:${settlement.burg.id}`,
                minimumBuildingsPerArea: minimumBuildings,
                modules: [...CONTEXTUAL_WFC_MODULES, ...bakedWave.modules],
                fixed: bakedWave.fixed
            });
        }
        applyContextualTerrainAssignments({
            assignment: contextual.assignment,
            sites: parcelSites,
            mutable,
            paletteRows,
            elevationRows,
            constraintField,
            settlement,
            offsetX,
            offsetY
        });
        const generatedBuildings = contextual.buildings
            .filter((building) => !bakedWave.siteIds.has(building.siteId))
            .map((building, indexInTown) =>
            finalizeContextualBuilding({
                building,
                settlement,
                indexInTown,
                elevationRows,
                offsetX,
                offsetY,
                seed
            }));
        applySettlementWave(generatedBuildings, mutable.map((row) => row.join('')), elevationRows, settlement, seed);
        const bakedBuildings = bakedPlan.buildings.map((building) => ({
            ...building,
            preserveEntrance: true,
            enterable: true
        }));
        const localBuildings = [...bakedBuildings, ...generatedBuildings];
        applySettlementClimateToBuildings(localBuildings, settlement);
        for (const building of localBuildings) {
            reserveBuilding(occupied, building, offsetX, offsetY, 1);
            buildings.push(building);
        }
        const footprintCells = localBuildings.reduce((sum, building) =>
            sum + (building.footprintCells?.length || building.width * building.height), 0);
        const siteBuildingRatio = sites.length
            ? (generatedBuildings.length + bakedBuildings.length) / sites.length
            : 0;
        settlement.gates = envelope.gates;
        settlement.diagnostics = {
            sites: sites.length,
            generatedBuildings: generatedBuildings.length,
            bakedBuildings: bakedBuildings.length,
            vectorBuildings: bakedPlan.diagnostics.vectorBuildings,
            rejectedVectorBuildings: bakedPlan.diagnostics.rejectedVectorBuildings,
            fixedBakedAssignments: bakedWave.fixed.size,
            compactAdjacencyFallbacks: bakedPlan.diagnostics.compactAdjacencyFallbacks,
            forcedBuildingAnchors: contextual.diagnostics.forcedBuildingAnchors || 0,
            siteBuildingRatio,
            wallCells: envelope.wallCells,
            urbanAreaCells: envelope.urbanCells,
            constrainedInteriorCells: envelope.constrainedInteriorCells,
            buildingFootprintCells: footprintCells,
            moduleHistogram: contextual.diagnostics.moduleHistogram || {}
        };
        settlements.push(settlement);
        aggregate.sites += sites.length;
        aggregate.assignedBuildings += generatedBuildings.length + bakedBuildings.length;
        aggregate.bakedBuildings += bakedBuildings.length;
        aggregate.vectorBuildings += bakedPlan.diagnostics.vectorBuildings;
        aggregate.rejectedVectorBuildings += bakedPlan.diagnostics.rejectedVectorBuildings;
        for (const [reason, count] of Object.entries(bakedPlan.diagnostics.vectorRejectionReasons || {})) {
            aggregate.vectorRejectionReasons[reason] = (aggregate.vectorRejectionReasons[reason] || 0) + count;
        }
        aggregate.fixedBakedAssignments += bakedWave.fixed.size;
        aggregate.compactAdjacencyFallbacks += bakedPlan.diagnostics.compactAdjacencyFallbacks;
        aggregate.forcedBuildingAnchors += contextual.diagnostics.forcedBuildingAnchors || 0;
        aggregate.walledAreas += settlement.walled ? 1 : 0;
        aggregate.wallCells += envelope.wallCells;
        aggregate.wallRings += settlement.townVector?.wallCells?.length ? 0 : settlement.wallRings.length;
        aggregate.vectorWallSystems += settlement.townVector?.wallCells?.length ? 1 : 0;
        aggregate.keeps += bakedBuildings.filter((building) =>
            building.blueprintId === 'castle-keep' || building.vectorCastle).length;
        aggregate.wardWaves += new Set(sites.map((site) => site.areaId)).size;
        aggregate.urbanAreaCells += envelope.urbanCells;
        aggregate.buildingFootprintCells += footprintCells;
        aggregate.fallbacks += contextual.diagnostics.fallbacks || 0;
    }

    for (let row = 0; row < height; row++) rows[row] = mutable[row].join('');
    return {
        buildings,
        settlements,
        diagnostics: Object.freeze({
            ...aggregate,
            vectorRejectionReasons: Object.freeze({ ...aggregate.vectorRejectionReasons }),
            insideSiteBuildingRatio: aggregate.sites
                ? aggregate.assignedBuildings / aggregate.sites
                : 0,
            urbanFootprintRatio: aggregate.urbanAreaCells
                ? aggregate.buildingFootprintCells / aggregate.urbanAreaCells
                : 0,
            minimumInterior: '2x3',
            contradictions: 0
        })
    };
}

function applySettlementClimateToBuildings(buildings, settlement) {
    const latitude = Number(settlement.blueprint?.climate?.latitude) || 0;
    const snowline = Number(settlement.blueprint?.climate?.snowline) || 100;
    const cold = Math.abs(latitude) >= 45;
    const tropical = Math.abs(latitude) <= 14;
    for (const building of buildings) {
        building.climate = { latitude, snowline };
        building.roofTreatment = cold ? 'snow-capped' : tropical ? 'sun-bleached' : 'temperate';
        if (cold && building.blueprintId !== 'castle-keep' && ['clay', 'market', 'thatch'].includes(building.roofStyle)) {
            building.roofStyle = hashWaveSeed(`${building.id}:cold-roof`) % 2 ? 'slate' : 'copper';
        }
    }
}

function stampSettlementEnvelope({ mutable, paletteRows, elevationRows, settlement, constraintField, skeleton, width, height }) {
    const bounds = settlement.wallBounds;
    const elevations = [];
    let urbanCells = 0;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            if (bounds.insideCellKeys instanceof Set && !isInsideWallBounds(col, row, bounds)) continue;
            const constraint = constraintField?.cells?.[row * width + col];
            if ((!constraint?.hardWater || constraint?.blueprintFixed) && !isWaterSymbol(mutable[row]?.[col])) {
                elevations.push(Number(elevationRows[row]?.[col]) || 0);
            }
        }
    }
    elevations.sort((a, b) => a - b);
    const plateau = elevations[Math.floor(elevations.length / 2)] || 0;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            if (bounds.insideCellKeys instanceof Set && !isInsideWallBounds(col, row, bounds)) continue;
            const constraint = constraintField?.cells?.[row * width + col];
            // The numeric FMG envelope remains authoritative even inside a settlement. Only
            // non-hard marsh/shore noise may be stabilized into urban ground.
            if ((constraint?.hardWater && !constraint?.blueprintFixed) ||
                (!constraint?.blueprintFixed && (mutable[row]?.[col] === 'W' || mutable[row]?.[col] === 'I'))) continue;
            urbanCells++;
            const localCol = col - settlement.col;
            const localRow = row - settlement.row;
            mutable[row][col] = (localCol + localRow) % 11 === 0 ? ',' : '.';
            const currentElevation = Number(elevationRows[row]?.[col]) || 0;
            elevationRows[row][col] = Math.max(plateau - 1, Math.min(plateau + 1, currentElevation));
        }
    }

    const center = { col: settlement.col, row: settlement.row };
    const gates = settlement.wallRings?.[0]?.gates || [];
    let wallCells = 0;
    for (const fixed of skeleton?.cells?.values?.() || []) {
        if (Number(fixed.townId) !== Number(settlement.burg.id)) continue;
        if (!mutable[fixed.row]?.[fixed.col]) continue;
        if (fixed.kind === 'wall') {
            mutable[fixed.row][fixed.col] = 'T';
            paletteRows[fixed.row][fixed.col] = 'path';
            elevationRows[fixed.row][fixed.col] = plateau;
            wallCells++;
        } else if (fixed.kind === 'gate' || fixed.kind === 'road') {
            mutable[fixed.row][fixed.col] = fixed.kind === 'gate' ? ';' : 'R';
            paletteRows[fixed.row][fixed.col] = 'path';
            elevationRows[fixed.row][fixed.col] = plateau;
        } else if (fixed.kind === 'castle-plot') {
            mutable[fixed.row][fixed.col] = '.';
            paletteRows[fixed.row][fixed.col] = 'path';
            elevationRows[fixed.row][fixed.col] = plateau;
        } else if (fixed.kind === 'dock') {
            mutable[fixed.row][fixed.col] = 'R';
            paletteRows[fixed.row][fixed.col] = 'path';
            elevationRows[fixed.row][fixed.col] = Math.max(0, plateau - 1);
        } else if (fixed.kind === 'bridge' || fixed.kind === 'ford') {
            mutable[fixed.row][fixed.col] = fixed.kind === 'ford' ? '~' : 'R';
            paletteRows[fixed.row][fixed.col] = 'path';
            elevationRows[fixed.row][fixed.col] = Math.max(0, plateau - 1);
        } else if (fixed.kind === 'waterfall') {
            mutable[fixed.row][fixed.col] = '~';
            paletteRows[fixed.row][fixed.col] = 'coast';
            elevationRows[fixed.row][fixed.col] = clampInteger(
                plateau + Math.max(0, (fixed.dropTiers || 1) - (fixed.tier || 0) - 1),
                0,
                6
            );
        } else if (fixed.kind === 'plunge-pool') {
            mutable[fixed.row][fixed.col] = 'B';
            paletteRows[fixed.row][fixed.col] = 'coast';
            elevationRows[fixed.row][fixed.col] = Math.max(0, plateau - 1);
        }
    }
    // Open fiefs have no ring gates, but still receive the parser-compiled fealty road. Give a
    // tiny civic landing at the anchor without inventing additional road arms.
    if (!settlement.walled) {
        for (let row = center.row - 1; row <= center.row + 1; row++) {
            for (let col = center.col - 1; col <= center.col + 1; col++) {
                const constraint = constraintField?.cells?.[row * width + col];
                if (!mutable[row]?.[col] || (constraint?.hardWater && !constraint?.blueprintFixed)) continue;
                mutable[row][col] = ';';
                paletteRows[row][col] = 'path';
                elevationRows[row][col] = plateau;
            }
        }
    }
    smoothRoadElevations(mutable, elevationRows);
    let developableUrbanCells = 0;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            if (bounds.insideCellKeys instanceof Set && !isInsideWallBounds(col, row, bounds)) continue;
            if (!isBuildableSymbol(mutable[row]?.[col])) continue;
            if (nearestSymbolDistance(mutable, col, row, new Set(['R', ';']), 2) <= 2) developableUrbanCells++;
        }
    }
    return {
        plateau,
        gates,
        wallCells,
        urbanCells: Math.max(1, developableUrbanCells),
        constrainedInteriorCells: urbanCells
    };
}

function createSettlementDistrictRows({ mutable, settlement, width, height }) {
    const rows = Array.from({ length: height }, () => Array(width).fill(null));
    const bounds = settlement.wallBounds;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            if (bounds.insideCellKeys instanceof Set && !isInsideWallBounds(col, row, bounds)) continue;
            if (isWaterSymbol(mutable[row]?.[col]) || mutable[row]?.[col] === 'T') continue;
            const ward = getSettlementWardAt(settlement, col, row);
            const compiledDistrict = ward?.district || 'residential';
            const roadDistance = nearestSymbolDistance(mutable, col, row, new Set(['R', ';', '=']), 3);
            const waterDistance = nearestSymbolDistance(mutable, col, row, new Set(['W', '~', 'B']), 7);
            if (compiledDistrict === 'harbor' && waterDistance > 6) rows[row][col] = 'artisan';
            else if (compiledDistrict === 'market' && roadDistance > 2) rows[row][col] = 'residential';
            else rows[row][col] = compiledDistrict;
        }
    }
    return rows;
}

function createPlacementInhibitorRows({ mutable, elevationRows, settlement, plateau, constraintField, width, height }) {
    return Array.from({ length: height }, (_, row) => Array.from({ length: width }, (_, col) => {
        const symbol = mutable[row]?.[col];
        const constraint = constraintField?.cells?.[row * width + col];
        if (constraint?.hardWater || isWaterSymbol(symbol) || symbol === 'T') return 1;
        if (!isInsideWallBounds(col, row, settlement.wallBounds)) {
            return clamp01(0.22 + (constraint?.inhibitor || 0) * 0.42);
        }
        const local = ['R', ';', ':'].includes(symbol)
            ? 0.42
            : clamp01(0.1 + Math.abs((Number(elevationRows[row]?.[col]) || 0) - plateau) * 0.12);
        // High FMG confidence is an inhibitor, but urbanization makes already-safe town ground
        // easier to build on. This keeps the same numeric field in both WFC layers.
        const global = clamp01((constraint?.inhibitor || 0) * (1 - (constraint?.urbanization || 0) * 0.72));
        return Math.max(local, global);
    }));
}

function createWardBakedBuildingPlan({
    mutable,
    elevationRows,
    inhibitorRows,
    districtRows,
    settlement,
    occupied,
    width,
    height,
    fixedSeed
}) {
    const buildings = [];
    const inheritedOccupiedCells = new Set(occupied instanceof Set ? occupied : []);
    let occupiedCells = new Set(inheritedOccupiedCells);
    let compactAdjacencyFallbacks = 0;
    const vectorPlan = createTownVectorBuildingPlan({
        mutable,
        elevationRows,
        settlement,
        occupied: occupiedCells,
        width,
        height,
        fixedSeed
    });
    buildings.push(...vectorPlan.buildings);
    occupiedCells = vectorPlan.occupied;
    const vectorCastle = buildings.some((building) => building.vectorGenerated && building.district === 'castle');

    if (settlement.castle && !vectorCastle) {
        const keepCandidates = [];
        for (const center of getFixedKeepCenters(settlement, width, height)) {
            for (const rotation of getFixedKeepRotations(settlement)) {
                try {
                    keepCandidates.push(createFixedBakedBuilding({
                        blueprintId: 'castle-keep',
                        centerCol: center.col,
                        centerRow: center.row,
                        rotation,
                        width,
                        height,
                        elevationRows,
                        seed: `${fixedSeed}:castle:${center.col}:${center.row}`,
                        townId: settlement.burg.name,
                        district: 'castle'
                    }));
                } catch {
                    // A clipped or steep candidate may fail while another burg-constrained
                    // center/orientation still fits.
                }
            }
        }
        if (keepCandidates.length) {
            const keep = keepCandidates.find((candidate) =>
                fixedBuildingHasOpenApproach(candidate, mutable) &&
                fixedBuildingAvoidsOccupiedCells(candidate, occupiedCells, width, height));
            if (keep) {
                buildings.push(keep);
                reserveBuilding(occupiedCells, keep, Math.floor(width / 2), Math.floor(height / 2), 1);
            }
        } else {
            // A clipped edge view may contain only part of a parser-reserved castle plot. The
            // fixed skeleton remains present; the full keep appears when the seat is centered.
        }
    }

    // FMG-authored building polygons are the primary town silhouette. A single formula landmark
    // can still accent the district mix, while towns with no vector coverage retain the original
    // two-landmark fallback.
    const desiredWardLandmarks = vectorPlan.buildings.length
        ? 1
        : settlement.walled ? 2 : 1;
    const wardOrder = [...(settlement.wards || [])]
        .filter((ward) => ward.district !== 'castle')
        .sort((left, right) => wardLandmarkPriority(right.district) - wardLandmarkPriority(left.district) ||
            left.ring - right.ring);
    let placedWardLandmarks = 0;
    for (const ward of wardOrder) {
        if (placedWardLandmarks >= desiredWardLandmarks) break;
        const areaCells = [];
        for (let row = settlement.wallBounds.minRow + 1; row < settlement.wallBounds.maxRow; row++) {
            for (let col = settlement.wallBounds.minCol + 1; col < settlement.wallBounds.maxCol; col++) {
                if (districtRows[row]?.[col] !== ward.district) continue;
                if (mutable[row]?.[col] === 'T' || isWaterSymbol(mutable[row]?.[col])) continue;
                areaCells.push({ col, row, district: ward.district });
            }
        }
        if (!areaCells.length) continue;
        const options = {
            rows: mutable.map((row) => row.join('')),
            elevationRows,
            inhibitorRows,
            districtRows,
            area: { cells: areaCells },
            districts: [ward.district],
            occupied: occupiedCells,
            seed: `${fixedSeed}:ward:${ward.ring}:${ward.district}`,
            townId: settlement.burg.name,
            minBuildings: 1,
            maxBuildings: 1,
            buffer: 0,
            maxInhibitor: 0.9
        };
        let plan = createBakedBuildingPlan(options);
        if (!plan.diagnostics.complete) {
            plan = createBakedBuildingPlan({
                ...options,
                compactFirst: true,
                relaxRoadAffinity: true
            });
        }
        if (!plan.buildings.length) continue;
        buildings.push(...plan.buildings);
        occupiedCells = plan.occupied;
        placedWardLandmarks++;
    }

    const minimumBakedBuildings = settlement.walled ? 2 : 1;
    if (buildings.length < minimumBakedBuildings) {
        const fallbackCells = [];
        for (let row = settlement.wallBounds.minRow + 1; row < settlement.wallBounds.maxRow; row++) {
            for (let col = settlement.wallBounds.minCol + 1; col < settlement.wallBounds.maxCol; col++) {
                if (!isBuildableSymbol(mutable[row]?.[col])) continue;
                fallbackCells.push({ col, row, district: districtRows[row]?.[col] || 'residential' });
            }
        }
        const remaining = minimumBakedBuildings - buildings.length;
        const fallback = createBakedBuildingPlan({
            rows: mutable.map((row) => row.join('')),
            elevationRows,
            inhibitorRows,
            districtRows,
            area: { cells: fallbackCells },
            occupied: occupiedCells,
            seed: `${fixedSeed}:compact-fallback`,
            townId: settlement.burg.name,
            minBuildings: remaining,
            maxBuildings: remaining,
            buffer: 0,
            maxInhibitor: 1,
            compactFirst: true,
            relaxRoadAffinity: true
        });
        if (fallback.buildings.length) {
            buildings.push(...fallback.buildings);
            occupiedCells = fallback.occupied;
            placedWardLandmarks += fallback.buildings.length;
        }
    }

    // Clipped coastal views can leave a legal cabin only in the keep's one-cell aesthetic
    // buffer. The buffer is not a structural constraint: rebuild occupancy from exact existing
    // footprints and reserved door landings, then run the same 4x5 minimum blueprint solver.
    // Walls, water, elevations, inhibitors and approaches are still validated by the library.
    if (buildings.length < minimumBakedBuildings) {
        const compactOccupied = new Set(inheritedOccupiedCells);
        const offsetX = Math.floor(width / 2);
        const offsetY = Math.floor(height / 2);
        for (const building of buildings) {
            reserveBuilding(compactOccupied, building, offsetX, offsetY, 0);
            const [approachCol, approachRow] = building.entrance?.approachGrid || [];
            if (Number.isFinite(approachCol) && Number.isFinite(approachRow)) {
                compactOccupied.add(`${approachCol},${approachRow}`);
            }
        }
        const fallbackCells = [];
        for (let row = settlement.wallBounds.minRow + 1; row < settlement.wallBounds.maxRow; row++) {
            for (let col = settlement.wallBounds.minCol + 1; col < settlement.wallBounds.maxCol; col++) {
                if (!isBuildableSymbol(mutable[row]?.[col])) continue;
                fallbackCells.push({ col, row, district: districtRows[row]?.[col] || 'residential' });
            }
        }
        const remaining = minimumBakedBuildings - buildings.length;
        const compactFallback = createBakedBuildingPlan({
            rows: mutable.map((row) => row.join('')),
            elevationRows,
            inhibitorRows,
            districtRows,
            area: { cells: fallbackCells },
            occupied: compactOccupied,
            seed: `${fixedSeed}:compact-adjacent-fallback`,
            townId: settlement.burg.name,
            minBuildings: remaining,
            maxBuildings: remaining,
            buffer: 0,
            maxInhibitor: 1,
            compactFirst: true,
            relaxRoadAffinity: true
        });
        if (compactFallback.buildings.length) {
            buildings.push(...compactFallback.buildings);
            occupiedCells = new Set([...occupiedCells, ...compactFallback.occupied]);
            placedWardLandmarks += compactFallback.buildings.length;
            compactAdjacencyFallbacks += compactFallback.buildings.length;
        }
    }

    return {
        buildings,
        occupied: occupiedCells,
        diagnostics: Object.freeze({
            requested: {
                min: vectorPlan.buildings.length + (settlement.castle && !vectorCastle ? 1 : 0) + desiredWardLandmarks,
                max: vectorPlan.buildings.length + (settlement.castle && !vectorCastle ? 1 : 0) + desiredWardLandmarks
            },
            placed: buildings.length,
            complete: buildings.length >= minimumBakedBuildings,
            fixedKeep: buildings.some((building) => building.blueprintId === 'castle-keep' || building.vectorCastle),
            vectorBuildings: vectorPlan.buildings.length,
            rejectedVectorBuildings: vectorPlan.rejected,
            vectorRejectionReasons: Object.freeze({ ...(vectorPlan.rejectionReasons || {}) }),
            wardLandmarks: placedWardLandmarks,
            compactAdjacencyFallbacks,
            blueprintIds: buildings.map((building) => building.blueprintId),
            strategy: compactAdjacencyFallbacks
                ? 'fixed-castle-plus-per-ward-with-compact-adjacency'
                : 'fixed-castle-plus-per-ward'
        })
    };
}

function createTownVectorBuildingPlan({
    mutable,
    elevationRows,
    settlement,
    occupied,
    width,
    height,
    fixedSeed
}) {
    const projected = settlement.townVector;
    if (!projected?.buildings?.length) {
        return { buildings: [], occupied: new Set(occupied || []), rejected: 0 };
    }
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const occupiedCells = new Set(occupied || []);
    const buildings = [];
    let rejected = 0;
    const rejectionReasons = {};
    const reject = (reason) => {
        rejected++;
        rejectionReasons[reason] = (rejectionReasons[reason] || 0) + 1;
    };
    const sources = [...projected.buildings].sort((left, right) => {
        const leftCastle = left.type === 'MANOR' && settlement.castle ? 1 : 0;
        const rightCastle = right.type === 'MANOR' && settlement.castle ? 1 : 0;
        return rightCastle - leftCastle ||
            right.width * right.height - left.width * left.height ||
            left.id.localeCompare(right.id);
    });

    for (const source of sources) {
        const rect = {
            col: source.minCol,
            row: source.minRow,
            width: source.width,
            height: source.height
        };
        const footprintCells = source.footprintCells.map((cell) => ({ x: cell.x, y: cell.y }));
        const worldCells = footprintCells.map((cell) => ({
            col: rect.col + cell.x,
            row: rect.row + cell.y
        }));
        if (worldCells.some((cell) => (
            cell.col < 0 || cell.row < 0 || cell.col >= width || cell.row >= height ||
            occupiedCells.has(`${cell.col},${cell.row}`) ||
            mutable[cell.row]?.[cell.col] === 'T' ||
            isWaterSymbol(mutable[cell.row]?.[cell.col]) ||
            !isLandSymbol(mutable[cell.row]?.[cell.col])
        ))) {
            reject('footprint-blocked');
            continue;
        }
        const elevations = worldCells.map((cell) => Number(elevationRows[cell.row]?.[cell.col]) || 0);
        const elevationSpan = Math.max(...elevations) - Math.min(...elevations);
        if (elevationSpan > 2) {
            reject('elevation-span');
            continue;
        }
        const entrance = chooseTownVectorEntrance(source, rect, mutable, occupiedCells);
        if (!entrance) {
            reject('entrance-blocked');
            continue;
        }
        const type = getTownVectorBuildingType(
            source.type,
            settlement,
            Boolean(settlement.castle && !buildings.some((building) => building.vectorCastle))
        );
        const hash = hashWaveSeed(`${fixedSeed}:burg-vector:${source.id}`);
        const interiorWidth = rect.width - 2;
        const interiorHeight = rect.height - 2;
        let stories = clampInteger(source.floors, 1, 2);
        let stairs = stories > 1
            ? createTownVectorStairs(source, entrance.door, interiorWidth, interiorHeight)
            : [];
        const style = getTownVectorWallStyle(source.wallTexture);
        const districtStyle = getBlueprintDistrictStyle(type.district);
        const makeBuilding = () => {
            const stairKeys = new Set(stairs.map((cell) => `${cell.x},${cell.y}`));
            const openCells = [];
            for (let y = 1; y < rect.height - 1; y++) {
                for (let x = 1; x < rect.width - 1; x++) {
                    if (!stairKeys.has(`${x},${y}`)) openCells.push({ x, y });
                }
            }
            return {
                id: `vector-${settlement.burg.id}-${source.id}`,
                obstructionTag: `building:burg-vector:${settlement.burg.id}:${source.id}`,
                name: `${settlement.burg.name} ${type.name}`,
                x: rect.col - offsetX,
                y: rect.row - offsetY,
                width: rect.width,
                height: rect.height,
                footprintCells,
                stories,
                style,
                doorStyle: ['painted', 'oak', 'iron'][hash % 3],
                door: { ...entrance.door },
                stairs: stairs.map((stair) => ({ ...stair })),
                stairCells: [],
                baseElevation: maxCountKey(
                    elevations.reduce((counts, value) => counts.set(value, (counts.get(value) || 0) + 1), new Map()),
                    0
                ),
                proceduralGenerated: true,
                vectorGenerated: true,
                enterable: true,
                preserveEntrance: true,
                sourceType: 'burg-vector',
                sourceBuildingId: source.id,
                townVectorHash: projected.vectorHash,
                vectorCastle: type.district === 'castle',
                blueprintId: type.district === 'castle' ? 'burg-vector-castle' : `burg-vector-${String(source.type).toLowerCase()}`,
                facadeVariant: hash % 17,
                district: type.district,
                districtPalette: {
                    accent: mixColorNumbers(parseHexColor(source.roofColor), settlement.accent, 0.2),
                    roofs: [...districtStyle.roofs]
                },
                activity: districtStyle.activity,
                archetype: type.archetype,
                architectureStyle: type.architectureStyle,
                roofStyle: getTownVectorRoofStyle(source.roofStyle, type),
                vectorStyle: {
                    wallTexture: source.wallTexture,
                    wallColor: source.color,
                    roofColor: source.roofColor,
                    sourcePolygon: source.sourcePolygon
                },
                entrance: {
                    grid: [entrance.door.x, entrance.door.y],
                    edge: entrance.door.edge,
                    approach: [entrance.approach.col - offsetX, entrance.approach.row - offsetY],
                    approachGrid: [entrance.approach.col, entrance.approach.row],
                    approachReserved: true
                },
                interior: {
                    minimumOpenSpan: [Math.min(interiorWidth, interiorHeight), Math.max(interiorWidth, interiorHeight)],
                    openCells,
                    floorHeightVoxels: 2
                },
                floors: Array.from({ length: stories }, (_, level) => ({
                    level,
                    rooms: [{
                        type: type.roomType,
                        gridRect: { x: 1, y: 1, width: interiorWidth, height: interiorHeight },
                        doors: level === 0 ? [{ grid: [entrance.door.x, entrance.door.y] }] : []
                    }]
                })),
                placementConstraints: {
                    source: 'fmg-burg-vector',
                    elevationSpan,
                    wallConfinement: projected.insideCellKeys.has(
                        `${rect.col + Math.floor(rect.width / 2)},${rect.row + Math.floor(rect.height / 2)}`
                    )
                }
            };
        };
        let building = makeBuilding();
        // A compact 2x3 cabin cannot surrender an interior cell to stairs. Preserve the authored
        // footprint and entrance, but render it as a single-storey cabin instead.
        if (!validateBakedBuilding(building).valid && stories > 1) {
            stories = 1;
            stairs = [];
            building = makeBuilding();
        }
        if (!validateBakedBuilding(building).valid) {
            reject('interior-invalid');
            continue;
        }
        buildings.push(building);
        for (const cell of worldCells) occupiedCells.add(`${cell.col},${cell.row}`);
        occupiedCells.add(`${entrance.approach.col},${entrance.approach.row}`);
    }

    return { buildings, occupied: occupiedCells, rejected, rejectionReasons };
}

function chooseTownVectorEntrance(source, rect, mutable, occupied) {
    const sourceDoor = {
        x: clampInteger(source.door?.x, 0, rect.width - 1),
        y: clampInteger(source.door?.y, 0, rect.height - 1),
        edge: source.door?.edge || 'south'
    };
    const candidates = [
        sourceDoor,
        { x: Math.floor(rect.width / 2), y: 0, edge: 'north' },
        { x: rect.width - 1, y: Math.floor(rect.height / 2), edge: 'east' },
        { x: Math.floor(rect.width / 2), y: rect.height - 1, edge: 'south' },
        { x: 0, y: Math.floor(rect.height / 2), edge: 'west' }
    ];
    const unique = new Set();
    for (const door of candidates) {
        const key = `${door.x},${door.y},${door.edge}`;
        if (unique.has(key)) continue;
        unique.add(key);
        const approach = getVectorDoorApproach(rect, door);
        const symbol = mutable[approach.row]?.[approach.col];
        if (!symbol || symbol === 'T' || isWaterSymbol(symbol)) continue;
        if (!isLandSymbol(symbol) || occupied.has(`${approach.col},${approach.row}`)) continue;
        return { door, approach };
    }
    return null;
}

function getVectorDoorApproach(rect, door) {
    if (door.edge === 'north') return { col: rect.col + door.x, row: rect.row - 1 };
    if (door.edge === 'east') return { col: rect.col + rect.width, row: rect.row + door.y };
    if (door.edge === 'west') return { col: rect.col - 1, row: rect.row + door.y };
    return { col: rect.col + door.x, row: rect.row + rect.height };
}

function createTownVectorStairs(source, door, interiorWidth, interiorHeight) {
    if (interiorWidth < 2 || interiorHeight < 2) return [];
    const candidates = [
        { x: 1, y: 1 },
        { x: interiorWidth, y: 1 },
        { x: interiorWidth, y: interiorHeight },
        { x: 1, y: interiorHeight }
    ].sort((left, right) => (
        Math.hypot(right.x - door.x, right.y - door.y) -
        Math.hypot(left.x - door.x, left.y - door.y)
    ));
    const authored = source.stairs?.[0];
    const preferred = authored && authored.x >= 1 && authored.y >= 1 &&
        authored.x <= interiorWidth && authored.y <= interiorHeight
        ? { x: authored.x, y: authored.y }
        : candidates[0];
    return [{
        ...preferred,
        direction: ({ north: 'south', east: 'west', south: 'north', west: 'east' })[door.edge] || 'north',
        level: 0
    }];
}

function getTownVectorBuildingType(type, settlement, useAsCastle = false) {
    if (useAsCastle) {
        return { name: 'Burg Keep', district: 'castle', archetype: 'manor', architectureStyle: 'keep', roomType: 'hall' };
    }
    if (type === 'MANOR') {
        return { name: 'Manor', district: 'civic', archetype: 'manor', architectureStyle: 'courtyard', roomType: 'hall' };
    }
    return ({
        CHURCH: { name: 'Sanctuary', district: 'civic', archetype: 'hall', architectureStyle: 'gabled', roomType: 'hall' },
        TAVERN: { name: 'Tavern', district: 'market', archetype: 'bayfront', architectureStyle: 'market', roomType: 'hall' },
        BLACKSMITH: { name: 'Forge', district: 'artisan', archetype: 'workshop', architectureStyle: 'workshop', roomType: 'workshop' },
        FARM_HOUSE: { name: 'Farmstead', district: 'garden', archetype: 'cottage', architectureStyle: 'cottage', roomType: 'residence' },
        HOUSE_LARGE: { name: 'Townhouse', district: 'residential', archetype: 'townhouse', architectureStyle: 'townhouse', roomType: 'residence' }
    })[type] || { name: 'House', district: 'residential', archetype: 'cottage', architectureStyle: 'cottage', roomType: 'residence' };
}

function getTownVectorWallStyle(texture) {
    if (texture === 'STONE' || texture === 'STUCCO') return 'stone';
    return 'timber';
}

function getTownVectorRoofStyle(roofStyle, type) {
    if (type.district === 'castle') return roofStyle === 'THATCHED' ? 'gabled' : 'slate';
    return ({ SLATE: 'slate', THATCHED: 'thatch', TILED: 'clay' })[roofStyle] || 'gabled';
}

function getFixedKeepRotations(settlement) {
    const edgeRotation = { north: 0, east: 1, south: 2, west: 3 };
    const innermostRing = [...(settlement.wallRings || [])]
        .sort((left, right) => Number(right.ring || 0) - Number(left.ring || 0))[0];
    const aligned = (innermostRing?.gates || [])
        .map((gate) => edgeRotation[gate.edge])
        .filter(Number.isFinite);
    return [...new Set([...aligned, 0, 1, 2, 3])];
}

function getFixedKeepCenters(settlement, width, height) {
    if (settlement.col < 5 || settlement.row < 5 ||
        settlement.col >= width - 5 || settlement.row >= height - 5) return [];
    return [{ col: settlement.col, row: settlement.row }];
}

function fixedBuildingHasOpenApproach(building, mutable) {
    const [approachCol, approachRow] = building.entrance?.approachGrid || [];
    const approachSymbol = mutable[approachRow]?.[approachCol];
    if (!approachSymbol || approachSymbol === 'T' || isWaterSymbol(approachSymbol)) return false;
    const offsetX = Math.floor((mutable[0]?.length || 0) / 2);
    const offsetY = Math.floor(mutable.length / 2);
    return (building.footprintCells || []).every((cell) => {
        const symbol = mutable[building.y + cell.y + offsetY]?.[building.x + cell.x + offsetX];
        return Boolean(symbol) && symbol !== 'T' && !isWaterSymbol(symbol);
    });
}

function fixedBuildingAvoidsOccupiedCells(building, occupied, width, height) {
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const footprintBlocked = (building.footprintCells || []).some((cell) =>
        occupied.has(`${building.x + cell.x + offsetX},${building.y + cell.y + offsetY}`));
    if (footprintBlocked) return false;
    const [approachCol, approachRow] = building.entrance?.approachGrid || [];
    return Number.isFinite(approachCol) && Number.isFinite(approachRow) &&
        !occupied.has(`${approachCol},${approachRow}`);
}

function createWardWaveAreas({ settlement, sites, bakedSiteIds = new Set(), totalMinimum }) {
    const groups = new Map();
    for (const site of sites) {
        const areaId = site.areaId || `settlement-${settlement.burg.id}-ward-open`;
        if (!groups.has(areaId)) groups.set(areaId, []);
        groups.get(areaId).push(site);
    }
    const fixedSiteIds = bakedSiteIds instanceof Set ? bakedSiteIds : new Set(bakedSiteIds || []);
    const fixedTotal = sites.filter((site) => fixedSiteIds.has(site.id)).length;
    const generatedMinimum = Math.max(0, Math.min(totalMinimum, sites.length) - fixedTotal);
    const totalOpenSites = Math.max(1, sites.length - fixedTotal);
    let remainingGeneratedMinimum = generatedMinimum;
    const areas = [...groups]
        .sort(([left], [right]) => String(left).localeCompare(String(right)))
        .map(([id, areaSites], index, all) => {
            const ward = settlement.wards.find((candidate) => id === wardAreaId(settlement, candidate)) ||
                getSettlementWardAt(settlement,
                    Math.round(areaSites[0].x + Math.floor(settlement.wallBounds.width / 2)),
                    Math.round(areaSites[0].y + Math.floor(settlement.wallBounds.height / 2)));
            const fixedInArea = areaSites.filter((site) => fixedSiteIds.has(site.id)).length;
            const openSitesInArea = areaSites.length - fixedInArea;
            const proportionalGenerated = index === all.length - 1
                ? remainingGeneratedMinimum
                : Math.min(
                    openSitesInArea,
                    Math.floor(generatedMinimum * openSitesInArea / totalOpenSites)
                );
            const generatedInArea = Math.min(openSitesInArea, proportionalGenerated);
            const minimumBuildings = fixedInArea + generatedInArea;
            remainingGeneratedMinimum -= generatedInArea;
            return {
                id,
                siteIds: areaSites.map((site) => site.id),
                minimumBuildings,
                walled: settlement.walled,
                priority: wardLandmarkPriority(ward?.district),
                district: ward?.district || areaSites[0].district || 'residential',
                wfcPriors: ward?.wfcPriors || {
                    buildingDensity: settlement.walled ? 0.78 : 0.52,
                    elevationVariance: settlement.walled ? 0.2 : 0.55,
                    archetypeWeights: {}
                }
            };
        });
    if (!areas.length) {
        areas.push({
            id: `settlement-${settlement.burg.id}-ward-open`,
            siteIds: [],
            minimumBuildings: 0,
            walled: settlement.walled,
            priority: 0,
            district: 'residential',
            wfcPriors: { buildingDensity: 0.58, elevationVariance: 0.4, archetypeWeights: {} }
        });
    }
    return areas;
}

function wardAreaId(settlement, ward) {
    return `settlement-${settlement.burg.id}-ward-${ward?.ring ?? 0}-${ward?.district || 'residential'}`;
}

function wardLandmarkPriority(district) {
    return ({ castle: 10, civic: 9, market: 8, harbor: 7, artisan: 5, residential: 4, garden: 3 })[district] || 1;
}

function createBakedWaveAnchors({
    buildings,
    settlement,
    fields,
    constraintField,
    offsetX,
    offsetY,
    width
}) {
    const sites = [];
    const modules = [];
    const fixed = new Map();
    const siteIds = new Set();
    for (const [index, building] of buildings.entries()) {
        const siteId = `burg-${settlement.burg.id}-fixed-baked-${index}`;
        const moduleId = `building-baked-${settlement.burg.id}-${index}`;
        const centerCol = building.x + offsetX + Math.floor(building.width / 2);
        const centerRow = building.y + offsetY + Math.floor(building.height / 2);
        const cellId = centerRow * width + centerCol;
        const field = fields[cellId] || {};
        const constraint = constraintField?.cells?.[cellId] || {};
        // The fixed WFC node represents landmark occupancy/adjacency. Its synthetic module uses
        // a centered door, while the actual baked building retains its validated authored edge
        // offset and separately reserved approach.
        const syntheticApproach = getRectDoorApproach({
            col: building.x,
            row: building.y,
            width: building.width,
            height: building.height
        }, building.door.edge);
        const isLandmark = ['castle-keep', 'clocktower', 'lighthouse', 'market-hall', 'civic-hall'].includes(building.blueprintId);
        const ward = settlement.wards.find((candidate) => candidate.district === building.district) ||
            settlement.wards[settlement.wards.length - 1] || null;
        const areaId = wardAreaId(settlement, ward);
        modules.push(Object.freeze({
            id: moduleId,
            label: building.name,
            kind: 'building',
            weight: 0.01,
            tags: Object.freeze([
                'land',
                'settlement',
                'baked',
                building.district || 'civic',
                ...(isLandmark ? ['landmark'] : [])
            ]),
            interiorWidth: Math.max(1, building.width - 2),
            interiorHeight: Math.max(1, building.height - 2),
            footprintWidth: building.width,
            footprintHeight: building.height
        }));
        const insideWalls = settlement.walled && isInsideWallBounds(
            building.x + offsetX + Math.floor(building.width / 2),
            building.y + offsetY + Math.floor(building.height / 2),
            settlement.wallBounds
        );
        sites.push({
            id: siteId,
            x: building.x,
            y: building.y,
            width: building.width,
            height: building.height,
            areaId,
            district: ward?.district || building.district || 'civic',
            wfcPriors: ward?.wfcPriors,
            allowedDoorEdges: [building.door.edge],
            reservedExteriorApproach: {
                edge: building.door.edge,
                x: syntheticApproach.col,
                y: syntheticApproach.row
            },
            ...(insideWalls ? { withinWalls: true } : { confinement: settlement.walled ? 0.58 : 0.66 }),
            geography: {
                land: 1,
                height: field.height,
                riverInfluence: field.riverInfluence,
                routeInfluence: Math.max(0.78, Number(field.routeInfluence) || 0),
                settlementInfluence: Math.max(0.92, Number(constraint.urbanization) || 0),
                treeCover: 0.18,
                inhibitor: Math.max(0.82, Number(constraint.inhibitor) || 0)
            }
        });
        fixed.set(siteId, moduleId);
        siteIds.add(siteId);
    }
    return { sites, modules, fixed, siteIds };
}

function applyContextualTerrainAssignments({
    assignment,
    sites,
    mutable,
    paletteRows,
    elevationRows,
    constraintField,
    settlement,
    offsetX,
    offsetY
}) {
    if (!(assignment instanceof Map)) return;
    const width = mutable[0]?.length || 0;
    const moduleById = new Map(CONTEXTUAL_WFC_MODULES.map((module) => [module.id, module]));
    for (const site of sites) {
        const moduleId = assignment.get(site.id);
        const module = moduleById.get(moduleId);
        if (!module || module.kind === 'building') continue;
        for (let localY = 0; localY < site.height; localY++) {
            for (let localX = 0; localX < site.width; localX++) {
                const col = site.x + offsetX + localX;
                const row = site.y + offsetY + localY;
                const constraint = constraintField?.cells?.[row * width + col];
                if (!mutable[row]?.[col] || constraint?.hardWater || mutable[row][col] === 'T') continue;
                if (moduleId === 'terrain-path') {
                    mutable[row][col] = 'R';
                    paletteRows[row][col] = 'path';
                } else if (moduleId === 'settlement-square') {
                    mutable[row][col] = ';';
                    paletteRows[row][col] = 'path';
                } else if (moduleId === 'terrain-grove') {
                    mutable[row][col] = 'F';
                    paletteRows[row][col] = paletteRows[row][col] || 'forest';
                } else if (moduleId === 'terrain-relief') {
                    mutable[row][col] = 'H';
                    elevationRows[row][col] = Math.min(5, (Number(elevationRows[row][col]) || 0) + 1);
                } else if (moduleId === 'terrain-water') {
                    mutable[row][col] = '~';
                    paletteRows[row][col] = 'coast';
                } else {
                    const localCol = col - settlement.col;
                    const localRow = row - settlement.row;
                    mutable[row][col] = (localCol + localRow) % 7 === 0 ? ',' : '.';
                }
            }
        }
    }
    smoothRoadElevations(mutable, elevationRows);
}

function getLegalParcelDoorEdges({ rect, mutable, occupied, constraintField, width, seed }) {
    const edges = ['north', 'east', 'south', 'west']
        .map((edge) => {
            const approach = getRectDoorApproach(rect, edge);
            const symbol = mutable[approach.row]?.[approach.col];
            const constraint = constraintField?.cells?.[approach.row * width + approach.col];
            if (!symbol || constraint?.hardWater || symbol === 'T' || isWaterSymbol(symbol)) return null;
            if (occupied?.has?.(`${approach.col},${approach.row}`)) return null;
            if (!['G', 'F', 'H', 'S', 'P', 'R', '.', ':', ';', ','].includes(symbol)) return null;
            const roadDistance = nearestSymbolDistance(mutable, approach.col, approach.row, new Set(['R', ';']), 4);
            if (roadDistance > 5) return null;
            return {
                edge,
                score: (['R', ';'].includes(symbol) ? 6 : 0)
                    + Math.max(0, 4 - roadDistance)
                    + keyedUnit(`${seed}:${edge}`) * 0.2
            };
        })
        .filter(Boolean)
        .sort((left, right) => right.score - left.score || left.edge.localeCompare(right.edge));
    return edges.map((entry) => entry.edge);
}

function getRectDoorApproach(rect, edge) {
    if (edge === 'north') return { col: rect.col + Math.floor(rect.width / 2), row: rect.row - 1 };
    if (edge === 'east') return { col: rect.col + rect.width, row: rect.row + Math.floor(rect.height / 2) };
    if (edge === 'west') return { col: rect.col - 1, row: rect.row + Math.floor(rect.height / 2) };
    return { col: rect.col + Math.floor(rect.width / 2), row: rect.row + rect.height };
}

function createContextualParcelSites({
    mutable,
    elevationRows,
    fields,
    constraintField,
    settlement,
    occupied,
    offsetX,
    offsetY,
    width,
    height,
    seed
}) {
    const candidates = [];
    const bounds = settlement.wallBounds;
    for (let row = bounds.minRow + 1; row <= bounds.maxRow - 4; row++) {
        for (let col = bounds.minCol + 1; col <= bounds.maxCol - 3; col++) {
            const localCol = col - settlement.col;
            const localRow = row - settlement.row;
            const hash = hashWaveSeed(`${seed}:parcel:${settlement.burg.id}:${localCol}:${localRow}`);
            const sizeClass = hash % 12;
            const smallRotated = ((hash >>> 4) % 2 === 1);
            const rectOptions = [{
                col,
                row,
                width: smallRotated ? 5 : 4,
                height: smallRotated ? 4 : 5
            }];
            if (settlement.walled || sizeClass >= 7) {
                const [largeWidth, largeHeight] = sizeClass < 10 ? [5, 6] : [6, 6];
                const largeRotated = largeWidth !== largeHeight && ((hash >>> 7) % 2 === 1);
                rectOptions.push({
                    col,
                    row,
                    width: largeRotated ? largeHeight : largeWidth,
                    height: largeRotated ? largeWidth : largeHeight
                });
            }
            for (const rect of rectOptions) {
                if (rect.col + rect.width >= bounds.maxCol || rect.row + rect.height >= bounds.maxRow) continue;
                if (bounds.insideCellKeys instanceof Set && !isRectInsideWallMask(rect, bounds)) continue;
                if (!canPlaceContextualParcel(rect, mutable, elevationRows, occupied)) continue;
                const allowedDoorEdges = getLegalParcelDoorEdges({
                    rect,
                    mutable,
                    occupied,
                    constraintField,
                    width,
                    seed: `${seed}:parcel-door:${settlement.burg.id}:${localCol}:${localRow}:${rect.width}x${rect.height}`
                });
                if (!allowedDoorEdges.length) continue;
                const centerCol = Math.round(rect.col + (rect.width - 1) / 2);
                const centerRow = Math.round(rect.row + (rect.height - 1) / 2);
                const roadDistance = nearestSymbolDistance(mutable, centerCol, centerRow, new Set(['R', ';']), 6);
                if (roadDistance > 6) continue;
                candidates.push({
                    rect,
                    allowedDoorEdges,
                    roadDistance,
                    score: roadDistance * (settlement.walled ? 0.18 : 1)
                        // Confinement should read as a town, not scattered cabins. Once slope,
                        // water, walls and a legal door approach all pass, prefer the larger lot
                        // inside walls; open fiefs retain the lighter small-lot bias.
                        + rect.width * rect.height * (settlement.walled ? -0.035 : 0.004)
                        + keyedUnit(
                            `${seed}:parcel-score:${settlement.burg.id}:${localCol}:${localRow}:${rect.width}x${rect.height}`
                        ) * (settlement.walled ? 0.2 : 0.7)
                });
            }
        }
    }
    candidates.sort((a, b) => a.score - b.score || a.rect.row - b.rect.row || a.rect.col - b.rect.col);

    const sites = [];
    const reserved = new Set(occupied instanceof Set ? occupied : []);
    const baseTarget = settlement.walled
        ? clampInteger(14 + Math.sqrt(Math.max(1, settlement.burg.population)) * 0.86, 16, 30)
        : clampInteger(5 + Math.sqrt(Math.max(1, settlement.burg.population)) * 0.48, 6, 14);
    // Source footprints are usually larger than formula cabins, so each displaces about one and
    // a half infill parcels. This keeps a compact burg with many authored buildings from becoming
    // visually overloaded while still leaving enough WFC sites to vary streets between sessions.
    const sourceBuildingCount = settlement.townVector?.buildings?.length || 0;
    const target = Math.max(
        settlement.walled ? 8 : 4,
        baseTarget - Math.ceil(sourceBuildingCount * 1.5)
    );
    for (const candidate of candidates) {
        if (sites.length >= target) break;
        if (!canPlaceContextualParcel(candidate.rect, mutable, elevationRows, reserved)) continue;
        const allowedDoorEdges = getLegalParcelDoorEdges({
            rect: candidate.rect,
            mutable,
            occupied: reserved,
            constraintField,
            width,
            seed: `${seed}:selected-door:${settlement.burg.id}:` +
                `${candidate.rect.col - settlement.col}:${candidate.rect.row - settlement.row}`
        });
        if (!allowedDoorEdges.length) continue;
        const allowedDoorEdge = allowedDoorEdges[0];
        const exteriorApproach = getRectDoorApproach(candidate.rect, allowedDoorEdge);
        const centerCol = Math.floor(candidate.rect.col + candidate.rect.width / 2);
        const centerRow = Math.floor(candidate.rect.row + candidate.rect.height / 2);
        const id = centerRow * width + centerCol;
        const field = fields[id] || {};
        const constraint = constraintField?.cells?.[id] || {};
        const siteId = `burg-${settlement.burg.id}-parcel-${sites.length}`;
        const ward = getSettlementWardAt(settlement, centerCol, centerRow) || settlement.wards[0] || null;
        sites.push({
            id: siteId,
            x: candidate.rect.col - offsetX,
            y: candidate.rect.row - offsetY,
            width: candidate.rect.width,
            height: candidate.rect.height,
            areaId: wardAreaId(settlement, ward),
            district: ward?.district || 'residential',
            wfcPriors: ward?.wfcPriors,
            allowedDoorEdges: [allowedDoorEdge],
            reservedExteriorApproach: {
                edge: allowedDoorEdge,
                x: exteriorApproach.col - offsetX,
                y: exteriorApproach.row - offsetY
            },
            ...(settlement.walled ? { withinWalls: true } : { confinement: 0.62 }),
            geography: {
                land: constraint.hardWater ? 0 : Math.max(0.82, Number(field.land) || 0),
                height: field.height,
                riverInfluence: field.riverInfluence,
                routeInfluence: Math.max(field.routeInfluence || 0, Math.max(0, 1 - candidate.roadDistance / 5)),
                settlementInfluence: Math.max(constraint.urbanization || 0, settlement.walled ? 0.94 : 0.66),
                treeCover: mutable[centerRow]?.[centerCol] === 'F' ? 0.82 : 0.24,
                inhibitor: settlement.walled ? Math.max(0.82, constraint.inhibitor || 0) : Math.max(0.58, constraint.inhibitor || 0)
            }
        });
        reserveRect(reserved, candidate.rect, 0);
        reserved.add(`${exteriorApproach.col},${exteriorApproach.row}`);
    }
    return sites;
}

function isRectInsideWallMask(rect, bounds) {
    for (let row = rect.row; row < rect.row + rect.height; row++) {
        for (let col = rect.col; col < rect.col + rect.width; col++) {
            if (!isInsideWallBounds(col, row, bounds)) return false;
        }
    }
    return true;
}

function canPlaceContextualParcel(rect, mutable, elevationRows, occupied) {
    const elevations = [];
    for (let row = rect.row; row < rect.row + rect.height; row++) {
        for (let col = rect.col; col < rect.col + rect.width; col++) {
            if (!isBuildableSymbol(mutable[row]?.[col]) || occupied?.has?.(`${col},${row}`)) return false;
            elevations.push(Number(elevationRows[row]?.[col]) || 0);
        }
    }
    return elevations.length > 0 && Math.max(...elevations) - Math.min(...elevations) <= 1;
}

function finalizeContextualBuilding({ building, settlement, indexInTown, elevationRows, offsetX, offsetY, seed }) {
    const hash = hashWaveSeed(`${seed}:contextual-building:${settlement.burg.id}:${building.siteId}`);
    const interior = building.interior || {
        x: 1,
        y: 1,
        width: Math.max(2, building.width - 2),
        height: Math.max(3, building.height - 2)
    };
    const stories = building.wfcModuleId === 'building-hall' ? 2 : 1;
    const style = hash % 3 === 0 || building.wfcModuleId === 'building-hall'
        ? 'stone'
        : building.wfcModuleId === 'building-cottage'
            ? 'storybook'
            : 'timber';
    const roomType = building.wfcModuleId === 'building-workshop'
        ? 'workshop'
        : building.wfcModuleId === 'building-shop'
            ? 'shop'
            : building.wfcModuleId === 'building-hall'
                ? 'hall'
                : 'common';
    const lot = { col: building.x + offsetX, row: building.y + offsetY };
    const stairs = stories > 1
        ? [{ x: Math.max(1, building.width - 2), y: Math.max(1, building.height - 2), direction: 'north' }]
        : [];
    return {
        ...building,
        id: `wfc-${settlement.burg.id}-${indexInTown}-${hash.toString(16).slice(0, 6)}`,
        obstructionTag: `building:wfc:${settlement.burg.id}:${indexInTown}`,
        name: `${settlement.burg.name} ${building.name}`,
        stories,
        style,
        doorStyle: ['oak', 'painted', 'iron'][hash % 3],
        stairs,
        stairCells: [],
        baseElevation: dominantFootprintElevation(lot, building.footprintCells, elevationRows),
        proceduralGenerated: true,
        wfcGenerated: true,
        baked: false,
        preserveEntrance: true,
        enterable: true,
        sourceType: 'contextual-building-wfc',
        facadeVariant: hash % 17,
        interior: {
            ...interior,
            minimumOpenSpan: [Math.min(interior.width, interior.height), Math.max(interior.width, interior.height)],
            openCells: building.interiorCells.map((cell) => ({ ...cell })),
            floorHeightVoxels: 2
        },
        floors: Array.from({ length: stories }, (_, level) => ({
            level,
            rooms: [{
                type: roomType,
                gridRect: { x: interior.x, y: interior.y, width: interior.width, height: interior.height },
                doors: level === 0 ? [{ grid: [building.door.x, building.door.y] }] : []
            }]
        }))
    };
}

function applySettlementWave(buildings, mutableRows, elevationRows, settlement, seed) {
    if (!buildings.length) return;
    try {
        const planned = planTownWave({
            buildings,
            rows: mutableRows,
            elevationRows,
            seed: `${seed}:settlement`,
            townId: settlement.burg.id,
            archetypes: SETTLEMENT_ARCHETYPES,
            landmarkArchetypes: LANDMARK_ARCHETYPES
        });
        for (const building of buildings) {
            const assignment = planned.assignments.get(building.id);
            if (!assignment) continue;
            const district = building.district || assignment.district;
            const districtStyle = getBlueprintDistrictStyle(district);
            building.district = district;
            building.districtPalette = {
                ...assignment.palette,
                roofs: [...districtStyle.roofs],
                accent: mixColorNumbers(districtStyle.accent, settlement.accent, 0.38)
            };
            building.activity = districtStyle.activity || assignment.activity;
            building.archetype = contextualArchetype(building.wfcModuleId, district, assignment.archetype);
            building.architectureStyle = building.archetype;
            const roofs = districtStyle.roofs;
            building.roofStyle = roofs[hashWaveSeed(`${seed}:${building.id}:roof`) % roofs.length];
        }
    } catch (error) {
        if (!(error instanceof WaveFunctionCollapseError)) throw error;
        for (const [index, building] of buildings.entries()) {
            building.district = building.district || (index === 0 ? 'civic' : 'residential');
            const style = getBlueprintDistrictStyle(building.district);
            building.archetype = contextualArchetype(building.wfcModuleId, building.district, index === 0 ? 'hall' : 'cottage');
            building.architectureStyle = building.archetype;
            building.roofStyle = style.roofs[hashWaveSeed(`${seed}:${building.id}`) % style.roofs.length];
            building.districtPalette = { accent: mixColorNumbers(style.accent, settlement.accent, 0.38), roofs: [...style.roofs] };
        }
    }
}

function getBlueprintDistrictStyle(district) {
    return ({
        castle: { accent: 0x2f6fce, roofs: ['slate', 'copper', 'tower'], activity: 'guard' },
        civic: { accent: 0xf2c35a, roofs: ['copper', 'slate', 'tower'], activity: 'gather' },
        market: { accent: 0xf07b4f, roofs: ['market', 'clay', 'copper'], activity: 'trade' },
        residential: { accent: 0x4fb7a7, roofs: ['gabled', 'clay', 'slate'], activity: 'home' },
        artisan: { accent: 0xb56d43, roofs: ['clay', 'slate', 'thatch'], activity: 'craft' },
        garden: { accent: 0x77b84e, roofs: ['thatch', 'gabled', 'copper'], activity: 'grow' },
        harbor: { accent: 0x2fa7c4, roofs: ['copper', 'slate', 'clay'], activity: 'dock' }
    })[district] || { accent: 0x4fb7a7, roofs: ['gabled', 'clay', 'slate'], activity: 'home' };
}

function contextualArchetype(moduleId, district, fallback) {
    if (district === 'castle') return 'manor';
    return ({
        'building-cabin': 'cottage',
        'building-cottage': 'cottage',
        'building-shop': 'bayfront',
        'building-house': 'townhouse',
        'building-workshop': 'workshop',
        'building-hall': 'hall'
    })[moduleId] || fallback || 'cottage';
}

function synthesizeDecorations({ rows, paletteRows, fields, buildings, settlements, skeleton, seed, width, height }) {
    const decorations = [];
    const blocked = new Set();
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (const building of buildings) reserveBuilding(blocked, building, offsetX, offsetY, 1);
    for (const settlement of settlements) {
        if (settlement.blueprint?.hierarchy === 'seat') {
            const plaza = findWardDecorationCell({ rows, blocked, settlement, district: 'market', width, height, salt: 0 }) ||
                findWardDecorationCell({ rows, blocked, settlement, district: 'civic', width, height, salt: 0 });
            if (plaza) {
                decorations.push({
                    type: 'fountain', x: plaza.col - offsetX, y: plaza.row - offsetY,
                    matrixLandmark: true, district: 'market', accent: 0xf2c35a, blueprintFixed: true
                });
                for (const [index, type] of ['stall', 'stall', 'lantern_cluster'].entries()) {
                    const cell = findWardDecorationCell({
                        rows, blocked, settlement, district: 'market', width, height,
                        salt: index + 2, near: plaza
                    });
                    if (!cell) continue;
                    decorations.push({
                        type, x: cell.col - offsetX, y: cell.row - offsetY,
                        rotation: index % 2 ? -Math.PI / 2 : Math.PI / 2,
                        matrixLandmark: true, district: 'market',
                        accent: [0xf07b4f, 0x4fb7a7, 0xf2c35a][index], blueprintFixed: true
                    });
                }
            }
            for (let index = 0; index < 2; index++) {
                const castleCell = findWardDecorationCell({
                    rows, blocked, settlement, district: 'castle', width, height, salt: 7 + index
                });
                if (!castleCell) continue;
                decorations.push({
                    type: index === 0 ? 'banner' : 'lantern_cluster',
                    x: castleCell.col - offsetX,
                    y: castleCell.row - offsetY,
                    matrixLandmark: true,
                    district: 'castle',
                    accent: index === 0 ? 0x2f6fce : 0xf2c35a,
                    blueprintFixed: true
                });
            }
            for (const gate of settlement.gates || []) {
                decorations.push({
                    type: 'archway',
                    x: gate.col - offsetX,
                    y: gate.row - offsetY,
                    rotation: gate.edge === 'east' || gate.edge === 'west' ? Math.PI / 2 : 0,
                    matrixLandmark: true,
                    district: 'civic',
                    accent: settlement.accent,
                    gatehouse: true,
                    grand: gate.grand === true,
                    widthTiles: gate.widthTiles || 1,
                    blueprintFixed: true
                });
            }
        } else {
            const center = findWardDecorationCell({
                rows, blocked, settlement, district: settlement.wards[0]?.district, width, height, salt: settlement.burg.id
            });
            if (center) {
                const liege = settlement.blueprint?.liegeBurgId;
                decorations.push(
                    {
                        type: 'well', x: center.col - offsetX, y: center.row - offsetY,
                        district: 'residential', accent: settlement.accent, blueprintFixed: true
                    },
                    {
                        type: 'sign', x: center.col + 2 - offsetX, y: center.row - offsetY,
                        district: 'residential', destinations: [settlement.burg.id, liege].filter(Boolean), blueprintFixed: true
                    },
                    {
                        type: hashWaveSeed(`${seed}:fief-kit:${settlement.burg.id}`) % 2 ? 'garden' : 'cart',
                        x: center.col - 2 - offsetX, y: center.row + 1 - offsetY,
                        district: 'garden', blueprintFixed: true
                    }
                );
            }
        }
    }

    const waterfallTops = [...(skeleton?.cells?.values?.() || [])]
        .filter((cell) => cell.kind === 'waterfall' && cell.tier === 0)
        .sort((left, right) => left.id - right.id);
    for (const fixed of waterfallTops) {
        decorations.push({
            type: 'waterfall',
            x: fixed.col - offsetX,
            y: fixed.row - offsetY,
            rotation: edgeRotation(fixed.edge),
            direction: fixed.edge,
            dropTiers: fixed.dropTiers,
            widthTiles: fixed.widthTiles,
            intensity: fixed.intensity,
            plungePool: fixed.plungePool,
            directiveId: fixed.directiveId,
            blueprintFixed: true,
            district: 'wilderness'
        });
    }
    const dockAnchors = [...(skeleton?.cells?.values?.() || [])]
        .filter((cell) => cell.kind === 'dock' && cell.step === 0)
        .sort((left, right) => left.id - right.id);
    for (const fixed of dockAnchors) {
        decorations.push({
            type: 'dock', x: fixed.col - offsetX, y: fixed.row - offsetY,
            rotation: edgeRotation(fixed.edge), direction: fixed.edge, lengthTiles: fixed.length,
            district: 'harbor', blueprintFixed: true
        });
    }
    for (let row = 1; row < height - 1 && decorations.length < MAX_DECORATIONS; row++) {
        for (let col = 1; col < width - 1 && decorations.length < MAX_DECORATIONS; col++) {
            const key = `${col},${row}`;
            if (blocked.has(key) || !isDecorationGround(rows[row]?.[col])) continue;
            const palette = paletteRows[row]?.[col] || 'meadow';
            const globalKey = globalFieldSampleKey(fields[row * width + col]);
            const unit = keyedUnit(`${seed}:decor:${globalKey}`);
            const density = ['forest', 'jungle', 'taiga'].includes(palette) ? 0.082 : palette === 'meadow' ? 0.036 : 0.022;
            if (unit >= density) continue;
            if (decorations.some((item) => Math.hypot(item.x - (col - offsetX), item.y - (row - offsetY)) < 1.8)) continue;
            decorations.push({
                type: getDecorationType(palette, keyedUnit(`${seed}:decor-type:${globalKey}`)),
                x: col - offsetX,
                y: row - offsetY,
                rotation: (hashWaveSeed(`${seed}:decor-rotation:${globalKey}`) % 4) * Math.PI / 2,
                biome: palette
            });
        }
    }
    return decorations;
}

function findWardDecorationCell({ rows, blocked, settlement, district, width, height, salt = 0, near = null }) {
    const candidates = [];
    for (let row = Math.max(1, settlement.wallBounds.minRow + 1); row < Math.min(height - 1, settlement.wallBounds.maxRow); row++) {
        for (let col = Math.max(1, settlement.wallBounds.minCol + 1); col < Math.min(width - 1, settlement.wallBounds.maxCol); col++) {
            if (blocked.has(`${col},${row}`)) continue;
            if (!['G', 'F', 'H', 'S', 'P', 'R', '.', ',', ';'].includes(rows[row]?.[col])) continue;
            const ward = getSettlementWardAt(settlement, col, row);
            if (district && ward?.district !== district) continue;
            const target = near || { col: settlement.col, row: settlement.row };
            const localCol = col - settlement.col;
            const localRow = row - settlement.row;
            candidates.push({
                col,
                row,
                score: Math.hypot(col - target.col, row - target.row) +
                    keyedUnit(
                        `${settlement.burg.id}:ward-decoration:${district}:${salt}:${localCol}:${localRow}`
                    ) * 3
            });
        }
    }
    return candidates.sort((left, right) => left.score - right.score || left.row - right.row || left.col - right.col)[0] || null;
}

function edgeRotation(edge) {
    return edge === 'east' ? Math.PI / 2 : edge === 'south' ? Math.PI : edge === 'west' ? -Math.PI / 2 : 0;
}

function createVisualVariantRows({ rows, paletteRows, seed, centerX, centerY, width, height }) {
    return Array.from({ length: height }, (_, row) => Array.from({ length: width }, (_, col) => {
        const globalX = centerX + (col - Math.floor(width / 2)) * WORLD_SAMPLE_SCALE;
        const globalY = centerY + (row - Math.floor(height / 2)) * WORLD_SAMPLE_SCALE;
        const paletteSalt = hashWaveSeed(`${paletteRows[row][col]}:${rows[row][col]}`);
        const patchNoise = valueNoise(globalX, globalY, 4.6, seed + paletteSalt);
        const value = Math.max(0, Math.min(5, Math.floor((patchNoise + 1) * 3)));
        return value.toString(36);
    }).join(''));
}

function getDominantBiome(fields) {
    const counts = new Map();
    const stateCounts = new Map();
    const cultureCounts = new Map();
    for (const field of fields) {
        if (field.land < 0.5) continue;
        counts.set(field.biome, (counts.get(field.biome) || 0) + 1);
        stateCounts.set(field.state, (stateCounts.get(field.state) || 0) + 1);
        cultureCounts.set(field.culture, (cultureCounts.get(field.culture) || 0) + 1);
    }
    const biome = maxCountKey(counts, 4);
    return {
        id: biome,
        name: getBiomeName(biome, ACTIVE_GEOGRAPHY.biomes),
        state: maxCountKey(stateCounts, 0),
        culture: maxCountKey(cultureCounts, 0)
    };
}

function getDominantPalette(paletteRows, rows) {
    const counts = new Map();
    for (let y = 0; y < paletteRows.length; y++) {
        for (let x = 0; x < (paletteRows[y]?.length || 0); x++) {
            if (isWaterSymbol(rows[y]?.[x])) continue;
            const palette = paletteRows[y][x];
            counts.set(palette, (counts.get(palette) || 0) + 1);
        }
    }
    return maxCountKey(counts, 'meadow');
}

function findNearestBurg(index, x, y) {
    let best = null;
    for (const burg of index.burgs) {
        const distance = Math.hypot(burg.x - x, burg.y - y);
        if (!best || distance < best.distance) best = { burg, distance };
    }
    return best;
}

function getRegionName(nearest, dominantBiome, x, y) {
    if (nearest && nearest.distance <= 20) return nearest.burg.name;
    const suffixes = ['Reach', 'Wilds', 'Vale', 'Isles', 'Frontier'];
    return `${dominantBiome.name} ${suffixes[hashWaveSeed(`${x}:${y}:${dominantBiome.name}`) % suffixes.length]}`;
}

function getThemeSkyColor(palette) {
    return ({
        desert: '#78d9f4', savanna: '#84dff1', coast: '#75dcff', jungle: '#75d7d1',
        wetland: '#82d9d3', taiga: '#9ad7e8', tundra: '#b7e8ff', alpine: '#a9dcff', crystal: '#b6c8ff'
    })[palette] || '#86dcff';
}

function getThemeFogColor(palette) {
    return ({
        desert: '#e8f2c5', savanna: '#d4efc1', coast: '#c9f4ff', jungle: '#b9ead6',
        wetland: '#c1ebde', taiga: '#d4eef2', tundra: '#e7f7ff', alpine: '#ddecff', crystal: '#ded8ff'
    })[palette] || '#d3f3df';
}

function mixRegionalAccent(stateColor, cultureColor) {
    return mixColorNumbers(parseHexColor(stateColor), parseHexColor(cultureColor), 0.38);
}

function mixColorNumbers(colorA, colorB, amount = 0.5) {
    const a = Number.isFinite(Number(colorA)) ? Number(colorA) : 0x65d58d;
    const b = Number.isFinite(Number(colorB)) ? Number(colorB) : 0x7d76e8;
    const mixChannel = (shift) => Math.round(
        ((a >> shift) & 0xff) * (1 - amount) + ((b >> shift) & 0xff) * amount
    );
    return (mixChannel(16) << 16) | (mixChannel(8) << 8) | mixChannel(0);
}

function parseHexColor(value) {
    const normalized = String(value || '').replace('#', '');
    const parsed = Number.parseInt(normalized, 16);
    return Number.isFinite(parsed) ? parsed : 0x65d58d;
}

function getDecorationType(palette, value) {
    const families = {
        forest: ['tree', 'tree', 'shrub', 'plant'],
        jungle: ['tree', 'plant', 'shrub', 'garden'],
        taiga: ['tree', 'tree', 'boulder', 'shrub'],
        tundra: ['boulder', 'shrub', 'boulder'],
        alpine: ['boulder', 'boulder', 'shrub'],
        crystal: ['boulder', 'boulder', 'plant'],
        coast: ['plant', 'boulder', 'shrub'],
        desert: ['boulder', 'shrub', 'boulder'],
        savanna: ['tree', 'shrub', 'plant'],
        wetland: ['plant', 'shrub', 'tree'],
        meadow: ['plant', 'tree', 'shrub', 'garden']
    };
    const family = families[palette] || families.meadow;
    return family[Math.min(family.length - 1, Math.floor(value * family.length))];
}

function reserveRect(set, rect, padding = 0) {
    for (let row = rect.row - padding; row < rect.row + rect.height + padding; row++) {
        for (let col = rect.col - padding; col < rect.col + rect.width + padding; col++) set.add(`${col},${row}`);
    }
}

function reserveBuilding(set, building, offsetX, offsetY, padding = 0) {
    reserveRect(set, {
        col: building.x + offsetX,
        row: building.y + offsetY,
        width: building.width,
        height: building.height
    }, padding);
}

function dominantFootprintElevation(lot, cells, elevationRows) {
    const counts = new Map();
    for (const cell of cells) {
        const elevation = Number(elevationRows[lot.row + cell.y]?.[lot.col + cell.x]) || 0;
        counts.set(elevation, (counts.get(elevation) || 0) + 1);
    }
    return maxCountKey(counts, 0);
}

function smoothRoadElevations(mutable, elevationRows) {
    for (let pass = 0; pass < 3; pass++) {
        for (let row = 0; row < mutable.length; row++) {
            for (let col = 0; col < (mutable[row]?.length || 0); col++) {
                if (!['R', ';'].includes(mutable[row][col])) continue;
                const roadNeighbors = CARDINALS
                    .map(({ x, y }) => ['R', ';'].includes(mutable[row + y]?.[col + x]) ? elevationRows[row + y]?.[col + x] : null)
                    .filter(Number.isFinite);
                if (!roadNeighbors.length) continue;
                const minimum = Math.min(...roadNeighbors);
                if (elevationRows[row][col] > minimum + 1) elevationRows[row][col] = minimum + 1;
            }
        }
    }
}

function nearestSymbolDistance(rows, centerCol, centerRow, symbols, radius) {
    let best = radius + 1;
    for (let row = centerRow - radius; row <= centerRow + radius; row++) {
        for (let col = centerCol - radius; col <= centerCol + radius; col++) {
            if (!symbols.has(rows[row]?.[col])) continue;
            best = Math.min(best, Math.abs(col - centerCol) + Math.abs(row - centerRow));
        }
    }
    return best;
}

function weightedVote(weighted, key) {
    const totals = new Map();
    for (const entry of weighted) {
        const value = Number(entry.cell[key]) || 0;
        totals.set(value, (totals.get(value) || 0) + entry.weight);
    }
    return maxCountKey(totals, 0);
}

function maxCountKey(counts, fallback) {
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))[0]?.[0] ?? fallback;
}

function fractalNoise(x, y, seed) {
    return valueNoise(x, y, 34, seed) * 0.58 + valueNoise(x, y, 15, seed + 1013) * 0.29 + valueNoise(x, y, 7, seed + 7919) * 0.13;
}

function valueNoise(x, y, scale, seed) {
    const gx = x / scale;
    const gy = y / scale;
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const tx = smoothStep(gx - x0);
    const ty = smoothStep(gy - y0);
    const v00 = signedHash(seed, x0, y0);
    const v10 = signedHash(seed, x0 + 1, y0);
    const v01 = signedHash(seed, x0, y0 + 1);
    const v11 = signedHash(seed, x0 + 1, y0 + 1);
    return lerp(lerp(v00, v10, tx), lerp(v01, v11, tx), ty);
}

function signedHash(seed, x, y) {
    return keyedUnit(`${seed}:${x}:${y}`) * 2 - 1;
}

function keyedUnit(value) {
    return (hashWaveSeed(value) + 0.5) / 4294967296;
}

function bucketKey(x, y, bucketSize) {
    return `${Math.floor(Number(x) / bucketSize)},${Math.floor(Number(y) / bucketSize)}`;
}

function smoothStep(value) {
    return value * value * (3 - 2 * value);
}

function lerp(a, b, amount) {
    return a + (b - a) * amount;
}

function isLandSymbol(symbol) {
    return ['G', 'F', 'H', 'M', 'S', 'P', 'R', '.', ':', ';', ','].includes(symbol);
}

function isBuildableSymbol(symbol) {
    return ['G', 'F', 'H', 'S', 'P', '.', ','].includes(symbol);
}

function isDecorationGround(symbol) {
    return ['G', 'F', 'H', 'S', 'P', ',', '.'].includes(symbol);
}

function isWaterSymbol(symbol) {
    return ['W', '~', 'B', 'I'].includes(symbol);
}

function snapWorldSampleCoordinate(value) {
    return round(Math.round(Number(value) / WORLD_SAMPLE_SCALE) * WORLD_SAMPLE_SCALE, 6);
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

function clampNumber(value, minimum, maximum, fallback = minimum) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(minimum, Math.min(maximum, number));
}

function round(value, precision = 2) {
    const factor = 10 ** precision;
    return Math.round(Number(value) * factor) / factor;
}
