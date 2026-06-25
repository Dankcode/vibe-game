# Project Rules

## Working Rules

- Read `.agent/workflow/context.md` before making gameplay, map, UI, or server changes.
- The repo uses JavaScript modules on the client and CommonJS on the server. Match the local module style.
- Prefer focused edits. Do not remove files, functions, comments, or existing user work unless the user explicitly asks.
- Use camelCase for variables/functions and PascalCase for classes.
- Wrap network/API work in `try/catch` and log useful, player-friendly errors.
- If `rtk` is installed, prefix shell commands with `rtk`. If it is missing, continue with normal commands and mention the fallback.

## Game Architecture Rules

- Keep simulation state outside Three.js objects. Three.js meshes are render adapters.
- Keep the map array-driven. The active map format is a 2D array of tile-cell objects; each cell represents one tile column and expands into stacked block arrays.
- A tile cell must use the hard magic data contract `{ element, texture, effect, building, height }`. Legacy row symbols may exist only as editor shorthand and must normalize through `TileLibrary.js` before gameplay systems use them.
- Use `WorldGenerator` for block lookup, elevation, walkability, habitat, and chunk indexing.
- Do not duplicate tile behavior inside players, wildlife, pathfinding, or UI. Add behavior to `TileRegistry.js`.
- Use `surfaceMap` for movement and habitat decisions. Use `tileMap` only when a specific block at `x,y,z` is required.
- Use chunk keys for scalable map work: `chunkX,chunkY`, with `MAP_CHUNK_SIZE` currently `16`.
- Backend hot paths must avoid per-move spam logs and full-map payloads.
- Backend player location authority must start from the player center point and derive the block/tile fields server-side.

## Movement And Interaction Rules

- Player movement must be delta-time based.
- Manual movement and click-to-path must both use `worldGenerator.canMoveBetween`; `isWalkable` is only a tile eligibility helper.
- Keyboard movement should be camera-relative while collision remains grid/tile based.
- Client-side avatar movement should also check a foot-radius footprint so the visible sprite and shadow do not clip over tile edges before the center point crosses.
- A player cannot climb a target tile that is 2 or more blocks higher than the current tile.
- Diagonal movement cannot cut through blocked corners. Both adjacent orthogonal tiles must be occupiable.
- Pointer/raycast coordinates must be calculated from the canvas bounds, not the window bounds.
- Camera follow and zoom belong in `ThreeManager`; gameplay movement belongs in entity or simulation classes.
- Do not restore Q/E camera rotation until the movement mapping and player-facing controls are redesigned around it.
- New movement messages should send `centerX/centerY/centerZ`; do not send client tile coordinates as authority.
- Keep avatar rendering lightweight enough for 20+ players visible at once. Prefer one billboard/mesh per player and shared texture assets.
- Avatar sprites should be foot-anchored. The bottom of the billboard, shadow, and collision footprint must agree visually.
- Avatar sprites and shadows must respect tile depth. Foreground 3D blocks should cut off the 2D billboard and its shadow when the player is behind terrain; only admin collision debug overlays may ignore depth.
- Avatar shadows, collision rings, and navigation overlays must sit on the visible tile top surface, not the elevation center. Use `worldGenerator.getSurfaceWorldY()` or `getTopSurfaceOffset()`.
- When foreground terrain blocks the avatar, prefer cutting away the obstructing top block meshes near the player over adding xray/glow overlays.

## UI Rules

- The browser game should fit inside the `.game-shell` viewport on desktop and fill the screen only on small/mobile viewports.
- Use DOM overlays for HUD and menus. Keep WebGL for the playfield.
- Keep persistent HUD compact and edge-aligned; do not cover the center or lower-middle playfield during normal movement.
- Do not add large always-open panels for debug, controls, quests, inventory, or lore. Put larger surfaces behind explicit toggles later.
- Text in HUD chips must fit at desktop and mobile sizes.
- Admin/debug UI must be collapsed by default and must use DOM controls outside the WebGL scene.
- Collision visualization belongs behind the admin/debug panel and should not be enabled by default.

## Tile And Texture Rules

- Add new terrain to `TileRegistry.js` with element id, label, walkability, habitats, color/material metadata, and texture pattern.
- Add tile-cell ids and symbol shorthands to `TileLibrary.js`, not directly to render code.
- Keep `TileLibrary.js`, admin parsing, and server `WorldSurface` normalization in sync.
- Current hard magic elements are limited to `0 VOID`, `1 GEO/Earth`, `2 HYDRO/Water`, `3 ANEMO/Wind`, `4 CRYO/Ice`, `5 PYRO/Fire`, and `6 STRUCTURE`.
- Tile-cell fields are numeric: `element` controls magic/base behavior, `texture` selects the visual texture variant for that element, `effect` is the active elemental overlay/aura on the tile, `building` identifies building part semantics, and `height` is the top block elevation for that column.
- Compact cells such as `[element, texture, effect, building, height]` may be used for future chunk/network payloads, but gameplay code should normalize them before use.
- Current editor symbols are `W B S G F H M P I L R T X A C N O J K Q V Y Z D E U 1 2 3 4 5 6 7 8`; they are shorthand only.
- Use rounded highlights, soft shadows, and clear blocked markings so players can read walkable and non-walkable tiles quickly.
- Block side faces should be darker than top faces and include seams/edge contrast so stacked same-terrain blocks do not look like flat walkable floor.
- Elevation symbols such as `H` and `M` should use distinct texture variants, not plain grass tops.
- Tile materials and geometries should be cached or instanced where practical. Do not create unique material/geometry objects for every block unless the tile genuinely needs unique state.
- Highlighting may clone a material temporarily, but must restore and dispose it.
- Building data should enter through serializable blueprints in `BuildingData.js`; stamp those blueprints into tile-cell arrays through the library instead of hard-coding building meshes.
- Seeded world generation must place buildings only when the full footprint and one-tile perimeter are on valid dry terrain, and runtime building blueprints must match the stamped rows.
- Building wall floors are two structure blocks high. Window columns must pair lower-wall/upper-glass and lower-glass/upper-wall blocks using the same stone or timber texture as adjacent walls.
- Building blueprints may define `stories` from `1` through `3`; wall height is exactly `stories * 2`. Repeat the paired window pattern for every floor and keep ground-level door surfaces walkable by adding upper door-facade blocks without updating `surfaceMap`.
- The default town must contain at least one three-floor building. Seeded random town generation must also produce a three-floor civic building and may assign one-to-three floors to additional buildings.
- Building stairs are three-step tile-contained shapes. Direction controls their visual orientation only; movement may enter and leave the stair tile from any direction.
- Roofs must remain flat block grids with simple perimeter trim or parapets. Do not use triangular, gabled, or decorative floating slab stacks for the current building style.
- Building walls and roofs should cut away when the player is on an interior/door/stair tile so interiors remain readable.
- Always preserve the first wall block above a building floor during cutaways. It defines room boundaries and keeps door positions legible for the approximately two-block-tall player.
- When the player enters a building, hide the entire roof and only the upper course of the two perimeter wall edges nearest the camera. Determine those edges mathematically from the camera position relative to the building center.
- When an outside player walks fully behind a building, use a finite camera-to-player segment/footprint intersection to hide that building's entire roof and upper wall course across all edges. Restore it when the building no longer intervenes.
- Generated towns must use coordinated non-overlapping lots with walkable foundations and a guaranteed road connection from every exterior door approach to the village center.
- Small-town generation should follow the Azgaar-inspired data pipeline in `AzgaarTownGenerator.js`: score a dry settlement site, carve terrain-cost-aware routes, then emit serializable building blueprints for the voxel renderer.
- Keep the default small town as a frozen fixture in `SmallTownTemplate.js`. Random worlds may change the seed, but must pass through the same town plan and tile normalization pipeline.
- Building doors may use `oak`, `iron`, or `painted` styles. The blueprint door style, tile texture id, procedural tile pattern, and runtime door-panel material must agree.
- Outdoor GEO, ANEMO, and CRYO blocks must use visible elevation lighting bands: base blocks darker, higher blocks progressively lighter. Do not apply elevation tones to structures, interiors, roofs, water, or lava.
- Terrain sight cutaways must preserve elevation `0` and may hide only overlapping blocks at elevation `1` or higher. Apply this through normalized world block data so default, randomized, and imported generated maps behave consistently.
- Obstruction handling should use the same visibility-flag style as building cutaways. Do not add persistent xray volumes or filled walkability highlights around the player.
- Default/random maps should stay mostly flat for smoother travel: water, shore, grass, roads, doors, floors, and stairs share the base plane; only hills, mountains, peaks, walls, and special terrain should add meaningful height.
- Large worlds must keep bounded render visibility around the player through `WorldGenerator.updateVisibleTilesAround()` or a future chunk-streaming equivalent.

## Wildlife Rules

- Wildlife must spawn only through `WildlifeSystem`.
- Spawn data belongs in `WILDLIFE_SPAWNS` or future server chunk data.
- Every wildlife spawn needs `species`, `habitat`, `x`, `y`, and a bounded movement/leash rule.
- Wildlife placement must use `worldGenerator.supportsHabitat`.
- The current `MeadowHare` is non-combat. Add combat behavior later as a separate AI/combat layer.

## MMO Infrastructure Rules

- Server-owned state should be compact and chunk-aware.
- Send player movement as center coordinates; server derives tile and chunk coordinates.
- Future chunk streaming should send compact tile-cell arrays or deltas by chunk, not full world snapshots.
- Future server-authoritative validation should use the same tile/chunk rules as the client.
- Combat should remain separate from world movement until the first wildlife/NPC behavior is stable.

## Admin World Rules

- Custom maps should use JSON tile-cell rows with `{ element, texture, effect, building, height }` objects. The admin panel may also accept compact numeric cells or legacy row-string symbols, but it must normalize them before applying.
- Every row in a custom map must be the same width.
- Applying or randomizing a map must rebuild the same `WorldGenerator` surface/chunk indexes used by normal play.
- After world replacement, move the player to a valid walkable tile and respawn wildlife through `WildlifeSystem`.
- Do not broadcast whole custom maps through hot world sync. Send metadata first; add chunk-array streaming when multiplayer map sharing is implemented.
- If a custom map changes server-side movement authority, send rows once through the admin update path and let `WorldSurface` rebuild its surface map.

## Combat Rules

- Turn combat belongs in `CombatScene` on the client and `CombatRoom` on the server.
- Combat room state should support multiple party members in one encounter.
- The current co-op flow is planning based: each living party actor submits an action, then the room resolves the round.
- Add abilities, status effects, targeting, and combat logs as data/state, not as Three.js mesh state.
- Keep combat UI in DOM and only show it while the combat scene is active.
