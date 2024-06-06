class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = "red";
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    // Insert a value into the tree
    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            this.root.color = "black";
            return;
        }

        let currentNode = this.root;
        let parentNode = null;

        while (currentNode !== null) {
            parentNode = currentNode;

            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        newNode.parent = parentNode;

        if (value < parentNode.value) {
            parentNode.left = newNode;
        } else {
            parentNode.right = newNode;
        }

        this.fixTreeAfterInsert(newNode);
    }

    // Fix the tree after insertion
    fixTreeAfterInsert(node) {
        while (node !== this.root && node.parent.color === "red") {
            let uncle;

            if (node.parent === node.parent.parent.left) {
                uncle = node.parent.parent.right;

                if (uncle !== null && uncle.color === "red") {
                    node.parent.color = "black";
                    uncle.color = "black";
                    node.parent.parent.color = "red";
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }

                    node.parent.color = "black";
                    node.parent.parent.color = "red";
                    this.rotateRight(node.parent.parent);
                }
            } else {
                uncle = node.parent.parent.left;

                if (uncle !== null && uncle.color === "red") {
                    node.parent.color = "black";
                    uncle.color = "black";
                    node.parent.parent.color = "red";
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }

                    node.parent.color = "black";
                    node.parent.parent.color = "red";
                    this.rotateLeft(node.parent.parent);
                }
            }
        }

        this.root.color = "black";
    }

    // Rotate the tree left
    rotateLeft(node) {
        const rightChild = node.right;
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

    // Rotate the tree right
    rotateRight(node) {
        const leftChild = node.left;
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
    // Remove a value from the tree
    remove(value) {
        let node = this.findNode(value);
        if (node === null) {
            return;
        }
        let child, sibling;
        if (node.left === null || node.right === null) {
            child = node;
        } else {
            child = this.successor(node);
        }
        if (child.left !== null) {
            sibling = child.left;
        } else {
            sibling = child.right;
        }
        if (sibling !== null) {
            sibling.parent = child.parent;
        }
        if (child.parent === null) {
            this.root = sibling;
        } else if (child === child.parent.left) {
            child.parent.left = sibling;
        } else {
            child.parent.right = sibling;
        }
        if (child !== node) {
            node.value = child.value;
        }
        if (child.color === "black") {
            this.fixTreeAfterRemove(sibling, child.parent);
        }
    }

    // Find a node with the given value
    findNode(value) {
        let currentNode = this.root;
        while (currentNode !== null) {
            if (value === currentNode.value) {
                return currentNode;
            } else if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return null;
    }

    // Find the successor of a node
    successor(node) {
        if (node.right !== null) {
            return this.minimum(node.right);
        }
        let parentNode = node.parent;
        while (parentNode !== null && node === parentNode.right) {
            node = parentNode;
            parentNode = parentNode.parent;
        }
        return parentNode;
    }

    // Find the minimum value in a subtree
    minimum(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Fix the tree after removal
    fixTreeAfterRemove(sibling, parent) {
        while (sibling !== this.root && (sibling === null || sibling.color === "black")) {
            if (sibling === parent.left) {
                let nephew = parent.right;
                if (nephew.color === "red") {
                    nephew.color = "black";
                    parent.color = "red";
                    this.rotateLeft(parent);
                    nephew = parent.right;
                }
                if ((nephew.left === null || nephew.left.color === "black") && (nephew.right === null || nephew.right.color === "black")) {
                    nephew.color = "red";
                    sibling = parent;
                    parent = sibling.parent;
                } else {
                    if (nephew.right === null || nephew.right.color === "black") {
                        nephew.left.color = "black";
                        nephew.color = "red";
                        this.rotateRight(nephew);
                        nephew = parent.right;
                    }
                    nephew.color = parent.color;
                    parent.color = "black";
                    nephew.right.color = "black";
                    this.rotateLeft(parent);
                    sibling = this.root;
                    break;
                }
            } else {
                let nephew = parent.left;
                if (nephew.color === "red") {
                    nephew.color = "black";
                    parent.color = "red";
                    this.rotateRight(parent);
                    nephew = parent.left;
                }
                if ((nephew.left === null || nephew.left.color === "black") && (nephew.right === null || nephew.right.color === "black")) {
                    nephew.color = "red";
                    sibling = parent;
                    parent = sibling.parent;
                } else {
                    if (nephew.left === null || nephew.left.color === "black") {
                        nephew.right.color = "black";
                        nephew.color = "red";
                        this.rotateLeft(nephew);
                        nephew = parent.left;
                    }
                    nephew.color = parent.color;
                    parent.color = "black";
                    nephew.left.color = "black";
                    this.rotateRight(parent);
                    sibling = this.root;
                    break;
                }
            }
        }
        if (sibling !== null) {
            sibling.color = "black";
        }
    }
}