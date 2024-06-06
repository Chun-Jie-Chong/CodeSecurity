package com.dfs;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author: caos321
 * @date: 31 October 2021 (Sunday)
 * @wiki: https://en.wikipedia.org/wiki/Depth-first_search
 */
public class DepthFirstSearch<T> {


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

    public Optional<Node<T>> recursiveSearch(final Node<T> node, final Integer value) {
        if (node == null) {
            return Optional.empty();
        }
        visited.add(node.getValue());
        if (node.getValue().equals(value)) {
            return Optional.of(node);
        }

        return node.getChildren().stream().map(v -> recursiveSearch(v, value)).flatMap(Optional::stream).findAny();
    }

    public List<T> getVisited() {
        return visited;
    }
}
