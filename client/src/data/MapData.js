import { ELEMENTS } from './TileRegistry.js';

export const MAP_CHUNK_SIZE = 16;

export const MAP_LEGEND = {
    'W': { element: ELEMENTS.HYDRO, maxZ: 0, textureValue: 2 }, // Deep water
    'B': { element: ELEMENTS.HYDRO, maxZ: 0, textureValue: 4 }, // Brackish water
    'S': { element: ELEMENTS.ANEMO, maxZ: 1, textureValue: 0 }, // Sand block
    'G': { element: ELEMENTS.GEO,   maxZ: 1, textureValue: 0 }, // Grass
    'F': { element: ELEMENTS.GEO,   maxZ: 1, textureValue: 1 }, // Forest floor
    'H': { element: ELEMENTS.GEO,   maxZ: 2, textureValue: 0 }, // Hill/High Grass
    'M': { element: ELEMENTS.GEO,   maxZ: 3, textureValue: 0 }, // Mountain
    'P': { element: ELEMENTS.CRYO,  maxZ: 4, textureValue: 0 }, // Snow Peak
    'I': { element: ELEMENTS.CRYO,  maxZ: 0, textureValue: 0 }, // Ice Lake
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

export function createRandomMapRows(width = 64, height = 56, seed = Date.now()) {
    const random = seededRandom(seed);
    const centerX = width / 2;
    const centerY = height / 2;
    const ridgeAngle = random() * Math.PI;
    const ridgeCos = Math.cos(ridgeAngle);
    const ridgeSin = Math.sin(ridgeAngle);
    const villageCenter = {
        x: Math.floor(width * (0.42 + random() * 0.16)),
        y: Math.floor(height * (0.5 + random() * 0.12 - 0.06))
    };
    const rows = [];

    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            const edge = Math.min(x, y, width - x - 1, height - y - 1);
            const dx = (x - centerX) / centerX;
            const dy = (y - centerY) / centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const ridge = Math.abs((dx * ridgeCos) + (dy * ridgeSin));
            const islandNoise = smoothNoise(x, y, seed, 0.08) * 0.16 + smoothNoise(x, y, seed + 97, 0.19) * 0.08;
            const mountainNoise = smoothNoise(x, y, seed + 223, 0.11);
            const heightScore = 1.05 - distance + islandNoise + Math.max(0, 0.22 - ridge) * 1.2 + mountainNoise * 0.18;
            const villageDistance = Math.hypot(x - villageCenter.x, y - villageCenter.y);

            row += pickTerrainSymbol({
                edge,
                distance,
                heightScore,
                mountainNoise,
                villageDistance,
                random,
                x,
                y,
                width,
                height
            });
        }
        rows.push(row);
    }

    return stampVillage(rows, villageCenter, random);
}

export function seededRandom(seed) {
    let state = Math.abs(Math.floor(seed)) || 1;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function pickTerrainSymbol(context) {
    const { edge, heightScore, mountainNoise, villageDistance, random, x, y, width, height } = context;

    if (edge <= 1 || heightScore < 0.18) return random() > 0.88 ? 'B' : 'W';
    if (heightScore < 0.3) return random() > 0.82 ? 'B' : 'W';
    if (heightScore < 0.43) return 'S';

    if (villageDistance < 9 && heightScore > 0.48 && heightScore < 0.78) {
        return 'R';
    }

    const polarCold = y < height * 0.16 || y > height * 0.86;
    const highCold = heightScore > 0.76 && mountainNoise > 0.22;
    if (heightScore > 1.05 && mountainNoise > 0.46) return 'P';
    if (polarCold && heightScore > 0.48 && heightScore < 0.74 && random() > 0.7) return 'I';
    if (highCold && heightScore > 0.68 && heightScore < 0.92 && random() > 0.92) return 'I';
    if (heightScore > 0.86) return random() > 0.16 ? 'M' : 'H';
    if (heightScore > 0.72) return random() > 0.24 ? 'H' : 'G';

    if (heightScore > 0.54 && mountainNoise > 0.4 && random() > 0.78) return 'F';
    const volcanicBand = Math.abs(y - height * 0.55) < height * 0.18;
    if (volcanicBand && heightScore > 0.76 && mountainNoise > 0.55 && random() > 0.965) return 'L';
    return random() > 0.82 ? 'F' : 'G';
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
                const isEdge = x === 0 || y === 0 || x === footprint.w - 1 || y === footprint.h - 1;
                mutable[gy][gx] = isEdge ? 'T' : 'R';
            }
        }
    }

    for (let x = center.x - 11; x <= center.x + 11; x++) {
        if (mutable[center.y]?.[x] && mutable[center.y][x] !== 'T') mutable[center.y][x] = 'R';
    }
    for (let y = center.y - 8; y <= center.y + 8; y++) {
        if (mutable[y]?.[center.x] && mutable[y][center.x] !== 'T') mutable[y][center.x] = 'R';
    }

    for (let i = 0; i < 18; i++) {
        const gx = center.x + Math.floor(random() * 20) - 10;
        const gy = center.y + Math.floor(random() * 14) - 7;
        if (mutable[gy]?.[gx] && mutable[gy][gx] === 'G') mutable[gy][gx] = 'F';
    }

    return mutable.map((row) => row.join(''));
}

function smoothNoise(x, y, seed, scale) {
    const a = Math.sin((x * scale + seed * 0.013) * 12.9898 + (y * scale - seed * 0.007) * 78.233) * 43758.5453;
    return (a - Math.floor(a)) * 2 - 1;
}
