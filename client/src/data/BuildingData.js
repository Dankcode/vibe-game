import { DOOR_STYLE_TEXTURES } from './TileLibrary.js';

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
        const wallHeight = stories * 2;
        const upperFloorMap = createUpperFloorElevationMap(building, stories);
        for (let localY = 0; localY < building.height; localY++) {
            for (let localX = 0; localX < building.width; localX++) {
                const isEdge = localX === 0 || localY === 0 ||
                    localX === building.width - 1 || localY === building.height - 1;
                const isDoor = building.door?.x === localX && building.door?.y === localY;
                const row = building.y + localY + offsetY;
                const col = building.x + localX + offsetX;
                const cell = tileRows[row]?.[col];
                if (!cell) continue;
                if (isEdge && !isDoor) {
                    cell.height = wallHeight;
                    continue;
                }
                if (!isEdge && stories > 1) {
                    const upperElevation = upperFloorMap.get(`${localX},${localY}`) || 0;
                    if (upperElevation > 0) cell.height = upperElevation;
                }
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
        doorCell.texture = DOOR_STYLE_TEXTURES[building.doorStyle] || DOOR_STYLE_TEXTURES.oak;
        doorCell.doorStyleTexture = doorCell.texture;
        doorCell.texture = 2;
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

    prepareTownLots(mutable, buildings, offsetX, offsetY, options);
    for (const building of buildings) {
        stampBuilding(mutable, building, offsetX, offsetY);
        stampDoorApproach(mutable, building, offsetX, offsetY);
    }

    return mutable.map((row) => row.join(''));
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

function createUpperFloorElevationMap(building, stories) {
    const map = new Map();
    if (stories <= 1) return map;

    const stairs = getStoryStairs(building, stories);
    const stairKeys = new Set(stairs.map((stair) => `${stair.x},${stair.y}`));
    stairs.forEach((stair, index) => {
        const elevation = (index + 1) * 2;
        map.set(`${stair.x},${stair.y}`, elevation);
        for (const point of getUpperFloorZone(building, stair, index)) {
            if (stairKeys.has(`${point.x},${point.y}`)) continue;
            map.set(`${point.x},${point.y}`, Math.max(map.get(`${point.x},${point.y}`) || 0, elevation));
        }
    });

    return map;
}

function getStoryStairs(building, stories) {
    const baseStair = building.stairs?.[0] || getInteriorStairs(building.width, building.height, getDoorEdge(building), () => 0.25);
    const stairs = [];
    for (let level = 0; level < stories - 1; level++) {
        stairs.push({
            ...baseStair,
            x: clamp(
                baseStair.x + level * (baseStair.x <= building.width / 2 ? 1 : -1),
                1,
                building.width - 2
            ),
            y: clamp(
                baseStair.y + level * (baseStair.y <= building.height / 2 ? 1 : -1),
                1,
                building.height - 2
            )
        });
    }
    return stairs;
}

function getUpperFloorZone(building, stair, levelIndex) {
    const zone = [];
    const radiusX = building.width >= 9 ? 3 : 2;
    const radiusY = building.height >= 7 ? 2 : 1;
    const biasX = stair.x <= building.width / 2 ? 1 : -1;
    const biasY = stair.y <= building.height / 2 ? 1 : -1;
    const centerX = clamp(stair.x + biasX * levelIndex, 1, building.width - 2);
    const centerY = clamp(stair.y + biasY * levelIndex, 1, building.height - 2);

    for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
        for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
            if (x <= 0 || y <= 0 || x >= building.width - 1 || y >= building.height - 1) continue;
            if (building.door?.x === x && building.door?.y === y) continue;
            zone.push({ x, y });
        }
    }
    return zone;
}

function getDoorEdge(building) {
    if (!building?.door) return 'south';
    return getEdge(building, building.door.x, building.door.y) || 'south';
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

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function canStampOver(symbol) {
    return ['G', 'F', 'S', 'H', 'R', BUILDING_SYMBOLS.floor].includes(symbol);
}

function canStampDoorApproach(symbol) {
    return ['G', 'F', 'S', 'H', 'R'].includes(symbol);
}
