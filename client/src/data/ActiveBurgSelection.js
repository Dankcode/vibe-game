export const ACTIVE_BURG_COUNT = 10;

// Two burgs per visual theme, chosen to retain capitals, ports, walls, sparse villages,
// lowlands, high-relief settlements, and four authentic seat/fief links while keeping the
// runtime payload intentionally small.
export const ACTIVE_BURG_IDS = Object.freeze([
    2,
    5,
    7,
    10,
    15,
    23,
    39,
    45,
    51,
    57
]);

export function resolveActiveBurgIds(manifest = {}) {
    const configured = manifest.active_burg_ids ?? ACTIVE_BURG_IDS;
    if (!Array.isArray(configured)) {
        throw new Error('manifest.active_burg_ids must be an array.');
    }

    const burgIds = configured.map((value) => Number(value));
    if (burgIds.length !== ACTIVE_BURG_COUNT) {
        throw new Error(
            `manifest.active_burg_ids must contain exactly ${ACTIVE_BURG_COUNT} burg IDs.`
        );
    }
    if (burgIds.some((burgId) => !Number.isInteger(burgId) || burgId < 1)) {
        throw new Error('manifest.active_burg_ids must contain positive integer burg IDs.');
    }
    if (new Set(burgIds).size !== burgIds.length) {
        throw new Error('manifest.active_burg_ids must not contain duplicates.');
    }

    const manifestBurgIds = new Set((manifest.burgs || []).map((burg) => Number(burg.id)));
    const missing = burgIds.filter((burgId) => !manifestBurgIds.has(burgId));
    if (missing.length) {
        throw new Error(
            `manifest.active_burg_ids references missing burgs: ${missing.join(', ')}.`
        );
    }

    return Object.freeze([...burgIds].sort((left, right) => left - right));
}

export function selectActiveBurgRecords(records = [], activeBurgIds = ACTIVE_BURG_IDS) {
    const active = new Set(activeBurgIds.map(Number));
    return records.filter((record) => active.has(Number(record?.id)));
}
