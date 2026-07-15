import { ACTIVE_GEOGRAPHY, ACTIVE_WORLD } from './ActiveWorldData.js';
import {
    createWaveRandom,
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
import { createStairFlight, STAIR_CONFIGURATION } from './StructuralMatrixRules.js';
import {
    createSettlementConstraintAnchors,
    createWallBounds,
    createWorldConstraintField,
    getWallGateCells,
    isInsideWallBounds,
    isWallBoundaryCell
} from './WorldConstraintField.js';
import {
    CONTEXTUAL_WFC_MODULES,
    solveContextualBuildingWFC
} from './ContextualBuildingWFC.js';
import { createBakedBuildingPlan } from './BakedBuildingLibrary.js';

export const GEOGRAPHIC_WORLD_VIEW_WIDTH = 80;
export const GEOGRAPHIC_WORLD_VIEW_HEIGHT = 60;
export const WORLD_SAMPLE_SCALE = 0.64;
export const TERRAIN_WFC_CHUNK_SIZE = 8;

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
    variant = 0
} = {}) {
    const safeWidth = clampInteger(width, 32, 112);
    const safeHeight = clampInteger(height, 24, 84);
    const centerX = clampNumber(worldX, 0, ACTIVE_WORLD.width, ACTIVE_WORLD.width / 2);
    const centerY = clampNumber(worldY, 0, ACTIVE_WORLD.height, ACTIVE_WORLD.height / 2);
    const safeVariant = Math.max(0, Math.floor(Number(variant) || 0));
    const seed = hashWaveSeed(`${ACTIVE_WORLD.seed}:${round(centerX, 3)}:${round(centerY, 3)}:${safeVariant}`);
    const index = getGeographyIndex();
    const fields = sampleRegionFields(index, {
        centerX,
        centerY,
        width: safeWidth,
        height: safeHeight,
        seed
    });
    const rawSettlementAnchors = createSettlementConstraintAnchors({
        burgs: index.burgs,
        centerX,
        centerY,
        width: safeWidth,
        height: safeHeight,
        sampleScale: WORLD_SAMPLE_SCALE
    });
    const settlementAnchors = stabilizeSettlementAnchors({
        anchors: rawSettlementAnchors,
        fields,
        width: safeWidth,
        height: safeHeight
    });
    const constraints = createWorldConstraintField({
        fields,
        width: safeWidth,
        height: safeHeight,
        settlements: settlementAnchors
    });
    const collapse = collapseTerrain(fields, safeWidth, safeHeight, seed, constraints);
    const elevationRows = createElevationRows(fields, collapse.tileIds, safeWidth, safeHeight, seed, constraints);
    const rows = createTerrainRows(collapse.tileIds, safeWidth, safeHeight);
    const paletteRows = createPaletteRows(collapse.tileIds, fields, safeWidth, safeHeight);

    overlayGeographicWaterAndRoutes(rows, paletteRows, elevationRows, fields, safeWidth, safeHeight);
    const settlement = synthesizeSettlements({
        rows,
        paletteRows,
        elevationRows,
        fields,
        centerX,
        centerY,
        width: safeWidth,
        height: safeHeight,
        seed,
        variant: safeVariant,
        index,
        anchors: settlementAnchors,
        constraintField: constraints
    });
    const decorations = synthesizeDecorations({
        rows,
        paletteRows,
        elevationRows,
        buildings: settlement.buildings,
        settlements: settlement.settlements,
        seed,
        width: safeWidth,
        height: safeHeight
    });
    const visualVariantRows = createVisualVariantRows({
        rows,
        paletteRows,
        seed,
        centerX,
        centerY,
        width: safeWidth,
        height: safeHeight
    });
    const dominantBiome = getDominantBiome(fields);
    const dominantPalette = getDominantPalette(paletteRows, rows);
    const nearestBurg = findNearestBurg(index, centerX, centerY);
    const regionName = getRegionName(nearestBurg, dominantBiome, centerX, centerY);
    const stateColor = index.stateById.get(dominantBiome.state)?.color || '#65d58d';
    const cultureColor = index.cultureById.get(dominantBiome.culture)?.color || '#7d76e8';
    const contentHash = `${ACTIVE_WORLD.contentHash}:${seed.toString(16).padStart(8, '0')}`;
    const sourceAnchor = nearestBurg && nearestBurg.distance <= Math.max(safeWidth, safeHeight) * WORLD_SAMPLE_SCALE * 0.58
        ? nearestBurg.burg
        : null;

    return {
        rows,
        elevationRows,
        paletteRows,
        visualVariantRows,
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
            centerX,
            centerY,
            originX: centerX - safeWidth * WORLD_SAMPLE_SCALE / 2,
            originY: centerY - safeHeight * WORLD_SAMPLE_SCALE / 2,
            locations: settlement.settlements.map((entry) => `burg-${entry.burg.id}`),
            source: ACTIVE_WORLD.source,
            image: ACTIVE_WORLD.image,
            sampleScale: WORLD_SAMPLE_SCALE
        },
        generation: {
            mode: 'geographic-wfc',
            macroReference: 'FMG global cell graph',
            townPayloadsRead: false,
            terrainWfc: collapse.diagnostics,
            buildingWfc: settlement.diagnostics,
            constraintField: constraints.diagnostics,
            settlements: settlement.settlements.length,
            coupledTerrainAndBuildings: true,
            minimumInterior: '2x3'
        }
    };
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
                row,
                col
            };
        }
    }
    return fields;
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

function collapseTerrain(fields, width, height, seed, constraintField) {
    const tileIds = new Array(width * height);
    let chunks = 0;
    let fallbacks = 0;
    for (let chunkY = 0; chunkY < height; chunkY += TERRAIN_WFC_CHUNK_SIZE) {
        for (let chunkX = 0; chunkX < width; chunkX += TERRAIN_WFC_CHUNK_SIZE) {
            chunks++;
            const chunkWidth = Math.min(TERRAIN_WFC_CHUNK_SIZE, width - chunkX);
            const chunkHeight = Math.min(TERRAIN_WFC_CHUNK_SIZE, height - chunkY);
            const nodes = [];
            const domains = new Map();
            const fixed = new Map();
            for (let localY = 0; localY < chunkHeight; localY++) {
                for (let localX = 0; localX < chunkWidth; localX++) {
                    const col = chunkX + localX;
                    const row = chunkY + localY;
                    const id = row * width + col;
                    const neighbors = [];
                    if (localX > 0) neighbors.push({ id: id - 1, direction: 'west' });
                    if (localX + 1 < chunkWidth) neighbors.push({ id: id + 1, direction: 'east' });
                    if (localY > 0) neighbors.push({ id: id - width, direction: 'north' });
                    if (localY + 1 < chunkHeight) neighbors.push({ id: id + width, direction: 'south' });
                    nodes.push({ id, neighbors });
                    const constraint = constraintField?.cells?.[id];
                    const domain = getConstrainedTerrainDomain(fields[id], constraint);
                    domains.set(id, domain);
                    const fixedTerrain = getFixedTerrainModule(id, fields, constraintField, width, height);
                    if (fixedTerrain && domain.includes(fixedTerrain)) fixed.set(id, fixedTerrain);
                }
            }
            try {
                const assignment = solveWaveFunctionCollapse({
                    nodes,
                    tiles: GEOGRAPHIC_TILES,
                    domains,
                    fixed,
                    compatible: terrainWaveCompatible,
                    seed: `${seed}:terrain:${chunkX}:${chunkY}`,
                    nodeWeights: (nodeId, tileId) => getConstrainedTerrainWeight(
                        fields[nodeId],
                        constraintField?.cells?.[nodeId],
                        tileId
                    )
                });
                for (const [id, tileId] of assignment) tileIds[id] = tileId;
            } catch (error) {
                if (!(error instanceof WaveFunctionCollapseError)) throw error;
                fallbacks++;
                for (const node of nodes) {
                    tileIds[node.id] = chooseWeightedTerrain(
                        fields[node.id],
                        domains.get(node.id),
                        `${seed}:${node.id}`,
                        constraintField?.cells?.[node.id]
                    );
                }
            }
        }
    }
    repairTerrainTransitions(tileIds, fields, width, height, seed, constraintField);
    return {
        tileIds,
        diagnostics: {
            chunks,
            fallbacks,
            chunkSize: TERRAIN_WFC_CHUNK_SIZE,
            invalidAdjacencies: countTerrainAdjacencyIssues(tileIds, width, height)
        }
    };
}

function getConstrainedTerrainDomain(field, constraint) {
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
    if (constraint?.hardWater) {
        weight *= spec?.tags.has('water') ? 8 : 0.02;
    } else if (urbanization > 0) {
        if (spec?.tags.has('relief') || spec?.tags.has('trees') || spec?.tags.has('water')) {
            weight *= Math.max(0.025, (1 - urbanization) ** 2);
        } else {
            weight *= 1 + urbanization * 3.8;
        }
    }
    const sharpen = 1 + (constraint?.inhibitor || 0) * 0.75;
    return Math.max(0.0001, Math.pow(weight, sharpen));
}

function getFixedTerrainModule(id, fields, constraintField, width, height) {
    const constraint = constraintField?.cells?.[id];
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

function repairTerrainTransitions(tileIds, fields, width, height, seed, constraintField) {
    for (let id = 0; id < tileIds.length; id++) {
        const fixed = getFixedTerrainModule(id, fields, constraintField, width, height);
        if (fixed) tileIds[id] = fixed;
    }
    for (let pass = 0; pass < 24; pass++) {
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
                    const idHard = constraintField?.cells?.[id]?.hardWater === true;
                    const neighborHard = constraintField?.cells?.[neighborId]?.hardWater === true;
                    const targetId = idHard && !neighborHard
                        ? neighborId
                        : neighborHard && !idHard
                            ? id
                            : keyedUnit(`${seed}:repair:${pass}:${id}:${neighborId}`) < 0.5 ? id : neighborId;
                    const otherId = targetId === id ? neighborId : id;
                    if (constraintField?.cells?.[targetId]?.hardWater) continue;
                    const bridge = findBridgeTerrain(tileIds[otherId], fields[targetId]);
                    if (bridge && bridge !== tileIds[targetId]) {
                        tileIds[targetId] = bridge;
                        changes++;
                    }
                }
            }
        }
        if (changes === 0) break;
    }
}

function findBridgeTerrain(otherTileId, field) {
    const domain = getTerrainDomain(field, ACTIVE_GEOGRAPHY.biomes);
    return [...domain, 'shallow-water', 'sand', 'wetland', 'meadow', 'hill']
        .filter((tileId, index, list) => list.indexOf(tileId) === index)
        .filter((tileId) => terrainWaveCompatible(tileId, otherTileId))
        .sort((a, b) => getTerrainWeight(field, b, ACTIVE_GEOGRAPHY.biomes) - getTerrainWeight(field, a, ACTIVE_GEOGRAPHY.biomes))[0] || 'meadow';
}

function countTerrainAdjacencyIssues(tileIds, width, height) {
    let issues = 0;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            if (col + 1 < width && !terrainWaveCompatible(tileIds[id], tileIds[id + 1])) issues++;
            if (row + 1 < height && !terrainWaveCompatible(tileIds[id], tileIds[id + width])) issues++;
        }
    }
    return issues;
}

function createTerrainRows(tileIds, width, height) {
    return Array.from({ length: height }, (_, row) => Array.from({ length: width }, (_, col) =>
        GEOGRAPHIC_TILE_BY_ID.get(tileIds[row * width + col])?.symbol || 'G').join(''));
}

function createPaletteRows(tileIds, fields, width, height) {
    return Array.from({ length: height }, (_, row) => Array.from({ length: width }, (_, col) =>
        getRegionalPalette(tileIds[row * width + col], fields[row * width + col])));
}

function getRegionalPalette(tileId, field) {
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
    return regional;
}

function createElevationRows(fields, tileIds, width, height, seed, constraintField) {
    const rows = Array.from({ length: height }, () => Array(width).fill(0));
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            const spec = GEOGRAPHIC_TILE_BY_ID.get(tileIds[id]);
            if (spec?.tags.has('water')) continue;
            const macro = Math.max(0, Math.floor(((fields[id].height || 20) - 19) / 14));
            const variance = constraintField?.cells?.[id]?.terrainVariance ?? 1;
            const detail = valueNoise(col, row, 5.5, seed + 1709) * 1.25 * variance;
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
    return rows;
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

function overlayGeographicWaterAndRoutes(rows, paletteRows, elevationRows, fields, width, height) {
    const mutable = rows.map((row) => row.split(''));
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
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

function stabilizeSettlementAnchors({ anchors, fields, width, height }) {
    return anchors.map((anchor) => {
        const searchRadius = anchor.walled ? 9 : 6;
        let best = null;
        for (let row = anchor.row - searchRadius; row <= anchor.row + searchRadius; row++) {
            for (let col = anchor.col - searchRadius; col <= anchor.col + searchRadius; col++) {
                if (col < 3 || row < 3 || col >= width - 3 || row >= height - 3) continue;
                const centerField = fields[row * width + col] || {};
                if ((Number(centerField.land) || 0) < 0.48 || isHardWaterField(centerField)) continue;
                const bounds = createWallBounds(col, row, anchor.radius, width, height);
                let sampled = 0;
                let hardWater = 0;
                let boundaryWater = 0;
                let boundaryCells = 0;
                for (let sampleRow = bounds.minRow; sampleRow <= bounds.maxRow; sampleRow += 2) {
                    for (let sampleCol = bounds.minCol; sampleCol <= bounds.maxCol; sampleCol += 2) {
                        const sample = fields[sampleRow * width + sampleCol] || {};
                        const hard = isHardWaterField(sample);
                        sampled++;
                        if (hard) hardWater++;
                        if (isWallBoundaryCell(sampleCol, sampleRow, bounds)) {
                            boundaryCells++;
                            if (hard) boundaryWater++;
                        }
                    }
                }
                const waterRatio = sampled ? hardWater / sampled : 1;
                const boundaryRatio = boundaryCells ? boundaryWater / boundaryCells : 0;
                const distance = Math.hypot(col - anchor.col, row - anchor.row);
                const score = waterRatio * 36
                    + (anchor.walled ? boundaryRatio * 28 : 0)
                    + distance * 0.22
                    + (1 - clamp01(centerField.land)) * 3
                    - clamp01(centerField.routeInfluence) * 0.35;
                if (!best || score < best.score) best = { col, row, bounds, score };
            }
        }
        if (!best) return anchor;
        return {
            ...anchor,
            col: best.col,
            row: best.row,
            wallBounds: best.bounds
        };
    });
}

function isHardWaterField(field) {
    const land = clamp01(field?.land);
    const river = Math.max(clamp01(field?.riverInfluence), clamp01(field?.riverPathInfluence));
    return land <= 0.18 || (river >= 0.82 && land < 0.72);
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
    constraintField
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
        fixedBakedAssignments: 0,
        forcedBuildingAnchors: 0,
        walledAreas: 0,
        wallCells: 0,
        urbanAreaCells: 0,
        buildingFootprintCells: 0,
        fallbacks: 0
    };

    for (const sourceEntry of anchors) {
        const entry = { ...sourceEntry };
        const radius = entry.radius;
        if (entry.col < 3 || entry.row < 3 || entry.col >= width - 3 || entry.row >= height - 3) continue;
        if (!isLandSymbol(mutable[entry.row]?.[entry.col])) {
            const repaired = findNearestLandCell(mutable, entry.col, entry.row, 8);
            if (!repaired) continue;
            entry.col = repaired.col;
            entry.row = repaired.row;
        }
        const settlement = {
            ...entry,
            radius,
            walled: entry.burg.flags?.walls === true,
            wallBounds: createWallBounds(entry.col, entry.row, radius, width, height),
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
        const area = {
            col: settlement.wallBounds.minCol + 1,
            row: settlement.wallBounds.minRow + 1,
            width: Math.max(0, settlement.wallBounds.maxCol - settlement.wallBounds.minCol - 1),
            height: Math.max(0, settlement.wallBounds.maxRow - settlement.wallBounds.minRow - 1)
        };
        const districts = ['civic', 'market', 'residential', 'artisan', 'garden'];
        if (settlement.burg.flags?.port) districts.push('harbor');
        const bakedOptions = {
            rows: mutable.map((row) => row.join('')),
            elevationRows,
            inhibitorRows,
            districtRows,
            area,
            districts,
            occupied,
            seed: `${seed}:baked:${settlement.burg.id}`,
            townId: settlement.burg.name,
            minBuildings: 2,
            maxBuildings: 2,
            buffer: 0
        };
        let bakedPlan = createBakedBuildingPlan(bakedOptions);
        if (!bakedPlan.diagnostics.complete) {
            // A constrained coastal pocket may not fit a large landmark plus a second building.
            // Re-plan the same area compact-first while keeping every hard inhibitor intact.
            bakedPlan = createBakedBuildingPlan({ ...bakedOptions, compactFirst: true });
        }
        if (!bakedPlan.diagnostics.complete) {
            const expandedMinCol = Math.max(1, settlement.wallBounds.minCol - 4);
            const expandedMinRow = Math.max(1, settlement.wallBounds.minRow - 4);
            const expandedMaxCol = Math.min(width - 2, settlement.wallBounds.maxCol + 4);
            const expandedMaxRow = Math.min(height - 2, settlement.wallBounds.maxRow + 4);
            const expandedPlan = createBakedBuildingPlan({
                ...bakedOptions,
                area: {
                    col: expandedMinCol,
                    row: expandedMinRow,
                    width: expandedMaxCol - expandedMinCol + 1,
                    height: expandedMaxRow - expandedMinRow + 1
                },
                districts: ['residential', 'artisan', 'garden'],
                compactFirst: true,
                relaxRoadAffinity: true
            });
            if (expandedPlan.buildings.length > bakedPlan.buildings.length) bakedPlan = expandedPlan;
        }
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
            const generatedMinimum = parcelSites.length
                ? Math.min(
                    parcelSites.length,
                    Math.max(2, Math.ceil(parcelSites.length * (settlement.walled ? 0.74 : 0.5)))
                )
                : 0;
            const minimumBuildings = bakedWave.sites.length + generatedMinimum;
            contextual = solveContextualBuildingWFC({
                sites,
                areas: [{
                    id: `settlement-${settlement.burg.id}`,
                    siteIds: sites.map((site) => site.id),
                    minimumBuildings,
                    walled: settlement.walled,
                    priority: 1
                }],
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
            fixedBakedAssignments: bakedWave.fixed.size,
            forcedBuildingAnchors: contextual.diagnostics.forcedBuildingAnchors || 0,
            siteBuildingRatio,
            wallCells: envelope.wallCells,
            urbanAreaCells: envelope.urbanCells,
            buildingFootprintCells: footprintCells,
            moduleHistogram: contextual.diagnostics.moduleHistogram || {}
        };
        settlements.push(settlement);
        aggregate.sites += sites.length;
        aggregate.assignedBuildings += generatedBuildings.length + bakedBuildings.length;
        aggregate.bakedBuildings += bakedBuildings.length;
        aggregate.fixedBakedAssignments += bakedWave.fixed.size;
        aggregate.forcedBuildingAnchors += contextual.diagnostics.forcedBuildingAnchors || 0;
        aggregate.walledAreas += settlement.walled ? 1 : 0;
        aggregate.wallCells += envelope.wallCells;
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

function stampSettlementEnvelope({ mutable, paletteRows, elevationRows, settlement, constraintField, width, height }) {
    const bounds = settlement.wallBounds;
    const elevations = [];
    let urbanCells = 0;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            const constraint = constraintField?.cells?.[row * width + col];
            if (!constraint?.hardWater && !isWaterSymbol(mutable[row]?.[col])) {
                elevations.push(Number(elevationRows[row]?.[col]) || 0);
            }
        }
    }
    elevations.sort((a, b) => a - b);
    const plateau = elevations[Math.floor(elevations.length / 2)] || 0;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            const constraint = constraintField?.cells?.[row * width + col];
            // The numeric FMG envelope remains authoritative even inside a settlement. Only
            // non-hard marsh/shore noise may be stabilized into urban ground.
            if (constraint?.hardWater || mutable[row]?.[col] === 'W' || mutable[row]?.[col] === 'I') continue;
            urbanCells++;
            mutable[row][col] = (col + row) % 11 === 0 ? ',' : '.';
            const currentElevation = Number(elevationRows[row]?.[col]) || 0;
            elevationRows[row][col] = Math.max(plateau - 1, Math.min(plateau + 1, currentElevation));
        }
    }

    const center = { col: settlement.col, row: settlement.row };
    for (let row = center.row - 2; row <= center.row + 2; row++) {
        for (let col = center.col - 2; col <= center.col + 2; col++) {
            const constraint = constraintField?.cells?.[row * width + col];
            if (!mutable[row]?.[col] || constraint?.hardWater || isWaterSymbol(mutable[row][col])) continue;
            mutable[row][col] = ';';
            paletteRows[row][col] = 'path';
            elevationRows[row][col] = plateau;
        }
    }

    const fourGates = settlement.burg.population >= 220 || settlement.burg.flags?.plaza;
    const gates = settlement.walled ? getWallGateCells(bounds, { fourGates }) : [];
    const roadTargets = settlement.walled
        ? gates
        : CARDINALS.slice(0, settlement.burg.flags?.capital ? 4 : 3).map((direction) => ({
            col: center.col + direction.x * settlement.radius,
            row: center.row + direction.y * settlement.radius,
            edge: direction.name
        }));
    for (const target of roadTargets) {
        stampUrbanRoadLine(
            mutable,
            paletteRows,
            elevationRows,
            center,
            target,
            plateau,
            width,
            height,
            constraintField
        );
    }
    let wallCells = 0;
    if (settlement.walled) {
        const gateKeys = new Set(gates.map((gate) => `${gate.col},${gate.row}`));
        for (let row = bounds.minRow; row <= bounds.maxRow; row++) {
            for (let col = bounds.minCol; col <= bounds.maxCol; col++) {
                if (!isWallBoundaryCell(col, row, bounds)) continue;
                const constraint = constraintField?.cells?.[row * width + col];
                if (constraint?.hardWater) continue;
                if (gateKeys.has(`${col},${row}`)) {
                    mutable[row][col] = 'R';
                    paletteRows[row][col] = 'path';
                    elevationRows[row][col] = plateau;
                    continue;
                }
                mutable[row][col] = 'T';
                paletteRows[row][col] = 'path';
                elevationRows[row][col] = plateau;
                wallCells++;
            }
        }
    }
    smoothRoadElevations(mutable, elevationRows);
    return { plateau, gates, wallCells, urbanCells };
}

function stampUrbanRoadLine(mutable, paletteRows, elevationRows, from, to, plateau, width, height, constraintField) {
    let col = clampInteger(from.col, 1, width - 2);
    let row = clampInteger(from.row, 1, height - 2);
    const targetCol = clampInteger(to.col, 1, width - 2);
    const targetRow = clampInteger(to.row, 1, height - 2);
    while (col !== targetCol) {
        stampUrbanRoadCell(mutable, paletteRows, elevationRows, col, row, plateau, width, constraintField);
        col += Math.sign(targetCol - col);
    }
    while (row !== targetRow) {
        stampUrbanRoadCell(mutable, paletteRows, elevationRows, col, row, plateau, width, constraintField);
        row += Math.sign(targetRow - row);
    }
    stampUrbanRoadCell(mutable, paletteRows, elevationRows, col, row, plateau, width, constraintField);
}

function stampUrbanRoadCell(mutable, paletteRows, elevationRows, col, row, plateau, width, constraintField) {
    const constraint = constraintField?.cells?.[row * width + col];
    if (!mutable[row]?.[col] || constraint?.hardWater || isWaterSymbol(mutable[row][col]) || mutable[row][col] === 'T') return;
    mutable[row][col] = 'R';
    paletteRows[row][col] = 'path';
    elevationRows[row][col] = plateau;
}

function createSettlementDistrictRows({ mutable, settlement, width, height }) {
    const rows = Array.from({ length: height }, () => Array(width).fill(null));
    const bounds = settlement.wallBounds;
    for (let row = bounds.minRow + 1; row < bounds.maxRow; row++) {
        for (let col = bounds.minCol + 1; col < bounds.maxCol; col++) {
            if (isWaterSymbol(mutable[row]?.[col]) || mutable[row]?.[col] === 'T') continue;
            const distance = Math.hypot(col - settlement.col, row - settlement.row);
            const roadDistance = nearestSymbolDistance(mutable, col, row, new Set(['R', ';']), 4);
            const waterDistance = settlement.burg.flags?.port
                ? nearestSymbolDistance(mutable, col, row, new Set(['W', '~', 'B']), 8)
                : Infinity;
            if (distance <= 4) rows[row][col] = 'civic';
            else if (waterDistance <= 5) rows[row][col] = 'harbor';
            else if (roadDistance <= 1 && distance <= settlement.radius * 0.72) rows[row][col] = 'market';
            else {
                const variant = hashWaveSeed(`${settlement.burg.id}:${col}:${row}`) % 7;
                rows[row][col] = variant === 0 ? 'artisan' : variant === 1 ? 'garden' : 'residential';
            }
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
        const isLandmark = ['clocktower', 'lighthouse'].includes(building.blueprintId);
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
            areaId: `settlement-${settlement.burg.id}`,
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
                    mutable[row][col] = (col + row) % 7 === 0 ? ',' : '.';
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
            const hash = hashWaveSeed(`${seed}:parcel:${settlement.burg.id}:${col}:${row}`);
            const sizeClass = hash % 12;
            const smallRotated = ((hash >>> 4) % 2 === 1);
            const rectOptions = [{
                col,
                row,
                width: smallRotated ? 5 : 4,
                height: smallRotated ? 4 : 5
            }];
            if (sizeClass >= 7) {
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
                if (!canPlaceContextualParcel(rect, mutable, elevationRows, occupied)) continue;
                const allowedDoorEdges = getLegalParcelDoorEdges({
                    rect,
                    mutable,
                    occupied,
                    constraintField,
                    width,
                    seed: `${seed}:parcel-door:${settlement.burg.id}:${col}:${row}:${rect.width}x${rect.height}`
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
                    score: roadDistance
                        + rect.width * rect.height * 0.004
                        + keyedUnit(`${seed}:parcel-score:${settlement.burg.id}:${col}:${row}:${rect.width}x${rect.height}`) * 0.7
                });
            }
        }
    }
    candidates.sort((a, b) => a.score - b.score || a.rect.row - b.rect.row || a.rect.col - b.rect.col);

    const sites = [];
    const reserved = new Set(occupied instanceof Set ? occupied : []);
    const target = clampInteger(6 + Math.sqrt(Math.max(1, settlement.burg.population)) * 0.58, 7, 17);
    for (const candidate of candidates) {
        if (sites.length >= target) break;
        if (!canPlaceContextualParcel(candidate.rect, mutable, elevationRows, reserved)) continue;
        const allowedDoorEdges = getLegalParcelDoorEdges({
            rect: candidate.rect,
            mutable,
            occupied: reserved,
            constraintField,
            width,
            seed: `${seed}:selected-door:${settlement.burg.id}:${candidate.rect.col}:${candidate.rect.row}`
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
        sites.push({
            id: siteId,
            x: candidate.rect.col - offsetX,
            y: candidate.rect.row - offsetY,
            width: candidate.rect.width,
            height: candidate.rect.height,
            areaId: `settlement-${settlement.burg.id}`,
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

function stampSettlementRoads(mutable, paletteRows, elevationRows, settlement, seed, width, height) {
    const { col, row, radius, burg } = settlement;
    const random = createWaveRandom(`${seed}:roads:${burg.id}`);
    for (let y = row - 2; y <= row + 2; y++) {
        for (let x = col - 2; x <= col + 2; x++) {
            if (Math.abs(x - col) + Math.abs(y - row) > 3) continue;
            if (!isLandSymbol(mutable[y]?.[x])) continue;
            mutable[y][x] = ';';
            paletteRows[y][x] = 'path';
        }
    }
    const horizontalFirst = random() > 0.5;
    const arms = horizontalFirst
        ? [CARDINALS[0], CARDINALS[1], CARDINALS[2], CARDINALS[3]]
        : [CARDINALS[2], CARDINALS[3], CARDINALS[0], CARDINALS[1]];
    const armCount = burg.flags?.capital ? 4 : burg.population > 70 ? 3 : 2;
    for (let armIndex = 0; armIndex < armCount; armIndex++) {
        const direction = arms[armIndex];
        const length = radius + Math.floor(random() * 4);
        let x = col;
        let y = row;
        for (let step = 0; step <= length; step++) {
            if (x < 1 || y < 1 || x >= width - 1 || y >= height - 1) break;
            if (isLandSymbol(mutable[y]?.[x]) || mutable[y]?.[x] === 'B') {
                mutable[y][x] = step <= 2 ? ';' : 'R';
                paletteRows[y][x] = 'path';
            }
            x += direction.x;
            y += direction.y;
            if (step > 3 && step % 5 === 0 && random() > 0.58) {
                x += direction.y;
                y += direction.x;
            }
        }
    }
    smoothRoadElevations(mutable, elevationRows);
}

function createSettlementLots(mutable, elevationRows, settlement, occupied, seed, width, height) {
    const lots = [];
    const target = clampInteger(4 + Math.sqrt(Math.max(1, settlement.burg.population)) * 0.65, 5, 15);
    const candidates = [];
    for (let row = Math.max(2, settlement.row - settlement.radius); row <= Math.min(height - 3, settlement.row + settlement.radius); row++) {
        for (let col = Math.max(2, settlement.col - settlement.radius); col <= Math.min(width - 3, settlement.col + settlement.radius); col++) {
            const distance = Math.hypot(col - settlement.col, row - settlement.row);
            if (distance < 4 || distance > settlement.radius) continue;
            if (!isBuildableSymbol(mutable[row]?.[col])) continue;
            const roadDistance = nearestSymbolDistance(mutable, col, row, new Set(['R', ';']), 5);
            if (roadDistance < 2 || roadDistance > 4) continue;
            const score = keyedUnit(`${seed}:lot:${settlement.burg.id}:${col}:${row}`) + roadDistance * 0.025 + distance * 0.002;
            candidates.push({ col, row, score, roadDistance });
        }
    }
    candidates.sort((a, b) => a.score - b.score || a.row - b.row || a.col - b.col);
    for (const candidate of candidates) {
        if (lots.length >= target) break;
        const hash = hashWaveSeed(`${seed}:lot-size:${settlement.burg.id}:${candidate.col}:${candidate.row}`);
        const lotWidth = 3 + (hash % 4);
        const lotHeight = 3 + (Math.floor(hash / 7) % 4);
        const left = candidate.col - Math.floor(lotWidth / 2);
        const top = candidate.row - Math.floor(lotHeight / 2);
        const rect = { col: left, row: top, width: lotWidth, height: lotHeight };
        if (!canPlaceLot(rect, mutable, elevationRows, occupied, width, height)) continue;
        lots.push(rect);
        reserveRect(occupied, rect, 1);
    }
    if (lots.length < target) {
        const fallbackOffsets = [];
        for (const distance of [6, 11, 15]) {
            fallbackOffsets.push(
                { x: distance, y: 4 }, { x: distance, y: -4 },
                { x: -distance, y: 4 }, { x: -distance, y: -4 },
                { x: 4, y: distance }, { x: -4, y: distance },
                { x: 4, y: -distance }, { x: -4, y: -distance }
            );
        }
        fallbackOffsets.sort((a, b) =>
            keyedUnit(`${seed}:fallback-lot:${settlement.burg.id}:${a.x}:${a.y}`) -
            keyedUnit(`${seed}:fallback-lot:${settlement.burg.id}:${b.x}:${b.y}`));
        for (const offset of fallbackOffsets) {
            if (lots.length >= target) break;
            const hash = hashWaveSeed(`${seed}:fallback-size:${settlement.burg.id}:${offset.x}:${offset.y}`);
            const lotWidth = 3 + (hash % 3);
            const lotHeight = 3 + (Math.floor(hash / 5) % 3);
            const rect = {
                col: settlement.col + offset.x - Math.floor(lotWidth / 2),
                row: settlement.row + offset.y - Math.floor(lotHeight / 2),
                width: lotWidth,
                height: lotHeight
            };
            if (!canPlaceLot(rect, mutable, elevationRows, occupied, width, height)) continue;
            lots.push(rect);
            reserveRect(occupied, rect, 1);
        }
    }
    return lots;
}

function createLotBuilding({ lot, settlement, indexInTown, offsetX, offsetY, elevationRows, mutable, seed }) {
    const hash = hashWaveSeed(`${seed}:building:${settlement.burg.id}:${lot.col}:${lot.row}`);
    const style = hash % 3 === 0 ? 'stone' : 'timber';
    const footprintCells = createBuildingFootprint(lot.width, lot.height, hash);
    const footprintSet = new Set(footprintCells.map((cell) => `${cell.x},${cell.y}`));
    const door = chooseFootprintDoor({
        col: lot.col,
        row: lot.row,
        width: lot.width,
        height: lot.height,
        footprintCells,
        footprintSet,
        mutable
    });
    const building = {
        id: `generated-${settlement.burg.id}-${indexInTown}-${hash.toString(16).slice(0, 5)}`,
        obstructionTag: `building:generated:${settlement.burg.id}:${indexInTown}`,
        name: `${settlement.burg.name} ${indexInTown + 1}`,
        x: lot.col - offsetX,
        y: lot.row - offsetY,
        width: lot.width,
        height: lot.height,
        footprintCells,
        stories: 1,
        style,
        doorStyle: ['oak', 'painted', 'iron'][hash % 3],
        door,
        stairs: [],
        stairCells: [],
        baseElevation: dominantFootprintElevation(lot, footprintCells, elevationRows),
        proceduralGenerated: true,
        sourceType: 'formula-lot',
        facadeVariant: hash % 17
    };
    if (indexInTown === 0 && lot.width >= 5 && lot.height >= 5) {
        const flight = createStairFlight({
            origin: { x: 1, y: 1 },
            direction: 'east',
            climbVoxels: 2,
            footprintSet,
            door,
            configuration: STAIR_CONFIGURATION.SOLID_TRIANGULAR
        });
        if (flight) {
            building.stories = 2;
            building.stairCells = flight;
        }
    }
    return building;
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
            building.district = assignment.district;
            building.districtPalette = {
                ...assignment.palette,
                roofs: [...(assignment.palette?.roofs || [])],
                accent: mixColorNumbers(assignment.palette?.accent, settlement.accent, 0.44)
            };
            building.activity = assignment.activity;
            building.archetype = assignment.archetype;
            building.architectureStyle = assignment.archetype;
            const roofs = assignment.palette?.roofs || ['gabled'];
            building.roofStyle = roofs[hashWaveSeed(`${seed}:${building.id}:roof`) % roofs.length];
        }
    } catch (error) {
        if (!(error instanceof WaveFunctionCollapseError)) throw error;
        for (const [index, building] of buildings.entries()) {
            building.district = index === 0 ? 'civic' : 'residential';
            building.archetype = index === 0 ? 'hall' : 'cottage';
            building.architectureStyle = building.archetype;
            building.roofStyle = ['gabled', 'clay', 'slate'][hashWaveSeed(`${seed}:${building.id}`) % 3];
            building.districtPalette = { accent: settlement.accent, roofs: ['gabled', 'clay', 'slate'] };
        }
    }
}

function createBuildingFootprint(width, height, hash) {
    const cells = [];
    const variant = hash % 4;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const corner = (x === 0 || x === width - 1) && (y === 0 || y === height - 1);
            const lCut = variant === 2 && x >= Math.ceil(width * 0.62) && y < Math.floor(height * 0.42);
            const courtyard = variant === 3 && width >= 6 && height >= 6 && x > 1 && x < width - 2 && y > 1 && y < height - 2;
            if (variant === 1 && corner && ((x + y + hash) % 3 === 0)) continue;
            if (lCut || courtyard) continue;
            cells.push({ x, y });
        }
    }
    return cells.length >= 8 ? cells : Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => ({ x, y }))).flat();
}

function chooseFootprintDoor({ col, row, footprintCells, footprintSet, mutable }) {
    const candidates = [];
    for (const cell of footprintCells) {
        for (const direction of CARDINALS) {
            const outsideKey = `${cell.x + direction.x},${cell.y + direction.y}`;
            const insideKey = `${cell.x - direction.x},${cell.y - direction.y}`;
            if (footprintSet.has(outsideKey) || !footprintSet.has(insideKey)) continue;
            const isCorner = CARDINALS.filter((other) => !footprintSet.has(`${cell.x + other.x},${cell.y + other.y}`)).length >= 2;
            if (isCorner) continue;
            const outsideCol = col + cell.x + direction.x;
            const outsideRow = row + cell.y + direction.y;
            const roadDistance = nearestSymbolDistance(mutable, outsideCol, outsideRow, new Set(['R', ';']), 7);
            candidates.push({
                x: cell.x,
                y: cell.y,
                edge: direction.name,
                score: roadDistance + Math.abs(cell.x - (col % Math.max(1, footprintCells.length))) * 0.001
            });
        }
    }
    return candidates.sort((a, b) => a.score - b.score || a.y - b.y || a.x - b.x)[0] || { x: 1, y: 0, edge: 'north' };
}

function synthesizeDecorations({ rows, paletteRows, buildings, settlements, seed, width, height }) {
    const decorations = [];
    const blocked = new Set();
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (const building of buildings) reserveBuilding(blocked, building, offsetX, offsetY, 1);
    for (const settlement of settlements) {
        const x = settlement.col - offsetX;
        const y = settlement.row - offsetY;
        decorations.push({ type: 'fountain', x, y, matrixLandmark: true, district: 'civic', accent: 0x65e2a4 });
        decorations.push(
            { type: 'stall', x: x - 3, y: y - 2, rotation: Math.PI / 2, matrixLandmark: true, district: 'market', accent: 0xf07b4f },
            { type: 'stall', x: x + 3, y: y + 2, rotation: -Math.PI / 2, matrixLandmark: true, district: 'market', accent: 0x4fb7a7 },
            { type: 'lantern_cluster', x: x - 2, y: y + 2, matrixLandmark: true, district: 'market', accent: 0xf2c35a },
            { type: 'banner', x: x + 2, y, matrixLandmark: true, district: 'market', accent: 0xff6fae }
        );
        const primaryGate = settlement.gates?.find((gate) => gate.edge === 'south') || settlement.gates?.[0];
        if (primaryGate) {
            decorations.push({
                type: 'archway',
                x: primaryGate.col - offsetX,
                y: primaryGate.row - offsetY,
                rotation: primaryGate.edge === 'east' || primaryGate.edge === 'west' ? Math.PI / 2 : 0,
                matrixLandmark: true,
                district: 'civic',
                accent: settlement.accent
            });
        }
    }
    for (let row = 1; row < height - 1 && decorations.length < MAX_DECORATIONS; row++) {
        for (let col = 1; col < width - 1 && decorations.length < MAX_DECORATIONS; col++) {
            const key = `${col},${row}`;
            if (blocked.has(key) || !isDecorationGround(rows[row]?.[col])) continue;
            const palette = paletteRows[row]?.[col] || 'meadow';
            const unit = keyedUnit(`${seed}:decor:${col}:${row}`);
            const density = ['forest', 'jungle', 'taiga'].includes(palette) ? 0.082 : palette === 'meadow' ? 0.036 : 0.022;
            if (unit >= density) continue;
            if (decorations.some((item) => Math.hypot(item.x - (col - offsetX), item.y - (row - offsetY)) < 1.8)) continue;
            decorations.push({
                type: getDecorationType(palette, keyedUnit(`${seed}:decor-type:${col}:${row}`)),
                x: col - offsetX,
                y: row - offsetY,
                rotation: (hashWaveSeed(`${seed}:decor-rotation:${col}:${row}`) % 4) * Math.PI / 2,
                biome: palette
            });
        }
    }
    return decorations;
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

function canPlaceLot(rect, mutable, elevationRows, occupied, width, height) {
    if (rect.col < 2 || rect.row < 2 || rect.col + rect.width >= width - 2 || rect.row + rect.height >= height - 2) return false;
    const elevations = [];
    for (let row = rect.row; row < rect.row + rect.height; row++) {
        for (let col = rect.col; col < rect.col + rect.width; col++) {
            if (!isBuildableSymbol(mutable[row]?.[col]) || occupied.has(`${col},${row}`)) return false;
            elevations.push(Number(elevationRows[row]?.[col]) || 0);
        }
    }
    return Math.max(...elevations) - Math.min(...elevations) <= 2;
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

function findNearestLandCell(mutable, centerCol, centerRow, radius) {
    let best = null;
    for (let row = centerRow - radius; row <= centerRow + radius; row++) {
        for (let col = centerCol - radius; col <= centerCol + radius; col++) {
            if (!isLandSymbol(mutable[row]?.[col])) continue;
            const distance = Math.hypot(col - centerCol, row - centerRow);
            if (!best || distance < best.distance) best = { col, row, distance };
        }
    }
    return best;
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
