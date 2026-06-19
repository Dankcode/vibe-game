# Project Context

## Current Game

Vibe Game is a 3.5D isometric MMORPG prototype. The client renders a voxel-like block world with Three.js, uses DOM overlays for compact HUD panels, and syncs player state through a Colyseus backend. Characters and wildlife are entities layered above the block map; combat rooms exist as future infrastructure but wildlife is currently non-combat.

## Stack

- Client: Vite, plain JavaScript modules, Three.js.
- UI: DOM overlay in `client/index.html`; WebGL is only the playfield.
- Networking: Colyseus.js client to a Node.js Colyseus server on port `2567`.
- Backend: Node.js/CommonJS Colyseus rooms and schemas.
- Shared data: map and type stubs in `shared/`; active runtime map data currently lives in `client/src/data/MapData.js`.

## Important Files

- `client/src/main.js`: boots `Game`.
- `client/src/Game.js`: owns top-level client orchestration, networking, HUD updates, camera follow, local player, remote player avatars, and wildlife updates.
- `client/src/systems/ThreeManager.js`: Three.js scene, camera, renderer, resize, raycasting, path line rendering.
- `client/src/systems/InputManager.js`: keyboard, mouse, wheel, and canvas-relative pointer coordinates.
- `client/src/systems/WorldGenerator.js`: array map loading, block creation, surface map, chunk indexes, walkability, habitat checks.
- `client/src/systems/Pathfinder.js`: A* pathing over walkable surface tiles.
- `client/src/systems/WildlifeSystem.js`: spawns wildlife only on compatible habitat tiles.
- `client/src/ui/AdminPanel.js`: collapsed admin drawer for random world generation, array map editing, and combat entry.
- `client/src/scenes/CombatScene.js`: client-side turn-combat overlay and Colyseus combat-room bridge.
- `client/src/entities/Tile.js`: block mesh creation, cached geometry/materials, procedural tile texture generation.
- `client/src/entities/PlayerAvatar.js`: current player rendering and movement. Uses the LPC Human Male walk sheet on a Three.js billboard plane.
- `client/src/entities/PlayerGirl2.js`: legacy unused sprite implementation; do not wire new work to it.
- `client/src/entities/Wildlife.js`: first small wildlife mob, `MeadowHare`.
- `client/src/data/TileRegistry.js`: tile definitions, element ids, walkability, habitats, and material metadata.
- `client/src/data/MapData.js`: array-authored main map, legend, chunk size, wildlife spawns.
- `server/src/rooms/WorldRoom.js`: multiplayer room, player movement sync, chunk-entry tracking and chunk message contract.
- `server/src/systems/WorldSurface.js`: backend map surface resolver. Converts player center coordinates into authoritative block/tile coordinates.
- `server/src/rooms/CombatRoom.js`: co-op turn-based combat room; all party members submit actions before round resolution.
- `server/src/schemas/PlayerState.js`: networked player fields, including current tile and chunk.
- `server/src/schemas/CombatState.js`: shared combat actor and encounter state.
- `.agent/rules.md`: working rules future processes should follow.

## Runtime Shape

The renderer is intentionally not fullscreen-only. The browser page contains a `.game-shell` that caps the desktop viewport and uses fullscreen dimensions on small screens. `ThreeManager` sizes the WebGL renderer from `#three-game`, not `window`, and `InputManager` calculates raycast pointer coordinates from the canvas bounds. Preserve that relationship when changing layout.

Normal play should keep the center of the playfield open. Use DOM for HUD, menus, inventory, quest logs, and diagnostics. Do not push text-heavy UI into Three.js unless the UI must exist as a world object.

The admin panel is collapsed behind the top-right `Admin` button. It may cover part of the playfield only while actively editing. Keep future admin/debug tools in that drawer or a similarly explicit overlay.

The active player renderer is a single textured Three.js plane per avatar. The current asset is `client/public/assets/characters/lpc-human-male/Walk.png`, sourced from OpenGameArt's "LPC Character Bases." Keep `ASSET_LICENSE.md` and `Attribution.txt` with the asset.

## Coordinate System

- Game grid coordinates are `(gridX, gridY, gridZ)`.
- Three.js coordinates map to `(x, y, z) = (gridX, gridZ, gridY)`.
- One block is `1 x 1 x 1` world unit.
- Elevation is the highest block in a tile column.
- The camera is a fixed Three.js perspective follow camera with a low map-view angle. Q/E camera rotation is intentionally disabled for now; do not re-add rotation controls until movement, pathing, and UI prompts are updated together.

## Map And Block Model

The map must remain array-authored so it can scale by chunks:

- `MAIN_MAP` is an array of row strings.
- `MAP_LEGEND` maps each row character to a block definition.
- Each character in a map row is one tile column.
- Each tile column expands into an array of stacked blocks from `z = 0` through `maxZ`.
- `WorldGenerator.tileMap` stores individual blocks by `"x,y,z"`.
- `WorldGenerator.surfaceMap` stores only the top block by `"x,y"` for movement, habitat, and UI.
- `WorldGenerator.chunkMap` groups block keys by chunk key `"chunkX,chunkY"`.
- `MAP_CHUNK_SIZE` is currently `16`.

Current map symbols:

- `W`: deep water, non-walkable.
- `B`: brackish/marsh water, non-walkable.
- `S`: sand/shore, walkable.
- `G`: grassland, walkable meadow.
- `F`: forest floor, walkable but slightly slower.
- `H`: hill, walkable if height rules allow entry.
- `M`: mountain, walkable if height rules allow entry.
- `P`: snow peak, walkable if height rules allow entry.
- `I`: ice lake/snowfield, walkable cold terrain.
- `L`: lava, non-walkable.
- `R`: village road/plaza, walkable and slightly faster.
- `T`: town/building wall, non-walkable.
- `X`: stone/blocking wall, non-walkable.

Future large maps should add or stream more chunk arrays instead of building one huge monolithic world payload. The backend should send chunk metadata or compact block arrays, not every block for every connected player on every tick.

Random generation should stay mathematical and deterministic from a seed. The current pipeline builds terrain in phases: feature hints, height field, temperature, moisture, coast, ridge/mountain placement, river carving, village-site scoring, then settlement stamping. This shape is intended to accept future map/API hints such as `seaLevel`, `moistureBias`, `temperatureBias`, `volcanicBias`, or `ridgeAngle` without changing the array/chunk contract.

The admin panel edits map rows directly. It accepts only known legend symbols and requires all rows to have the same width. `Randomize World` creates a new array map with `createRandomMapRows()` and applies it through `Game.applyWorldMap()`.

## Tile And Habitat Rules

Tile behavior lives in `client/src/data/TileRegistry.js`.

- `GEO`: walkable grassland, supports `meadow` and `forest-edge`.
- `ANEMO`: walkable sand, supports `shore`.
- `CRYO`: walkable ice, supports `snow`.
- `HYDRO`: not walkable, supports `shore` only for edge logic.
- `PYRO`: not walkable, no wildlife habitat.
- `VOID`: not walkable.

Use `worldGenerator.canMoveBetween(fromX, fromY, toX, toY, isDiagonal)` for movement, `worldGenerator.isWalkable(x, y)` for simple tile eligibility, and `worldGenerator.supportsHabitat(x, y, habitat)` for wildlife placement. Do not duplicate tile rules in entities.

Movement collision uses the player center point rounded to the active tile column. Keyboard movement is camera-relative, but still resolves against grid columns. Diagonal moves may not cut through blocked corners; both adjacent orthogonal columns must be occupiable before the diagonal is allowed. The server mirrors this rule in `WorldSurface` when resolving player centers.

## Current Wildlife

The first wildlife mob is a small non-combat `MeadowHare`.

- Spawn data lives in `WILDLIFE_SPAWNS`.
- The system validates the requested tile and moves the spawn to the nearest compatible habitat if needed.
- The hare wanders within a leash radius and does not trigger combat yet.
- Combat behavior should be layered later as a new AI/combat state, not mixed into the base wandering model.

## Multiplayer And MMO Direction

The backend currently syncs player center position, tile position, and chunk position. `WorldRoom` also emits chunk-init and chunk-entered messages and accepts `world:chunk:request`. This is preparation for server-authoritative chunk streaming and interest management.

Player location authority:

- Client sends `centerX`, `centerY`, `centerZ` in `player:move`.
- Server quantizes and rate-limits movement input.
- Server resolves the center point through `WorldSurface.resolveCenter()`.
- Server derives `tileX`, `tileY`, and `tileZ`; clients should not treat client-provided tile fields as authority.
- `x/y/z` remain as compatibility mirrors, but new work should use `centerX/centerY/centerZ`.

Near-term MMO work should focus on:

- server-authoritative movement validation against shared tile data,
- chunk streaming from shared map data,
- player interest management by nearby chunks,
- server-owned wildlife/NPC state,
- compact world deltas instead of full map broadcasts,
- no per-frame or per-move backend logging in hot paths.

## Co-op Combat Direction

Combat is a separate scene and room, not a mode embedded directly into world movement.

- Client overlay: `CombatScene`.
- Server room: `CombatRoom`, defined as `combat`.
- Flow: players join the same encounter, each submits `attack`, `guard`, or `ready`, then the server resolves the round.
- Current enemy: demo `Meadow Hare` actor.
- Current math: attacks deal fixed damage and the enemy counterattacks one living party member.
- Next combat pass should connect wildlife encounters to combat entry, add ability definitions, and move action validation fully server-side.

## Known Caveat

The local instructions reference an `rtk` shell proxy, but `rtk` is not available in the current shell. Use it when installed; otherwise use normal shell commands and keep outputs concise.
