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
        id: 'market-hall',
        name: 'Market Hall',
        x: -11,
        y: -7,
        width: 8,
        height: 6,
        style: 'timber',
        door: { x: 3, y: 5 },
        stairs: [{ x: 5, y: 2, direction: 'north' }]
    },
    {
        id: 'stone-inn',
        name: 'Stone Inn',
        x: 3,
        y: -8,
        width: 9,
        height: 7,
        style: 'stone',
        door: { x: 4, y: 6 },
        stairs: [{ x: 6, y: 2, direction: 'north' }]
    },
    {
        id: 'ridge-house',
        name: 'Ridge House',
        x: -5,
        y: 5,
        width: 7,
        height: 6,
        style: 'timber',
        door: { x: 3, y: 0 },
        stairs: [{ x: 1, y: 3, direction: 'south' }]
    },
    {
        id: 'watch-tower',
        name: 'Watch Tower',
        x: 10,
        y: 5,
        width: 5,
        height: 5,
        style: 'stone',
        door: { x: 2, y: 4 },
        stairs: [{ x: 2, y: 2, direction: 'north' }]
    }
];

export function createGeneratedBuildings(width, height, seed, villageCenter, terrainRows = []) {
    const random = seededBuildingRandom(seed);
    const centerX = villageCenter.x - Math.floor(width / 2);
    const centerY = villageCenter.y - Math.floor(height / 2);
    const occupied = new Set();
    const templates = [
        { id: 'hall', name: 'Guild Hall', dx: -11, dy: -8, width: 8, height: 6, doorEdge: 'south' },
        { id: 'inn', name: 'Village Inn', dx: 3, dy: -9, width: 9, height: 7, doorEdge: 'south' },
        { id: 'house', name: 'Craft House', dx: -7, dy: 5, width: 7, height: 6, doorEdge: 'north' },
        { id: 'store', name: 'General Store', dx: 3, dy: 5, width: 7, height: 6, doorEdge: 'north' },
        { id: 'tower', name: 'Watch House', dx: 11, dy: 2, width: 5, height: 5, doorEdge: 'west' }
    ];

    return templates.map((template, index) => {
        const style = random() > 0.48 ? 'stone' : 'timber';
        const door = getCenteredDoor(template.width, template.height, template.doorEdge);
        const stairs = getInteriorStairs(template.width, template.height, template.doorEdge, random);
        const building = {
            id: `${template.id}-${Math.abs(Math.floor(seed))}-${index}`,
            name: template.name,
            x: clamp(template.dx + centerX, -Math.floor(width / 2) + 2, Math.floor(width / 2) - template.width - 2),
            y: clamp(template.dy + centerY, -Math.floor(height / 2) + 2, Math.floor(height / 2) - template.height - 2),
            width: template.width,
            height: template.height,
            style,
            door,
            stairs: [stairs]
        };
        const origin = findBuildableOrigin(building, terrainRows, width, height, occupied);
        if (!origin) return null;
        building.x = origin.x;
        building.y = origin.y;
        reserveBuildingArea(building, occupied);
        return building;
    }).filter(Boolean);
}

export function stampBuildingsOnRows(rows, buildings = DEFAULT_BUILDINGS) {
    if (!Array.isArray(rows) || rows.length === 0) return rows;

    const mutable = rows.map((row) => row.split(''));
    const height = mutable.length;
    const width = mutable[0].length;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);

    for (const building of buildings) {
        stampBuilding(mutable, building, offsetX, offsetY);
        stampDoorApproach(mutable, building, offsetX, offsetY);
    }

    return mutable.map((row) => row.join(''));
}

function stampBuilding(mutable, building, offsetX, offsetY) {
    const wallSymbol = building.style === 'stone'
        ? BUILDING_SYMBOLS.stoneWall
        : BUILDING_SYMBOLS.timberWall;
    const stairKeys = new Set((building.stairs || []).map((stair) => `${stair.x},${stair.y}`));

    for (let localY = 0; localY < building.height; localY++) {
        for (let localX = 0; localX < building.width; localX++) {
            const row = building.y + localY + offsetY;
            const col = building.x + localX + offsetX;
            if (!mutable[row]?.[col]) continue;
            if (!canStampOver(mutable[row][col])) continue;

            const isEdge = localX === 0 || localY === 0 ||
                localX === building.width - 1 || localY === building.height - 1;
            const isDoor = building.door?.x === localX && building.door?.y === localY;
            const isStairs = stairKeys.has(`${localX},${localY}`);

            const edge = getEdge(building, localX, localY);

            if (isDoor) {
                mutable[row][col] = BUILDING_SYMBOLS.door;
            } else if (isStairs) {
                const stair = (building.stairs || []).find((candidate) => candidate.x === localX && candidate.y === localY);
                mutable[row][col] = getStairSymbol(stair?.direction, building.style);
            } else if (isWindowCandidate(building, localX, localY, edge)) {
                mutable[row][col] = getWindowSymbol(building.style, edge);
            } else {
                mutable[row][col] = isEdge ? wallSymbol : BUILDING_SYMBOLS.floor;
            }
        }
    }
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

function getEdge(building, localX, localY) {
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

function findBuildableOrigin(building, rows, width, height, occupied) {
    if (!rows.length) return { x: building.x, y: building.y };
    const candidates = [{ x: building.x, y: building.y }];
    for (let radius = 1; radius <= 8; radius++) {
        for (let offset = -radius; offset <= radius; offset++) {
            candidates.push(
                { x: building.x + offset, y: building.y - radius },
                { x: building.x + offset, y: building.y + radius },
                { x: building.x - radius, y: building.y + offset },
                { x: building.x + radius, y: building.y + offset }
            );
        }
    }

    return candidates.find((candidate) =>
        isBuildableOrigin({ ...building, ...candidate }, rows, width, height, occupied)
    ) || null;
}

function isBuildableOrigin(building, rows, width, height, occupied) {
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    for (let localY = -1; localY <= building.height; localY++) {
        for (let localX = -1; localX <= building.width; localX++) {
            const worldX = building.x + localX;
            const worldY = building.y + localY;
            const row = worldY + offsetY;
            const col = worldX + offsetX;
            const symbol = rows[row]?.[col];
            if (!symbol || !['G', 'F', 'S', 'H', 'R'].includes(symbol)) return false;
            if (occupied.has(`${worldX},${worldY}`)) return false;
        }
    }
    return true;
}

function reserveBuildingArea(building, occupied) {
    for (let localY = -1; localY <= building.height; localY++) {
        for (let localX = -1; localX <= building.width; localX++) {
            occupied.add(`${building.x + localX},${building.y + localY}`);
        }
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function canStampOver(symbol) {
    return ['G', 'F', 'S', 'H', 'R', BUILDING_SYMBOLS.floor].includes(symbol);
}

function canStampDoorApproach(symbol) {
    return ['G', 'F', 'S', 'H', 'R'].includes(symbol);
}
