class Node<T> {
    public value: T;
    public next: Node<T> | null;
    public prev: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public getSize(): number {
        return this.size;
    }

    public add(value: T): void {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    public remove(value: T): void {
        let currentNode = this.head;

        while (currentNode !== null) {
            if (currentNode.value === value) {
                if (currentNode.prev !== null) {
                    currentNode.prev.next = currentNode.next;
                } else {
                    this.head = currentNode.next;
                }

                if (currentNode.next !== null) {
                    currentNode.next.prev = currentNode.prev;
                } else {
                    this.tail = currentNode.prev;
                }

                this.size--;
                break;
            }

            currentNode = currentNode.next;
        }
    }

    public find(value: T): Node<T> | null {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    public reverse(): void {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currentNode !== null) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            currentNode.prev = nextNode;
            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;
    }
}