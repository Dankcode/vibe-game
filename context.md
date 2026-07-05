# Context

- Active source map package: `map-data`, imported from the normalized `world-map-source/map-data.*` package. Runtime world id/name remain static as `auzoryia` / `Auzoryia` unless intentionally renamed.
- The active world data is written to `client/src/data/ActiveWorldData.js`, and generated voxel chunks are written to `shared/magic-voxels/`.
- `world-map-source/` is the dedicated active map package folder. It must contain the source package `manifest.json`, `map-data.json`, `map-data.png`, optional `map-data.svg`, and `towns/`. `npm run replace:world-map` imports that folder into `client/src/data/ActiveWorldData.js`, then recompiles all burg voxel windows.
- The active imported runtime identity is static while testing: world id `auzoryia`, world name `Auzoryia`. Source package names may vary, but parser/runtime identity should not drift unless the project intentionally renames the active world constants.
- The map package is already character-scale. The importer treats the vector matrix as the source of truth, converts it to tile rows, then compiles those rows into voxel columns.
- Towns are generated from shared code paths rather than per-city hand edits. Building doors, stairs, footprints, roads, city walls, and gate passages should be corrected in generator/importer code so every city benefits.
- Map and city behavior should be understood from generator/importer formulas, vector-matrix schemas, symbols, and shared rules. Do not iterate over or manually inspect all generated map data/JSON payloads such as `ActiveWorldData.js`, legacy world modules, or every magic-voxel chunk to derive fixes; use targeted samples only when validating a formula.
- FNG/matrix town imports must treat building vector cells, room tiles, footprint cells, and polygon outlines as the primary building footprint source. Rectangular `grid_rect` data is only a fallback/container for scaling and should not force rectangular buildings when vector footprint data exists.
- Auzoryia currently uses generated thick city walls with gate passages, interior wall walkways, and 2-by-4 supported stair runs up to the top of the wall.
- Buildings are voxel-footprint based and may be rectangular, square, L-shaped, curved/stepped, courtyard-like, or any other connected footprint expressible as tile cells. Rules must use the actual `footprintCells`/footprint set, not assume rectangular bounding boxes.
- Building door placement is validated against both sides of the doorway: the outside approach must be walkable, and the inside must have a non-edge landing cell.
- Non-rectangular building footprints can be repaired with a small entry vestibule when the source matrix would otherwise force a corner door or a blocked interior.
- Building stairs are represented as explicit stair/support cells, not a single stair marker. Downstream landing cells are not emitted because they expand the validated 2-by-4 stair footprint.
- Doorway voxels are simplified entryway placeholders for this test build: complex door assets are not instantiated. Each exterior door column clamps to the building's ground/plateau base elevation, keeps a 1 x 1 horizontal footprint, creates a walkable floor at that base coordinate, carves exactly two vertical Z-axis air voxels above it for player passage, and resumes solid wall/window voxels above the clearance.
- Structural matrix rules now live in `client/src/data/StructuralMatrixRules.js` and are shared by the building stamper, importer, tile voxel creation, and magic-voxel compiler registry.
- Building shells are repaired after stamping so every perimeter cell is a wall or window voxel, with only validated doors allowed as openings.
- Building elevation now matches the footprint plus a small apron to a plateau height before floors are placed, preventing floating or clipping floor slabs on uneven terrain.
- Building stair generation uses a rotatable 2-by-2 triangular module and a 2-by-4 run, with a solid-support configuration and a hollow floating-slope configuration available from the shared rules file.
- Stair cells are spatially validated before export: each local 2-by-2 module can contain only one staircase module, generated stair runs cannot extend into six-block layouts, stair heights are offset by their source floor level, headroom is carved over the incline, and stair termini must land on a populated upper-floor or roof structural voxel.
- Multi-story buildings now attach structural floor-level metadata to interior cells so every elevated floor layer is populated across the full interior footprint instead of only near stairs.
- Door voxels carry a ground-relative base elevation and wall-cap metadata. The base is sampled from the terrain beneath the structure and stabilized to the same plateau used by the building footprint so door clearances do not float one Z layer above the foundation.
- Excess road/town decoration is disabled until placement has a stronger plan tied to roads, doors, and usable negative space.
- Window lower and upper parts are treated as wall collision parts. Hidden obstruction visual blocks must not change movement collision.
- Every non-air voxel block now receives explicit AABB collision metadata at runtime and in compiled magic-voxel chunk registries.
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

# PLAN — Vector→3D Congruence & Furniture Overhaul (2026-07-03, plan only, not yet implemented)

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

## D. Function stubs to implement (game repo)

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

STATUS (2026-07-04): §G stairs IMPLEMENTED — `createStairFlight`/`assertStairFlightInvariants` replace `createTwoByFourStairRunCells`/`validateStairModuleCells`; air-shaft cells are exported in `stairCells` with role `air`; `validateStaircaseRouting` carves the shaft column; `WorldGenerator.canMoveBetween` allows the stair diagonal past the solid support when the air-shaft corner lane is clear. §I elevation IMPLEMENTED — `computeTownTilt` (plane fit over world `heightSamples`), `createTerraceBandGrid`/`applyTerracedElevation` (bands ≥ 6 cells, ≤ 3 tiers, 1-tier walkable steps), `enforceElevationClusterCoherence` (min cluster 8, plus a final pass after door approaches); city-wall works ride the local terrace band. §H infill PARTIALLY IMPLEMENTED — ground-variety clusters (`infillTownOpenSpaces`, `normalizeLooseSurfaceClusters`) and the road-shoulder decoration kit are live; the themed prop-region phase (§H.2–3 market/yard/crop/staging/green kits + corridor guarantee) is SCAFFOLDED ONLY as commented stubs: `planNegativeSpaceInfill`/`classifyInfillRegion`/`fillInfillRegion`/`regionStaysConnected` in `tools/import_world_map_package.mjs`, and `addDecorTree/Well/Stall/Woodpile/Boulder/Cart/Garden` mesh stubs in `client/src/systems/WorldGenerator.js`. Acceptance run: 50 towns / 402 buildings / 314 flights — 0 invalid flights, 0 duplicate-height flights, 0 routing failures; all 50 towns terraced; 0 exposed raised elevation islands (21 wall-enclosed courtyard pockets remain by design).

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
