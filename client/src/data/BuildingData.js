import { BUILDING_PARTS, DOOR_STYLE_TEXTURES, TEXTURE_IDS } from './TileLibrary.js';

export const BUILDING_SYMBOLS = {
    stoneWall: 'A',
    timberWall: 'C',
    stoneWindowNorth: 'N',
    stoneWindowSouth: 'O',
    stoneWindowWest: 'J',
    stoneWindowEast: 'K',
    timberWindowNorth: 'Q',
    timberWindowSouth: 'V',
    timberWindowWest: 'Y',
    timberWindowEast: 'Z',
    door: 'D',
    floor: 'E',
    stairs: 'U',
    stairsNorth: '1',
    stairsSouth: '2',
    stairsWest: '3',
    stairsEast: '4',
    timberStairsNorth: '5',
    timberStairsSouth: '6',
    timberStairsWest: '7',
    timberStairsEast: '8',
    approach: 'R'
};

export const DEFAULT_BUILDINGS = [
    {
        id: 'guild-hall',
        name: 'Guild Hall',
        x: -11,
        y: -8,
        width: 8,
        height: 6,
        stories: 3,
        style: 'timber',
        doorStyle: 'oak',
        door: { x: 4, y: 5 },
        stairs: [{ x: 1, y: 1, direction: 'north' }]
    },
    {
        id: 'village-inn',
        name: 'Village Inn',
        x: 3,
        y: -8,
        width: 8,
        height: 6,
        stories: 1,
        style: 'stone',
        doorStyle: 'iron',
        door: { x: 4, y: 5 },
        stairs: [{ x: 6, y: 1, direction: 'north' }]
    },
    {
        id: 'craft-house',
        name: 'Craft House',
        x: -10,
        y: 3,
        width: 7,
        height: 6,
        stories: 1,
        style: 'timber',
        doorStyle: 'painted',
        door: { x: 3, y: 0 },
        stairs: [{ x: 5, y: 4, direction: 'south' }]
    },
    {
        id: 'general-store',
        name: 'General Store',
        x: 3,
        y: 3,
        width: 7,
        height: 6,
        stories: 1,
        style: 'stone',
        doorStyle: 'oak',
        door: { x: 3, y: 0 },
        stairs: [{ x: 1, y: 4, direction: 'south' }]
    },
    {
        id: 'watch-house',
        name: 'Watch House',
        x: 12,
        y: -2,
        width: 5,
        height: 5,
        stories: 2,
        style: 'stone',
        doorStyle: 'iron',
        door: { x: 0, y: 2 },
        stairs: [{ x: 3, y: 3, direction: 'east' }]
    }
];

export function createGeneratedBuildings(width, height, seed, villageCenter) {
    const random = seededBuildingRandom(seed);
    const centerX = villageCenter.x - Math.floor(width / 2);
    const centerY = villageCenter.y - Math.floor(height / 2);
    const templates = [
        { id: 'hall', name: 'Guild Hall', dx: -11, dy: -8, width: 8, height: 6, doorEdge: 'south', stories: 3 },
        { id: 'inn', name: 'Village Inn', dx: 3, dy: -8, width: 8, height: 6, doorEdge: 'south' },
        { id: 'house', name: 'Craft House', dx: -10, dy: 3, width: 7, height: 6, doorEdge: 'north' },
        { id: 'store', name: 'General Store', dx: 3, dy: 3, width: 7, height: 6, doorEdge: 'north' },
        { id: 'tower', name: 'Watch House', dx: 12, dy: -2, width: 5, height: 5, doorEdge: 'west' }
    ];

    return templates.map((template, index) => {
        const style = random() > 0.48 ? 'stone' : 'timber';
        const stories = template.stories || (random() > 0.78 ? 3 : random() > 0.48 ? 2 : 1);
        const door = getCenteredDoor(template.width, template.height, template.doorEdge);
        const stairs = getInteriorStairs(template.width, template.height, template.doorEdge, random);
        return {
            id: `${template.id}-${Math.abs(Math.floor(seed))}-${index}`,
            name: template.name,
            x: clamp(template.dx + centerX, -Math.floor(width / 2) + 2, Math.floor(width / 2) - template.width - 2),
            y: clamp(template.dy + centerY, -Math.floor(height / 2) + 2, Math.floor(height / 2) - template.height - 2),
            width: template.width,
            height: template.height,
            stories,
            style,
            doorStyle: ['oak', 'iron', 'painted'][index % 3],
            door,
            stairs: [stairs]
        };
    });
}

export function applyBuildingStoriesToTileRows(tileRows, buildings = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return tileRows;
    const height = tileRows.length;
    const width = tileRows[0]?.length || 0;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);

    for (const building of buildings) {
        const stories = Math.max(1, Math.min(3, Math.floor(building.stories || 1)));
        const baseElevation = Math.max(0, Math.floor(building.baseElevation || 0));
        const wallHeight = baseElevation + stories * 2;
        const upperFloorMap = createUpperFloorElevationMap(building, stories);
        const footprint = getBuildingFootprint(building);
        for (const { x: localX, y: localY } of footprint.cells) {
                const isEdge = isBuildingEdgeCell(footprint.set, localX, localY);
                const isDoor = building.door?.x === localX && building.door?.y === localY;
                const row = building.y + localY + offsetY;
                const col = building.x + localX + offsetX;
                const cell = tileRows[row]?.[col];
                if (!cell) continue;
                cell.height = baseElevation;
                if (isEdge && !isDoor) {
                    cell.height = wallHeight;
                    continue;
                }
                if (!isEdge && stories > 1) {
                    const upperElevation = upperFloorMap.get(`${localX},${localY}`) || 0;
                    if (upperElevation > 0) cell.height = baseElevation + upperElevation;
                }
        }
    }
    return tileRows;
}

export function applyBuildingDoorTexturesToTileRows(tileRows, buildings = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return tileRows;
    const offsetX = Math.floor((tileRows[0]?.length || 0) / 2);
    const offsetY = Math.floor(tileRows.length / 2);

    for (const building of buildings) {
        if (!building.door) continue;
        const row = building.y + building.door.y + offsetY;
        const col = building.x + building.door.x + offsetX;
        const doorCell = tileRows[row]?.[col];
        if (!doorCell) continue;
        if ([
            BUILDING_PARTS.STAIRS,
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST
        ].includes(doorCell.building)) continue;
        doorCell.texture = DOOR_STYLE_TEXTURES[building.doorStyle] || DOOR_STYLE_TEXTURES.oak;
        doorCell.doorStyleTexture = doorCell.texture;
        doorCell.texture = 2;
    }

    return tileRows;
}

export function applyBuildingFloorTexturesToTileRows(tileRows, buildings = []) {
    if (!Array.isArray(tileRows) || tileRows.length === 0) return tileRows;
    const offsetX = Math.floor((tileRows[0]?.length || 0) / 2);
    const offsetY = Math.floor(tileRows.length / 2);

    for (const building of buildings) {
        const floorTexture = building.style === 'stone'
            ? TEXTURE_IDS.STONE_FLOOR
            : TEXTURE_IDS.WOOD_FLOOR;
        const stairTexture = building.style === 'stone'
            ? TEXTURE_IDS.STONE_STAIRS
            : TEXTURE_IDS.TIMBER_STAIRS;
        for (const { x: localX, y: localY } of getBuildingFootprint(building).cells) {
                const row = building.y + localY + offsetY;
                const col = building.x + localX + offsetX;
                const cell = tileRows[row]?.[col];
                if (!cell) continue;
                if (cell.building === BUILDING_PARTS.FLOOR) {
                    cell.texture = floorTexture;
                } else if ([
                    BUILDING_PARTS.STAIRS,
                    BUILDING_PARTS.STAIRS_NORTH,
                    BUILDING_PARTS.STAIRS_SOUTH,
                    BUILDING_PARTS.STAIRS_WEST,
                    BUILDING_PARTS.STAIRS_EAST
                ].includes(cell.building)) {
                    cell.texture = stairTexture;
                }
        }
    }

    return tileRows;
}

export function stampBuildingsOnRows(rows, buildings = DEFAULT_BUILDINGS, options = {}) {
    if (!Array.isArray(rows) || rows.length === 0) return rows;

    const mutable = rows.map((row) => row.split(''));
    const height = mutable.length;
    const width = mutable[0].length;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);

    if (options.normalizeDoors !== false) {
        normalizeBuildingEntrances(mutable, buildings, offsetX, offsetY);
    }
    prepareTownLots(mutable, buildings, offsetX, offsetY, options);
    for (const building of buildings) {
        stampBuilding(mutable, building, offsetX, offsetY);
        stampDoorApproach(mutable, building, offsetX, offsetY);
    }

    return mutable.map((row) => row.join(''));
}

function normalizeBuildingEntrances(mutable, buildings, offsetX, offsetY) {
    for (const building of buildings) {
        const safeDoor = findSafeDoor(building, mutable, offsetX, offsetY);
        if (safeDoor) building.door = safeDoor;
    }
}

function findSafeDoor(building, mutable, offsetX, offsetY) {
    const candidates = [];
    for (let x = 1; x < building.width - 1; x++) {
        candidates.push({ x, y: 0, edge: 'north' });
        candidates.push({ x, y: building.height - 1, edge: 'south' });
    }
    for (let y = 1; y < building.height - 1; y++) {
        candidates.push({ x: 0, y, edge: 'west' });
        candidates.push({ x: building.width - 1, y, edge: 'east' });
    }

    let best = null;
    for (const candidate of candidates) {
        const direction = getEdgeDirection(candidate.edge);
        const outsideRow = building.y + candidate.y + direction.y + offsetY;
        const outsideCol = building.x + candidate.x + direction.x + offsetX;
        const outsideSymbol = mutable[outsideRow]?.[outsideCol];
        const outsidePassable = canStampDoorApproach(outsideSymbol);
        const roadScore = getRoadAdjacencyScore(mutable, outsideCol, outsideRow);
        const originalDistance = building.door
            ? Math.abs(candidate.x - building.door.x) + Math.abs(candidate.y - building.door.y)
            : 0;
        const centerDistance = Math.abs(candidate.x - (building.width - 1) / 2) +
            Math.abs(candidate.y - (building.height - 1) / 2);
        const score = (outsidePassable ? 120 : -120) +
            roadScore * 18 -
            originalDistance * 2 -
            centerDistance;

        if (!best || score > best.score) best = { ...candidate, score };
    }

    if (!best) return getCenteredDoor(building.width, building.height, getDoorEdge(building));
    return { x: best.x, y: best.y };
}

function getRoadAdjacencyScore(mutable, col, row) {
    let score = isRoadLike(mutable[row]?.[col]) ? 2 : 0;
    for (const offset of [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ]) {
        if (isRoadLike(mutable[row + offset.y]?.[col + offset.x])) score++;
    }
    return score;
}

function isRoadLike(symbol) {
    return ['R', '.', ':', ';'].includes(symbol);
}

function prepareTownLots(mutable, buildings, offsetX, offsetY, options) {
    for (const building of buildings) {
        for (let localY = -1; localY <= building.height; localY++) {
            for (let localX = -1; localX <= building.width; localX++) {
                const row = building.y + localY + offsetY;
                const col = building.x + localX + offsetX;
                if (!mutable[row]?.[col]) continue;
                mutable[row][col] = BUILDING_SYMBOLS.approach;
            }
        }

        const approach = getDoorApproachPosition(building);
        if (approach && options.villageCenter && options.connectDoors !== false) {
            stampRoadPath(mutable, approach, {
                x: options.villageCenter.x - offsetX,
                y: options.villageCenter.y - offsetY
            }, offsetX, offsetY);
        }
    }
}

function stampRoadPath(mutable, from, to, offsetX, offsetY) {
    let x = from.x;
    let y = from.y;
    while (x !== to.x) {
        stampRoadCell(mutable, x, y, offsetX, offsetY);
        x += Math.sign(to.x - x);
    }
    while (y !== to.y) {
        stampRoadCell(mutable, x, y, offsetX, offsetY);
        y += Math.sign(to.y - y);
    }
    stampRoadCell(mutable, x, y, offsetX, offsetY);
}

function stampRoadCell(mutable, x, y, offsetX, offsetY) {
    const row = y + offsetY;
    const col = x + offsetX;
    if (!mutable[row]?.[col]) return;
    mutable[row][col] = BUILDING_SYMBOLS.approach;
}

function getDoorApproachPosition(building) {
    if (!building.door) return null;
    const edge = getEdge(building, building.door.x, building.door.y);
    const direction = getEdgeDirection(edge);
    if (!direction) return null;
    return {
        x: building.x + building.door.x + direction.x,
        y: building.y + building.door.y + direction.y
    };
}

function stampBuilding(mutable, building, offsetX, offsetY) {
    const wallSymbol = building.style === 'stone'
        ? BUILDING_SYMBOLS.stoneWall
        : BUILDING_SYMBOLS.timberWall;
    const stairKeys = new Set((building.stairs || []).map((stair) => `${stair.x},${stair.y}`));
    const footprint = getBuildingFootprint(building);

    for (const { x: localX, y: localY } of footprint.cells) {
            const row = building.y + localY + offsetY;
            const col = building.x + localX + offsetX;
            if (!mutable[row]?.[col]) continue;
            if (!canStampOver(mutable[row][col]) && !building.footprintCells?.length) continue;

            const isEdge = isBuildingEdgeCell(footprint.set, localX, localY);
            const isDoor = building.door?.x === localX && building.door?.y === localY;
            const isStairs = stairKeys.has(`${localX},${localY}`);

            const edge = getEdge(building, localX, localY, footprint.set);

            if (isStairs) {
                const stair = (building.stairs || []).find((candidate) => candidate.x === localX && candidate.y === localY);
                mutable[row][col] = getStairSymbol(stair?.direction, building.style);
            } else if (isDoor) {
                mutable[row][col] = BUILDING_SYMBOLS.door;
            } else if (isWindowCandidate(building, localX, localY, edge)) {
                mutable[row][col] = getWindowSymbol(building.style, edge);
            } else {
                mutable[row][col] = isEdge ? wallSymbol : BUILDING_SYMBOLS.floor;
            }
    }
}

function createUpperFloorElevationMap(building, stories) {
    const map = new Map();
    if (stories <= 1) return map;

    const stairs = getStoryStairs(building, stories);
    const stairKeys = new Set(stairs.map((stair) => `${stair.x},${stair.y}`));
    stairs.forEach((stair, index) => {
        const elevation = (index + 1) * 2;
        map.set(`${stair.x},${stair.y}`, elevation);
        for (const point of getUpperFloorZone(building, stairs, stair, index)) {
            if (stairKeys.has(`${point.x},${point.y}`)) continue;
            map.set(`${point.x},${point.y}`, Math.max(map.get(`${point.x},${point.y}`) || 0, elevation));
        }
    });

    return map;
}

function getStoryStairs(building, stories) {
    const baseStair = building.stairs?.[0] || getInteriorStairs(building.width, building.height, getDoorEdge(building), () => 0.25);
    if ((building.stairs || []).length >= stories - 1) {
        const minX = building.width > 2 ? 1 : 0;
        const maxX = building.width > 2 ? building.width - 2 : building.width - 1;
        const minY = building.height > 2 ? 1 : 0;
        const maxY = building.height > 2 ? building.height - 2 : building.height - 1;
        return building.stairs.slice(0, stories - 1).map((stair, level) => ({
            ...stair,
            x: clamp(stair.x, minX, maxX),
            y: clamp(stair.y, minY, maxY),
            level
        }));
    }

    const stairs = [];
    const doorEdge = getDoorEdge(building);
    const landingBias = getLandingBias(doorEdge);
    for (let level = 0; level < stories - 1; level++) {
        const offset = level * 3;
        stairs.push({
            ...baseStair,
            x: clamp(
                baseStair.x + landingBias.x * offset,
                building.width > 2 ? 1 : 0,
                building.width > 2 ? building.width - 2 : building.width - 1
            ),
            y: clamp(
                baseStair.y + landingBias.y * offset,
                building.height > 2 ? 1 : 0,
                building.height > 2 ? building.height - 2 : building.height - 1
            ),
            level
        });
    }
    return stairs;
}

function getUpperFloorZone(building, stairs, stair, levelIndex) {
    const zone = [];
    const footprint = getBuildingFootprint(building);
    const radiusX = Math.max(2, Math.min(4, Math.floor((building.width - 2) / 2)));
    const radiusY = Math.max(1, Math.min(3, Math.floor((building.height - 2) / 2)));
    const nextStair = stairs[levelIndex + 1];
    const directionBias = nextStair
        ? { x: Math.sign(stair.x - nextStair.x), y: Math.sign(stair.y - nextStair.y) }
        : getLandingBias(getDoorEdge(building));
    const centerX = clamp(stair.x + directionBias.x, 1, building.width - 2);
    const centerY = clamp(stair.y + directionBias.y, 1, building.height - 2);

    for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
        for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
            if (!footprint.set.has(`${x},${y}`)) continue;
            if (isBuildingEdgeCell(footprint.set, x, y)) continue;
            if (building.door?.x === x && building.door?.y === y) continue;
            zone.push({ x, y });
        }
    }
    return zone;
}

function getLandingBias(doorEdge) {
    return {
        north: { x: 0, y: 1 },
        south: { x: 0, y: -1 },
        west: { x: 1, y: 0 },
        east: { x: -1, y: 0 }
    }[doorEdge] || { x: 0, y: -1 };
}

function getDoorEdge(building) {
    if (!building?.door) return 'south';
    return building.door.edge || getEdge(building, building.door.x, building.door.y, getBuildingFootprint(building).set) || 'south';
}

function stampDoorApproach(mutable, building, offsetX, offsetY) {
    if (!building.door) return;

    const edge = getEdge(building, building.door.x, building.door.y);
    const direction = getEdgeDirection(edge);
    if (!direction) return;

    const doorRow = building.y + building.door.y + offsetY;
    const doorCol = building.x + building.door.x + offsetX;
    const approachRow = doorRow + direction.y;
    const approachCol = doorCol + direction.x;
    if (!mutable[approachRow]?.[approachCol]) return;
    if (!canStampDoorApproach(mutable[approachRow][approachCol])) return;
    mutable[approachRow][approachCol] = BUILDING_SYMBOLS.approach;
}

function isWindowCandidate(building, localX, localY, edge) {
    if (!edge) return false;
    const isCorner = (localX === 0 || localX === building.width - 1) &&
        (localY === 0 || localY === building.height - 1);
    if (isCorner) return false;
    return (localX + localY + building.id.length) % 2 === 0;
}

function getBuildingFootprint(building) {
    const cells = Array.isArray(building.footprintCells) && building.footprintCells.length > 0
        ? building.footprintCells
            .map((cell) => ({ x: Math.floor(cell.x), y: Math.floor(cell.y) }))
            .filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < building.width && cell.y < building.height)
        : Array.from({ length: building.height }, (_, y) =>
            Array.from({ length: building.width }, (_, x) => ({ x, y }))
        ).flat();
    const set = new Set(cells.map((cell) => `${cell.x},${cell.y}`));
    return { cells, set };
}

function isBuildingEdgeCell(cellSet, localX, localY) {
    return !cellSet.has(`${localX},${localY - 1}`) ||
        !cellSet.has(`${localX + 1},${localY}`) ||
        !cellSet.has(`${localX},${localY + 1}`) ||
        !cellSet.has(`${localX - 1},${localY}`);
}

function getEdge(building, localX, localY, footprintSet = null) {
    if (building?.door?.x === localX && building?.door?.y === localY && building.door.edge) return building.door.edge;
    if (footprintSet) {
        const candidates = [
            ['north', `${localX},${localY - 1}`],
            ['east', `${localX + 1},${localY}`],
            ['south', `${localX},${localY + 1}`],
            ['west', `${localX - 1},${localY}`]
        ];
        const exposed = candidates.find(([, key]) => !footprintSet.has(key));
        if (exposed) return exposed[0];
    }
    if (localY === 0) return 'north';
    if (localY === building.height - 1) return 'south';
    if (localX === 0) return 'west';
    if (localX === building.width - 1) return 'east';
    return null;
}

function getEdgeDirection(edge) {
    return {
        north: { x: 0, y: -1 },
        south: { x: 0, y: 1 },
        west: { x: -1, y: 0 },
        east: { x: 1, y: 0 }
    }[edge] || null;
}

function getWindowSymbol(style, edge) {
    const prefix = style === 'stone' ? 'stone' : 'timber';
    const suffix = edge.charAt(0).toUpperCase() + edge.slice(1);
    return BUILDING_SYMBOLS[`${prefix}Window${suffix}`] || BUILDING_SYMBOLS[`${prefix}Wall`];
}

function getStairSymbol(direction = 'north', style = 'stone') {
    const suffix = direction.charAt(0).toUpperCase() + direction.slice(1);
    if (style === 'timber') {
        return BUILDING_SYMBOLS[`timberStairs${suffix}`] || BUILDING_SYMBOLS.stairs;
    }
    return BUILDING_SYMBOLS[`stairs${suffix}`] || BUILDING_SYMBOLS.stairs;
}

function getCenteredDoor(width, height, edge) {
    if (edge === 'north') return { x: Math.floor(width / 2), y: 0 };
    if (edge === 'south') return { x: Math.floor(width / 2), y: height - 1 };
    if (edge === 'west') return { x: 0, y: Math.floor(height / 2) };
    return { x: width - 1, y: Math.floor(height / 2) };
}

function getInteriorStairs(width, height, doorEdge, random) {
    const direction = doorEdge === 'north' ? 'south'
        : doorEdge === 'south' ? 'north'
            : doorEdge === 'west' ? 'east'
                : 'west';
    const x = doorEdge === 'west' ? width - 2
        : doorEdge === 'east' ? 1
            : random() > 0.5 ? 1 : width - 2;
    const y = doorEdge === 'north' ? height - 2
        : doorEdge === 'south' ? 1
            : random() > 0.5 ? 1 : height - 2;
    return { x, y, direction };
}

function seededBuildingRandom(seed) {
    let state = Math.abs(Math.floor(seed)) || 1;
    return () => {
        state = (state * 1103515245 + 12345) % 2147483648;
        return state / 2147483648;
    };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function canStampOver(symbol) {
    return ['G', 'F', 'S', 'H', 'R', '.', ':', ';', ',', BUILDING_SYMBOLS.floor].includes(symbol);
}

function canStampDoorApproach(symbol) {
    return ['G', 'F', 'S', 'H', 'R', '.', ':', ';', ','].includes(symbol);
}
