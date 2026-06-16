export class Pathfinder {
    constructor(worldGenerator) {
        this.worldGenerator = worldGenerator;
    }

    findPath(startX, startY, endX, endY) {
        // We use Math.round to ensure we start and end exactly on integer coordinates
        const start = { x: Math.round(startX), y: Math.round(startY) };
        const end = { x: Math.round(endX), y: Math.round(endY) };

        if (!this.worldGenerator.isWalkable(end.x, end.y)) {
            return [];
        }

        const openSet = [start];
        const cameFrom = new Map();
        const closedSet = new Set();
        
        const gScore = new Map();
        gScore.set(`${start.x},${start.y}`, 0);

        const fScore = new Map();
        fScore.set(`${start.x},${start.y}`, this.heuristic(start, end));

        while (openSet.length > 0) {
            // Get node with lowest fScore
            let current = openSet[0];
            let lowestIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                const node = openSet[i];
                if ((fScore.get(`${node.x},${node.y}`) ?? Infinity) < (fScore.get(`${current.x},${current.y}`) ?? Infinity)) {
                    current = node;
                    lowestIndex = i;
                }
            }

            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current);
            }

            // Remove from openSet
            openSet.splice(lowestIndex, 1);
            closedSet.add(`${current.x},${current.y}`);

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
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                if (closedSet.has(neighborKey)) continue;
                
                const moveCost = this.worldGenerator.getMoveCost(current.x, current.y, neighbor.x, neighbor.y, neighbor.isDiag);
                if (!Number.isFinite(moveCost)) continue;

                const tentativeGScore = (gScore.get(`${current.x},${current.y}`) ?? Infinity) + moveCost;

                if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeGScore);
                    fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, end));

                    if (!openSet.find(n => n.x === neighbor.x && n.y === neighbor.y)) {
                        openSet.push(neighbor);
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

    reconstructPath(cameFrom, current) {
        const path = [current];
        let currentKey = `${current.x},${current.y}`;
        while (cameFrom.has(currentKey)) {
            current = cameFrom.get(currentKey);
            path.unshift(current); // Insert at beginning to reverse natural order
            currentKey = `${current.x},${current.y}`;
        }
        return path;
    }
}
