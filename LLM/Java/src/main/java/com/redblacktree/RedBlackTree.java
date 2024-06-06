package com.redblacktree;

public class RedBlackTree<Key extends Comparable<Key>, Value> {

    private static final boolean RED = true;
    private static final boolean BLACK = false;

    private Node root;

    private class Node {
        private Key key;
        private Value value;
        private Node left, right;
        private boolean color;
        private int size;

        public Node(Key key, Value value, boolean color, int size) {
            this.key = key;
            this.value = value;
            this.color = color;
            this.size = size;
        }
    }

    // Helper method to check if a node is red
    private boolean isRed(Node node) {
        if (node == null) {
            return false;
        }
        return node.color == RED;
    }

    // Helper method to get the size of a node
    private int size(Node node) {
        if (node == null) {
            return 0;
        }
        return node.size;
    }

    // Helper method to rotate a node to the left
    private Node rotateLeft(Node node) {
        Node x = node.right;
        node.right = x.left;
        x.left = node;
        x.color = node.color;
        node.color = RED;
        x.size = node.size;
        node.size = 1 + size(node.left) + size(node.right);
        return x;
    }

    // Helper method to rotate a node to the right
    private Node rotateRight(Node node) {
        Node x = node.left;
        node.left = x.right;
        x.right = node;
        x.color = node.color;
        node.color = RED;
        x.size = node.size;
        node.size = 1 + size(node.left) + size(node.right);
        return x;
    }

    // Helper method to flip the colors of a node and its children
    private void flipColors(Node node) {
        node.color = RED;
        node.left.color = BLACK;
        node.right.color = BLACK;
    }

    // Insert a key-value pair into the tree
    public void put(Key key, Value value) {
        root = put(root, key, value);
        root.color = BLACK;
    }

    private Node put(Node node, Key key, Value value) {
        if (node == null) {
            return new Node(key, value, RED, 1);
        }

        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            node.left = put(node.left, key, value);
        } else if (cmp > 0) {
            node.right = put(node.right, key, value);
        } else {
            node.value = value;
        }

        if (isRed(node.right) && !isRed(node.left)) {
            node = rotateLeft(node);
        }
        if (isRed(node.left) && isRed(node.left.left)) {
            node = rotateRight(node);
        }
        if (isRed(node.left) && isRed(node.right)) {
            flipColors(node);
        }

        node.size = 1 + size(node.left) + size(node.right);
        return node;
    }

    // Get the value associated with a key
    public Value get(Key key) {
        Node node = root;
        while (node != null) {
            int cmp = key.compareTo(node.key);
            if (cmp < 0) {
                node = node.left;
            } else if (cmp > 0) {
                node = node.right;
            } else {
                return node.value;
            }
        }
        return null;
    }
    // Remove a key-value pair from the tree
    public void remove(Key key) {
        root = remove(root, key);
    }

    private Node remove(Node node, Key key) {
        if (node == null) {
            return null;
        }
        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            node.left = remove(node.left, key);
        } else if (cmp > 0) {
            node.right = remove(node.right, key);
        } else {
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
            Node temp = node;
            node = min(temp.right);
            node.right = deleteMin(temp.right);
            node.left = temp.left;
        }
        node.size = 1 + size(node.left) + size(node.right);
        return node;
    }

    // Helper method to find the minimum key in a subtree
    private Node min(Node node) {
        if (node.left == null) {
            return node;
        }
        return min(node.left);
    }

    // Helper method to delete the minimum key in a subtree
    private Node deleteMin(Node node) {
        if (node.left == null) {
            return node.right;
        }
        node.left = deleteMin(node.left);
        node.size = 1 + size(node.left) + size(node.right);
        return node;
    }
}