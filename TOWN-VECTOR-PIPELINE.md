# FMG burg vector pipeline

The game converts FMG burg town exports into a compact, deterministic vector archive before the
client is built. Runtime generation never reads the expanded town matrices, voxel rooms, doodads,
or street payloads.

## Compile

```sh
npm run compile:town-vectors
```

`tools/compile_town_vectors.mjs` discovers the town files through `map-data-package/manifest.json`
and derives:

- exact even-odd wall contours, gates, wall height, and walkway width;
- building polygons, grid rectangles, doors, floors, stairs, materials, and colors;
- a per-burg SHA-256 vector hash and one package content hash.

The compiler writes:

- `client/src/data/ActiveTownVectorData.js` for deterministic runtime generation;
- `client/public/assets/maps/towns/manifest.json`;
- one inspectable `burg-N.vector.json` and `burg-N.svg` per town.

The current archive contains 60 burgs, 5,015 wall cells, and 512 building footprints. Its contours
rasterize exactly to every source wall cell, while the runtime vector payload is over 100 times
smaller than the authoring JSON.

## Runtime generation

`TownVectorData.js` projects one primary burg into the active view. `WorldConstraintField.js`
stamps its wall and gate vectors into the fixed WFC skeleton. Closed contours use a flood-filled
inside mask; fragmented/open fortifications retain their exact wall geometry and use a bounded
formula confinement fallback.

`GeographicWFCGenerator.js` then:

1. collapses terrain against the vector wall skeleton and FMG geographic inhibitors;
2. materializes non-overlapping source building footprints as enterable fixed WFC nodes;
3. repairs blocked door directions deterministically;
4. guarantees at least a 2×3 open interior, reducing a compact cabin to one storey when stairs
   would consume that space;
5. uses source wall/roof materials and colors to select the rendered district style;
6. subtracts source-building count from formula infill so small, heavily fortified burgs do not
   become visually overloaded;
7. uses formula baked buildings and procedural rings only when the source vectors cannot supply a
   legal structure or wall.

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

