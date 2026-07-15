// Numeric-only FMG constraint projection shared by the terrain and building waves.
// The global map tells the local solver where it may improvise; it never supplies a town plan.

export function createSettlementConstraintAnchors({
    burgs = [],
    centerX = 0,
    centerY = 0,
    width = 80,
    height = 60,
    sampleScale = 1,
    margin = 14,
    maxSettlements = 4
} = {}) {
    const offsetX = Math.floor(width / 2);
    const offsetY = Math.floor(height / 2);
    return [...burgs]
        .map((burg) => {
            const col = Math.round((Number(burg.x) - centerX) / sampleScale + offsetX);
            const row = Math.round((Number(burg.y) - centerY) / sampleScale + offsetY);
            const radius = clampInteger(7 + Math.sqrt(Math.max(1, Number(burg.population) || 1)) * 0.48, 7, 16);
            const walled = burg.flags?.walls === true;
            return {
                burg,
                col,
                row,
                radius,
                walled,
                wallBounds: createWallBounds(col, row, radius, width, height)
            };
        })
        .filter((entry) =>
            entry.col >= -margin && entry.row >= -margin &&
            entry.col < width + margin && entry.row < height + margin)
        .sort((a, b) =>
            Number(b.burg.population || 0) - Number(a.burg.population || 0) ||
            Number(a.burg.id || 0) - Number(b.burg.id || 0))
        .slice(0, Math.max(0, Math.floor(maxSettlements)));
}

export function createWorldConstraintField({ fields = [], width = 0, height = 0, settlements = [] } = {}) {
    const cells = new Array(width * height);
    let inhibited = 0;
    let walled = 0;
    let hardWater = 0;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const id = row * width + col;
            const field = fields[id] || {};
            let owner = null;
            let urbanization = 0;
            let insideWall = false;
            let wallBoundary = false;
            let nearestTownDistance = Infinity;

            for (const settlement of settlements) {
                const distance = Math.hypot(col - settlement.col, row - settlement.row);
                const populationFalloff = Math.min(0.75, 0.75 * Math.exp(-distance / Math.max(1, settlement.radius)));
                const routeBoost = clamp01(field.routeInfluence) * 0.15;
                const candidateUrbanization = clamp01(populationFalloff + routeBoost);
                const candidateInside = settlement.walled && isInsideWallBounds(col, row, settlement.wallBounds);
                const candidateBoundary = settlement.walled && isWallBoundaryCell(col, row, settlement.wallBounds);
                const ownershipScore = candidateInside ? 2 + candidateUrbanization : candidateUrbanization;
                const currentScore = insideWall ? 2 + urbanization : urbanization;
                if (ownershipScore > currentScore || (ownershipScore === currentScore && distance < nearestTownDistance)) {
                    owner = settlement;
                    urbanization = candidateInside ? Math.max(0.92, candidateUrbanization) : candidateUrbanization;
                    insideWall = candidateInside;
                    wallBoundary = candidateBoundary;
                    nearestTownDistance = distance;
                }
            }

            const land = clamp01(field.land);
            const river = Math.max(clamp01(field.riverInfluence), clamp01(field.riverPathInfluence));
            const route = clamp01(field.routeInfluence);
            const hardWaterConstraint = land <= 0.18 || (river >= 0.82 && land < 0.72);
            const macroConfidence = clamp01(0.4 + Math.abs(land - 0.5) * 0.34 + Math.max(route, river) * 0.16);
            const inhibitor = clamp01(Math.max(
                macroConfidence,
                insideWall ? 0.92 : 0.42 + urbanization * 0.44
            ));
            const terrainVariance = clamp01(1 - urbanization * 0.82);
            const cell = Object.freeze({
                id,
                col,
                row,
                townId: owner?.burg?.id ?? null,
                urbanization,
                inhibitor,
                chaosLimit: 1 - inhibitor,
                terrainVariance,
                insideWall,
                wallBoundary,
                hardWater: hardWaterConstraint,
                routeInfluence: route,
                riverInfluence: river,
                land
            });
            cells[id] = cell;
            if (inhibitor >= 0.72) inhibited++;
            if (insideWall) walled++;
            if (hardWaterConstraint) hardWater++;
        }
    }

    return {
        cells,
        inhibitorRows: toRows(cells, width, height, (cell) => cell.inhibitor),
        urbanizationRows: toRows(cells, width, height, (cell) => cell.urbanization),
        diagnostics: Object.freeze({
            cells: cells.length,
            inhibitedCells: inhibited,
            walledInteriorCells: walled,
            hardWaterCells: hardWater,
            meanInhibitor: cells.length
                ? cells.reduce((sum, cell) => sum + cell.inhibitor, 0) / cells.length
                : 0
        })
    };
}

export function createWallBounds(centerCol, centerRow, radius, width = Infinity, height = Infinity) {
    const halfWidth = clampInteger(Math.round(radius * 0.96), 8, 14);
    const halfHeight = clampInteger(Math.round(radius * 0.8), 7, 12);
    return Object.freeze({
        minCol: clampInteger(centerCol - halfWidth, 1, Math.max(1, width - 2)),
        maxCol: clampInteger(centerCol + halfWidth, 1, Math.max(1, width - 2)),
        minRow: clampInteger(centerRow - halfHeight, 1, Math.max(1, height - 2)),
        maxRow: clampInteger(centerRow + halfHeight, 1, Math.max(1, height - 2)),
        width: halfWidth * 2 + 1,
        height: halfHeight * 2 + 1
    });
}

export function isInsideWallBounds(col, row, bounds) {
    if (!bounds) return false;
    return col > bounds.minCol && col < bounds.maxCol && row > bounds.minRow && row < bounds.maxRow;
}

export function isWallBoundaryCell(col, row, bounds) {
    if (!bounds) return false;
    if (col < bounds.minCol || col > bounds.maxCol || row < bounds.minRow || row > bounds.maxRow) return false;
    return col === bounds.minCol || col === bounds.maxCol || row === bounds.minRow || row === bounds.maxRow;
}

export function getWallGateCells(bounds, { fourGates = false } = {}) {
    if (!bounds) return [];
    const centerCol = Math.round((bounds.minCol + bounds.maxCol) / 2);
    const centerRow = Math.round((bounds.minRow + bounds.maxRow) / 2);
    const gates = [
        { col: centerCol, row: bounds.maxRow, edge: 'south' },
        { col: centerCol, row: bounds.minRow, edge: 'north' }
    ];
    if (fourGates) {
        gates.push(
            { col: bounds.minCol, row: centerRow, edge: 'west' },
            { col: bounds.maxCol, row: centerRow, edge: 'east' }
        );
    }
    return gates;
}

function toRows(cells, width, height, project) {
    return Array.from({ length: height }, (_, row) =>
        Array.from({ length: width }, (_, col) => project(cells[row * width + col])));
}

function clamp01(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(1, number));
}

function clampInteger(value, minimum, maximum) {
    const number = Number(value);
    if (!Number.isFinite(number)) return minimum;
    return Math.max(minimum, Math.min(maximum, Math.floor(number)));
}
