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
- Keep the map array-driven. A map row character represents one tile column; a tile column expands into stacked block arrays.
- Use `WorldGenerator` for block lookup, elevation, walkability, habitat, and chunk indexing.
- Do not duplicate tile behavior inside players, wildlife, pathfinding, or UI. Add behavior to `TileRegistry.js`.
- Use `surfaceMap` for movement and habitat decisions. Use `tileMap` only when a specific block at `x,y,z` is required.
- Use chunk keys for scalable map work: `chunkX,chunkY`, with `MAP_CHUNK_SIZE` currently `16`.
- Backend hot paths must avoid per-move spam logs and full-map payloads.
- Backend player location authority must start from the player center point and derive the block/tile fields server-side.

## Movement And Interaction Rules

- Player movement must be delta-time based.
- Manual movement and click-to-path must both use `worldGenerator.canMoveBetween`; `isWalkable` is only a tile eligibility helper.
- A player cannot climb a target tile that is 2 or more blocks higher than the current tile.
- Diagonal movement cannot cut through blocked corners. Both adjacent orthogonal tiles must be occupiable.
- Pointer/raycast coordinates must be calculated from the canvas bounds, not the window bounds.
- Camera follow and zoom belong in `ThreeManager`; gameplay movement belongs in entity or simulation classes.
- New movement messages should send `centerX/centerY/centerZ`; do not send client tile coordinates as authority.
- Keep avatar rendering lightweight enough for 20+ players visible at once. Prefer one billboard/mesh per player and shared texture assets.

## UI Rules

- The browser game should fit inside the `.game-shell` viewport on desktop and fill the screen only on small/mobile viewports.
- Use DOM overlays for HUD and menus. Keep WebGL for the playfield.
- Keep persistent HUD compact and edge-aligned; do not cover the center or lower-middle playfield during normal movement.
- Do not add large always-open panels for debug, controls, quests, inventory, or lore. Put larger surfaces behind explicit toggles later.
- Text in HUD chips must fit at desktop and mobile sizes.
- Admin/debug UI must be collapsed by default and must use DOM controls outside the WebGL scene.

## Tile And Texture Rules

- Add new terrain to `TileRegistry.js` with element id, label, walkability, habitats, color/material metadata, and texture pattern.
- Add map symbols to `MAP_LEGEND`, not directly to render code.
- Keep client `MAP_LEGEND`, admin allowed symbols, and server `WorldSurface` symbols in sync.
- Current symbols are `W B S G F H M P I L R T X`.
- Use rounded highlights, soft shadows, and clear blocked markings so players can read walkable and non-walkable tiles quickly.
- Tile materials and geometries should be cached or instanced where practical. Do not create unique material/geometry objects for every block unless the tile genuinely needs unique state.
- Highlighting may clone a material temporarily, but must restore and dispose it.

## Wildlife Rules

- Wildlife must spawn only through `WildlifeSystem`.
- Spawn data belongs in `WILDLIFE_SPAWNS` or future server chunk data.
- Every wildlife spawn needs `species`, `habitat`, `x`, `y`, and a bounded movement/leash rule.
- Wildlife placement must use `worldGenerator.supportsHabitat`.
- The current `MeadowHare` is non-combat. Add combat behavior later as a separate AI/combat layer.

## MMO Infrastructure Rules

- Server-owned state should be compact and chunk-aware.
- Send player movement as center coordinates; server derives tile and chunk coordinates.
- Future chunk streaming should send compact block arrays or deltas by chunk, not full world snapshots.
- Future server-authoritative validation should use the same tile/chunk rules as the client.
- Combat should remain separate from world movement until the first wildlife/NPC behavior is stable.

## Admin World Rules

- Custom maps must use the row-string array format and known `MAP_LEGEND` symbols.
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
