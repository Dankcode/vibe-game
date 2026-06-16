import { MeadowHare } from '../entities/Wildlife.js';

const SPECIES_FACTORIES = {
    meadowHare: MeadowHare
};

export class WildlifeSystem {
    constructor(threeManager, worldGenerator, spawns = []) {
        this.threeManager = threeManager;
        this.worldGenerator = worldGenerator;
        this.wildlife = [];
        this.spawnAll(spawns);
    }

    spawnAll(spawns) {
        for (const spawn of spawns) {
            this.spawn(spawn);
        }
    }

    spawn(spawn) {
        const Factory = SPECIES_FACTORIES[spawn.species];
        if (!Factory) {
            console.warn(`[WildlifeSystem] Unknown species "${spawn.species}" ignored.`);
            return null;
        }

        const habitatTile = this.worldGenerator.supportsHabitat(spawn.x, spawn.y, spawn.habitat)
            ? { x: spawn.x, y: spawn.y }
            : this.worldGenerator.findNearestHabitat(spawn.x, spawn.y, spawn.habitat, 12);

        if (!habitatTile) {
            console.warn(`[WildlifeSystem] No "${spawn.habitat}" habitat found for ${spawn.id}.`);
            return null;
        }

        const resolvedSpawn = {
            ...spawn,
            x: habitatTile.x,
            y: habitatTile.y
        };
        const animal = new Factory(this.threeManager, this.worldGenerator, resolvedSpawn);
        this.wildlife.push(animal);
        return animal;
    }

    update(deltaSeconds) {
        for (const animal of this.wildlife) {
            animal.update(deltaSeconds);
        }
    }

    destroy() {
        this.wildlife.forEach((animal) => animal.destroy());
        this.wildlife = [];
    }
}
