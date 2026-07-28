const PALETTE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const HEIGHT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
export const NETWORK_WORLD_DESCRIPTOR_SCHEMA = 'vibe-game-world-descriptor';
export const NETWORK_WORLD_DESCRIPTOR_SCHEMA_VERSION = 1;

const toInteger = (value, fallback = 0) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? Math.max(0, Math.trunc(numeric)) : fallback;
};

const normalizePaletteEntry = (cell) => [
    toInteger(cell?.element ?? cell?.e),
    toInteger(cell?.texture ?? cell?.textureValue ?? cell?.t),
    toInteger(cell?.effect ?? cell?.fx),
    toInteger(cell?.building ?? cell?.b),
    typeof cell?.walkable === 'boolean' ? cell.walkable : null
];

const normalizeDescriptorString = (value, maximumLength = 160) =>
    String(value ?? '')
        .trim()
        .replace(/[^a-z0-9._:/-]/gi, '')
        .slice(0, maximumLength);

const normalizeDescriptorNumber = (value, fallback = 0, minimum = -1000000, maximum = 1000000) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.max(minimum, Math.min(maximum, Math.round(numeric * 1000) / 1000));
};

const normalizeDescriptorInteger = (value, fallback = 0, minimum = 0, maximum = 1000000) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.max(minimum, Math.min(maximum, Math.floor(numeric)));
};

const parseBurgId = (rows) => {
    const explicit = Number(rows?.sourceTown?.burgId);
    if (Number.isInteger(explicit) && explicit > 0) return explicit;
    const match = /^burg-(\d+)$/i.exec(String(rows?.sourceTown?.id || ''));
    return match ? Number(match[1]) : 0;
};

export function getNetworkMapCollisionHash(rows) {
    if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(rows[0])) return '';
    const width = rows[0].length;
    if (!width || rows.some((row) => !Array.isArray(row) || row.length !== width)) return '';
    let hash = 2166136261;
    for (const row of rows) {
        for (const cell of row) {
            const elevation = toInteger(cell?.height ?? cell?.maxZ ?? cell?.h);
            const value = [...normalizePaletteEntry(cell), elevation]
                .map((entry) => entry === null ? 'n' : String(entry))
                .join(',');
            for (let index = 0; index < value.length; index++) {
                hash ^= value.charCodeAt(index);
                hash = Math.imul(hash, 16777619);
            }
            hash ^= 59;
            hash = Math.imul(hash, 16777619);
        }
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Produces the small immutable input contract clients use to reconstruct the
 * same generated view. Tile collision remains a separate fallback payload.
 */
export function createNetworkWorldDescriptor(rows, vector = {}) {
    if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(rows[0])) return null;
    const world = rows.world || {};
    const sourceTown = rows.sourceTown || {};
    return normalizeNetworkWorldDescriptor({
        schema: NETWORK_WORLD_DESCRIPTOR_SCHEMA,
        schemaVersion: NETWORK_WORLD_DESCRIPTOR_SCHEMA_VERSION,
        worldId: world.id || 'world',
        townId: sourceTown.id || rows.townName || 'region',
        burgId: parseBurgId(rows),
        centerX: world.centerX,
        centerY: world.centerY,
        sampleCenterX: world.sampleCenterX ?? world.centerX,
        sampleCenterY: world.sampleCenterY ?? world.centerY,
        width: rows[0].length,
        height: rows.length,
        chunkSize: vector.chunkSize,
        variant: rows.variant ?? world.variant,
        seed: rows.seed ?? world.variantSeed ?? world.seed,
        generationVersion: rows.generationVersion ?? world.generationVersion,
        generationHash: rows.contentHash ?? world.contentHash,
        skeletonHash: rows.generation?.fixedSkeletonHash,
        collisionHash: getNetworkMapCollisionHash(rows),
        vectorSchema: vector.schema,
        vectorSchemaVersion: vector.schemaVersion,
        vectorGenerationVersion: vector.generationVersion,
        vectorContentHash: vector.contentHash,
        vectorHash: vector.vectorHash
    });
}

/**
 * Treat descriptors received over the network as untrusted data. This mirrors
 * the server whitelist and keeps generation inputs bounded.
 */
export function normalizeNetworkWorldDescriptor(descriptor) {
    if (!descriptor || typeof descriptor !== 'object' || Array.isArray(descriptor)) return null;
    if (descriptor.schema !== NETWORK_WORLD_DESCRIPTOR_SCHEMA ||
        Number(descriptor.schemaVersion) !== NETWORK_WORLD_DESCRIPTOR_SCHEMA_VERSION) {
        return null;
    }

    return Object.freeze({
        schema: NETWORK_WORLD_DESCRIPTOR_SCHEMA,
        schemaVersion: NETWORK_WORLD_DESCRIPTOR_SCHEMA_VERSION,
        worldId: normalizeDescriptorString(descriptor.worldId || 'world', 80),
        townId: normalizeDescriptorString(descriptor.townId || 'region', 120),
        burgId: normalizeDescriptorInteger(descriptor.burgId, 0, 0, 1000000),
        centerX: normalizeDescriptorNumber(descriptor.centerX),
        centerY: normalizeDescriptorNumber(descriptor.centerY),
        sampleCenterX: normalizeDescriptorNumber(descriptor.sampleCenterX, normalizeDescriptorNumber(descriptor.centerX)),
        sampleCenterY: normalizeDescriptorNumber(descriptor.sampleCenterY, normalizeDescriptorNumber(descriptor.centerY)),
        width: normalizeDescriptorInteger(descriptor.width, 72, 1, 128),
        height: normalizeDescriptorInteger(descriptor.height, 54, 1, 128),
        chunkSize: normalizeDescriptorInteger(descriptor.chunkSize, 16, 1, 64),
        variant: normalizeDescriptorInteger(descriptor.variant, 0, 0, 1000000),
        seed: normalizeDescriptorInteger(descriptor.seed, 0, 0, 0xffffffff),
        generationVersion: normalizeDescriptorString(descriptor.generationVersion, 120),
        generationHash: normalizeDescriptorString(descriptor.generationHash, 192),
        skeletonHash: normalizeDescriptorString(descriptor.skeletonHash, 80),
        collisionHash: normalizeDescriptorString(descriptor.collisionHash, 80),
        vectorSchema: normalizeDescriptorString(descriptor.vectorSchema, 120),
        vectorSchemaVersion: normalizeDescriptorInteger(descriptor.vectorSchemaVersion, 0, 0, 1000),
        vectorGenerationVersion: normalizeDescriptorString(descriptor.vectorGenerationVersion, 120),
        vectorContentHash: normalizeDescriptorString(descriptor.vectorContentHash, 128),
        vectorHash: normalizeDescriptorString(descriptor.vectorHash, 128)
    });
}

export function getNetworkWorldDescriptorKey(descriptor) {
    const normalized = normalizeNetworkWorldDescriptor(descriptor);
    if (!normalized) return null;
    return JSON.stringify([
        normalized.worldId,
        normalized.townId,
        normalized.burgId,
        `${normalized.width}x${normalized.height}`,
        normalized.chunkSize,
        `${normalized.centerX},${normalized.centerY}`,
        `${normalized.sampleCenterX},${normalized.sampleCenterY}`,
        normalized.variant,
        normalized.seed,
        normalized.generationVersion,
        normalized.generationHash,
        normalized.skeletonHash,
        normalized.collisionHash,
        normalized.vectorSchema,
        normalized.vectorSchemaVersion,
        normalized.vectorGenerationVersion,
        normalized.vectorContentHash,
        normalized.vectorHash
    ]);
}

/**
 * Encodes a rectangular tile matrix as palette indices plus a separate height
 * field. The server only needs collision/material semantics, so visual and
 * authoring metadata remain client-side instead of inflating every network cell.
 */
export function encodeNetworkMap(rows) {
    if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(rows[0]) || rows[0].length === 0) {
        return null;
    }

    const width = rows[0].length;
    if (rows.some((row) => !Array.isArray(row) || row.length !== width)) return null;

    const palette = [];
    const paletteLookup = new Map();
    const tileRows = [];
    const elevationRows = [];

    for (const row of rows) {
        let tileRow = '';
        let elevationRow = '';
        for (const cell of row) {
            const entry = normalizePaletteEntry(cell);
            const key = entry.join(':');
            let paletteIndex = paletteLookup.get(key);
            if (paletteIndex === undefined) {
                paletteIndex = palette.length;
                if (paletteIndex >= PALETTE_ALPHABET.length) return null;
                paletteLookup.set(key, paletteIndex);
                palette.push(entry);
            }

            const elevation = toInteger(cell?.height ?? cell?.maxZ ?? cell?.h);
            if (elevation >= HEIGHT_ALPHABET.length) return null;
            tileRow += PALETTE_ALPHABET[paletteIndex];
            elevationRow += HEIGHT_ALPHABET[elevation];
        }
        tileRows.push(tileRow);
        elevationRows.push(elevationRow);
    }

    return {
        matrixEncoding: 'palette-height-v1',
        palette,
        tileRows,
        elevationRows
    };
}

export function decodeNetworkMap(payload) {
    if (payload?.matrixEncoding !== 'palette-height-v1' || !Array.isArray(payload.palette)) return null;
    const { palette, tileRows, elevationRows } = payload;
    if (!Array.isArray(tileRows) || !Array.isArray(elevationRows) || tileRows.length === 0 || tileRows.length !== elevationRows.length) {
        return null;
    }

    const width = tileRows[0]?.length || 0;
    if (!width || tileRows.some((row) => typeof row !== 'string' || row.length !== width) ||
        elevationRows.some((row) => typeof row !== 'string' || row.length !== width)) {
        return null;
    }

    const decoded = [];
    for (let y = 0; y < tileRows.length; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const paletteIndex = PALETTE_ALPHABET.indexOf(tileRows[y][x]);
            const elevation = HEIGHT_ALPHABET.indexOf(elevationRows[y][x]);
            const entry = palette[paletteIndex];
            if (!Array.isArray(entry) || entry.length < 4 || elevation < 0) return null;
            const cell = {
                element: toInteger(entry[0]),
                texture: toInteger(entry[1]),
                effect: toInteger(entry[2]),
                building: toInteger(entry[3]),
                height: elevation
            };
            if (typeof entry[4] === 'boolean') cell.walkable = entry[4];
            row.push(cell);
        }
        decoded.push(row);
    }
    return decoded;
}
