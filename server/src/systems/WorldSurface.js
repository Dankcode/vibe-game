const ELEMENTS = {
    VOID: 0,
    GEO: 1,
    HYDRO: 2,
    ANEMO: 3,
    CRYO: 4,
    PYRO: 5,
    STRUCTURE: 6
};

const MAP_LEGEND = {
    W: { element: ELEMENTS.HYDRO, texture: 2, effect: ELEMENTS.HYDRO, building: 0, maxZ: 0 },
    '~': { element: ELEMENTS.HYDRO, texture: 1, effect: ELEMENTS.HYDRO, building: 0, maxZ: 0 },
    B: { element: ELEMENTS.HYDRO, texture: 4, effect: ELEMENTS.HYDRO, building: 0, maxZ: 0 },
    S: { element: ELEMENTS.ANEMO, texture: 0, effect: ELEMENTS.ANEMO, building: 0, maxZ: 0 },
    G: { element: ELEMENTS.GEO, texture: 0, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    F: { element: ELEMENTS.GEO, texture: 1, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    H: { element: ELEMENTS.GEO, texture: 3, effect: ELEMENTS.GEO, building: 0, maxZ: 1 },
    M: { element: ELEMENTS.GEO, texture: 4, effect: ELEMENTS.GEO, building: 0, maxZ: 2 },
    '.': { element: ELEMENTS.GEO, texture: 5, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    ':': { element: ELEMENTS.GEO, texture: 6, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    ';': { element: ELEMENTS.GEO, texture: 7, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    ',': { element: ELEMENTS.GEO, texture: 8, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    P: { element: ELEMENTS.CRYO, texture: 0, effect: ELEMENTS.CRYO, building: 0, maxZ: 2 },
    I: { element: ELEMENTS.CRYO, texture: 1, effect: ELEMENTS.CRYO, building: 0, maxZ: 0 },
    L: { element: ELEMENTS.PYRO, texture: 0, effect: ELEMENTS.PYRO, building: 0, maxZ: 2 },
    R: { element: ELEMENTS.GEO, texture: 2, effect: ELEMENTS.GEO, building: 0, maxZ: 0 },
    T: { element: ELEMENTS.STRUCTURE, texture: 1, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 2 },
    X: { element: ELEMENTS.STRUCTURE, texture: 0, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 1 },
    A: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 2 },
    C: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 1, maxZ: 2 },
    N: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 6, maxZ: 2 },
    O: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 7, maxZ: 2 },
    J: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 8, maxZ: 2 },
    K: { element: ELEMENTS.STRUCTURE, texture: 3, effect: ELEMENTS.STRUCTURE, building: 9, maxZ: 2 },
    Q: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 6, maxZ: 2 },
    V: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 7, maxZ: 2 },
    Y: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 8, maxZ: 2 },
    Z: { element: ELEMENTS.STRUCTURE, texture: 4, effect: ELEMENTS.STRUCTURE, building: 9, maxZ: 2 },
    D: { element: ELEMENTS.STRUCTURE, texture: 2, effect: ELEMENTS.STRUCTURE, building: 2, maxZ: 0, walkable: true },
    E: { element: ELEMENTS.STRUCTURE, texture: 2, effect: ELEMENTS.STRUCTURE, building: 3, maxZ: 0, walkable: true },
    U: { element: ELEMENTS.STRUCTURE, texture: 6, effect: ELEMENTS.STRUCTURE, building: 4, maxZ: 0, walkable: true },
    1: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 10, maxZ: 0, walkable: true },
    2: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 11, maxZ: 0, walkable: true },
    3: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 12, maxZ: 0, walkable: true },
    4: { element: ELEMENTS.STRUCTURE, texture: 9, effect: ELEMENTS.STRUCTURE, building: 13, maxZ: 0, walkable: true },
    5: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 10, maxZ: 0, walkable: true },
    6: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 11, maxZ: 0, walkable: true },
    7: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 12, maxZ: 0, walkable: true },
    8: { element: ELEMENTS.STRUCTURE, texture: 10, effect: ELEMENTS.STRUCTURE, building: 13, maxZ: 0, walkable: true },
    9: { element: ELEMENTS.STRUCTURE, texture: 13, effect: ELEMENTS.STRUCTURE, building: 18, maxZ: 2, walkable: true },
    '!': { element: ELEMENTS.STRUCTURE, texture: 14, effect: ELEMENTS.STRUCTURE, building: 19, maxZ: 2, walkable: true },
    '@': { element: ELEMENTS.STRUCTURE, texture: 14, effect: ELEMENTS.STRUCTURE, building: 20, maxZ: 2, walkable: true },
    '#': { element: ELEMENTS.STRUCTURE, texture: 14, effect: ELEMENTS.STRUCTURE, building: 21, maxZ: 2, walkable: true },
    '$': { element: ELEMENTS.STRUCTURE, texture: 14, effect: ELEMENTS.STRUCTURE, building: 22, maxZ: 2, walkable: true }
};

const DEFAULT_MAP = [
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    'WWWWWWGSSSSSWWWWWWWWWWWWWWWWWW',
    'WWWWWGSSSSSGGWWWWWWWWHHHHWWWWW',
    'WWWWGGGGSSGGGGWWWWWHHHHHHGHWWW',
    'WWWWGGGGGGGGGGGWHHHHMMMMHHGGWW',
    'WWWGGGHHGGGGGGGWHHHHMMMMHHGGWW',
    'WWWGGHHMMHGGGGGWHHMMMMMMMHGGWW',
    'WWWGGHMMMHGGGGGWHHMMMMMMMHGGWW',
    'WWGGHMMMMHGHHHHWHMMPPPPMHGGWWW',
    'WWGGHMMMMHHHHHHWHHMPPPPMHHGWWW',
    'WWGGHMMMHHGHGGGHHHMMPPMMMHGGWW',
    'WWGGGHHHHGGGGGGHWWHHMMMMMHGWWW',
    'WWWGGGGGGGGGWGGHWWWWWHHHHHGGWW',
    'WWWWWGGGGGGWWGGHWWHHWWHHHGGWWW',
    'WWWWWGGGGGWBBWGHWWWHWWHHGGGWWW',
    'WWWWWGGGGGWWBBGWWWWWHWHHGGWWWW',
    'WWWWWGGGGGBBBBWWWWWWWHHHGWWWWW',
    'WWWWWGGGGGWBBWWWWWHWHWWHWWWWWW',
    'WWWWWWGGGGWWWWWHHHHWWHHWWWWWWW',
    'WWWWWWWGGGWHHHHHHMMHWHGWWWWWWW',
    'WWWWWWWWWWHHMMMMMMMHWHGGWWWWWW',
    'WWWWWWWWHHMMMMLLMMHHWHHGWWWWWW',
    'WWWWWWWWHHMMMLLLMMHHWWHGWWWWWW',
    'WWWWWWWWHHMMMMLLMMHWWWHWWWWWWW',
    'WWWWWWWWHHHHMMMMHHWWWWWWWWWWWW',
    'WWWWWWWWWHHHHHHHHHWWWWWWWWWWWW',
    'WWWWWWWWIIIHWHHHWWWWWWWWWWWWWW',
    'WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW',
    'WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW',
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'
];

const WALKABLE_ELEMENTS = new Set([ELEMENTS.GEO, ELEMENTS.ANEMO, ELEMENTS.CRYO]);
const BLOCKING_CLEARANCE_VOXELS = 1;
const BUILDING_STAIR_STOREY_HEIGHT = 2;
const BUILDING_STAIR_PAIR_STEP_HEIGHT = BUILDING_STAIR_STOREY_HEIGHT;
const BUILDING_FLOOR_HEIGHT = 2;
const BUILDING_LEVEL_KINDS = {
    BASEMENT: 'basement',
    GROUND: 'ground',
    UPPER: 'upper',
    ROOF: 'roof'
};
const BUILDING_PART_TAGS = {
    FOUNDATION: 'building:foundation',
    GROUND_FLOOR: 'building:floor:ground',
    UPPER_FLOOR: 'building:floor:upper',
    WALL: 'building:wall',
    WINDOW: 'building:window',
    DOOR: 'building:door',
    DOOR_CLEARANCE: 'building:door:clearance',
    STAIR_LOWER: 'building:stair:lower',
    STAIR_UPPER: 'building:stair:upper',
    STAIR_SUPPORT: 'building:stair:support',
    STAIR_AIR_SHAFT: 'building:stair:air-shaft',
    ROOF: 'building:roof'
};
const BUILDING_PLACEMENT_TAGS = {
    NONE: 'none',
    FLOOR_SURFACE: 'floor-surface',
    STAIR_SURFACE: 'stair-surface',
    ROOF_SURFACE: 'roof-surface',
    VERTICAL_CLEARANCE: 'vertical-clearance'
};

class WorldSurface {
    constructor(rows = DEFAULT_MAP) {
        this.loadRows(rows);
    }

    loadRows(rows) {
        const normalized = this.normalizeRows(rows);
        this.rows = normalized;
        this.height = normalized.length;
        this.width = normalized[0].length;
        this.offsetX = Math.floor(this.width / 2);
        this.offsetY = Math.floor(this.height / 2);
        this.surfaceMap = new Map();
        this.voxelMatrix = this.createVoxelMatrix(normalized);
        this.voxelColumnMap = new Map();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const gridX = x - this.offsetX;
                const gridY = y - this.offsetY;
                const column = this.voxelMatrix.columns[y][x];
                const block = this.getTopVoxel(column);
                this.voxelColumnMap.set(this.getColumnKey(gridX, gridY), column);
                this.surfaceMap.set(this.getColumnKey(gridX, gridY), {
                    x: gridX,
                    y: gridY,
                    z: block.z,
                    element: block.element,
                    texture: block.texture,
                    effect: block.effect,
                    building: block.building,
                    walkable: block.walkable ?? WALKABLE_ELEMENTS.has(block.element)
                });
            }
        }
    }

    normalizeRows(rows) {
        if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_MAP;
        const normalized = rows
            .map((row) => {
                if (typeof row === 'string') {
                    return row.trim().toUpperCase().replace(/[^~.,:;!@#$WBSGFHMPILRTXACNOJKQVYZDEU123456789]/g, 'W');
                }
                if (Array.isArray(row)) return row.map((cell) => this.normalizeCell(cell));
                return null;
            })
            .filter((row) => row && row.length > 0);

        if (normalized.length === 0) return DEFAULT_MAP;

        const width = normalized[0].length;
        if (width === 0 || normalized.some((row) => row.length !== width)) return DEFAULT_MAP;
        return normalized;
    }

    resolveBlock(rawCell) {
        if (typeof rawCell === 'string') return this.normalizeCell(MAP_LEGEND[rawCell] || MAP_LEGEND.W);
        return this.normalizeCell(rawCell);
    }

    normalizeCell(rawCell) {
        if (typeof rawCell === 'string') return this.normalizeCell(MAP_LEGEND[rawCell.toUpperCase()] || MAP_LEGEND.W);
        if (Array.isArray(rawCell)) {
            return this.createBlock({
                element: rawCell[0],
                texture: rawCell[1],
                effect: rawCell[2],
                building: rawCell[3],
                maxZ: rawCell[4]
            });
        }
        if (rawCell && typeof rawCell === 'object') {
            return this.createBlock({
                element: rawCell.element ?? rawCell.e,
                texture: rawCell.texture ?? rawCell.textureValue ?? rawCell.t,
                effect: rawCell.effect ?? rawCell.fx,
                building: rawCell.building ?? rawCell.b,
                maxZ: rawCell.height ?? rawCell.maxZ ?? rawCell.h,
                walkable: rawCell.walkable,
                structuralFloorLevels: rawCell.structuralFloorLevels,
                doorClearanceLevels: rawCell.doorClearanceLevels,
                buildingBaseElevation: rawCell.buildingBaseElevation,
                buildingGroundElevation: rawCell.buildingGroundElevation,
                buildingGroundFloorZ: rawCell.buildingGroundFloorZ,
                buildingFloorHeight: rawCell.buildingFloorHeight,
                buildingFloorLevels: rawCell.buildingFloorLevels,
                buildingFloorRefs: rawCell.buildingFloorRefs,
                buildingLevelIndex: rawCell.buildingLevelIndex,
                buildingLevelTag: rawCell.buildingLevelTag,
                buildingLevelKind: rawCell.buildingLevelKind,
                buildingPartTag: rawCell.buildingPartTag,
                buildingAnchorZ: rawCell.buildingAnchorZ,
                buildingPlacementZ: rawCell.buildingPlacementZ,
                buildingPlacementTag: rawCell.buildingPlacementTag,
                stairRole: rawCell.stairRole,
                stairLevel: rawCell.stairLevel,
                stairBaseElevation: rawCell.stairBaseElevation,
                stairDestinationElevation: rawCell.stairDestinationElevation,
                doorWallTexture: rawCell.doorWallTexture,
                doorBaseElevation: rawCell.doorBaseElevation
            });
        }
        return this.createBlock(MAP_LEGEND.W);
    }

    createVoxelMatrix(rows) {
        return {
            encoding: 'voxel-matrix-v1',
            width: this.width,
            height: this.height,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            columns: rows.map((row) => {
                const cells = Array.isArray(row) ? row : [...row];
                return cells.map((cell) => this.createVoxelColumn(cell));
            })
        };
    }

    createVoxelColumn(rawCell) {
        const cell = this.resolveBlock(rawCell);
        const maxZ = Math.max(0, cell.maxZ);
        const column = [];
        const pushBlock = (block) => column.push(this.createVoxelBlock({
            ...block,
            ...this.createVoxelBuildingReference(cell, block)
        }));

        if (this.isStackedBuildingWall(cell)) {
            const baseElevation = this.getBuildingGroundElevation(cell);
            for (let z = 0; z <= maxZ; z++) {
                if (z < baseElevation) {
                    pushBlock({
                        z,
                        element: ELEMENTS.GEO,
                        texture: 0,
                        effect: ELEMENTS.GEO,
                        building: 0
                    });
                    continue;
                }
                if (z === baseElevation) {
                    pushBlock({
                        z,
                        element: ELEMENTS.STRUCTURE,
                        texture: cell.texture,
                        effect: ELEMENTS.STRUCTURE,
                        building: 23
                    });
                    continue;
                }
                pushBlock({
                    z,
                    element: cell.element,
                    texture: cell.texture,
                    effect: cell.effect,
                    building: this.getBuildingPartAtElevation(cell.building, z, baseElevation)
                });
            }
            return column;
        }

        if (cell.element === ELEMENTS.STRUCTURE && cell.building === 2) {
            const doorBaseElevation = this.clampInteger(cell.doorBaseElevation, 0);
            const clearanceLevels = this.normalizeDoorClearanceLevels(cell.doorClearanceLevels, doorBaseElevation);
            for (let z = 0; z <= maxZ; z++) {
                if (z < doorBaseElevation) {
                    pushBlock({
                        z,
                        element: ELEMENTS.GEO,
                        texture: 0,
                        effect: ELEMENTS.GEO,
                        building: 0
                    });
                    continue;
                }
                if (clearanceLevels.has(z)) {
                    pushBlock({
                        z,
                        element: ELEMENTS.STRUCTURE,
                        texture: 2,
                        effect: ELEMENTS.STRUCTURE,
                        building: z === doorBaseElevation ? 23 : 3
                    });
                    continue;
                }
                if (this.isDoorAirClearance(z, clearanceLevels)) continue;
                pushBlock({
                    z,
                    element: ELEMENTS.STRUCTURE,
                    texture: cell.doorWallTexture || 3,
                    effect: ELEMENTS.STRUCTURE,
                    building: 1
                });
            }
            return column;
        }

        if (this.isStairPart(cell.building) && maxZ > 0) {
            const groundElevation = this.getBuildingGroundElevation(cell);
            const stairBaseElevation = Number.isFinite(Number(cell.stairBaseElevation))
                ? this.clampInteger(cell.stairBaseElevation, groundElevation)
                : groundElevation;
            const isCityWallStair = this.isCityWallStairPart(cell.building);
            const floorLevels = Number(cell.stairLevel || 0) > 0
                ? new Set(this.getBuildingFloorLevels(cell, groundElevation, maxZ)
                    .filter((level) => level < maxZ && (isCityWallStair || level !== stairBaseElevation)))
                : new Set();
            for (let z = 0; z < Math.min(groundElevation, maxZ); z++) {
                pushBlock({
                    z,
                    element: ELEMENTS.GEO,
                    texture: 0,
                    effect: ELEMENTS.GEO,
                    building: 0
                });
            }
            for (let z = groundElevation; z < maxZ; z++) {
                if (floorLevels.has(z)) {
                    pushBlock({
                        z,
                        element: ELEMENTS.STRUCTURE,
                        texture: cell.texture,
                        effect: ELEMENTS.STRUCTURE,
                        building: z === groundElevation ? 23 : 3
                    });
                    continue;
                }
                pushBlock({
                    z,
                    element: ELEMENTS.STRUCTURE,
                    texture: isCityWallStair ? 1 : 0,
                    effect: ELEMENTS.STRUCTURE,
                    building: 1,
                    partTag: isCityWallStair ? undefined : BUILDING_PART_TAGS.STAIR_SUPPORT,
                    anchorZ: stairBaseElevation,
                    placementZ: stairBaseElevation,
                    placementTag: BUILDING_PLACEMENT_TAGS.NONE,
                    levelZ: stairBaseElevation
                });
            }
            pushBlock({
                z: maxZ,
                element: cell.element,
                texture: cell.texture,
                effect: cell.effect,
                building: cell.building
            });
            return column;
        }

        if (this.isBuildingFloorPart(cell.building)) {
            const baseElevation = this.getBuildingGroundElevation(cell);
            for (let z = 0; z < baseElevation; z++) {
                pushBlock({
                    z,
                    element: ELEMENTS.GEO,
                    texture: 0,
                    effect: ELEMENTS.GEO,
                    building: 0
                });
            }
            for (const level of this.getBuildingFloorLevels(cell, baseElevation, maxZ)) {
                pushBlock({
                    z: level,
                    element: ELEMENTS.STRUCTURE,
                    texture: cell.texture,
                    effect: ELEMENTS.STRUCTURE,
                    building: level === baseElevation ? 23 : 3
                });
            }
            return column.sort((a, b) => a.z - b.z);
        }

        if (this.isStackedWalkableStructure(cell)) {
            pushBlock({
                z: 0,
                element: cell.element,
                texture: cell.texture,
                effect: cell.effect,
                building: cell.building
            });
            if (maxZ > 0) {
                pushBlock({
                    z: maxZ,
                    element: cell.element,
                    texture: cell.texture,
                    effect: cell.effect,
                    building: cell.building
                });
            }
            return column;
        }

        for (let z = 0; z <= maxZ; z++) {
            const isSurface = z === maxZ;
            pushBlock({
                z,
                element: isSurface ? cell.element : ELEMENTS.GEO,
                texture: isSurface ? cell.texture : 0,
                effect: isSurface ? cell.effect : ELEMENTS.GEO,
                building: isSurface ? cell.building : 0
            });
        }

        return column;
    }

    createVoxelBlock({
        z = 0,
        element = ELEMENTS.VOID,
        texture = 0,
        effect = 0,
        building = 0,
        buildingGroundFloorZ,
        buildingFloorHeight,
        buildingLevelIndex,
        buildingLevelTag,
        buildingLevelKind,
        buildingPartTag,
        buildingAnchorZ,
        buildingPlacementZ,
        buildingPlacementTag
    } = {}) {
        const normalizedElement = this.clampInteger(element, ELEMENTS.VOID);
        const textureValue = this.clampInteger(texture, 0);
        const buildingPart = this.clampInteger(building, 0);
        const block = {
            z: this.clampInteger(z, 0),
            element: normalizedElement,
            texture: textureValue,
            effect: this.clampInteger(effect, 0),
            building: buildingPart,
            walkable: this.isWalkableBlock(normalizedElement, textureValue, buildingPart),
            ...this.normalizeVoxelBuildingReference({
                buildingGroundFloorZ,
                buildingFloorHeight,
                buildingLevelIndex,
                buildingLevelTag,
                buildingLevelKind,
                buildingPartTag,
                buildingAnchorZ,
                buildingPlacementZ,
                buildingPlacementTag
            })
        };
        return {
            ...block,
            collision: this.createVoxelCollisionBox(block)
        };
    }

    createVoxelCollisionBox(block = {}) {
        const element = this.clampInteger(block.element, ELEMENTS.VOID);
        if (element === ELEMENTS.VOID) {
            return { active: false, type: 'none', bounds: null };
        }
        const building = this.clampInteger(block.building, 0);
        const z = this.clampInteger(block.z, 0);
        const walkable = Boolean(block.walkable);
        const stairLowerTier = 0;
        const stairUpperTier = 1;
        return {
            active: true,
            type: this.isStairPart(building) ? 'slope-aabb' : 'aabb',
            solid: true,
            walkableSurface: walkable,
            bounds: {
                min: [0, z, 0],
                max: [1, z + 1, 1]
            },
            slope: this.isStairPart(building)
                ? {
                    direction: this.getStairDirection(building),
                    lowerTier: stairLowerTier,
                    upperTier: stairUpperTier,
                    passThrough: false
                }
                : null,
            material: {
                element,
                texture: this.clampInteger(block.texture, 0),
                building
            }
        };
    }

    getTopVoxel(column) {
        if (!Array.isArray(column) || column.length === 0) return this.createVoxelBlock();
        return column.reduce((top, voxel) => voxel.z > top.z ? voxel : top, column[0]);
    }

    isStackedBuildingWall(cell) {
        return cell.element === ELEMENTS.STRUCTURE &&
            cell.maxZ >= 2 &&
            (cell.building === 1 || this.isWindowWallPart(cell.building));
    }

    isStackedWalkableStructure(cell) {
        return cell.element === ELEMENTS.STRUCTURE &&
            cell.maxZ > 0 &&
            [3, 4, 10, 11, 12, 13, 18, 19, 20, 21, 22, 23].includes(cell.building);
    }

    isBuildingFloorPart(building) {
        return building === 3 || building === 23;
    }

    isCityWallStairPart(building) {
        return [19, 20, 21, 22].includes(building);
    }

    isStairPart(building) {
        return [4, 10, 11, 12, 13, 19, 20, 21, 22].includes(building);
    }

    getStairDirection(building) {
        return {
            10: 'north',
            11: 'south',
            12: 'west',
            13: 'east',
            19: 'north',
            20: 'south',
            21: 'west',
            22: 'east'
        }[building] || 'north';
    }

    isLowerWindowPart(building) {
        return [6, 7, 8, 9].includes(building);
    }

    isUpperWindowPart(building) {
        return [14, 15, 16, 17].includes(building);
    }

    isWindowWallPart(building) {
        return this.isLowerWindowPart(building) || this.isUpperWindowPart(building);
    }

    getBuildingPartAtElevation(building, elevation, baseElevation = 0) {
        if (!this.isLowerWindowPart(building)) return building;
        const upperWindowParts = { 6: 14, 7: 15, 8: 16, 9: 17 };
        const groundFloor = this.clampInteger(baseElevation, 0);
        if (elevation <= groundFloor) return 23;
        const windowOffset = elevation - groundFloor - 1;
        return windowOffset % 2 === 0 ? building : upperWindowParts[building];
    }

    getBuildingGroundElevation(cell) {
        return this.clampInteger(cell.buildingGroundElevation, this.clampInteger(cell.buildingBaseElevation, 0));
    }

    getBuildingFloorLevels(cell, baseElevation, maxZ) {
        const levels = new Set([baseElevation]);
        if (maxZ >= baseElevation) levels.add(maxZ);
        for (const level of this.normalizeFloorLevels(cell.buildingFloorLevels)) {
            if (level >= baseElevation) levels.add(level);
        }
        for (const level of this.normalizeFloorLevels(cell.structuralFloorLevels)) {
            if (level >= baseElevation) levels.add(level);
        }
        return [...levels].sort((a, b) => a - b);
    }

    normalizeDoorClearanceLevels(levels = [], fallbackBase = 0) {
        const normalized = this.normalizeFloorLevels(levels);
        if (normalized.length === 0) normalized.push(this.clampInteger(fallbackBase, 0));
        return new Set(normalized);
    }

    isDoorAirClearance(z, clearanceLevels) {
        for (const level of clearanceLevels) {
            if (z > level && z <= level + 2) return true;
        }
        return false;
    }

    normalizeFloorLevels(levels = []) {
        return [...new Set((Array.isArray(levels) ? levels : [])
            .map((level) => this.clampInteger(level, 0)))]
            .sort((a, b) => a - b);
    }

    createVoxelBuildingReference(cell, block = {}) {
        if (!this.hasBuildingReference(cell)) return {};
        const z = this.clampInteger(block.z, 0);
        const groundFloorZ = this.getBuildingGroundFloorZ(cell);
        const floorHeight = this.getBuildingFloorHeight(cell);
        const levelRefs = this.getCellBuildingFloorRefs(cell, groundFloorZ, floorHeight);
        const buildingPart = this.clampInteger(block.building ?? cell.building, 0);
        const partTag = block.partTag || this.inferBuildingPartTag(cell, buildingPart, z);
        const placementTag = block.placementTag || this.inferBuildingPlacementTag(cell, buildingPart, partTag);
        const levelZ = Number.isFinite(Number(block.levelZ))
            ? this.clampInteger(block.levelZ, groundFloorZ)
            : this.inferBuildingLevelZ(cell, buildingPart, z, groundFloorZ);
        const level = this.getBuildingLevelReferenceForZ(levelRefs, levelZ, groundFloorZ);
        const anchorZ = Number.isFinite(Number(block.anchorZ))
            ? block.anchorZ
            : Number.isFinite(Number(cell.buildingAnchorZ))
                ? cell.buildingAnchorZ
                : level.z;
        const placementZ = Number.isFinite(Number(block.placementZ))
            ? block.placementZ
            : Number.isFinite(Number(cell.buildingPlacementZ))
                ? cell.buildingPlacementZ
                : level.placementZ;
        return this.normalizeVoxelBuildingReference({
            buildingGroundFloorZ: groundFloorZ,
            buildingFloorHeight: floorHeight,
            buildingLevelIndex: level.index,
            buildingLevelTag: level.tag,
            buildingLevelKind: level.kind,
            buildingPartTag: partTag,
            buildingAnchorZ: anchorZ,
            buildingPlacementZ: placementZ,
            buildingPlacementTag: placementTag
        });
    }

    normalizeVoxelBuildingReference(reference = {}) {
        const normalized = {};
        if (Number.isFinite(Number(reference.buildingGroundFloorZ))) {
            normalized.buildingGroundFloorZ = this.clampInteger(reference.buildingGroundFloorZ, 0);
        }
        if (Number.isFinite(Number(reference.buildingFloorHeight))) {
            normalized.buildingFloorHeight = Math.max(1, this.clampInteger(reference.buildingFloorHeight, BUILDING_FLOOR_HEIGHT));
        }
        if (Number.isFinite(Number(reference.buildingLevelIndex))) normalized.buildingLevelIndex = Math.floor(Number(reference.buildingLevelIndex));
        if (typeof reference.buildingLevelTag === 'string') normalized.buildingLevelTag = reference.buildingLevelTag;
        if (typeof reference.buildingLevelKind === 'string') normalized.buildingLevelKind = reference.buildingLevelKind;
        if (typeof reference.buildingPartTag === 'string') normalized.buildingPartTag = reference.buildingPartTag;
        if (Number.isFinite(Number(reference.buildingAnchorZ))) normalized.buildingAnchorZ = this.clampInteger(reference.buildingAnchorZ, 0);
        if (Number.isFinite(Number(reference.buildingPlacementZ))) normalized.buildingPlacementZ = this.clampInteger(reference.buildingPlacementZ, 0);
        if (typeof reference.buildingPlacementTag === 'string') normalized.buildingPlacementTag = reference.buildingPlacementTag;
        return normalized;
    }

    hasBuildingReference(cell) {
        return Number.isFinite(Number(cell.buildingGroundFloorZ)) ||
            Number.isFinite(Number(cell.buildingGroundElevation)) ||
            Number.isFinite(Number(cell.buildingBaseElevation)) ||
            Array.isArray(cell.buildingFloorRefs) ||
            Array.isArray(cell.buildingFloorLevels) ||
            typeof cell.buildingMatrixTag === 'string';
    }

    getBuildingGroundFloorZ(cell) {
        if (Number.isFinite(Number(cell.buildingGroundFloorZ))) return this.clampInteger(cell.buildingGroundFloorZ, 0);
        return this.getBuildingGroundElevation(cell);
    }

    getBuildingFloorHeight(cell) {
        return Number.isFinite(Number(cell.buildingFloorHeight))
            ? Math.max(1, this.clampInteger(cell.buildingFloorHeight, BUILDING_FLOOR_HEIGHT))
            : BUILDING_FLOOR_HEIGHT;
    }

    getCellBuildingFloorRefs(cell, groundFloorZ, floorHeight) {
        if (Array.isArray(cell.buildingFloorRefs) && cell.buildingFloorRefs.length > 0) {
            return this.normalizeBuildingFloorRefs(cell.buildingFloorRefs);
        }
        return this.getBuildingFloorLevels(cell, groundFloorZ, cell.maxZ)
            .map((z) => {
                const index = Math.round((z - groundFloorZ) / floorHeight);
                return {
                    index,
                    story: index,
                    tag: this.getBuildingLevelTag(index),
                    kind: index === 0 ? BUILDING_LEVEL_KINDS.GROUND : BUILDING_LEVEL_KINDS.UPPER,
                    z,
                    surfaceZ: z,
                    placementZ: z,
                    part: index === 0 ? 23 : 3
                };
            });
    }

    normalizeBuildingFloorRefs(refs = []) {
        return [...new Map((Array.isArray(refs) ? refs : [])
            .map((ref) => {
                const z = Math.floor(Number(ref?.z ?? ref?.surfaceZ ?? 0) || 0);
                const index = Math.floor(Number(ref?.index ?? ref?.story ?? 0) || 0);
                return [ref?.tag || this.getBuildingLevelTag(index), {
                    index,
                    story: Math.floor(Number(ref?.story ?? index) || 0),
                    tag: String(ref?.tag || this.getBuildingLevelTag(index)),
                    kind: String(ref?.kind || (index === 0 ? BUILDING_LEVEL_KINDS.GROUND : BUILDING_LEVEL_KINDS.UPPER)),
                    z,
                    surfaceZ: Math.floor(Number(ref?.surfaceZ ?? z) || 0),
                    placementZ: Math.floor(Number(ref?.placementZ ?? z) || 0),
                    part: this.clampInteger(ref?.part, index === 0 ? 23 : 3)
                }];
            })).values()]
            .sort((a, b) => a.z - b.z || a.index - b.index);
    }

    getBuildingLevelReferenceForZ(levels = [], z = 0, fallbackGroundZ = 0) {
        const targetZ = Math.floor(Number(z) || 0);
        const match = (Array.isArray(levels) ? levels : [])
            .find((level) => Math.floor(Number(level?.z) || 0) === targetZ);
        if (match) return match;
        const groundFloorZ = this.clampInteger(fallbackGroundZ, 0);
        return {
            index: 0,
            story: 0,
            tag: this.getBuildingLevelTag(0),
            kind: BUILDING_LEVEL_KINDS.GROUND,
            z: groundFloorZ,
            surfaceZ: groundFloorZ,
            placementZ: groundFloorZ,
            part: 23
        };
    }

    getBuildingLevelTag(index = 0) {
        const levelIndex = Math.floor(Number(index) || 0);
        if (levelIndex < 0) return `basement-${Math.abs(levelIndex)}`;
        return levelIndex === 0 ? 'ground-floor' : `floor-${levelIndex + 1}`;
    }

    inferBuildingLevelZ(cell, buildingPart, z, groundFloorZ) {
        if (Number.isFinite(Number(cell.stairDestinationElevation)) && cell.stairRole === 'upper-stair') {
            return this.clampInteger(cell.stairDestinationElevation, z);
        }
        if (Number.isFinite(Number(cell.stairBaseElevation)) && ['lower-stair', 'support', 'air', 'pass-through-air'].includes(cell.stairRole)) {
            return this.clampInteger(cell.stairBaseElevation, groundFloorZ);
        }
        if (this.isBuildingFloorPart(buildingPart)) return z;
        if (Number.isFinite(Number(cell.buildingAnchorZ))) return this.clampInteger(cell.buildingAnchorZ, groundFloorZ);
        return groundFloorZ;
    }

    inferBuildingPartTag(cell, buildingPart, z) {
        if (z < this.getBuildingGroundFloorZ(cell)) return BUILDING_PART_TAGS.FOUNDATION;
        if (typeof cell.buildingPartTag === 'string') return cell.buildingPartTag;
        if (buildingPart === 23) return BUILDING_PART_TAGS.GROUND_FLOOR;
        if (buildingPart === 3) return BUILDING_PART_TAGS.UPPER_FLOOR;
        if (buildingPart === 2) return BUILDING_PART_TAGS.DOOR;
        if (this.isStairPart(buildingPart)) return this.inferStairPartTag(cell.stairRole);
        if (this.isWindowWallPart(buildingPart)) return BUILDING_PART_TAGS.WINDOW;
        if (buildingPart === 1) return BUILDING_PART_TAGS.WALL;
        if (buildingPart === 5) return BUILDING_PART_TAGS.ROOF;
        return BUILDING_PART_TAGS.FOUNDATION;
    }

    inferStairPartTag(role) {
        if (role === 'upper-stair') return BUILDING_PART_TAGS.STAIR_UPPER;
        if (role === 'support') return BUILDING_PART_TAGS.STAIR_SUPPORT;
        if (role === 'air' || role === 'pass-through-air') return BUILDING_PART_TAGS.STAIR_AIR_SHAFT;
        return BUILDING_PART_TAGS.STAIR_LOWER;
    }

    inferBuildingPlacementTag(cell, buildingPart, partTag) {
        if (typeof cell.buildingPlacementTag === 'string') return cell.buildingPlacementTag;
        if (partTag === BUILDING_PART_TAGS.STAIR_LOWER || partTag === BUILDING_PART_TAGS.STAIR_UPPER) {
            return BUILDING_PLACEMENT_TAGS.STAIR_SURFACE;
        }
        if (buildingPart === 23 || buildingPart === 3) return BUILDING_PLACEMENT_TAGS.FLOOR_SURFACE;
        return BUILDING_PLACEMENT_TAGS.NONE;
    }

    createBlock({
        element = ELEMENTS.VOID,
        texture = 0,
        effect = 0,
        building = 0,
        maxZ = 0,
        walkable,
        structuralFloorLevels,
        doorClearanceLevels,
        buildingBaseElevation,
        buildingGroundElevation,
        buildingGroundFloorZ,
        buildingFloorHeight,
        buildingFloorLevels,
        buildingFloorRefs,
        buildingLevelIndex,
        buildingLevelTag,
        buildingLevelKind,
        buildingPartTag,
        buildingAnchorZ,
        buildingPlacementZ,
        buildingPlacementTag,
        stairRole,
        stairLevel,
        stairBaseElevation,
        stairDestinationElevation,
        doorWallTexture,
        doorBaseElevation
    } = {}) {
        const normalizedElement = this.clampInteger(element, ELEMENTS.VOID);
        const textureValue = this.clampInteger(texture, 0);
        const normalizedBuilding = this.clampInteger(building, 0);
        const normalizedBase = this.clampInteger(buildingBaseElevation, 0);
        return {
            element: normalizedElement,
            texture: textureValue,
            effect: this.clampInteger(effect, 0),
            building: normalizedBuilding,
            maxZ: this.clampInteger(maxZ, 0),
            structuralFloorLevels: this.normalizeFloorLevels(structuralFloorLevels),
            doorClearanceLevels: this.normalizeFloorLevels(doorClearanceLevels),
            buildingBaseElevation: normalizedBase,
            buildingGroundElevation: this.clampInteger(buildingGroundElevation, normalizedBase),
            buildingGroundFloorZ: this.clampInteger(buildingGroundFloorZ, this.clampInteger(buildingGroundElevation, normalizedBase)),
            buildingFloorHeight: Math.max(1, this.clampInteger(buildingFloorHeight, BUILDING_FLOOR_HEIGHT)),
            buildingFloorLevels: this.normalizeFloorLevels(buildingFloorLevels),
            buildingFloorRefs: this.normalizeBuildingFloorRefs(buildingFloorRefs),
            buildingLevelIndex: Number.isFinite(Number(buildingLevelIndex)) ? Math.floor(Number(buildingLevelIndex)) : 0,
            buildingLevelTag: typeof buildingLevelTag === 'string' ? buildingLevelTag : null,
            buildingLevelKind: typeof buildingLevelKind === 'string' ? buildingLevelKind : null,
            buildingPartTag: typeof buildingPartTag === 'string' ? buildingPartTag : null,
            buildingAnchorZ: this.clampInteger(buildingAnchorZ, normalizedBase),
            buildingPlacementZ: this.clampInteger(buildingPlacementZ, normalizedBase),
            buildingPlacementTag: typeof buildingPlacementTag === 'string' ? buildingPlacementTag : null,
            stairRole: typeof stairRole === 'string' ? stairRole : null,
            stairLevel: this.clampInteger(stairLevel, 0),
            stairBaseElevation: this.clampInteger(stairBaseElevation, normalizedBase),
            stairDestinationElevation: this.clampInteger(stairDestinationElevation, 0),
            doorWallTexture: this.clampInteger(doorWallTexture, 0),
            doorBaseElevation: this.clampInteger(doorBaseElevation, 0),
            walkable: walkable ?? this.isWalkableBlock(normalizedElement, textureValue, normalizedBuilding)
        };
    }

    isWalkableBlock(element, texture, building = 0) {
        if (building === 1 || this.isWindowWallPart(building)) return false;
        if (building === 23) return true;
        if (element === ELEMENTS.STRUCTURE) {
            return [2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(texture);
        }
        return WALKABLE_ELEMENTS.has(element);
    }

    clampInteger(value, fallback) {
        const number = Number(value);
        return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
    }

    resolveCenter(centerX, centerY, previous) {
        const tileX = Math.round(this.clampNumber(centerX, previous?.centerX ?? 0));
        const tileY = Math.round(this.clampNumber(centerY, previous?.centerY ?? 0));
        const surface = this.getReachableSurfaceAt(tileX, tileY, previous?.centerZ, {
            allowBuildingStairSpan: true
        });

        if (!surface || !surface.walkable) {
            return this.resolveFallback(previous);
        }

        if (previous) {
            if (!this.canOccupyTile(tileX, tileY, previous.tileX, previous.tileY, previous.centerZ)) {
                return this.resolveFallback(previous);
            }
        }

        return {
            centerX: this.clampNumber(centerX, tileX),
            centerY: this.clampNumber(centerY, tileY),
            centerZ: surface.z,
            tileX,
            tileY,
            tileZ: surface.z,
            valid: true
        };
    }

    resolveFallback(previous) {
        if (previous) {
            return { ...previous, valid: false };
        }
        const spawn = this.findHighestWalkable();
        return {
            centerX: spawn.x,
            centerY: spawn.y,
            centerZ: spawn.z,
            tileX: spawn.x,
            tileY: spawn.y,
            tileZ: spawn.z,
            valid: false
        };
    }

    resolveNearestWalkable(startX, startY) {
        const spawn = this.findNearestWalkable(startX, startY);
        return {
            centerX: spawn.x,
            centerY: spawn.y,
            centerZ: spawn.z,
            tileX: spawn.x,
            tileY: spawn.y,
            tileZ: spawn.z,
            valid: false
        };
    }

    findNearestWalkable(startX, startY, maxRadius = 48) {
        const originX = Math.round(startX);
        const originY = Math.round(startY);
        for (let radius = 0; radius <= maxRadius; radius++) {
            for (let x = originX - radius; x <= originX + radius; x++) {
                for (let y = originY - radius; y <= originY + radius; y++) {
                    if (Math.abs(x - originX) !== radius && Math.abs(y - originY) !== radius) continue;
                    const surface = this.getSurfaceAt(x, y);
                    if (surface?.walkable) return surface;
                }
            }
        }
        return { x: 0, y: 0, z: 0 };
    }

    findHighestWalkable() {
        let best = null;
        for (const surface of this.surfaceMap.values()) {
            if (!surface.walkable) continue;
            if (!best || surface.z > best.z) best = surface;
        }
        return best || this.findNearestWalkable(0, 0);
    }

    getReachableSurfaceAt(x, y, fromZ = null, options = {}) {
        const column = this.getVoxelColumnAt(x, y);
        if (!Array.isArray(column) || column.length === 0) return this.getSurfaceAt(x, y);
        const topZ = column.reduce((max, voxel) => Math.max(max, voxel.z), 0);
        const walkable = column
            .filter((voxel) =>
                voxel.walkable &&
                this.isMovementSurfaceVoxel(voxel, topZ) &&
                this.hasMovementClearance(column, voxel.z)
            )
            .sort((a, b) => a.z - b.z);
        if (!walkable.length) return null;
        const top = walkable[walkable.length - 1];
        if (!Number.isFinite(fromZ)) return this.toSurfaceRecord(x, y, top);
        const exact = walkable.find((voxel) => voxel.z === fromZ);
        if (exact) return this.toSurfaceRecord(x, y, exact);
        const oneStepUp = walkable.find((voxel) => voxel.z === fromZ + 1);
        if (oneStepUp) return this.toSurfaceRecord(x, y, oneStepUp);
        if (options.allowBuildingStairSpan) {
            const storeyStair = walkable.find((voxel) =>
                Math.abs(voxel.z - fromZ) === BUILDING_STAIR_STOREY_HEIGHT &&
                this.isBuildingStairSurface(voxel)
            );
            if (storeyStair) return this.toSurfaceRecord(x, y, storeyStair);
        }
        const nearest = walkable
            .filter((voxel) => Math.abs(voxel.z - fromZ) <= 1)
            .sort((a, b) => Math.abs(a.z - fromZ) - Math.abs(b.z - fromZ))[0];
        return nearest ? this.toSurfaceRecord(x, y, nearest) : null;
    }

    hasMovementClearance(column, surfaceZ) {
        return !column.some((voxel) =>
            voxel.z > surfaceZ &&
            voxel.z <= surfaceZ + BLOCKING_CLEARANCE_VOXELS &&
            !voxel.walkable
        );
    }

    isMovementSurfaceVoxel(voxel, topZ) {
        if (!voxel) return false;
        if (voxel.z === topZ) return true;
        if (voxel.element !== ELEMENTS.STRUCTURE) return false;
        return [2, 3, 4, 10, 11, 12, 13, 18, 19, 20, 21, 22, 23].includes(voxel.building);
    }

    toSurfaceRecord(x, y, voxel) {
        return {
            x,
            y,
            z: voxel.z,
            element: voxel.element,
            texture: voxel.texture,
            effect: voxel.effect,
            building: voxel.building,
            walkable: voxel.walkable,
            buildingGroundFloorZ: voxel.buildingGroundFloorZ,
            buildingFloorHeight: voxel.buildingFloorHeight,
            buildingLevelIndex: voxel.buildingLevelIndex,
            buildingLevelTag: voxel.buildingLevelTag,
            buildingLevelKind: voxel.buildingLevelKind,
            buildingPartTag: voxel.buildingPartTag,
            buildingAnchorZ: voxel.buildingAnchorZ,
            buildingPlacementZ: voxel.buildingPlacementZ,
            buildingPlacementTag: voxel.buildingPlacementTag
        };
    }

    canOccupyTile(x, y, fromX = x, fromY = y, fromZOverride = null) {
        const fromSurface = Number.isFinite(fromZOverride)
            ? this.getReachableSurfaceAt(fromX, fromY, fromZOverride)
            : this.getReachableSurfaceAt(fromX, fromY);
        const fromZ = Number.isFinite(fromZOverride) ? fromZOverride : (fromSurface?.z ?? 0);
        const surface = this.getReachableSurfaceAt(x, y, fromZ, {
            allowBuildingStairSpan: true
        });
        if (!surface?.walkable) return false;

        const elevationDiff = surface.z - fromZ;
        if (Math.abs(elevationDiff) <= 1) return true;
        if (this.isPairedStairTransition(fromSurface, surface, x - fromX, y - fromY)) return true;
        return false;
    }

    canMoveBetween(fromX, fromY, toX, toY, fromZ = null) {
        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAt(fromX, fromY, fromZ)
            : this.getReachableSurfaceAt(fromX, fromY);
        const fromSurfaceZ = Number.isFinite(fromZ) ? fromZ : (fromSurface?.z ?? 0);
        if (fromX === toX && fromY === toY) {
            return this.canOccupyTile(toX, toY, fromX, fromY, fromSurfaceZ);
        }

        if (!this.canOccupyTile(toX, toY, fromX, fromY, fromSurfaceZ)) return false;

        const dx = toX - fromX;
        const dy = toY - fromY;
        if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
            if (!this.canUseStairsBetween(fromX, fromY, toX, toY, fromSurfaceZ)) return false;
            const toSurface = this.getReachableSurfaceAt(toX, toY, fromSurfaceZ, {
                allowBuildingStairSpan: true
            });
            if (this.isPairedStairTransition(fromSurface, toSurface, dx, dy)) return true;
            const horizontalClear = this.canOccupyTile(toX, fromY, fromX, fromY, fromSurfaceZ);
            const verticalClear = this.canOccupyTile(fromX, toY, fromX, fromY, fromSurfaceZ);
            if (horizontalClear && verticalClear) return true;
            if (!horizontalClear && !verticalClear) return false;
            return false;
        }

        return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 &&
            this.canUseStairsBetween(fromX, fromY, toX, toY, fromSurfaceZ);
    }

    isStairSurface(surface) {
        return [4, 10, 11, 12, 13, 19, 20, 21, 22].includes(surface?.building);
    }

    canUseStairsBetween(fromX, fromY, toX, toY, fromZ = null) {
        const fromSurface = Number.isFinite(fromZ)
            ? this.getReachableSurfaceAt(fromX, fromY, fromZ)
            : this.getReachableSurfaceAt(fromX, fromY);
        const fromSurfaceZ = Number.isFinite(fromZ) ? fromZ : (fromSurface?.z ?? 0);
        const toSurface = this.getReachableSurfaceAt(toX, toY, fromSurfaceZ, {
            allowBuildingStairSpan: true
        });
        const elevationDiff = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        const dx = toX - fromX;
        const dy = toY - fromY;
        if (elevationDiff === 0) return true;

        const fromIsStair = this.isStairSurface(fromSurface);
        const toIsStair = this.isStairSurface(toSurface);
        if (!fromIsStair && !toIsStair) return true;
        if (this.isPairedStairTransition(fromSurface, toSurface, dx, dy)) return true;
        if (Math.abs(elevationDiff) > 1) return false;
        if (this.isCityWallStairSurface(fromSurface) || this.isCityWallStairSurface(toSurface)) {
            return this.isDirectionalCityWallStairStep(fromSurface, toSurface, dx, dy);
        }
        return Math.abs(dx) + Math.abs(dy) === 1 && (fromIsStair || toIsStair);
    }

    isBuildingStairSurface(surface) {
        return [4, 10, 11, 12, 13].includes(surface?.building);
    }

    isCityWallStairSurface(surface) {
        return [19, 20, 21, 22].includes(surface?.building);
    }

    isPairedStairTransition(fromSurface, toSurface, dx, dy) {
        if (!this.isBuildingStairSurface(fromSurface) || !this.isBuildingStairSurface(toSurface)) return false;
        const dz = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        if (Math.abs(dz) !== BUILDING_STAIR_PAIR_STEP_HEIGHT) return false;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
        const direction = dz > 0
            ? this.getBuildingStairAscentVector(fromSurface) || this.getBuildingStairAscentVector(toSurface)
            : this.getBuildingStairAscentVector(toSurface) || this.getBuildingStairAscentVector(fromSurface);
        if (!direction) return false;
        return dz > 0
            ? dx === direction.x && dy === direction.y
            : dx === -direction.x && dy === -direction.y;
    }

    isDirectionalCityWallStairStep(fromSurface, toSurface, dx, dy) {
        const dz = (toSurface?.z ?? 0) - (fromSurface?.z ?? 0);
        if (Math.abs(dz) !== 1) return false;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
        const direction = dz > 0
            ? this.getCityWallStairAscentVector(fromSurface) || this.getCityWallStairAscentVector(toSurface)
            : this.getCityWallStairAscentVector(toSurface) || this.getCityWallStairAscentVector(fromSurface);
        if (!direction) return false;
        return dz > 0
            ? dx === direction.x && dy === direction.y
            : dx === -direction.x && dy === -direction.y;
    }

    getBuildingStairAscentVector(surface) {
        return {
            13: { x: 0, y: 1 },
            11: { x: -1, y: 0 },
            12: { x: 0, y: -1 },
            10: { x: 1, y: 0 }
        }[surface?.building] || null;
    }

    getCityWallStairAscentVector(surface) {
        return {
            19: { x: 0, y: -1 },
            20: { x: 0, y: 1 },
            21: { x: -1, y: 0 },
            22: { x: 1, y: 0 }
        }[surface?.building] || null;
    }

    getSurfaceAt(x, y) {
        return this.surfaceMap.get(this.getColumnKey(x, y));
    }

    getVoxelColumnAt(x, y) {
        return this.voxelColumnMap.get(this.getColumnKey(x, y)) || null;
    }

    getColumnKey(x, y) {
        return `${x},${y}`;
    }

    clampNumber(value, fallback) {
        return Number.isFinite(value) ? Math.max(-10000, Math.min(10000, value)) : fallback;
    }
}

module.exports = {
    DEFAULT_MAP,
    WorldSurface
};
