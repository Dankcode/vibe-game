const PALETTE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const HEIGHT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

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

