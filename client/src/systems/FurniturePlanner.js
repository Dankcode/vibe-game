// FurniturePlanner - pure, deterministic furniture planning from exported room data.
// WorldGenerator renders the returned plan with its existing THREE mesh helpers.

import {
    BUILDING_FLOOR_HEIGHT,
    BUILDING_PLACEMENT_TAGS,
    createBuildingLevelReferences
} from '../data/StructuralMatrixRules.js';

const ROOM_KITS = {
    hall: ['table', 'bench', 'rug', 'hearth'],
    bedroom: ['bed', 'crate'],
    kitchen: ['hearth', 'counter', 'shelf'],
    storage: ['crate', 'shelf'],
    workshop: ['counter', 'crate', 'stool'],
    common: ['table', 'stool', 'rug']
};

const CARDINALS = [
    { x: 0, y: -1, rotation: Math.PI },
    { x: 1, y: 0, rotation: -Math.PI / 2 },
    { x: 0, y: 1, rotation: 0 },
    { x: -1, y: 0, rotation: Math.PI / 2 }
];

export function planBuildingFurniture(building, seedHash = hashFurnitureSeed) {
    const footprint = getBuildingFootprint(building);
    if (!footprint.cells.length) return [];

    const stories = getStoryCount(building);
    const floorHeight = Math.max(1, Math.floor(
        building?.matrix?.floorHeight ||
        building?.interior?.floorHeightVoxels ||
        BUILDING_FLOOR_HEIGHT
    ));
    const groundFloorZ = Number.isFinite(Number(building?.matrix?.groundFloorZ))
        ? Number(building.matrix.groundFloorZ)
        : Number.isFinite(Number(building?.baseElevation))
            ? Number(building.baseElevation)
            : 0;
    const levelRefs = getBuildingLevelRefs(building, stories, groundFloorZ, floorHeight);
    const plan = [];

    for (let level = 0; level < stories; level++) {
        const rooms = roomsForLevel(building, level, footprint);
        const levelBlocked = createBlockedSet(building, level);
        const structuralBlocked = createStructuralBlockedSet(building, level);
        const reserved = new Set([...levelBlocked, ...structuralBlocked]);

        rooms.forEach((room, roomIndex) => {
            const roomCells = normalizeRoomCells(room, footprint);
            if (!roomCells.length) return;

            const doorCell = getRoomDoorCell(room, building, roomCells, footprint);
            const kit = getRoomKit(room.type, roomCells.length);
            const rng = mulberry32(resolveSeed(seedHash, building, level, roomIndex));
            const candidates = findWallAlignedCells(roomCells, footprint.set, reserved)
                .map((candidate, index) => ({ ...candidate, jitter: rng(), index }))
                .sort((a, b) =>
                    (a.wallRank - b.wallRank) ||
                    (a.jitter - b.jitter) ||
                    (a.y - b.y) ||
                    (a.x - b.x) ||
                    (a.index - b.index)
                );

            const roomPlaced = new Set();
            for (const type of kit) {
                const candidate = candidates.find((cell) => {
                    const key = cellKey(cell);
                    return !reserved.has(key) && !roomPlaced.has(key);
                });
                if (!candidate) continue;

                const nextPlaced = new Set(roomPlaced);
                nextPlaced.add(cellKey(candidate));
                const occupancy = new Set([...structuralBlocked, ...nextPlaced]);
                if (!validateRoomWalkability(occupancy, roomCells, doorCell)) continue;

                const key = cellKey(candidate);
                reserved.add(key);
                roomPlaced.add(key);
                plan.push({
                    level,
                    floorTag: levelRefs[level]?.tag || (level === 0 ? 'ground-floor' : `floor-${level + 1}`),
                    roomIndex,
                    type,
                    cell: { x: candidate.x, y: candidate.y },
                    rotation: candidate.rotation,
                    footprint: [{ x: candidate.x, y: candidate.y }],
                    floorElevation: levelRefs[level]?.z ?? groundFloorZ + level * floorHeight,
                    groundFloorZ,
                    placementTag: BUILDING_PLACEMENT_TAGS.FLOOR_SURFACE
                });
            }
        });
    }

    return plan;
}

function getBuildingLevelRefs(building, stories, groundFloorZ, floorHeight) {
    const matrixLevels = Array.isArray(building?.matrix?.levels) ? building.matrix.levels : [];
    if (matrixLevels.length > 0) {
        return matrixLevels
            .filter((level) => Number.isFinite(Number(level?.z)))
            .map((level, fallbackIndex) => ({
                ...level,
                index: Number.isFinite(Number(level.index)) ? Math.floor(Number(level.index)) : fallbackIndex,
                z: Math.floor(Number(level.z))
            }))
            .sort((a, b) => a.index - b.index);
    }
    return createBuildingLevelReferences(groundFloorZ, stories, { floorHeight });
}

export function getRoomKit(roomType, roomArea) {
    const normalized = String(roomType || 'common').toLowerCase();
    const kit = ROOM_KITS[normalized] || ROOM_KITS.common;
    const budget = Math.max(1, Math.floor(Math.max(0, roomArea) * 0.4));
    return kit.slice(0, budget);
}

export function findWallAlignedCells(roomCells, footprintSet, blockedSet = new Set()) {
    return normalizeCells(roomCells)
        .filter((cell) => !blockedSet.has(cellKey(cell)))
        .map((cell) => {
            const wall = getAdjacentWall(cell, footprintSet);
            return {
                ...cell,
                rotation: wall?.rotation ?? 0,
                wallRank: wall ? 0 : 1
            };
        })
        .sort((a, b) => (a.wallRank - b.wallRank) || (a.y - b.y) || (a.x - b.x));
}

export function validateRoomWalkability(placedCellsSet, roomCells, doorCell) {
    const room = normalizeCells(roomCells);
    if (!room.length) return true;

    const roomSet = new Set(room.map(cellKey));
    const blocked = normalizeKeySet(placedCellsSet);
    const free = room.filter((cell) => !blocked.has(cellKey(cell)));
    if (!free.length) return false;

    const normalizedDoor = normalizePoint(doorCell);
    const start = normalizedDoor && roomSet.has(cellKey(normalizedDoor)) && !blocked.has(cellKey(normalizedDoor))
        ? normalizedDoor
        : free[0];

    const seen = new Set([cellKey(start)]);
    const queue = [start];
    while (queue.length) {
        const current = queue.shift();
        for (const direction of CARDINALS) {
            const next = { x: current.x + direction.x, y: current.y + direction.y };
            const key = cellKey(next);
            if (seen.has(key) || blocked.has(key) || !roomSet.has(key)) continue;
            seen.add(key);
            queue.push(next);
        }
    }

    return free.every((cell) => seen.has(cellKey(cell))) && hasMinimumFreeRectangle(free, 2, 3);
}

export function hasMinimumFreeRectangle(cells, minimumWidth = 2, minimumHeight = 3) {
    const open = new Set(normalizeCells(cells).map(cellKey));
    const orientations = minimumWidth === minimumHeight
        ? [[minimumWidth, minimumHeight]]
        : [[minimumWidth, minimumHeight], [minimumHeight, minimumWidth]];
    for (const key of open) {
        const [left, top] = key.split(',').map(Number);
        for (const [width, height] of orientations) {
            let complete = true;
            for (let y = top; y < top + height && complete; y++) {
                for (let x = left; x < left + width; x++) {
                    if (!open.has(`${x},${y}`)) {
                        complete = false;
                        break;
                    }
                }
            }
            if (complete) return true;
        }
    }
    return false;
}

export function mulberry32(seed) {
    let state = Number(seed) >>> 0;
    return () => {
        state += 0x6D2B79F5;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function roomsForLevel(building, level, footprint) {
    const matchingFloor = (building.floors || []).find((floor, index) => {
        const floorLevel = Number.isFinite(Number(floor.level)) ? Number(floor.level) : index;
        return Math.floor(floorLevel) === level;
    });
    const rooms = (matchingFloor?.rooms || []).filter(Boolean);
    if (rooms.length) return rooms;

    return [{
        type: 'common',
        tiles: footprint.cells,
        doors: building.door ? [{ grid: [building.door.x, building.door.y] }] : []
    }];
}

function normalizeRoomCells(room, footprint) {
    const cells = [
        ...normalizeCells(room.tiles),
        ...normalizeCells(room.cells),
        ...normalizeCells(room.gridCells),
        ...normalizeCells(room.grid_cells)
    ];

    if (cells.length) {
        return dedupeCells(cells.filter((cell) =>
            footprint.set.has(cellKey(cell)) &&
            !isFootprintEdgeCell(footprint.set, cell.x, cell.y)
        ));
    }

    const rect = room.gridRect || room.grid_rect || room.rect;
    if (rect && Number.isFinite(Number(rect.x)) && Number.isFinite(Number(rect.y))) {
        const rectCells = [];
        const width = Math.max(1, Math.floor(Number(rect.width || 1)));
        const height = Math.max(1, Math.floor(Number(rect.height || 1)));
        for (let y = Math.floor(Number(rect.y)); y < Math.floor(Number(rect.y)) + height; y++) {
            for (let x = Math.floor(Number(rect.x)); x < Math.floor(Number(rect.x)) + width; x++) {
                if (footprint.set.has(`${x},${y}`) && !isFootprintEdgeCell(footprint.set, x, y)) {
                    rectCells.push({ x, y });
                }
            }
        }
        return rectCells;
    }

    return footprint.cells.filter((cell) => !isFootprintEdgeCell(footprint.set, cell.x, cell.y));
}

function getRoomDoorCell(room, building, roomCells, footprint) {
    const explicitDoor = (room.doors || [])
        .map((door) => normalizePoint(door.grid || door.cell || door))
        .find((point) => point && footprint.set.has(cellKey(point)));
    if (explicitDoor) return explicitDoor;

    if (building.door) {
        const door = normalizePoint(building.door);
        const edge = building.door.edge || getDoorEdge(building, door);
        const inward = getInwardDirection(edge);
        const landing = { x: door.x + inward.x, y: door.y + inward.y };
        if (roomCells.some((cell) => cell.x === landing.x && cell.y === landing.y)) return landing;
        if (roomCells.some((cell) => cell.x === door.x && cell.y === door.y)) return door;
    }

    const sorted = [...roomCells].sort((a, b) => (a.y - b.y) || (a.x - b.x));
    return sorted[0] || null;
}

function createBlockedSet(building, level) {
    const blocked = new Set();
    if (building.door) {
        const door = normalizePoint(building.door);
        if (door) {
            blocked.add(cellKey(door));
            const edge = building.door.edge || getDoorEdge(building, door);
            const inward = getInwardDirection(edge);
            blocked.add(`${door.x + inward.x},${door.y + inward.y}`);
        }
    }

    for (const stair of collectStairCells(building)) {
        const stairLevel = Number.isFinite(Number(stair.level)) ? Math.floor(Number(stair.level)) : 0;
        if (stairLevel === level || stairLevel === level - 1 || stairLevel === level + 1) {
            const point = normalizePoint(stair);
            if (point) blocked.add(cellKey(point));
        }
    }

    return blocked;
}

function createStructuralBlockedSet(building, level) {
    const blocked = new Set();
    for (const stair of collectStairCells(building)) {
        const stairLevel = Number.isFinite(Number(stair.level)) ? Math.floor(Number(stair.level)) : 0;
        if (stairLevel !== level && stairLevel !== level - 1 && stairLevel !== level + 1) continue;
        const point = normalizePoint(stair);
        if (point) blocked.add(cellKey(point));
    }
    return blocked;
}

function collectStairCells(building) {
    const cells = [];
    for (const cell of building?.stairCells || []) cells.push(cell);
    for (const stair of building?.stairs || []) {
        // Keep legacy one-cell stair markers blocked while also reserving every sector in modern
        // structural flights. `stairCells: []` must not mask a populated legacy `stairs` array.
        cells.push(stair);
        if (Array.isArray(stair?.cells)) {
            for (const cell of stair.cells) {
                cells.push({ ...cell, level: cell?.level ?? stair?.level ?? 0 });
            }
        }
    }
    const deduped = new Map();
    for (const cell of cells) {
        const point = normalizePoint(cell);
        if (!point) continue;
        const level = Number.isFinite(Number(cell?.level)) ? Math.floor(Number(cell.level)) : 0;
        deduped.set(`${point.x},${point.y},${level}`, { ...cell, ...point, level });
    }
    return [...deduped.values()];
}

function getBuildingFootprint(building) {
    const width = Math.max(0, Math.floor(Number(building?.width || 0)));
    const height = Math.max(0, Math.floor(Number(building?.height || 0)));
    const cells = Array.isArray(building?.footprintCells) && building.footprintCells.length > 0
        ? normalizeCells(building.footprintCells)
            .filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height)
        : Array.from({ length: height }, (_, y) =>
            Array.from({ length: width }, (_, x) => ({ x, y }))
        ).flat();
    const deduped = dedupeCells(cells);
    return {
        cells: deduped,
        set: new Set(deduped.map(cellKey))
    };
}

function getStoryCount(building) {
    const floorMax = Math.max(-1, ...(building.floors || []).map((floor, index) =>
        Number.isFinite(Number(floor.level)) ? Math.floor(Number(floor.level)) : index
    ));
    return Math.max(1, Math.min(3, Math.floor(building?.stories || floorMax + 1 || 1)));
}

function getAdjacentWall(cell, footprintSet) {
    return CARDINALS.find((direction) => {
        const x = cell.x + direction.x;
        const y = cell.y + direction.y;
        return !footprintSet.has(`${x},${y}`) || isFootprintEdgeCell(footprintSet, x, y);
    }) || null;
}

function isFootprintEdgeCell(footprintSet, x, y) {
    return !footprintSet.has(`${x},${y - 1}`) ||
        !footprintSet.has(`${x + 1},${y}`) ||
        !footprintSet.has(`${x},${y + 1}`) ||
        !footprintSet.has(`${x - 1},${y}`);
}

function getDoorEdge(building, door) {
    if (door.y === 0) return 'north';
    if (door.y === Math.floor(Number(building.height || 1)) - 1) return 'south';
    if (door.x === 0) return 'west';
    if (door.x === Math.floor(Number(building.width || 1)) - 1) return 'east';
    return 'south';
}

function getInwardDirection(edge) {
    return edge === 'north' ? { x: 0, y: 1 }
        : edge === 'south' ? { x: 0, y: -1 }
            : edge === 'west' ? { x: 1, y: 0 }
                : { x: -1, y: 0 };
}

function resolveSeed(seedHash, building, level, roomIndex) {
    if (typeof seedHash === 'function') {
        return Number(seedHash(building, level, roomIndex)) >>> 0;
    }
    const base = Number.isFinite(Number(seedHash)) ? Number(seedHash) : 0;
    return hashFurnitureSeed(building, level, roomIndex, base);
}

function hashFurnitureSeed(building, level, roomIndex, base = 0) {
    const value = `${base}:${building?.burgId || building?.townId || ''}:${building?.id || ''}:${level}:${roomIndex}`;
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
        hash ^= value.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function normalizeCells(cells) {
    if (!Array.isArray(cells)) return [];
    return dedupeCells(cells.map(normalizePoint).filter(Boolean));
}

function normalizePoint(point) {
    if (Array.isArray(point) && point.length >= 2) {
        const x = Number(point[0]);
        const y = Number(point[1]);
        if (Number.isFinite(x) && Number.isFinite(y)) return { x: Math.floor(x), y: Math.floor(y) };
    }
    if (point && typeof point === 'object') {
        const x = Number(point.x ?? point.gridX ?? point.col ?? point.column ?? point[0]);
        const y = Number(point.y ?? point.gridY ?? point.row ?? point[1]);
        if (Number.isFinite(x) && Number.isFinite(y)) return { x: Math.floor(x), y: Math.floor(y) };
    }
    return null;
}

function normalizeKeySet(values) {
    if (!(values instanceof Set)) return new Set();
    const keys = new Set();
    for (const value of values) {
        if (typeof value === 'string') keys.add(value);
        else {
            const point = normalizePoint(value);
            if (point) keys.add(cellKey(point));
        }
    }
    return keys;
}

function dedupeCells(cells) {
    const map = new Map();
    for (const cell of cells) map.set(cellKey(cell), cell);
    return [...map.values()].sort((a, b) => (a.y - b.y) || (a.x - b.x));
}

function cellKey(cell) {
    return `${Math.floor(cell.x)},${Math.floor(cell.y)}`;
}
