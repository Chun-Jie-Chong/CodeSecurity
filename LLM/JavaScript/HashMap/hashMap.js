class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(key, value) {
        const newNode = new Node(key, value);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    search(key) {
        let current = this.head;
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    remove(key) {
        if (!this.head) {
            return;
        }

        if (this.head.key === key) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        let prev = null;

        while (current) {
            if (current.key === key) {
                prev.next = current.next;
                return;
            }
            prev = current;
            current = current.next;
        }
    }
}

class HashMap {
    constructor() {
        this.size = 10;
        this.buckets = new Array(this.size);

        for (let i = 0; i < this.size; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    hash(key) {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    insert(key, value) {
        const index = this.hash(key);
        this.buckets[index].insert(key, value);
    }

    get(key) {
        const index = this.hash(key);
        return this.buckets[index].search(key);
    }

    remove(key) {
        const index = this.hash(key);
        this.buckets[index].remove(key);
    }

    has(key) {
        const index = this.hash(key);
        return this.buckets[index].search(key) !== null;
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.size; i++) {
            let current = this.buckets[i].head;
            while (current) {
                keys.push(current.key);
                current = current.next;
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let i = 0; i < this.size; i++) {
            let current = this.buckets[i].head;
            while (current) {
                values.push(current.value);
                current = current.next;
            }
        }
        return values;
    }
    
    entries() {
        const entries = [];
        for (let i = 0; i < this.size; i++) {
            let current = this.buckets[i].head;
            while (current) {
                entries.push({ key: current.key, value: current.value });
                current = current.next;
            }
        }
        return entries;
    }
    
}

// Usage example
const hashMap = new HashMap();
hashMap.insert("name", "John");
hashMap.insert("age", 30);
console.log(hashMap.get("name")); // Output: John
console.log(hashMap.get("age")); // Output: 30
hashMap.remove("age");
console.log(hashMap.get("age")); // Output: null