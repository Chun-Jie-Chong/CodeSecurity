package com.bfs;

import java.util.*;

/**
 * @author: caos321
 * @date: 31 October 2021 (Sunday)
 * @wiki: https://en.wikipedia.org/wiki/Breadth-first_search
 */
public class BreadthFirstSearch<T> {

    private class Node<T> {

        private final T value;
        private final List<Node<T>> children;

        public Node(final T value) {
            this.value = value;
            this.children = new ArrayList<>();
        }

        public Node(final T value, final List<Node<T>> children) {
            this.value = value;
            this.children = children;
        }

        public T getValue() {
            return value;
        }

        public void addChild(Node<T> child) {
            children.add(child);
        }

        public List<Node<T>> getChildren() {
            return children;
        }
    }

    private final List<T> visited = new ArrayList<>();

    public Optional<Node<T>> search(final Node<T> node, final T value) {
        if (node == null) {
            return Optional.empty();
        }
        if (node.getValue().equals(value)) {
            // add root node to visited
            visited.add(value);
            return Optional.of(node);
        }
        visited.add(node.getValue());

        Queue<Node<T>> queue = new ArrayDeque<>(node.getChildren());

        while (!queue.isEmpty()) {
            final Node<T> current = queue.poll();
            visited.add(current.getValue());

            if (current.getValue().equals(value)) {
                return Optional.of(current);
            }

            queue.addAll(current.getChildren());
        }

        return Optional.empty();
    }

    public List<T> getVisited() {
        return visited;
    }
}
