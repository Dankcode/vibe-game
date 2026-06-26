import {
    applyBuildingDoorTexturesToTileRows,
    applyBuildingStoriesToTileRows,
    stampBuildingsOnRows
} from './BuildingData.js';
import { MAP_LEGEND, symbolRowsToTileCells } from './TileLibrary.js';
import {
    createFantasyWorldPlanAt,
    FANTASY_WORLD,
    getDefaultWorldLocation,
    getWorldMapLocations,
    WORLD_VIEW_HEIGHT,
    WORLD_VIEW_WIDTH
} from './FantasyWorldData.js';

export const MAP_CHUNK_SIZE = 16;
export { MAP_LEGEND };
export { FANTASY_WORLD, getWorldMapLocations };

const DEFAULT_WORLD_LOCATION = getDefaultWorldLocation();
export const MAIN_MAP = createFantasyWorldRowsAt(DEFAULT_WORLD_LOCATION.x, DEFAULT_WORLD_LOCATION.y);

export const WILDLIFE_SPAWNS = [
    {
        id: 'meadow-hare-01',
        species: 'meadowHare',
        habitat: 'meadow',
        x: -8,
        y: -4,
        leashRadius: 4
    }
];

export function createFantasyWorldRowsAt(worldX, worldY, options = {}) {
    const townPlan = createFantasyWorldPlanAt(worldX, worldY, {
        width: options.width || WORLD_VIEW_WIDTH,
        height: options.height || WORLD_VIEW_HEIGHT
    });
    return createTownTileRows(townPlan);
}

export function createTownTileRows(townPlan) {
    const buildings = townPlan.buildings || [];
    const buildingRows = stampBuildingsOnRows(townPlan.rows, buildings, {
        villageCenter: townPlan.center,
        connectDoors: townPlan.connectDoors ?? false
    });
    const tileRows = symbolRowsToTileCells(buildingRows);
    applyBuildingStoriesToTileRows(tileRows, buildings);
    applyBuildingDoorTexturesToTileRows(tileRows, buildings);
    tileRows.buildings = buildings;
    tileRows.seed = townPlan.seed;
    tileRows.townName = townPlan.townName;
    tileRows.townCenter = townPlan.center;
    tileRows.spawn = {
        x: townPlan.center.x - Math.floor(townPlan.width / 2),
        y: townPlan.center.y - Math.floor(townPlan.height / 2)
    };
    tileRows.generator = 'azgaar-inspired-small-town-v1';
    if (townPlan.world) tileRows.world = townPlan.world;
    return tileRows;
}

export function createLegacyRandomMapRows(width = 40, height = 32, seed = Date.now(), mapHints = {}) {
    const random = seededRandom(seed);
    const features = createWorldFeatures(width, height, seed, random, mapHints);
    const rows = [];

    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            row += pickTerrainSymbol(getTerrainMetrics(x, y, features, seed, random));
        }
        rows.push(row);
    }

    const smoothedRows = smoothTerrainRows(rows, 2);
    const riverRows = carveRiver(smoothedRows, features, random);
    const villageCenter = findVillageCenter(riverRows, width, height, random);
    const villageRows = stampVillage(riverRows, villageCenter, random);
    const finalRows = smoothTerrainRows(villageRows, 1, { keepSettlements: true });
    const buildings = mapHints.buildings || [];
    const buildingRows = stampBuildingsOnRows(finalRows, buildings, { villageCenter });
    const tileRows = applyBuildingStoriesToTileRows(symbolRowsToTileCells(buildingRows), buildings);
    applyBuildingDoorTexturesToTileRows(tileRows, buildings);
    tileRows.buildings = buildings;
    tileRows.seed = seed;
    return tileRows;
}

export function seededRandom(seed) {
    let state = Math.abs(Math.floor(seed)) || 1;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function createWorldFeatures(width, height, seed, random, mapHints) {
    const ridgeAngle = mapHints.ridgeAngle ?? random() * Math.PI;
    const riverFromNorth = random() > 0.5;
    return {
        width,
        height,
        seed,
        centerX: width / 2,
        centerY: height / 2,
        seaLevel: mapHints.seaLevel ?? 0.3,
        ridgeCos: Math.cos(ridgeAngle),
        ridgeSin: Math.sin(ridgeAngle),
        moistureBias: mapHints.moistureBias ?? random() * 0.12 - 0.04,
        temperatureBias: mapHints.temperatureBias ?? random() * 0.12 - 0.06,
        volcanicBias: mapHints.volcanicBias ?? random() * 0.08,
        riverSource: {
            x: Math.floor(width * (0.38 + random() * 0.24)),
            y: Math.floor(height * (riverFromNorth ? 0.22 : 0.78))
        },
        riverTarget: {
            x: Math.floor(width * (random() > 0.5 ? 0.08 : 0.92)),
            y: Math.floor(height * (0.36 + random() * 0.28))
        }
    };
}

function getTerrainMetrics(x, y, features, seed) {
    const dx = (x - features.centerX) / features.centerX;
    const dy = (y - features.centerY) / features.centerY;
    const edge = Math.min(x, y, features.width - x - 1, features.height - y - 1);
    const islandDistance = Math.sqrt(dx * dx + dy * dy);
    const ridgeDistance = Math.abs((dx * features.ridgeCos) + (dy * features.ridgeSin));
    const continent = 1.02 - islandDistance * 0.9;
    const ridgeLift = Math.max(0, 0.2 - ridgeDistance) * 0.72;
    const broadNoise = smoothNoise(x, y, seed, 0.045) * 0.12;
    const detailNoise = smoothNoise(x, y, seed + 97, 0.11) * 0.035;
    const mountainNoise = smoothNoise(x, y, seed + 223, 0.1);
    const heightScore = continent + ridgeLift + broadNoise + detailNoise + mountainNoise * 0.15;
    const latitude = Math.abs((y / features.height) - 0.5) * 2;
    const temperature = 1 - latitude * 0.78 - Math.max(0, heightScore - 0.7) * 0.48 +
        smoothNoise(x, y, seed + 421, 0.04) * 0.1 + features.temperatureBias;
    const moisture = 0.48 + smoothNoise(x, y, seed + 641, 0.075) * 0.28 -
        Math.max(0, heightScore - 0.78) * 0.18 + features.moistureBias;

    return {
        x,
        y,
        edge,
        heightScore,
        mountainNoise,
        temperature,
        moisture,
        seaLevel: features.seaLevel,
        volcanicBias: features.volcanicBias
    };
}

function pickTerrainSymbol(metrics) {
    const { edge, heightScore, mountainNoise, temperature, moisture, seaLevel, volcanicBias } = metrics;

    if (edge <= 1 || heightScore < seaLevel - 0.16) return moisture > 0.58 ? 'B' : 'W';
    if (heightScore < seaLevel - 0.04) return moisture > 0.66 ? 'B' : 'W';
    if (heightScore < seaLevel + 0.08) return 'S';

    if (temperature < 0.1 && heightScore < 0.66 && moisture > 0.5) return 'I';
    if (heightScore > 1.16 && temperature < 0.34) return 'P';

    const volcanicScore = mountainNoise + volcanicBias + Math.max(0, heightScore - 0.92);
    if (heightScore > 1.02 && volcanicScore > 1.34 && temperature > 0.32) return 'L';
    if (heightScore > 1.08) return mountainNoise > 0.16 ? 'M' : 'H';
    if (heightScore > 0.86) return 'H';
    if (moisture > 0.64 && temperature > 0.24) return 'F';
    return 'G';
}

function smoothTerrainRows(rows, iterations = 1, options = {}) {
    let current = rows;
    for (let pass = 0; pass < iterations; pass++) {
        const mutable = current.map((row) => row.split(''));
        for (let y = 1; y < current.length - 1; y++) {
            for (let x = 1; x < current[y].length - 1; x++) {
                const symbol = current[y][x];
                if (options.keepSettlements && ['R', 'T', 'A', 'C', 'D', 'E', 'U'].includes(symbol)) continue;
                const replacement = getDominantNeighborSymbol(current, x, y, symbol);
                if (replacement) mutable[y][x] = replacement;
            }
        }
        current = mutable.map((row) => row.join(''));
    }
    return current;
}

function getDominantNeighborSymbol(rows, x, y, symbol) {
    const counts = new Map();
    for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
            if (ox === 0 && oy === 0) continue;
            const neighbor = rows[y + oy]?.[x + ox];
            if (!neighbor) continue;
            counts.set(neighbor, (counts.get(neighbor) || 0) + 1);
        }
    }

    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const [dominant, dominantCount] = sorted[0] || [];
    const currentCount = counts.get(symbol) || 0;
    if (!dominant || dominant === symbol) return null;
    if (dominantCount >= 5 && currentCount <= 2) return dominant;
    if (['H', 'M', 'P', 'L', 'I', 'F'].includes(symbol) && dominantCount >= 4) return dominant;
    return null;
}

function stampVillage(rows, center, random) {
    const mutable = rows.map((row) => row.split(''));
    for (let x = center.x - 11; x <= center.x + 11; x++) {
        if (mutable[center.y]?.[x] && canPlaceRoad(mutable[center.y][x])) mutable[center.y][x] = 'R';
    }
    for (let y = center.y - 8; y <= center.y + 8; y++) {
        if (mutable[y]?.[center.x] && canPlaceRoad(mutable[y][center.x])) mutable[y][center.x] = 'R';
    }

    for (let i = 0; i < 18; i++) {
        const gx = center.x + Math.floor(random() * 20) - 10;
        const gy = center.y + Math.floor(random() * 14) - 7;
        if (mutable[gy]?.[gx] && mutable[gy][gx] === 'G') mutable[gy][gx] = 'F';
    }

    return mutable.map((row) => row.join(''));
}

function canPlaceRoad(symbol) {
    return ['G', 'F', 'S', 'H', 'R'].includes(symbol);
}

function carveRiver(rows, features, random) {
    const mutable = rows.map((row) => row.split(''));
    let x = features.riverSource.x;
    let y = features.riverSource.y;
    const maxSteps = features.width + features.height;

    for (let step = 0; step < maxSteps; step++) {
        if (!mutable[y]?.[x]) break;
        const symbol = mutable[y][x];
        if (!['M', 'P', 'L'].includes(symbol)) {
            mutable[y][x] = symbol === 'S' ? 'W' : 'B';
            markRiverBank(mutable, x + 1, y);
            markRiverBank(mutable, x - 1, y);
            markRiverBank(mutable, x, y + 1);
            markRiverBank(mutable, x, y - 1);
        }

        if (x <= 2 || y <= 2 || x >= features.width - 3 || y >= features.height - 3) break;

        const targetDx = Math.sign(features.riverTarget.x - x);
        const targetDy = Math.sign(features.riverTarget.y - y);
        if (random() > 0.52) x += targetDx || (random() > 0.5 ? 1 : -1);
        if (random() > 0.42) y += targetDy || (random() > 0.5 ? 1 : -1);
        if (random() > 0.76) x += random() > 0.5 ? 1 : -1;
        if (random() > 0.84) y += random() > 0.5 ? 1 : -1;
        x = Math.max(1, Math.min(features.width - 2, x));
        y = Math.max(1, Math.min(features.height - 2, y));
    }

    return mutable.map((row) => row.join(''));
}

function markRiverBank(mutable, x, y) {
    if (!mutable[y]?.[x]) return;
    if (['G', 'F', 'H'].includes(mutable[y][x])) mutable[y][x] = 'S';
}

function findVillageCenter(rows, width, height, random) {
    let best = { x: Math.floor(width / 2), y: Math.floor(height / 2), score: -Infinity };

    for (let y = 8; y < height - 8; y++) {
        for (let x = 8; x < width - 8; x++) {
            let score = random() * 0.8;
            for (let oy = -4; oy <= 4; oy++) {
                for (let ox = -4; ox <= 4; ox++) {
                    const symbol = rows[y + oy]?.[x + ox];
                    if (['G', 'F', 'S'].includes(symbol)) score += 2;
                    if (symbol === 'H') score += 0.4;
                    if (['W', 'B', 'I', 'L', 'M', 'P'].includes(symbol)) score -= 3.2;
                }
            }
            const edgeDistance = Math.min(x, y, width - x - 1, height - y - 1);
            score += Math.min(edgeDistance, 14) * 0.18;
            if (score > best.score) best = { x, y, score };
        }
    }

    return { x: best.x, y: best.y };
}

function smoothNoise(x, y, seed, scale) {
    const a = Math.sin((x * scale + seed * 0.013) * 12.9898 + (y * scale - seed * 0.007) * 78.233) * 43758.5453;
    return (a - Math.floor(a)) * 2 - 1;
}
