# Project Context

## Tech Stack
- Frontend: Three.js using Javascript
- Communications: Colyseus.js (WebSockets)
- Backend: Node.js with Colyseus
- Database: multiple (Auth, Player stats, World state)
- Auth: Clerk

## Architecture
vibe-game/
├── client/                     # Three.js Frontend
│   ├── src/
│   │   ├── main.js             # Entry point (initializes Game)
│   │   ├── Game.js             # Core controller (networking + main loop)
│   │   ├── entities/
│   │   │   ├── PlayerGirl2.js  # Character rendering (THREE.Sprite)
│   │   │   └── Tile.js         # 3D Cube rendering (THREE.Mesh)
│   │   ├── systems/
│   │   │   ├── ThreeManager.js # Scene management (Camera, Renderer, Lighting)
│   │   │   ├── InputManager.js # Keyboard input handling (WSAD)
│   │   │   └── WorldGenerator.js # Procedural cube generation logic
│   │   └── data/
│   │       └── TileRegistry.js # Tile and element constants (GEO, HYDRO, etc.)
│   ├── assets/                 # Textures, Sprites, and JSON atlases
│   └── package.json            # Client dependencies (Three.js, Colyseus.js)
├── server/                     # Colyseus Backend
│   ├── src/
│   │   ├── rooms/
│   │   │   ├── WorldRoom.js    # Multiplayer sync (positions, movement)
│   │   │   └── CombatRoom.js   # (Planned) Turn-based battle room
│   │   ├── schemas/
│   │   │   ├── PlayerState.js  # Player sync fields (x, y, z, userId, inventory)
│   │   │   └── TileMapState.js # Global player list and world state
│   │   └── index.js            # Server entry and room definition
│   └── package.json            # Server dependencies (Colyseus, Express)
└── shared/                     # Shared Logic/Types
    ├── maps/                   # Legacy/JSON map definitions
    └── types/                  # Shared data structures

## Core Goal
A 3.5D isometric experience using Three.js with 3D cube blocks (voxels) and 2D character sprites (billboarding). The game features a procedural world generator using stacked cubes to create tiered elevation. The engine is designed to support multiplayer sessions where players can move and interact across a shared grid.

## Coordinate System
- **Grid Mapping**: Phaser's `(x, y, z)` maps to Three.js `(gridX, gridZ, gridY)` where `gridZ` is vertical elevation.
- **Scaling**: Each cube tile is exactly 1x1x1 units in world space.
- **Camera**: OrthographicCamera positioned at `(20, 20, 20)` with `lookAt(0,0,0)` to simulate an isometric projection.

## Elemental Tile System
The world uses an elemental system for its blocks (GEO, HYDRO, ANEMO, CRYO, PYRO).
- **Modification**: Individual tiles can be dynamically updated (e.g., Water blocks freezing into Ice blocks).
- **Rendering**: Tile properties (`textureValue`, `element`) influence the material colors and textures of the cubes.