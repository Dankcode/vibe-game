const Colyseus = require('colyseus');
const PlayerState = require('../schemas/PlayerState');
const TileMapState = require('../schemas/TileMapState');
const { WorldSurface } = require('../systems/WorldSurface');

const CHUNK_SIZE = 16;
const INTEREST_RADIUS_CHUNKS = 1;
const PATCH_RATE_MS = 50;
const MIN_MOVE_INTERVAL_MS = 45;
const POSITION_PRECISION = 1000;
const MAX_CENTER_STEP = 0.7;

class WorldRoom extends Colyseus.Room {
    onCreate(options) {
        // Set the room state
        this.setState(new TileMapState());
        this.playerChunks = new Map();
        this.lastMoveAt = new Map();
        this.worldSurface = new WorldSurface();
        this.setPatchRate(PATCH_RATE_MS);

        // Set the maximum number of players per room
        this.maxClients = 50;

        // Set up message handlers
        this.setupMessageHandlers();

        console.log(`[WorldRoom] Created room: ${this.roomId}`);
    }

    onJoin(client, options) {
        console.log(`[WorldRoom] Client ${client.sessionId} joined`);

        // Create a new player state
        const player = new PlayerState();

        // Set user ID (can come from auth token in options)
        player.userId = options.userId || `user_${client.sessionId}`;

        const spawn = this.worldSurface.resolveCenter(options.x || 0, options.y || 0);
        this.applyResolvedCenter(player, spawn);
        player.chunkX = this.getChunkCoord(player.tileX);
        player.chunkY = this.getChunkCoord(player.tileY);
        this.playerChunks.set(client.sessionId, this.getChunkKey(player.chunkX, player.chunkY));

        // Add some default items for testing
        player.inventory.set('coins', 0);
        player.inventory.set('health_potions', 3);
        player.inventory.set('gems', 5);

        // Add player to state
        this.state.players.set(client.sessionId, player);

        client.send('world:chunk:init', {
            chunkSize: CHUNK_SIZE,
            interestRadius: INTEREST_RADIUS_CHUNKS,
            chunkX: player.chunkX,
            chunkY: player.chunkY,
            centerX: player.centerX,
            centerY: player.centerY,
            centerZ: player.centerZ,
            tileX: player.tileX,
            tileY: player.tileY,
            tileZ: player.tileZ
        });

        console.log(`[WorldRoom] Player ${player.userId} spawned on block [${player.tileX}, ${player.tileY}, ${player.tileZ}]`);
    }

    onLeave(client, consented) {
        console.log(`[WorldRoom] Client ${client.sessionId} left (consented: ${consented})`);

        // Remove player from state
        if (this.state.players.has(client.sessionId)) {
            const player = this.state.players.get(client.sessionId);
            console.log(`[WorldRoom] Player ${player.userId} removed`);
            this.state.players.delete(client.sessionId);
        }
        this.playerChunks.delete(client.sessionId);
        this.lastMoveAt.delete(client.sessionId);
    }

    setupMessageHandlers() {
        // Handle player position updates
        this.onMessage('player:move', (client, data) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                const now = Date.now();
                const previousMoveAt = this.lastMoveAt.get(client.sessionId) || 0;
                if (now - previousMoveAt < MIN_MOVE_INTERVAL_MS) return;
                this.lastMoveAt.set(client.sessionId, now);

                const requestedCenter = this.clampRequestedCenter(player, {
                    centerX: data.centerX ?? data.x,
                    centerY: data.centerY ?? data.y
                });
                const previous = this.getPlayerCenterSnapshot(player);
                const resolved = this.worldSurface.resolveCenter(
                    requestedCenter.centerX,
                    requestedCenter.centerY,
                    previous
                );
                this.applyResolvedCenter(player, resolved);
                player.chunkX = this.getChunkCoord(player.tileX);
                player.chunkY = this.getChunkCoord(player.tileY);

                const nextChunkKey = this.getChunkKey(player.chunkX, player.chunkY);
                const previousChunkKey = this.playerChunks.get(client.sessionId);
                if (nextChunkKey !== previousChunkKey) {
                    this.playerChunks.set(client.sessionId, nextChunkKey);
                    client.send('world:chunk:entered', {
                        chunkX: player.chunkX,
                        chunkY: player.chunkY,
                        nearby: this.getNearbyChunkKeys(player.chunkX, player.chunkY)
                    });
                    console.log(`[WorldRoom] Player ${player.userId} entered chunk ${nextChunkKey}`);
                }
            }
        });

        this.onMessage('world:chunk:request', (client, data) => {
            const chunkX = Number.isInteger(data?.chunkX) ? data.chunkX : 0;
            const chunkY = Number.isInteger(data?.chunkY) ? data.chunkY : 0;
            client.send('world:chunk:data', {
                chunkX,
                chunkY,
                chunkSize: CHUNK_SIZE,
                encoding: 'array-blocks-v1',
                blocks: []
            });
        });

        this.onMessage('world:admin:map_updated', (client, data) => {
            const width = Number.isInteger(data?.width) ? data.width : 0;
            const height = Number.isInteger(data?.height) ? data.height : 0;
            if (this.isValidMapRows(data?.rows)) {
                this.worldSurface.loadRows(data.rows);
                const shouldUseHighestSpawn = ['random', 'client-default'].includes(data?.source);
                const highestSpawn = shouldUseHighestSpawn ? this.worldSurface.findHighestWalkable() : null;
                for (const player of this.state.players.values()) {
                    let resolved = shouldUseHighestSpawn
                        ? this.worldSurface.resolveNearestWalkable(highestSpawn.x, highestSpawn.y)
                        : this.worldSurface.resolveCenter(player.centerX, player.centerY, this.getPlayerCenterSnapshot(player));
                    const resolvedSurface = this.worldSurface.getSurfaceAt(resolved.tileX, resolved.tileY);
                    if (!resolved.valid && !resolvedSurface?.walkable) {
                        resolved = this.worldSurface.resolveNearestWalkable(player.centerX, player.centerY);
                    }
                    this.applyResolvedCenter(player, resolved);
                    player.chunkX = this.getChunkCoord(player.tileX);
                    player.chunkY = this.getChunkCoord(player.tileY);
                }
            }
            this.broadcast('world:map:updated', {
                updatedBy: client.sessionId,
                source: data?.source || 'custom',
                width,
                height,
                chunkSize: CHUNK_SIZE
            });
        });

        // Handle inventory updates
        this.onMessage('player:inventory', (client, data) => {
            const player = this.state.players.get(client.sessionId);
            if (player && data.action) {
                switch (data.action) {
                    case 'set':
                        // Set item quantity
                        if (data.item && data.quantity !== undefined) {
                            player.inventory.set(data.item, data.quantity);
                        }
                        break;
                    case 'add':
                        // Add to item quantity
                        if (data.item && data.quantity) {
                            const current = player.inventory.get(data.item) || 0;
                            player.inventory.set(data.item, current + data.quantity);
                        }
                        break;
                    case 'remove':
                        // Remove from item quantity
                        if (data.item && data.quantity) {
                            const current = player.inventory.get(data.item) || 0;
                            const newQuantity = Math.max(0, current - data.quantity);
                            if (newQuantity > 0) {
                                player.inventory.set(data.item, newQuantity);
                            } else {
                                player.inventory.delete(data.item);
                            }
                        }
                        break;
                    case 'delete':
                        // Remove item completely
                        if (data.item) {
                            player.inventory.delete(data.item);
                        }
                        break;
                }

                console.log(`[WorldRoom] Player ${player.userId} inventory updated:`, data);
            }
        });
    }

    isValidMapRows(rows) {
        if (!Array.isArray(rows) || rows.length === 0 || rows.length > 128) return false;
        const width = this.getMapRowWidth(rows[0]);
        if (width <= 0 || width > 128) return false;
        return rows.every((row) => this.getMapRowWidth(row) === width);
    }

    getMapRowWidth(row) {
        if (typeof row === 'string') return row.trim().length;
        if (Array.isArray(row)) return row.length;
        return 0;
    }

    getChunkCoord(tileCoord) {
        return Math.floor(tileCoord / CHUNK_SIZE);
    }

    getChunkKey(chunkX, chunkY) {
        return `${chunkX},${chunkY}`;
    }

    getNearbyChunkKeys(chunkX, chunkY) {
        const keys = [];
        for (let x = chunkX - INTEREST_RADIUS_CHUNKS; x <= chunkX + INTEREST_RADIUS_CHUNKS; x++) {
            for (let y = chunkY - INTEREST_RADIUS_CHUNKS; y <= chunkY + INTEREST_RADIUS_CHUNKS; y++) {
                keys.push(this.getChunkKey(x, y));
            }
        }
        return keys;
    }

    clampRequestedCenter(player, requested) {
        const centerX = this.quantize(Number(requested.centerX));
        const centerY = this.quantize(Number(requested.centerY));
        const dx = centerX - player.centerX;
        const dy = centerY - player.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (!Number.isFinite(distance) || distance <= MAX_CENTER_STEP) {
            return { centerX, centerY };
        }

        const scale = MAX_CENTER_STEP / distance;
        return {
            centerX: this.quantize(player.centerX + dx * scale),
            centerY: this.quantize(player.centerY + dy * scale)
        };
    }

    getPlayerCenterSnapshot(player) {
        return {
            centerX: player.centerX,
            centerY: player.centerY,
            centerZ: player.centerZ,
            tileX: player.tileX,
            tileY: player.tileY,
            tileZ: player.tileZ
        };
    }

    applyResolvedCenter(player, resolved) {
        player.centerX = this.quantize(resolved.centerX);
        player.centerY = this.quantize(resolved.centerY);
        player.centerZ = this.quantize(resolved.centerZ);
        player.x = player.centerX;
        player.y = player.centerY;
        player.z = player.centerZ;
        player.tileX = resolved.tileX;
        player.tileY = resolved.tileY;
        player.tileZ = resolved.tileZ;
    }

    quantize(value) {
        if (!Number.isFinite(value)) return 0;
        return Math.round(value * POSITION_PRECISION) / POSITION_PRECISION;
    }
}

module.exports = WorldRoom;
