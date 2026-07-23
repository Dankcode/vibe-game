# Context

- Active generation mode (2026-07-23): `blueprint-first-geographic-wfc`, backed by generation version `fmg-blueprint-wfc-v6`. `tools/compile_world_blueprints.mjs` compiles only the refreshed global FMG map and embedded burg summaries into 60 compact settlement blueprints; no town/building file payload is read. Runtime projects one related seat/fief cluster, stamps its immutable wall/gate/castle/road/water skeleton, then lets terrain and per-ward building WFC fill the remaining cells.
- `WorldConstraintField.js` is now a blueprint projector, not a runtime city inventor. Each cluster has exactly one seat; fiefs are open villages linked to that seat, and a view can contain at most one wall system. Capital seats retain three aligned wall rings with compiled 3–9 voxel tier heights and an enterable 9×9 keep. Variant seeds may change ward interiors and surface details but never the fixed skeleton hash.
- Enterable procedural buildings are validated against a free 2×3/3×2 interior after structural stairs and furniture. `ContextualBuildingWFC.js` owns per-ward parcel/building modules and consumes compiled density, archetype, district, and elevation priors; `BakedBuildingLibrary.js` owns code-native landmarks, the minimum cabin, and the fixed castle keep. Neither module reads source town/building JSON.
- The default Trilza view currently resolves 10 enterable buildings with 2 code-native baked landmarks, 3 ward waves, 3 wall rings, 1 keep, and 34 decorations. Buildings cover 44.7% of developable urban frontage while 100% of eligible confined parcel assignments resolve to buildings, with zero terrain/building WFC fallbacks or contradictions. The compiler emits 60 blueprints across 30 seat clusters and 30 unwalled fiefs, 160 waterfall directives, and 0 unexplained FMG fields within a 192 KB blueprint budget; `npm run validate:world` and the 60-location integration sweep enforce these invariants.
- Active source map package: `Masia`, imported from `map-data-package/map-data.*`. Runtime world id/name remain static as `auzoryia` / `Auzoryia` unless intentionally renamed. `world-map-source/` is retained only as an inactive legacy export.
- The active world data is written to `client/src/data/ActiveWorldData.js`. One source-hashed 3×3-chunk terrain/elevation core is written to `client/src/data/BakedChunkData.js`; the old full `shared/magic-voxels/` dump pipeline is retired.
- `npm run replace:world-map` reads the active manifest and global map document, emits the compact blueprint/runtime module, validates compiler coverage, and rebuilds the clean partial core with baked input disabled. Re-running `bake:partial-chunks` merges unique coordinate anchors only when schema, generation version, sample scale, and active world hash all match.
- Terrain randomness, WFC node ids, chunk ids, elevation noise, settlement patterns, and wilderness decoration seeds are anchored to canonical global sample coordinates. Terrain solves in a complete 8×8 chunk-aligned halo and crops to the requested 72×54 view; a one-sample pan must preserve every overlapping terrain id, elevation, final symbol, palette, and visual variant.
- Wall confinement outranks uncertain macro shoreline: non-authored water inside a compiled wall envelope becomes highly inhibited soft terrain that the town wave may stabilize. Parser-authored waterfalls, plunge pools, fords, walls, gates, roads, bridges, docks, and castle plots remain hard nodes.
- Compiler coverage uses exact source-field patterns. New nested FMG fields are unexplained until a formula or explicit boundary reason is added; descendants are never accepted merely because their parent object is known.
- The active imported runtime identity is static while testing: world id `auzoryia`, world name `Auzoryia`. Source package names may vary, but parser/runtime identity should not drift unless the project intentionally renames the active world constants.
- The map package is already character-scale. The importer treats the vector matrix as the source of truth, converts it to tile rows, then compiles those rows into voxel columns.
- Towns are generated from shared code paths rather than per-city hand edits. Building doors, stairs, footprints, roads, city walls, and gate passages should be corrected in generator/importer code so every city benefits.
- Map and city behavior should be understood from generator/importer formulas, vector-matrix schemas, symbols, and shared rules. Do not iterate over or manually inspect all generated map data/JSON payloads such as `ActiveWorldData.js`, legacy world modules, or the full partial-cell registry to derive fixes; use targeted samples only when validating a formula.
- FNG/matrix town imports must treat building vector cells, room tiles, footprint cells, and polygon outlines as the primary building footprint source. Rectangular `grid_rect` data is only a fallback/container for scaling and should not force rectangular buildings when vector footprint data exists.
- Auzoryia currently uses generated thick city walls with gate passages, interior wall walkways, and 2-by-4 supported stair runs up to the top of the wall.
- Buildings are voxel-footprint based and may be rectangular, square, L-shaped, curved/stepped, courtyard-like, or any other connected footprint expressible as tile cells. Rules must use the actual `footprintCells`/footprint set, not assume rectangular bounding boxes.
- Building door placement is validated against both sides of the doorway: the outside approach must be walkable, and the inside must have a non-edge landing cell.
- Non-rectangular building footprints can be repaired with a small entry vestibule when the source matrix would otherwise force a corner door or a blocked interior.
- Building stairs are represented as explicit stair/support cells, not a single stair marker. Downstream landing cells are not emitted because they expand the validated 2-by-4 stair footprint.
- Doorway voxels remain simple structural pass-throughs: each exterior door column clamps to the building's ground/plateau base elevation, keeps a 1 x 1 horizontal footprint, creates a walkable floor at that base coordinate, carves exactly two vertical Z-axis air voxels above it, and resumes solid wall/window voxels above the clearance. Runtime animated door panels mount to this opening without changing its structural collision contract.
- Structural matrix rules now live in `client/src/data/StructuralMatrixRules.js` and are shared by the building stamper, importer, tile voxel creation, and runtime validators.
- Building shells are repaired after stamping so every perimeter cell is a wall or window voxel, with only validated doors allowed as openings.
- Building elevation now matches the footprint plus a small apron to a plateau height before floors are placed, preventing floating or clipping floor slabs on uneven terrain.
- Building stair generation uses a rotatable 2-by-2 triangular module and a 2-by-4 run, with a solid-support configuration and a hollow floating-slope configuration available from the shared rules file.
- Stair cells are spatially validated before export: each local 2-by-2 module can contain only one staircase module, generated stair runs cannot extend into six-block layouts, stair heights are offset by their source floor level, headroom is carved over the incline, and stair termini must land on a populated upper-floor or roof structural voxel.
- Multi-story buildings now attach structural floor-level metadata to interior cells so every elevated floor layer is populated across the full interior footprint instead of only near stairs.
- Door voxels carry a ground-relative base elevation and wall-cap metadata. The base is sampled from the terrain beneath the structure and stabilized to the same plateau used by the building footprint so door clearances do not float one Z layer above the foundation.
- Road/town decoration is generated through deterministic road-shoulder and negative-space infill tied to roads, doors, buildings, and usable open corridors.
- Window lower and upper parts are treated as wall collision parts. Hidden obstruction visual blocks must not change movement collision.
- Every non-air voxel block now receives explicit AABB collision metadata at runtime.
- Building obstruction hiding is tag-based. Runtime/imported building JSON must provide a stable `obstructionTag` per building, with `building:<town>:<building>` as the canonical form; older data may fall back to the building `id`.
- City-wall passages, gates, walkways, and wall-stair structures are grouped as one `city-wall:<town>` obstruction group so tunnel entry behaves like entering one building.
- City-wall obstruction interiors are limited to the wall structure columns themselves. The full city interior must not be treated as inside the city-wall obstruction group.
- Obstruction hiding hides structural visual blockers around or inside the player’s active obstruction group while movement continues to use the voxel surface/collision maps.
- Building and city-wall obstruction groups split wall columns into two visibility types. Type A is the screen-facing wall side where a wall column is at higher `gridX` and higher `gridY` than another connected wall column in the same obstruction tag. Type B is the opposite side; ambiguous corner columns fall back to isometric depth.
- Outside interiors, obstruction hiding evaluates entire tagged obstruction groups. If a building or city-wall group has eligible structural blockers at `gridX > playerX && gridY > playerY`, hide that group's eligible type A and type B wall blockers, not just a local 3x3 or radius window.
- Inside a building or city-wall tunnel, obstruction hiding first applies the active obstruction tag cutout, then still evaluates all tagged obstruction groups in the `+gridX / +gridY` direction. Adjacent/front buildings or city walls can therefore hide both type A and type B walls plus upper structural floors/stairs at `playerZ + 2` and above even while the player is inside another interior.
- The engine coordinate contract is `gridX`, `gridY`, and vertical `voxelZ`; Three.js adapts `voxelZ` onto scene `y` only when placing meshes. Obstruction comparisons must use the voxel vertical Z coordinate, never the horizontal X axis.
- Obstruction hiding uses the player's actual movement elevation, not the column top surface. The active visibility mask is structural-only: hide eligible structural voxels at `z >= playerZ + 2`, so a player on `z = 2` hides wall tiles at `z = 4` and above.
- Interior obstruction hiding also hides upper structural floor/stair tiles and furniture meshes at `worldY >= playerZ + 2` so hidden upper levels do not leave floating props behind.
- The game is isometric: screen-facing obstruction is the positive `gridX` and positive `gridY` direction from the player. Do not hide only same-X columns, and do not use horizontal X/Y as height.
- Every non-air voxel has active, solid AABB collision metadata, even when it is also a walkable surface. Movement uses `walkableSurface`/surface selection; visibility hiding must never remove that collision metadata.
- Magic-voxel `OBSTRUCTION_HIDING` metadata is reserved for structural assets such as walls, roofs, stairs, furniture, floors, and city-wall structures. Base environment terrain blocks must never receive that flag, even when they are above, on, or below the player's active Z plane.
- Sand terrain should appear in clusters, not isolated single tiles. Runtime row generation removes standalone `S` cells, especially elevated one-off sand cells, and replaces them with surrounding ground terrain.

---

# PLAN — Vector→3D Congruence & Furniture Overhaul (2026-07-03, partially implemented)

STATUS (2026-07-08): Room-driven furniture planning is implemented in `client/src/systems/FurniturePlanner.js` and rendered by `WorldGenerator.createBuildingFurniture`; generated/synthesized rooms now feed those kits. Sub-minimal footprint repair and congruence auditing are live in `tools/import_world_map_package.mjs`. Remaining congruence work is the broader collision repair/merge path for legacy selected buildings; keep those notes as planning guidance until implemented.

Scope: THIS repo only — the importer, compiler, and runtime. Map generation is a separate project; this game consumes any source package that conforms to the `vibe-game-town-matrix` schema contract (§B0). Where a bug's root cause is bad package data, the fix here is contract validation + repair at import — never editing the upstream generator from this repo. No town/burg JSON is ever parsed by hand — every fix is a formula over the matrix schema.

## A. Bug ledger (root causes found, with exact locations)

### Empty towns / vector↔3D non-congruence
1. **Building cap** — `tools/import_world_map_package.mjs:30` `MAX_RUNTIME_BUILDINGS = 128`, applied at `:123` (`buildingCandidates.slice(0, MAX_RUNTIME_BUILDINGS)`) and again in `placeBuildingsWithPadding` (`:1283`). Every building past #128 is silently dropped → empty parcels where the vector map has buildings. REMOVE the cap; use chunked/lazy meshing instead (see B4).
2. **Sub-minimal footprint drop** — `createBuildingBlueprint` (`:729`) returns `null` when `scaledRect.width < 2 || scaledRect.height < 2`. Small vector buildings rasterized to slivers vanish. Replace drop with a 2×2 vestibule repair at the same centroid (B3).
3. **Legacy crop** — `createCompactTown` (`:100–105`) clamps non-matrix towns to `SOURCE_TOWN_WIDTH/HEIGHT = 80×60`, cropping anything larger.
4. **Occupancy drops** — `canReserveFootprint`/`placeBuildingsWithPadding` (`:1280–1315`) discard any candidate whose padded footprint collides. Source packages sometimes deliver overlapping footprints (a package-quality issue, out of scope here); dropping is still the wrong response — replace drop with erode-or-merge repair (B3) so this game renders every building no matter which generator produced the package.
5. **Trusting package geometry blindly** — the importer assumes footprints are well-formed and silently discards whatever isn't. Add contract validation at import (§B0) so malformed packages are repaired and reported, not silently thinned out.

### Furniture misfit
6. **Cell-modulo duplicates** — `WorldGenerator.createBuildingFurniture` (`client/src/systems/WorldGenerator.js:1028–1069`): `cellAt(index % interiorCells.length)` stacks rug+table+crates on the SAME cell when the interior has <3 usable cells.
7. **Room data ignored** — source packages already carry per-floor rooms with types (bedroom/kitchen/hall/…) and the importer preserves floors through `compactMatrixFloors` (`tools/import_world_map_package.mjs:1376–1390`), but furniture placement never reads `building.floors[].rooms` — every building gets the same rug/table/crates/shelf/stool kit regardless of purpose.
8. **No orientation / wall awareness** — items are dropped at cell centers with fixed axis; nothing faces walls, nothing avoids the door swing or approach cell beyond the single blocked door cell.
9. **Magic floor offset** — `y = floorSurfaceY + 0.08` and `upperY = floorSurfaceY + level * 2 + 0.08` (`:1031`, `:1051`) hard-code a 2-voxel storey and ignore `building.interior.floorHeightVoxels` and the plateau `baseElevation`, so furniture floats/clips in elevated or tall-storey buildings.
10. **Upper floors are dead** — each upper level gets exactly one stool (`:1048–1060`).

## B. Congruence contract (what this game requires from any source package, and guarantees at runtime)

**Invariant:** every building present in the source package appears as a walkable-interior footprint in the 3D world, at the same relative position, aspect preserved. Testable as: `renderedBuildings === matrix.interiors.length` and per-building `IoU(packageFootprint, runtimeFootprintCells) ≥ 0.85`.

0. **Package contract (§B0)** — this game accepts any `vibe-game-town-matrix` package that declares per-town `block.width/height`, uses one uniform scale on both axes (aspect preserved), and rasterizes with layer priority terrain < fields < water < roads < building floors < walls (roads never overwrite footprint cells). The importer VALIDATES these properties per town at import and logs violations; which generator produced the package is irrelevant here.
1. **Per-town dimensions are variables** — read `block.width/height` from the package; nothing on the game side may assume 80×60 or any fixed grid. (Legacy `SOURCE_TOWN_WIDTH/HEIGHT` cropping applies only to the pre-matrix legacy format and must not leak into the matrix path.)
2. **Validation formula for uniform scale** — for a sample of building footprints, `widthCells/heightCells` of each footprint must match the package's declared footprint aspect within rounding; systematic one-axis skew ⇒ report `anisotropic-package` warning.
3. **No drops, only repairs** (importer): footprint <2×2 → grow to 2×2 vestibule at centroid; two footprints colliding → erode 1 cell along the contact line from the larger one, and if still touching, register both under one shared `obstructionTag` as connected buildings (mechanism already exists: `getConnectedBuildingRefs`).
4. **Scalability replaces the cap**: with the cap removed a capital can carry 300+ buildings. Runtime already distance-gates furniture/detail (`state.furniture.visible = near`, `WorldGenerator.js:1445`); extend the same near-gating to building interior meshes so the mesh budget, not an import-time slice, limits detail.

## C. Furniture placement formula (room-driven, deterministic)

Seed: `rng = mulberry32(hash(burgId, buildingId, floorLevel, roomIndex))` — same world file always furnishes identically (drag-and-drop reproducibility).

Placement rules per room:
- Kits by room type: `hall → table+benches+rug+hearth`, `bedroom → bed+chest`, `kitchen → hearth+counter+shelf`, `storage → crates+shelf`, `workshop → counter+crates+stool`, fallback `common → table+stool+rug`.
- Candidate cells = interior cells of the room, wall-adjacent first (perimeter-1 ring), excluding: door cell + its interior landing, stair cells ± headroom, cells already reserved.
- Orientation = away from the touched wall's normal (rotation = 0/90/180/270 only).
- Occupancy budget: `maxItems = floor(roomCells · 0.4)`.
- Reachability: after each placement, flood-fill from the room door over free cells; if any free cell becomes unreachable, revert the placement.
- Geometry: every item snaps to cell center, max 0.9×cell footprint per occupied cell, sizes quantized to 0.25 voxel.
- Vertical: `floorY(level) = baseElevation + level · interior.floorHeightVoxels` (from the building record) — never `level * 2` and never a bare `+0.08`.

## D. Function status and remaining importer notes (game repo)

The furniture planner functions below are implemented in `client/src/systems/FurniturePlanner.js`; keep this contract for future changes.

New file `client/src/systems/FurniturePlanner.js`:
```js
// FurniturePlanner — pure planning, no THREE imports. WorldGenerator renders the plan.
// Consumes: building {floors[].rooms[], footprintCells, door, stairCells, baseElevation, interior}
// Produces: FurniturePlan[] = {level, roomIndex, type, cell:{x,y}, rotation, footprint:[cells]}

export function planBuildingFurniture(building, hash) {
  // 1. for each floor level → roomsForLevel(building, level) (fallback: whole footprint = one 'common' room)
  // 2. for each room → kit = getRoomKit(room.type, room.cells.length)
  // 3. place kit items on findWallAlignedCells(...) honoring budget + validateRoomWalkability(...)
  // TODO implement per context.md §C; deterministic via mulberry32(hash)
}

export function getRoomKit(roomType, roomArea) {
  // returns ordered item list, trimmed to floor(roomArea * 0.4)
}

export function findWallAlignedCells(roomCells, footprintSet, blockedSet) {
  // wall-adjacent interior cells first (perimeter-1 ring), then inner cells; stable sort for determinism
}

export function validateRoomWalkability(placedCells, roomCells, doorCell) {
  // flood fill from doorCell over roomCells minus placedCells; return false if any free cell unreachable
}
```

`client/src/systems/WorldGenerator.js` changes (comment-level plan):
- `createBuildingFurniture` (`:1028`) → delete ad-hoc `cellAt` sequence; call `planBuildingFurniture`, then map plan types to the existing mesh factories (`addTable`, `addBed`, `addHearth`, … all already written at `:1089–1197`) with `rotation` applied to the mesh group.
- Floor math (`:1031`, `:1051`) → use `building.baseElevation + level * building.interior.floorHeightVoxels`.
- Upper levels: run the planner per level; keep `upperFurnitureGroups` wiring for obstruction hiding unchanged.

`tools/import_world_map_package.mjs` changes (comment-level plan):
- Delete `MAX_RUNTIME_BUILDINGS` (`:30`), the slice (`:123`), and the cap check (`:1283`).
- `createBuildingBlueprint` (`:729`): replace `return null` with `repairSubMinimalFootprint(scaledRect, footprintCells)` → grow to 2×2 vestibule.
- New `resolveFootprintConflicts(buildings, width, height)` → erode-or-merge per §B3; called where `selectTownBuildings`/`placeBuildingsWithPadding` currently drop.
- New `auditTownCongruence(town, buildings)` → logs `{sourceBuildings, runtimeBuildings, dropped:[ids]}` per town at import; must report 0 dropped.
- Keep `rooms` from `compactMatrixFloors` (`:1376`) on the building record (verify they survive into `ActiveWorldData.js` — planner needs them).

## E. Acceptance checks (write as small scripts, no JSON iteration by hand)
- `npm run replace:world-map` prints `buildings` == sum of per-town source building counts (audit from D).
- Per-town spot formula check: pick 3 building ids, assert matrix footprint cell count within ±15% of runtime footprint cell count.
- Furniture: no two plan items share a cell; every room's free cells reachable from its door.

---

# PLAN 2 — Stairs, Town Infill & Map Elevation (2026-07-04)

STATUS (2026-07-08): §G stairs IMPLEMENTED — `createStairFlight`/`assertStairFlightInvariants` replace `createTwoByFourStairRunCells`/`validateStairModuleCells`; air-shaft cells are exported in `stairCells` with role `air`; `validateStaircaseRouting` carves the shaft column; `WorldGenerator.canMoveBetween` allows the stair diagonal past the solid support when the air-shaft corner lane is clear. §I elevation IMPLEMENTED — `computeTownTilt` (plane fit over world `heightSamples`), `createTerraceBandGrid`/`applyTerracedElevation` (bands ≥ 6 cells, ≤ 3 tiers, 1-tier walkable steps), `enforceElevationClusterCoherence` (min cluster 8, plus a final pass after door approaches); city-wall works ride the local terrace band. §H infill IMPLEMENTED — ground-variety clusters (`infillTownOpenSpaces`, `normalizeLooseSurfaceClusters`), road-shoulder decoration, and themed prop-region infill are live. `planNegativeSpaceInfill`/`classifyInfillRegion`/`fillInfillRegion`/`regionStaysConnected` now generate deterministic market/yard/crop/staging/green prop regions with a corridor guarantee, and `WorldGenerator` renders tree/well/stall/woodpile/boulder/cart/garden props. Acceptance run: 50 towns / 402 buildings / 314 flights; 8,325 generated decorations across all 50 towns; max 318 decorations in any one town; 0 duplicate decoration cells; 0 door-approach decoration conflicts.

Scope: this repo only (`client/src/data/StructuralMatrixRules.js`, `tools/import_world_map_package.mjs`, `client/src/systems/WorldGenerator.js`). All deterministic formulas; no hand-inspection of generated JSON.

## F. Bug ledger (new findings)

11. **Duplicate stair tiles on one stair set** — `createTwoByFourStairRunCells` (`StructuralMatrixRules.js:212–296`) hand-rolls its own sector cells instead of using `createStaircaseModule`, and gives BOTH walk cells (`lowerWalk` and `upperWalk`) `role: 'stair'` at the SAME height per module (`height: moduleIndex === 0 ? 1 : 2`, lines `:259`/`:265`). Result: two stair tiles at equal height on the same set — the player climbs to a flat pair, can't step the last tier, and gets stuck on the 2nd floor. It also mislabels sectors (`lowerSupport` emitted as sector `'top-left'`, role `'air'` at `:250–254`, contradicting the base sector tables).
12. **Validator passes broken stairs** — `validateStairModuleCells` (`:305–358`) only filters against an allow-list and dedupes coordinates; it returns success on `validated.length > 0`, so a PARTIAL module (e.g. only the upper half-stair) validates. No check for height progression, no "exactly one lower + one upper per module", no air-sector check.
13. **Random floating floor tiles** — `applyMatrixOpenGroundRelief` (`import_world_map_package.mjs:320–341`) raises SINGLE cells by per-cell hash noise (`hash > 0.72 ? 2 : 1`) with no clustering or neighbor constraint → the isolated, randomly placed raised tiles seen all over towns.
14. **Towns feel empty** — `createRoadDecorations` (`import_world_map_package.mjs:627`) returns `[]` (decoration fully disabled, see context bullet above about "excess decoration"), and open ground has no purpose assignment at all → big dead plazas and yards.

## G. Stair module contract (the 2×2, 4-block rule)

One stair set = one 2×2 module per storey climb. Looking at the module with the climb direction pointing "up-right":

```
┌───────────┬───────────┐
│ TOP-LEFT  │ TOP-RIGHT │   top-left  = AIR — the open shaft the player passes through between floors
│   (air)   │ upper half│   top-right = upper half-stair, tier 2 (continuation)
├───────────┼───────────┤
│BOTTOM-LEFT│BOTTOM-RGHT│   bottom-left  = lower half-stair, tier 1 (the base; player enters here)
│ lower half│  support  │   bottom-right = solid support block (or ABSENT in floating config)
└───────────┴───────────┘
```

This contract already exists as data (`BASE_SOLID_TRIANGULAR_SECTORS` / `BASE_FLOATING_SLOPE_SECTORS`, `StructuralMatrixRules.js:67–79`) — the bug is that the run generator ignores it. The fix is to make `createStaircaseModule` (`:186`) the ONLY source of stair cells:

```js
// StructuralMatrixRules.js — planned replacements

// createStairFlight — REPLACES createTwoByFourStairRunCells (:212). Composes whole flights strictly
// from createStaircaseModule: climbVoxels voxels of climb → ceil(climbVoxels / 2) chained modules along
// `tangent`, each module raising 2 tiers and offset +2 tiers from the previous. Never emits ad-hoc cells.
export function createStairFlight({ origin, tangent, wallOffset, climbVoxels, footprintSet, door, configuration, level }) {
  // TODO: for each module i: cells = createStaircaseModule({origin: origin + tangent*2i, rotation: fromTangent, level});
  //       shift all heights by 2i; reject flight if any cell leaves footprint interior, hits door, or touches an edge cell.
  //       Return null on ANY violation — a stair is all-or-nothing (fixes bug 12's partial passes).
}

// assertStairFlightInvariants — REPLACES validateStairModuleCells (:305) semantics. Per module, assert:
//   exactly 1 lower-stair (tier 2i+1), exactly 1 upper-stair (tier 2i+2), ≤1 support, exactly 1 air cell;
//   tiers strictly increase along tangent; NO two stair cells share a coordinate OR a height in one flight
//   (kills the duplicate-tile bug 11); top module's air cell column must align with the carved hole in the
//   upper floor slab and land on a populated floor/roof voxel (extend validateStaircaseRouting :360).
export function assertStairFlightInvariants(cells, options) {}
```

Consumers to update when implementing: `getMatrixBuildingStairs`/`normalizeBuildingStairs`/`flattenStairCells` in `tools/import_world_map_package.mjs`, and the stair stamping + headroom carving in `WorldGenerator.js`. The exported stair schema (`stairCells` with `role/height/level/sector`) stays unchanged — only generation and validation change.

## H. Town infill (fill the dead space, keep breathing room)

Deterministic negative-space pipeline in the importer, run after buildings/roads/walls are placed (`rng = mulberry32(hash(townId, regionIndex))`):

1. **Find regions** — flood-fill open ground cells (not road/building/wall/water/gate/door-approach). Keep regions with area ≥ 12 cells; smaller slivers are left alone.
2. **Classify by adjacency** — touches plaza or main road → `market`; shares an edge with a building's rear wall → `yard/garden`; adjacent to farm cells → `crop rows`; hugs the city wall → `staging` (carts, crates, stacks); otherwise → `green` (trees, well, shrubs).
3. **Fill with a budget** — place props from the region kit on 30–50% of region cells (market: stalls/crates/barrels/cart; yard: fence runs/garden beds/woodpile; green: trees/well/boulders). ALWAYS preserve one continuous walkable corridor from every adjacent road cell and door approach through the region — the goal is "filling with spaces", not clutter.
4. **Wire-up** — re-enable `createRoadDecorations` (`:627`) as a thin wrapper over this system; keep `chooseDecorationType`'s roadside lamps/signs as the road-edge kit. Props export as `decorations` (schema already exists) so no runtime change is needed beyond rendering the new types.

## I. Coherent elevation (uniform tilt + terraces, no random floaters)

Replace `applyMatrixOpenGroundRelief`'s per-cell noise (`:320`) with a town-wide elevation model:

1. **Tilt from world topography** — sample the already-exported `world.heightSamples` around the burg's world position to get a height gradient vector `g` (direction + steepness). This makes "the right side higher than the left" or "the back higher than the front" fall out of the actual world map, deterministic per seed.
2. **Terraced base plane** — `elevationBase(x,y) = round(T · dot(ĝ, (x/W, y/H)))` with tier count `T ∈ {0..3}` from gradient steepness, then quantize into terrace bands with **minimum band width ≥ 6 cells** and 1-tier steps between bands. No 1-cell islands by construction.
3. **Ramps, not cliffs, on paths** — where a road/street crosses a terrace step, cut a 2-wide ramp (gradual +1 elevation across 2 road cells); non-road step edges stay as 1-tier cliffs for visual interest.
4. **Structures stay flat** — buildings keep plateau flattening (`stabilizeBuildingElevation`, `StructuralMatrixRules.js:131`) relative to the terraced base; door clearances clamp to the plateau as today.
5. **Cluster rule for leftover relief** — any remaining decorative relief (rocky/rough terrain) may only raise CLUSTERS ≥ 8 cells, mirroring the existing sand-cluster rule; isolated raised cells are absorbed into the dominant neighboring level. This kills the "randomly placed floor tiles" class of bug generally, not just for sand.

```js
// tools/import_world_map_package.mjs — planned stubs
// computeTownTilt(burg, heightSamples) → { direction: [gx, gy], tiers: 0..3 }        (§I.1)
// applyTerracedElevation(elevationRows, tilt, roadsMask, buildingsMask) → void       (§I.2–4, replaces applyMatrixOpenGroundRelief)
// enforceElevationClusterCoherence(elevationRows, minCluster = 8) → void             (§I.5)
// planNegativeSpaceInfill(rows, buildings, profile, seed) → decorations[]            (§H, replaces createRoadDecorations body)
```

## J. Acceptance checks
- Stairs: for every imported building with stories > 1, assert per-flight invariants (one tier-1 + one tier-2 per module, no duplicate coordinates/heights, air shaft aligns with floor hole); a pathfinding probe can reach every floor and return.
- Elevation: histogram of elevation islands shows zero clusters < 6 cells (terraces) / < 8 cells (relief); at least one town visibly tilts along its world gradient.
- Infill: every region ≥ 12 cells has ≥ 1 prop and a preserved corridor (flood-fill from each adjacent road/door still reaches all free cells).

---

# PLAN 4 — Stair Fit & Coverage, Minecraft-Inspired Terrain Layers, Coordinate-Seeded Interiors (2026-07-08, IMPLEMENTED)

- Stair tile mesh redone to voxel ratio (`Tile.addStairObjects`): a Minecraft-style half-stair filling the unit block — full-footprint bottom slab + ascent-side quarter block, each half a voxel tall, 0.98 footprint like neighbor blocks. The floating 3-step platform, foundation, and rails are gone.
- Stair-top landings are guaranteed at generation time: `normalizeBuildingStairs` only accepts flight candidates with ≥ 1 open interior exit cell beyond the upper stair (`getCandidateExitCells`) and RESERVES one landing per flight so later flights can never occupy it. No more missing floor blocks where stairs lead.
- Stairway coverage is now an invariant: flights are kept as a longest-valid prefix instead of all-or-nothing, and `reconcileStoriesWithStairCoverage`/`applyStairCoverageToBuilding` clamp `stories`/`interior.floorCount` to what the stairs can reach (blueprint + both entrance aligners). A building can no longer have an upper floor without a stairway — footprints that cannot host a flight become single-story. Verified: 226/226 multi-story buildings fully covered, 0 flights missing exit landings.
- Terrain: added `applyFractalReliefPatches` (2-octave smooth-stepped value noise, +1 tier max, quantized and cluster-coherence-cleaned) and `applyBiomeGroundLayers` (clustered sand shorelines, rocky accents on tiers ≥ 3) on top of the terrace tilt. Techniques studied from github.com/mattzh72/minecraftlm's terrain package (octave heightmaps, biome layers, beach masks); that project is GPLv3 so NO code was copied — implementations are original over this repo's hashString lattice.
- Interiors: `ensureFloorsWithRooms`/`synthesizeFloorRooms`/`splitRoomRect` give every storey typed rooms. Source-package rooms are preserved verbatim; missing floors get a deterministic BSP split (seeded by town/building key, so identical coordinates regenerate identical interiors) into hall/kitchen/workshop/storage (ground) and bedroom/study/storage (upper), feeding FurniturePlanner's room kits. Approach inspired by GDMC settlement generators (github.com/ScholliYT/MGAIA-Minecraft-GDMC: coordinate-driven houses with typed furnished interiors); implementation original. Verified: 402/402 buildings have rooms on every floor (1389 rooms).
- Acceptance (2026-07-08 run): 50 towns / 402 buildings / 226 flights — 0 invalid flights, 0 duplicate-height flights, 0 routing failures, 0 multi-story buildings lacking flights, 0 exposed raised elevation islands; 1364 chunks compiled.

---

# PLAN 5 — Wave Function Collapse Facades & Persistent Shared World (2026-07-08, IMPLEMENTED)

- New shared module `client/src/data/WaveFunctionCollapse.js`: a generic, dependency-free WFC solver (minimum-entropy collapse + AC-3 constraint propagation, salted-seed restarts, guaranteed-termination fallback). Technique per Maxim Gumin's WFC and its GDMC settlement applications (github.com/ScholliYT/MGAIA-Minecraft-GDMC assembles buildings from modules under adjacency constraints); implementation is original. The solver is graph-generic (`nodes`/`tiles`/`compatible`/`fixed`/`seed`) so future passes (massing, districts, interiors) can reuse it.
- First applied tileset: building facades. `resolveFacadeWindows` (importer) turns each building's perimeter shell into a ring of wall slots, pre-collapses corners plus the door column and its flanks to wall panels, and collapses the rest under the contract "window never touches window". Exported as `building.facadeWindows`; re-collapsed whenever door relocation re-plans a building (`applyStairCoverageToBuilding`). Runtime `BuildingData.isWindowCandidate` consumes the baked plan (legacy hash rhythm remains only as fallback for planless data).
- Persistence contract: every WFC seed derives purely from imported map data (`town.seed + town + building id`), and the resolved world is baked into `ActiveWorldData.js` + magic-voxel chunks — all players load the identical world. `payload.world.contentHash` (hash of all resolved towns) is exported so any client/server can assert it is walking the same world build.
- Acceptance (2026-07-08 run): two consecutive imports produce byte-identical `ActiveWorldData.js` (sha256 match); 402/402 buildings carry WFC facade plans (2,461 windows, avg 6.1/building), 0 window-adjacency violations, 0 door-flank violations, 0 buildings with zero windows; contentHash `e858385`; 1,364 chunks compiled.

---

# PLAN 6 — WFC-First Building Generation & Exterior Prop Removal (2026-07-08, IMPLEMENTED)

- The baked source JSON is now only the town SKELETON: footprints, doors, positions, roads, terrain. Building identity is resolved by a town-level wave-function collapse (`applyBuildingArchetypeWave`, importer): nodes are buildings linked to their ≤ 4 nearest neighbors within 10 cells; tiles are 7 archetypes (cottage/bayfront/townhouse/workshop/hall/manor/tower), each defining architecture styles, storey range, wall material, and roof palette. Footprint span restricts each building's domain; the source JSON `type` only multiplies tile weights (soft prior — a CHURCH is likely, not forced, to collapse into a hall); the adjacency contract forbids two identical landmark archetypes (tower/hall/manor) from collapsing next to each other, so landmarks spread across the town.
- Solver upgrades (`WaveFunctionCollapse.js`): per-node weight priors (`nodeWeights`) and per-node restricted domains (`domains`) so partial source data biases without dictating; entropy and weighted picks are per-node.
- Downstream order preserved: the wave runs before entrance alignment, so stair planning, storey clamping (`applyStairCoverageToBuilding` now also re-syncs `floors`/rooms to the collapsed storey count), facade wave, and room synthesis all follow the collapsed archetype.
- Exterior decoration props fully disabled via `ENABLE_EXTERIOR_DECORATIONS = false` (clean gate; planner, road-shoulder kit, and runtime rendering kept for re-enable). Interior furniture pipeline untouched.
- Acceptance (2026-07-09 run): byte-identical double import, `ActiveWorldData.js` sha256 `131ff41651e9305fbdd3f580a96dd804c2e83284e61ed72e955fc1936d679f25`, contentHash `1012e019`; archetype histogram bayfront 86 / cottage 23 / hall 42 / workshop 90 / townhouse 125 / manor 33 / tower 3 across 9 architecture styles, timber 199 / stone 203, storeys 1:178 / 2:208 / 3:16; 0 same-landmark pairs within 10 cells; 0 multi-story buildings lacking flights; 0 facade adjacency violations; 0 floors/storey mismatches; 0 exterior decorations; 1,364 chunks compiled.

---

# PLAN 7 — Visible WFC Massing & Lot Offsets (2026-07-09, IMPLEMENTED)

- WFC is no longer only semantic/material metadata. After the town-level archetype wave resolves, `applyWaveMassingAndPlacement` turns each building into an archetype-specific footprint: bayfront recesses, workshop L-shapes, stepped rows, manor crosswings, hall courtyards/market courts, compact tower cores, and chamfered cottages.
- The same pass tries deterministic nonzero lot offsets within a small radius, validated against current building occupancy, terrain, roads, walls, water, and map bounds. This keeps the source town JSON as a read-only skeleton while making the baked runtime town visibly different from the original source placement.
- Old matrix building-floor skeleton cells are cleared when a WFC building moves or changes shape (`reconcileBuildingSkeletonGround`), preventing ghost floor tiles at the original source footprint.
- Downstream order remains: WFC archetype + massing + safe lot shift → stale skeleton cleanup → door alignment → stair planning/coverage → facade WFC → room/floor sync → structural matrix export.
- Acceptance (2026-07-09 run): byte-identical double import, `ActiveWorldData.js` sha256 `c5764109a07fc8db601c73070504f95e03ec02bdc35d3ac431110ffa4ea50dd3`, contentHash `143bd574`; 402/402 buildings non-rectangular, 331/402 shifted from source skeleton positions, 0 stale skeleton floor cells, 0 footprint overlaps, 0 multi-story buildings lacking flights, 0 floors/storey mismatches, 0 missing rooms; 1,364 chunks compiled.

---

# PLAN 8 — Hierarchical Town WFC & Living Auzoryia World (2026-07-11, IMPLEMENTED)

- `WaveFunctionCollapse.js` is now a deterministic exact constraint solver: canonical node/tile ordering, Shannon entropy, bidirectional propagation, keyed weighted choices, and exhaustive backtracking. Invalid domains and unsatisfiable waves throw explicit errors; there is no greedy invalid fallback. Set/Array domains, fixed assignments, disconnected-graph stability, reordered-input stability, odd-cycle failure, and facade constraints are covered by 11 passing tests.
- `TownWavePlanner.js` converts arbitrary validated town matrices into numeric feature fields (multi-source Manhattan distances to water, roads, plazas, walls, and edges plus compactness, elevation, and graph centrality). A bounded spatial graph feeds two linked waves: six districts (`civic`, `residential`, `harbor`, `market`, `garden`, `artisan`) followed by building archetypes/palettes/activities. Source JSON types are soft priors only.
- The importer validates matrix shape and legends instead of depending on hand-inspected town files. A hash-ranked mathematical lot sampler fills sparse settlements while respecting buildable terrain, slopes, roads, walls, water, bounds, and occupied footprints. This adds 204 deterministic lots, bringing all 50 towns to at least five buildings and 606 total.
- Negative-space regions now produce corridor-safe market, crop, staging, yard, garden, and green infill. The runtime renders seeded flowers, varied foliage, larger canopies, roofs that reflect WFC archetypes, habitat-based wildlife, and a broad isometric camera. A replay variant changes palettes and living details while preserving the shared walkable layout and collision map.
- World identity is `auzoryia`; generation metadata uses `hierarchical-town-wfc-v2` plus a SHA-256 content hash and is carried through maps and multiplayer sync. Runtime default-town selection is a vitality score rather than a hard-coded JSON entry.
- Acceptance (2026-07-11 run): byte-identical double import, `ActiveWorldData.js` sha256 `f443344a38773de2c6d307ec1e8ef246164598ab963de194a238ec41c9fe39b8`, contentHash `8c5c4d324b25e5b7ddb508ca542bf78f3f786735519ca0aacdb17b4368af189a`; 50 towns / 606 buildings / 204 synthesized buildings / 7,584 exterior decorations / 3,000 facade windows / 0 validation violations; 1,364 magic-voxel chunks compiled; production Vite build passed.

---

# PLAN 9 — Topographic Variant Matrix & Vibrant Vertical World (2026-07-12, IMPLEMENTED)

- Generation is now `hierarchical-town-wfc-v3-topography`. Every town gets a deterministic continuous terrain field combining world-gradient tilt, broad hills/basins, low-frequency value noise, percentile terraces, and coherence cleanup. Building footprints remain plateaus and all adjacent walkable/road cells differ by at most one elevation tier.
- Each town exports a rectangular base36 `visualVariantRows` matrix. `floor(code / 6)` is the stable topographic/material zone and `code % 6` is the replayable color variant. Replay changes the micro-palette and living detail while preserving tile identity, elevation, walkability, and the topographic zone.
- The renderer consumes that matrix through the full tile→voxel path. Twenty-three palette families provide 119 deterministic variants across terrain, cliffs, roads, water, masonry, timber, roofs, doors, floors, and jewel windows. Layered rock strata, grass lips, moss, shallow-water gradients, larger faceted foliage, richer roofs/facades, atmospheric motes, and seeded waterfalls increase depth without changing collision.
- Landmark grammar expanded to fountains, overlooks, waterfalls, windmills, banners, lantern clusters, archways, and clock towers. Placement remains matrix-ranked and corridor-safe; the map panel exposes every landmark type and elevation tier.
- Multiplayer map handoff now uses `palette-height-v1`: a deterministic collision palette plus two compact character matrices. Murgena's 80×60 server payload falls from 672,697 bytes to 10,484 bytes, while preserving collision/material semantics and elevation. The server acknowledges acceptance before its authoritative surface can replace the authored town spawn.
- Acceptance (2026-07-12 run): byte-identical re-import, `ActiveWorldData.js` sha256 `460bed01cb0262534498d2e6978b4ad7c17a6149cc15593718521650b0860641`, contentHash `43421c9007bb7843ccb9fd4401681de589399dd3f7d2d71e0b3a20ea68bec7c5`; 50 towns / 603 buildings / 201 generated buildings / 10,074 decorations / 3,011 facade windows / 389 matrix landmarks; all 36 variant codes exercised; average town elevation depth 4.3; 22,878 walkable ramps and 10,384 road ramps with zero steep walkable edges. Fifteen tests, world validation, production build, and 1,364 magic-voxel chunks pass.
