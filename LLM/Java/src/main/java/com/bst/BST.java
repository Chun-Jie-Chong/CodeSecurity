package com.bst;

public class BST {
    private Node root;

    private class Node {
        private int key;
        private Node left;
        private Node right;

        public Node(int key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }

    public BST() {
        this.root = null;
    }

    public void insert(int key) {
        root = insertNode(root, key);
    }

    private Node insertNode(Node root, int key) {
        if (root == null) {
            root = new Node(key);
            return root;
        }

        if (key < root.key) {
            root.left = insertNode(root.left, key);
        } else if (key > root.key) {
            root.right = insertNode(root.right, key);
        }

        return root;
    }

    public boolean search(int key) {
        return searchNode(root, key);
    }

    private boolean searchNode(Node root, int key) {
        if (root == null || root.key == key) {
            return root != null;
        }

        if (key < root.key) {
            return searchNode(root.left, key);
        } else {
            return searchNode(root.right, key);
        }
    }

    public void delete(int key) {
        root = deleteNode(root, key);
    }

    private Node deleteNode(Node root, int key) {
        if (root == null) {
            return root;
        }
        if (key < root.key) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.key) {
            root.right = deleteNode(root.right, key);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }
            root.key = minValue(root.right);
            root.right = deleteNode(root.right, root.key);
        }
        return root;
    }

    private int minValue(Node root) {
        int minValue = root.key;
        while (root.left != null) {
            minValue = root.left.key;
            root = root.left;
        }
        return minValue;
    }

}