import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeNetworkMap, encodeNetworkMap } from './NetworkMapCodec.js';

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

