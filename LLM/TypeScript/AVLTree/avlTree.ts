class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    height: number;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    getHeight(node: Node | null): number {
        if (node === null) {
            return 0;
        }
        return node.height;
    }

    getBalanceFactor(node: Node | null): number {
        if (node === null) {
            return 0;
        }
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    updateHeight(node: Node) {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    rotateRight(z: Node): Node {
        const y = z.left!;
        const T3 = y.right;

        y.right = z;
        z.left = T3;

        this.updateHeight(z);
        this.updateHeight(y);

        return y;
    }

    rotateLeft(z: Node): Node {
        const y = z.right!;
        const T2 = y.left;

        y.left = z;
        z.right = T2;

        this.updateHeight(z);
        this.updateHeight(y);

        return y;
    }

    insert(value: number) {
        this.root = this.insertNode(this.root, value);
    }

    insertNode(node: Node | null, value: number): Node {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values are not allowed in AVL tree
            return node;
        }

        this.updateHeight(node);

        const balanceFactor = this.getBalanceFactor(node);

        // Left Left Case
        if (balanceFactor > 1 && value < node.left!.value) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balanceFactor < -1 && value > node.right!.value) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balanceFactor > 1 && value > node.left!.value) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balanceFactor < -1 && value < node.right!.value) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }
    delete(value: number) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node: Node | null, value: number): Node | null {
        if (node === null) {
            return node;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node to be deleted found
            if (node.left === null && node.right === null) {
                // Node has no children
                node = null;
            } else if (node.left === null) {
                // Node has only right child
                node = node.right;
            } else if (node.right === null) {
                // Node has only left child
                node = node.left;
            } else {
                // Node has both left and right children
                const minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.deleteNode(node.right, minValue);
            }
        }
        if (node === null) {
            return node;
        }
        this.updateHeight(node);
        const balanceFactor = this.getBalanceFactor(node);
        // Left Left Case
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }
        // Left Right Case
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right Right Case
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        // Right Left Case
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }
        return node;
    }

    findMinValue(node: Node): number {
        let minValue = node.value;
        while (node.left !== null) {
            minValue = node.left.value;
            node = node.left;
        }
        return minValue;
    }

    search(value: number): boolean {
        return this.searchNode(this.root, value);
    }

    searchNode(node: Node | null, value: number): boolean {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
    // Other methods like delete, search, etc. can be implemented here
}