const DEFAULT_WIDTH = 40;
const DEFAULT_HEIGHT = 32;

const BUILDING_TEMPLATES = [
    { id: 'hall', role: 'Hall', dx: -9, dy: -8, width: 7, height: 6, doorEdge: 'south', stories: 3 },
    { id: 'inn', role: 'Inn', dx: 3, dy: -7, width: 7, height: 5, doorEdge: 'south', stories: 2 },
    { id: 'smithy', role: 'Smithy', dx: -11, dy: 2, width: 6, height: 5, doorEdge: 'east', stories: 1 },
    { id: 'market', role: 'Market', dx: 4, dy: 2, width: 6, height: 5, doorEdge: 'west', stories: 2 },
    { id: 'house', role: 'House', dx: -4, dy: 7, width: 6, height: 5, doorEdge: 'north', stories: 1 },
    { id: 'watch', role: 'Watch House', dx: 11, dy: -1, width: 5, height: 5, doorEdge: 'west', stories: 2 }
];

const NAME_STARTS = ['Ash', 'Alder', 'Briar', 'Dun', 'Elder', 'Fal', 'Green', 'High', 'Oak', 'Raven', 'Stone', 'Willow'];
const NAME_ENDS = ['bridge', 'brook', 'ford', 'haven', 'mere', 'ridge', 'stead', 'vale', 'watch', 'wick'];
const DOOR_STYLES = ['oak', 'iron', 'painted'];

/**
 * A compact grid adaptation of Azgaar FMG's data-first pipeline:
 * terrain cells are scored for settlement suitability, important destinations
 * are connected by weighted land routes, and render-ready voxel blueprints are
 * produced separately from the map simulation data.
 */
export function generateAzgaarTownPlan(options = {}) {
    const width = Math.max(DEFAULT_WIDTH, Math.floor(options.width || DEFAULT_WIDTH));
    const height = Math.max(DEFAULT_HEIGHT, Math.floor(options.height || DEFAULT_HEIGHT));
    const seed = normalizeSeed(options.seed);
    const random = seededRandom(seed);
    const terrain = createTerrain(width, height, seed);
    const center = findSettlementSite(terrain, random);
    const townName = generateTownName(random);
    const buildings = createTownBuildings(width, height, center, townName, random);

    carveTownRoads(terrain, center, buildings);

    return {
        seed,
        width,
        height,
        center,
        townName,
        rows: terrain.map((row) => row.join('')),
        buildings
    };
}

function createTerrain(width, height, seed) {
    const rows = Array.from({ length: height }, () => Array(width).fill('G'));
    const waterCenterY = height * 0.36;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const edge = Math.min(x, y, width - x - 1, height - y - 1);
            const coastWave = 2.2 + Math.sin(y * 0.43 + seed * 0.001) * 1.25;
            const shoreWave = coastWave + 1.6;
            const moisture = noise(x, y, seed + 191);
            const elevation = noise(x, y, seed + 557) + noise(x * 0.42, y * 0.42, seed + 811) * 0.55;

            if (x < coastWave || (x < coastWave + 2 && Math.abs(y - waterCenterY) < 2)) {
                rows[y][x] = moisture > 0.25 ? 'B' : 'W';
            } else if (x < shoreWave) {
                rows[y][x] = 'S';
            } else if (edge <= 1 && elevation < -0.42) {
                rows[y][x] = 'S';
            } else if (elevation > 1.08 && (x > width * 0.72 || y > height * 0.76)) {
                rows[y][x] = 'H';
            } else if (moisture > 0.57 && edge > 3) {
                rows[y][x] = 'F';
            }
        }
    }

    return rows;
}

function findSettlementSite(rows, random) {
    const height = rows.length;
    const width = rows[0].length;
    let best = { x: Math.floor(width / 2), y: Math.floor(height / 2), score: -Infinity };

    for (let y = 10; y < height - 10; y++) {
        for (let x = 13; x < width - 14; x++) {
            let score = random() * 0.2;
            for (let oy = -9; oy <= 9; oy++) {
                for (let ox = -12; ox <= 12; ox++) {
                    const symbol = rows[y + oy]?.[x + ox];
                    if (symbol === 'G') score += 1;
                    else if (symbol === 'F') score += 0.58;
                    else if (symbol === 'S') score += 0.18;
                    else if (symbol === 'H') score -= 0.8;
                    else if (symbol === 'W' || symbol === 'B') score -= 3;
                }
            }
            score -= Math.abs(x - width * 0.54) * 0.3;
            score -= Math.abs(y - height * 0.5) * 0.2;
            if (score > best.score) best = { x, y, score };
        }
    }

    return { x: best.x, y: best.y };
}

function createTownBuildings(width, height, center, townName, random) {
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const centerWorldX = center.x - offsetX;
    const centerWorldY = center.y - offsetY;

    return BUILDING_TEMPLATES.map((template, index) => {
        const door = getCenteredDoor(template.width, template.height, template.doorEdge);
        return {
            id: `${template.id}-${index}`,
            name: template.role === 'Hall' ? `${townName} Hall` : `${townName} ${template.role}`,
            x: centerWorldX + template.dx,
            y: centerWorldY + template.dy,
            width: template.width,
            height: template.height,
            stories: template.stories,
            style: index % 3 === 0 || random() > 0.56 ? 'stone' : 'timber',
            doorStyle: DOOR_STYLES[index % DOOR_STYLES.length],
            door,
            stairs: [{
                ...getInteriorStairs(template.width, template.height, template.doorEdge, index),
                direction: oppositeDirection(template.doorEdge)
            }]
        };
    });
}

function carveTownRoads(rows, center, buildings) {
    const height = rows.length;
    const width = rows[0].length;
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    const plazaRadius = 2;

    for (let y = center.y - plazaRadius; y <= center.y + plazaRadius; y++) {
        for (let x = center.x - plazaRadius; x <= center.x + plazaRadius; x++) {
            if (isRoadable(rows[y]?.[x])) rows[y][x] = 'R';
        }
    }

    const gates = [
        { x: Math.max(4, Math.floor(width * 0.16)), y: center.y },
        { x: width - 3, y: center.y },
        { x: center.x, y: 2 },
        { x: center.x, y: height - 3 }
    ];
    for (const gate of gates) carveWeightedRoute(rows, center, gate);

    for (const building of buildings) {
        const approach = getDoorApproach(building);
        if (!approach) continue;
        carveWeightedRoute(rows, {
            x: approach.x + offsetX,
            y: approach.y + offsetY
        }, center);
    }
}

function carveWeightedRoute(rows, start, goal) {
    const path = findWeightedPath(rows, start, goal);
    for (const point of path) {
        if (isRoadable(rows[point.y]?.[point.x])) rows[point.y][point.x] = 'R';
    }
}

function findWeightedPath(rows, start, goal) {
    const height = rows.length;
    const width = rows[0].length;
    const startKey = `${start.x},${start.y}`;
    const open = [{ ...start, priority: 0 }];
    const cameFrom = new Map();
    const cost = new Map([[startKey, 0]]);

    while (open.length > 0) {
        open.sort((a, b) => a.priority - b.priority);
        const current = open.shift();
        if (current.x === goal.x && current.y === goal.y) break;

        for (const direction of CARDINAL_DIRECTIONS) {
            const next = { x: current.x + direction.x, y: current.y + direction.y };
            if (next.x < 1 || next.y < 1 || next.x >= width - 1 || next.y >= height - 1) continue;
            const stepCost = getRouteCost(rows[next.y][next.x]);
            if (!Number.isFinite(stepCost)) continue;
            const nextKey = `${next.x},${next.y}`;
            const nextCost = (cost.get(`${current.x},${current.y}`) || 0) + stepCost;
            if (nextCost >= (cost.get(nextKey) ?? Infinity)) continue;
            cost.set(nextKey, nextCost);
            cameFrom.set(nextKey, current);
            next.priority = nextCost + Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y);
            open.push(next);
        }
    }

    const path = [];
    let current = goal;
    while (current && `${current.x},${current.y}` !== startKey) {
        path.push(current);
        current = cameFrom.get(`${current.x},${current.y}`);
    }
    if (current) path.push(start);
    return path.reverse();
}

function getRouteCost(symbol) {
    if (symbol === 'W' || symbol === 'B') return Infinity;
    if (symbol === 'R') return 0.45;
    if (symbol === 'H') return 4.2;
    if (symbol === 'F') return 1.35;
    if (symbol === 'S') return 1.2;
    return 1;
}

function getDoorApproach(building) {
    const edge = getDoorEdge(building);
    const direction = CARDINAL_DIRECTIONS.find((candidate) => candidate.name === edge);
    if (!direction) return null;
    return {
        x: building.x + building.door.x + direction.x,
        y: building.y + building.door.y + direction.y
    };
}

function getDoorEdge(building) {
    if (building.door.y === 0) return 'north';
    if (building.door.y === building.height - 1) return 'south';
    if (building.door.x === 0) return 'west';
    return 'east';
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

function oppositeDirection(direction) {
    return { north: 'south', south: 'north', east: 'west', west: 'east' }[direction] || 'north';
}

function generateTownName(random) {
    const start = NAME_STARTS[Math.floor(random() * NAME_STARTS.length)];
    const end = NAME_ENDS[Math.floor(random() * NAME_ENDS.length)];
    return `${start}${end}`;
}

function normalizeSeed(seed) {
    const numeric = Number(seed);
    return Number.isFinite(numeric) ? Math.abs(Math.floor(numeric)) || 1 : Date.now();
}

function seededRandom(seed) {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function noise(x, y, seed) {
    const value = Math.sin((x + seed * 0.017) * 12.9898 + (y - seed * 0.011) * 78.233) * 43758.5453;
    return (value - Math.floor(value)) * 2 - 1;
}

function isRoadable(symbol) {
    return ['G', 'F', 'S', 'H', 'R'].includes(symbol);
}

const CARDINAL_DIRECTIONS = [
    { name: 'north', x: 0, y: -1 },
    { name: 'south', x: 0, y: 1 },
    { name: 'west', x: -1, y: 0 },
    { name: 'east', x: 1, y: 0 }
];
