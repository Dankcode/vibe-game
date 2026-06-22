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
                mutable[row][col] = getStairSymbol(stair?.direction);
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

function getStairSymbol(direction = 'north') {
    const suffix = direction.charAt(0).toUpperCase() + direction.slice(1);
    return BUILDING_SYMBOLS[`stairs${suffix}`] || BUILDING_SYMBOLS.stairs;
}

function canStampOver(symbol) {
    return ['G', 'F', 'S', 'H', 'R', BUILDING_SYMBOLS.floor].includes(symbol);
}

function canStampDoorApproach(symbol) {
    return ['G', 'F', 'S', 'H', 'R'].includes(symbol);
}
