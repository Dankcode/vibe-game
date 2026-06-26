export const WORLD_VIEW_WIDTH = 64;
export const WORLD_VIEW_HEIGHT = 48;

export const FANTASY_WORLD = {
    id: 'static-fmg-test-world',
    name: 'Eldoria',
    seed: 987341,
    width: 640,
    height: 420,
    locations: [
        { id: 'willowbrook', name: 'Willowbrook', type: 'capital', x: 314, y: 206, population: 7200, culture: 'stone' },
        { id: 'ravenwatch', name: 'Ravenwatch', type: 'fortress', x: 448, y: 132, population: 2100, culture: 'timber' },
        { id: 'dunmere', name: 'Dunmere', type: 'port', x: 172, y: 238, population: 3600, culture: 'stone' },
        { id: 'ashford', name: 'Ashford', type: 'market', x: 382, y: 292, population: 2800, culture: 'timber' },
        { id: 'elderwick', name: 'Elderwick', type: 'village', x: 252, y: 118, population: 1450, culture: 'timber' },
        { id: 'stonevale', name: 'Stonevale', type: 'mining', x: 512, y: 268, population: 1900, culture: 'stone' },
        { id: 'falhaven', name: 'Falhaven', type: 'harbor', x: 92, y: 156, population: 2500, culture: 'timber' }
    ],
    routes: [
        ['willowbrook', 'ravenwatch'],
        ['willowbrook', 'dunmere'],
        ['willowbrook', 'ashford'],
        ['willowbrook', 'elderwick'],
        ['ashford', 'stonevale'],
        ['dunmere', 'falhaven'],
        ['elderwick', 'falhaven'],
        ['ravenwatch', 'stonevale']
    ]
};

const BUILDING_SETS = {
    capital: [
        { id: 'hall', role: 'Hall', dx: -12, dy: -10, width: 10, height: 8, doorEdge: 'south', stories: 3 },
        { id: 'inn', role: 'Inn', dx: 5, dy: -9, width: 9, height: 7, doorEdge: 'south', stories: 2 },
        { id: 'guild', role: 'Guild', dx: -17, dy: 4, width: 8, height: 7, doorEdge: 'east', stories: 2 },
        { id: 'market', role: 'Market', dx: 6, dy: 5, width: 9, height: 7, doorEdge: 'west', stories: 2 },
        { id: 'townhouse', role: 'Townhouse', dx: -4, dy: 13, width: 8, height: 7, doorEdge: 'north', stories: 2 },
        { id: 'watch', role: 'Watch House', dx: 17, dy: -1, width: 7, height: 7, doorEdge: 'west', stories: 3 }
    ],
    fortress: [
        { id: 'keep', role: 'Keep', dx: -7, dy: -8, width: 9, height: 8, doorEdge: 'south', stories: 3 },
        { id: 'barracks', role: 'Barracks', dx: 6, dy: -5, width: 9, height: 6, doorEdge: 'south', stories: 2 },
        { id: 'armory', role: 'Armory', dx: -10, dy: 5, width: 7, height: 6, doorEdge: 'east', stories: 2 },
        { id: 'tower', role: 'Tower', dx: 9, dy: 6, width: 6, height: 6, doorEdge: 'west', stories: 3 }
    ],
    port: [
        { id: 'harbormaster', role: 'Harbormaster', dx: -9, dy: -7, width: 9, height: 7, doorEdge: 'south', stories: 2 },
        { id: 'inn', role: 'Inn', dx: 5, dy: -7, width: 9, height: 7, doorEdge: 'south', stories: 2 },
        { id: 'warehouse', role: 'Warehouse', dx: -12, dy: 5, width: 10, height: 6, doorEdge: 'east', stories: 1 },
        { id: 'market', role: 'Fish Market', dx: 7, dy: 5, width: 8, height: 6, doorEdge: 'west', stories: 1 }
    ],
    default: [
        { id: 'hall', role: 'Hall', dx: -8, dy: -7, width: 8, height: 7, doorEdge: 'south', stories: 2 },
        { id: 'inn', role: 'Inn', dx: 5, dy: -6, width: 8, height: 6, doorEdge: 'south', stories: 2 },
        { id: 'shop', role: 'Shop', dx: -9, dy: 5, width: 7, height: 6, doorEdge: 'east', stories: 1 },
        { id: 'house', role: 'House', dx: 5, dy: 6, width: 7, height: 6, doorEdge: 'west', stories: 1 }
    ]
};

export function getWorldMapLocations() {
    return FANTASY_WORLD.locations.map((location) => ({ ...location }));
}

export function getDefaultWorldLocation() {
    return FANTASY_WORLD.locations.find((location) => location.id === 'willowbrook') || FANTASY_WORLD.locations[0];
}

export function createFantasyWorldPlanAt(worldX, worldY, options = {}) {
    const width = Math.max(24, Math.floor(options.width || WORLD_VIEW_WIDTH));
    const height = Math.max(18, Math.floor(options.height || WORLD_VIEW_HEIGHT));
    const centerX = clamp(Math.round(worldX), 0, FANTASY_WORLD.width - 1);
    const centerY = clamp(Math.round(worldY), 0, FANTASY_WORLD.height - 1);
    const originX = centerX - Math.floor(width / 2);
    const originY = centerY - Math.floor(height / 2);
    const mutable = [];

    for (let row = 0; row < height; row++) {
        const symbols = [];
        for (let col = 0; col < width; col++) {
            const x = originX + col;
            const y = originY + row;
            symbols.push(getWorldTerrainSymbol(x, y));
        }
        mutable.push(symbols);
    }

    stampWorldRoutes(mutable, originX, originY);
    const nearbyLocations = getLocationsInWindow(originX, originY, width, height);
    for (const location of nearbyLocations) {
        stampSettlementRoads(mutable, location, originX, originY);
    }

    const rows = mutable.map((row) => row.join(''));
    const buildings = nearbyLocations.flatMap((location) => createSettlementBuildings(location, centerX, centerY));
    return attachWorldMetadata({
        rows,
        buildings,
        connectDoors: true
    }, {
        centerX,
        centerY,
        originX,
        originY,
        width,
        height,
        nearbyLocations
    });
}

function attachWorldMetadata(plan, metadata) {
    plan.world = {
        id: FANTASY_WORLD.id,
        name: FANTASY_WORLD.name,
        seed: FANTASY_WORLD.seed,
        centerX: metadata.centerX,
        centerY: metadata.centerY,
        originX: metadata.originX,
        originY: metadata.originY,
        locations: metadata.nearbyLocations.map((location) => location.id)
    };
    plan.width = metadata.width;
    plan.height = metadata.height;
    plan.center = {
        x: metadata.centerX - metadata.originX,
        y: metadata.centerY - metadata.originY
    };
    plan.townName = FANTASY_WORLD.name;
    plan.seed = FANTASY_WORLD.seed;
    return plan;
}

function getLocationsInWindow(originX, originY, width, height) {
    const margin = 24;
    return FANTASY_WORLD.locations.filter((location) =>
        location.x >= originX - margin &&
        location.x < originX + width + margin &&
        location.y >= originY - margin &&
        location.y < originY + height + margin
    );
}

function stampWorldRoutes(mutable, originX, originY) {
    for (const [fromId, toId] of FANTASY_WORLD.routes) {
        const from = FANTASY_WORLD.locations.find((location) => location.id === fromId);
        const to = FANTASY_WORLD.locations.find((location) => location.id === toId);
        if (!from || !to) continue;
        forEachCell(mutable, originX, originY, (row, col, x, y) => {
            const distance = distanceToSegment(x, y, from.x, from.y, to.x, to.y);
            if (distance <= 0.7 && isRoadable(mutable[row][col])) mutable[row][col] = 'R';
            if (distance <= 1.45 && mutable[row][col] === 'F') mutable[row][col] = 'G';
        });
    }
}

function stampSettlementRoads(mutable, location, originX, originY) {
    const localX = Math.round(location.x - originX);
    const localY = Math.round(location.y - originY);
    const radius = location.type === 'capital' ? 4 : location.type === 'fortress' ? 3 : 2;

    for (let y = localY - radius; y <= localY + radius; y++) {
        for (let x = localX - radius; x <= localX + radius; x++) {
            if (!mutable[y]?.[x]) continue;
            if (Math.abs(x - localX) + Math.abs(y - localY) <= radius + 1 && isRoadable(mutable[y][x])) {
                mutable[y][x] = 'R';
            }
        }
    }
}

function createSettlementBuildings(location, centerX, centerY) {
    const localCenterX = location.x - centerX;
    const localCenterY = location.y - centerY;
    const templates = BUILDING_SETS[location.type] || BUILDING_SETS.default;
    const random = seededRandom(FANTASY_WORLD.seed + hashString(location.id));

    return templates.map((template, index) => {
        const style = template.style || (location.culture === 'stone' || random() > 0.46 ? 'stone' : 'timber');
        const door = getCenteredDoor(template.width, template.height, template.doorEdge);
        return {
            id: `${location.id}-${template.id}-${index}`,
            name: `${location.name} ${template.role}`,
            x: Math.round(localCenterX + template.dx),
            y: Math.round(localCenterY + template.dy),
            width: template.width,
            height: template.height,
            stories: template.stories,
            style,
            doorStyle: ['oak', 'iron', 'painted'][(index + location.id.length) % 3],
            door,
            stairs: getStoryStairs(template.width, template.height, template.doorEdge, template.stories, index)
        };
    });
}

function getWorldTerrainSymbol(x, y) {
    const nx = x / FANTASY_WORLD.width;
    const ny = y / FANTASY_WORLD.height;
    const coast = Math.min(nx, ny, 1 - nx, 1 - ny);
    const continental = 1.1 - Math.hypot(nx - 0.54, ny - 0.52) * 1.42;
    const ridge = Math.max(0, 0.17 - Math.abs((nx - 0.62) * 0.72 - (ny - 0.48))) * 3.2;
    const elevation = continental + ridge + smoothNoise(x, y, 0.018, FANTASY_WORLD.seed) * 0.35;
    const moisture = 0.48 + smoothNoise(x, y, 0.032, FANTASY_WORLD.seed + 401) * 0.35;
    const cold = ny < 0.18 || (elevation > 0.98 && ny < 0.38);

    if (coast < 0.035 || elevation < 0.06) return moisture > 0.55 ? 'B' : 'W';
    if (coast < 0.06 || elevation < 0.12) return 'S';
    if (cold && elevation > 0.8) return 'P';
    if (cold && moisture > 0.48) return 'I';
    if (elevation > 1.18) return 'M';
    if (elevation > 0.92) return 'H';
    if (moisture > 0.64) return 'F';
    return 'G';
}

function forEachCell(mutable, originX, originY, callback) {
    for (let row = 0; row < mutable.length; row++) {
        for (let col = 0; col < mutable[row].length; col++) {
            callback(row, col, originX + col, originY + row);
        }
    }
}

function distanceToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) return Math.hypot(px - ax, py - ay);
    const t = clamp(((px - ax) * dx + (py - ay) * dy) / lengthSq, 0, 1);
    return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

function smoothNoise(x, y, scale, seed) {
    return (
        valueNoise(x * scale, y * scale, seed) * 0.55 +
        valueNoise(x * scale * 2.1, y * scale * 2.1, seed + 97) * 0.3 +
        valueNoise(x * scale * 4.6, y * scale * 4.6, seed + 211) * 0.15
    );
}

function valueNoise(x, y, seed) {
    const value = Math.sin((x + seed * 0.013) * 12.9898 + (y - seed * 0.021) * 78.233) * 43758.5453;
    return (value - Math.floor(value)) * 2 - 1;
}

function seededRandom(seed) {
    let state = Math.abs(Math.floor(seed)) || 1;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function isRoadable(symbol) {
    return ['G', 'F', 'S', 'H', 'R'].includes(symbol);
}

function getCenteredDoor(width, height, edge) {
    if (edge === 'north') return { x: Math.floor(width / 2), y: 0 };
    if (edge === 'south') return { x: Math.floor(width / 2), y: height - 1 };
    if (edge === 'west') return { x: 0, y: Math.floor(height / 2) };
    return { x: width - 1, y: Math.floor(height / 2) };
}

function getInteriorStairs(width, height, edge, index) {
    if (edge === 'north') return { x: index % 2 ? 1 : width - 2, y: height - 2 };
    if (edge === 'south') return { x: index % 2 ? width - 2 : 1, y: 1 };
    if (edge === 'west') return { x: width - 2, y: index % 2 ? 1 : height - 2 };
    return { x: 1, y: index % 2 ? height - 2 : 1 };
}

function getStoryStairs(width, height, edge, stories, index) {
    const base = getInteriorStairs(width, height, edge, index);
    const direction = { north: 'south', south: 'north', east: 'west', west: 'east' }[edge] || 'north';
    const stairs = [];
    for (let level = 0; level < Math.max(1, stories - 1); level++) {
        stairs.push({
            x: clamp(base.x + level * (base.x <= width / 2 ? 1 : -1), 1, width - 2),
            y: clamp(base.y + level * (base.y <= height / 2 ? 1 : -1), 1, height - 2),
            direction
        });
    }
    return stairs;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
