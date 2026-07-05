# Rules

- Doors must be on a real exterior edge of the building footprint and must open to a walkable exterior approach.
- Doors must not be placed on corners. If the source footprint forces a corner, relocate the door or repair the entry footprint.
- Doors must have a non-edge interior landing directly behind the doorway; a door that opens into a wall/window/edge cell is invalid.
- Door asset instantiation is suspended for this test build. Exterior door and entryway columns must compile as a simple open pass-through only: 1 voxel wide on horizontal X, 1 voxel deep on horizontal Y, and 2 voxels clear on vertical Z above a walkable base floor.
- Doorway base floors and the bottom of their clearances must clamp to the building's stabilized ground/plateau elevation. Doorways must never generate at `baseElevation + 1` unless the underlying terrain plateau itself is at that Z coordinate.
- Building stairs must be inside the footprint, on the first-floor plan, adjacent to an interior wall, and away from corners.
- Building stairs should reserve a 2-by-4 footprint: a walkable stair lane and, for solid stairs, a support lane against the wall.
- Solid triangular stair modules use a 2-by-2 sector layout: top-left air, top-right upper half-stair, bottom-left lower half-stair, bottom-right solid support.
- Floating-slope stair modules use the same 2-by-2 half-stair slope but leave the bottom-right/pass-through sector open.
- Stair modules must be rotatable around the Y axis and generated through shared matrix rules, not hand-authored per building.
- Building stair placement must account for non-rectangular footprints and must not overlap another stair module in the same local footprint.
- Stair generation must not emit extra downstream landing cells or any other forward cells outside the validated 2-by-4 stair run.
- Every stair run that ascends to an upper floor must terminate at a populated structural voxel on that destination floor.
- If an ascending stair exists but no functional upper floor is generated, the stair must terminate at the roof structural layer as a walkable roof exit.
- Stair flight heights must be offset by the flight's source floor level; second-floor stair flights must never be stamped at first-floor height.
- Stair generation must carve a two-voxel headroom cutout through any floor or roof layer directly above the diagonal stair path.
- Multi-story buildings must populate every elevated floor layer across the complete interior footprint; do not generate partial upper floors only around the staircase.
- Buildings must not be limited to rectangular or square plans. All building rules must operate on the actual voxel footprint set, supporting arbitrary connected shapes that fit the tile grid.
- Door columns must preserve a clear walkable opening at the door base elevation and must extrude solid wall or window voxels above the two-voxel doorway clearance through the ceiling/wall height. Multi-story doors must not carve repeated upper-story holes in the same exterior wall column.
- City-wall stairs must be generated as 2-by-4 supported runs, not single full-height stair tiles.
- City-wall stair runs should use progressive heights so the player can walk from ground level to the top walkway one step at a time.
- City-wall stair support lanes must remain full-height solid wall columns so walls can connect directly beside stair blocks.
- City walls should remain several blocks thick, include walkable interior passages, and use gates/doors that connect those passages to streets.
- City-wall passages, gates, walkways, and wall-stair structures must share one obstruction group tag per town, `city-wall:<town>`. Every city-wall structure column counts as inside that city-wall obstruction group, but ordinary city interior ground must not.
- Obstruction mechanics may hide meshes for visibility, but must never remove or weaken collision data.
- Every active voxel ID except air/0 must register explicit AABB collision metadata in runtime voxel blocks and compiled magic-voxel block registries.
- Building perimeter shells must remain closed after stamping; perimeter cells must be solid wall or designated lower/upper window wall parts unless the cell is a validated door.
- Every generated/imported building must carry a stable JSON `obstructionTag` identifying its obstruction group. Use `building:<town>:<building>` unless a source package supplies a stronger stable tag.
- Buildings on uneven terrain must flatten their footprint or raise the immediate apron into a coherent plateau before floor and wall vectors are placed.
- Obstruction groups must classify wall columns into type A and type B. Type A wall columns are the isometric screen-facing side, identified when wall A has `gridX > wallB.gridX && gridY > wallB.gridY` for another wall column in the same obstruction tag. Type B is the opposite side.
- Roads should use visually distinct material/color weights against village ground, grass, dirt, and structure foundations.
- Obstruction hiding must use the player entity's current movement elevation, not the highest voxel in the column.
- Obstruction hiding must use the vertical voxel Z axis for height and hide eligible structural obstruction geometry at `z >= playerZ + 2`.
- Obstruction hiding must never use horizontal X or Y as a proxy for height.
- The isometric screen-facing obstruction direction is positive `gridX` and positive `gridY` relative to the player. Even when the player is inside a tagged building or city-wall obstruction group, still evaluate whole tagged obstruction groups in front of the player and hide both type A and type B wall blockers for any group that has eligible wall/structure tiles where `gridX > playerX && gridY > playerY`.
- Interior and exterior obstruction hiding must also hide elevated structural floor/stair tiles and furniture meshes at `playerZ + 2` or above, so upper floors do not leave props visible after the floor/walls are hidden.
- Environment terrain blocks such as grass, dirt, rock, stone, sand, snow, plaza, road, and other base ground materials must always render and must never receive `OBSTRUCTION_HIDING` metadata.
- Every non-air block must have active, solid AABB collision metadata even when it is walkable; walkability is represented separately by `walkableSurface`.
- Sand terrain must be clustered. Do not emit isolated single `S` terrain tiles; elevated sand must have nearby sand at the same elevation or be replaced by surrounding ground.
- When the player ascends, the active visibility mask must shift one elevation at a time without changing collision data.
- All city and building layout corrections should be implemented in generator/importer code and then regenerated, not patched town-by-town.
- Do not solve map or city issues by reading/iterating across all generated map data JSON files or full active-world payloads. Learn the pattern from the generator/importer math, schemas, symbols, and a small targeted sample, then implement a deterministic mathematical rule.
- Cities and maps must be generated strictly through shared mathematical formulas and generator/importer rules, not manually tuned data edits.
- The only active source package folder is `world-map-source/`. Keep map-package names in source metadata if needed, but runtime world id/name must remain static until intentionally renamed.
- FNG/matrix building imports must derive building bounds and footprints from vector cells, room tiles, footprint cells, or rasterized polygon outlines when available. Use `grid_rect` only as fallback metadata, not as proof that a building is rectangular.
- Furniture and loose items should stay within one tile footprint and should be placed only on validated interior cells.

## Vector→3D Congruence (planned — see context.md "PLAN" section)

- The 3D world must be congruent to the source vector map: one uniform scale per town on both axes, aspect preserved, matrix dimensions derived from vector bounds — never a fixed 80×60 grid and never independent X/Y scale factors.
- Every building present in the source vector layer must exist in the 3D world. Import must not cap building counts (no `MAX_RUNTIME_BUILDINGS`), must not silently drop sub-minimal or colliding footprints; repair (grow to 2×2 vestibule, erode 1 cell, or merge as connected buildings) instead of dropping.
- Rasterization layer priority is terrain < fields < water < roads < building floors < walls; roads must never overwrite building footprint cells.
- Each town import must pass a congruence audit: source building count == runtime building count, and per-building footprint IoU ≥ 0.85.
- Runtime performance limits must be enforced by distance-gated mesh detail, not by import-time truncation of world content.

## Furniture (planned — see context.md "PLAN" section)

- Furniture is planned per room using the exported room types (hall, bedroom, kitchen, storage, workshop, …); the same kit must not be stamped into every building.
- Furniture placement is deterministic: seeded by hash(burgId, buildingId, floorLevel, roomIndex), so re-importing the same package furnishes identically.
- Items snap to cell centers, occupy at most 0.9 of a cell footprint, use 0.25-voxel size quanta, and rotate only in 90° steps to face away from their adjacent wall.
- Furniture must never block the door cell, its interior landing, stair cells, or stair headroom, and must never make any free interior cell unreachable from the room door (flood-fill validated).
- Per-room furniture budget is at most 40% of the room's interior cells; no two items may share a cell.
- Furniture vertical placement derives from `baseElevation + level × floorHeightVoxels` from the building record — never hard-coded storey heights or magic offsets.

## Stair Module Contract (IMPLEMENTED — see context.md "PLAN 2 §G" status)

- One stair set is one 2×2 module per storey climb, exactly 4 blocks: bottom-left = lower half-stair tier 1 (the base), top-right = upper half-stair tier 2 (the continuation), bottom-right = solid support (or absent in the floating configuration), top-left = air shaft the player passes through between floors.
- All stair cells must be produced by composing `createStaircaseModule`; no generator may hand-roll stair sector cells.
- Within one flight, no two stair cells may share a coordinate or a height tier — two stair tiles at the same height on one set is a hard failure, not a degraded stair.
- Tiers must strictly increase along the climb direction; multi-storey climbs chain modules offset +2 tiers each.
- Stair validation is all-or-nothing: if any module invariant fails (missing lower/upper half, missing air shaft, bad support, edge/door collision), the whole flight is rejected and re-planned — partial stair sets must never be emitted.
- The top module's air shaft must align with a carved opening in the destination floor slab and land on a populated floor or roof voxel.

## Town Space & Elevation (§I elevation IMPLEMENTED; §H prop-region infill scaffolded — see context.md "PLAN 2" status)

- Open-ground regions ≥ 12 cells get deterministic purpose-driven infill (market/yard/garden/crop/staging/green) filling 30–50% of the region, always preserving a continuous walkable corridor from every adjacent road cell and door approach.
- Town elevation is a terraced tilt derived from the world height gradient at the burg's position — terrace bands ≥ 6 cells wide, 1-tier steps, ramps (not cliffs) where roads cross a step.
- No isolated elevation or terrain cells of any class: raised or special-material cells must belong to clusters (≥ 8 cells for relief) or be absorbed into the dominant neighboring level. The sand-cluster rule generalizes to all terrain classes and elevation.
- Buildings flatten to plateaus relative to the terraced base; per-cell random elevation noise is forbidden.
