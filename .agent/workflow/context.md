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
- `client/src/ui/AdminPanel.js`: collapsed Map drawer for fantasy-world teleporting, collision debug, and combat entry.
- `client/src/scenes/CombatScene.js`: client-side turn-combat overlay and Colyseus combat-room bridge.
- `client/src/entities/Tile.js`: block mesh creation, cached geometry/materials, procedural tile texture generation.
- `client/src/entities/PlayerAvatar.js`: current player rendering and movement. Uses the LPC Human Male walk sheet on a Three.js billboard plane.
- `client/src/entities/PlayerGirl2.js`: legacy unused sprite implementation; do not wire new work to it.
- `client/src/entities/Wildlife.js`: first small wildlife mob, `MeadowHare`.
- `client/src/data/TileRegistry.js`: tile definitions, element ids, walkability, habitats, and material metadata.
- `client/src/data/TileLibrary.js`: tile-cell object contract, texture/building ids, shorthand symbol conversion, map legend compatibility, normalization helpers, and `voxel-matrix-v1` column expansion.
- `client/src/data/MapData.js`: array-authored main map generation, chunk size, wildlife spawns.
- `client/src/data/FantasyWorldData.js`: compatibility API for the active fantasy-world source. It adapts the imported active map package into deterministic borough/town map windows.
- `client/src/data/ActiveWorldData.js`: generated compact Andia data module created from the provided map package manifest, world JSON, and `towns/burg-*.json` files.
- `client/public/assets/maps/active-world-map.png`: exported Andia PNG used by the Map panel as the clickable world-map image.
- `tools/import_world_map_package.mjs`: generic map-package importer. It copies the PNG map asset, compacts all borough JSON into `ActiveWorldData.js`, preserves the `80 x 60` local town grid, scales building footprints by `3x`, keeps ordinary roads narrow, preserves building interior/floor/room metadata, and emits compact elevation rows.
- `tools/import_hodinia_map.mjs`: older Hodinia-specific importer retained for reference/backfill only; new active imports should use `tools/import_world_map_package.mjs`.
- `client/src/generation/AzgaarTownGenerator.js`: deterministic small-town site scoring, route carving, names, and building blueprints.
- `tools/compile_magic_voxels.mjs`: Node.js Magic Voxel compiler. It creates the standard world layout JSON, compiles deterministic local windows, and writes base64 `Uint16Array`/`Uint8Array` chunk payloads for client streaming.
- `shared/magic-voxels/`: generated Magic Voxel layout, manifest, and chunk payload output directory.
- `server/src/rooms/WorldRoom.js`: multiplayer room, player movement sync, chunk-entry tracking and chunk message contract.
- `server/src/systems/WorldSurface.js`: backend voxel-matrix surface resolver. Converts player center coordinates into authoritative block/tile coordinates.
- `server/src/rooms/CombatRoom.js`: co-op turn-based combat room; all party members submit actions before round resolution.
- `server/src/schemas/PlayerState.js`: networked player fields, including current tile and chunk.
- `server/src/schemas/CombatState.js`: shared combat actor and encounter state.
- `.agent/rules.md`: working rules future processes should follow.

## Runtime Shape

The renderer is intentionally not fullscreen-only. The browser page contains a `.game-shell` that caps the desktop viewport and uses fullscreen dimensions on small screens. `ThreeManager` sizes the WebGL renderer from `#three-game`, not `window`, and `InputManager` calculates raycast pointer coordinates from the canvas bounds. Preserve that relationship when changing layout.

Normal play should keep the center of the playfield open. Use DOM for HUD, menus, inventory, quest logs, and diagnostics. Do not push text-heavy UI into Three.js unless the UI must exist as a world object.

The admin panel is collapsed behind the top-right `Admin` button. It may cover part of the playfield only while actively editing. Keep future admin/debug tools in that drawer or a similarly explicit overlay.

The active player renderer is a single textured Three.js plane per avatar. `PlayerAvatar` currently draws its own lightweight chibi/anime-style sprite sheet to a canvas at runtime, so avatar visuals do not depend on an external walk sheet for normal play. Legacy LPC files may still exist in `client/public/assets/characters/lpc-human-male/`; keep their attribution files if those assets remain in the repo.

Avatar billboards and their floor shadows are depth-aware. `PlayerAvatar.setTileOcclusionEnabled(true)` keeps the 2D character and shadow clipped by foreground 3D tiles when the player is actually behind terrain. A faint `GreaterDepth` occlusion copy draws only the hidden parts of the avatar/shadow so players can still navigate behind foreground blocks. Keep collision debug rings exempt from depth so the admin `Collision Area` overlay remains readable while diagnosing movement.

## Coordinate System

- Game grid coordinates are `(gridX, gridY, gridZ)`.
- Three.js coordinates map to `(x, y, z) = (gridX, gridZ, gridY)`.
- One block is `1 x 1 x 1` world unit.
- Elevation is the highest block center in a tile column. The visible top surface is `elevation + Tile.topOffset`; use `worldGenerator.getSurfaceWorldY()` or `getTopSurfaceOffset()` for render anchors instead of placing shadows/collision planes directly at `gridZ`.
- The camera is a fixed Three.js perspective follow camera with a low map-view angle. Q/E camera rotation is intentionally disabled for now; do not re-add rotation controls until movement, pathing, and UI prompts are updated together.

## Map And Block Model

The map must remain array-authored so it can scale by chunks:

- `MAIN_MAP` is authored as a 2D array of tile-cell objects, then normalized into `voxel-matrix-v1` before gameplay or rendering decisions.
- A tile cell is `{ element, texture, effect, building, height }`.
- `element` is the hard magic/base behavior id: `0 VOID`, `1 GEO/Earth`, `2 HYDRO/Water`, `3 ANEMO/Wind`, `4 CRYO/Ice`, `5 PYRO/Fire`, `6 STRUCTURE`.
- `texture` selects the visual texture variant within that element's tile library.
- `effect` is the active elemental overlay/aura on top of the tile; use `0` when the tile has no active effect.
- `building` is `0` for no building and otherwise identifies building semantics such as wall, door, floor, stairs, or roof.
- `height` is the top block elevation for that tile column.
- Each tile cell expands into a z-indexed voxel column from `z = 0` through `height`.
- `TileLibrary.js` is the source of truth for tile-cell ids, symbol shorthand conversion, map legend compatibility, normalization, voxel-column expansion, and top-voxel extraction.
- Legacy row symbols and compact cells such as `[element, texture, effect, building, height]` are accepted only as authoring/network shorthand and must normalize into a voxel matrix before gameplay systems use them.
- `WorldGenerator.voxelMatrix` and `WorldGenerator.voxelColumnMap` are the simulation-side map representation.
- `WorldGenerator.tileMap` stores individual rendered block adapters by `"x,y,z"`.
- `WorldGenerator.surfaceMap` is a derived top-voxel index by `"x,y"` for movement, habitat, and UI.
- `WorldGenerator.chunkMap` groups block keys by chunk key `"chunkX,chunkY"`.
- `MAP_CHUNK_SIZE` is currently `16`.

The streaming/runtime target is the Magic Voxel format:

- `magic-voxel-layout-v1` is the JSON template API for the world generator. It contains macro continental metadata, a base64 `Uint16Array` heightmap, burg coordinates, route metadata, and the chunk/memory specification.
- The village generator ingests that layout payload through `tools/compile_magic_voxels.mjs`, chooses a burg or world coordinate, scales the selected map window at `1 world coordinate = 1 local tile`, and compiles the resulting tile rows into `1:1` local voxel matrices.
- `magic-voxel-chunk-v1` chunks are dense `16 x 16 x 256` buffers. The memory index is `((localY * 16) + localX) * 256 + z`, keeping every vertical column contiguous for fast Three.js instancing and obstruction checks.
- Each compiled chunk stores `blockId` as `Uint16Array`, plus `elementalMatrix` and `metadataFlags` as `Uint8Array`. All three are serialized as base64 strings so clients can hydrate typed arrays directly.
- `blockId` maps through the chunk `blockRegistry`; `0` is air. The registry records element, texture, building part, label, walkability, and material pattern for each structural/visual assignment.
- `elementalMatrix` packs Fire, Water, Earth, Wind, Holy, and Dark traits. `metadataFlags` packs solid, walkable surface, liquid, stair connector, interior, roof, and `OBSTRUCTION_HIDING` bits. `OBSTRUCTION_HIDING` is the canonical marker for upper terrain, wall, and roof voxels that may be culled around lower-bound entity positions.

Current editor shorthand symbols:

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
- `A`: stone building wall, non-walkable.
- `C`: timber building wall, non-walkable.
- `N O J K`: north/south/west/east stone window-wall columns.
- `Q V Y Z`: north/south/west/east timber window-wall columns.
- `D`: functional doorway, a floor-height walkable `STRUCTURE` opening.
- `E`: interior building floor, walkable `STRUCTURE`.
- `U`: generic stairs, walkable `STRUCTURE`.
- `1 2 3 4`: north/south/west/east stone stairs.
- `5 6 7 8`: north/south/west/east timber stairs.

Future large maps should add or stream more chunk arrays instead of building one huge monolithic world payload. The backend should send chunk metadata, compact tile-cell arrays, voxel matrix columns, or deltas, not every block for every connected player on every tick.

World generation stays deterministic from the imported Andia fantasy-map data. The active compact pipeline is inspired by Azgaar's Fantasy Map Generator: keep map-level places and routes as data, output a standardized Magic Voxel layout JSON, convert a selected borough from its provided `80 x 60` source town grid into the same bounded `80 x 60` runtime grid, stamp serializable voxel building blueprints from the town JSON, normalize the tile-cell rows into voxel matrices, then compile dense Magic Voxel chunks for runtime streaming. `FantasyWorldData.js` is the compatibility source; `ActiveWorldData.js` is the generated compact data payload.

The default world should remain mostly flat for smoother travel. Water, shore, grass, forest floor, roads, doors, floors, and stairs share the base plane so water can sit directly beside sand without needing to be one block lower. `H`, `M`, and `P` still create elevation, but generation should keep them sparse and smoothed rather than scattered as spotted single-tile bumps.

The Map panel no longer edits or randomizes tile arrays. It shows the exported active-world PNG, overlays route polylines and clickable borough markers from the map package coordinate space, then teleports by rebuilding the selected borough's deterministic town JSON voxel window.

Building stamping lives in `client/src/data/BuildingData.js`. The town generator emits varied stone/timber blueprints on coordinated dry lots around the selected plaza. `stampBuildingsOnRows()` stamps congruent walls, directional window columns, reachable doors, floors, and style-matched stairs before `TileLibrary.js` converts the result into tile-cell arrays. Generated tile-row arrays carry their building blueprints so `Game` can register matching runtime roofs, furniture, and cutaway state.

Doors have three blueprint-backed texture styles: oak, iron, and painted. Door cells normalize back to the single-tile building floor plane so movement passes through an actual opening. `WorldGenerator` renders the styled hinged panel, jambs, lintel, threshold, and matching material accents from the building blueprint.

One building floor is two wall blocks high. `WorldGenerator.generateFromArray()` expands a wall cell into a ground block plus two structure blocks. Window columns expand into a lower block with wall below glass and an upper block with glass below wall, both using the same stone or timber texture as the surrounding wall. Roofs are flat grids of roof blocks with low perimeter parapets; do not add triangular or gabled roofs for the current visual direction.

Building blueprints use `stories` from `1` through `3`. Wall height is `stories * 2`, and window lower/upper halves repeat for every floor. Door tiles remain walkable at ground level as one-tile floor openings; runtime door frames provide the visible jamb/lintel boundary without adding hidden wall blockers above the doorway. The default Hall and Watch House are three floors, and seeded random towns always include multi-floor civic buildings while other buildings may use one, two, or three floors.

Building stairs are three-step block wedges contained inside one tile with a visible stairwell opening and rail. Their north/south/east/west metadata controls visual orientation; players may enter and leave a stair tile from any direction. Each stair connector may bridge exactly one 2-voxel story. Stone and timber stairs use separate tile-library variants congruent with their building style.

Building cutaways preserve the first wall course at all times because the player is approximately two blocks tall and needs a visible boundary/door frame. Door panels open while the player is close to the doorway and close again after the player has moved through. When the player is inside, the entire roof hides together with only the upper course of the two perimeter edges nearest the camera. When a whole building lies between the camera and an outside player, its entire roof and upper wall course hide across all four edges. Floors and lower wall blocks never hide.

Settlements come from Andia borough JSON rather than one repeated town template. Streets, walls, farms, terrain, elevation bands, and building rectangles come from each `towns/burg-*.json` file. Runtime building blueprints keep the current house format: rectangular stone/timber walls, door cells, story counts, optional interior stairs, and flat roof/cutaway behavior. Source building rectangles are scaled by `3x` so small `2 x 2` generator houses become walkable `6 x 6` interiors for the roughly `1 x 1 x 2` player. Ordinary roads remain narrow and are not globally scaled with buildings.

Imported town elevation is carried as compact digit rows. `MapData.js` decodes those rows into tile-cell heights before story expansion, and `BuildingData.js` adds walls and upper floors on top of each building's `baseElevation`. This lets some city buildings sit on higher terraces while others stay lower, while keeping the full world bounded to the selected town grid.

Outdoor ground blocks use elevation-banded texture lighting. Base-level GEO, ANEMO, and CRYO blocks receive a darker tone, while blocks at increasing world height become significantly lighter. This is encoded in cached tile materials and must not affect structure, furniture, roof, water, lava, or interior building tiles.

Outdoor terrain cutaways follow the same preserved-first-layer rule as buildings. When raised terrain overlaps the character from the camera direction, every obstructing terrain voxel above the player's visible base course may hide, but elevation `0` is never cut away. Generated, randomized, and imported array maps all receive this rule because it operates on normalized voxel columns, not on default-map symbols.

## Tile And Habitat Rules

Tile behavior lives in `client/src/data/TileRegistry.js`.

- `GEO`: walkable grassland, supports `meadow` and `forest-edge`.
- `ANEMO`: walkable sand, supports `shore`.
- `CRYO`: walkable ice, supports `snow`.
- `HYDRO`: not walkable, supports `shore` only for edge logic.
- `PYRO`: not walkable, no wildlife habitat.
- `STRUCTURE`: walkability depends on texture/building part; doors, floors, and stairs are walkable while walls are not.
- `VOID`: not walkable.

Use `worldGenerator.canMoveBetween(fromX, fromY, toX, toY, isDiagonal)` for movement, `worldGenerator.isWalkable(x, y)` for simple tile eligibility, and `worldGenerator.supportsHabitat(x, y, habitat)` for wildlife placement. Do not duplicate tile rules in entities.

Movement collision uses the player center point plus a small foot-radius footprint around the shadow. Keyboard movement is camera-relative, but still resolves against grid columns. Diagonal moves may not cut through blocked corners; both adjacent orthogonal columns must be occupiable before the diagonal is allowed. Ordinary movement climbs at most one voxel; stair surfaces may bridge one 2-voxel story. The server mirrors the center-point rule in `WorldSurface`; the client adds the stricter footprint check so the visible feet do not clip across block edges.

The admin panel has a `Collision Area` toggle. It shows a green ring at each avatar's foot/shadow anchor on top of the current tile surface so movement bugs can be debugged visually.

`WorldGenerator.updatePlayerSightCutaway()` hides a small set of foreground top-block meshes between the camera and local player, using the same visibility-flag style as building cutaways. This replaces the previous xray topography overlay because the overlay was too visually intrusive during normal movement.

Hidden navigation should rely on cutaway visibility, not filled walkable highlights or persistent xray volumes. Movement legality still comes from `WorldGenerator`.

The client spawns or repositions the local player near the generated town center first, then falls back to the highest or first walkable surface. This keeps the compact default and randomized maps immediately focused on the town.

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

Client rendering uses bounded visibility around the player via `WorldGenerator.updateVisibleTilesAround()` so large worlds do not render every tile column every frame. Keep new world decoration compatible with this visibility pass.

## Co-op Combat Direction

Combat is a separate scene and room, not a mode embedded directly into world movement.

- Client overlay: `CombatScene`.
- Server room: `CombatRoom`, defined as `combat`.
- Flow: players join the same encounter, each submits `attack`, `guard`, or `ready`, then the server resolves the round.
- Current enemy: demo `Meadow Hare` actor.
- Current math: attacks deal fixed damage and the enemy counterattacks one living party member.
- Next combat pass should connect wildlife encounters to combat entry, add ability definitions, and move action validation fully server-side.

## Known Caveat

The local shell uses the `rtk` proxy required by the repository instructions. Prefix project shell commands with `rtk`.
