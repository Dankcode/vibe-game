import assert from 'node:assert/strict';
import test from 'node:test';
import { Tile } from '../entities/Tile.js';
import { WorldGenerator } from '../systems/WorldGenerator.js';

test('ordinary homes and workshops use gabled roofs while explicit civic forms keep parapets', () => {
    for (const building of [
        { archetype: 'cottage', roofStyle: 'slate', district: 'residential' },
        { archetype: 'townhouse', roofStyle: 'slate', district: 'residential' },
        { archetype: 'workshop', roofStyle: 'slate', district: 'artisan' },
        { archetype: 'bayfront', architectureStyle: 'bayfront', district: 'harbor' }
    ]) {
        const profile = WorldGenerator.resolveBuildingRoofProfile(building);
        assert.equal(profile.isGabled, true, `${building.archetype} should be gabled`);
        assert.equal(profile.isFlatParapet, false, `${building.archetype} should not be parapeted`);
    }

    for (const building of [
        { archetype: 'hall', district: 'civic' },
        { archetype: 'stall', district: 'market' },
        { architectureStyle: 'courtyard', roofStyle: 'slate' },
        { architectureStyle: 'arcade', roofStyle: 'clay' }
    ]) {
        const profile = WorldGenerator.resolveBuildingRoofProfile(building);
        assert.equal(profile.isGabled, false);
        assert.equal(profile.isFlatParapet, true);
    }
});

test('shallow water beds discard the water biome but retain deterministic variation', () => {
    const context = {
        x: 7,
        y: -3,
        elevation: 2,
        seed: 19,
        paletteId: 'crystal',
        visualVariant: 4
    };
    const bed = Tile.getShallowWaterBedVisualContext(context);
    assert.equal(bed.paletteId, null);
    assert.equal(bed.seed, context.seed);
    assert.equal(bed.visualVariant, context.visualVariant);
    assert.equal(context.paletteId, 'crystal');
});

test('cliff strata, lips, and ground tufts resolve through each biome palette', () => {
    const palettes = ['coast', 'desert', 'tundra', 'crystal'];
    for (const detailKey of ['grassLip', 'cliffStrata', 'cliffMoss']) {
        const colors = palettes.map((paletteId) =>
            WorldGenerator.resolveTerrainDetailPreset(detailKey, paletteId).color
        );
        assert.equal(new Set(colors).size, palettes.length, `${detailKey} should vary by biome`);
    }

    const crystalMoss = WorldGenerator.resolveTerrainDetailPreset('cliffMoss', 'crystal');
    assert.ok(crystalMoss.emissiveIntensity > 0);
    assert.notEqual(
        WorldGenerator.getTerrainDetailMaterial('cliffStrata', 'desert'),
        WorldGenerator.getTerrainDetailMaterial('cliffStrata', 'tundra')
    );
});

test('natural turf frames are quieter while paths and water retain crisp borders', () => {
    const captureBorder = (definition, isLiquid = false) => {
        const strokes = [];
        const ctx = {
            lineWidth: 0,
            strokeStyle: '',
            save() {},
            restore() {},
            strokeRect() {
                strokes.push({ lineWidth: this.lineWidth, strokeStyle: this.strokeStyle });
            }
        };
        Tile.drawTileBorder(ctx, definition, isLiquid);
        return strokes;
    };

    assert.equal(Tile.isNaturalTurfPattern('grass'), true);
    assert.equal(Tile.isNaturalTurfPattern('road'), false);
    assert.match(captureBorder({ pattern: 'grass', walkable: true })[0].strokeStyle, /0\.14/);
    assert.match(captureBorder({ pattern: 'road', walkable: true })[0].strokeStyle, /0\.36/);
    assert.match(captureBorder({ pattern: 'water', walkable: false }, true)[0].strokeStyle, /0\.55/);
});
