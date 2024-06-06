class Node<K, V> {
    key: K;
    value: V;
    next: Node<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap<K, V> {
    private buckets: Array<Node<K, V> | null>;
    private size: number;

    constructor(size: number) {
        this.buckets = new Array(size);
        this.size = size;
    }

    private hash(key: K): number {
        const hashValue = typeof key === 'string' ? key.length : key;
        return hashValue % this.size;
    }

    put(key: K, value: V): void {
        const index = this.hash(key);
        const newNode = new Node(key, value);

        if (!this.buckets[index]) {
            this.buckets[index] = newNode;
        } else {
            let currentNode = this.buckets[index];
            while (currentNode.next) {
                if (currentNode.key === key) {
                    currentNode.value = value;
                    return;
                }
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
    }

    get(key: K): V | undefined {
        const index = this.hash(key);

        if (this.buckets[index]) {
            let currentNode = this.buckets[index];
            while (currentNode) {
                if (currentNode.key === key) {
                    return currentNode.value;
                }
                currentNode = currentNode.next;
            }
        }

        return undefined;
    }

    remove(key: K): void {
        const index = this.hash(key);

        if (this.buckets[index]) {
            let currentNode = this.buckets[index];
            let prevNode: Node<K, V> | null = null;

            while (currentNode) {
                if (currentNode.key === key) {
                    if (prevNode) {
                        prevNode.next = currentNode.next;
                    } else {
                        this.buckets[index] = currentNode.next;
                    }
                    return;
                }
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
        }
    }

    has(key: K): boolean {
        const index = this.hash(key);
        if (this.buckets[index]) {
            let currentNode = this.buckets[index];
            while (currentNode) {
                if (currentNode.key === key) {
                    return true;
                }
                currentNode = currentNode.next;
            }
        }
        return false;
    }

    entries(): Array<[K, V]> {
        const entries: Array<[K, V]> = [];
        for (let i = 0; i < this.size; i++) {
            let currentNode = this.buckets[i];
            while (currentNode) {
                entries.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        }
        return entries;
    }

    keys(): K[] {
        const keys: K[] = [];
        for (let i = 0; i < this.size; i++) {
            let currentNode = this.buckets[i];
            while (currentNode) {
                keys.push(currentNode.key);
                currentNode = currentNode.next;
            }
        }
        return keys;
    }

    values(): V[] {
        const values: V[] = [];
        for (let i = 0; i < this.size; i++) {
            let currentNode = this.buckets[i];
            while (currentNode) {
                values.push(currentNode.value);
                currentNode = currentNode.next;
            }
        }
        return values;
    }
}