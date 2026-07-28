import test from 'node:test';
import assert from 'node:assert/strict';
import {
    createNetworkWorldDescriptor,
    decodeNetworkMap,
    encodeNetworkMap,
    getNetworkMapCollisionHash,
    getNetworkWorldDescriptorKey,
    normalizeNetworkWorldDescriptor
} from './NetworkMapCodec.js';

test('network map codec round-trips collision semantics and elevation', () => {
    const rows = [
        [
            { element: 1, texture: 0, effect: 1, building: 0, height: 4, visualVariant: 31 },
            { element: 6, texture: 2, effect: 6, building: 2, height: 5, walkable: true }
        ],
        [
            { element: 2, texture: 1, effect: 2, building: 0, height: 0 },
            { element: 1, texture: 0, effect: 1, building: 0, height: 3, visualVariant: 6 }
        ]
    ];

    const encoded = encodeNetworkMap(rows);
    assert.equal(encoded.matrixEncoding, 'palette-height-v1');
    assert.equal(encoded.tileRows.length, 2);
    assert.equal(encoded.tileRows[0].length, 2);
    assert.deepEqual(decodeNetworkMap(encoded), [
        [
            { element: 1, texture: 0, effect: 1, building: 0, height: 4 },
            { element: 6, texture: 2, effect: 6, building: 2, height: 5, walkable: true }
        ],
        [
            { element: 2, texture: 1, effect: 2, building: 0, height: 0 },
            { element: 1, texture: 0, effect: 1, building: 0, height: 3 }
        ]
    ]);
});

test('network map codec rejects non-rectangular matrices', () => {
    assert.equal(encodeNetworkMap([[{ element: 1 }], []]), null);
});

test('world descriptors canonically bind generation, burg vectors, and collision rows', () => {
    const rows = Object.assign([
        [{ element: 1, texture: 0, effect: 1, building: 0, height: 2, walkable: true }]
    ], {
        variant: 3,
        seed: 42,
        generationVersion: 'world-v7',
        contentHash: 'world:vector:view',
        sourceTown: { id: 'burg-8' },
        world: {
            id: 'fantasy-world',
            centerX: 125.1254,
            centerY: 63.5,
            sampleCenterX: 125.12,
            sampleCenterY: 63.36
        },
        generation: { fixedSkeletonHash: 'skeleton-8' }
    });
    const vector = {
        chunkSize: 16,
        schema: 'vibe-game-burg-vectors',
        schemaVersion: 1,
        generationVersion: 'fmg-town-vectors-v1',
        contentHash: 'a'.repeat(64),
        vectorHash: 'b'.repeat(64)
    };
    const descriptor = createNetworkWorldDescriptor(rows, vector);
    assert.equal(descriptor.burgId, 8);
    assert.equal(descriptor.centerX, 125.125);
    assert.equal(descriptor.collisionHash, getNetworkMapCollisionHash(rows));
    assert.equal(descriptor.vectorHash, vector.vectorHash);
    assert.equal(
        getNetworkWorldDescriptorKey(descriptor),
        getNetworkWorldDescriptorKey(structuredClone(descriptor))
    );

    const changedRows = rows.map((row) => row.map((cell) => ({ ...cell, height: cell.height + 1 })));
    assert.notEqual(getNetworkMapCollisionHash(changedRows), descriptor.collisionHash);
});

test('network descriptor normalization rejects schemas and bounds untrusted values', () => {
    assert.equal(normalizeNetworkWorldDescriptor({ schema: 'unknown', schemaVersion: 1 }), null);
    const normalized = normalizeNetworkWorldDescriptor({
        schema: 'vibe-game-world-descriptor',
        schemaVersion: 1,
        worldId: 'world<script>',
        width: 9999,
        height: -1,
        variant: -4,
        centerX: Number.POSITIVE_INFINITY
    });
    assert.equal(normalized.worldId, 'worldscript');
    assert.equal(normalized.width, 128);
    assert.equal(normalized.height, 1);
    assert.equal(normalized.variant, 0);
    assert.equal(normalized.centerX, 0);
});
