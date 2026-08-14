# FMG burg vector pipeline

The game converts FMG burg town exports into a compact, deterministic vector archive before the
client is built. Runtime generation never reads the expanded town matrices, voxel rooms, doodads,
or raw street payloads.

## Compile

```sh
npm run compile:town-vectors
```

`tools/compile_town_vectors.mjs` discovers the town files through `map-data-package/manifest.json`
and derives:

- the burg's explicit architecture theme from `burg_theme_by_id` in the source manifest;
- exact even-odd wall contours, gates, wall height, and walkway width;
- exact horizontal street vectors grouped by kind and elevation tier;
- building polygons, grid rectangles, doors, floors, stairs, materials, and colors;
- a per-burg SHA-256 vector hash and one package content hash.

The five canonical theme IDs are `asian`, `middle-eastern`, `northern-european`,
`southern-european`, and `egyptian`. The source archive keeps theme assignments for all 60 FMG
burgs, but `manifest.active_burg_ids` is the runtime boundary: exactly 10 curated burgs are compiled
for play, with 2 active burgs from each canonical theme. The current active selection contains 6
seats and 4 fiefs. Culture, biome, seed, and town name never infer or replace a manifest theme at
runtime.

Street elevations use the same tier equation as live terrain:

```text
tier = clamp(floor((FMG elevation * 100 - 19) / 11), 0, 6)
```

This is a data formula, not a per-town parser. Every burg selected by
`manifest.active_burg_ids` goes through the same run compiler, and the resulting segment tuples
are validated by rasterizing them back to the source street cells. The other 50 FMG burgs remain
archived source material and are not emitted into the active runtime package.

The compiler writes:

- `client/src/data/ActiveTownVectorData.js` for deterministic runtime generation;
- `client/public/assets/maps/towns/manifest.json`;
- one inspectable `burg-N.vector.json` and `burg-N.svg` per active town.

The FMG source archive still contains 60 burgs; it is retained for future curation and regeneration.
Only the 10 manifest-selected burgs belong to the active vector/runtime package. This keeps the
runtime and validation surface bounded without deleting the remaining 50 source burgs.

## Runtime generation

`TownVectorData.js` projects one primary burg into the active view. `WorldConstraintField.js`
stamps its wall, gate, street, and elevation vectors into the fixed WFC skeleton. Closed contours
use a flood-filled inside mask; fragmented/open fortifications retain their exact wall geometry
and use a bounded formula confinement fallback.

Source streets win over generated streets, while walls and gates still win structurally where
they intersect. A separate 20-module street-map WFC fills the remaining blocks with compatible
lanes, corners, junctions, plazas, and stepped streets. It is seeded by the burg vector hash and
inherits the nearest FMG elevation tier without replacing a source cell.

`GeographicWFCGenerator.js` then:

1. fixes the manifest theme plus FMG walls, gates, streets, and street elevations before either
   WFC pass;
2. collapses terrain against that vector skeleton and the FMG geographic inhibitors;
3. relaxes generated neighboring terrain into one-tier ramps without changing source elevations;
4. materializes non-overlapping source building footprints as enterable fixed WFC nodes;
5. repairs blocked door directions deterministically;
6. guarantees at least a 2×3 open interior, reducing a compact cabin to one storey when stairs
   would consume that space;
7. resolves each baked and WFC building inside the owning burg's façade, roof, castle, wall, and
   street kits; the seed may vary a kit but cannot cross into another burg theme;
8. subtracts source-building count from formula infill so small, heavily fortified burgs do not
   become visually overloaded;
9. uses formula baked buildings and procedural rings only when the source vectors cannot supply a
   legal structure or wall.

The priority order is therefore: manifest burg theme + FMG vector constraints → compatible baked
town modules → contextual building/terrain WFC. The raw burg JSON never ships to clients.

All placement is seeded from world, burg, vector, and view hashes. No hand-authored per-town switch
or building JSON parser is needed.

## Multiplayer reconstruction

Clients exchange a small `vibe-game-world-descriptor` rather than the full vector or voxel world.
It contains the world/burg coordinates, dimensions, variant, generation hashes, vector package and
per-burg hashes, fixed skeleton hash, and a collision checksum.

The room retains and broadcasts the descriptor, including to late joiners. A receiving client
regenerates the same view locally, verifies the canonical descriptor, and applies it without
echoing another map upload. The compact collision matrix remains the authoritative server fallback
and is rejected when its checksum does not match the descriptor.
