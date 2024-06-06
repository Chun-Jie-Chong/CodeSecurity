class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return "No elements in the queue";
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// Example usage:
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.print()); // Output: 10 20 30
console.log(queue.front()); // Output: 10
console.log(queue.dequeue()); // Output: 10
console.log(queue.print()); // Output: 20 30
console.log(queue.size()); // Output: 2
console.log(queue.isEmpty()); // Output: false