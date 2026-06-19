import { ELEMENTS } from './TileRegistry.js';

export const MAP_CHUNK_SIZE = 16;

export const MAP_LEGEND = {
    'W': { element: ELEMENTS.HYDRO, maxZ: 0, textureValue: 2 }, // Deep water
    'B': { element: ELEMENTS.HYDRO, maxZ: 0, textureValue: 4 }, // Brackish water
    'S': { element: ELEMENTS.ANEMO, maxZ: 1, textureValue: 0 }, // Sand block
    'G': { element: ELEMENTS.GEO,   maxZ: 1, textureValue: 0 }, // Grass
    'F': { element: ELEMENTS.GEO,   maxZ: 1, textureValue: 1 }, // Forest floor
    'H': { element: ELEMENTS.GEO,   maxZ: 2, textureValue: 3 }, // Hill/High Grass
    'M': { element: ELEMENTS.GEO,   maxZ: 3, textureValue: 4 }, // Mountain
    'P': { element: ELEMENTS.CRYO,  maxZ: 4, textureValue: 0 }, // Snow Peak
    'I': { element: ELEMENTS.CRYO,  maxZ: 0, textureValue: 1 }, // Ice Lake
    'L': { element: ELEMENTS.PYRO,  maxZ: 2, textureValue: 0 }, // Lava Pool
    'R': { element: ELEMENTS.GEO,   maxZ: 1, textureValue: 2 }, // Road/plaza
    'T': { element: ELEMENTS.STRUCTURE, maxZ: 3, textureValue: 1 }, // Town/building wall
    'X': { element: ELEMENTS.STRUCTURE, maxZ: 2, textureValue: 0 }  // Stone/blocked wall
};

export const MAIN_MAP = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWGSSSSSWWWWWWWWWWWWWWWWWW",
    "WWWWWGSSSSSGGWWWWWWWWHHHHWWWWW",
    "WWWWGGGGSSGGGGWWWWWHHHHHHGHWWW",
    "WWWWGGGGGGGGGGGWHHHHMMMMHHGGWW",
    "WWWGGGHHGGGGGGGWHHHHMMMMHHGGWW",
    "WWWGGHHMMHGGGGGWHHMMMMMMMHGGWW",
    "WWWGGHMMMHGGGGGWHHMMMMMMMHGGWW",
    "WWGGHMMMMHGHHHHWHMMPPPPMHGGWWW",
    "WWGGHMMMMHHHHHHWHHMPPPPMHHGWWW",
    "WWGGHMMMHHGHGGGHHHMMPPMMMHGGWW",
    "WWGGGHHHHGGGGGGHWWHHMMMMMHGWWW",
    "WWWGGGGGGGGGWGGHWWWWWHHHHHGGWW",
    "WWWWWGGGGGGWWGGHWWHHWWHHHGGWWW",
    "WWWWWGGGGGWBBWGHWWWHWWHHGGGWWW",
    "WWWWWGGGGGWWBBGWWWWWHWHHGGWWWW",
    "WWWWWGGGGGBBBBWWWWWWWHHHGWWWWW",
    "WWWWWGGGGGWBBWWWWWHWHWWHWWWWWW",
    "WWWWWWGGGGWWWWWHHHHWWHHWWWWWWW",
    "WWWWWWWGGGWHHHHHHMMHWHGWWWWWWW",
    "WWWWWWWWWWHHMMMMMMMHWHGGWWWWWW",
    "WWWWWWWWHHMMMMLLMMHHWHHGWWWWWW",
    "WWWWWWWWHHMMMLLLMMHHWWHGWWWWWW",
    "WWWWWWWWHHMMMMLLMMHWWWHWWWWWWW",
    "WWWWWWWWHHHHMMMMHHWWWWWWWWWWWW",
    "WWWWWWWWWHHHHHHHHHWWWWWWWWWWWW",
    "WWWWWWWWIIIHWHHHWWWWWWWWWWWWWW",
    "WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW",
    "WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

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

export function createRandomMapRows(width = 72, height = 60, seed = Date.now(), mapHints = {}) {
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

    const riverRows = carveRiver(rows, features, random);
    const villageCenter = findVillageCenter(riverRows, width, height, random);
    return stampVillage(riverRows, villageCenter, random);
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
        seaLevel: mapHints.seaLevel ?? 0.34,
        ridgeCos: Math.cos(ridgeAngle),
        ridgeSin: Math.sin(ridgeAngle),
        moistureBias: mapHints.moistureBias ?? random() * 0.18 - 0.06,
        temperatureBias: mapHints.temperatureBias ?? random() * 0.16 - 0.08,
        volcanicBias: mapHints.volcanicBias ?? random() * 0.18,
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
    const ridgeLift = Math.max(0, 0.28 - ridgeDistance) * 1.38;
    const broadNoise = smoothNoise(x, y, seed, 0.055) * 0.18;
    const detailNoise = smoothNoise(x, y, seed + 97, 0.15) * 0.08;
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

    if (temperature < 0.14 && heightScore < 0.72 && moisture > 0.42) return 'I';
    if (heightScore > 1.08 && temperature < 0.4) return 'P';

    const volcanicScore = mountainNoise + volcanicBias + Math.max(0, heightScore - 0.92);
    if (heightScore > 0.88 && volcanicScore > 1.22 && temperature > 0.28) return 'L';
    if (heightScore > 0.95) return mountainNoise > 0.08 ? 'M' : 'H';
    if (heightScore > 0.74) return moisture > 0.62 && temperature > 0.24 ? 'F' : 'H';
    if (moisture > 0.58 && temperature > 0.22) return 'F';
    return 'G';
}

function stampVillage(rows, center, random) {
    const mutable = rows.map((row) => row.split(''));
    const footprints = [
        { x: -7, y: -3, w: 5, h: 4 },
        { x: 3, y: -4, w: 6, h: 4 },
        { x: -2, y: 4, w: 5, h: 4 }
    ];

    for (const footprint of footprints) {
        for (let y = 0; y < footprint.h; y++) {
            for (let x = 0; x < footprint.w; x++) {
                const gx = center.x + footprint.x + x;
                const gy = center.y + footprint.y + y;
                if (!mutable[gy]?.[gx]) continue;
                if (!canPlaceSettlement(mutable[gy][gx])) continue;
                const isEdge = x === 0 || y === 0 || x === footprint.w - 1 || y === footprint.h - 1;
                mutable[gy][gx] = isEdge ? 'T' : 'R';
            }
        }
    }

    for (let x = center.x - 11; x <= center.x + 11; x++) {
        if (mutable[center.y]?.[x] && mutable[center.y][x] !== 'T' && canPlaceRoad(mutable[center.y][x])) mutable[center.y][x] = 'R';
    }
    for (let y = center.y - 8; y <= center.y + 8; y++) {
        if (mutable[y]?.[center.x] && mutable[y][center.x] !== 'T' && canPlaceRoad(mutable[y][center.x])) mutable[y][center.x] = 'R';
    }

    for (let i = 0; i < 18; i++) {
        const gx = center.x + Math.floor(random() * 20) - 10;
        const gy = center.y + Math.floor(random() * 14) - 7;
        if (mutable[gy]?.[gx] && mutable[gy][gx] === 'G') mutable[gy][gx] = 'F';
    }

    return mutable.map((row) => row.join(''));
}

function canPlaceSettlement(symbol) {
    return ['G', 'F', 'S'].includes(symbol);
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
