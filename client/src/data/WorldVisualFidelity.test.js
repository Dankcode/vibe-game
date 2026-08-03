import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { BURG_THEME_CATALOG, resolveBurgThemeBuildingStyle } from './BurgThemeCatalog.js';
import { Tile } from '../entities/Tile.js';
import { ELEMENTS, WorldGenerator } from '../systems/WorldGenerator.js';

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

test('burg architecture themes select distinct roof and castle silhouettes', () => {
    const cases = [
        {
            id: 'asian',
            castleKit: 'asian-tiered-citadel',
            variants: [
                ['swept-eaves', 'tiered-pagoda', 'isTieredPagoda'],
                ['hipped', 'asian-hipped', 'isAsianHipped']
            ]
        },
        {
            id: 'middle-eastern',
            castleKit: 'middle-eastern-citadel',
            variants: [
                ['dome-and-parapet', 'dome-parapet', 'isDomed'],
                ['flat-parapet', 'middle-eastern-flat-parapet', 'isMiddleEasternFlat']
            ]
        },
        {
            id: 'northern-european',
            castleKit: 'northern-crag-keep',
            variants: [
                ['steep-gabled', 'steep-gable', 'isSteepGabled'],
                ['turreted', 'northern-turreted', 'isNorthernTurreted']
            ]
        },
        {
            id: 'southern-european',
            castleKit: 'southern-hill-castle',
            variants: [
                ['low-gabled', 'low-terracotta', 'isLowTerracotta'],
                ['hipped', 'southern-hipped', 'isSouthernHipped']
            ]
        },
        {
            id: 'egyptian',
            castleKit: 'egyptian-pylon-fortress',
            variants: [
                ['pylon', 'pylon-stepped', 'isPylonStepped'],
                ['flat-parapet', 'egyptian-flat-parapet', 'isEgyptianFlat']
            ]
        }
    ];

    const castleProfiles = [];
    for (const entry of cases) {
        const variantProfiles = entry.variants.map(([importedGeometry, geometry, flag]) => {
            const profile = WorldGenerator.resolveBuildingRoofProfile({
                architectureThemeId: entry.id,
                roofGeometry: importedGeometry,
                archetype: 'house'
            });
            assert.equal(profile.geometry, geometry);
            assert.equal(profile[flag], true);
            return profile.geometry;
        });
        assert.equal(new Set(variantProfiles).size, entry.variants.length);

        const castle = WorldGenerator.resolveBuildingRoofProfile({
            architectureThemeId: entry.id,
            archetype: 'keep'
        });
        assert.equal(castle.geometry, `castle:${entry.castleKit}`);
        castleProfiles.push(castle.geometry);
    }
    assert.equal(new Set(castleProfiles).size, cases.length);

    for (const vectorMarker of [
        { vectorCastle: true },
        { blueprintId: 'burg-vector-castle' },
        { sourceType: 'burg-vector-castle' }
    ]) {
        const vectorCastle = WorldGenerator.resolveBuildingRoofProfile({
            architectureThemeId: 'asian',
            roofGeometry: 'hipped',
            archetype: 'manor',
            ...vectorMarker
        });
        assert.equal(vectorCastle.isKeep, true);
        assert.equal(vectorCastle.geometry, 'castle:asian-tiered-citadel');
    }
});

test('unknown architecture themes stay on the legacy renderer path', () => {
    const theme = WorldGenerator.resolveArchitectureThemeProfile({
        architectureThemeId: 'Atlantis',
        archetype: 'cottage',
        roofStyle: 'slate'
    });
    const roof = WorldGenerator.resolveBuildingRoofProfile({
        architectureThemeId: 'Atlantis',
        archetype: 'cottage',
        roofStyle: 'slate'
    });
    assert.equal(theme.id, 'legacy-storybook');
    assert.equal(theme.themed, false);
    assert.equal(roof.geometry, 'gabled');
});

test('manifest-themed roofs and keeps build finite LOD geometry with collision raycasts disabled', () => {
    const sceneObjects = [];
    const world = new WorldGenerator({
        addToWorld(object) {
            sceneObjects.push(object);
        },
        removeFromWorld() {}
    });
    const themeIds = [
        'asian',
        'middle-eastern',
        'northern-european',
        'southern-european',
        'egyptian'
    ];

    const assertRenderedRoof = (roof, label, architectureThemeId) => {
        const bounds = new THREE.Box3().setFromObject(roof);
        const size = bounds.getSize(new THREE.Vector3());
        const meshes = [];
        roof.traverse((child) => {
            if (child.isMesh) meshes.push(child);
        });

        assert.equal(roof.userData.architectureThemeId, architectureThemeId);
        assert.equal(roof.userData.planarRoof, true);
        assert.equal(roof.userData.hideAsUnit, true);
        assert.equal(roof.userData.obstructionRole, 'roof');
        assert.match(roof.userData.obstructionTag, /^building:/);
        assert.ok(meshes.length > 3, `${label} should have a readable silhouette`);
        assert.ok(Number.isFinite(size.x) && size.x > 0);
        assert.ok(Number.isFinite(size.y) && size.y > 0 && size.y <= 0.55,
            `${label} roof volume should stay planar; measured height was ${size.y}`);
        assert.ok(Number.isFinite(size.z) && size.z > 0);
        for (const mesh of meshes) {
            const intersections = [];
            assert.equal(mesh.raycast({}, intersections), undefined);
            assert.deepEqual(intersections, []);
        }
    };

    for (const [index, architectureThemeId] of themeIds.entries()) {
        const themedStyle = resolveBurgThemeBuildingStyle(architectureThemeId, {
            district: 'residential',
            seed: index + 11
        });
        for (const roofGeometry of BURG_THEME_CATALOG[architectureThemeId].roofGeometries) {
            const roof = world.createBuildingRoof({
                ...themedStyle,
                roofGeometry,
                id: `${architectureThemeId}:${roofGeometry}`,
                x: index * 5,
                y: 0,
                width: 3,
                height: 3,
                archetype: 'house',
                style: themedStyle.style,
                roofStyle: themedStyle.roofStyle
            }, 2.5, { roofObstructionZ: 2 });
            assertRenderedRoof(roof, `${architectureThemeId} ${roofGeometry}`, architectureThemeId);
        }

        const keep = world.createBuildingRoof({
            ...themedStyle,
            id: `${architectureThemeId}:vector-castle`,
            x: index * 5,
            y: 5,
            width: 4,
            height: 3,
            archetype: 'manor',
            vectorCastle: true
        }, 2.5, { roofObstructionZ: 2 });
        assertRenderedRoof(keep, `${architectureThemeId} vector castle`, architectureThemeId);

        const facadeBuilding = {
            ...themedStyle,
            id: `${architectureThemeId}:facade`,
            x: index * 5,
            y: 10,
            width: 3,
            height: 3,
            stories: 2,
            district: 'residential',
            archetype: 'house',
            baseElevation: 0,
            door: { x: 1, y: 2, edge: 'south' }
        };
        const facade = world.createBuildingWallDecorations(facadeBuilding, 0.5, { roofObstructionZ: 2 });
        const facadeMeshes = [];
        facade.traverse((child) => {
            if (child.isMesh) facadeMeshes.push(child);
        });
        assert.equal(facade.userData.architectureThemeId, architectureThemeId);
        assert.ok(facadeMeshes.length > 0, `${architectureThemeId} should have themed facade geometry`);
        assert.ok(!new THREE.Box3().setFromObject(facade).isEmpty());
    }
    assert.equal(sceneObjects.length, themeIds.length * 4);
});

test('themed ordinary and FMG vector-castle roofs hide and restore as complete obstruction groups', () => {
    const world = new WorldGenerator({
        addToWorld() {},
        removeFromWorld() {}
    });
    const states = [];
    const themeIds = Object.keys(BURG_THEME_CATALOG);

    for (const [index, architectureThemeId] of themeIds.entries()) {
        const themedStyle = resolveBurgThemeBuildingStyle(architectureThemeId, {
            district: 'castle',
            seed: index + 41
        });
        for (const [kind, vectorCastle] of [['house', false], ['vector-castle', true]]) {
            const x = index * 12 + (vectorCastle ? 6 : 0);
            const building = {
                ...themedStyle,
                id: `${architectureThemeId}:${kind}:obstruction`,
                obstructionTag: `building:${architectureThemeId}:${kind}`,
                x,
                y: 0,
                width: vectorCastle ? 4 : 3,
                height: 3,
                archetype: vectorCastle ? 'manor' : 'house',
                vectorCastle
            };
            const state = {
                ...building,
                interiorKeys: new Set([world.getColumnKey(x + 1, 1)]),
                roofObstructionZ: 3,
                roofVisibleByRange: true,
                roofHiddenByObstruction: false,
                groundFloorZ: 0,
                furniture: null,
                wallDecorations: null
            };
            state.roof = world.createBuildingRoof(building, 3.5, state);
            world.registerBuildingObstructionGroup(state);
            states.push({ state, centerX: x + 1, centerY: 1 });

            assert.equal(state.roof.userData.obstructionTag, state.obstructionTag);
            assert.equal(state.roof.userData.hideAsUnit, true);
            assert.equal(state.roof.userData.planarRoof, true);
            assert.ok(world.getObstructionGroups().some((group) =>
                group.tag === state.obstructionTag && group.roofState === state
            ));
        }
    }

    for (const entry of states) {
        world.obstructionHider.update(entry.centerX, entry.centerY, 0);
        assert.equal(entry.state.roofHiddenByObstruction, true);
        assert.equal(entry.state.roof.visible, false);
        for (const child of entry.state.roof.children) {
            assert.equal(child.visible, true, 'children remain intact while their complete roof group is hidden');
        }
        world.obstructionHider.update(999, 999, 0);
        assert.equal(entry.state.roofHiddenByObstruction, false);
        assert.equal(entry.state.roof.visible, true);
    }

    const exteriorEntry = states[0];
    const exteriorGroup = world.getObstructionGroups().find((group) =>
        group.tag === exteriorEntry.state.obstructionTag
    );
    const exteriorWallTile = { gridX: 2, gridY: 2, elevation: 2, visibleByRange: true };
    exteriorGroup.wallObstructionTiles.add(exteriorWallTile);
    world.voxelColumnMap.set(world.getColumnKey(2, 2), [{
        z: 2,
        element: ELEMENTS.STRUCTURE,
        collision: { active: true }
    }]);
    world.obstructionHider.update(0, 0, 0);
    assert.equal(exteriorEntry.state.roofHiddenByObstruction, true,
        'an exterior wall behind the player should hide its complete roof group');
    assert.equal(exteriorEntry.state.roof.visible, false);
    world.obstructionHider.update(3, 3, 0);
    assert.equal(exteriorEntry.state.roofHiddenByObstruction, false);
    assert.equal(exteriorEntry.state.roof.visible, true);

    const lodState = states[0].state;
    lodState.roofVisibleByRange = false;
    world.syncRoofVisibility(lodState);
    world.obstructionHider.update(states[0].centerX, states[0].centerY, 0);
    world.obstructionHider.update(999, 999, 0);
    assert.equal(lodState.roofHiddenByObstruction, false);
    assert.equal(lodState.roof.visible, false, 'obstruction restore must not override LOD culling');
});

test('theme palette overrides remain culture-scoped in bounded material caches', () => {
    const asianBuilding = {
        architectureThemeId: 'asian',
        themePalette: {
            roofColors: ['#102030', '#203040', '#304050', '#405060'],
            wallColor: '#f0d8ae',
            trimColor: '#7b211c',
            accentColor: '#e5bd45'
        }
    };
    const asianProfile = WorldGenerator.resolveArchitectureThemeProfile(asianBuilding);
    assert.deepEqual(asianProfile.palette.roofColors, [0x102030, 0x203040, 0x304050, 0x405060]);
    assert.equal(asianProfile.palette.wallColor, 0xf0d8ae);

    const asianRoof = WorldGenerator.getRoofMaterial('clay', 1, asianBuilding);
    const asianRoofAgain = WorldGenerator.getRoofMaterial('clay', 1, asianBuilding);
    const egyptianRoof = WorldGenerator.getRoofMaterial('stone', 1, {
        architectureThemeId: 'egyptian'
    });
    assert.equal(asianRoof, asianRoofAgain);
    assert.notEqual(asianRoof, egyptianRoof);
    assert.notEqual(asianRoof.color.getHex(), egyptianRoof.color.getHex());
    assert.match(asianRoof.name, /^building-roof:theme:asian:/);
    assert.match(egyptianRoof.name, /^building-roof:theme:egyptian:/);

    for (let index = 0; index < 120; index++) {
        const color = `#${((index * 104729) & 0xffffff).toString(16).padStart(6, '0')}`;
        WorldGenerator.getArchitectureThemeMaterial({
            architectureThemeId: 'asian',
            themePalette: { accentColor: color }
        }, 'accent');
    }
    assert.ok(WorldGenerator.architectureThemeMaterialCache.size <= 80);
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
