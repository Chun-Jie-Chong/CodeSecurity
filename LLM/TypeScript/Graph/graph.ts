class Graph<T> {
    private vertices: Map<T, Set<T>>;

    constructor() {
        this.vertices = new Map();
    }

    addVertex(vertex: T): void {
        if (!this.vertices.has(vertex)) {
            this.vertices.set(vertex, new Set());
        }
    }

    addEdge(from: T, to: T): void {
        if (!this.vertices.has(from) || !this.vertices.has(to)) {
            throw new Error('Vertex does not exist');
        }

        const neighbors = this.vertices.get(from);
        neighbors.add(to);
    }

    getVertex(vertex: T): Set<T> | undefined {
        return this.vertices.get(vertex);
    }

    getVertices(): Set<T> {
        return new Set(this.vertices.keys());
    }

    getNeighbors(vertex: T): Set<T> {
        if (!this.vertices.has(vertex)) {
            throw new Error('Vertex does not exist');
        }

        return this.vertices.get(vertex);
    }

    findEdge(from: T, to: T): boolean {
        if (!this.vertices.has(from) || !this.vertices.has(to)) {
            return false;
        }
        const neighbors = this.vertices.get(from);
        return neighbors.has(to);
    }

    toString(): string {
        let result = '';
        for (const [vertex, neighbors] of this.vertices) {
            result += `${vertex} -> `;
            for (const neighbor of neighbors) {
                result += `${neighbor}, `;
            }
            result = result.slice(0, -2); // Remove the trailing comma and space
            result += '\n';
        }
        return result;
    }

}