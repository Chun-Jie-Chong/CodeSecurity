class Node<T> {
    value: T;
    left: Node<T> | null;
    right: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree<T> {
    root: Node<T> | null;

    constructor() {
        this.root = null;
    }

    insert(value: T) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: Node<T>, newNode: Node<T>) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: Node<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }

        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
        }
    }

    remove(value: T) {
        this.root = this.removeNode(this.root, value);
    }

    private removeNode(node: Node<T> | null, value: T): Node<T> | null {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                return node;
            }

            if (node.right === null) {
                node = node.left;
                return node;
            }

            const minNode = this.findMinNode(node.right);
            node.value = minNode.value;
            node.right = this.removeNode(node.right, minNode.value);
            return node;
        }
    }
}