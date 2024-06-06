class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    dfsRecursive(startVertex) {
        const visited = {};
        const result = [];

        const dfs = (vertex) => {
            if (!vertex) return;

            visited[vertex] = true;
            result.push(vertex);

            this.adjacencyList[vertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            });
        };

        dfs(startVertex);

        return result;
    }

    dfsIterative(startVertex) {
        const stack = [startVertex];
        const visited = {};
        const result = [];

        visited[startVertex] = true;

        while (stack.length) {
            const currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }
}

// Example usage:
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');

console.log(graph.dfsRecursive('A')); // Output: ['A', 'B', 'D', 'E', 'C', 'F']
console.log(graph.dfsIterative('A')); // Output: ['A', 'C', 'E', 'F', 'D', 'B']