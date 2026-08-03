import assert from 'node:assert/strict';
import test from 'node:test';

import { Tile } from '../entities/Tile.js';
import {
    BURG_THEME_IDS,
    getBurgTheme
} from './BurgThemeCatalog.js';
import {
    BUILDING_PARTS,
    TEXTURE_IDS,
    createTileCell,
    createVoxelMatrix,
    normalizeTileCell,
    tileCellToVoxelColumn
} from './TileLibrary.js';
import {
    ELEMENTS,
    getTileDefinition,
    isArchitectureThemeSurface
} from './TileRegistry.js';
import {
    BURG_THEME_STREET_PALETTE_IDS,
    BURG_THEME_STREET_PALETTES,
    getBurgThemeStreetPaletteId
} from './WorldPalettes.js';

test('the manifest catalog produces exactly five bounded and distinct street palettes', () => {
    const expectedPaletteIds = BURG_THEME_IDS.map((themeId) => getBurgTheme(themeId).streetPaletteId);

    assert.equal(BURG_THEME_IDS.length, 5);
    assert.deepEqual(BURG_THEME_STREET_PALETTE_IDS, expectedPaletteIds);
    assert.equal(Object.keys(BURG_THEME_STREET_PALETTES).length, 5);
    assert.equal(new Set(BURG_THEME_STREET_PALETTE_IDS).size, 5);
    assert.equal(getBurgThemeStreetPaletteId('Northern European'), 'northern-european-cobble');
    assert.equal(getBurgThemeStreetPaletteId('not-a-theme'), null);

    const paletteSignatures = [];
    for (const paletteId of BURG_THEME_STREET_PALETTE_IDS) {
        const definition = BURG_THEME_STREET_PALETTES[paletteId];
        assert.equal(definition.variants.length, 6);
        paletteSignatures.push(definition.variants
            .map((variant) => `${variant.topColor}:${variant.sideColor}:${variant.accentColor}`)
            .join('|'));
    }
    assert.equal(new Set(paletteSignatures).size, 5);
});

test('owned streets and architecture use their burg palette without changing collision', () => {
    for (const texture of [TEXTURE_IDS.ROAD, TEXTURE_IDS.CITY_COBBLE, TEXTURE_IDS.CITY_PLAZA]) {
        const plain = getTileDefinition(ELEMENTS.GEO, texture, 'forest');
        const themed = getTileDefinition(ELEMENTS.GEO, texture, 'forest', 'asian');
        assert.equal(isArchitectureThemeSurface(ELEMENTS.GEO, texture), true);
        assert.equal(themed.paletteId, getBurgTheme('asian').streetPaletteId);
        assert.equal(themed.architectureThemeId, 'asian');
        assert.equal(themed.walkable, plain.walkable);
        assert.equal(themed.moveCost, plain.moveCost);
    }

    for (const texture of [
        TEXTURE_IDS.DEFAULT,
        TEXTURE_IDS.TOWN_WALL,
        TEXTURE_IDS.STONE_BUILDING_WALL,
        TEXTURE_IDS.TIMBER_BUILDING_WALL,
        TEXTURE_IDS.CITY_WALL_WALKWAY,
        TEXTURE_IDS.CITY_WALL_STAIRS
    ]) {
        const plain = getTileDefinition(ELEMENTS.STRUCTURE, texture);
        const themed = getTileDefinition(ELEMENTS.STRUCTURE, texture, null, 'egyptian');
        assert.equal(isArchitectureThemeSurface(ELEMENTS.STRUCTURE, texture), true);
        assert.equal(themed.paletteId, getBurgTheme('egyptian').streetPaletteId);
        assert.equal(themed.walkable, plain.walkable);
        assert.equal(themed.moveCost, plain.moveCost);
    }

    const naturalTerrain = getTileDefinition(ELEMENTS.GEO, TEXTURE_IDS.DEFAULT, 'forest', 'asian');
    assert.equal(naturalTerrain.paletteId, 'forest');
    assert.equal(naturalTerrain.architecturePaletteId, null);
    assert.equal(naturalTerrain.architectureThemeId, 'asian');

    const invalidTheme = getTileDefinition(ELEMENTS.GEO, TEXTURE_IDS.ROAD, 'forest', 'invented-theme');
    assert.equal(invalidTheme.architectureThemeId, null);
    assert.equal(invalidTheme.paletteId, 'forest');
});

test('architectureThemeId survives cell normalization and every voxel in its column', () => {
    const source = createTileCell({
        element: ELEMENTS.STRUCTURE,
        texture: TEXTURE_IDS.STONE_BUILDING_WALL,
        building: BUILDING_PARTS.WALL,
        height: 3,
        visualVariant: 4,
        paletteId: 'meadow',
        architectureThemeId: 'southern-european'
    });
    const fromObject = normalizeTileCell({ ...source });
    const fromArray = normalizeTileCell([
        source.element,
        source.texture,
        source.effect,
        source.building,
        source.height,
        source.visualVariant,
        source.paletteId,
        source.architectureThemeId
    ]);

    assert.equal(fromObject.architectureThemeId, 'southern-european');
    assert.equal(fromArray.architectureThemeId, 'southern-european');
    assert.equal(normalizeTileCell({ ...source, architectureThemeId: 'unknown' }).architectureThemeId, null);

    const column = tileCellToVoxelColumn(fromObject);
    assert.ok(column.length > 1);
    assert.ok(column.every((block) => block.architectureThemeId === 'southern-european'));
    assert.equal(column.at(-1).definition.paletteId, getBurgTheme('southern-european').streetPaletteId);

    const rows = [[fromObject]];
    rows.architectureThemeRows = [['southern-european']];
    const matrix = createVoxelMatrix(rows);
    assert.deepEqual(matrix.architectureThemeRows, [['southern-european']]);
    assert.notEqual(matrix.architectureThemeRows[0], rows.architectureThemeRows[0]);
});

test('elevated WFC terrain becomes a contiguous stack of cube blocks', () => {
    const terrace = createTileCell({
        element: ELEMENTS.GEO,
        texture: TEXTURE_IDS.CITY_COBBLE,
        height: 5,
        visualVariant: 2,
        paletteId: 'desert',
        architectureThemeId: 'egyptian'
    });
    const column = tileCellToVoxelColumn(terrace);

    assert.deepEqual(column.map((block) => block.z), [0, 1, 2, 3, 4, 5]);
    assert.ok(column.every((block) => block.element === ELEMENTS.GEO));
    assert.ok(column.every((block) => block.architectureThemeId === 'egyptian'));
    assert.ok(column.slice(0, -1).every((block) => block.textureValue === TEXTURE_IDS.DEFAULT));
    assert.equal(column.at(-1).textureValue, TEXTURE_IDS.CITY_COBBLE);
    assert.equal(column.at(-1).definition.paletteId, getBurgTheme('egyptian').streetPaletteId);
});

test('material cache keys are isolated by normalized architecture theme', () => {
    const visual = {
        paletteId: 'shared-test-palette',
        visualVariant: 1,
        paletteIndex: 1,
        motif: 1
    };
    const asianKey = Tile.createMaterialCacheKey(
        ELEMENTS.STRUCTURE,
        TEXTURE_IDS.STONE_BUILDING_WALL,
        0,
        { ...visual, architectureThemeId: 'asian' },
        0
    );
    const egyptianKey = Tile.createMaterialCacheKey(
        ELEMENTS.STRUCTURE,
        TEXTURE_IDS.STONE_BUILDING_WALL,
        0,
        { ...visual, architectureThemeId: 'egyptian' },
        0
    );
    const invalidKey = Tile.createMaterialCacheKey(
        ELEMENTS.STRUCTURE,
        TEXTURE_IDS.STONE_BUILDING_WALL,
        0,
        { ...visual, architectureThemeId: 'unbounded-user-value' },
        0
    );
    const unownedKey = Tile.createMaterialCacheKey(
        ELEMENTS.STRUCTURE,
        TEXTURE_IDS.STONE_BUILDING_WALL,
        0,
        visual,
        0
    );

    assert.notEqual(asianKey, egyptianKey);
    assert.equal(invalidKey, unownedKey);
});
