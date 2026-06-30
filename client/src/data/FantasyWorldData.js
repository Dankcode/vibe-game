import { ACTIVE_TOWNS, ACTIVE_WORLD } from './ActiveWorldData.js';

export const WORLD_VIEW_WIDTH = 80;
export const WORLD_VIEW_HEIGHT = 60;

export const FANTASY_WORLD = ACTIVE_WORLD;

export function getWorldMapLocations() {
    return FANTASY_WORLD.locations.map((location) => cloneLocation(location));
}

export function getDefaultWorldLocation() {
    const locations = getWorldMapLocations().filter((location) => ACTIVE_TOWNS[location.id]);
    return locations.find((location) => location.type === 'capital') || locations[0];
}

export function createFantasyWorldPlanAt(worldX, worldY, options = {}) {
    const location = findBestLocation(worldX, worldY);
    const town = ACTIVE_TOWNS[location.id];
    if (!town) throw new Error(`Missing active world town payload for ${location.id}.`);

    const rows = town.rows.slice();
    const elevationRows = cloneElevationRows(town.elevationRows);
    const width = rows[0]?.length || town.width || WORLD_VIEW_WIDTH;
    const height = rows.length || town.height || WORLD_VIEW_HEIGHT;

    return {
        rows,
        elevationRows,
        buildings: cloneBuildings(town.buildings),
        decorations: cloneDecorations(town.decorations),
        connectDoors: false,
        width,
        height,
        center: {
            x: Math.floor(width / 2),
            y: Math.floor(height / 2)
        },
        townName: location.name,
        seed: town.seed ?? FANTASY_WORLD.seed,
        sourceTown: {
            id: town.id,
            name: town.name,
            biome: town.biome,
            density: town.density,
            stats: { ...town.stats },
            terrainScale: town.terrainScale || FANTASY_WORLD.importScale || 1,
            buildingScale: town.buildingScale || FANTASY_WORLD.buildingScale || 1,
            requestedWorldX: worldX,
            requestedWorldY: worldY
        },
        world: {
            id: FANTASY_WORLD.id,
            name: FANTASY_WORLD.name,
            seed: FANTASY_WORLD.seed,
            centerX: location.x,
            centerY: location.y,
            originX: location.grid?.origin?.[0] ?? location.x - width / 2,
            originY: location.grid?.origin?.[1] ?? location.y - height / 2,
            locations: [location.id],
            source: FANTASY_WORLD.source,
            image: FANTASY_WORLD.image
        }
    };
}

function findBestLocation(worldX, worldY) {
    const x = Number(worldX);
    const y = Number(worldY);
    const locations = FANTASY_WORLD.locations;
    if (!locations.length) throw new Error('Active world has no borough locations.');
    if (!Number.isFinite(x) || !Number.isFinite(y)) return locations[0];

    return locations.reduce((best, location) => {
        const distance = Math.hypot(location.x - x, location.y - y);
        return distance < best.distance ? { location, distance } : best;
    }, { location: locations[0], distance: Infinity }).location;
}

function cloneLocation(location) {
    return {
        ...location,
        flags: { ...(location.flags || {}) },
        grid: location.grid ? {
            ...location.grid,
            origin: [...(location.grid.origin || [])],
            center: [...(location.grid.center || [])]
        } : undefined,
        summary: { ...(location.summary || {}) }
    };
}

function cloneDecorations(decorations = []) {
    return decorations.map((decoration) => ({
        ...decoration,
        position: decoration.position ? { ...decoration.position } : undefined
    }));
}

function cloneBuildings(buildings = []) {
    return buildings.map((building) => ({
        ...building,
        door: building.door ? { ...building.door } : undefined,
        stairs: (building.stairs || []).map((stair) => ({ ...stair })),
        interior: building.interior ? { ...building.interior } : undefined,
        floors: (building.floors || []).map((floor) => ({
            ...floor,
            rooms: (floor.rooms || []).map((room) => ({
                ...room,
                gridRect: room.gridRect ? { ...room.gridRect } : null,
                doors: (room.doors || []).map((door) => ({
                    ...door,
                    grid: Array.isArray(door.grid) ? [...door.grid] : null
                }))
            })),
            stairs: floor.stairs ? {
                ...floor.stairs,
                grid: Array.isArray(floor.stairs.grid) ? [...floor.stairs.grid] : null
            } : null
        })),
        sourceColors: building.sourceColors ? { ...building.sourceColors } : undefined
    }));
}

function cloneElevationRows(rows = []) {
    return rows.map((row) => {
        if (typeof row === 'string') return [...row].map((value) => Number(value) || 0);
        return row.slice();
    });
}
