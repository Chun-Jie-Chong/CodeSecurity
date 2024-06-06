class Node<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

class Stack<T> {
    private top: Node<T> | null;

    constructor() {
        this.top = null;
    }

    push(data: T): void {
        const newNode = new Node<T>(data);
        if (this.top === null) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
    }

    pop(): T | null {
        if (this.top === null) {
            return null;
        }
        const poppedData = this.top.data;
        this.top = this.top.next;
        return poppedData;
    }

    peek(): T | null {
        if (this.top === null) {
            return null;
        }
        return this.top.data;
    }

    isEmpty(): boolean {
        return this.top === null;
    }

    size() {
        return this.size();
    }
}