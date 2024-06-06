class Node<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    isEmpty(): boolean {
        return this.head === null;
    }

    append(data: T): void {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }

    prepend(data: T): void {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    delete(data: T): void {
        if (this.isEmpty()) {
            return;
        }
        if (this.head!.data === data) {
            this.head = this.head!.next;

            if (this.head === null) {
                this.tail = null;
            }
        } else {
            let currentNode = this.head;

            while (currentNode!.next !== null) {
                if (currentNode!.next.data === data) {
                    currentNode!.next = currentNode!.next.next;

                    if (currentNode!.next === null) {
                        this.tail = currentNode;
                    }
                    break;
                }
                currentNode = currentNode!.next;
            }
        }
    }

    insertAt(index: number, data: T): void {
        if (index < 0) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            this.prepend(data);
        } else {
            let currentNode = this.head;
            let currentIndex = 0;
            while (currentNode !== null && currentIndex < index - 1) {
                currentNode = currentNode.next;
                currentIndex++;
            }
            if (currentNode === null) {
                throw new Error("Index out of bounds");
            }
            const newNode = new Node(data);
            newNode.next = currentNode.next;
            currentNode.next = newNode;
            if (currentNode === this.tail) {
                this.tail = newNode;
            }
        }
    }
}