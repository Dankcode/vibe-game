# Project Context

## Tech Stack
- Frontend: Phaser game Engine using JS 
- Database: multiple
- Auth: Clerk

## Architecture、
mmorpg-isometric/
├── client/                 # Phaser 3 game
│   ├── src/
│   │   ├── scenes/
│   │   │   ├── BootScene.js
│   │   │   ├── WorldScene.js      # Main isometric world
│   │   │   └── CombatScene.js     # Turn-based battle
│   │   ├── systems/
│   │   │   ├── IsometricEngine.js # Core iso projection
│   │   │   ├── TileLoader.js      # LOD tile streaming
│   │   │   ├── MapEditor.js       # Dynamic map building
│   │   │   └── CombatSystem.js    # Turn-based logic
│   │   ├── entities/
│   │   │   ├── IsoSprite.js       # Isometric sprite base
│   │   │   ├── Player.js
│   │   │   ├── NPC.js
│   │   │   └── Tile.js
│   │   ├── data/
│   │   │   └── TileRegistry.js    # Tile definitions
│   │   └── main.js
│   ├── assets/
│   │   ├── tiles/           # Individual tile images
│   │   ├── sprites/
│   │   └── backgrounds/     # 3D-style backdrop layers
│   ├── index.html
│   └── package.json
├── server/                  # Colyseus (recommended)
│   ├── src/
│   │   ├── rooms/
│   │   │   ├── WorldRoom.js       # Overworld sync
│   │   │   └── CombatRoom.js      # Turn-based battles
│   │   ├── schemas/
│   │   │   ├── PlayerState.js 
│   │   │   ├── TileMapState.js 
│   │   │   └── CombatState.js 
│   │   └── index.js 
│   ├── package.json
│   └── tsconfig.json
└── shared/                  # Shared types & map data
    ├── maps/
    │   ├── starting-village.json
    │   └── dark-forest.json
    └── types/
        └── index.js
## Core Goal
A Phaser 2.5 isometric game using 2d sprites and  similar to older games. This game utilizes a turnbase combat mechanic similar to the old wonderland online mmorpg previously published by IGG. This game will use 2d tiles that would make the game look 3d. The tiles will be loaded in individually when loading and moving past the LOD. The tiles system will allow me to create new maps easier. 

## Elemental Tile System
The game implements an elemental system (similar to Genshin Impact) for its world blocks.
- **Elements**: 1: GEO (Ground), 2: HYDRO (Water), 3: ANEMO (Sand/Air), 4: CRYO (Ice), 5: PYRO (Fire).
- **Texture Variants**: Each block maintains its element but can have different `textureValue` for visual variations (e.g., Water can be `2` for normal or `4` for brackish).
- **Modification**: Tiles can be dynamically modified (e.g., Hydro tiles turning to Cryo when ice is applied).