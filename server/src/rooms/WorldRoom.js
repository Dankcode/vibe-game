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
const NETWORK_PALETTE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const NETWORK_HEIGHT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
const WORLD_DESCRIPTOR_SCHEMA = 'vibe-game-world-descriptor';
const WORLD_DESCRIPTOR_SCHEMA_VERSION = 1;

class WorldRoom extends Colyseus.Room {
    onCreate(options = {}) {
        // Set the room state
        this.setState(new TileMapState());
        this.playerChunks = new Map();
        this.lastMoveAt = new Map();
        this.worldSurface = new WorldSurface();
        const initialDescriptor = this.sanitizeWorldDescriptor(options.worldDescriptor);
        this.worldDescriptor = this.isReconstructableWorldDescriptor(initialDescriptor)
            ? initialDescriptor
            : null;
        this.worldDescriptorKey = this.getWorldDescriptorKey(this.worldDescriptor);
        this.mapReady = false;
        this.setPatchRate(PATCH_RATE_MS);

        // Set the maximum number of players per room
        this.maxClients = 50;

        // Set up message handlers
        this.setupMessageHandlers();

        console.log(`[WorldRoom] Created room: ${this.roomId}`);
    }

    onJoin(client, options = {}) {
        console.log(`[WorldRoom] Client ${client.sessionId} joined`);

        if (!this.worldDescriptor) {
            const joiningDescriptor = this.sanitizeWorldDescriptor(options.worldDescriptor);
            this.worldDescriptor = this.isReconstructableWorldDescriptor(joiningDescriptor)
                ? joiningDescriptor
                : null;
            this.worldDescriptorKey = this.getWorldDescriptorKey(this.worldDescriptor);
        }

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
            tileZ: player.tileZ,
            descriptor: this.worldDescriptor,
            descriptorKey: this.worldDescriptorKey,
            mapReady: this.mapReady
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

        this.onMessage('world:descriptor:request', (client) => {
            client.send('world:descriptor', {
                descriptor: this.worldDescriptor,
                descriptorKey: this.worldDescriptorKey,
                mapReady: this.mapReady,
                chunkSize: CHUNK_SIZE
            });
        });

        this.onMessage('world:admin:map_updated', (client, data) => {
            const decodedRows = this.decodeNetworkMap(data) || data?.rows;
            const rowsValid = this.isValidMapRows(decodedRows);
            const width = rowsValid
                ? this.getMapRowWidth(decodedRows[0])
                : (Number.isInteger(data?.width) ? data.width : 0);
            const height = rowsValid
                ? decodedRows.length
                : (Number.isInteger(data?.height) ? data.height : 0);
            const descriptorOverrides = { width, height, chunkSize: CHUNK_SIZE };
            const suppliedDescriptor = this.sanitizeWorldDescriptor(data?.descriptor, descriptorOverrides);
            const collisionHash = rowsValid ? this.getNetworkMapCollisionHash(decodedRows) : '';
            const descriptorIsReconstructable = this.isReconstructableWorldDescriptor(suppliedDescriptor);
            const accepted = rowsValid && (
                !suppliedDescriptor?.collisionHash ||
                suppliedDescriptor.collisionHash === collisionHash
            );
            if (accepted) {
                this.worldSurface.loadRows(decodedRows);
                const descriptor = descriptorIsReconstructable
                    ? this.sanitizeWorldDescriptor(
                        suppliedDescriptor,
                        { ...descriptorOverrides, collisionHash }
                    )
                    : null;
                this.worldDescriptor = descriptor;
                this.worldDescriptorKey = this.getWorldDescriptorKey(descriptor);
                this.mapReady = true;
                const shouldUseHighestSpawn = ['random', 'client-default'].includes(data?.source);
                const requestedSpawn = this.getRequestedMapSpawn(data?.spawn);
                const fallbackSpawn = shouldUseHighestSpawn ? this.worldSurface.findHighestWalkable() : null;
                for (const player of this.state.players.values()) {
                    let resolved = requestedSpawn
                        ? this.worldSurface.resolveNearestWalkable(requestedSpawn.x, requestedSpawn.y)
                        : shouldUseHighestSpawn
                            ? this.worldSurface.resolveNearestWalkable(fallbackSpawn.x, fallbackSpawn.y)
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
                chunkSize: CHUNK_SIZE,
                accepted,
                descriptor: this.worldDescriptor,
                descriptorKey: this.worldDescriptorKey,
                generationHash: this.worldDescriptor?.generationHash || '',
                collisionHash: this.worldDescriptor?.collisionHash || '',
                vectorContentHash: this.worldDescriptor?.vectorContentHash || '',
                vectorHash: this.worldDescriptor?.vectorHash || '',
                mapReady: this.mapReady
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

    isReconstructableWorldDescriptor(descriptor) {
        if (!descriptor) return false;
        return Boolean(
            descriptor.worldId &&
            descriptor.townId &&
            descriptor.generationVersion &&
            descriptor.generationHash &&
            descriptor.collisionHash &&
            descriptor.vectorSchema &&
            descriptor.vectorSchemaVersion > 0 &&
            descriptor.vectorGenerationVersion &&
            descriptor.vectorContentHash &&
            (descriptor.burgId === 0 || descriptor.vectorHash)
        );
    }

    sanitizeWorldDescriptor(descriptor, overrides = {}) {
        if (!descriptor || typeof descriptor !== 'object' || Array.isArray(descriptor)) return null;
        if (descriptor.schema !== WORLD_DESCRIPTOR_SCHEMA ||
            Number(descriptor.schemaVersion) !== WORLD_DESCRIPTOR_SCHEMA_VERSION) {
            return null;
        }

        const source = { ...descriptor, ...overrides };
        const centerX = this.clampDescriptorNumber(source.centerX);
        const centerY = this.clampDescriptorNumber(source.centerY);
        return Object.freeze({
            schema: WORLD_DESCRIPTOR_SCHEMA,
            schemaVersion: WORLD_DESCRIPTOR_SCHEMA_VERSION,
            worldId: this.sanitizeDescriptorToken(source.worldId || 'world', 80),
            townId: this.sanitizeDescriptorToken(source.townId || 'region', 120),
            burgId: this.clampDescriptorInteger(source.burgId, 0, 0, 1000000),
            centerX,
            centerY,
            sampleCenterX: this.clampDescriptorNumber(source.sampleCenterX, centerX),
            sampleCenterY: this.clampDescriptorNumber(source.sampleCenterY, centerY),
            width: this.clampDescriptorInteger(source.width, 72, 1, 128),
            height: this.clampDescriptorInteger(source.height, 54, 1, 128),
            chunkSize: this.clampDescriptorInteger(source.chunkSize, CHUNK_SIZE, 1, 64),
            variant: this.clampDescriptorInteger(source.variant, 0, 0, 1000000),
            seed: this.clampDescriptorInteger(source.seed, 0, 0, 0xffffffff),
            generationVersion: this.sanitizeDescriptorToken(source.generationVersion, 120),
            generationHash: this.sanitizeDescriptorToken(source.generationHash, 192),
            skeletonHash: this.sanitizeDescriptorToken(source.skeletonHash, 80),
            collisionHash: this.sanitizeDescriptorToken(source.collisionHash, 80),
            vectorSchema: this.sanitizeDescriptorToken(source.vectorSchema, 120),
            vectorSchemaVersion: this.clampDescriptorInteger(source.vectorSchemaVersion, 0, 0, 1000),
            vectorGenerationVersion: this.sanitizeDescriptorToken(source.vectorGenerationVersion, 120),
            vectorContentHash: this.sanitizeDescriptorToken(source.vectorContentHash, 128),
            vectorHash: this.sanitizeDescriptorToken(source.vectorHash, 128)
        });
    }

    getWorldDescriptorKey(descriptor) {
        if (!descriptor) return null;
        return JSON.stringify([
            descriptor.worldId,
            descriptor.townId,
            descriptor.burgId,
            `${descriptor.width}x${descriptor.height}`,
            descriptor.chunkSize,
            `${descriptor.centerX},${descriptor.centerY}`,
            `${descriptor.sampleCenterX},${descriptor.sampleCenterY}`,
            descriptor.variant,
            descriptor.seed,
            descriptor.generationVersion,
            descriptor.generationHash,
            descriptor.skeletonHash,
            descriptor.collisionHash,
            descriptor.vectorSchema,
            descriptor.vectorSchemaVersion,
            descriptor.vectorGenerationVersion,
            descriptor.vectorContentHash,
            descriptor.vectorHash
        ]);
    }

    sanitizeDescriptorToken(value, maximumLength = 160) {
        return String(value ?? '')
            .trim()
            .replace(/[^a-z0-9._:/-]/gi, '')
            .slice(0, maximumLength);
    }

    clampDescriptorNumber(value, fallback = 0) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return fallback;
        return Math.max(-1000000, Math.min(1000000, Math.round(numeric * 1000) / 1000));
    }

    clampDescriptorInteger(value, fallback, minimum, maximum) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return fallback;
        return Math.max(minimum, Math.min(maximum, Math.floor(numeric)));
    }

    getNetworkMapCollisionHash(rows) {
        if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(rows[0])) return '';
        const width = rows[0].length;
        if (!width || rows.some((row) => !Array.isArray(row) || row.length !== width)) return '';
        const toInteger = (value) => {
            const numeric = Number(value);
            return Number.isFinite(numeric) ? Math.max(0, Math.trunc(numeric)) : 0;
        };
        let hash = 2166136261;
        for (const row of rows) {
            for (const cell of row) {
                const values = [
                    toInteger(cell?.element ?? cell?.e),
                    toInteger(cell?.texture ?? cell?.textureValue ?? cell?.t),
                    toInteger(cell?.effect ?? cell?.fx),
                    toInteger(cell?.building ?? cell?.b),
                    typeof cell?.walkable === 'boolean' ? cell.walkable : null,
                    toInteger(cell?.height ?? cell?.maxZ ?? cell?.h)
                ];
                const value = values
                    .map((entry) => entry === null ? 'n' : String(entry))
                    .join(',');
                for (let index = 0; index < value.length; index++) {
                    hash ^= value.charCodeAt(index);
                    hash = Math.imul(hash, 16777619);
                }
                hash ^= 59;
                hash = Math.imul(hash, 16777619);
            }
        }
        return (hash >>> 0).toString(16).padStart(8, '0');
    }

    isValidMapRows(rows) {
        if (!Array.isArray(rows) || rows.length === 0 || rows.length > 128) return false;
        const width = this.getMapRowWidth(rows[0]);
        if (width <= 0 || width > 128) return false;
        return rows.every((row) => this.getMapRowWidth(row) === width);
    }

    decodeNetworkMap(data) {
        if (data?.matrixEncoding !== 'palette-height-v1' || !Array.isArray(data?.palette)) return null;
        const { palette, tileRows, elevationRows } = data;
        if (!Array.isArray(tileRows) || !Array.isArray(elevationRows) || tileRows.length === 0 ||
            tileRows.length !== elevationRows.length || tileRows.length > 128 || palette.length > NETWORK_PALETTE_ALPHABET.length) {
            return null;
        }
        const width = tileRows[0]?.length || 0;
        if (!width || width > 128 || tileRows.some((row) => typeof row !== 'string' || row.length !== width) ||
            elevationRows.some((row) => typeof row !== 'string' || row.length !== width)) {
            return null;
        }

        const decoded = [];
        for (let y = 0; y < tileRows.length; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const paletteIndex = NETWORK_PALETTE_ALPHABET.indexOf(tileRows[y][x]);
                const elevation = NETWORK_HEIGHT_ALPHABET.indexOf(elevationRows[y][x]);
                const entry = palette[paletteIndex];
                if (!Array.isArray(entry) || entry.length < 4 || elevation < 0) return null;
                const cell = {
                    element: entry[0],
                    texture: entry[1],
                    effect: entry[2],
                    building: entry[3],
                    height: elevation
                };
                if (typeof entry[4] === 'boolean') cell.walkable = entry[4];
                row.push(cell);
            }
            decoded.push(row);
        }
        return decoded;
    }

    getMapRowWidth(row) {
        if (typeof row === 'string') return row.trim().length;
        if (Array.isArray(row)) return row.length;
        return 0;
    }

    getRequestedMapSpawn(spawn) {
        const x = Number(spawn?.x);
        const y = Number(spawn?.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
        return { x, y };
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
