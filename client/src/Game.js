import { ThreeManager } from './systems/ThreeManager.js';
import { WorldGenerator } from './systems/WorldGenerator.js';
import { PlayerAvatar } from './entities/PlayerAvatar.js';
import { InputManager } from './systems/InputManager.js';
import { Pathfinder } from './systems/Pathfinder.js';
import { WildlifeSystem } from './systems/WildlifeSystem.js';
import { AdminPanel } from './ui/AdminPanel.js';
import { CombatScene } from './scenes/CombatScene.js';
import { createFantasyWorldRowsAt, MAIN_MAP, MAP_CHUNK_SIZE, MAP_LEGEND, WILDLIFE_SPAWNS } from './data/MapData.js';
import * as Colyseus from 'colyseus.js';

export class Game {
    constructor() {
        this.threeManager = new ThreeManager();
        this.inputManager = new InputManager();
        this.inputManager.setPointerTarget(this.threeManager.renderer.domElement);
        
        this.worldGenerator = new WorldGenerator(this.threeManager, { chunkSize: MAP_CHUNK_SIZE });
        this.currentMapRows = MAIN_MAP;
        this.currentBuildings = MAIN_MAP.buildings || [];
        this.worldGenerator.generateFromChunkedArray(MAIN_MAP, MAP_LEGEND, MAP_CHUNK_SIZE, {
            buildings: this.currentBuildings
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
        this.wildlifeSystem = new WildlifeSystem(this.threeManager, this.worldGenerator, WILDLIFE_SPAWNS);
        this.hoveredTile = null;
        this.activePath = [];
        this.collisionDebugEnabled = false;
        this.lastFrameTime = performance.now();
        
        this.connectToServer();

        this.inputManager.onLeftClick((button) => {
            if (button !== 0) return; // Left click only
            if (this.hoveredTile && this.player) {
                const freshPath = this.pathfinder.findPath(
                    this.player.gridX, this.player.gridY, 
                    this.hoveredTile.gridX, this.hoveredTile.gridY
                );
                if (freshPath && freshPath.length > 0) {
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
        this.adminPanel = new AdminPanel({
            onTeleport: ({ worldX, worldY, location }) => this.teleportToWorld(worldX, worldY, location),
            onStartCombat: () => this.startCombatScene(),
            onToggleCollisionDebug: (isEnabled) => this.setCollisionDebugVisible(isEnabled)
        });
        this.inputManager.onKeyDown('KeyM', (event) => {
            if (this.shouldIgnoreGlobalShortcut(event)) return;
            event.preventDefault();
            this.adminPanel.toggle();
        });
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
            console.log('[Game] Connected to room:', this.room.id);
            this.updateHud('Online');

            this.setupNetworking();
            this.syncCurrentMapToServer('client-default');
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
                // Sync initial position if needed
                this.player.applyAuthoritativeCenter(player.centerX, player.centerY, player.centerZ, player.tileX, player.tileY, player.tileZ);
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
        this.currentBuildings = source === 'custom' ? [] : (rows.buildings || []);
        this.worldGenerator.generateFromChunkedArray(rows, MAP_LEGEND, MAP_CHUNK_SIZE, {
            buildings: this.currentBuildings
        });
        this.repositionPlayerForCurrentWorld();
        this.wildlifeSystem = new WildlifeSystem(this.threeManager, this.worldGenerator, WILDLIFE_SPAWNS);

        this.syncCurrentMapToServer(source);

        this.updateHud();
    }

    teleportToWorld(worldX, worldY, location = null) {
        const rows = createFantasyWorldRowsAt(worldX, worldY);
        this.applyWorldMap(rows, 'world-teleport');
        const label = location?.name || `${Math.round(worldX)}, ${Math.round(worldY)}`;
        this.adminPanel?.setMessage(`Arrived at ${label}.`, 'success');
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
        this.player.setCollisionDebugVisible(this.collisionDebugEnabled);
        this.player.syncModel();
        this.worldGenerator.updateVisibleTilesAround(this.player.gridX, this.player.gridY);
    }

    syncCurrentMapToServer(source) {
        if (!this.room || !this.currentMapRows?.length) return;
        this.room.send('world:admin:map_updated', {
            source,
            width: this.currentMapRows[0].length,
            height: this.currentMapRows.length,
            chunkSize: MAP_CHUNK_SIZE,
            spawn: this.currentMapRows.spawn,
            world: this.currentMapRows.world,
            rows: this.currentMapRows
        });
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

        // Handle Hover & Pathfinding
        const tile = this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);
        if (tile !== this.hoveredTile) {
            if (this.hoveredTile) this.hoveredTile.clearHighlight();
            this.hoveredTile = tile;
            
            if (this.hoveredTile) {
                const canStandHere = this.worldGenerator.isWalkable(this.hoveredTile.gridX, this.hoveredTile.gridY);
                this.hoveredTile.highlight(canStandHere ? 0x2f8f4e : 0x8f2630);
                // Calculate Path from Player to Hovered Tile
                if (this.player && canStandHere) {
                   this.activePath = this.pathfinder.findPath(this.player.gridX, this.player.gridY, this.hoveredTile.gridX, this.hoveredTile.gridY);
                   this.threeManager.renderPathLine(this.activePath, this.worldGenerator);
                } else {
                   this.activePath = [];
                   this.threeManager.renderPathLine([], this.worldGenerator);
                }
            } else {
                this.activePath = null;
                this.threeManager.renderPathLine([], this.worldGenerator);
            }
        }

        // Update player
        if (this.player) {
            this.player.update(deltaSeconds);
            this.syncRemotePlayersFromState();
            for (const remoteAvatar of this.remotePlayers.values()) {
                remoteAvatar.update(deltaSeconds);
            }
            this.wildlifeSystem.update(deltaSeconds);

            // Make camera follow player before view-dependent building cutaways.
            const targetPos = this.player.group.position;
            this.threeManager.updateCamera(targetPos);
            this.worldGenerator.updateBuildingVisibility(this.player.gridX, this.player.gridY);
            this.worldGenerator.updateDoorAnimations(deltaSeconds);
            this.worldGenerator.updateVisibleTilesAround(this.player.gridX, this.player.gridY);
            this.worldGenerator.updatePlayerSightCutaway(this.player.gridX, this.player.gridY, this.threeManager.camera);

            this.updateHud();
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
    }
}
