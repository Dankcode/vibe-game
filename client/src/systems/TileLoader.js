/**
 * Level-of-Detail tile streaming for large worlds
 * Loads tiles in chunks around player, unloads distant tiles
 */
export class TileLoader {
    constructor(scene, engine, config = {}) {
        this.scene = scene;
        this.engine = engine;

        // Chunk configuration
        this.CHUNK_SIZE = config.chunkSize || 16;      // 16x16 tiles per chunk
        this.LOAD_RADIUS = config.loadRadius || 3;     // Chunks to load around player
        this.UNLOAD_RADIUS = config.unloadRadius || 5; // Chunks to keep in memory

        // Tile storage
        this.chunks = new Map();        // "x,y" -> Chunk object
        this.tileCache = new Map();     // Tile key -> Phaser texture
        this.activeTiles = new Map();   // Grid coord -> Tile instance

        // Loading queue
        this.loadQueue = [];
        this.isLoading = false;

        // Current player chunk
        this.currentChunkX = 0;
        this.currentChunkY = 0;
    }

    /**
     * Initialize with map data
     */
    loadMap(mapData) {
        this.mapData = mapData;
        this.tileset = mapData.tileset; // Base URL for tile images

        // Preload common tiles
        this.preloadEssentialTiles();
    }

    /**
     * Update based on player position - call every frame or 500ms
     */
    update(playerGridX, playerGridY) {
        const chunkX = Math.floor(playerGridX / this.CHUNK_SIZE);
        const chunkY = Math.floor(playerGridY / this.CHUNK_SIZE);

        // Only update if player moved to new chunk
        if (chunkX !== this.currentChunkX || chunkY !== this.currentChunkY) {
            this.currentChunkX = chunkX;
            this.currentChunkY = chunkY;
            this.refreshChunks();
        }

        // Process load queue
        this.processLoadQueue();
    }

    /**
     * Load/unload chunks based on radius
     */
    refreshChunks() {
        const chunksToLoad = [];
        const loadedChunkKeys = new Set(this.chunks.keys());

        // Determine which chunks should be loaded
        for (let dx = -this.LOAD_RADIUS; dx <= this.LOAD_RADIUS; dx++) {
            for (let dy = -this.LOAD_RADIUS; dy <= this.LOAD_RADIUS; dy++) {
                const cx = this.currentChunkX + dx;
                const cy = this.currentChunkY + dy;
                const key = `${cx},${cy}`;

                if (!this.chunks.has(key)) {
                    chunksToLoad.push({ x: cx, y: cy, key });
                }
                loadedChunkKeys.delete(key);
            }
        }

        // Unload distant chunks
        loadedChunkKeys.forEach(key => {
            const chunk = this.chunks.get(key);
            if (chunk) {
                this.unloadChunk(chunk);
                this.chunks.delete(key);
            }
        });

        // Queue new chunks for loading (prioritize closest)
        chunksToLoad.sort((a, b) => {
            const distA = Math.abs(a.x - this.currentChunkX) + Math.abs(a.y - this.currentChunkY);
            const distB = Math.abs(b.x - this.currentChunkX) + Math.abs(b.y - this.currentChunkY);
            return distA - distB;
        });

        this.loadQueue.push(...chunksToLoad);
    }

    /**
     * Load a single chunk
     */
    async loadChunk(chunkX, chunkY) {
        const chunk = {
            x: chunkX,
            y: chunkY,
            tiles: [],
            objects: []
        };

        const startX = chunkX * this.CHUNK_SIZE;
        const startY = chunkY * this.CHUNK_SIZE;

        // Generate or fetch chunk data
        const chunkData = await this.fetchChunkData(chunkX, chunkY);

        // Create tiles
        for (let y = 0; y < this.CHUNK_SIZE; y++) {
            for (let x = 0; x < this.CHUNK_SIZE; x++) {
                const gridX = startX + x;
                const gridY = startY + y;
                const tileId = chunkData.tiles[y * this.CHUNK_SIZE + x];

                if (tileId !== 0) { // 0 = empty
                    const tile = this.createTile(gridX, gridY, tileId, chunkData.elevation?.[y * this.CHUNK_SIZE + x] || 0);
                    chunk.tiles.push(tile);
                    this.activeTiles.set(`${gridX},${gridY}`, tile);
                }
            }
        }

        // Create objects (trees, buildings)
        chunkData.objects?.forEach(obj => {
            const sprite = this.createObject(
                startX + obj.x,
                startY + obj.y,
                obj.type,
                obj.elevation || 0
            );
            chunk.objects.push(sprite);
        });

        this.chunks.set(`${chunkX},${chunkY}`, chunk);
    }

    /**
     * Create individual isometric tile
     */
    createTile(gridX, gridY, tileId, elevation) {
        /*
        const pos = this.engine.toScreen(gridX, gridY, elevation);
        const tileKey = `tile_${tileId}`;

        // Load texture if not cached
        if (!this.scene.textures.exists(tileKey)) {
            this.scene.load.image(tileKey, `${this.tileset}/${tileId}.png`);
            this.scene.load.start();
        }

        const tile = this.scene.add.image(pos.x, pos.y, tileKey);
        tile.setOrigin(0.5, 0.5); // Center bottom for iso
        tile.setDepth(pos.depth);
        tile.setData('grid', { x: gridX, y: gridY, z: elevation });

        // Add interaction
        tile.setInteractive();
        tile.on('pointerdown', () => {
            this.scene.events.emit('tile:click', { x: gridX, y: gridY, elevation });
        });

        return tile;
        */
        return null;
    }

    /**
     * Create 3D-style object (tree, building)
     */
    createObject(gridX, gridY, type, elevation) {
        const pos = this.engine.toScreen(gridX, gridY, elevation);

        // Objects are taller, use bottom alignment
        const sprite = this.scene.add.image(pos.x, pos.y, `obj_${type}`);
        sprite.setOrigin(0.5, 1); // Bottom center
        sprite.setDepth(pos.depth + 50); // Above ground
        sprite.setData('type', type);

        return sprite;
    }

    /**
     * Unload chunk and destroy sprites
     */
    unloadChunk(chunk) {
        chunk.tiles.forEach(tile => {
            const key = `${tile.getData('grid').x},${tile.getData('grid').y}`;
            this.activeTiles.delete(key);
            tile.destroy();
        });
        chunk.objects.forEach(obj => obj.destroy());
    }

    /**
     * Process loading queue (limit per frame for performance)
     */
    processLoadQueue() {
        if (this.isLoading || this.loadQueue.length === 0) return;

        const toLoad = this.loadQueue.splice(0, 2); // Load 2 chunks per frame max
        this.isLoading = true;

        Promise.all(toLoad.map(c => this.loadChunk(c.x, c.y))).then(() => {
            this.isLoading = false;
        });
    }

    /**
     * Fetch chunk data from server or generate procedurally
     */
    async fetchChunkData(cx, cy) {
        // Try server first
        try {
            const res = await fetch(`/api/map/chunk?x=${cx}&y=${cy}`);
            if (res.ok) return await res.json();
        } catch (e) {
            // Fall back to local map data or generation
        }

        // Return from local map data or generate
        return this.generateChunk(cx, cy);
    }

    /**
     * Procedural generation fallback
     */
    generateChunk(cx, cy) {
        const tiles = [];
        const elevation = [];

        for (let i = 0; i < this.CHUNK_SIZE * this.CHUNK_SIZE; i++) {
            // Simple noise-based generation
            const noise = Math.sin(cx * 12.9898 + cy * 78.233 + i) * 43758.5453;
            const normalized = noise - Math.floor(noise);

            tiles.push(normalized > 0.7 ? 1 : normalized > 0.3 ? 2 : 3); // Grass, dirt, water
            elevation.push(Math.floor(normalized * 3));
        }

        return { tiles, elevation, objects: [] };
    }

    /**
     * Get tile at grid coordinate (for pathfinding, combat)
     */
    getTile(gridX, gridY) {
        return this.activeTiles.get(`${gridX},${gridY}`);
    }

    /**
     * Preload essential tiles (grass, water, etc.)
     */
    preloadEssentialTiles() {
        const essentials = [1, 2, 3, 4, 5]; // Basic ground types
        essentials.forEach(id => {
            this.scene.load.image(`tile_${id}`, `${this.tileset}/${id}.png`);
        });
    }
}