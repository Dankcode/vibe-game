import test from 'node:test';
import assert from 'node:assert/strict';
import {
    buildTownAdjacencyGraph,
    planTownWave,
    projectTownFeatures
} from './TownWavePlanner.js';

const ARCHETYPES = {
    cottage: { weight: 2, minSpan: 1, maxSpan: 8 },
    workshop: { weight: 1, minSpan: 3, maxSpan: 12 },
    hall: { weight: 0.5, minSpan: 5, maxSpan: 99 },
    tower: { weight: 0.4, minSpan: 2, maxSpan: 9 }
};

function fixture() {
    const rows = Array.from({ length: 18 }, (_, y) => Array.from({ length: 24 }, (_, x) => {
        if (x < 3) return 'W';
        if (x === 11 || y === 9) return 'R';
        if (x >= 10 && x <= 12 && y >= 8 && y <= 10) return ';';
        if (x === 22) return 'T';
        return 'G';
    }).join(''));
    const elevationRows = rows.map((row, y) => [...row].map(() => Math.floor(y / 7)));
    const buildings = [
        { id: 'harbor-house', x: -8, y: -2, width: 4, height: 4, sourceType: 'HOUSE_SMALL' },
        { id: 'market-hall', x: -1, y: -1, width: 7, height: 6, sourceType: 'MARKET' },
        { id: 'home-a', x: 5, y: -5, width: 5, height: 4, sourceType: 'HOUSE_SMALL' },
        { id: 'forge', x: 5, y: 2, width: 5, height: 5, sourceType: 'BLACKSMITH' },
        { id: 'home-b', x: -1, y: 5, width: 4, height: 4, sourceType: 'HOUSE_SMALL' }
    ];
    return { rows, elevationRows, buildings };
}

const normalized = (plan) => Object.fromEntries([...plan.assignments]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, entry]) => [id, { district: entry.district, archetype: entry.archetype, palette: entry.palette.id }]));

test('feature projection derives water, road, center and wall proximity mathematically', () => {
    const data = fixture();
    const features = projectTownFeatures(data);
    assert.ok(features.get('harbor-house').water > features.get('forge').water);
    assert.ok(features.get('market-hall').plaza > features.get('home-a').plaza);
    assert.ok(features.get('market-hall').centrality > features.get('home-a').centrality);
    assert.ok(features.get('home-a').wall > features.get('harbor-house').wall);
});

test('spatial graph is undirected and bounded by local neighbors', () => {
    const { buildings } = fixture();
    const graph = buildTownAdjacencyGraph(buildings, { radius: 12, neighborCap: 3 });
    const byId = new Map(graph.map((node) => [node.id, new Set(node.neighbors.map((neighbor) => neighbor.id))]));
    for (const [id, neighbors] of byId) {
        for (const neighbor of neighbors) assert.ok(byId.get(neighbor).has(id));
    }
});

test('town plan is deterministic and independent of building input order', () => {
    const data = fixture();
    const first = planTownWave({ ...data, seed: '28471', townId: 'willowmere', archetypes: ARCHETYPES, landmarkArchetypes: new Set(['hall', 'tower']) });
    const reordered = planTownWave({ ...data, buildings: [...data.buildings].reverse(), seed: '28471', townId: 'willowmere', archetypes: ARCHETYPES, landmarkArchetypes: new Set(['hall', 'tower']) });
    assert.deepEqual(normalized(first), normalized(reordered));
    assert.ok(first.diagnostics.anchors.civic);
    assert.equal(first.assignments.size, data.buildings.length);
});

test('landmarks never touch another landmark', () => {
    const data = fixture();
    const plan = planTownWave({ ...data, seed: 'landmarks', townId: 'test', archetypes: ARCHETYPES, landmarkArchetypes: new Set(['hall', 'tower']) });
    const graph = buildTownAdjacencyGraph(data.buildings);
    for (const node of graph) {
        const archetype = plan.assignments.get(node.id).archetype;
        if (!['hall', 'tower'].includes(archetype)) continue;
        for (const neighbor of node.neighbors) {
            assert.ok(!['hall', 'tower'].includes(plan.assignments.get(neighbor.id).archetype));
        }
    }
});

test('empty towns return an empty valid plan', () => {
    const plan = planTownWave({ buildings: [], rows: [], archetypes: ARCHETYPES });
    assert.equal(plan.assignments.size, 0);
    assert.equal(plan.diagnostics.buildings, 0);
});
