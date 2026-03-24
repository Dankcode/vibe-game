import Phaser from 'phaser';

export class TileLoader {
    constructor(scene, engine, config = {}) {
        this.scene = scene;
        this.engine = engine;
        this.CHUNK_SIZE = config.chunkSize || 16;      
        this.LOAD_RADIUS = config.loadRadius || 3;     
        this.UNLOAD_RADIUS = config.unloadRadius || 5; 
        this.chunks = new Map();        
        this.tileCache = new Map();     
        this.activeTiles = new Map();   
        this.loadQueue = [];
        this.isLoading = false;
        this.currentChunkX = 0;
        this.currentChunkY = 0;
    }

    loadMap(mapData) {
        this.mapData = mapData;
        this.tileset = mapData.tileset;
        this.preloadEssentialTiles();
    }

    update(playerGridX, playerGridY) {
        const chunkX = Math.floor(playerGridX / this.CHUNK_SIZE);
        const chunkY = Math.floor(playerGridY / this.CHUNK_SIZE);
        if (chunkX !== this.currentChunkX || chunkY !== this.currentChunkY) {
            this.currentChunkX = chunkX;
            this.currentChunkY = chunkY;
            this.refreshChunks();
        }
        this.processLoadQueue();
    }

    refreshChunks() {
        const chunksToLoad = [];
        const loadedChunkKeys = new Set(this.chunks.keys());
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
        loadedChunkKeys.forEach(key => {
            const chunk = this.chunks.get(key);
            if (chunk) {
                this.unloadChunk(chunk);
                this.chunks.delete(key);
            }
        });
        chunksToLoad.sort((a, b) => {
            const distA = Math.abs(a.x - this.currentChunkX) + Math.abs(a.y - this.currentChunkY);
            const distB = Math.abs(b.x - this.currentChunkX) + Math.abs(b.y - this.currentChunkY);
            return distA - distB;
        });
        this.loadQueue.push(...chunksToLoad);
    }

    async loadChunk(chunkX, chunkY) {
        const chunk = {
            x: chunkX,
            y: chunkY,
            tiles: [],
            objects: []
        };
        const startX = chunkX * this.CHUNK_SIZE;
        const startY = chunkY * this.CHUNK_SIZE;
        const chunkData = await this.fetchChunkData(chunkX, chunkY);
        for (let y = 0; y < this.CHUNK_SIZE; y++) {
            for (let x = 0; x < this.CHUNK_SIZE; x++) {
                const gridX = startX + x;
                const gridY = startY + y;
                const tileId = chunkData.tiles[y * this.CHUNK_SIZE + x];
                if (tileId !== 0) {
                    const tile = this.createTile(gridX, gridY, tileId, chunkData.elevation?.[y * this.CHUNK_SIZE + x] || 0);
                    if (tile) {
                        chunk.tiles.push(tile);
                        this.activeTiles.set(`${gridX},${gridY}`, tile);
                    }
                }
            }
        }
        chunkData.objects?.forEach(obj => {
            const sprite = this.createObject(startX + obj.x, startY + obj.y, obj.type, obj.elevation || 0);
            chunk.objects.push(sprite);
        });
        this.chunks.set(`${chunkX},${chunkY}`, chunk);
    }

    createTile(gridX, gridY, tileId, elevation) {
        return null; // Implementation deferred
    }

    createObject(gridX, gridY, type, elevation) {
        const pos = this.engine.toScreen(gridX, gridY, elevation);
        const sprite = this.scene.add.image(pos.x, pos.y, `obj_${type}`);
        sprite.setOrigin(0.5, 1);
        sprite.setDepth(pos.depth + 50);
        sprite.setData('type', type);
        return sprite;
    }

    unloadChunk(chunk) {
        chunk.tiles.forEach(tile => {
            const key = `${tile.getData('grid').x},${tile.getData('grid').y}`;
            this.activeTiles.delete(key);
            tile.destroy();
        });
        chunk.objects.forEach(obj => obj.destroy());
    }

    processLoadQueue() {
        if (this.isLoading || this.loadQueue.length === 0) return;
        const toLoad = this.loadQueue.splice(0, 2);
        this.isLoading = true;
        Promise.all(toLoad.map(c => this.loadChunk(c.x, c.y))).then(() => {
            this.isLoading = false;
        });
    }

    async fetchChunkData(cx, cy) {
        try {
            const res = await fetch(`/api/map/chunk?x=${cx}&y=${cy}`);
            if (res.ok) return await res.json();
        } catch (e) {}
        return this.generateChunk(cx, cy);
    }

    generateChunk(cx, cy) {
        const tiles = [];
        const elevation = [];
        for (let i = 0; i < this.CHUNK_SIZE * this.CHUNK_SIZE; i++) {
            const noise = Math.sin(cx * 12.9898 + cy * 78.233 + i) * 43758.5453;
            const normalized = noise - Math.floor(noise);
            tiles.push(normalized > 0.7 ? 1 : normalized > 0.3 ? 2 : 3);
            elevation.push(Math.floor(normalized * 3));
        }
        return { tiles, elevation, objects: [] };
    }

    getTile(gridX, gridY) {
        return this.activeTiles.get(`${gridX},${gridY}`);
    }

    preloadEssentialTiles() {
        const essentials = [1, 2, 3, 4, 5];
        essentials.forEach(id => {
            this.scene.load.image(`tile_${id}`, `${this.tileset}/${id}.png`);
        });
    }
}
