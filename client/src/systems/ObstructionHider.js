import * as THREE from 'three';

export class ObstructionHider {
    constructor(worldGenerator, options = {}) {
        this.worldGenerator = worldGenerator;
        this.hiddenTiles = new Set();
        this.hiddenRoofStates = new Set();
        this.hiddenSceneObjects = new Set();
        this.sceneObjectPosition = new THREE.Vector3();
    }

    update(playerX, playerY, playerZ = 0) {
        this.clear();

        const center = this.worldGenerator.toGridPosition(playerX, playerY);
        const physicalPlayerLevel = Math.max(0, Math.floor(Number.isFinite(playerZ) ? playerZ : 0));
        const playerLevel = this.getObstructionPlayerLevel(center, physicalPlayerLevel);
        const defaultHiddenAtOrAboveLevel = playerLevel + 2;
        const activeGroups = this.worldGenerator.getObstructionGroupsAt(center.gridX, center.gridY);

        if (activeGroups.length > 0) {
            for (const group of activeGroups) {
                const hiddenAtOrAboveLevel = this.getHiddenAtOrAboveLevel(group, playerLevel, defaultHiddenAtOrAboveLevel);
                this.hideInteriorGroupObstructions(group, hiddenAtOrAboveLevel);
            }
        }

        this.hideExteriorGroupObstructions(center, playerLevel, defaultHiddenAtOrAboveLevel);
    }

    getObstructionPlayerLevel(center, physicalPlayerLevel) {
        const surface = this.worldGenerator.getReachableSurfaceAtGrid?.(
            center.gridX,
            center.gridY,
            physicalPlayerLevel,
            { allowBuildingStairSpan: true }
        );
        if (!surface || !this.isMidVerticalTransitionSurface(surface, physicalPlayerLevel)) {
            return physicalPlayerLevel;
        }

        const anchorZ = Number.isFinite(surface.buildingAnchorZ)
            ? Math.floor(surface.buildingAnchorZ)
            : Number.isFinite(surface.buildingGroundFloorZ)
                ? Math.floor(surface.buildingGroundFloorZ)
                : physicalPlayerLevel;
        const floorHeight = Number.isFinite(surface.buildingFloorHeight)
            ? Math.max(1, Math.floor(surface.buildingFloorHeight))
            : 1;
        return Math.max(physicalPlayerLevel, anchorZ + floorHeight);
    }

    isMidVerticalTransitionSurface(surface, physicalPlayerLevel) {
        if (surface.buildingPlacementTag !== 'stair-surface') return false;
        if (surface.buildingPartTag !== 'building:stair:lower') return false;
        const anchorZ = Number.isFinite(surface.buildingAnchorZ)
            ? Math.floor(surface.buildingAnchorZ)
            : Number.isFinite(surface.buildingGroundFloorZ)
                ? Math.floor(surface.buildingGroundFloorZ)
                : null;
        if (!Number.isFinite(anchorZ)) return false;
        const floorHeight = Number.isFinite(surface.buildingFloorHeight)
            ? Math.max(1, Math.floor(surface.buildingFloorHeight))
            : 1;
        const destinationZ = anchorZ + floorHeight;
        return physicalPlayerLevel > anchorZ && physicalPlayerLevel < destinationZ;
    }

    clear() {
        for (const tile of this.hiddenTiles) {
            tile.hiddenByObstruction = false;
            this.worldGenerator.syncTileVisibility(tile);
        }
        this.hiddenTiles.clear();

        for (const state of this.hiddenRoofStates) {
            state.roofHiddenByObstruction = false;
            this.worldGenerator.syncRoofVisibility(state);
        }
        this.hiddenRoofStates.clear();

        for (const object of this.hiddenSceneObjects) {
            object.hiddenByObstruction = false;
            object.visible = object.visibleByRange !== false;
        }
        this.hiddenSceneObjects.clear();
    }

    hideInteriorGroupObstructions(group, hiddenAtOrAboveLevel) {
        const tiles = this.getInteriorObstructionTiles(group);
        for (const tile of tiles) {
            this.hideTileIfObstructing(tile, hiddenAtOrAboveLevel);
        }

        this.hideSceneObjectsAtOrAbove(group, hiddenAtOrAboveLevel);
        this.hideRoof(group, hiddenAtOrAboveLevel);
    }

    hideExteriorGroupObstructions(center, playerLevel, defaultHiddenAtOrAboveLevel) {
        for (const group of this.worldGenerator.getObstructionGroups()) {
            const hiddenAtOrAboveLevel = this.getHiddenAtOrAboveLevel(group, playerLevel, defaultHiddenAtOrAboveLevel);
            if (!this.isGroupObstructingPlayer(group, center, hiddenAtOrAboveLevel)) continue;
            this.hideExteriorTaggedGroupObstructions(group, hiddenAtOrAboveLevel);
        }
    }

    getHiddenAtOrAboveLevel(group, playerLevel, defaultHiddenAtOrAboveLevel) {
        const buildingGroundLevel = this.getGroupGroundLevel(group);
        if (Number.isFinite(buildingGroundLevel) && playerLevel < buildingGroundLevel) {
            const levelsBelowBuilding = buildingGroundLevel - playerLevel;
            if (levelsBelowBuilding < 2) return buildingGroundLevel + 1;
        }
        return defaultHiddenAtOrAboveLevel;
    }

    getGroupGroundLevel(group) {
        const state = group?.roofState;
        const candidates = [
            state?.groundFloorZ,
            state?.buildingGroundFloorZ,
            state?.floorZ,
            state?.baseElevation,
            state?.buildingGroundElevation
        ];
        for (const candidate of candidates) {
            const level = Number(candidate);
            if (Number.isFinite(level)) return Math.max(0, Math.floor(level));
        }
        return null;
    }

    hideExteriorTaggedGroupObstructions(group, hiddenAtOrAboveLevel) {
        const tiles = this.getExteriorObstructionTiles(group);
        for (const tile of tiles) {
            this.hideTileIfObstructing(tile, hiddenAtOrAboveLevel);
        }

        this.hideSceneObjectsAtOrAbove(group, hiddenAtOrAboveLevel);
        this.hideRoof(group, hiddenAtOrAboveLevel);
    }

    hideRoof(group, hiddenAtOrAboveLevel) {
        if (!group.roofState?.roof) return;
        const roofLevel = this.getRoofObstructionLevel(group.roofState);
        if (!Number.isFinite(roofLevel) || roofLevel < hiddenAtOrAboveLevel) return;
        group.roofState.roofHiddenByObstruction = true;
        this.hiddenRoofStates.add(group.roofState);
        this.worldGenerator.syncRoofVisibility(group.roofState);
    }

    getRoofObstructionLevel(state) {
        const level = Number(state?.roofObstructionZ ?? state?.roof?.userData?.obstructionZ);
        return Number.isFinite(level) ? Math.floor(level) : null;
    }

    isGroupObstructingPlayer(group, center, hiddenAtOrAboveLevel) {
        for (const tile of this.getExteriorObstructionTiles(group)) {
            if (!this.isTileInIsoObstructionDirection(tile, center)) continue;
            const voxel = this.worldGenerator.getVoxelAt(tile.gridX, tile.gridY, tile.elevation);
            if (this.isHidableCollisionBlock(voxel, hiddenAtOrAboveLevel)) return true;
        }
        return false;
    }

    hideTileIfObstructing(tile, hiddenAtOrAboveLevel) {
        const voxel = this.worldGenerator.getVoxelAt(tile.gridX, tile.gridY, tile.elevation);
        if (!this.isHidableCollisionBlock(voxel, hiddenAtOrAboveLevel)) return;
        this.hideTile(tile);
    }

    hideTile(tile) {
        tile.hiddenByObstruction = true;
        this.hiddenTiles.add(tile);
        this.worldGenerator.syncTileVisibility(tile);
    }

    hideSceneObjectsAtOrAbove(group, hiddenAtOrAboveLevel) {
        for (const object of group.sceneObjects || []) {
            object.updateWorldMatrix?.(true, true);
            object.traverse?.((child) => {
                if (!child.isMesh) return;
                child.getWorldPosition(this.sceneObjectPosition);
                if (this.sceneObjectPosition.y < hiddenAtOrAboveLevel) return;
                child.hiddenByObstruction = true;
                child.visible = false;
                this.hiddenSceneObjects.add(child);
            });
        }
    }

    isHidableCollisionBlock(voxel, hiddenAtOrAboveLevel) {
        return voxel?.z >= hiddenAtOrAboveLevel &&
            this.worldGenerator.isObstructionHidableVoxel(voxel) &&
            voxel?.collision?.active === true;
    }

    getInteriorObstructionTiles(group) {
        const tiles = new Set(group.wallTypeATiles || []);
        for (const tile of group.upperObstructionTiles || []) tiles.add(tile);
        return tiles.size > 0 ? tiles : (group.tiles || []);
    }

    getExteriorObstructionTiles(group) {
        const tiles = new Set(group.wallObstructionTiles || []);
        for (const tile of group.upperObstructionTiles || []) tiles.add(tile);
        return tiles.size > 0 ? tiles : (group.tiles || []);
    }

    isTileInIsoObstructionDirection(tile, center) {
        return this.isPointInIsoObstructionDirection(tile.gridX, tile.gridY, center);
    }

    isPointInIsoObstructionDirection(x, y, center) {
        return x > center.gridX && y > center.gridY;
    }
}
