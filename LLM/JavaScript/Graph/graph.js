class Graph {
    constructor() {
        this.vertices = new Map();
    }

    addVertex(vertex) {
        if (!this.vertices.has(vertex)) {
            this.vertices.set(vertex, new Set());
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.vertices.has(vertex1) && this.vertices.has(vertex2)) {
            this.vertices.get(vertex1).add(vertex2);
            this.vertices.get(vertex2).add(vertex1);
        }
    }

    findEdge(vertex1, vertex2) {
        if (this.vertices.has(vertex1) && this.vertices.has(vertex2)) {
            return this.vertices.get(vertex1).has(vertex2);
        }
        return false;
    }

    getVertex(vertex) {
        if (this.vertices.has(vertex)) {
            return this.vertices.get(vertex);
        }
        return null;
    }

    getVertices() {
        return Array.from(this.vertices.keys());
    }

    getNeighbors(vertex) {
        if (this.vertices.has(vertex)) {
            return Array.from(this.vertices.get(vertex));
        }
        return [];
    }

    toString() {
        let result = "";
        for (let vertex of this.vertices.keys()) {
            result += `${vertex}: `;
            for (let neighbor of this.vertices.get(vertex)) {
                result += `${neighbor} `;
            }
            result += "\n";
        }
        return result;
    }
}