const Colyseus = require('colyseus');
const PlayerState = require('../schemas/PlayerState');
const TileMapState = require('../schemas/TileMapState');

class WorldRoom extends Colyseus.Room {
    onCreate(options) {
        // Set the room state
        this.setState(new TileMapState());

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

        // Set initial position (can be configurable)
        player.x = options.x || 0;
        player.y = options.y || 0;
        player.z = options.z || 0;

        // Add some default items for testing
        player.inventory.set('coins', 0);
        player.inventory.set('health_potions', 3);
        player.inventory.set('gems', 5);

        // Add player to state
        this.state.players.set(client.sessionId, player);

        console.log(`[WorldRoom] Player ${player.userId} spawned at (${player.x}, ${player.y}, ${player.z})`);
    }

    onLeave(client, consented) {
        console.log(`[WorldRoom] Client ${client.sessionId} left (consented: ${consented})`);

        // Remove player from state
        if (this.state.players.has(client.sessionId)) {
            const player = this.state.players.get(client.sessionId);
            console.log(`[WorldRoom] Player ${player.userId} removed`);
            this.state.players.delete(client.sessionId);
        }
    }

    setupMessageHandlers() {
        // Handle player position updates
        this.onMessage('player:move', (client, data) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                if (data.x !== undefined) player.x = data.x;
                if (data.y !== undefined) player.y = data.y;
                if (data.z !== undefined) player.z = data.z;

                console.log(`[WorldRoom] Player ${player.userId} moved to (${player.x}, ${player.y}, ${player.z})`);
            }
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
}

module.exports = WorldRoom;
