import * as THREE from 'three';
import {
    ELEMENTS,
    getTileDefinition,
    normalizeWorldPaletteId,
    normalizeWorldVisualVariant
} from '../data/TileRegistry.js';
import { BUILDING_PARTS } from '../data/TileLibrary.js';

export const TILE_HEIGHT = 0.96;
export const TILE_TOP_OFFSET = TILE_HEIGHT / 2;

export class Tile {
    static geometry = new THREE.BoxGeometry(0.98, TILE_HEIGHT, 0.98);
    static topOffset = TILE_TOP_OFFSET;
    static materialCache = new Map();

    constructor(threeManager, gridX, gridY, elevation, attributes = {}) {
        this.threeManager = threeManager;
        this.gridX = gridX;
        this.gridY = gridY;
        this.elevation = elevation;
        this.attributes = attributes;
        
        // Elemental system: similar to Genshin Impact
        this.element = attributes.element ?? ELEMENTS.GEO;
        this.textureValue = attributes.textureValue ?? 0; // Variant/Texture offset
        this.effect = attributes.effect ?? 0;
        this.building = attributes.building ?? 0;
        this.paletteId = normalizeWorldPaletteId(
            attributes.paletteId ?? attributes.biomePaletteId ?? attributes.worldPalette ?? null,
            null
        );
        this.visualSeed = Tile.normalizeVisualSeed(
            attributes.visualSeed ?? attributes.variantSeed ?? attributes.seed ?? 0
        );
        this.visualVariant = Tile.normalizeVisualVariant(attributes.visualVariant);
        this.objects = [];

        this.render();
    }

    setElementalType(element, textureValue, effect = 0, building = 0) {
        this.element = element;
        this.textureValue = textureValue;
        this.effect = effect;
        this.building = building;
        if (this.mesh) {
            this.restoreBaseMaterial();
            this.clearObjects();
            this.mesh.material = Tile.isSpecialBuildingShape(building)
                ? Tile.getInvisibleMaterial()
                : Tile.getMaterials(element, textureValue, effect, this.elevation, building, this.getVisualContext());
            this.createObjects();
        }
    }

    render() {
        // In 3D: (x, y, z) -> gridX, elevation, gridY
        const material = Tile.isSpecialBuildingShape(this.building) || this.isLayeredShallowWater()
            ? Tile.getInvisibleMaterial()
            : Tile.getMaterials(
                this.element,
                this.textureValue,
                this.effect,
                this.elevation,
                this.building,
                this.getVisualContext()
            );

        this.mesh = new THREE.Mesh(Tile.geometry, material);
        this.mesh.castShadow = !getTileDefinition(this.element, this.textureValue).walkable;
        this.mesh.receiveShadow = true;

        // Position: use (gridX, elevation, gridY)
        // Note: Three.js y is UP.
        this.mesh.position.set(this.gridX, this.elevation, this.gridY);

        // Store reference to this Tile instance
        this.mesh.userData.tile = this;

        this.threeManager.addToWorld(this.mesh);
        this.createObjects();
    }

    createObjects() {
        if (!this.mesh) return;
        if (Tile.isWindowWall(this.building)) {
            this.addWindowWallObjects();
        } else if (Tile.isDirectionalStair(this.building)) {
            this.addStairObjects();
        } else if (this.isLayeredShallowWater()) {
            this.addShallowWaterObjects();
        }
    }

    // MapleStory-2-style walkable water: the block is split into a sand bed on the bottom half
    // and transparent water on the top half. Both halves carry the tile border, and the water's
    // border stays visible on top of the transparency so the walkable grid still reads.
    isLayeredShallowWater() {
        if (this.element !== ELEMENTS.HYDRO || this.building !== BUILDING_PARTS.NONE) return false;
        const definition = getTileDefinition(this.element, this.textureValue);
        return definition.walkable === true &&
            ['waterShallow', 'waterCoastal', 'marsh'].includes(definition.pattern);
    }

    addShallowWaterObjects() {
        const visualContext = this.getVisualContext();
        const sandMaterials = Tile.getMaterials(
            ELEMENTS.ANEMO,
            0,
            0,
            this.elevation,
            BUILDING_PARTS.NONE,
            Tile.getShallowWaterBedVisualContext(visualContext)
        );
        const sandBed = new THREE.Mesh(new THREE.BoxGeometry(0.98, TILE_HEIGHT / 2, 0.98), sandMaterials);
        sandBed.position.y = -TILE_HEIGHT / 4;
        sandBed.receiveShadow = true;
        sandBed.raycast = () => {};
        this.mesh.add(sandBed);
        this.objects.push(sandBed);

        const waterMaterials = Tile.getMaterials(
            this.element,
            this.textureValue,
            this.effect,
            this.elevation,
            this.building,
            visualContext
        );
        const waterTop = new THREE.Mesh(new THREE.BoxGeometry(0.98, TILE_HEIGHT / 2, 0.98), waterMaterials);
        waterTop.position.y = TILE_HEIGHT / 4;
        waterTop.receiveShadow = true;
        waterTop.raycast = () => {};
        this.mesh.add(waterTop);
        this.objects.push(waterTop);
    }

    static getShallowWaterBedVisualContext(visualContext = {}) {
        return {
            ...visualContext,
            // A ford may sit inside any world palette, including coast, crystal, or tundra.
            // Its physical bed remains neutral sand instead of inheriting and recoloring the
            // surrounding water palette.
            paletteId: null
        };
    }

    getVisualContext() {
        return {
            x: this.gridX,
            y: this.gridY,
            elevation: this.elevation,
            seed: this.visualSeed,
            paletteId: this.paletteId,
            visualVariant: this.visualVariant
        };
    }

    addWindowWallObjects() {
        const direction = Tile.getBuildingPartDirection(this.building);
        const visualContext = this.getVisualContext();
        const glassMaterial = Tile.getWindowGlassMaterial(visualContext);
        const wallMaterial = Tile.getMaterials(
            this.element,
            this.textureValue,
            this.effect,
            this.elevation,
            this.building,
            visualContext
        );
        const isUpper = Tile.isUpperWindowWall(this.building);
        const wall = new THREE.Mesh(
            new THREE.BoxGeometry(0.98, 0.48, 0.98),
            wallMaterial
        );
        wall.position.y = isUpper ? 0.24 : -0.24;
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.raycast = () => {};
        this.mesh.add(wall);
        this.objects.push(wall);

        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(
                direction === 'north' || direction === 'south' ? 0.82 : 0.045,
                0.44,
                direction === 'north' || direction === 'south' ? 0.045 : 0.82
            ),
            glassMaterial
        );
        const normal = Tile.getDirectionVector(direction);
        glass.position.set(normal.x * 0.47, isUpper ? -0.25 : 0.25, normal.y * 0.47);
        glass.raycast = () => {};
        this.mesh.add(glass);
        this.objects.push(glass);
    }

    addStairObjects() {
        // Minecraft-style half-stair that fills the unit voxel so it matches neighbor block
        // proportions (0.98 footprint, like window walls): a full-footprint bottom slab plus a
        // quarter block on the ascent-side half, each exactly half the voxel tall. The tile ramps
        // one full voxel from its entry edge to its top surface, so consecutive stair tiles chain
        // 1:1 with the 2x2 stair-module contract (lower tier -> upper tier) and with the +1-step
        // city-wall runs. No floating foundation, no rails — the column below is already solid.
        const direction = Tile.getBuildingPartDirection(this.building);
        const normal = Tile.getStairAscentVector(this.building) || Tile.getDirectionVector(direction);
        const alongX = Math.abs(normal.x) > 0;
        const material = Tile.getMaterials(
            this.element,
            this.textureValue,
            this.effect,
            this.elevation,
            this.building,
            this.getVisualContext()
        );

        const lowerStep = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.5, 0.98), material);
        lowerStep.position.y = -0.25;
        lowerStep.castShadow = true;
        lowerStep.receiveShadow = true;
        lowerStep.raycast = () => {};
        this.mesh.add(lowerStep);
        this.objects.push(lowerStep);

        const upperStep = new THREE.Mesh(
            new THREE.BoxGeometry(alongX ? 0.49 : 0.98, 0.5, alongX ? 0.98 : 0.49),
            material
        );
        upperStep.position.set(normal.x * 0.245, 0.25, normal.y * 0.245);
        upperStep.castShadow = true;
        upperStep.receiveShadow = true;
        upperStep.raycast = () => {};
        this.mesh.add(upperStep);
        this.objects.push(upperStep);
    }

    clearObjects() {
        if (!this.objects?.length) return;
        for (const object of this.objects) {
            object.parent?.remove(object);
            object.geometry?.dispose();
        }
        this.objects = [];
    }

    static isWindowWall(buildingPart) {
        return [
            BUILDING_PARTS.WINDOW_LOWER_NORTH,
            BUILDING_PARTS.WINDOW_LOWER_SOUTH,
            BUILDING_PARTS.WINDOW_LOWER_WEST,
            BUILDING_PARTS.WINDOW_LOWER_EAST,
            BUILDING_PARTS.WINDOW_UPPER_NORTH,
            BUILDING_PARTS.WINDOW_UPPER_SOUTH,
            BUILDING_PARTS.WINDOW_UPPER_WEST,
            BUILDING_PARTS.WINDOW_UPPER_EAST
        ].includes(buildingPart);
    }

    static isUpperWindowWall(buildingPart) {
        return [
            BUILDING_PARTS.WINDOW_UPPER_NORTH,
            BUILDING_PARTS.WINDOW_UPPER_SOUTH,
            BUILDING_PARTS.WINDOW_UPPER_WEST,
            BUILDING_PARTS.WINDOW_UPPER_EAST
        ].includes(buildingPart);
    }

    static isSpecialBuildingShape(buildingPart) {
        return Tile.isWindowWall(buildingPart) || Tile.isDirectionalStair(buildingPart);
    }

    static isDirectionalStair(buildingPart) {
        return [
            BUILDING_PARTS.STAIRS_NORTH,
            BUILDING_PARTS.STAIRS_SOUTH,
            BUILDING_PARTS.STAIRS_WEST,
            BUILDING_PARTS.STAIRS_EAST,
            BUILDING_PARTS.CITY_WALL_STAIRS_NORTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH,
            BUILDING_PARTS.CITY_WALL_STAIRS_WEST,
            BUILDING_PARTS.CITY_WALL_STAIRS_EAST
        ].includes(buildingPart);
    }

    static getBuildingPartDirection(buildingPart) {
        return {
            [BUILDING_PARTS.WINDOW_LOWER_NORTH]: 'north',
            [BUILDING_PARTS.WINDOW_LOWER_SOUTH]: 'south',
            [BUILDING_PARTS.WINDOW_LOWER_WEST]: 'west',
            [BUILDING_PARTS.WINDOW_LOWER_EAST]: 'east',
            [BUILDING_PARTS.WINDOW_UPPER_NORTH]: 'north',
            [BUILDING_PARTS.WINDOW_UPPER_SOUTH]: 'south',
            [BUILDING_PARTS.WINDOW_UPPER_WEST]: 'west',
            [BUILDING_PARTS.WINDOW_UPPER_EAST]: 'east',
            [BUILDING_PARTS.STAIRS_NORTH]: 'north',
            [BUILDING_PARTS.STAIRS_SOUTH]: 'south',
            [BUILDING_PARTS.STAIRS_WEST]: 'west',
            [BUILDING_PARTS.STAIRS_EAST]: 'east',
            [BUILDING_PARTS.CITY_WALL_STAIRS_NORTH]: 'north',
            [BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH]: 'south',
            [BUILDING_PARTS.CITY_WALL_STAIRS_WEST]: 'west',
            [BUILDING_PARTS.CITY_WALL_STAIRS_EAST]: 'east'
        }[buildingPart] || 'north';
    }

    static getDirectionVector(direction) {
        return {
            north: { x: 0, y: -1 },
            south: { x: 0, y: 1 },
            west: { x: -1, y: 0 },
            east: { x: 1, y: 0 }
        }[direction] || { x: 0, y: -1 };
    }

    static getStairAscentVector(buildingPart) {
        return {
            [BUILDING_PARTS.STAIRS_EAST]: { x: 0, y: 1 },
            [BUILDING_PARTS.STAIRS_SOUTH]: { x: -1, y: 0 },
            [BUILDING_PARTS.STAIRS_WEST]: { x: 0, y: -1 },
            [BUILDING_PARTS.STAIRS_NORTH]: { x: 1, y: 0 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_NORTH]: { x: 0, y: -1 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_SOUTH]: { x: 0, y: 1 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_WEST]: { x: -1, y: 0 },
            [BUILDING_PARTS.CITY_WALL_STAIRS_EAST]: { x: 1, y: 0 }
        }[buildingPart] || null;
    }

    static getWindowGlassMaterial(visualContext = {}) {
        if (!Tile.windowGlassMaterials) Tile.windowGlassMaterials = new Map();
        const palettes = [
            { color: 0x92eaff, emissive: 0x1c617c },
            { color: 0xffd474, emissive: 0x87511d },
            { color: 0xb8a1ff, emissive: 0x47307f },
            { color: 0x8ff0d1, emissive: 0x206f5a },
            { color: 0xffa9c8, emissive: 0x7e3151 }
        ];
        const hash = Tile.hashVisualCoordinate(
            visualContext.x,
            visualContext.y,
            visualContext.elevation,
            visualContext.seed,
            0x51f15e
        );
        const index = hash % palettes.length;
        if (!Tile.windowGlassMaterials.has(index)) {
            const palette = palettes[index];
            Tile.windowGlassMaterials.set(index, new THREE.MeshStandardMaterial({
                color: palette.color,
                emissive: palette.emissive,
                emissiveIntensity: 0.3,
                roughness: 0.15,
                metalness: 0.03,
                transparent: true,
                opacity: 0.68,
                depthWrite: false
            }));
        }
        return Tile.windowGlassMaterials.get(index);
    }

    static getStairwellMaterial() {
        if (!Tile.stairwellMaterial) {
            Tile.stairwellMaterial = new THREE.MeshStandardMaterial({
                color: 0x1f211c,
                roughness: 0.96,
                metalness: 0.02
            });
        }
        return Tile.stairwellMaterial;
    }

    static getStairRailMaterial() {
        if (!Tile.stairRailMaterial) {
            Tile.stairRailMaterial = new THREE.MeshStandardMaterial({
                color: 0x65422b,
                roughness: 0.82,
                metalness: 0.03
            });
        }
        return Tile.stairRailMaterial;
    }

    static getInvisibleMaterial() {
        if (!Tile.invisibleMaterial) {
            Tile.invisibleMaterial = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthWrite: false,
                colorWrite: false
            });
        }
        return Tile.invisibleMaterial;
    }

    highlight(color = 0x555555) {
        if (this.mesh && this.mesh.material) {
            if (!this.highlightMaterial) {
                this.highlightMaterial = Array.isArray(this.mesh.material)
                    ? this.mesh.material.map((material) => material.clone())
                    : this.mesh.material.clone();
                this.mesh.material = this.highlightMaterial;
            }
            const materials = Array.isArray(this.mesh.material) ? this.mesh.material : [this.mesh.material];
            materials.forEach((material) => material.emissive?.setHex(color));
        }
    }

    clearHighlight() {
        this.restoreBaseMaterial();
    }

    restoreBaseMaterial() {
        if (!this.mesh || !this.highlightMaterial) return;
        const materials = Array.isArray(this.highlightMaterial) ? this.highlightMaterial : [this.highlightMaterial];
        materials.forEach((material) => material.dispose());
        this.highlightMaterial = null;
        this.mesh.material = Tile.isSpecialBuildingShape(this.building)
            ? Tile.getInvisibleMaterial()
            : Tile.getMaterials(
                this.element,
                this.textureValue,
                this.effect,
                this.elevation,
                this.building,
                this.getVisualContext()
            );
    }

    static getMaterials(
        element,
        textureValue = 0,
        effect = 0,
        elevation = 0,
        building = BUILDING_PARTS.NONE,
        visualContext = null
    ) {
        const isOrdinaryTerrain = building === BUILDING_PARTS.NONE && ![
            ELEMENTS.VOID,
            ELEMENTS.STRUCTURE
        ].includes(element);
        const definition = getTileDefinition(
            element,
            textureValue,
            isOrdinaryTerrain ? visualContext?.paletteId : null
        );
        const visual = Tile.resolveVisualProfile(definition, {
            ...(visualContext || {}),
            elevation: visualContext?.elevation ?? elevation
        }, element, textureValue, building);
        const elevationTone = Math.min(
            0.075,
            Tile.getOutdoorElevationTone(element, elevation, building) +
                (building === BUILDING_PARTS.NONE && [ELEMENTS.GEO, ELEMENTS.ANEMO, ELEMENTS.CRYO].includes(element)
                    ? visual.topographicZone * 0.006
                    : 0)
        );
        const key = [
            element,
            textureValue,
            effect,
            visual.paletteId,
            visual.visualVariant,
            visual.paletteIndex,
            visual.motif,
            elevationTone
        ].join(':');
        if (!Tile.materialCache.has(key)) {
            const topTexture = Tile.createTexture(visual, effect, elevationTone);
            const sideTexture = Tile.createSideTexture(visual, elevationTone);
            const isWater = element === ELEMENTS.HYDRO;
            // Water is genuinely transparent (MapleStory-2 read): the sand bed under walkable
            // shallow water and neighboring cliff sides show through, while the bordered top
            // texture keeps the tile grid visible on the surface.
            const topMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: topTexture,
                roughness: isWater ? Math.min(0.3, definition.roughness) : definition.roughness,
                metalness: 0.02,
                transparent: isWater,
                opacity: isWater ? 0.62 : 1,
                emissive: isWater ? new THREE.Color(visual.sideColor) : new THREE.Color(0x000000),
                emissiveIntensity: isWater ? 0.1 : 0
            });
            const sideMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: sideTexture,
                roughness: Math.min(1, definition.roughness + 0.08),
                metalness: 0.02,
                transparent: isWater,
                opacity: isWater ? 0.68 : 1,
                emissive: isWater ? new THREE.Color(visual.sideColor) : new THREE.Color(0x000000),
                emissiveIntensity: isWater ? 0.06 : 0
            });
            Tile.materialCache.set(key, [
                sideMaterial,
                sideMaterial,
                topMaterial,
                sideMaterial,
                sideMaterial,
                sideMaterial
            ]);
        }
        return Tile.materialCache.get(key);
    }

    static normalizeVisualSeed(value) {
        if (Number.isFinite(value)) return Math.trunc(value) >>> 0;
        const text = String(value ?? '0');
        let hash = 2166136261;
        for (let i = 0; i < text.length; i++) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    static normalizeVisualVariant(value) {
        return normalizeWorldVisualVariant(value, null);
    }

    static hashVisualCoordinate(x = 0, y = 0, elevation = 0, seed = 0, salt = 0) {
        let hash = Tile.normalizeVisualSeed(seed) ^ (Math.trunc(salt) >>> 0);
        hash ^= Math.imul(Math.trunc(x), 0x9e3779b1);
        hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b);
        hash ^= Math.imul(Math.trunc(y), 0xc2b2ae35);
        hash = Math.imul(hash ^ (hash >>> 13), 0x27d4eb2f);
        hash ^= Math.imul(Math.trunc(elevation), 0x165667b1);
        hash ^= hash >>> 15;
        return hash >>> 0;
    }

    static resolveVisualProfile(definition, context, element, textureValue, building) {
        const variants = definition.visualVariants?.length
            ? definition.visualVariants
            : [{
                topColor: definition.topColor,
                sideColor: definition.sideColor,
                accentColor: definition.topColor,
                highlightColor: definition.topColor
            }];
        const x = Number.isFinite(context?.x) ? context.x : 0;
        const y = Number.isFinite(context?.y) ? context.y : 0;
        const elevation = Number.isFinite(context?.elevation) ? context.elevation : 0;
        const seed = Tile.normalizeVisualSeed(context?.seed ?? 0);
        const isOrdinaryTerrain = building === BUILDING_PARTS.NONE && ![
            ELEMENTS.VOID,
            ELEMENTS.STRUCTURE
        ].includes(element);
        const requestedVariant = Tile.normalizeVisualVariant(context?.visualVariant);
        const fallbackVariant = Tile.hashVisualCoordinate(
            x,
            y,
            elevation,
            seed,
            element * 257 + textureValue * 37 + building * 17 + 0x4d3
        ) % 6;
        const visualVariant = requestedVariant ?? fallbackVariant;
        const paletteIndex = visualVariant % variants.length;
        // Pattern placement is seeded only by the finite 0..5 variant. This
        // keeps generated materials bounded and replayable across sessions.
        const motif = visualVariant;
        const paletteId = definition.paletteId || definition.visualPalette || 'default';
        return {
            ...definition,
            ...variants[paletteIndex],
            paletteId,
            visualVariant,
            paletteIndex,
            motif,
            matrixVariant: visualVariant,
            microVariant: visualVariant,
            topographicZone: 0,
            isOrdinaryTerrain,
            visualSeed: seed
        };
    }

    static getOutdoorElevationTone(element, elevation, building) {
        if (building !== BUILDING_PARTS.NONE) return 0;
        if (![ELEMENTS.GEO, ELEMENTS.ANEMO, ELEMENTS.CRYO].includes(element)) return 0;
        if (elevation <= 0) return 0;
        return Math.min(0.05, 0.01 + elevation * 0.01);
    }

    static createTexture(definition, effect = 0, elevationTone = 0) {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');
        const top = Tile.hexColor(definition.topColor);
        const side = Tile.hexColor(definition.sideColor);
        const accent = Tile.hexColor(definition.accentColor ?? definition.topColor);
        const highlight = Tile.hexColor(definition.highlightColor ?? definition.topColor);
        const motif = definition.motif || 0;

        ctx.fillStyle = top;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const isLiquidPattern = ['water', 'waterShallow', 'waterCoastal', 'marsh'].includes(definition.pattern);
        if (!isLiquidPattern) Tile.drawSoftTop(ctx, definition);

        if (definition.pattern === 'grass') {
            Tile.drawGrass(ctx, top, side, accent, highlight, motif);
        } else if (definition.pattern === 'forest') {
            Tile.drawForest(ctx, accent, highlight, motif);
        } else if (definition.pattern === 'hill') {
            Tile.drawHill(ctx, accent, highlight, motif);
        } else if (definition.pattern === 'stone') {
            Tile.drawStone(ctx, accent, highlight, motif);
        } else if (definition.pattern === 'road') {
            Tile.drawRoad(ctx, side, accent, highlight, motif);
        } else if (definition.pattern === 'villageGround') {
            Tile.drawVillageGround(ctx, side, accent, highlight, motif);
        } else if (definition.pattern === 'cityCobble') {
            Tile.drawCityCobble(ctx, side, accent, highlight, motif);
        } else if (definition.pattern === 'plazaStone') {
            Tile.drawPlazaStone(ctx, side, accent, highlight, motif);
        } else if (definition.pattern === 'gardenGround') {
            Tile.drawGardenGround(ctx, accent, highlight, motif);
        } else if (definition.pattern === 'floor') {
            Tile.drawFloor(ctx);
        } else if (definition.pattern === 'woodFloor') {
            Tile.drawWoodFloor(ctx);
        } else if (definition.pattern === 'stoneFloor') {
            Tile.drawStoneFloor(ctx);
        } else if (definition.pattern === 'water') {
            Tile.drawWaterSurface(ctx, accent, highlight, 0.42, motif);
        } else if (definition.pattern === 'waterShallow') {
            Tile.drawWaterSurface(ctx, accent, highlight, 0.32, motif);
        } else if (definition.pattern === 'waterCoastal') {
            Tile.drawWaterSurface(ctx, accent, highlight, 0.38, motif);
        } else if (definition.pattern === 'marsh') {
            Tile.drawWaterSurface(ctx, accent, highlight, 0.26, motif);
            Tile.drawSpeckles(ctx, side, 22, 0.38, motif);
        } else if (definition.pattern === 'sand') {
            Tile.drawSpeckles(ctx, accent, 42, 0.42, motif);
        } else if (definition.pattern === 'ice') {
            Tile.drawIce(ctx, '#ffffff', motif);
        } else if (definition.pattern === 'lava') {
            Tile.drawLava(ctx, motif);
        } else if (definition.pattern === 'brick') {
            Tile.drawBrick(ctx);
        } else if (definition.pattern === 'masonry') {
            Tile.drawMasonry(ctx);
        } else if (definition.pattern === 'timber') {
            Tile.drawTimber(ctx);
        } else if (definition.pattern === 'cityWallTop') {
            Tile.drawCityWallTop(ctx);
        } else if (definition.pattern === 'wallStairs') {
            Tile.drawCityWallTop(ctx);
            Tile.drawStairs(ctx);
        } else if (definition.pattern === 'doorOak') {
            Tile.drawDoor(ctx, 'oak');
        } else if (definition.pattern === 'doorIron') {
            Tile.drawDoor(ctx, 'iron');
        } else if (definition.pattern === 'doorPainted') {
            Tile.drawDoor(ctx, 'painted');
        } else if (definition.pattern === 'stairs') {
            Tile.drawStairs(ctx);
        } else if (definition.pattern === 'blocked') {
            Tile.drawBlocked(ctx);
        } else {
            Tile.drawSpeckles(ctx, accent, 28, 0.25, motif);
        }

        Tile.drawMatrixVariation(ctx, definition, isLiquidPattern);
        if (effect > 0 && !isLiquidPattern && !definition.isOrdinaryTerrain) {
            Tile.drawElementEffect(ctx, effect);
        }
        Tile.applyElevationTone(ctx, elevationTone);
        // MapleStory-2-style framing: EVERY tile top carries a crisp border — ordinary terrain,
        // built tiles, and water alike — so the walkable grid reads everywhere. Water keeps a
        // brighter border that stays visible on top of the transparent surface.
        Tile.drawTileBorder(ctx, definition, isLiquidPattern);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.needsUpdate = true;
        return texture;
    }

    static createSideTexture(definition, elevationTone = 0) {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');
        const top = Tile.hexColor(definition.topColor);
        const side = Tile.hexColor(definition.sideColor);
        const accent = Tile.hexColor(definition.accentColor ?? definition.topColor);
        const highlight = Tile.hexColor(definition.highlightColor ?? definition.topColor);
        const motif = definition.motif || 0;
        const liquidPatterns = ['water', 'waterShallow', 'waterCoastal', 'marsh'];
        const isLiquid = liquidPatterns.includes(definition.pattern);

        const gradient = ctx.createLinearGradient(0, 0, 0, 96);
        gradient.addColorStop(0, isLiquid ? highlight : top);
        gradient.addColorStop(isLiquid ? 0.22 : 0.12, isLiquid ? top : accent);
        gradient.addColorStop(isLiquid ? 0.62 : 0.24, side);
        gradient.addColorStop(1, Tile.shadeColor(side, isLiquid ? -22 : -36));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 96, 96);

        const terrainPatterns = [
            'grass', 'forest', 'hill', 'stone', 'road', 'villageGround',
            'cityCobble', 'plazaStone', 'gardenGround', 'sand', 'ice'
        ];
        if (isLiquid) {
            Tile.drawWaterSide(ctx, accent, highlight, motif);
        } else if (terrainPatterns.includes(definition.pattern)) {
            Tile.drawCliffSide(ctx, definition, top, side, accent, highlight, motif);
        } else {
            Tile.drawBuiltSide(ctx, definition, side, accent, highlight, motif);
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, 96, isLiquid ? 5 : 7);
        ctx.fillStyle = 'rgba(4, 9, 12, 0.2)';
        ctx.fillRect(0, 88, 96, 8);
        // MapleStory-2 framing on block sides too: vertical edge strokes so stacked voxels read
        // as individual bordered tiles instead of one continuous cliff face.
        ctx.fillStyle = isLiquid ? 'rgba(236, 253, 255, 0.3)' : 'rgba(22, 16, 12, 0.3)';
        ctx.fillRect(0, 0, 3, 96);
        ctx.fillRect(93, 0, 3, 96);

        Tile.applyElevationTone(ctx, elevationTone * 0.9);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.needsUpdate = true;
        return texture;
    }

    static drawWaterSide(ctx, accent, highlight, motif = 0) {
        ctx.save();
        ctx.strokeStyle = highlight;
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = 3;
        for (let y = 15 + motif * 2; y < 86; y += 21) {
            ctx.beginPath();
            for (let x = -8; x <= 104; x += 12) {
                const waveY = y + Math.sin((x + motif * 11) * 0.17) * 3;
                if (x === -8) ctx.moveTo(x, waveY);
                else ctx.lineTo(x, waveY);
            }
            ctx.stroke();
        }
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 5;
        for (let x = 13 + motif * 7; x < 96; x += 31) {
            ctx.beginPath();
            ctx.moveTo(x, 10);
            ctx.lineTo(x - 7, 88);
            ctx.stroke();
        }
        ctx.restore();
    }

    static drawCliffSide(ctx, definition, top, side, accent, highlight, motif = 0) {
        const greenLipPatterns = ['grass', 'forest', 'hill', 'villageGround', 'gardenGround'];
        ctx.save();
        ctx.fillStyle = greenLipPatterns.includes(definition.pattern) ? top : accent;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(0, 0, 96, greenLipPatterns.includes(definition.pattern) ? 11 : 7);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.35;
        ctx.fillRect(0, 2, 96, 3);

        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = Tile.shadeColor(side, -26);
        ctx.lineWidth = 3;
        for (let layer = 0; layer < 4; layer++) {
            const baseY = 23 + layer * 18 + ((motif + layer) % 3 - 1) * 2;
            ctx.beginPath();
            ctx.moveTo(0, baseY);
            for (let x = 12; x <= 96; x += 12) {
                const y = baseY + (((x / 12 + layer * 3 + motif) % 5) - 2) * 1.5;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        ctx.globalAlpha = 0.22;
        ctx.fillStyle = accent;
        for (let i = 0; i < 11; i++) {
            const x = (i * 29 + motif * 17) % 91;
            const y = 17 + ((i * 41 + motif * 13) % 67);
            const width = 5 + ((i + motif) % 3) * 3;
            const height = 4 + ((i * 2 + motif) % 3) * 2;
            ctx.fillRect(x, y, width, height);
        }

        ctx.strokeStyle = 'rgba(33, 25, 22, 0.26)';
        ctx.globalAlpha = 1;
        ctx.lineWidth = 2.5;
        for (let i = 0; i < 4; i++) {
            const x = 14 + ((i * 23 + motif * 9) % 69);
            const y = 21 + ((i * 17 + motif * 11) % 47);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + ((i % 2) ? -5 : 5), y + 9);
            ctx.lineTo(x + ((i % 2) ? 2 : -2), y + 16);
            ctx.stroke();
        }
        ctx.restore();
    }

    static drawBuiltSide(ctx, definition, side, accent, highlight, motif = 0) {
        ctx.save();
        const pattern = definition.pattern;
        if (['masonry', 'blocked', 'brick', 'cityWallTop', 'wallStairs', 'stoneFloor'].includes(pattern)) {
            ctx.strokeStyle = Tile.shadeColor(side, -28);
            ctx.globalAlpha = 0.4;
            ctx.lineWidth = 3;
            for (let y = 17; y < 94; y += 17) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(96, y);
                ctx.stroke();
                const offset = ((Math.floor(y / 17) + motif) % 2) * 17;
                for (let x = 8 + offset; x < 96; x += 34) {
                    ctx.beginPath();
                    ctx.moveTo(x, y - 17);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            }
        } else if (['timber', 'woodFloor', 'floor', 'stairs'].includes(pattern)) {
            ctx.strokeStyle = Tile.shadeColor(side, -38);
            ctx.globalAlpha = 0.52;
            ctx.lineWidth = 6;
            for (let x = 12 + motif * 3; x < 96; x += 25) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x - 5, 96);
                ctx.stroke();
            }
            if (pattern === 'timber') {
                ctx.beginPath();
                ctx.moveTo(0, 14 + motif * 4);
                ctx.lineTo(96, 80 - motif * 3);
                ctx.moveTo(96, 14 + motif * 4);
                ctx.lineTo(0, 80 - motif * 3);
                ctx.stroke();
            }
        } else if (pattern.startsWith('door')) {
            ctx.fillStyle = Tile.shadeColor(side, -30);
            ctx.globalAlpha = 0.48;
            Tile.roundRect(ctx, 20, 13, 56, 82, 8);
            ctx.fill();
            ctx.strokeStyle = highlight;
            ctx.globalAlpha = 0.45;
            ctx.lineWidth = 4;
            Tile.roundRect(ctx, 23, 16, 50, 76, 7);
            ctx.stroke();
        } else {
            ctx.strokeStyle = Tile.shadeColor(side, -25);
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 3;
            for (let y = 20; y < 90; y += 22) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(96, y);
                ctx.stroke();
            }
        }

        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.28;
        ctx.fillRect(0, 7, 96, 5);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < 6; i++) {
            const x = (i * 31 + motif * 13) % 90;
            const y = 18 + ((i * 23 + motif * 7) % 65);
            ctx.fillRect(x, y, 6 + (i % 2) * 3, 4);
        }
        ctx.restore();
    }

    static drawMatrixVariation(ctx, definition, isLiquid = false) {
        const motif = definition.motif || 0;
        const accent = Tile.hexColor(definition.accentColor ?? definition.topColor);
        const highlight = Tile.hexColor(definition.highlightColor ?? definition.topColor);
        ctx.save();
        ctx.globalAlpha = isLiquid ? 0.11 : 0.09;
        ctx.fillStyle = isLiquid ? highlight : accent;
        const count = isLiquid ? 5 : 7;
        for (let i = 0; i < count; i++) {
            const x = (i * 37 + motif * 19) % 88;
            const y = (i * 23 + motif * 31) % 88;
            const size = isLiquid ? 8 + (i % 2) * 5 : 5 + (i % 3) * 3;
            ctx.fillRect(x, y, size, isLiquid ? 3 : size);
        }
        if (!isLiquid && definition.topographicZone > 1) {
            ctx.strokeStyle = highlight;
            ctx.globalAlpha = 0.1 + Math.min(0.12, definition.topographicZone * 0.02);
            ctx.lineWidth = 3;
            ctx.beginPath();
            const y = 78 - definition.topographicZone * 6;
            ctx.moveTo(4, y);
            ctx.bezierCurveTo(28, y - 8, 58, y + 7, 92, y - 2);
            ctx.stroke();
        }
        ctx.restore();
    }

    static applyElevationTone(ctx, amount) {
        if (Math.abs(amount) < 0.001) return;
        ctx.save();
        ctx.globalCompositeOperation = amount > 0 ? 'screen' : 'multiply';
        ctx.globalAlpha = Math.min(0.42, Math.abs(amount));
        ctx.fillStyle = amount > 0 ? '#ffffff' : '#46513d';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }

    static hexColor(value) {
        if (typeof value === 'string') return value;
        return `#${((Number(value) || 0) & 0xffffff).toString(16).padStart(6, '0')}`;
    }

    static shadeColor(color, amount) {
        const value = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (value >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((value >> 8) & 0xff) + amount));
        const b = Math.max(0, Math.min(255, (value & 0xff) + amount));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    static drawSoftTop(ctx, definition) {
        const isNaturalTurf = Tile.isNaturalTurfPattern(definition.pattern);
        const gradient = ctx.createRadialGradient(34, 26, 8, 48, 48, 72);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(0.52, 'rgba(255, 255, 255, 0.035)');
        gradient.addColorStop(
            1,
            isNaturalTurf
                ? 'rgba(25, 58, 30, 0.045)'
                : definition.walkable
                    ? 'rgba(36, 58, 38, 0.13)'
                    : 'rgba(18, 24, 24, 0.3)'
        );
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 96, 96);
    }

    static drawRoundedFrame(ctx, walkable) {
        ctx.save();
        ctx.lineWidth = walkable ? 1.5 : 2.5;
        ctx.strokeStyle = walkable ? 'rgba(255, 255, 255, 0.14)' : 'rgba(30, 24, 22, 0.28)';
        ctx.strokeRect(1, 1, 94, 94);
        ctx.restore();
    }

    static drawTileBorder(ctx, definition, isLiquid) {
        ctx.save();
        if (isLiquid) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(236, 253, 255, 0.55)';
            ctx.strokeRect(1.5, 1.5, 93, 93);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(8, 62, 88, 0.45)';
            ctx.strokeRect(4.5, 4.5, 87, 87);
        } else if (Tile.isNaturalTurfPattern(definition.pattern)) {
            // Natural turf should read as one rolling surface rather than a dark checkerboard.
            // Its low-contrast frame still preserves voxel scale without competing with paths,
            // water, masonry, structures, or exposed cliff faces.
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(34, 70, 31, 0.14)';
            ctx.strokeRect(1.5, 1.5, 93, 93);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
            ctx.strokeRect(4.5, 4.5, 87, 87);
        } else {
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(22, 16, 12, 0.36)';
            ctx.strokeRect(1.5, 1.5, 93, 93);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = definition.walkable ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)';
            ctx.strokeRect(4.5, 4.5, 87, 87);
        }
        ctx.restore();
    }

    static isNaturalTurfPattern(pattern) {
        return ['grass', 'forest', 'hill', 'gardenGround'].includes(pattern);
    }

    static drawElementEffect(ctx, effect) {
        const colors = {
            [ELEMENTS.GEO]: '#7ed957',
            [ELEMENTS.HYDRO]: '#4fc3f7',
            [ELEMENTS.ANEMO]: '#ffd978',
            [ELEMENTS.CRYO]: '#b8f0ff',
            [ELEMENTS.PYRO]: '#ff8a3d',
            [ELEMENTS.STRUCTURE]: '#ffb5cf'
        };
        const color = colors[effect];
        if (!color) return;

        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = color;
        Tile.roundRect(ctx, 14, 14, 68, 68, 18);
        ctx.fill();

        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.setLineDash([14, 10]);
        ctx.beginPath();
        ctx.arc(48, 48, 25, 0, Math.PI * 2);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.globalAlpha = 0.38;
        ctx.lineWidth = 3;
        for (let i = 0; i < 4; i++) {
            const angle = i * Math.PI * 0.5 + Math.PI * 0.25;
            const x = 48 + Math.cos(angle) * 27;
            const y = 48 + Math.sin(angle) * 27;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }

    static roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
    }

    static drawGrass(ctx, top, side, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 32, 0.4, motif);
        ctx.strokeStyle = side;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 18; i++) {
            const x = (i * 31 + motif * 17) % 92 + 2;
            const y = (i * 47 + motif * 23) % 88 + 5;
            ctx.beginPath();
            ctx.moveTo(x, y + 5);
            ctx.lineTo(x + 3, y);
            ctx.stroke();
        }
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.28;
        for (let i = 0; i < 5; i++) {
            const x = (i * 43 + motif * 11) % 86 + 5;
            const y = (i * 29 + motif * 19) % 84 + 6;
            ctx.fillRect(x, y, 5 + (i % 2) * 3, 3);
        }
        ctx.fillStyle = top;
        ctx.globalAlpha = 0.13;
        ctx.fillRect(0, 0, 96, 96);
        ctx.globalAlpha = 1;
    }

    static drawForest(ctx, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 30, 0.28, motif);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < 13; i++) {
            const x = (i * 29 + motif * 17) % 82 + 8;
            const y = (i * 43 + motif * 11) % 82 + 8;
            ctx.beginPath();
            ctx.arc(x, y, 4 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    static drawHill(ctx, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 24, 0.3, motif);
        ctx.strokeStyle = highlight;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 4;
        for (let y = 18 + motif * 2; y < 86; y += 22) {
            ctx.beginPath();
            ctx.moveTo(13, y);
            ctx.bezierCurveTo(30, y - 8, 52, y + 9, 83, y - 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    static drawStone(ctx, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 30, 0.25, motif);
        ctx.strokeStyle = highlight;
        ctx.globalAlpha = 0.32;
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            const x = (i * 19 + motif * 13) % 74 + 10;
            const y = (i * 31 + motif * 17) % 74 + 10;
            ctx.beginPath();
            ctx.moveTo(x - 8, y);
            ctx.lineTo(x, y - 6);
            ctx.lineTo(x + 10, y - 2);
            ctx.lineTo(x + 6, y + 8);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    static drawRoad(ctx, side, accent, highlight, motif = 0) {
        ctx.save();
        ctx.strokeStyle = side;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 5;
        ctx.setLineDash([10, 9]);
        ctx.beginPath();
        ctx.moveTo(4, 48 + motif * 2);
        ctx.bezierCurveTo(24, 35 + motif * 2, 50, 58 - motif, 92, 42 + motif);
        ctx.stroke();
        ctx.restore();
        Tile.drawSpeckles(ctx, accent, 34, 0.32, motif);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.22;
        ctx.fillRect(8 + motif * 9, 18 + motif * 4, 17, 5);
        ctx.globalAlpha = 1;
    }

    static drawVillageGround(ctx, side, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 42, 0.28, motif);
        ctx.strokeStyle = side;
        ctx.globalAlpha = 0.24;
        ctx.lineWidth = 3;
        for (let y = 18 + motif * 2; y < 92; y += 22) {
            ctx.beginPath();
            ctx.moveTo(6, y);
            ctx.bezierCurveTo(28, y + 4, 52, y - 6, 90, y + 2);
            ctx.stroke();
        }
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.17;
        ctx.fillRect(13 + motif * 11, 67 - motif * 4, 20, 5);
        ctx.globalAlpha = 1;
    }

    static drawCityCobble(ctx, side, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 20, 0.14, motif);
        ctx.strokeStyle = side;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 2.5;
        for (let y = 12 + motif; y < 96; y += 14) {
            const offset = ((Math.floor(y / 14) + motif) % 2) * 12;
            for (let x = -10 + offset; x < 96; x += 24) {
                ctx.beginPath();
                ctx.ellipse(x + 12, y, 12, 7, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.12;
        ctx.fillRect((motif * 23) % 70 + 5, 9, 20, 6);
        ctx.globalAlpha = 1;
    }

    static drawPlazaStone(ctx, side, accent, highlight, motif = 0) {
        ctx.strokeStyle = side;
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = 3;
        const offset = motif % 2 === 0 ? 0 : 12;
        for (let y = -24 + offset; y <= 96; y += 24) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(96, y);
            ctx.stroke();
        }
        for (let x = -24 + offset; x <= 96; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 96);
                ctx.stroke();
        }
        Tile.drawSpeckles(ctx, accent, 16, 0.16, motif);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.14;
        ctx.fillRect(10 + motif * 13, 10, 18, 8);
        ctx.globalAlpha = 1;
    }

    static drawGardenGround(ctx, accent, highlight, motif = 0) {
        Tile.drawSpeckles(ctx, accent, 28, 0.3, motif);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.24;
        for (let i = 0; i < 12; i++) {
            const x = (i * 31 + motif * 17) % 82 + 7;
            const y = (i * 47 + motif * 11) % 82 + 7;
            ctx.beginPath();
            ctx.ellipse(x, y, 7, 3, i * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    static drawFloor(ctx) {
        ctx.strokeStyle = 'rgba(92, 58, 32, 0.26)';
        ctx.lineWidth = 3;
        for (let y = 16; y < 92; y += 16) {
            ctx.beginPath();
            ctx.moveTo(5, y);
            ctx.lineTo(91, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(255, 246, 206, 0.22)';
        for (let x = 18; x < 96; x += 22) {
            ctx.beginPath();
            ctx.moveTo(x, 10);
            ctx.lineTo(x - 6, 88);
            ctx.stroke();
        }
    }

    static drawWoodFloor(ctx) {
        ctx.strokeStyle = 'rgba(73, 43, 23, 0.36)';
        ctx.lineWidth = 4;
        for (let y = 12; y < 96; y += 14) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(96, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(255, 221, 154, 0.24)';
        ctx.lineWidth = 2;
        for (let y = 7; y < 96; y += 14) {
            ctx.beginPath();
            ctx.moveTo(8, y);
            ctx.bezierCurveTo(26, y - 3, 48, y + 4, 88, y - 1);
            ctx.stroke();
        }
    }

    static drawStoneFloor(ctx) {
        ctx.strokeStyle = 'rgba(76, 84, 84, 0.34)';
        ctx.lineWidth = 3;
        for (let y = 16; y < 96; y += 20) {
            ctx.beginPath();
            ctx.moveTo(4, y);
            ctx.lineTo(92, y);
            ctx.stroke();
        }
        for (let x = 18; x < 96; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 6);
            ctx.lineTo(x - 4, 90);
            ctx.stroke();
        }
        Tile.drawSpeckles(ctx, '#edf0ec', 18, 0.18);
    }

    static drawWaterSurface(ctx, color, highlight, alpha, motif = 0) {
        const sheen = ctx.createLinearGradient(0, 0, 96, 96);
        sheen.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        sheen.addColorStop(0.45, 'rgba(255, 255, 255, 0.04)');
        sheen.addColorStop(1, 'rgba(21, 78, 95, 0.2)');
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, 96, 96);
        Tile.drawWaves(ctx, color, alpha, motif);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.22;
        for (let i = 0; i < 5; i++) {
            const x = (i * 39 + motif * 17) % 84 + 3;
            const y = (i * 27 + motif * 23) % 82 + 5;
            ctx.fillRect(x, y, 10 + (i % 2) * 7, 3);
        }
        ctx.globalAlpha = 1;
    }

    static drawWaves(ctx, color, alpha, motif = 0) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 3;
        for (let y = 12 + motif * 3; y < 96; y += 20) {
            ctx.beginPath();
            for (let x = -8; x < 104; x += 12) {
                const waveY = y + Math.sin((x + motif * 11) * 0.18) * 3;
                if (x === -8) ctx.moveTo(x, waveY);
                else ctx.lineTo(x, waveY);
            }
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    static drawSpeckles(ctx, color, count, alpha, motif = 0) {
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        for (let i = 0; i < count; i++) {
            const x = (i * 37 + motif * 19) % 92 + 2;
            const y = (i * 53 + motif * 31) % 92 + 2;
            const size = 1 + ((i + motif) % 3);
            ctx.fillRect(x, y, size, size);
        }
        ctx.globalAlpha = 1;
    }

    static drawIce(ctx, color, motif = 0) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;
        for (let i = 0; i < 7; i++) {
            const start = (i * 13 + motif * 17) % 96;
            ctx.beginPath();
            ctx.moveTo(start, 4);
            ctx.lineTo((96 - start / 2 + motif * 7) % 104, 92);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    static drawLava(ctx, motif = 0) {
        const centerX = 42 + motif * 2;
        const centerY = 51 - motif;
        const gradient = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 70);
        gradient.addColorStop(0, '#ffd166');
        gradient.addColorStop(0.45, '#f97316');
        gradient.addColorStop(1, '#7c1d12');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 96, 96);
        ctx.strokeStyle = 'rgba(255, 224, 102, 0.65)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(5 + motif, 25 + motif * 2);
        ctx.bezierCurveTo(25, 8 + motif, 39 + motif, 61 - motif, 60, 30 + motif);
        ctx.bezierCurveTo(71, 10 + motif * 2, 82 - motif, 33, 92, 17 + motif);
        ctx.stroke();
    }

    static drawBrick(ctx) {
        ctx.strokeStyle = 'rgba(137, 85, 44, 0.36)';
        ctx.lineWidth = 3;
        for (let y = 18; y < 96; y += 18) {
            ctx.beginPath();
            ctx.moveTo(4, y);
            ctx.lineTo(92, y);
            ctx.stroke();
        }
        for (let y = 9; y < 96; y += 18) {
            const offset = (Math.floor(y / 18) % 2) * 18;
            for (let x = 8 + offset; x < 96; x += 36) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 18);
                ctx.stroke();
            }
        }
    }

    static drawCityWallTop(ctx) {
        ctx.strokeStyle = 'rgba(58, 64, 66, 0.38)';
        ctx.lineWidth = 4;
        for (let y = 12; y < 96; y += 18) {
            ctx.beginPath();
            ctx.moveTo(5, y);
            ctx.lineTo(91, y);
            ctx.stroke();
        }
        for (let y = 3; y < 96; y += 18) {
            const offset = (Math.floor(y / 18) % 2) * 18;
            for (let x = 10 + offset; x < 96; x += 36) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 18);
                ctx.stroke();
            }
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.fillRect(8, 8, 80, 7);
        ctx.fillStyle = 'rgba(30, 34, 34, 0.14)';
        ctx.fillRect(8, 78, 80, 8);
    }

    static drawMasonry(ctx) {
        Tile.drawSpeckles(ctx, '#f1f4f0', 18, 0.18);
        ctx.strokeStyle = 'rgba(76, 84, 90, 0.36)';
        ctx.lineWidth = 3;
        for (let y = 16; y < 96; y += 16) {
            ctx.beginPath();
            ctx.moveTo(6, y);
            ctx.lineTo(90, y);
            ctx.stroke();
        }
        for (let y = 8; y < 96; y += 16) {
            const offset = (Math.floor(y / 16) % 2) * 18;
            for (let x = 9 + offset; x < 96; x += 36) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 16);
                ctx.stroke();
            }
        }
    }

    static drawTimber(ctx) {
        Tile.drawSpeckles(ctx, '#f3c285', 18, 0.16);
        ctx.strokeStyle = 'rgba(83, 49, 27, 0.38)';
        ctx.lineWidth = 5;
        for (let x = 18; x < 96; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 8);
            ctx.lineTo(x - 4, 88);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(255, 232, 179, 0.26)';
        ctx.lineWidth = 2;
        for (let x = 28; x < 96; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 8);
            ctx.lineTo(x - 4, 88);
            ctx.stroke();
        }
    }

    static drawDoor(ctx, style = 'oak') {
        const palettes = {
            oak: {
                panel: 'rgba(70, 39, 24, 0.38)',
                frame: 'rgba(255, 218, 132, 0.45)',
                accent: 'rgba(255, 221, 128, 0.7)'
            },
            iron: {
                panel: 'rgba(36, 43, 49, 0.52)',
                frame: 'rgba(190, 207, 216, 0.52)',
                accent: 'rgba(224, 191, 92, 0.78)'
            },
            painted: {
                panel: 'rgba(25, 85, 79, 0.5)',
                frame: 'rgba(174, 232, 207, 0.5)',
                accent: 'rgba(244, 205, 93, 0.78)'
            }
        };
        const colors = palettes[style] || palettes.oak;

        ctx.fillStyle = colors.panel;
        Tile.roundRect(ctx, 22, 14, 52, 68, 10);
        ctx.fill();
        ctx.strokeStyle = colors.frame;
        ctx.lineWidth = 4;
        Tile.roundRect(ctx, 24, 16, 48, 64, 9);
        ctx.stroke();
        ctx.lineWidth = style === 'iron' ? 5 : 3;
        for (let y = 32; y <= 64; y += 16) {
            ctx.beginPath();
            ctx.moveTo(27, y);
            ctx.lineTo(69, y);
            ctx.stroke();
        }
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(62, 48, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    static drawStairs(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(84, 58, 35, 0.18)';
        ctx.fillRect(12, 18, 72, 62);
        ctx.strokeStyle = 'rgba(255, 246, 218, 0.42)';
        ctx.lineWidth = 5;
        for (let i = 0; i < 6; i++) {
            const y = 22 + i * 10;
            ctx.beginPath();
            ctx.moveTo(20 + i * 4, y);
            ctx.lineTo(76 - i * 3, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(92, 58, 32, 0.34)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(20, 78);
        ctx.lineTo(80, 20);
        ctx.stroke();
        ctx.restore();
    }

    static drawBlocked(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(20, 24, 28, 0.2)';
        Tile.roundRect(ctx, 12, 12, 72, 72, 15);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(22, 28);
        ctx.lineTo(74, 68);
        ctx.moveTo(72, 25);
        ctx.lineTo(24, 73);
        ctx.stroke();
        ctx.restore();
    }

    destroy() {
        this.clearObjects();
        if (this.mesh) {
            this.restoreBaseMaterial();
            this.threeManager.removeFromWorld(this.mesh);
            this.mesh = null;
        }
    }
}
