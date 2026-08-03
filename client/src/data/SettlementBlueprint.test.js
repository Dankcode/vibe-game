import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
    compileBlueprintCoverage,
    compileWorldBlueprints,
    SETTLEMENT_BLUEPRINT_SIZE_LIMIT
} from '../../../tools/compile_world_blueprints.mjs';
import {
    assertSettlementBlueprintSet,
    validateSettlementBlueprint,
    validateSettlementBlueprintSet
} from './SettlementBlueprint.js';
import {
    BURG_THEME_IDS,
    validateManifestBurgThemes
} from './BurgThemeCatalog.js';
import {
    ACTIVE_SETTLEMENT_BLUEPRINTS,
    ACTIVE_TOWNS,
    ACTIVE_WORLD
} from './ActiveWorldData.js';

const SOURCE_URL = new URL('../../../map-data-package/map-data.json', import.meta.url);
const MANIFEST_URL = new URL('../../../map-data-package/manifest.json', import.meta.url);
const source = JSON.parse(await readFile(SOURCE_URL, 'utf8'));
const manifest = JSON.parse(await readFile(MANIFEST_URL, 'utf8'));
const manifestThemes = validateManifestBurgThemes(manifest);
assert.equal(manifestThemes.valid, true, manifestThemes.errors.join('\n'));
const compilerOptions = { burgThemeById: manifestThemes.themeByBurgId };
const compiled = compileWorldBlueprints(source, compilerOptions);
const EXPECTED_BLUEPRINTS = 60;

test('offline compiler deterministically emits all 60 strict settlement blueprints under 192 KB', () => {
    const repeated = compileWorldBlueprints(source, compilerOptions);
    assert.deepEqual(repeated, compiled);
    assert.equal(compiled.blueprints.length, EXPECTED_BLUEPRINTS);
    assert.equal(compiled.coverage.blueprintCount, EXPECTED_BLUEPRINTS);
    assert.equal(compiled.coverage.unexplainedFields.length, 0);
    assert.equal(compiled.coverage.withinByteLimit, true);
    assert.ok(Buffer.byteLength(JSON.stringify(compiled.blueprints)) <= SETTLEMENT_BLUEPRINT_SIZE_LIMIT);
    assert.doesNotThrow(() => assertSettlementBlueprintSet(compiled, { expectedCount: EXPECTED_BLUEPRINTS }));
    assert.equal(JSON.stringify(compiled.blueprints).includes('town_file'), false);
});

test('manifest theme IDs propagate exactly into every strict settlement blueprint', () => {
    assert.equal(manifestThemes.themeByBurgId.size, EXPECTED_BLUEPRINTS);
    assert.deepEqual(
        new Set(compiled.blueprints.map((blueprint) => blueprint.burg.themeId)),
        new Set(BURG_THEME_IDS)
    );
    for (const blueprint of compiled.blueprints) {
        const expected = manifestThemes.themeByBurgId.get(blueprint.burgId);
        assert.equal(blueprint.burg.themeId, expected);
        assert.equal(blueprint.identity.architectureThemeId, expected);
        assert.equal(validateSettlementBlueprint(blueprint).valid, true);
    }
    assert.throws(
        () => compileWorldBlueprints(source),
        /manifest-authoritative themeId/
    );
});

test('world import publishes the compiled payload while keeping dedicated towns excluded', () => {
    assert.deepEqual(ACTIVE_SETTLEMENT_BLUEPRINTS, compiled);
    assert.equal(ACTIVE_WORLD.generationVersion, compiled.generationVersion);
    assert.deepEqual(ACTIVE_TOWNS, {});
    assert.doesNotThrow(() => assertSettlementBlueprintSet(
        ACTIVE_SETTLEMENT_BLUEPRINTS,
        { expectedCount: EXPECTED_BLUEPRINTS }
    ));
});

test('each political cluster has one walled seat and road-linked unwalled fiefs', () => {
    const byId = new Map(compiled.blueprints.map((blueprint) => [blueprint.burgId, blueprint]));
    assert.ok(compiled.clusters.some((cluster) => cluster.fiefBurgIds.length > 0));
    for (const cluster of compiled.clusters) {
        const members = cluster.memberBurgIds.map((burgId) => byId.get(burgId));
        assert.equal(members.filter((blueprint) => blueprint.hierarchy === 'seat').length, 1);
        const seat = byId.get(cluster.seatBurgId);
        assert.ok(seat.wallRings.length > 0);
        for (const fiefId of cluster.fiefBurgIds) {
            const fief = byId.get(fiefId);
            const roadId = `fief-${fiefId}-to-seat-${seat.burgId}`;
            assert.equal(fief.hierarchy, 'fief');
            assert.equal(fief.liegeBurgId, seat.burgId);
            assert.equal(fief.burg.flags.walls, false);
            assert.deepEqual(fief.wallRings, []);
            assert.ok(fief.roads.some((road) => road.id === roadId && road.toBurgId === seat.burgId));
            const seatRoad = seat.roads.find((road) => road.id === roadId && road.toBurgId === fiefId);
            assert.ok(seatRoad);
            assert.ok(seat.wallRings[0].gates.some((gate) => gate.bearing === seatRoad.seatGateBearing));
        }
    }
});

test('capital seats compile aligned multi-rings, innermost castles and stable inland anchors', () => {
    const capitalSeats = compiled.blueprints.filter((blueprint) => (
        blueprint.hierarchy === 'seat' && blueprint.burg.flags.capital
    ));
    assert.ok(capitalSeats.length > 0);
    assert.ok(compiled.blueprints.some((blueprint) => (
        blueprint.burg.flags.port
        && (blueprint.anchorX !== blueprint.x || blueprint.anchorY !== blueprint.y)
    )));
    for (const capital of capitalSeats) {
        assert.equal(capital.wallRings.length, 3);
        assert.ok(capital.wallRings[0].radius > capital.wallRings[1].radius);
        assert.ok(capital.wallRings[1].radius > capital.wallRings[2].radius);
        assert.deepEqual(
            capital.wallRings.map((ring) => ring.gates.map((gate) => gate.bearing)),
            Array.from({ length: 3 }, () => capital.wallRings[0].gates.map((gate) => gate.bearing))
        );
        assert.equal(capital.castle.ward, 2);
        assert.equal(capital.wards.at(-1).district, 'castle');
    }
});

test('river height, discharge and route crossings compile into reusable water directives', () => {
    assert.ok(compiled.globalWater.rivers.length > 0);
    assert.ok(compiled.globalWater.waterfalls.length > 0);
    for (const waterfall of compiled.globalWater.waterfalls) {
        assert.ok(waterfall.dropTiers >= 1);
        assert.ok(waterfall.widthTiles >= 1);
        assert.equal(waterfall.plungePool, true);
        assert.equal(waterfall.walkableOutflow, true);
    }
    const globalIds = new Set([
        ...compiled.globalWater.crossings.map((directive) => directive.id),
        ...compiled.globalWater.waterfalls.map((directive) => directive.id)
    ]);
    for (const blueprint of compiled.blueprints) {
        for (const id of [...blueprint.water.fords, ...blueprint.water.bridges, ...blueprint.water.waterfalls]) {
            assert.ok(globalIds.has(id), `${blueprint.name} references missing water directive ${id}`);
        }
    }
});

test('strict validators reject unexplained output fields and coverage reports new input fields', () => {
    const invalidBlueprint = { ...compiled.blueprints[0], runtimeGuess: true };
    const blueprintValidation = validateSettlementBlueprint(invalidBlueprint);
    assert.equal(blueprintValidation.valid, false);
    assert.ok(blueprintValidation.errors.some((error) => error.includes('runtimeGuess')));

    const extendedSource = { ...source, unexpected_fmg_section: { value: 1 } };
    const coverage = compileBlueprintCoverage(extendedSource);
    assert.deepEqual(coverage.unexplainedFields, ['unexpected_fmg_section.value']);

    const nestedSource = {
        ...source,
        entities: {
            ...source.entities,
            burgs: source.entities.burgs.map((burg, index) => index === 0
                ? {
                    ...burg,
                    town_summary: {
                        ...burg.town_summary,
                        future_layout: { entropy: 0.75 }
                    }
                }
                : burg)
        }
    };
    const nestedCoverage = compileBlueprintCoverage(nestedSource);
    assert.ok(nestedCoverage.unexplainedFields.includes(
        'entities.burgs[].town_summary.future_layout.entropy'
    ));

    const invalidPayload = {
        ...compiled,
        blueprints: compiled.blueprints.map((blueprint, index) => index === 0 ? invalidBlueprint : blueprint)
    };
    const payloadValidation = validateSettlementBlueprintSet(
        invalidPayload,
        { expectedCount: EXPECTED_BLUEPRINTS }
    );
    assert.equal(payloadValidation.valid, false);
});
