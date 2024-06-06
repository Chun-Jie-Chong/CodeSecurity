enum Color {
    RED,
    BLACK,
}

class Node {
    key: number;
    color: Color;
    left: Node | null;
    right: Node | null;
    parent: Node | null;

    constructor(key: number, color: Color) {
        this.key = key;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    // Insert a new node into the tree
    insert(key: number) {
        const newNode = new Node(key, Color.RED);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }

        this.fixTreeAfterInsert(newNode);
    }

    // Helper method to insert a node recursively
    insertNode(root: Node, newNode: Node) {
        if (newNode.key < root.key) {
            if (root.left === null) {
                root.left = newNode;
                newNode.parent = root;
            } else {
                this.insertNode(root.left, newNode);
            }
        } else {
            if (root.right === null) {
                root.right = newNode;
                newNode.parent = root;
            } else {
                this.insertNode(root.right, newNode);
            }
        }
    }

    // Fix the tree after inserting a new node
    fixTreeAfterInsert(node: Node) {
        while (node !== this.root && node.color === Color.RED && node.parent?.color === Color.RED) {
            const parent = node.parent;
            const grandparent = parent?.parent;

            if (parent === grandparent?.left) {
                const uncle = grandparent.right;

                if (uncle?.color === Color.RED) {
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                } else {
                    if (node === parent.right) {
                        this.rotateLeft(parent);
                        node = parent;
                        parent = node.parent;
                    }

                    parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rotateRight(grandparent);
                }
            } else {
                const uncle = grandparent.left;

                if (uncle?.color === Color.RED) {
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                } else {
                    if (node === parent.left) {
                        this.rotateRight(parent);
                        node = parent;
                        parent = node.parent;
                    }

                    parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rotateLeft(grandparent);
                }
            }
        }

        this.root?.color = Color.BLACK;
    }

    // Rotate the tree left around a given node
    rotateLeft(node: Node) {
        const rightChild = node.right;

        if (rightChild !== null) {
            node.right = rightChild.left;

            if (rightChild.left !== null) {
                rightChild.left.parent = node;
            }

            rightChild.parent = node.parent;

            if (node.parent === null) {
                this.root = rightChild;
            } else if (node === node.parent.left) {
                node.parent.left = rightChild;
            } else {
                node.parent.right = rightChild;
            }

            rightChild.left = node;
            node.parent = rightChild;
        }
    }

    // Rotate the tree right around a given node
    rotateRight(node: Node) {
        const leftChild = node.left;

        if (leftChild !== null) {
            node.left = leftChild.right;

            if (leftChild.right !== null) {
                leftChild.right.parent = node;
            }

            leftChild.parent = node.parent;

            if (node.parent === null) {
                this.root = leftChild;
            } else if (node === node.parent.right) {
                node.parent.right = leftChild;
            } else {
                node.parent.left = leftChild;
            }

            leftChild.right = node;
            node.parent = leftChild;
        }
    }
    // Remove a node from the tree
    remove(key: number) {
        if (this.root === null) {
            return;
        }
        const nodeToRemove = this.searchNode(this.root, key);
        if (nodeToRemove === null) {
            return;
        }
        this.deleteNode(nodeToRemove);
    }

    // Helper method to search for a node with a given key recursively
    searchNode(root: Node | null, key: number): Node | null {
        if (root === null || root.key === key) {
            return root;
        }
        if (key < root.key) {
            return this.searchNode(root.left, key);
        }
        return this.searchNode(root.right, key);
    }

    // Helper method to delete a node from the tree
    deleteNode(node: Node) {
        let nodeToFix: Node | null;
        let isNodeToFixBlack = false;

        if (node.left === null || node.right === null) {
            nodeToFix = node;
        } else {
            nodeToFix = this.getSuccessor(node);
        }

        if (nodeToFix.left !== null) {
            isNodeToFixBlack = nodeToFix.left.color === Color.BLACK;
            this.replaceNode(nodeToFix, nodeToFix.left);
        } else {
            isNodeToFixBlack = nodeToFix.color === Color.BLACK;
            this.replaceNode(nodeToFix, nodeToFix.right);
        }

        if (isNodeToFixBlack) {
            this.fixTreeAfterDelete(nodeToFix);
        }
    }

    // Helper method to replace a node with another node
    replaceNode(node: Node, replacement: Node | null) {
        if (node.parent === null) {
            this.root = replacement;
        } else if (node === node.parent.left) {
            node.parent.left = replacement;
        } else {
            node.parent.right = replacement;
        }

        if (replacement !== null) {
            replacement.parent = node.parent;
        }
    }

    // Helper method to get the successor of a node
    getSuccessor(node: Node): Node {
        let current = node.right;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current!;
    }

    // Fix the tree after deleting a node
    fixTreeAfterDelete(node: Node) {
        while (node !== this.root && node.color === Color.BLACK) {
            if (node === node.parent?.left) {
                let sibling = node.parent.right;
                if (sibling?.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    node.parent.color = Color.RED;
                    this.rotateLeft(node.parent);
                    sibling = node.parent.right;
                }
                if (sibling?.left?.color === Color.BLACK && sibling?.right?.color === Color.BLACK) {
                    sibling.color = Color.RED;
                    node = node.parent;
                } else {
                    if (sibling?.right?.color === Color.BLACK) {
                        sibling.left!.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rotateRight(sibling);
                        sibling = node.parent.right;
                    }
                    sibling!.color = node.parent!.color;
                    node.parent!.color = Color.BLACK;
                    sibling!.right!.color = Color.BLACK;
                    this.rotateLeft(node.parent!);
                    node = this.root!;
                }
            } else {
                let sibling = node.parent.left;
                if (sibling?.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    node.parent.color = Color.RED;
                    this.rotateRight(node.parent);
                    sibling = node.parent.left;
                }
                if (sibling?.right?.color === Color.BLACK && sibling?.left?.color === Color.BLACK) {
                    sibling.color = Color.RED;
                    node = node.parent;
                } else {
                    if (sibling?.left?.color === Color.BLACK) {
                        sibling.right!.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rotateLeft(sibling);
                        sibling = node.parent.left;
                    }
                    sibling!.color = node.parent!.color;
                    node.parent!.color = Color.BLACK;
                    sibling!.left!.color = Color.BLACK;
                    this.rotateRight(node.parent!);
                    node = this.root!;
                }
            }
        }
        node.color = Color.BLACK;
    }
}