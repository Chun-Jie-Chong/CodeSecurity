class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add a node to the end of the list
    append(data) {
        const newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    // Insert a node at a specific position
    insertAt(data, position) {
        if (position < 0 || position > this.size) {
            return false;
        }

        const newNode = new Node(data);

        if (position === 0) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else if (position === this.size) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            let current = this.head;
            let count = 0;

            while (count < position) {
                current = current.next;
                count++;
            }

            newNode.prev = current.prev;
            newNode.next = current;
            current.prev.next = newNode;
            current.prev = newNode;
        }

        this.size++;
        return true;
    }

    // Remove a node at a specific position
    removeAt(position) {
        if (position < 0 || position >= this.size) {
            return null;
        }

        let current = this.head;

        if (position === 0) {
            this.head = current.next;

            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else if (position === this.size - 1) {
            current = this.tail;
            this.tail = current.prev;
            this.tail.next = null;
        } else {
            let count = 0;

            while (count < position) {
                current = current.next;
                count++;
            }

            current.prev.next = current.next;
            current.next.prev = current.prev;
        }

        this.size--;
        return current.data;
    }

    // Get the size of the list
    getSize() {
        return this.size;
    }

    // Check if the list is empty
    isEmpty() {
        return this.size === 0;
    }

    // Find a node with a specific data value
    find(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    // Reverse the list
    reverse() {
        let current = this.head;
        let prev = null;
        while (current) {
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this.tail = this.head;
        this.head = prev;
    }
}

// Example usage:
const list = new DoublyLinkedList();
list.append(1);
list.append(2);
list.append(3);
list.insertAt(4, 1);
list.removeAt(2);
list.printList();