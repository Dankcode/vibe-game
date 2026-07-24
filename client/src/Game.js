import { ThreeManager } from './systems/ThreeManager.js';
import { WorldGenerator } from './systems/WorldGenerator.js';
import { PlayerAvatar } from './entities/PlayerAvatar.js';
import { InputManager } from './systems/InputManager.js';
import { Pathfinder } from './systems/Pathfinder.js';
import { WildlifeSystem } from './systems/WildlifeSystem.js';
import { AdminPanel } from './ui/AdminPanel.js';
import { CombatScene } from './scenes/CombatScene.js';
import {
    createFantasyWorldRowsAt,
    createWildlifeSpawnsForMap,
    MAIN_MAP,
    MAP_CHUNK_SIZE,
    MAP_LEGEND
} from './data/MapData.js';
import { encodeNetworkMap } from './data/NetworkMapCodec.js';
import * as Colyseus from 'colyseus.js';

export class Game {
    constructor() {
        this.threeManager = new ThreeManager();
        this.inputManager = new InputManager();
        this.inputManager.setPointerTarget(this.threeManager.renderer.domElement);
        
        this.worldGenerator = new WorldGenerator(this.threeManager, {
            chunkSize: MAP_CHUNK_SIZE,
            visibleTileRadius: 32
        });
        this.currentMapRows = MAIN_MAP;
        this.currentVariant = MAIN_MAP.variant || 0;
        this.currentBuildings = MAIN_MAP.buildings || [];
        this.threeManager.setWorldTheme?.(MAIN_MAP.theme);
        this.worldGenerator.generateFromChunkedArray(MAIN_MAP, MAP_LEGEND, MAP_CHUNK_SIZE, {
            buildings: this.currentBuildings,
            decorations: MAIN_MAP.decorations || []
        });
        this.pathfinder = new Pathfinder(this.worldGenerator);
        this.userId = this.generateUserId();
        const preferredSpawn = MAIN_MAP.spawn || { x: 0, y: 0 };
        const spawn = this.worldGenerator.findNearestWalkable(preferredSpawn.x, preferredSpawn.y, 16) ||
            this.worldGenerator.findHighestWalkable() || { x: -8, y: 0 };

        this.player = new PlayerAvatar(this.threeManager, this.inputManager, this.worldGenerator, spawn.x, spawn.y, {
            isLocal: true,
            userId: this.userId
        });
        this.worldGenerator.updateVisibleTilesAround(this.player.gridX, this.player.gridY);
        this.remotePlayers = new Map();
        this.wildlifeSystem = new WildlifeSystem(
            this.threeManager,
            this.worldGenerator,
            createWildlifeSpawnsForMap(MAIN_MAP)
        );
        this.applyPlayerLOD();
        this.hoveredTile = null;
        this.activePath = [];
        this.collisionDebugEnabled = false;
        this.lastFrameTime = performance.now();
        this.lastPointerVersion = -1;
        this.lastWorldUpdateAt = 0;
        this.lastHudUpdateAt = 0;
        this.lastPlayerTileKey = '';
        this.serverMapAccepted = false;
        
        this.connectToServer();

        this.inputManager.onLeftClick((button) => {
            if (button !== 0) return; // Left click only
            const clickedTile = this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);
            if (clickedTile && this.player && this.worldGenerator.isWalkable(clickedTile.gridX, clickedTile.gridY)) {
                const freshPath = this.pathfinder.findPath(
                    this.player.gridX, this.player.gridY, 
                    clickedTile.gridX, clickedTile.gridY,
                    this.player.gridZ
                );
                if (freshPath && freshPath.length > 0) {
                    this.activePath = freshPath;
                    this.threeManager.renderPathLine(freshPath, this.worldGenerator);
                    this.threeManager.updatePathLineLOD(
                        this.player.gridX,
                        this.player.gridY,
                        this.worldGenerator.visibleTileRadius,
                        this.worldGenerator
                    );
                    this.player.setPath(freshPath);
                }
            }
        });

        this.animate = this.animate.bind(this);
        
        this.statusPill = document.getElementById('status-pill');
        this.positionReadout = document.getElementById('position-readout');
        this.zoneReadout = document.getElementById('zone-readout');
        this.chunkReadout = document.getElementById('chunk-readout');
        this.wildlifeReadout = document.getElementById('wildlife-readout');
        this.playerCountReadout = document.getElementById('player-count-readout');
        this.locationReadout = document.getElementById('location-readout');
        this.biomeReadout = document.getElementById('biome-readout');
        this.seedReadout = document.getElementById('seed-readout');
        this.regionSummary = document.getElementById('region-summary');
        this.rerollButton = document.getElementById('world-reroll-button');
        this.adminPanel = new AdminPanel({
            onTeleport: ({ worldX, worldY, location }) => this.teleportToWorld(worldX, worldY, location),
            onStartCombat: () => this.startCombatScene(),
            onToggleCollisionDebug: (isEnabled) => this.setCollisionDebugVisible(isEnabled)
        });
        this.updateBurgMapPanel();
        this.inputManager.onKeyDown('KeyM', (event) => {
            if (this.shouldIgnoreGlobalShortcut(event)) return;
            event.preventDefault();
            this.adminPanel.toggle();
        });
        this.inputManager.onKeyDown('KeyR', (event) => {
            if (this.shouldIgnoreGlobalShortcut(event)) return;
            event.preventDefault();
            this.regenerateWorldVariant();
        });
        this.rerollButton?.addEventListener('click', () => this.regenerateWorldVariant());
        this.updateHud('Connecting');

        requestAnimationFrame(this.animate);
    }

    async connectToServer() {
        try {
            console.log('[Game] Connecting to server...');
            const host = window.location.hostname;
            this.client = new Colyseus.Client(`ws://${host}:2567`);
            
            this.room = await this.client.joinOrCreate('world', {
                userId: this.userId,
                x: this.player.gridX,
                y: this.player.gridY,
                z: this.player.gridZ
            });
            this.lastSyncedMapKey = null;
            console.log('[Game] Connected to room:', this.room.id);
            this.updateHud('Online');

            this.setupNetworking();
            this.syncCurrentMapToServer('client-default');
            this.repositionPlayerForCurrentWorld();
            this.combatScene = new CombatScene({
                client: this.client,
                userId: this.userId,
                onExit: () => this.updateHud('Online')
            });
        } catch (error) {
            console.error('[Game] Failed to connect to server:', error);
            this.updateHud('Solo');
        }
    }

    setupNetworking() {
        if (!this.room) return;

        this.room.state.players.onAdd = (player, sessionId) => {
            if (sessionId === this.room.sessionId) {
                // The room begins on a tiny fallback surface. Keep the authored
                // town entrance until the compact collision matrix is acknowledged.
                this.repositionPlayerForCurrentWorld();
            } else {
                this.addRemotePlayer(player, sessionId);
            }
        };

        this.room.state.players.onRemove = (player, sessionId) => {
            this.removeRemotePlayer(sessionId);
        };

        this.room.onMessage('world:chunk:init', (data) => {
            this.serverChunkInfo = data;
            this.updateHud('Online');
        });

        this.room.onMessage('world:chunk:entered', (data) => {
            this.serverChunkInfo = data;
            this.updateHud('Online');
        });

        this.room.onMessage('world:map:updated', (data) => {
            if (data?.accepted === false) {
                this.serverMapAccepted = false;
                this.adminPanel.setMessage('The server rejected the world collision matrix.', 'error');
                return;
            }
            this.serverMapAccepted = true;
            this.repositionPlayerForCurrentWorld();
            this.adminPanel.setMessage(`World ${data.source} map active: ${data.width} x ${data.height}.`, 'success');
        });

        // Update loop for network sync
        setInterval(() => {
            if (this.room?.connection?.isOpen && this.player) {
                const center = this.player.getCenterPayload();

                try {
                    this.room.send('player:move', {
                        centerX: center.centerX,
                        centerY: center.centerY,
                        centerZ: center.centerZ
                    });
                } catch (error) {
                    console.warn('[Game] Skipped movement sync while connection is closing.', error);
                }
            }
        }, 100);
    }

    addRemotePlayer(playerState, sessionId) {
        if (this.remotePlayers.has(sessionId)) return;
        const remoteAvatar = new PlayerAvatar(
            this.threeManager,
            null,
            this.worldGenerator,
            playerState.centerX,
            playerState.centerY,
            {
                isLocal: false,
                userId: playerState.userId
            }
        );
        remoteAvatar.setRemoteTarget(playerState.centerX, playerState.centerY, playerState.centerZ);
        remoteAvatar.setCollisionDebugVisible(this.collisionDebugEnabled);
        this.updateRemotePlayerLOD(remoteAvatar);
        this.remotePlayers.set(sessionId, remoteAvatar);
    }

    removeRemotePlayer(sessionId) {
        const remoteAvatar = this.remotePlayers.get(sessionId);
        if (!remoteAvatar) return;
        remoteAvatar.destroy();
        this.remotePlayers.delete(sessionId);
    }

    syncRemotePlayersFromState() {
        if (!this.room?.state?.players) return;
        this.room.state.players.forEach((playerState, sessionId) => {
            if (sessionId === this.room.sessionId) {
                if (!this.serverMapAccepted) return;
                if (performance.now() < (this.authoritativeGraceUntil || 0)) return;
                if (Math.abs(playerState.centerX - this.player.gridX) > 0.8 || Math.abs(playerState.centerY - this.player.gridY) > 0.8) {
                    this.player.applyAuthoritativeCenter(playerState.centerX, playerState.centerY, playerState.centerZ, playerState.tileX, playerState.tileY, playerState.tileZ);
                }
                return;
            }

            if (!this.remotePlayers.has(sessionId)) {
                this.addRemotePlayer(playerState, sessionId);
            }
            this.remotePlayers.get(sessionId).setRemoteTarget(playerState.centerX, playerState.centerY, playerState.centerZ);
        });
    }

    applyWorldMap(rows, source) {
        if (this.hoveredTile) {
            this.hoveredTile.clearHighlight();
            this.hoveredTile = null;
        }
        this.activePath = [];
        this.threeManager.renderPathLine([], this.worldGenerator);
        this.wildlifeSystem.destroy();
        this.currentMapRows = rows;
        this.currentVariant = rows.variant || 0;
        this.currentBuildings = source === 'custom' ? [] : (rows.buildings || []);
        this.worldGenerator.generateFromChunkedArray(rows, MAP_LEGEND, MAP_CHUNK_SIZE, {
            buildings: this.currentBuildings,
            decorations: rows.decorations || []
        });
        this.threeManager.setWorldTheme?.(rows.theme);
        this.repositionPlayerForCurrentWorld();
        this.wildlifeSystem = new WildlifeSystem(
            this.threeManager,
            this.worldGenerator,
            createWildlifeSpawnsForMap(rows)
        );
        this.applyPlayerLOD();

        this.scheduleCurrentMapToServer(source);

        this.updateHud();
        this.updateBurgMapPanel();
    }

    teleportToWorld(worldX, worldY, location = null) {
        const rows = createFantasyWorldRowsAt(worldX, worldY, { variant: this.currentVariant });
        this.applyWorldMap(rows, 'world-teleport');
        const label = location?.name || `${Math.round(worldX)}, ${Math.round(worldY)}`;
        this.adminPanel?.setMessage(`Arrived at ${label}.`, 'success');
    }

    regenerateWorldVariant() {
        const nextVariant = (this.currentVariant + 1) % 1000000;
        const worldX = this.currentMapRows.world?.centerX ?? 0;
        const worldY = this.currentMapRows.world?.centerY ?? 0;
        const rows = createFantasyWorldRowsAt(worldX, worldY, { variant: nextVariant });
        this.applyWorldMap(rows, 'world-variant');
        this.adminPanel?.setMessage(`World variation ${nextVariant + 1} generated from the same FMG geography.`, 'success');
    }

    repositionPlayerForCurrentWorld() {
        const preferredSpawn = this.currentMapRows.spawn || { x: this.player.gridX, y: this.player.gridY };
        const fallbackSpawn = this.worldGenerator.findNearestWalkable(preferredSpawn.x, preferredSpawn.y, 16) ||
            this.worldGenerator.findHighestWalkable() || this.findFirstWalkableTile();
        if (!fallbackSpawn) return;

        this.player.gridX = fallbackSpawn.x;
        this.player.gridY = fallbackSpawn.y;
        this.player.gridZ = this.worldGenerator.getElevation(fallbackSpawn.x, fallbackSpawn.y);
        this.player.targetX = this.player.gridX;
        this.player.targetY = this.player.gridY;
        this.player.targetZ = this.player.gridZ;
        this.player.visualX = this.player.gridX;
        this.player.visualY = this.player.gridY;
        this.player.visualZ = this.player.gridZ;
        this.player.currentPath = [];
        this.authoritativeGraceUntil = performance.now() + 8000;
        this.player.setCollisionDebugVisible(this.collisionDebugEnabled);
        this.player.syncModel();
        this.applyPlayerLOD();
    }

    applyPlayerLOD() {
        if (!this.player) return null;
        const radius = this.worldGenerator.visibleTileRadius;
        const summary = this.worldGenerator.updateVisibleTilesAround(
            this.player.gridX,
            this.player.gridY,
            radius
        );
        this.threeManager.updatePlayerLOD(
            this.player.gridX,
            this.player.gridY,
            radius,
            this.worldGenerator
        );
        this.wildlifeSystem?.updateVisibility(
            this.player.gridX,
            this.player.gridY,
            radius
        );
        for (const remoteAvatar of this.remotePlayers?.values?.() || []) {
            this.updateRemotePlayerLOD(remoteAvatar);
        }
        return summary;
    }

    updateRemotePlayerLOD(remoteAvatar) {
        if (!remoteAvatar || !this.player) return;
        remoteAvatar.setLODVisible(
            this.worldGenerator.isObjectInsidePlayerLOD(
                remoteAvatar.gridX,
                remoteAvatar.gridY,
                0.5,
                this.player.gridX,
                this.player.gridY,
                this.worldGenerator.visibleTileRadius
            )
        );
    }

    syncCurrentMapToServer(source) {
        if (!this.room || !this.currentMapRows?.length) return;
        const mapKey = this.getCurrentMapSyncKey();
        if (mapKey && this.lastSyncedMapKey === mapKey) return;
        const encodedMap = encodeNetworkMap(this.currentMapRows);
        this.room.send('world:admin:map_updated', {
            source,
            width: this.currentMapRows[0].length,
            height: this.currentMapRows.length,
            chunkSize: MAP_CHUNK_SIZE,
            spawn: this.currentMapRows.spawn,
            world: this.currentMapRows.world,
            generationVersion: this.currentMapRows.generationVersion,
            contentHash: this.currentMapRows.contentHash,
            variant: this.currentMapRows.variant || 0,
            ...(encodedMap || { rows: this.currentMapRows })
        });
        if (mapKey) this.lastSyncedMapKey = mapKey;
    }

    scheduleCurrentMapToServer(source) {
        if (this.pendingMapSync) {
            if (typeof cancelIdleCallback === 'function') cancelIdleCallback(this.pendingMapSync);
            else clearTimeout(this.pendingMapSync);
        }

        const send = () => {
            this.pendingMapSync = null;
            this.syncCurrentMapToServer(source);
        };
        this.pendingMapSync = typeof requestIdleCallback === 'function'
            ? requestIdleCallback(send, { timeout: 900 })
            : setTimeout(send, 50);
    }

    getCurrentMapSyncKey() {
        if (!this.currentMapRows?.length) return null;
        const townId = this.currentMapRows.sourceTown?.id || this.currentMapRows.townName || 'local';
        const worldId = this.currentMapRows.world?.id || 'world';
        return [
            worldId,
            townId,
            `${this.currentMapRows[0]?.length || 0}x${this.currentMapRows.length}`,
            this.currentMapRows.generationVersion || 'v1',
            this.currentMapRows.contentHash || 'unhashed',
            this.currentMapRows.variant || 0
        ].join(':');
    }

    setCollisionDebugVisible(isEnabled) {
        this.collisionDebugEnabled = isEnabled;
        this.player?.setCollisionDebugVisible(isEnabled);
        for (const remoteAvatar of this.remotePlayers.values()) {
            remoteAvatar.setCollisionDebugVisible(isEnabled);
        }
    }

    findFirstWalkableTile() {
        for (const surface of this.worldGenerator.surfaceMap.values()) {
            if (this.worldGenerator.isWalkable(surface.x, surface.y)) {
                return { x: surface.x, y: surface.y };
            }
        }
        return null;
    }

    async startCombatScene() {
        if (!this.combatScene) {
            this.combatScene = new CombatScene({
                client: this.client,
                userId: this.userId,
                onExit: () => this.updateHud(this.room ? 'Online' : 'Solo')
            });
        }
        await this.combatScene.enter('meadow-hare-demo');
    }

    generateUserId() {
        const existingId = localStorage.getItem('userId');
        if (existingId) return existingId;
        const newId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', newId);
        return newId;
    }

    animate() {
        requestAnimationFrame(this.animate);
        const now = performance.now();
        const deltaSeconds = Math.min((now - this.lastFrameTime) / 1000, 0.1);
        this.lastFrameTime = now;
        
        // Handle zoom
        const wheelDelta = this.inputManager.getWheelDelta();
        if (wheelDelta !== 0) {
            this.threeManager.handleZoom(wheelDelta);
        }

        // Raycasting a voxel world is expensive. Only inspect the scene after
        // the pointer actually moves; calculate a full path only on click.
        const pointerVersion = this.inputManager.getPointerVersion();
        if (pointerVersion !== this.lastPointerVersion) {
            this.lastPointerVersion = pointerVersion;
            const tile = this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);
            if (tile === this.hoveredTile) {
                // Nothing visual changed.
            } else {
                if (this.hoveredTile) this.hoveredTile.clearHighlight();
                this.hoveredTile = tile;

                if (this.hoveredTile) {
                    const canStandHere = this.worldGenerator.isWalkable(this.hoveredTile.gridX, this.hoveredTile.gridY);
                    this.hoveredTile.highlight(canStandHere ? 0x2f8f4e : 0x8f2630);
                }
            }
        }

        // Update player
        if (this.player) {
            this.player.update(deltaSeconds);
            this.syncRemotePlayersFromState();
            for (const remoteAvatar of this.remotePlayers.values()) {
                remoteAvatar.update(deltaSeconds);
                this.updateRemotePlayerLOD(remoteAvatar);
            }
            this.wildlifeSystem.update(
                deltaSeconds,
                this.player.gridX,
                this.player.gridY,
                this.worldGenerator.visibleTileRadius
            );

            if (this.activePath.length > 0 && this.player.currentPath.length === 0) {
                this.activePath = [];
                this.threeManager.renderPathLine([], this.worldGenerator);
            }

            // Make camera follow player before updating visibility.
            const targetPos = this.player.group.position;
            this.threeManager.updateCamera(targetPos);
            this.worldGenerator.updateDoorAnimations(deltaSeconds);
            const playerTileKey = `${Math.round(this.player.gridX)},${Math.round(this.player.gridY)},${this.player.gridZ}`;
            const playerChangedTile = playerTileKey !== this.lastPlayerTileKey;
            if (playerChangedTile || now - this.lastWorldUpdateAt >= 160) {
                this.lastPlayerTileKey = playerTileKey;
                this.lastWorldUpdateAt = now;
                this.worldGenerator.updateLivingWorld(now / 1000);
                this.worldGenerator.updateBuildingVisibility(this.player.gridX, this.player.gridY);
                this.applyPlayerLOD();
                this.worldGenerator.updateObstructionHiding(this.player.gridX, this.player.gridY, this.player.gridZ);
            }

            if (now - this.lastHudUpdateAt >= 125) {
                this.lastHudUpdateAt = now;
                this.updateHud();
                if (this.adminPanel?.panel?.classList.contains('is-open')) this.updateBurgMapPanel();
            }
        }

        this.threeManager.render();
    }

    shouldIgnoreGlobalShortcut(event) {
        const tagName = event?.target?.tagName?.toLowerCase();
        return tagName === 'input' || tagName === 'textarea' || tagName === 'select' ||
            event?.target?.isContentEditable;
    }

    updateHud(status) {
        if (status && this.statusPill) {
            this.statusPill.textContent = status;
            this.statusPill.dataset.status = status.toLowerCase();
        }

        if (!this.player) return;

        const tileX = Math.round(this.player.gridX);
        const tileY = Math.round(this.player.gridY);
        const surface = this.worldGenerator.getSurfaceAt(tileX, tileY);
        const chunkKey = this.worldGenerator.getChunkKeyForTile(tileX, tileY);
        const loadedChunks = this.worldGenerator.getLoadedChunkSummary().length;

        if (this.positionReadout) {
            this.positionReadout.textContent = `${tileX}, ${tileY}, ${this.player.gridZ}`;
        }
        if (this.zoneReadout) {
            this.zoneReadout.textContent = surface?.definition?.label || 'Unknown';
        }
        if (this.chunkReadout) {
            this.chunkReadout.textContent = `${chunkKey} / ${loadedChunks}`;
        }
        if (this.wildlifeReadout) {
            this.wildlifeReadout.textContent = `${this.wildlifeSystem.wildlife.length}`;
        }
        if (this.playerCountReadout) {
            this.playerCountReadout.textContent = `${this.room?.state?.players?.size || 1}`;
        }
        if (this.locationReadout) {
            this.locationReadout.textContent = this.currentMapRows.townName || this.currentMapRows.sourceTown?.name || 'Unknown';
        }
        if (this.biomeReadout) {
            this.biomeReadout.textContent = this.currentMapRows.theme?.biome || 'Mixed wilds';
        }
        if (this.seedReadout) {
            this.seedReadout.textContent = String(this.currentMapRows.seed ?? 0);
        }
        if (this.regionSummary) {
            const buildings = this.currentMapRows.buildings?.length || 0;
            const biome = this.currentMapRows.theme?.biome || 'mixed frontier';
            this.regionSummary.textContent = `${biome} · ${buildings} generated structures · R to reshape this region`;
        }
    }

    updateBurgMapPanel() {
        if (!this.adminPanel?.renderBurgMap || !this.currentMapRows) return;
        const players = [];
        if (this.player) {
            players.push({
                x: this.player.gridX,
                y: this.player.gridY,
                local: true,
                label: 'You'
            });
        }
        for (const [sessionId, remoteAvatar] of this.remotePlayers || []) {
            players.push({
                x: remoteAvatar.gridX,
                y: remoteAvatar.gridY,
                local: false,
                label: remoteAvatar.userId || sessionId
            });
        }
        this.adminPanel.renderBurgMap(this.currentMapRows, players);
    }
}
