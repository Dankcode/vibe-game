import test from 'node:test';
import assert from 'node:assert/strict';
import {
    solveFacadeWave,
    solveWaveFunctionCollapse,
    validateWaveAssignment,
    WaveFunctionCollapseError
} from './WaveFunctionCollapse.js';

const mapObject = (map) => Object.fromEntries([...map].sort(([a], [b]) => String(a).localeCompare(String(b))));

test('same seed and reordered inputs produce the same assignment', () => {
    const nodes = [
        { id: 'a', neighbors: [{ id: 'b', direction: 'near' }] },
        { id: 'b', neighbors: [{ id: 'a', direction: 'near' }] },
        { id: 'c', neighbors: [] }
    ];
    const tiles = [{ id: 'x', weight: 1 }, { id: 'y', weight: 2 }];
    const compatible = (a, b) => a !== b;
    const first = solveWaveFunctionCollapse({ nodes, tiles, compatible, seed: 'stable' });
    const reordered = solveWaveFunctionCollapse({
        nodes: [...nodes].reverse().map((node) => ({ ...node, neighbors: [...node.neighbors].reverse() })),
        tiles: [...tiles].reverse(),
        compatible,
        seed: 'stable'
    });
    assert.deepEqual(mapObject(first), mapObject(reordered));
});

test('adding a disconnected node does not change existing nodes', () => {
    const tiles = [{ id: 'x', weight: 1 }, { id: 'y', weight: 1 }];
    const base = solveWaveFunctionCollapse({
        nodes: [{ id: 'a', neighbors: [] }, { id: 'b', neighbors: [] }],
        tiles,
        seed: 'locality'
    });
    const extended = solveWaveFunctionCollapse({
        nodes: [{ id: '0-new', neighbors: [] }, { id: 'a', neighbors: [] }, { id: 'b', neighbors: [] }],
        tiles,
        seed: 'locality'
    });
    assert.equal(base.get('a'), extended.get('a'));
    assert.equal(base.get('b'), extended.get('b'));
});

test('Set domains and fixed assignments are honored', () => {
    const result = solveWaveFunctionCollapse({
        nodes: [{ id: 'a', neighbors: [] }, { id: 'b', neighbors: [] }],
        tiles: [{ id: 'x' }, { id: 'y' }],
        domains: new Map([['a', new Set(['x'])], ['b', new Set(['x', 'y'])]]),
        fixed: new Map([['b', 'y']]),
        seed: 'domains'
    });
    assert.deepEqual(mapObject(result), { a: 'x', b: 'y' });
});

test('invalid and empty domains fail explicitly', () => {
    const options = { nodes: [{ id: 'a', neighbors: [] }], tiles: [{ id: 'x' }] };
    assert.throws(
        () => solveWaveFunctionCollapse({ ...options, domains: new Map([['a', []]]) }),
        (error) => error instanceof WaveFunctionCollapseError && error.code === 'WFC_EMPTY_DOMAIN'
    );
    assert.throws(
        () => solveWaveFunctionCollapse({ ...options, fixed: new Map([['a', 'missing']]) }),
        (error) => error instanceof WaveFunctionCollapseError && error.code === 'WFC_UNKNOWN_TILE'
    );
});

test('an unsatisfiable odd cycle throws instead of returning an invalid fallback', () => {
    const nodes = ['a', 'b', 'c'].map((id, index, all) => ({
        id,
        neighbors: [
            { id: all[(index + 1) % all.length], direction: 'edge' },
            { id: all[(index + all.length - 1) % all.length], direction: 'edge' }
        ]
    }));
    assert.throws(
        () => solveWaveFunctionCollapse({
            nodes,
            tiles: [{ id: 0 }, { id: 1 }],
            compatible: (a, b) => a !== b,
            seed: 'odd-cycle'
        }),
        (error) => error instanceof WaveFunctionCollapseError && error.code === 'WFC_UNSATISFIABLE'
    );
});

test('facade fixed walls hold and windows never touch', () => {
    const slots = Array.from({ length: 8 }, (_, index) => ({
        id: String(index),
        neighbors: [String((index + 7) % 8), String((index + 1) % 8)]
    }));
    const result = solveFacadeWave({ slots, fixedWalls: ['0', '1'], seed: 'facade-test' });
    assert.equal(result.get('0'), 'wall');
    assert.equal(result.get('1'), 'wall');
    for (let index = 0; index < slots.length; index++) {
        const next = (index + 1) % slots.length;
        assert.notDeepEqual([result.get(String(index)), result.get(String(next))], ['window', 'window']);
    }
});

test('validation helper accepts valid adjacency and rejects invalid adjacency', () => {
    const options = {
        nodes: [
            { id: 'left', neighbors: [{ id: 'right', direction: 'east' }] },
            { id: 'right', neighbors: [] }
        ],
        tiles: [{ id: 'grass' }, { id: 'water' }],
        compatible: (source, target, direction) => direction !== 'east' || source !== target,
        domains: new Map([
            ['left', new Set(['grass'])],
            ['right', new Set(['grass', 'water'])]
        ]),
        fixed: new Map([['right', 'water']])
    };
    const assignment = solveWaveFunctionCollapse({ ...options, seed: 'validation' });
    assert.equal(validateWaveAssignment({ ...options, assignment }), true);
    assert.throws(
        () => validateWaveAssignment({
            ...options,
            fixed: new Map(),
            assignment: new Map([['left', 'grass'], ['right', 'grass']])
        }),
        (error) => error instanceof WaveFunctionCollapseError
            && error.code === 'WFC_INVALID_RESULT'
            && error.details.reason === 'adjacency'
    );
});

test('validation helper checks fixed values and exact node coverage', () => {
    const options = {
        nodes: [{ id: 'a', neighbors: [] }],
        tiles: [{ id: 'x' }, { id: 'y' }],
        fixed: new Map([['a', 'x']])
    };
    assert.throws(
        () => validateWaveAssignment({ ...options, assignment: new Map([['a', 'y']]) }),
        (error) => error instanceof WaveFunctionCollapseError
            && error.code === 'WFC_INVALID_RESULT'
            && error.details.reason === 'fixed'
    );
    assert.throws(
        () => validateWaveAssignment({ ...options, assignment: new Map() }),
        (error) => error instanceof WaveFunctionCollapseError
            && error.code === 'WFC_INVALID_RESULT'
            && error.details.reason === 'missing-node'
    );
});
