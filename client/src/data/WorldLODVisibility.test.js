import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';

import { ThreeManager } from '../systems/ThreeManager.js';
import { WildlifeSystem } from '../systems/WildlifeSystem.js';
import { WorldGenerator } from '../systems/WorldGenerator.js';

function createThreeManagerStub() {
    const worldGroup = new THREE.Group();
    const entityGroup = new THREE.Group();
    return {
        worldGroup,
        entityGroup,
        addToWorld(object) {
            worldGroup.add(object);
        },
        removeFromWorld(object) {
            worldGroup.remove(object);
        },
        addToEntities(object) {
            entityGroup.add(object);
        },
        removeFromEntities(object) {
            entityGroup.remove(object);
        }
    };
}

function addLoadedColumn(worldGenerator, x, y) {
    worldGenerator.elevationMap.set(worldGenerator.getColumnKey(x, y), 0);
}

function createBuildingState(x) {
    const roof = new THREE.Group();
    roof.position.set(x, 1, 0);
    const wallDecorations = new THREE.Group();
    const furniture = new THREE.Group();
    const door = new THREE.Group();
    return {
        id: `building-${x}`,
        x,
        y: 0,
        width: 1,
        height: 1,
        lodExtent: 0.5,
        roof,
        wallDecorations,
        furniture,
        doors: [{ sceneObject: door }],
        visibleByRange: false,
        roofVisibleByRange: false
    };
}

function createDecoration(x) {
    const group = new THREE.Group();
    group.position.set(x, 0, 0);
    group.userData.lodAnchor = { x, y: 0 };
    group.userData.lodExtent = 0.25;
    group.visibleByRange = false;
    group.visible = false;
    return group;
}

function isEffectivelyVisible(object) {
    for (let current = object; current; current = current.parent) {
        if (current.visible === false) return false;
    }
    return true;
}

test('LOD predicate is inclusive, extent-aware, and rejects unloaded world positions', () => {
    assert.equal(WorldGenerator.isObjectInsideLOD(3, 4, 0, 0, 0, 5), true);
    assert.equal(WorldGenerator.isObjectInsideLOD(3, 4, 0.01, 0, 0, 5), false);
    assert.equal(WorldGenerator.isObjectInsideLOD(0, 0, 6, 0, 0, 5), false);
    assert.equal(WorldGenerator.isObjectInsideLOD(Number.NaN, 0, 0, 0, 0, 5), false);

    const boundedObject = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 4),
        new THREE.MeshBasicMaterial()
    );
    boundedObject.position.set(3, 0, 4);
    assert.ok(WorldGenerator.measureHorizontalLODExtent(boundedObject, 3, 4) >= Math.sqrt(5));
    boundedObject.geometry.dispose();
    boundedObject.material.dispose();

    const worldGenerator = new WorldGenerator(createThreeManagerStub(), {
        visibleTileRadius: 5
    });
    addLoadedColumn(worldGenerator, 0, 0);
    assert.equal(worldGenerator.isObjectInsidePlayerLOD(0, 0, 0, 0, 0, 5), true);
    assert.equal(worldGenerator.isObjectInsidePlayerLOD(1, 0, 0, 0, 0, 5), false);
});

test('one player LOD pass culls tiles, terrain instances, waterfalls, buildings, and decorations', () => {
    const worldGenerator = new WorldGenerator(createThreeManagerStub(), {
        visibleTileRadius: 5
    });
    for (const x of [0, 8]) addLoadedColumn(worldGenerator, x, 0);

    const nearTile = { gridX: 0, gridY: 0, mesh: { visible: true } };
    const farTile = { gridX: 8, gridY: 0, mesh: { visible: true } };
    worldGenerator.tiles.push(nearTile, farTile);

    const nearBuilding = createBuildingState(0);
    const farBuilding = createBuildingState(8);
    worldGenerator.buildingStates.set(nearBuilding.id, nearBuilding);
    worldGenerator.buildingStates.set(farBuilding.id, farBuilding);

    const nearDecoration = createDecoration(0);
    const farDecoration = createDecoration(8);
    worldGenerator.decorationGroups.push(nearDecoration, farDecoration);

    const detailGroup = new THREE.Group();
    const detailMesh = new THREE.InstancedMesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial(),
        2
    );
    detailMesh.userData.lodTransforms = [
        { x: 0, y: 0, z: 0, lodX: 0, lodY: 0 },
        { x: 8, y: 0, z: 0, lodX: 8, lodY: 0 }
    ];
    detailGroup.add(detailMesh);
    const nearWaterfall = new THREE.Group();
    nearWaterfall.userData.lodAnchor = { x: 0, y: 0 };
    const farWaterfall = new THREE.Group();
    farWaterfall.userData.lodAnchor = { x: 8, y: 0 };
    detailGroup.add(nearWaterfall, farWaterfall);
    worldGenerator.terrainDetailGroup = detailGroup;

    const first = worldGenerator.updateVisibleTilesAround(0, 0, 5);
    assert.deepEqual(first.tiles, { total: 2, visible: 1 });
    assert.equal(nearTile.mesh.visible, true);
    assert.equal(farTile.mesh.visible, false);
    assert.equal(detailMesh.count, 1);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    detailMesh.getMatrixAt(0, matrix);
    position.setFromMatrixPosition(matrix);
    assert.equal(position.x, 0);
    assert.equal(nearWaterfall.visible, true);
    assert.equal(farWaterfall.visible, false);
    assert.equal(nearBuilding.roof.visible, true);
    assert.equal(farBuilding.roof.visible, false);
    assert.equal(nearDecoration.visible, true);
    assert.equal(farDecoration.visible, false);

    const second = worldGenerator.updateVisibleTilesAround(8, 0, 5);
    assert.deepEqual(second.tiles, { total: 2, visible: 1 });
    detailMesh.getMatrixAt(0, matrix);
    position.setFromMatrixPosition(matrix);
    assert.equal(position.x, 8);
    assert.equal(nearWaterfall.visible, false);
    assert.equal(farWaterfall.visible, true);
    assert.equal(nearBuilding.roof.visible, false);
    assert.equal(farBuilding.roof.visible, true);
    assert.equal(nearDecoration.visible, false);
    assert.equal(farDecoration.visible, true);

    const newlyLoadedFarDecoration = createDecoration(0);
    worldGenerator.decorationGroups.push(newlyLoadedFarDecoration);
    worldGenerator.invalidateLODVisibility();
    worldGenerator.updateVisibleTilesAround(8, 0, 5);
    assert.equal(newlyLoadedFarDecoration.visible, false);

    nearBuilding.wallDecorations.hiddenByObstruction = true;
    worldGenerator.obstructionHider.hiddenSceneObjects.add(nearBuilding.wallDecorations);
    worldGenerator.obstructionHider.clear();
    assert.equal(isEffectivelyVisible(nearBuilding.wallDecorations), false);

    detailMesh.geometry.dispose();
    detailMesh.material.dispose();
});

test('wildlife visibility follows the same loaded-world LOD', () => {
    const worldGenerator = new WorldGenerator(createThreeManagerStub(), {
        visibleTileRadius: 5
    });
    for (const x of [4, 6]) addLoadedColumn(worldGenerator, x, 0);

    const system = new WildlifeSystem(createThreeManagerStub(), worldGenerator, []);
    const makeAnimal = (x) => ({
        gridX: x,
        gridY: 0,
        group: new THREE.Group(),
        updateCount: 0,
        update() {
            this.updateCount += 1;
        },
        setLODVisible(visible) {
            this.group.visibleByRange = visible;
            this.group.visible = visible;
        }
    });
    const near = makeAnimal(4);
    const far = makeAnimal(6);
    system.wildlife.push(near, far);

    const counts = system.update(1 / 60, 0, 0, 5);
    assert.deepEqual(counts, { total: 2, visible: 1 });
    assert.equal(near.updateCount, 1);
    assert.equal(far.updateCount, 1);
    assert.equal(near.group.visible, true);
    assert.equal(far.group.visible, false);
});

test('hidden tiles cannot win raycasts and transient visuals remain inside the LOD', () => {
    const manager = Object.create(ThreeManager.prototype);
    manager.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    manager.camera.position.set(0, 0, 0);
    manager.camera.lookAt(0, 0, -1);
    manager.camera.updateMatrixWorld(true);
    manager.raycaster = new THREE.Raycaster();
    manager.worldGroup = new THREE.Group();

    const hiddenTile = { visibleByRange: false, hiddenByObstruction: false };
    const visibleTile = { visibleByRange: true, hiddenByObstruction: false };
    const hiddenMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial()
    );
    hiddenMesh.position.z = -2;
    hiddenMesh.visible = false;
    hiddenMesh.userData.tile = hiddenTile;
    const visibleMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial()
    );
    visibleMesh.position.z = -4;
    visibleMesh.userData.tile = visibleTile;
    manager.worldGroup.add(hiddenMesh, visibleMesh);
    manager.worldGroup.updateMatrixWorld(true);

    assert.equal(manager.getIntersectedTile({ x: 0, y: 0 }), visibleTile);

    const positions = ThreeManager.createAtmosphereLODPositions(32);
    let maximumRadius = 0;
    for (let index = 0; index < positions.length; index += 3) {
        maximumRadius = Math.max(
            maximumRadius,
            Math.hypot(positions[index], positions[index + 2])
        );
    }
    assert.ok(maximumRadius <= 31 + 1e-6);

    manager.scene = new THREE.Scene();
    manager.pathLine = null;
    manager.pathLineSourcePoints = [];
    const pathWorld = {
        getElevation() {
            return 0;
        },
        isObjectInsidePlayerLOD(x, y, extent, centerX, centerY, radius) {
            return WorldGenerator.isObjectInsideLOD(x, y, extent, centerX, centerY, radius);
        }
    };
    manager.renderPathLine(
        [0, 1, 2, 3, 4].map((x) => ({ x, y: 0, z: 0 })),
        pathWorld
    );
    const pathCounts = manager.updatePathLineLOD(0, 0, 2, pathWorld);
    assert.deepEqual(pathCounts, { totalSegments: 4, visibleSegments: 2 });
    const cachedGeometry = manager.pathLine.geometry;
    assert.deepEqual(manager.updatePathLineLOD(0.2, 0.2, 2, pathWorld), pathCounts);
    assert.equal(manager.pathLine.geometry, cachedGeometry);
    const pathPositions = manager.pathLine.geometry.getAttribute('position').array;
    for (let index = 0; index < pathPositions.length; index += 3) {
        assert.ok(pathPositions[index] <= 2);
    }

    manager.renderPathLine([], pathWorld);
    assert.equal(manager.pathLine, null);
    assert.deepEqual(manager.pathLineSourcePoints, []);

    hiddenMesh.geometry.dispose();
    hiddenMesh.material.dispose();
    visibleMesh.geometry.dispose();
    visibleMesh.material.dispose();
});

test('removing a loaded column invalidates and reapplies the current LOD', () => {
    const worldGenerator = new WorldGenerator(createThreeManagerStub(), {
        visibleTileRadius: 5
    });
    const key = worldGenerator.getTileKey(0, 0, 0);
    const columnKey = worldGenerator.getColumnKey(0, 0);
    const tile = {
        gridX: 0,
        gridY: 0,
        mesh: { visible: true },
        destroy() {}
    };
    worldGenerator.tiles.push(tile);
    worldGenerator.tileMap.set(key, tile);
    worldGenerator.voxelColumnMap.set(columnKey, [{ z: 0 }]);
    worldGenerator.elevationMap.set(columnKey, 0);
    worldGenerator.surfaceMap.set(columnKey, { x: 0, y: 0, z: 0 });
    const decoration = createDecoration(0);
    worldGenerator.decorationGroups.push(decoration);

    worldGenerator.updateVisibleTilesAround(0, 0, 5);
    assert.equal(decoration.visible, true);
    worldGenerator.removeTile(0, 0, 0);
    assert.equal(worldGenerator.hasTileColumn(0, 0), false);
    assert.equal(decoration.visible, false);
});
