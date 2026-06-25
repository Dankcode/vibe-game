export const ELEMENTS = {
    VOID: 0,
    GEO: 1,
    HYDRO: 2,
    ANEMO: 3,
    CRYO: 4,
    PYRO: 5,
    STRUCTURE: 6
};

export const TILE_DEFINITIONS = {
    [ELEMENTS.VOID]: {
        id: 'void',
        label: 'Void',
        walkable: false,
        habitats: [],
        topColor: 0x7d8796,
        sideColor: 0x5d6673,
        roughness: 0.95,
        pattern: 'blocked'
    },
    [ELEMENTS.GEO]: {
        id: 'geo',
        label: 'Grassland',
        walkable: true,
        habitats: ['meadow', 'forest-edge'],
        topColor: 0x8fda68,
        sideColor: 0x62aa58,
        roughness: 0.76,
        moveCost: 1,
        pattern: 'grass'
    },
    [ELEMENTS.HYDRO]: {
        id: 'hydro',
        label: 'Water',
        walkable: false,
        habitats: ['shore'],
        topColor: 0x4fc3f7,
        sideColor: 0x1d86bf,
        roughness: 0.35,
        moveCost: Infinity,
        pattern: 'water'
    },
    [ELEMENTS.ANEMO]: {
        id: 'anemo',
        label: 'Sand',
        walkable: true,
        habitats: ['shore'],
        topColor: 0xffd978,
        sideColor: 0xe3a84d,
        roughness: 0.78,
        moveCost: 1.08,
        pattern: 'sand'
    },
    [ELEMENTS.CRYO]: {
        id: 'cryo',
        label: 'Snowfield',
        walkable: true,
        habitats: ['snow'],
        topColor: 0xf3fbff,
        sideColor: 0xb7d9ea,
        roughness: 0.32,
        moveCost: 1.18,
        pattern: 'ice'
    },
    [ELEMENTS.PYRO]: {
        id: 'pyro',
        label: 'Lava',
        walkable: false,
        habitats: [],
        topColor: 0xff7a26,
        sideColor: 0xb83a18,
        roughness: 0.55,
        moveCost: Infinity,
        pattern: 'lava'
    },
    [ELEMENTS.STRUCTURE]: {
        id: 'structure',
        label: 'Building Wall',
        walkable: false,
        habitats: [],
        topColor: 0xffb5cf,
        sideColor: 0xc86d8d,
        roughness: 0.7,
        moveCost: Infinity,
        pattern: 'building'
    }
};

const VARIANT_OVERRIDES = {
    [`${ELEMENTS.HYDRO}:4`]: {
        label: 'Brackish Water',
        topColor: 0x77a267,
        sideColor: 0x4a7145,
        pattern: 'marsh'
    },
    [`${ELEMENTS.GEO}:1`]: {
        label: 'Forest Floor',
        topColor: 0x67c36f,
        sideColor: 0x3f9653,
        moveCost: 1.2,
        pattern: 'forest'
    },
    [`${ELEMENTS.GEO}:2`]: {
        label: 'Village Road',
        topColor: 0xf8d98a,
        sideColor: 0xd3a357,
        moveCost: 0.9,
        pattern: 'road'
    },
    [`${ELEMENTS.GEO}:3`]: {
        label: 'Hill Ledge',
        topColor: 0xa7d879,
        sideColor: 0x4f8c43,
        moveCost: 1.28,
        pattern: 'hill'
    },
    [`${ELEMENTS.GEO}:4`]: {
        label: 'Mountain Ledge',
        topColor: 0xaebc8c,
        sideColor: 0x69745c,
        moveCost: 1.45,
        pattern: 'stone'
    },
    [`${ELEMENTS.CRYO}:1`]: {
        label: 'Ice Lake',
        topColor: 0xb8f0ff,
        sideColor: 0x75bdd7,
        moveCost: 1.24,
        pattern: 'ice'
    },
    [`${ELEMENTS.STRUCTURE}:0`]: {
        label: 'Stone Wall',
        topColor: 0xb5c0cc,
        sideColor: 0x7e8b99,
        pattern: 'blocked'
    },
    [`${ELEMENTS.STRUCTURE}:1`]: {
        label: 'Town Wall',
        topColor: 0xffc36e,
        sideColor: 0xd8893c,
        pattern: 'brick'
    },
    [`${ELEMENTS.STRUCTURE}:2`]: {
        label: 'Building Floor',
        walkable: true,
        topColor: 0xd7b98a,
        sideColor: 0xa7754f,
        moveCost: 0.95,
        pattern: 'floor'
    },
    [`${ELEMENTS.STRUCTURE}:3`]: {
        label: 'Stone Building Wall',
        topColor: 0xc5cbd1,
        sideColor: 0x7d8790,
        pattern: 'masonry'
    },
    [`${ELEMENTS.STRUCTURE}:4`]: {
        label: 'Timber Building Wall',
        topColor: 0xd59a63,
        sideColor: 0x895936,
        pattern: 'timber'
    },
    [`${ELEMENTS.STRUCTURE}:5`]: {
        label: 'Doorway',
        walkable: true,
        topColor: 0x9b633a,
        sideColor: 0x6f4028,
        moveCost: 0.9,
        pattern: 'door'
    },
    [`${ELEMENTS.STRUCTURE}:6`]: {
        label: 'Stairs',
        walkable: true,
        topColor: 0xc8aa7a,
        sideColor: 0x8c6540,
        moveCost: 1.05,
        pattern: 'stairs'
    },
    [`${ELEMENTS.STRUCTURE}:9`]: {
        label: 'Stone Stairs',
        walkable: true,
        topColor: 0xc5cbd1,
        sideColor: 0x7d8790,
        moveCost: 1.05,
        pattern: 'masonry'
    },
    [`${ELEMENTS.STRUCTURE}:10`]: {
        label: 'Timber Stairs',
        walkable: true,
        topColor: 0xd59a63,
        sideColor: 0x895936,
        moveCost: 1.05,
        pattern: 'timber'
    }
};

export function getTileDefinition(element, textureValue = 0) {
    const base = TILE_DEFINITIONS[element] || TILE_DEFINITIONS[ELEMENTS.VOID];
    const override = VARIANT_OVERRIDES[`${element}:${textureValue}`] || {};
    return { ...base, ...override };
}

export function isTileWalkable(element, textureValue = 0) {
    return getTileDefinition(element, textureValue).walkable;
}

export function tileSupportsHabitat(element, textureValue, habitat) {
    return getTileDefinition(element, textureValue).habitats.includes(habitat);
}
