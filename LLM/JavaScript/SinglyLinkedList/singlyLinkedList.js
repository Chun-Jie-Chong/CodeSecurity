class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return this.length === 0;
    }

    append(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    prepend(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length) {
            throw new Error('Invalid index');
        }

        if (index === 0) {
            this.prepend(data);
        } else if (index === this.length) {
            this.append(data);
        } else {
            const newNode = new Node(data);
            let currentNode = this.head;
            let prevNode = null;
            let currentIndex = 0;

            while (currentIndex < index) {
                prevNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            prevNode.next = newNode;
            newNode.next = currentNode;
            this.length++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Invalid index');
        }

        let currentNode = this.head;
        let prevNode = null;
        let currentIndex = 0;

        if (index === 0) {
            this.head = currentNode.next;
        } else {
            while (currentIndex < index) {
                prevNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            prevNode.next = currentNode.next;

            if (index === this.length - 1) {
                this.tail = prevNode;
            }
        }

        this.length--;
    }
}