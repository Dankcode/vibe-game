import { hashWaveSeed } from './WaveFunctionCollapse.js';
import {
    STAIR_CONFIGURATION,
    createStairFlight,
    validateStaircaseRouting
} from './StructuralMatrixRules.js';

// Fixed landmark silhouettes placed by deterministic constraints. These are deliberately code
// authored rather than imported town payloads: FMG-derived area, district, terrain and inhibitor
// fields decide where a blueprint may appear, while the blueprint guarantees an enterable shell.

const BUILDABLE_SYMBOLS = new Set(['G', 'F', 'H', 'S', 'P', '.', ',']);
const APPROACH_SYMBOLS = new Set([...BUILDABLE_SYMBOLS, 'R', ';', ':']);
const WATER_SYMBOLS = new Set(['W', '~', 'B']);
const ROAD_SYMBOLS = new Set(['R', ';', ':']);
const CARDINALS = Object.freeze({
    north: Object.freeze({ x: 0, y: -1 }),
    east: Object.freeze({ x: 1, y: 0 }),
    south: Object.freeze({ x: 0, y: 1 }),
    west: Object.freeze({ x: -1, y: 0 })
});

const DISTRICT_STYLE = Object.freeze({
    civic: Object.freeze({ accent: 0xf2c35a, roofs: Object.freeze(['copper', 'slate', 'tower']), activity: 'gather' }),
    market: Object.freeze({ accent: 0xf07b4f, roofs: Object.freeze(['market', 'clay', 'copper']), activity: 'trade' }),
    residential: Object.freeze({ accent: 0x4fb7a7, roofs: Object.freeze(['gabled', 'clay', 'slate']), activity: 'home' }),
    artisan: Object.freeze({ accent: 0xb56d43, roofs: Object.freeze(['timber', 'slate', 'thatch']), activity: 'craft' }),
    garden: Object.freeze({ accent: 0x77b84e, roofs: Object.freeze(['thatch', 'gabled', 'copper']), activity: 'grow' }),
    harbor: Object.freeze({ accent: 0x2fa7c4, roofs: Object.freeze(['copper', 'slate', 'clay']), activity: 'dock' })
});

const RAW_BLUEPRINTS = [
    blueprint({
        id: 'market-hall',
        name: 'Festival Market Hall',
        layout: [
            '####D###',
            '#......#',
            '#......#',
            '#......#',
            '#......#',
            '#......#',
            '########'
        ],
        districts: ['market', 'civic'],
        style: 'timber', stories: 2, archetype: 'hall', architectureStyle: 'market', roofStyle: 'market',
        roomType: 'hall', priority: 9.4, roadRange: 5, terrain: 'settlement'
    }),
    blueprint({
        id: 'clocktower',
        name: 'Sunclock Civic Tower',
        layout: [
            '##D##',
            '#...#',
            '#...#',
            '#...#',
            '#...#',
            '#...#',
            '#####'
        ],
        districts: ['civic', 'market'],
        style: 'stone', stories: 3, archetype: 'tower', architectureStyle: 'tower', roofStyle: 'tower',
        roomType: 'hall', priority: 9.1, roadRange: 6, terrain: 'settlement'
    }),
    blueprint({
        id: 'civic-hall',
        name: 'Storybook Civic Hall',
        layout: [
            '###D###',
            '#.....#',
            '#.....#',
            '#.....#',
            '#.....#',
            '#.....#',
            '#######'
        ],
        districts: ['civic', 'garden'],
        style: 'stone', stories: 2, archetype: 'hall', architectureStyle: 'courtyard', roofStyle: 'copper',
        roomType: 'hall', priority: 8.7, roadRange: 6, terrain: 'settlement'
    }),
    blueprint({
        id: 'inn',
        name: 'Wayfarer Inn',
        layout: [
            '###D###',
            '#.....#',
            '#.....#',
            '#.....#',
            '#.....#',
            '#######'
        ],
        districts: ['market', 'residential', 'harbor'],
        style: 'timber', stories: 2, archetype: 'bayfront', architectureStyle: 'bayfront', roofStyle: 'gabled',
        roomType: 'common', priority: 8.5, roadRange: 6, terrain: 'settlement'
    }),
    blueprint({
        id: 'lighthouse',
        name: 'Starwater Lighthouse',
        layout: [
            '##D##',
            '#...#',
            '#...#',
            '#...#',
            '#...#',
            '#...#',
            '#####'
        ],
        districts: ['harbor'],
        style: 'stone', stories: 3, archetype: 'tower', architectureStyle: 'tower', roofStyle: 'copper',
        roomType: 'hall', priority: 10.5, waterRange: 7, terrain: 'coast'
    }),
    blueprint({
        id: 'chapel',
        name: 'Sunpetal Chapel',
        layout: [
            '##D###',
            '#....#',
            '#....#',
            '#....#',
            '#....#',
            '#....#',
            '#....#',
            '######'
        ],
        districts: ['civic', 'garden', 'residential'],
        style: 'stone', stories: 2, archetype: 'manor', architectureStyle: 'gabled', roofStyle: 'copper',
        roomType: 'hall', priority: 8.3, roadRange: 8, terrain: 'highland'
    }),
    blueprint({
        id: 'cabin',
        name: 'Explorer Cabin',
        layout: [
            '##D#',
            '#..#',
            '#..#',
            '#..#',
            '####'
        ],
        districts: ['residential', 'artisan', 'garden'],
        style: 'timber', stories: 1, archetype: 'cottage', architectureStyle: 'gabled', roofStyle: 'thatch',
        roomType: 'common', priority: 6.4, roadRange: 8, terrain: 'settlement'
    })
];

export const BAKED_BUILDING_BLUEPRINTS = Object.freeze(Object.fromEntries(
    RAW_BLUEPRINTS.map((entry) => [entry.id, entry])
));

export const BAKED_BUILDING_BLUEPRINT_IDS = Object.freeze(RAW_BLUEPRINTS.map((entry) => entry.id));

export class BakedBuildingPlacementError extends Error {
    constructor(message, diagnostics, partialPlan) {
        super(message);
        this.name = 'BakedBuildingPlacementError';
        this.code = 'BAKED_MINIMUM_NOT_MET';
        this.diagnostics = diagnostics;
        this.partialPlan = partialPlan;
    }
}

/**
 * Select and place two or three landmark blueprints inside a supplied grid area.
 *
 * `area` accepts `{ col, row, width, height }`, `{ minCol, minRow, maxCol, maxRow }`,
 * or `{ cells: [{ col, row, district? }] }`. Output building x/y coordinates use the
 * centered world convention already consumed by MapData and WorldGenerator. By default an
 * undersupplied plan is returned with an explicit diagnostic shortfall; `requireMinimum: true`
 * promotes that shortfall to a typed `BakedBuildingPlacementError`.
 */
export function createBakedBuildingPlan({
    rows = [],
    elevationRows = [],
    inhibitorRows = [],
    districtRows = [],
    area = null,
    districts = null,
    occupied = [],
    seed = 'baked-buildings',
    townId = 'town',
    minBuildings = 2,
    maxBuildings = 3,
    buffer = 1,
    maxInhibitor = 0.68,
    requireMinimum = false,
    compactFirst = false,
    relaxRoadAffinity = false
} = {}) {
    const height = rows.length;
    const width = rows[0]?.length || 0;
    const requestedMin = clampInteger(minBuildings, 0, 4);
    const requestedMax = clampInteger(maxBuildings, requestedMin, 4);
    if (width === 0 || height === 0) {
        return finalizePlan(emptyPlan('empty-grid', requestedMin, requestedMax), requireMinimum);
    }

    const region = normalizeArea(area, width, height);
    if (!region.cells.size) {
        return finalizePlan(emptyPlan('empty-area', requestedMin, requestedMax), requireMinimum);
    }

    const districtSet = normalizeDistricts(districts ?? area?.districts ?? area?.district);
    const occupiedCells = normalizeOccupied(occupied, width, height);
    const safeBuffer = clampInteger(buffer, 0, 3);
    const safeMaxInhibitor = clamp(Number(maxInhibitor), 0, 1);
    const context = {
        rows,
        elevationRows,
        inhibitorRows,
        districtRows,
        region,
        districtSet,
        width,
        height,
        maxInhibitor: safeMaxInhibitor,
        relaxRoadAffinity: relaxRoadAffinity === true,
        seed: String(seed),
        townId: String(townId),
        offsetX: Math.floor(width / 2),
        offsetY: Math.floor(height / 2)
    };

    const blueprintOrder = RAW_BLUEPRINTS
        .filter((entry) => blueprintMatchesDistrictContext(entry, districtSet))
        .map((entry) => ({
            blueprint: entry,
            score: entry.priority
                + contextTerrainPriority(entry, context)
                + seededUnit(`${seed}:blueprint:${entry.id}`) * 0.35
                - (compactFirst ? entry.width * entry.height * 0.32 : 0)
        }))
        .sort((a, b) => b.score - a.score || a.blueprint.id.localeCompare(b.blueprint.id));

    const buildings = [];
    const rejected = {};
    for (const { blueprint: entry } of blueprintOrder) {
        if (buildings.length >= requestedMax) break;
        const candidates = createCandidates(entry, context, occupiedCells, safeBuffer);
        if (!candidates.length) {
            rejected[entry.id] = 'no-valid-placement';
            continue;
        }
        const selected = candidates[0];
        const building = materializeBuilding(entry, selected, context, buildings.length);
        buildings.push(building);
        reserveCandidate(occupiedCells, selected, safeBuffer, width, height);
    }

    // If restrictive districts leave too few choices, re-run compatible non-coastal forms. The
    // area/inhibitor/occupancy rules remain hard constraints; only district affinity is relaxed.
    if (buildings.length < requestedMin) {
        const used = new Set(buildings.map((building) => building.blueprintId));
        const fallbackBlueprints = RAW_BLUEPRINTS
            .filter((candidate) => candidate.terrain !== 'coast')
            .sort((left, right) => compactFirst
                ? left.width * left.height - right.width * right.height || right.priority - left.priority
                : 0);
        for (const entry of fallbackBlueprints) {
            if (buildings.length >= Math.min(requestedMin, requestedMax)) break;
            if (used.has(entry.id)) continue;
            const candidates = createCandidates(entry, { ...context, districtSet: new Set() }, occupiedCells, safeBuffer);
            if (!candidates.length) continue;
            const selected = candidates[0];
            buildings.push(materializeBuilding(entry, selected, context, buildings.length));
            reserveCandidate(occupiedCells, selected, safeBuffer, width, height);
            used.add(entry.id);
        }
    }

    // Very small or fragmented settlement areas may only support the minimum 4x5 cabin form.
    // Compact mode permits repeated cabin instances; placement/approach/inhibitor checks remain
    // identical, so this increases count without weakening any spatial constraint.
    if (compactFirst && buildings.length < requestedMin) {
        const cabin = RAW_BLUEPRINTS.find((entry) => entry.id === 'cabin');
        while (cabin && buildings.length < Math.min(requestedMin, requestedMax)) {
            const candidates = createCandidates(cabin, { ...context, districtSet: new Set() }, occupiedCells, safeBuffer);
            if (!candidates.length) break;
            const selected = candidates[0];
            buildings.push(materializeBuilding(cabin, selected, context, buildings.length));
            reserveCandidate(occupiedCells, selected, safeBuffer, width, height);
        }
    }

    const plan = {
        buildings,
        occupied: occupiedCells,
        diagnostics: {
            requested: { min: requestedMin, max: requestedMax },
            placed: buildings.length,
            complete: buildings.length >= requestedMin,
            blueprintIds: buildings.map((building) => building.blueprintId),
            reservedApproachCells: buildings.map((building) => building.entrance.approachGrid.join(',')),
            rejected,
            areaCells: region.cells.size,
            maxInhibitor: safeMaxInhibitor,
            strategy: compactFirst ? 'compact-first' : 'landmark-first'
        }
    };
    return finalizePlan(plan, requireMinimum);
}

export function placeBakedBuildingsInArea(options = {}) {
    return createBakedBuildingPlan(options).buildings;
}

export function validateBakedBuilding(building) {
    const errors = [];
    const width = Math.max(0, Math.floor(Number(building?.width) || 0));
    const height = Math.max(0, Math.floor(Number(building?.height) || 0));
    const cells = normalizeLocalCells(building?.footprintCells, width, height);
    const footprint = new Set(cells.map(cellKey));
    const door = normalizeLocalCell(building?.door);
    if (!width || !height || !cells.length) errors.push('empty-footprint');
    if (!door || !footprint.has(cellKey(door))) errors.push('missing-door');
    if (door && !isBoundaryCell(door, footprint)) errors.push('door-not-on-boundary');

    const stairCells = collectStructuralStairCells(building);
    const blocked = new Set(stairCells.map(cellKey));
    const interiors = cells.filter((cell) => !isBoundaryCell(cell, footprint));
    const enterableSpace = findOpenRectangle(
        interiors.filter((cell) => !blocked.has(cellKey(cell))),
        width,
        height
    );
    if (Math.min(enterableSpace.width, enterableSpace.height) < 2 ||
        Math.max(enterableSpace.width, enterableSpace.height) < 3) {
        errors.push('interior-smaller-than-2x3');
    }
    if (door && !hasInteriorDoorLanding(door, building?.door?.edge, new Set(interiors.map(cellKey)))) {
        errors.push('door-has-no-interior-landing');
    }
    const stories = Math.max(1, Math.floor(Number(building?.stories) || 1));
    if ((building?.bakedGenerated || building?.sourceType === 'baked-blueprint') && stories > 1) {
        if (!Array.isArray(building?.stairCells) || building.stairCells.length < (stories - 1) * 3) {
            errors.push('missing-explicit-stair-cells');
        }
        const stairLevels = new Set((building?.stairs || []).map((stair) => Math.floor(Number(stair?.level) || 0)));
        for (let level = 0; level < stories - 1; level++) {
            if (!stairLevels.has(level)) errors.push(`missing-stair-level-${level}`);
        }
        const routing = validateStaircaseRouting(building?.stairs || [], {
            baseElevation: Math.max(0, Math.floor(Number(building?.baseElevation) || 0)),
            stories
        });
        if (!routing.valid) errors.push(...routing.issues.map((issue) => `invalid-stair-routing:${issue}`));
    }
    return { valid: errors.length === 0, errors, enterableSpace };
}

function collectStructuralStairCells(building) {
    const cells = [];
    for (const cell of building?.stairCells || []) {
        const normalized = normalizeLocalCell(cell);
        if (normalized) cells.push(normalized);
    }
    for (const stair of building?.stairs || []) {
        const nested = Array.isArray(stair?.cells) && stair.cells.length ? stair.cells : [stair];
        for (const cell of nested) {
            const normalized = normalizeLocalCell(cell);
            if (normalized) cells.push(normalized);
        }
    }
    return [...new Map(cells.map((cell) => [cellKey(cell), cell])).values()];
}

function blueprint(spec) {
    const parsed = parseLayout(spec.layout);
    const entry = Object.freeze({
        ...spec,
        layout: Object.freeze([...spec.layout]),
        districts: Object.freeze([...spec.districts]),
        width: parsed.width,
        height: parsed.height,
        footprintCells: Object.freeze(parsed.footprintCells.map(Object.freeze)),
        interiorCells: Object.freeze(parsed.interiorCells.map(Object.freeze)),
        door: Object.freeze(parsed.door),
        enterableSpace: Object.freeze(findOpenRectangle(parsed.interiorCells, parsed.width, parsed.height))
    });
    const validation = validateBakedBuilding(entry);
    if (!validation.valid) throw new Error(`Invalid baked building blueprint ${spec.id}: ${validation.errors.join(', ')}`);
    return entry;
}

function parseLayout(layout) {
    if (!Array.isArray(layout) || !layout.length) throw new Error('A baked blueprint requires layout rows.');
    const width = layout[0].length;
    if (width < 4 || layout.some((row) => typeof row !== 'string' || row.length !== width)) {
        throw new Error('Baked blueprint layouts must be rectangular and at least four cells wide.');
    }
    const footprintCells = [];
    const interiorCells = [];
    let door = null;
    for (let y = 0; y < layout.length; y++) {
        for (let x = 0; x < width; x++) {
            const symbol = layout[y][x];
            if (symbol === ' ') continue;
            footprintCells.push({ x, y });
            if (symbol === '.') interiorCells.push({ x, y });
            if (symbol === 'D') {
                if (door) throw new Error('A baked blueprint must have exactly one entrance.');
                door = { x, y, edge: edgeForCell(x, y, width, layout.length) };
            }
        }
    }
    if (!door) throw new Error('A baked blueprint must have exactly one entrance.');
    return { width, height: layout.length, footprintCells, interiorCells, door };
}

function createCandidates(entry, context, occupiedCells, buffer) {
    const candidates = [];
    for (let rotation = 0; rotation < 4; rotation++) {
        const shape = rotateBlueprint(entry, rotation);
        const bounds = context.region.bounds;
        for (let row = bounds.minRow; row <= bounds.maxRow - shape.height + 1; row++) {
            for (let col = bounds.minCol; col <= bounds.maxCol - shape.width + 1; col++) {
                const candidate = evaluateCandidate(entry, shape, col, row, context, occupiedCells, buffer);
                if (candidate) candidates.push(candidate);
            }
        }
    }
    return candidates.sort((a, b) => b.score - a.score || a.row - b.row || a.col - b.col || a.rotation - b.rotation);
}

function evaluateCandidate(entry, shape, col, row, context, occupiedCells, buffer) {
    const worldCells = shape.footprintCells.map((cell) => ({ col: col + cell.x, row: row + cell.y }));
    if (worldCells.some((cell) => !context.region.cells.has(gridKey(cell.col, cell.row)))) return null;
    if (worldCells.some((cell) => !BUILDABLE_SYMBOLS.has(context.rows[cell.row]?.[cell.col]))) return null;
    if (worldCells.some((cell) => neighborhoodOccupied(cell.col, cell.row, occupiedCells, buffer))) return null;

    const inhibitors = worldCells.map((cell) => clamp(Number(context.inhibitorRows[cell.row]?.[cell.col]) || 0, 0, 1));
    if (inhibitors.some((value) => value > context.maxInhibitor)) return null;
    const inhibitor = average(inhibitors);
    const elevations = worldCells.map((cell) => Number(context.elevationRows[cell.row]?.[cell.col]) || 0);
    const elevationSpan = Math.max(...elevations) - Math.min(...elevations);
    if (elevationSpan > 2) return null;

    const doorDirection = CARDINALS[shape.door.edge];
    const approach = {
        col: col + shape.door.x + doorDirection.x,
        row: row + shape.door.y + doorDirection.y
    };
    if (!context.region.cells.has(gridKey(approach.col, approach.row))) return null;
    if (!APPROACH_SYMBOLS.has(context.rows[approach.row]?.[approach.col])) return null;
    if (occupiedCells.has(gridKey(approach.col, approach.row))) return null;
    const approachInhibitor = clamp(Number(context.inhibitorRows[approach.row]?.[approach.col]) || 0, 0, 1);
    if (approachInhibitor > context.maxInhibitor) return null;

    const center = { col: col + (shape.width - 1) / 2, row: row + (shape.height - 1) / 2 };
    const waterDistance = nearestSymbolDistance(context.rows, center.col, center.row, WATER_SYMBOLS, 10);
    const roadDistance = nearestSymbolDistance(context.rows, approach.col, approach.row, ROAD_SYMBOLS, 10);
    if (entry.terrain === 'coast' && waterDistance > entry.waterRange) return null;
    if (!context.relaxRoadAffinity && entry.roadRange && roadDistance > entry.roadRange) return null;

    const district = resolveCandidateDistrict(center, context);
    if (context.districtSet.size && district && !context.districtSet.has(district)) return null;
    if (district && !entry.districts.includes(district) && context.districtSet.size) return null;
    const areaCenter = context.region.center;
    const centrality = 1 - clamp(Math.hypot(center.col - areaCenter.col, center.row - areaCenter.row) /
        Math.max(1, Math.hypot(context.region.bounds.width, context.region.bounds.height) / 2), 0, 1);
    const elevation = mode(elevations);
    const elevationBias = entry.terrain === 'highland' ? elevation * 0.16 : -elevationSpan * 0.5;
    const terrainScore = entry.terrain === 'coast' ? Math.max(0, entry.waterRange - waterDistance) * 0.72 : 0;
    const roadScore = Number.isFinite(roadDistance) ? Math.max(0, 7 - roadDistance) * 0.22 : 0;
    const doorFacingScore = ROAD_SYMBOLS.has(context.rows[approach.row]?.[approach.col]) ? 1.2 : 0;
    const districtScore = district && entry.districts.includes(district) ? 1.5 : 0;
    const jitter = seededUnit(`${context.seed}:${entry.id}:${col}:${row}:${shape.rotation}`) * 0.48;
    const score = terrainScore + roadScore + doorFacingScore + districtScore + centrality * 0.9 + elevationBias -
        inhibitor * 4 - approachInhibitor * 2 + jitter;

    return {
        col, row, rotation: shape.rotation, shape, score, approach, district,
        baseElevation: elevation, inhibitor, approachInhibitor, elevationSpan, waterDistance, roadDistance
    };
}

function materializeBuilding(entry, candidate, context, index) {
    const shape = candidate.shape;
    const district = candidate.district && entry.districts.includes(candidate.district)
        ? candidate.district
        : entry.districts.find((value) => context.districtSet.has(value)) || entry.districts[0];
    const palette = DISTRICT_STYLE[district] || DISTRICT_STYLE.residential;
    const idHash = hashWaveSeed(`${context.seed}:${context.townId}:${entry.id}:${candidate.col}:${candidate.row}`);
    const id = `baked-${context.townId}-${entry.id}-${idHash.toString(16).slice(0, 7)}`;
    const stairSystem = createStructuralStairSystem(shape, entry.stories);
    if (!stairSystem) {
        throw new Error(`Baked blueprint ${entry.id} cannot fit a valid structural stair system.`);
    }
    const stairKeys = new Set(stairSystem.stairCells.map(cellKey));
    const interiorRect = findOpenRectangle(
        shape.interiorCells.filter((cell) => !stairKeys.has(cellKey(cell))),
        shape.width,
        shape.height
    );
    return {
        id,
        obstructionTag: `building:baked:${context.townId}:${entry.id}:${index}`,
        name: context.townId === 'town' ? entry.name : `${context.townId} ${entry.name}`,
        x: candidate.col - context.offsetX,
        y: candidate.row - context.offsetY,
        width: shape.width,
        height: shape.height,
        footprintCells: shape.footprintCells.map((cell) => ({ ...cell })),
        stories: entry.stories,
        style: entry.style,
        doorStyle: ['painted', 'oak', 'iron'][idHash % 3],
        door: { ...shape.door },
        stairs: stairSystem.stairs,
        stairCells: stairSystem.stairCells,
        baseElevation: candidate.baseElevation,
        proceduralGenerated: true,
        bakedGenerated: true,
        enterable: true,
        preserveEntrance: true,
        sourceType: 'baked-blueprint',
        blueprintId: entry.id,
        facadeVariant: idHash % 17,
        rotation: candidate.rotation,
        district,
        districtPalette: { ...palette, roofs: [...palette.roofs] },
        activity: palette.activity,
        archetype: entry.archetype,
        architectureStyle: entry.architectureStyle,
        roofStyle: entry.roofStyle,
        entrance: {
            grid: [shape.door.x, shape.door.y],
            edge: shape.door.edge,
            approach: [candidate.approach.col - context.offsetX, candidate.approach.row - context.offsetY],
            approachGrid: [candidate.approach.col, candidate.approach.row],
            approachReserved: true
        },
        interior: {
            minimumOpenSpan: [Math.min(interiorRect.width, interiorRect.height), Math.max(interiorRect.width, interiorRect.height)],
            openCells: shape.interiorCells.filter((cell) => !stairKeys.has(cellKey(cell))).map((cell) => ({ ...cell })),
            floorHeightVoxels: 2
        },
        floors: Array.from({ length: entry.stories }, (_, level) => ({
            level,
            rooms: [{
                type: entry.roomType,
                gridRect: { x: interiorRect.x, y: interiorRect.y, width: interiorRect.width, height: interiorRect.height },
                doors: level === 0 ? [{ grid: [shape.door.x, shape.door.y] }] : []
            }]
        })),
        placementConstraints: {
            inhibitor: candidate.inhibitor,
            approachInhibitor: candidate.approachInhibitor,
            elevationSpan: candidate.elevationSpan,
            waterDistance: candidate.waterDistance,
            roadDistance: candidate.roadDistance
        }
    };
}

function rotateBlueprint(entry, turns) {
    let width = entry.width;
    let height = entry.height;
    let footprintCells = entry.footprintCells.map((cell) => ({ ...cell }));
    let interiorCells = entry.interiorCells.map((cell) => ({ ...cell }));
    let door = { ...entry.door };
    for (let turn = 0; turn < turns; turn++) {
        footprintCells = footprintCells.map((cell) => ({ x: height - 1 - cell.y, y: cell.x }));
        interiorCells = interiorCells.map((cell) => ({ x: height - 1 - cell.y, y: cell.x }));
        door = { x: height - 1 - door.y, y: door.x, edge: rotateEdge(door.edge) };
        [width, height] = [height, width];
    }
    return { rotation: turns, width, height, footprintCells, interiorCells, door };
}

function normalizeArea(area, width, height) {
    const cells = new Set();
    const cellDistricts = new Map();
    if (Array.isArray(area?.cells) && area.cells.length) {
        for (const raw of area.cells) {
            const col = Math.floor(Number(raw?.col ?? raw?.x));
            const row = Math.floor(Number(raw?.row ?? raw?.y));
            if (!Number.isFinite(col) || !Number.isFinite(row) || col < 0 || row < 0 || col >= width || row >= height) continue;
            cells.add(gridKey(col, row));
            if (raw?.district) cellDistricts.set(gridKey(col, row), String(raw.district));
        }
    } else {
        const minCol = clampInteger(area?.minCol ?? area?.col ?? 0, 0, width - 1);
        const minRow = clampInteger(area?.minRow ?? area?.row ?? 0, 0, height - 1);
        const maxCol = clampInteger(area?.maxCol ?? (minCol + Math.max(1, Number(area?.width) || width) - 1), minCol, width - 1);
        const maxRow = clampInteger(area?.maxRow ?? (minRow + Math.max(1, Number(area?.height) || height) - 1), minRow, height - 1);
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) cells.add(gridKey(col, row));
        }
    }
    const points = [...cells].map(parseGridKey);
    if (!points.length) return { cells, cellDistricts, bounds: emptyBounds(), center: { col: 0, row: 0 } };
    const minCol = Math.min(...points.map((point) => point.col));
    const maxCol = Math.max(...points.map((point) => point.col));
    const minRow = Math.min(...points.map((point) => point.row));
    const maxRow = Math.max(...points.map((point) => point.row));
    return {
        cells,
        cellDistricts,
        bounds: { minCol, maxCol, minRow, maxRow, width: maxCol - minCol + 1, height: maxRow - minRow + 1 },
        center: { col: (minCol + maxCol) / 2, row: (minRow + maxRow) / 2 }
    };
}

function normalizeDistricts(values) {
    const list = Array.isArray(values) ? values : values ? [values] : [];
    return new Set(list.map(String).filter(Boolean));
}

function normalizeOccupied(occupied, width, height) {
    if (occupied instanceof Set) return new Set([...occupied].map(String));
    const set = new Set();
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (const value of occupied || []) {
        if (typeof value === 'string') {
            set.add(value);
            continue;
        }
        if (!value || typeof value !== 'object') continue;
        if (Number.isFinite(Number(value.col)) && Number.isFinite(Number(value.row)) && !value.width) {
            set.add(gridKey(Math.floor(value.col), Math.floor(value.row)));
            continue;
        }
        const buildingWidth = Math.max(1, Math.floor(Number(value.width) || 1));
        const buildingHeight = Math.max(1, Math.floor(Number(value.height) || 1));
        const originCol = Math.floor(Number(value.col ?? (Number(value.x) + offsetX)) || 0);
        const originRow = Math.floor(Number(value.row ?? (Number(value.y) + offsetY)) || 0);
        const footprint = normalizeLocalCells(value.footprintCells, buildingWidth, buildingHeight);
        for (const cell of footprint) set.add(gridKey(originCol + cell.x, originRow + cell.y));
    }
    return set;
}

function resolveCandidateDistrict(center, context) {
    const col = Math.round(center.col);
    const row = Math.round(center.row);
    return context.region.cellDistricts.get(gridKey(col, row)) ||
        context.districtRows[row]?.[col] ||
        (context.districtSet.size === 1 ? [...context.districtSet][0] : null);
}

function blueprintMatchesDistrictContext(entry, districts) {
    return !districts.size || entry.districts.some((district) => districts.has(district));
}

function contextTerrainPriority(entry, context) {
    if (entry.terrain === 'coast') {
        const distance = nearestSymbolDistance(context.rows, context.region.center.col, context.region.center.row, WATER_SYMBOLS, 14);
        return distance <= entry.waterRange + Math.max(context.region.bounds.width, context.region.bounds.height) / 2 ? 5.5 : -20;
    }
    if (entry.terrain === 'highland') {
        const elevations = [...context.region.cells]
            .map(parseGridKey)
            .map((point) => Number(context.elevationRows[point.row]?.[point.col]) || 0);
        return average(elevations) >= 4 ? 3.8 : 0;
    }
    return 0;
}

function reserveCandidate(occupied, candidate, buffer, width, height) {
    // The exterior landing is part of the building's traversal contract. Reserve it even when
    // callers request no footprint buffer so later landmarks can neither cover nor face into it.
    occupied.add(gridKey(candidate.approach.col, candidate.approach.row));
    for (const cell of candidate.shape.footprintCells) {
        const col = candidate.col + cell.x;
        const row = candidate.row + cell.y;
        for (let dy = -buffer; dy <= buffer; dy++) {
            for (let dx = -buffer; dx <= buffer; dx++) {
                const x = col + dx;
                const y = row + dy;
                if (x >= 0 && y >= 0 && x < width && y < height) occupied.add(gridKey(x, y));
            }
        }
    }
}

function neighborhoodOccupied(col, row, occupied, buffer) {
    for (let dy = -buffer; dy <= buffer; dy++) {
        for (let dx = -buffer; dx <= buffer; dx++) {
            if (occupied.has(gridKey(col + dx, row + dy))) return true;
        }
    }
    return false;
}

function createStructuralStairSystem(shape, stories) {
    const transitions = Math.max(0, Math.floor(Number(stories) || 1) - 1);
    if (transitions === 0) return { stairs: [], stairCells: [] };

    const footprintSet = new Set(shape.footprintCells.map(cellKey));
    const variants = [];
    const seenVariants = new Set();
    for (const origin of shape.interiorCells) {
        for (const direction of Object.keys(CARDINALS)) {
            const cells = createStairFlight({
                origin,
                direction,
                climbVoxels: 2,
                footprintSet,
                door: shape.door,
                configuration: STAIR_CONFIGURATION.SOLID_TRIANGULAR,
                level: 0
            });
            if (!cells) continue;
            const keys = cells.map(cellKey).sort();
            const variantKey = `${direction}:${keys.join('|')}`;
            if (seenVariants.has(variantKey)) continue;
            seenVariants.add(variantKey);
            variants.push({
                direction,
                origin: { ...origin },
                cells,
                keys: new Set(keys),
                score: Math.hypot(origin.x - shape.door.x, origin.y - shape.door.y)
            });
        }
    }
    variants.sort((a, b) => b.score - a.score || a.origin.y - b.origin.y || a.origin.x - b.origin.x ||
        a.direction.localeCompare(b.direction));

    let best = null;
    searchStairSystems(0, transitions, variants, [], new Set(), shape, (selection, freeSpace) => {
        const score = freeSpace.area * 100 + selection.reduce((sum, variant) => sum + variant.score, 0);
        if (!best || score > best.score) best = { selection: [...selection], freeSpace, score };
    });
    if (!best) return null;

    const stairs = best.selection.map((variant, level) => {
        const cells = createStairFlight({
            origin: variant.origin,
            direction: variant.direction,
            climbVoxels: 2,
            footprintSet,
            door: shape.door,
            configuration: STAIR_CONFIGURATION.SOLID_TRIANGULAR,
            level
        });
        const lower = cells.find((cell) => cell.role === 'lower-stair');
        return {
            x: lower.x,
            y: lower.y,
            direction: variant.direction,
            level,
            configuration: STAIR_CONFIGURATION.SOLID_TRIANGULAR,
            cells
        };
    });
    const routing = validateStaircaseRouting(stairs, { baseElevation: 0, stories });
    if (!routing.valid) return null;
    return {
        stairs,
        stairCells: stairs.flatMap((stair) => stair.cells.map((cell) => ({ ...cell })))
    };
}

function searchStairSystems(level, transitions, variants, selected, used, shape, accept) {
    if (level >= transitions) {
        const freeSpace = findOpenRectangle(
            shape.interiorCells.filter((cell) => !used.has(cellKey(cell))),
            shape.width,
            shape.height
        );
        if (Math.min(freeSpace.width, freeSpace.height) >= 2 && Math.max(freeSpace.width, freeSpace.height) >= 3) {
            accept(selected, freeSpace);
        }
        return;
    }
    for (const variant of variants) {
        if ([...variant.keys].some((key) => used.has(key))) continue;
        const nextUsed = new Set(used);
        for (const key of variant.keys) nextUsed.add(key);
        selected.push(variant);
        searchStairSystems(level + 1, transitions, variants, selected, nextUsed, shape, accept);
        selected.pop();
    }
}

function findOpenRectangle(cells, width, height) {
    const open = new Set((cells || []).map(cellKey));
    let best = { x: 0, y: 0, width: 0, height: 0, area: 0 };
    for (let top = 0; top < height; top++) {
        for (let left = 0; left < width; left++) {
            if (!open.has(`${left},${top}`)) continue;
            for (let bottom = top; bottom < height; bottom++) {
                for (let right = left; right < width; right++) {
                    const rectWidth = right - left + 1;
                    const rectHeight = bottom - top + 1;
                    const area = rectWidth * rectHeight;
                    if (area <= best.area || !rectangleIsOpen(open, left, top, right, bottom)) continue;
                    best = { x: left, y: top, width: rectWidth, height: rectHeight, area };
                }
            }
        }
    }
    return best;
}

function rectangleIsOpen(open, left, top, right, bottom) {
    for (let y = top; y <= bottom; y++) {
        for (let x = left; x <= right; x++) if (!open.has(`${x},${y}`)) return false;
    }
    return true;
}

function normalizeLocalCells(cells, width, height) {
    if (Array.isArray(cells) && cells.length) {
        return cells
            .map(normalizeLocalCell)
            .filter((cell) => cell && cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height);
    }
    return Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => ({ x, y }))).flat();
}

function normalizeLocalCell(value) {
    if (!value) return null;
    const x = Math.floor(Number(value.x ?? value[0]));
    const y = Math.floor(Number(value.y ?? value[1]));
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

function isBoundaryCell(cell, footprint) {
    return Object.values(CARDINALS).some((direction) => !footprint.has(`${cell.x + direction.x},${cell.y + direction.y}`));
}

function hasInteriorDoorLanding(door, edge, interiors) {
    const outside = CARDINALS[edge] || CARDINALS.north;
    return interiors.has(`${door.x - outside.x},${door.y - outside.y}`);
}

function edgeForCell(x, y, width, height) {
    if (y === 0) return 'north';
    if (x === width - 1) return 'east';
    if (y === height - 1) return 'south';
    if (x === 0) return 'west';
    throw new Error('A baked blueprint entrance must be on its boundary.');
}

function rotateEdge(edge) {
    return ({ north: 'east', east: 'south', south: 'west', west: 'north' })[edge] || 'north';
}

function nearestSymbolDistance(rows, centerCol, centerRow, symbols, radius) {
    let nearest = Infinity;
    const startCol = Math.round(centerCol);
    const startRow = Math.round(centerRow);
    for (let row = Math.max(0, startRow - radius); row <= Math.min(rows.length - 1, startRow + radius); row++) {
        for (let col = Math.max(0, startCol - radius); col <= Math.min((rows[row]?.length || 1) - 1, startCol + radius); col++) {
            if (!symbols.has(rows[row]?.[col])) continue;
            nearest = Math.min(nearest, Math.hypot(col - centerCol, row - centerRow));
        }
    }
    return nearest;
}

function mode(values) {
    const counts = new Map();
    for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0]?.[0] || 0;
}

function average(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function seededUnit(value) {
    return (hashWaveSeed(value) + 0.5) / 4294967296;
}

function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, Number.isFinite(value) ? value : minimum));
}

function clampInteger(value, minimum, maximum) {
    return Math.floor(clamp(Number(value), minimum, maximum));
}

function gridKey(col, row) {
    return `${col},${row}`;
}

function parseGridKey(value) {
    const [col, row] = String(value).split(',').map(Number);
    return { col, row };
}

function cellKey(cell) {
    return `${cell.x},${cell.y}`;
}

function emptyBounds() {
    return { minCol: 0, maxCol: -1, minRow: 0, maxRow: -1, width: 0, height: 0 };
}

function finalizePlan(plan, requireMinimum) {
    const minimum = Math.max(0, Math.floor(Number(plan?.diagnostics?.requested?.min) || 0));
    const placed = Math.max(0, Math.floor(Number(plan?.diagnostics?.placed) || 0));
    const shortfall = Math.max(0, minimum - placed);
    plan.diagnostics.complete = shortfall === 0;
    plan.diagnostics.shortfall = shortfall;
    plan.diagnostics.status = shortfall === 0 ? 'complete' : 'partial';
    if (shortfall > 0 && !plan.diagnostics.reason) plan.diagnostics.reason = 'minimum-not-met';
    if (requireMinimum && shortfall > 0) {
        throw new BakedBuildingPlacementError(
            `Required ${minimum} baked buildings, but only ${placed} valid placements were found.`,
            plan.diagnostics,
            plan
        );
    }
    return plan;
}

function emptyPlan(reason, minimum = 0, maximum = 0) {
    return {
        buildings: [],
        occupied: new Set(),
        diagnostics: {
            requested: { min: minimum, max: maximum },
            placed: 0,
            complete: minimum === 0,
            blueprintIds: [],
            rejected: {},
            areaCells: 0,
            reason
        }
    };
}
