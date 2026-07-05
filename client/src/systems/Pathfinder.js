export class Pathfinder {
    constructor(worldGenerator) {
        this.worldGenerator = worldGenerator;
    }

    findPath(startX, startY, endX, endY, startZ = null) {
        // We use Math.round to ensure we start and end exactly on integer coordinates
        const start = { x: Math.round(startX), y: Math.round(startY) };
        const end = { x: Math.round(endX), y: Math.round(endY) };
        const startSurface = this.worldGenerator.getReachableSurfaceAtGrid?.(
            start.x,
            start.y,
            Number.isFinite(startZ) ? startZ : null,
            { allowBuildingStairSpan: true }
        ) || this.worldGenerator.getSurfaceAt?.(start.x, start.y);
        start.z = Number.isFinite(startZ) ? startZ : (startSurface?.z ?? 0);

        if (!this.worldGenerator.isWalkable(end.x, end.y)) {
            return [];
        }

        const openSet = [start];
        const cameFrom = new Map();
        const closedSet = new Set();
        
        const gScore = new Map();
        gScore.set(this.nodeKey(start), 0);

        const fScore = new Map();
        fScore.set(this.nodeKey(start), this.heuristic(start, end));

        while (openSet.length > 0) {
            // Get node with lowest fScore
            let current = openSet[0];
            let lowestIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                const node = openSet[i];
                if ((fScore.get(this.nodeKey(node)) ?? Infinity) < (fScore.get(this.nodeKey(current)) ?? Infinity)) {
                    current = node;
                    lowestIndex = i;
                }
            }

            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current);
            }

            // Remove from openSet
            openSet.splice(lowestIndex, 1);
            closedSet.add(this.nodeKey(current));

            const neighbors = [
                // Orthogonal
                { x: current.x + 1, y: current.y, isDiag: false },
                { x: current.x - 1, y: current.y, isDiag: false },
                { x: current.x, y: current.y + 1, isDiag: false },
                { x: current.x, y: current.y - 1, isDiag: false },
                // Diagonal
                { x: current.x + 1, y: current.y + 1, isDiag: true },
                { x: current.x + 1, y: current.y - 1, isDiag: true },
                { x: current.x - 1, y: current.y + 1, isDiag: true },
                { x: current.x - 1, y: current.y - 1, isDiag: true }
            ];

            for (const neighbor of neighbors) {
                const surface = this.worldGenerator.getReachableSurfaceAtGrid?.(
                    neighbor.x,
                    neighbor.y,
                    current.z,
                    { allowBuildingStairSpan: true }
                );
                if (!surface?.definition?.walkable && !surface?.walkable) continue;

                const neighborNode = {
                    x: neighbor.x,
                    y: neighbor.y,
                    z: surface.z,
                    isDiag: neighbor.isDiag
                };
                const neighborKey = this.nodeKey(neighborNode);
                if (closedSet.has(neighborKey)) continue;
                
                const moveCost = this.worldGenerator.getMoveCost(
                    current.x,
                    current.y,
                    neighbor.x,
                    neighbor.y,
                    neighbor.isDiag,
                    current.z
                );
                if (!Number.isFinite(moveCost)) continue;

                const tentativeGScore = (gScore.get(this.nodeKey(current)) ?? Infinity) + moveCost;

                if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeGScore);
                    fScore.set(neighborKey, tentativeGScore + this.heuristic(neighborNode, end));

                    if (!openSet.find((node) => this.nodeKey(node) === neighborKey)) {
                        openSet.push(neighborNode);
                    }
                }
            }
        }

        // No path found
        return [];
    }

    heuristic(a, b) {
        // Octile distance for 8-way movement
        const dx = Math.abs(a.x - b.x);
        const dy = Math.abs(a.y - b.y);
        return 1.0 * Math.max(dx, dy) + (1.414 - 1.0) * Math.min(dx, dy);
    }

    nodeKey(node) {
        return `${node.x},${node.y},${Math.round(node.z ?? 0)}`;
    }

    reconstructPath(cameFrom, current) {
        const path = [current];
        let currentKey = this.nodeKey(current);
        while (cameFrom.has(currentKey)) {
            current = cameFrom.get(currentKey);
            path.unshift(current); // Insert at beginning to reverse natural order
            currentKey = this.nodeKey(current);
        }
        return path;
    }
}
