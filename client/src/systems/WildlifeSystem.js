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

    update(deltaSeconds, centerX = null, centerY = null, radius = this.worldGenerator.visibleTileRadius) {
        for (const animal of this.wildlife) {
            animal.update(deltaSeconds);
        }
        if (Number.isFinite(centerX) && Number.isFinite(centerY)) {
            return this.updateVisibility(centerX, centerY, radius);
        }
        return null;
    }

    updateVisibility(centerX, centerY, radius = this.worldGenerator.visibleTileRadius) {
        let visible = 0;
        for (const animal of this.wildlife) {
            const isVisible = this.worldGenerator.isObjectInsidePlayerLOD(
                animal.gridX,
                animal.gridY,
                0.5,
                centerX,
                centerY,
                radius
            );
            animal.setLODVisible(isVisible);
            if (isVisible) visible += 1;
        }
        return {
            total: this.wildlife.length,
            visible
        };
    }

    destroy() {
        this.wildlife.forEach((animal) => animal.destroy());
        this.wildlife = [];
    }
}
