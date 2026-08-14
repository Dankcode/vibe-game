# PLAN 10 (Rev 6) — Blueprint-First WFC: Fixed FMG Skeleton, Partial Cores, Generated Terrain + Buildings

**Status:** Rev 6 implemented · **Date:** 2026-07-23 · **Scope:** this repo only.

WFC remains the primary generator for terrain and buildings, but the global FMG export now passes through an **offline settlement-blueprint compiler** first. The compiler fixes hierarchy, walls, gates, castle plots, roads, ward priors, crossings, docks, climate, and waterfalls before runtime collapse. The JSON-derived blueprint limits chaos; it is never spliced as a town, and no town/building file JSON is opened. Inside walls, per-ward waves strongly favor buildings over terrain changes. The minimum enterable interior remains **2×3**.

## Implementation record (2026-07-23)

- `tools/compile_world_blueprints.mjs` and `SettlementBlueprint.js` retain the refreshed global FMG payload as a 60-burg source archive, then compile only the 10 curated IDs in `manifest.active_burg_ids` into runtime blueprints. The active set is balanced across the five themes (2 burgs per theme) and contains 6 seats plus 4 unwalled fiefs; the other 50 burgs remain source-only.
- `WorldConstraintField.js` projects the selected related cluster and stamps a variant-stable skeleton. It no longer invents or relocates settlement envelopes at runtime; every view contains at most one seat wall system, and fiefs remain open villages connected by compiled roads.
- `GeographicWFCGenerator.js` runs fixed skeleton → terrain collapse → per-ward building waves. Capital seats retain three aligned rings, their compiled voxel heights, and an enterable 9×9 keep; castle, civic, market, harbor, artisan, residential, and garden priors influence density and archetypes.
- `ContextualBuildingWFC.js` consumes ward/district priors, while `BakedBuildingLibrary.js` supplies formulaic code-native landmarks, a valid minimum cabin, and fixed-area building placement. All generated and baked interiors preserve a free 2×3/3×2 space.
- `PartialChunkRegistry.js` and `bake_partial_chunks.mjs` replace the retired full magic-voxel dump. A clean 3×3-chunk terrain/elevation core is pinned by global lattice coordinate, schema, generation version, sample scale, and world content hash; terrain seam repair may change the live boundary but never a compatible baked cell.
- Terrain WFC now uses world-variant seeds, global cell/node ids, complete 8×8 chunks, and a chunk-aligned halo before cropping. Adjacent one-sample views are bit-identical across every overlapping terrain id, elevation, final symbol, palette, and visual-variant cell.
- Confinement is part of the shared terrain/building formula: uncertain FMG macro water is soft inside a compiled wall envelope so the ward wave can reclaim it as stable urban ground, while parser-authored water and every skeleton node stay fixed.
- Clipped coastal seats receive a deterministic compact-adjacency fallback only after the normal ward solver fails. It removes aesthetic padding—not structural occupancy—and reruns the same validated 4×5 cabin solver, preserving the required 2×3 interior and free exterior approach.
- Blueprint coverage now uses exact field patterns and rejects unrecognized nested FMG fields, preventing schema drift from being mislabeled as consumed.
- `WorldGenerator.js` renders a crenellated keep with turrets, textured roof families, vibrant district accents, and complete metadata-driven multi-tier waterfalls with mist and plunge pools. Terrain-only voxels are sanitized so structural window/door metadata cannot leak onto grass or water.
- `validate:world` now enforces compiler coverage, no forbidden town/building JSON reads, one seat per cluster, unwalled fiefs, fixed skeleton replay stability, three-ring capitals, keeps, ward waves, waterfall metadata, and zero WFC contradictions across the runtime checks.
- Current default Trilza acceptance: 10 enterable buildings, 2 baked landmarks, 3 ward waves, 3 wall rings, 1 keep, 34 decorations, 44.7% physical urban footprint coverage, 100% confined parcel building assignment, 0 WFC fallbacks, and 0 contradictions.

---

## 0. Survey result (unchanged from Rev 1)

The uncommitted geographic-WFC rewrite replaced the town import pipeline:

- `tools/import_world_map_package.mjs` shrank from **2,820 lines (git `b8bff7f`) to 259** and hard-codes `ACTIVE_TOWNS = Object.freeze({})` (line 225). All town matrices, interiors, rooms, stairs, walls, and terraces from PLANs 1–9 stopped loading.
- `GeographicWFCGenerator.js` synthesizes the world alone: `synthesizeSettlements` (:544) caps at 4 burgs/view, `createLotBuilding` (:699) emits `stories:1`, no floors/rooms/interiors → hollow, inaccessible, repetitive towns.
- `world-map-source/` still holds 50 burg JSONs (402 interiors, 314 multi-story, 29 walled towns) and `map-data.json` (30 states, 12 cultures, routes, rivers, per-cell height) — unused.

## 1. ADR

### Context
One WFC must generate terrain *and* buildings so the world stays coherent and surprising, while the imported JSON keeps it believable and bounded. Walls define urban confinement. Token rule stands: JSON is parsed once at import in Node; runtime reads baked compact structures only (rules.md :44).

### Options
- **A — Splice baked towns verbatim, WFC for wilderness only** (Rev 1 choice). Low risk, but towns are frozen replicas; WFC never shapes them. Rejected by requirement.
- **B — Unified constrained WFC (CHOSEN):** one coupled wave generates terrain and buildings everywhere; JSON-derived hard constraints (walls, gates, water, primary roads) and soft priors (counts, mix, elevation variance) bound it; a few baked prefabs are pre-collapsed into the wave per town.
- **C — Pure runtime WFC, no JSON influence.** Maximum chaos, no believability, ignores the data. Rejected.

### Decision
Option B. Formula: the wave's freedom at a cell is a function of the JSON — `chaos(x,y) = f(constraints)`, never a constant.

### Consequences
Easier: towns differ per seed yet respect the map; landmark authenticity via prefabs. Harder: two-layer wave coupling and constraint compilation (WS2); prefab fitting (WS4). Revisit: streaming, decoration re-enable.

---

## 2. Code review — bug ledger (unchanged, file:line)

| # | Location | Issue | Sev |
|---|---|---|---|
| 1 | `import_world_map_package.mjs:225` | `ACTIVE_TOWNS = {}` — imported town/interior data dropped | 🔴 |
| 2 | `GeographicWFCGenerator.js:544–747` | Ad-hoc settlements: ≤4 burgs, 1 story, no rooms/interiors | 🔴 |
| 3 | `GeographicWFCGenerator.js:473–522` | Elevation from tile band only → flat/+1 world | 🟠 |
| 4 | `WorldGenerator.js:633` vs `:2634` | Decorations gated at `visibleTileRadius + 10`, tiles at `visibleTileRadius` → floating clutter past LOD | 🟠 |
| 5 | `TileRegistry.js:240–251,:310` | All HYDRO `walkable:false` — shallow water blocks routes | 🟠 |
| 6 | `TileLibrary.js:661–665` | Window building-parts/motifs bleeding onto ground tiles | 🟠 |
| 7 | `GeographicWFCGenerator.js:26,:829` | Clutter synthesizer not behind `ENABLE_EXTERIOR_DECORATIONS` gate | 🟡 |
| 8 | `GeographicWFCGenerator.js:601` | Identical straight-arm road star; ignores `world.routes` | 🟡 |
| 9 | theming | Only state/culture *colors* used; names/capitals/walls/population unused | 🟡 |
| 10 | `FantasyWorldData.js`/`Game.js` | No persistence contract for per-view plans (weakens PLAN 5 shared-world hash) | 🟡 |

Preserve: `WaveFunctionCollapse.js` solver (+tests), `TownWavePlanner` fields, `WorldTileSet` bands, `NetworkMapCodec`, `StructuralMatrixRules`/`FurniturePlanner`/obstruction stack.

---

## 3. Workstreams

### WS1 — Importer: constraints + prefabs instead of verbatim towns
1. Restore needed pieces of the `b8bff7f` importer, but its output changes role. `npm run replace:world-map` emits:
   - `ACTIVE_WORLD`, `ACTIVE_GEOGRAPHY` (as today);
   - **`ACTIVE_TOWN_CONSTRAINTS`** per burg — the inhibitor envelope (§WS2.2), a few hundred bytes each;
   - **`ACTIVE_BAKED_BUILDINGS`** — prefab library (§WS4.1);
   - **`ACTIVE_WORLD_DIGEST`** — per-burg one-liners + state/culture themes table (≤10 KB) so no session ever reopens the 77 MB `towns/`.
2. Only this Node script reads `world-map-source/**`. It also auto-writes `world-map-source/DIGEST.md`.

### WS2 — Unified constrained WFC (the formula change)
Replace `synthesizeSettlements`' ad-hoc lots with a **two-layer coupled wave** in `GeographicWFCGenerator.js`, both layers solved by the existing `WaveFunctionCollapse.js`:

1. **Urbanization field** `U(x,y) ∈ [0,1]` compiled per view:
   - `U = clamp( wallInterior(x,y) ? 0.92 : popFalloff(dist to burg, population) + roadProximity(x,y) )`
   - `wallInterior` from the baked `matrix.city_wall` polygon; `popFalloff = min(0.75, 0.75 · exp(−d/r))`, `r = radius(population)`; `roadProximity` adds ≤0.15 within 2 cells of a route.
2. **Constraint envelope** (`ACTIVE_TOWN_CONSTRAINTS`, hard fixes = pre-collapsed wave nodes):
   - city-wall ring + gate cells fixed from `matrix.city_wall` (29/50 towns);
   - primary road polylines from `world.routes` fixed as road tiles (replaces the straight-arm star, bug 8);
   - water cells from world data fixed; spawn plaza fixed.
   Soft priors (weight multipliers, the "inhibitor" dial):
   - building-count target `N ± 25%` from digest; archetype mix from state/culture theme (WS6);
   - elevation variance bound `σ_e(x,y) = σ_world · (1 − 0.8·U)` — terrain stays wild in wilderness, calm in town;
   - inside walls: terrain layer domain restricted to {urban ground, plaza, road}; elevation deltas clamped ≤1 tier to the wall plateau; hill/mountain/cliff weights ×(1−U)².
3. **Terrain layer** — existing chunked terrain wave, with domains/weights modulated by `U` and `σ_e`, plus PLAN 9 topography (tilt + terraces + 2-octave noise + cluster coherence) replacing band-only `createElevationRows` (bug 3). Walkable-adjacent delta ≤1 tier; roads cross steps via ramps.
4. **Building layer** — nodes are parcels produced by a deterministic parcel pass over post-terrain rows (road-adjacent strips subdivided 3–12 cell spans); tiles are archetypes (existing `SETTLEMENT_ARCHETYPES` + `TownWavePlanner` districts). Node density ∝ `U`: inside walls parcels tile nearly every road frontage ("mainly buildings vs terrain changes"); outside walls only sparse cabin/farm parcels where `U > 0.2`. Baked prefabs enter as fixed assignments before collapse (WS4). Adjacency keeps the landmark-spread rule.
5. Every collapsed building goes through the full downstream pipeline restored from PLANs 1–9: massing → door validation → stairs (`createStairFlight`) → floors/rooms → facade wave → `FurniturePlanner`. This is what makes WFC buildings *enterable*, unlike today's shells (bug 2).

### WS3 — Enterable minimum: 2×3
1. Rule (rules.md addition): every enterable building must contain a free interior block ≥ **2×3** (either orientation) after walls/stairs/furniture; the door landing must open into that block. A one-room 2×3 cabin is the smallest legal building (footprint 4×5 with walls).
2. Importer/parcel pass: parcels that cannot host a 4×5 footprint are dropped or merged; `splitRoomRect` forbids splits leaving interior spans <2×3 (merge instead); buildings failing repair collapse to non-enterable decoration — never a door into a dead cell.
3. `FurniturePlanner.validateRoomWalkability` additionally asserts one 2×3 free block per room (sliding window) and keeps it plus the door landing unfurnished.

### WS4 — Baked building injection (new function)
1. **Prefab library** (importer): extract each source building into a portable record — footprint cells (normalized), floors[].rooms, door, stair cells, interior record, archetype, size class, source state/culture. Deduplicate by shape+rooms hash; keep ~40–80 distinct prefabs in `ACTIVE_BAKED_BUILDINGS`.
2. **New function** in `GeographicWFCGenerator.js` (or `WorldPlanComposer.js`):
```js
// placeBakedBuildings — stamp a few authentic imported buildings into a WFC town.
// area: candidate region (cells or rect) from the parcel pass; requirements: counts/archetypes/theme.
// Returns fixed assignments consumed by the building wave (pre-collapsed nodes).
export function placeBakedBuildings({ townSeed, area, parcels, requirements, prefabs, terrain, roads }) {
  // 1. count = clamp(round(area.cells / 220), requirements.min ?? 2, requirements.max ?? 4)
  // 2. rank prefabs: theme match (state/culture) > required archetypes (hall/manor first in walled towns)
  //    > size fits a free parcel with door edge on a road > deterministic hash tiebreak (mulberry32(townSeed))
  // 3. for each pick: choose the parcel minimizing terrain flattening cost; validate door approach,
  //    plateau, spacing ≥ 2 cells from other fixed nodes; reserve footprint; emit fixed assignment.
  // 4. rejected picks fall back to next prefab; return [] only if area hosts no legal parcel.
}
```
3. Requirements defaults: walled town → 1 civic anchor (hall/temple) + 1–2 residential/workshop prefabs near the plaza; unwalled → 1–2 cabins/farmhouses. Prefabs keep their baked interiors verbatim (rooms, stairs, furniture plan seed), giving each town a couple of authentic buildings among the WFC-generated ones.

### WS5 — Water: walkable shallows + reachability (as Rev 1)
`HYDRO:1` shallow → `walkable:true, moveCost≈1.6`; new explicit **ford** tile (`=`) for generator-stamped crossings; deep `W` stays blocked. Post-plan flood-fill: every land component ≥8 cells reachable, else convert cheapest ≤4-tile crossing to ford/shallow. Rivers width-1 render shallow.

### WS6 — City-state/culture theming (as Rev 1)
Importer derives per-state/culture themes (names exist: Mesieauvilia, Portuzian…) → digest. Themes feed WFC priors (archetype mix, palettes, roofs, wall material) via existing `nodeWeights`/`domains`; state color tints territory ground; sky/fog already wired (`:571–575`).

### WS7 — Clutter removal + LOD fix (as Rev 1)
Gate `synthesizeDecorations` + doodads behind `ENABLE_EXTERIOR_DECORATIONS = false`. Fix bug 4 regardless: decoration/landmark visibility keyed to the underlying tile's `visibleByRange`, never a larger radius — nothing renders above an unloaded tile.

### WS8 — Window-parts-on-ground: diagnose + invariant (as Rev 1)
Script one composed plan for cells with `building ≠ NONE` window parts on terrain elements; suspects `TileLibrary.js:661–665` parity math and stale parts after massing. Enforce in `createVoxelBlock`: terrain elements carry `building = NONE`; window parts only on STRUCTURE voxels; validator asserts 0.

### WS9 — Token-frugal contract (as Rev 1)
Runtime/tests/agents read only digest + constraints + prefabs. `validate_world_generation.mjs` gains the new invariants (2×3 interiors, reachability, window invariant, LOD, wall-confinement bias) checked on 3–5 sampled towns + aggregate counters — never full-JSON iteration in-session.

---

## 4. Execution order & acceptance

WS1 → WS2 → (WS3 ∥ WS4) → WS5 → WS6 → WS7 → WS8, validator (WS9) grows with each. Each step: `npm test`, `npm run validate:world`, full regen regression (byte-identical double import).

1. Import: 50 constraint envelopes, prefab library non-empty, digest matches manifest counts; no runtime reads of `world-map-source/**`.
2. Wave: same seed ⇒ identical plan; different variant ⇒ different building layout with constraints intact (walls/gates/routes/water unmoved).
3. Confinement: inside wall rings, ≥70% of non-road cells are building/plaza and elevation variance ≤ ⅓ of the same-seed wilderness variance; outside, terrain tiers ≥4 per view.
4. Buildings: every enterable building passes the 2×3 free-block probe, door invariants, stair coverage; pathfinder enters and reaches every floor (sampled).
5. Baked injection: each town with a qualifying area contains 2–4 prefab placements matching theme/archetype requirements; prefab interiors verbatim.
6. Water: 0 unreachable land components ≥8 cells; shallow/ford walkable end-to-end.
7. Clutter/LOD: 0 exterior decorations; 0 groups visible over out-of-range tiles.
8. Windows: 0 terrain cells with window parts/motifs.

## 5. Files touched

Modify: `tools/import_world_map_package.mjs` (constraints/prefabs/digest emitters), `tools/validate_world_generation.mjs`, `GeographicWFCGenerator.js` (urbanization field, coupled wave, parcel pass, `placeBakedBuildings`), `TownWavePlanner.js`, `WaveFunctionCollapse.js` (only if fixed-assignment API needs extension — it already supports `fixed`), `WorldTileSet.js`, `TileRegistry.js`, `TileLibrary.js`, `WorldGenerator.js`, `FurniturePlanner.js`, `rules.md`, `context.md`.
Add: `WorldPlanComposer.js` (constraint compilation + prefab placement), `world-map-source/DIGEST.md` (generated).
Remove/gate: `createSettlementLots`/`createLotBuilding` ad-hoc path, `synthesizeDecorations` output, straight-arm road star.
Regenerate: `ActiveWorldData.js`, `shared/magic-voxels/`.

## 6. Open questions
1. Prefab count per town: fixed 2–4, or scale with town area/population (e.g. `area/220` capped at 6)?
2. Should the building wave be allowed to *attach* generated wings to baked prefabs (connected-building mechanism exists), or keep prefabs untouched?
3. Persistence: bake the spawn-region composed plan at import for the multiplayer contentHash guarantee, generate the rest on demand from the same seed? (Recommended.)

---

# Rev 3 — Post-implementation fixes (2026-07-14)

Reported after the Rev 2 build: upper-floor doors, undersized capital walls, window parts on ground blocks recurring, LOD fragments recurring, latitude ignored up north, and twin towns in one view. Plan below; no code edited yet.

## R-ledger (new bugs, grounded in the implemented code)

| # | Symptom | Root-cause area | Sev |
|---|---|---|---|
| R1 | Door rendered on 2nd floor while entry passes through a 1st-floor opening | Vertical door stamping: `ContextualBuildingWFC` plans doors in 2D (x/y/edge only — `doorForEdge` :884); the storey loop that extrudes shells/facades re-emits a door/opening per level instead of only at the plateau base. rules.md :21 already forbids repeated upper-story holes | 🔴 |
| R2 | Large burgs have small walls and plain gates | `createWallBounds` (`WorldConstraintField.js:123`) sizes only the *radius*; wall height/thickness and gate form are constants; `getWallGateCells` (:147) emits bare 1-cell gates, `fourGates` is the only dial. Population/`capital`/`citadel` never scale grandeur | 🟠 |
| R3 | Ground blocks with window parts again | The WS8 invariant was never enforced in `TileLibrary.createVoxelBlock` — window parity math (:661–665) still runs wherever a stale/misclassified building part reaches a terrain column | 🟠 |
| R4 | Fragments visible outside LOD again | `updateLivingWorld` radius was fixed (:633), but tile **child objects** (window glass, the new runtime door meshes, facade decor from Rev 2) and landmark groups are gated by their own radius/none, not by the parent tile's `visibleByRange` | 🟠 |
| R5 | Northern cities ignore latitude | Zero uses of `geo_coordinate`/`latN`/`latS` in `client/src` or `tools` (grep-verified). Biome priors come from cell biome only; palettes never shift with latitude | 🟠 |
| R6 | Two separate cities in one map | `synthesizeSettlements` iterates every anchor in view (:765) — two nearby burgs each stamp a full settlement + wall envelope. No merge rule | 🟠 |

## R-workstreams

### R1 — One door, ground floor only
- Invariant (rules.md addition): a building has **exactly one exterior door column**, its base at the footprint plateau elevation; `BUILDING_PART_TAGS.DOOR` may never appear at `z > plateauBase + 1` (the 2-voxel clearance), and upper storeys extrude solid wall/window over the door column (rules.md :21).
- Fix: make the door a *column property* resolved once per building (from the 2D plan), consumed by the storey loop — never re-derived per level. Baked blueprints and WFC buildings share the same resolver, so a prefab door can't coexist with a WFC door on another level.
- Validator: scan sampled plans for DOOR tags above clearance and for buildings with ≠1 exterior door; must be 0.

### R2 — Wall & gate grandeur scales with the burg
- `wallTier = 1 + (population ≥ 70) + (population ≥ 200) + capital`, `citadel` adds a keep. Drive from burg flags already in the manifest (`capital`, `citadel`, `walls`, population).
- `createWallBounds` gains `tier`: radius (already pop-based), **thickness 2/3/4 cells, height 4/5/7 voxels** by tier; walkway width follows thickness.
- `getWallGateCells` → gatehouse modules: tier 1 = current 1-cell gate; tier 2 = 2-wide passage + flanking towers (+1 height); tier 3/capital = grand gate — 3-wide passage, twin towers (+2), banner/lantern decor from the landmark grammar, four gates always. Gate approach road widens to match.
- Acceptance: monotonic — for sampled burgs, wall height/thickness/gate width never decrease as population tier rises; capitals have 4 grand gates + keep.

### R3 + R4 — Window-on-ground and LOD fragments, closed for good
- Enforce at the single choke point `TileLibrary.createVoxelBlock` (:178): if `element` is terrain (GEO/ANEMO/CRYO/HYDRO/PYRO) force `building = NONE` and strip window/door parts; count repairs, surface them in `validate:world` (target 0 — a nonzero count now points at the upstream emitter instead of rendering as glass on grass).
- Diagnostic first (20-line script over one plan) to name the emitter: stale parts after massing/wall stamping vs. the parity math at :661.
- LOD rule: **a child never outlives its parent tile.** Window glass, door meshes, facade decor ride the tile mesh (already children — verify none are added to the world root); decorations/landmarks gate per-cell on the underlying tile's `visibleByRange` (lookup, not radius). Add a scripted camera sweep that asserts 0 visible objects whose ground tile is unloaded.

### R5 — Latitude-aware generation
- `latitudeOf(worldY) = latN − (worldY / world.height) · latT` from `map_coordinates` (latN 59.8 → latS −44.6); burgs also carry exact `geo_coordinate`.
- `temperature(x,y) = f(latitude) − elevationLapse`; thresholds drive: palette family shift (snow/taiga/frost vs. temperate vs. arid), snow-capped roofs + frozen shallow water above the snowline, conifer-biased foliage, and terrain-wave domain nudges (tundra/taiga/glacier weights ↑ north, desert/savanna ↑ hot belt). Southern hemisphere mirrors (map crosses the equator).
- Acceptance: two same-seed views at latitude 55°N vs 5° differ in palette family and roof/water treatment; validator samples 3 latitude bands.

### R6 — Walled burg ⇒ one town
- Anchor merge pass before settlement synthesis: cluster anchors whose urban radii (or wall envelopes) overlap or sit within 8 cells. If **any** member is walled (`flags.walls`), emit **one** settlement: dominant burg (walled > capital > population) provides center + single wall envelope sized to cover the cluster (R2 tier from combined population); minor burgs become named quarters/districts feeding extra parcel density, not separate towns.
- If **no** member is walled: keep today's behavior — separate open WFC towns are fine (per requirement).
- Acceptance: 0 views containing two wall envelopes; 0 walled towns with a second settlement core inside their envelope; unwalled neighbors still render as distinct villages.

## R7 — Additional FMG details worth generating from (currently unused)

| FMG field (verified in this export) | Use |
|---|---|
| `burg.flags.port` + route `kind` sea routes | Docks/harbor district: piers, boardwalk tiles, moored boats on the water edge |
| `burg.flags.citadel` | Keep/fortress on the highest terrace inside walls |
| `burg.flags.temple` + `religions[].name/type` | Temple/chapel landmark themed per religion |
| `burg.flags.plaza` | Guaranteed market plaza + market infill kit at center |
| `state.form`, `full_name`, `neighbors` | Signage/naming ("Kingdom of…"), watchtowers or border posts where neighboring state territory meets |
| `culture.type` (Naval/Highland/River…) | Architecture bias: stilts/boardwalks for naval, stone terraces for highland |
| `provinces` (full_name, color) | Region naming on the map panel; province-level palette sub-tints |
| `rivers` (name, `width`, `discharge`) | River breadth in tiles; ford vs. bridge choice; named rivers on the map |
| `routes.kind` (road/trail/sea) | Road tier: paved/dirt/none width + material |
| `legacy_fmg_refs.notes` (185 entries: regiments, legends) | Lore hooks — garrison banners per regiment note, signposts, future quest text |
| `burg.geo_coordinate` | Exact per-burg latitude for R5 |

Suggested priority: port/docks and citadel (visual payoff, data already at hand) → plaza/temple → rivers/routes tiers → state borders/lore.

## R-execution
R3+R4 first (rendering trust), then R1 (traversal correctness), R6 (town structure), R2 (walls), R5 (climate), R7 as scoped follow-ups. Each lands with `npm test`, `validate:world` (grown per-item), and the camera-sweep LOD check.

---

# Rev 4 — Blueprint-First Generation: Walls Before WFC, Parser Before Runtime (2026-07-15)

Direction change confirmed by the user: (1) no more unrelated wall-separated fragments — one main city with a castle rules unwalled fief villages; (2) towns generate from a **guideline blueprint** — walls compiled first from FMG data, WFC fills within; (3) **all** FMG data is consumed by an **offline parser** that bakes directives, never by runtime code reading JSON; (4) whole waterfalls generated where river/height data supports them.

## B0 — Architecture shift

Current: `WorldConstraintField` computes wall bounds/urbanization *at runtime per view* from geographic samples — which is why distant, unrelated walled fragments co-exist in one map.
Target: a **compile step** (Node, offline) parses FMG JSON once and emits per-burg **Settlement Blueprints**; the runtime consumes blueprints as pre-collapsed constraints. `WorldConstraintField` shrinks to a projector of blueprint → view cells (no invention at runtime).

```
tools/compile_world_blueprints.mjs   (new; runs inside `npm run replace:world-map`)
  reads: manifest.json + map-data.json (+ per-burg town_summary only — never full town payloads)
  emits: ACTIVE_SETTLEMENT_BLUEPRINTS in ActiveWorldData.js  (compact, few KB per burg)
```

## B1 — Settlement Blueprint schema (per burg, all fields parser-derived)

```js
{
  burgId, name, tier,                 // tier = f(population, capital, citadel, walls) as R2
  hierarchy: 'seat' | 'fief',        // seat = walled main city; fief = unwalled satellite village
  seatOf: [fiefBurgIds],             // seat lists its fiefs; fief points back via liegeBurgId
  wallRings: [                        // OUTER→INNER; [] for fiefs and unwalled seats
    { ring: 0, radius, thickness, heightVoxels,
      gates: [{ bearing, grand, towardRoute | towardFief }] },   // gates face real route bearings
    { ring: 1, ... }                  // tier ≥2 gets 2 rings; capital 3 (multi-walled city)
  ],
  castle: { ward: innermostRing, size, keepHeight } | null,      // capital/citadel/duke seats only
  wards: [                            // the WFC guideline blueprint, one per ring annulus + center
    { ring, district: 'castle'|'civic'|'market'|'residential'|'artisan'|'harbor',
      wfcPriors: { buildingDensity, archetypeWeights, elevationVariance } }
  ],
  districtDirectives: { docks, plaza, temple(religionId), watchtowers },   // from burg.flags + state.neighbors
  roads: [{ kind, widthTiles, gateBearing }],                    // from routes.kind + points
  climate: { latitude, snowline },                               // from geo_coordinate (R5)
  water: { riverIds, fords: [...], bridges: [...], waterfalls: [...] }     // §B4
}
```

## B2 — One seat, unwalled fiefs (replaces R6's merge-only rule)

Parser-side clustering (not runtime): group burgs within interaction distance `D = f(populations, shared route)`.
- The dominant burg (walls > capital > citadel > population) becomes the **seat**: it alone gets wall rings and, if `capital || citadel` (or state capital of a duchy `state.form`), a **castle in the innermost ward** — the king/duke ruling the cluster.
- Every other cluster member becomes a **fief**: walls stripped, rendered as an open WFC village (existing generator path), linked to the seat by a compiled road ending at a seat gate, plus a signpost carrying both names.
- Views never contain two wall systems; a fief inside a seat's view reads as its farm/village belt, related by road, palette (same state theme), and banner accents.
- Load-zone alternative rejected for now (bigger engine change); noted as a future option if capital interiors outgrow one view.

## B3 — Walls first, WFC within (the guideline blueprint)

Generation order per view becomes:
1. **Stamp blueprint skeleton** — wall rings, gates, castle plot, compiled roads, water/waterfall cells: all pre-collapsed (fixed) nodes.
2. **Ward waves** — each ward annulus is its own WFC region with blueprint priors: castle ward = keep + garrison/manor archetypes, near-zero terrain variance; civic/market = hall/plaza/temple density; residential/artisan outer ward = mixed rows; harbor ward (port flag) = docks against the water edge. Baked landmark placement (Rev 2 WS4) runs per ward with ward-appropriate requirements.
3. **Wilderness wave** outside the outer ring, as today, with fief villages as open settlements.
Multi-walled cities fall out of the ring list: capital = 3 concentric rings with grand gates aligned so a route can pass ring-to-ring through aligned gates to the castle.

## B4 — Waterfalls and full water directives (parser-computed)

- Parser walks each river polyline over cell heights: where the along-river height drop ≥ threshold within ≤2 cells, emit `waterfall { position, dropTiers = quantized Δheight, widthTiles = f(river.width), intensity = f(discharge), plungePool: true }`. River `width`/`discharge` also decide ford (narrow) vs bridge (wide) vs no crossing (torrent).
- Runtime renders **whole waterfalls**: multi-tier cascade down the actual terrain cliff (terrain wave receives the cliff as a fixed elevation constraint so geometry and water agree), plunge pool of shallow-water tiles, walkable shallow outflow, mist particles from the existing atmospheric system. The current single-mesh `addDecorWaterfall` becomes the smallest tier of this.
- Algorithmic fallback stays: if the *generated* terrain makes any river/stream cross a ≥2-tier step where the parser had no data, the same waterfall assembler runs — data-driven first, formula second.

## B5 — Full FMG utilization (R7 table becomes parser output)

Every R7 row compiles into a blueprint field (B1): flags→districtDirectives, routes.kind→roads, rivers→water, culture.type/state.form→wfcPriors + naming, provinces→map panel regions, notes→lore hooks table keyed by burg for signage. The parser logs a **coverage report**: every FMG field either consumed, or explicitly listed as ignored-with-reason — so "are we using all the data?" is answerable from the import log, not from reading code.

## B6 — Acceptance
1. Parser: `replace:world-map` emits exactly the 10 blueprints selected by `manifest.active_burg_ids` (2 per theme; 6 seats and 4 fiefs); the 60-burg FMG corpus remains an archive, coverage reports 0 unexplained FMG fields, the active blueprint payload stays within budget, and runtime has zero imports of source-package JSON (lint rule).
2. Hierarchy: every cluster has exactly one seat; 0 walled fiefs; every fief has a compiled road reaching a seat gate; seats with capital/citadel have a castle in the innermost ring.
3. Multi-wall: capital renders 3 rings with aligned grand gates; ring interiors satisfy their ward priors (castle ward ≥1 keep, market ward ≥1 plaza, harbor ward docks touch water).
4. Walls-first: re-running with a different variant seed changes ward interiors but never ring/gate/castle/road/waterfall skeleton cells (fixed-node hash stable).
5. Waterfalls: every parser-detected drop renders a cascade whose tiers equal `dropTiers`, with plunge pool + walkable outflow; pathfinder can still cross via compiled ford/bridge; 0 waterfalls floating without a cliff.
6. All previous gates (Rev 2/3) keep passing.

## B7 — Files
Add: `tools/compile_world_blueprints.mjs`, `client/src/data/SettlementBlueprint.js`, `client/src/data/PartialChunkRegistry.js` (schemas + validators).
Modify: `import_world_map_package.mjs` (invoke compiler), `WorldConstraintField.js` (project blueprints instead of inventing), `GeographicWFCGenerator.js` (skeleton stamp + ward waves + immutable partial cells), `ContextualBuildingWFC.js` (per-ward priors), `WorldGenerator.js` (waterfall assembler, castle/keep, docks, gatehouse meshes), `validate_world_generation.mjs` (B6), `rules.md`/`context.md`.
Retire: runtime wall-bounds invention in `WorldConstraintField.createWallBounds` (kept only as blueprint projector), `compile_magic_voxels.mjs`, and the full `shared/magic-voxels/` artifact tree.

Execution: B0/B1 parser + schema → B2 clustering → B3 skeleton-then-ward order → B4 waterfalls → B5 coverage report; regression after each.
