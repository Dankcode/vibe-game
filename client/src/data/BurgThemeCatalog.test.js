import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
    BURG_THEME_CATALOG,
    BURG_THEME_IDS,
    getBurgTheme,
    normalizeBurgThemeId,
    resolveBurgThemeBuildingStyle,
    resolveManifestBurgTheme,
    serializeBurgThemeCatalog,
    validateBurgThemeCatalog,
    validateManifestBurgThemes
} from './BurgThemeCatalog.js';

const MANIFEST_URL = new URL('../../../map-data-package/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(MANIFEST_URL, 'utf8'));

test('shared burg theme catalog exposes five complete deterministic visual presets', () => {
    assert.deepEqual(BURG_THEME_IDS, [
        'asian',
        'middle-eastern',
        'northern-european',
        'southern-european',
        'egyptian'
    ]);
    assert.deepEqual(validateBurgThemeCatalog(), { valid: true, errors: [] });
    assert.equal(serializeBurgThemeCatalog().length, BURG_THEME_IDS.length);
    for (const themeId of BURG_THEME_IDS) {
        const theme = getBurgTheme(themeId);
        assert.equal(theme, BURG_THEME_CATALOG[themeId]);
        assert.ok(theme.streetPaletteId);
        assert.ok(theme.wallTextureId);
        assert.ok(theme.themePalette.roofColors.length >= 3);
        assert.match(theme.themePalette.wallColor, /^#[0-9a-f]{6}$/i);
        assert.equal(Object.isFrozen(theme), true);
        assert.equal(Object.isFrozen(theme.themePalette), true);
    }
    assert.equal(normalizeBurgThemeId('Middle Eastern'), 'middle-eastern');
    assert.equal(normalizeBurgThemeId('northern_european'), 'northern-european');
    assert.equal(normalizeBurgThemeId('unknown'), null);
    assert.equal(normalizeBurgThemeId('unknown', 'asian'), 'asian');
});

test('source manifest explicitly assigns one valid theme to all 60 burgs', () => {
    const validation = validateManifestBurgThemes(manifest);
    assert.equal(validation.valid, true, validation.errors.join('\n'));
    assert.equal(validation.themeByBurgId.size, 60);
    assert.equal(Object.keys(manifest.burg_theme_by_id).length, 60);
    const histogram = Object.fromEntries(BURG_THEME_IDS.map((themeId) => [themeId, 0]));
    for (const burg of manifest.burgs) {
        const themeId = resolveManifestBurgTheme(manifest, burg.id);
        assert.equal(themeId, validation.themeByBurgId.get(burg.id));
        histogram[themeId]++;
    }
    assert.deepEqual(histogram, {
        asian: 2,
        'middle-eastern': 9,
        'northern-european': 21,
        'southern-european': 25,
        egyptian: 3
    });
    assert.equal(resolveManifestBurgTheme(manifest, 42), 'egyptian');
    assert.equal(resolveManifestBurgTheme(manifest, 45), 'egyptian');
    assert.equal(resolveManifestBurgTheme(manifest, 57), 'egyptian');
});

test('manifest validation rejects missing, unknown, and non-canonical assignments', () => {
    const missing = {
        ...manifest,
        burg_theme_by_id: { ...manifest.burg_theme_by_id }
    };
    delete missing.burg_theme_by_id['1'];
    assert.equal(validateManifestBurgThemes(missing).valid, false);

    const unknown = {
        ...manifest,
        burg_theme_by_id: { ...manifest.burg_theme_by_id, 1: 'generic-fantasy' }
    };
    assert.equal(validateManifestBurgThemes(unknown).valid, false);

    const alias = {
        ...manifest,
        burg_theme_by_id: { ...manifest.burg_theme_by_id, 1: 'Southern European' }
    };
    assert.equal(validateManifestBurgThemes(alias).valid, false);
});

test('building style resolution varies inside a theme without crossing theme boundaries', () => {
    for (const themeId of BURG_THEME_IDS) {
        const options = {
            district: 'castle',
            seed: 424242,
            baseStyle: 'storybook',
            baseRoofStyle: 'generic',
            baseArchitectureStyle: 'keep'
        };
        const first = resolveBurgThemeBuildingStyle(themeId, options);
        const repeated = resolveBurgThemeBuildingStyle(themeId, options);
        assert.deepEqual(repeated, first);
        assert.equal(first.architectureThemeId, themeId);
        assert.equal(first.themeLabel, BURG_THEME_CATALOG[themeId].label);
        assert.ok(BURG_THEME_CATALOG[themeId].styles.includes(first.style));
        assert.ok(BURG_THEME_CATALOG[themeId].roofStyles.includes(first.roofStyle));
        assert.ok(BURG_THEME_CATALOG[themeId].roofGeometries.includes(first.roofGeometry));
        assert.ok(BURG_THEME_CATALOG[themeId].facadeKits.includes(first.facadeKit));
        assert.ok(BURG_THEME_CATALOG[themeId].castleKits.includes(first.castleKit));
        assert.equal(first.streetPaletteId, BURG_THEME_CATALOG[themeId].streetPaletteId);
        assert.equal(first.wallTextureId, BURG_THEME_CATALOG[themeId].wallTextureId);
    }
    assert.throws(
        () => resolveBurgThemeBuildingStyle('generic-fantasy'),
        /Unknown burg architecture theme/
    );
});
