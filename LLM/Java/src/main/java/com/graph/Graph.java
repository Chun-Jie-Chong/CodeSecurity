package com.graph;

import java.util.*;

class Graph {
    private int V;
    private List<List<Integer>> adj;

    public Graph(int V) {
        this.V = V;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            adj.add(new LinkedList<>());
        }
    }

    public void addEdge(int v, int w) {
        adj.get(v).add(w);
        adj.get(w).add(v);
    }

    public void addVertex() {
        V++;
        adj.add(new LinkedList<>());
    }

    public int getVertices() {
        return V;
    }

    public List<Integer> getNeighbors(int v) {
        return adj.get(v);
    }

    public boolean findEdge(int v, int w) {
        List<Integer> neighbors = adj.get(v);
        return neighbors.contains(w);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < V; i++) {
            sb.append("Vertex ").append(i).append(": ");
            for (int j : adj.get(i)) {
                sb.append(j).append(" ");
            }
            sb.append("\n");
        }
        return sb.toString();
    }
}