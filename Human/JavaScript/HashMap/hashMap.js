class HashMap {
    constructor() {
        this.length = 0;
        this.buckets = new Array(16).fill(undefined);
    }

    // Hash the string.
    hash(string) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

        return hashCode % this.buckets.length;
    }

    // Replace a key-value pair's value or insert a new key-value pair.
    set(key, value) {
        let index = this.hash(key);

        // Overwrite the value of the key if it exists in the hashmap
        if (this.has(key)) {
            this.buckets[index].value = value;
        } else {
            // Insert the new key-value pair to the next available bucket if the intended bucket location is already filled.
            while (this.buckets[index] !== undefined) {
                index = (index + 1) % this.buckets.length;
            }
            // Insert the key-value pair to the bucket.
            this.buckets[index] = { key: key, value: value };

            // Update key count.
            this.length++;

            // Rehash if the load factor is reached.
            const loadFactor = 0.75;
            const isLoadFactorReached = this.length / this.buckets.length >= loadFactor;
            if (isLoadFactorReached) {
                this.rehash();
            }
        }
    }

    // Create new buckets and re-place the key-value pairs.
    rehash() {
        // Save old buckets.
        const oldBuckets = this.buckets;

        // Create new bucket double the size of the previous buckets.
        this.buckets = new Array(oldBuckets.length * 2).fill(undefined);

        // Reset key value pair count.
        this.length = 0;

        // Get the key-value pairs from the old buckets.
        const oldBucketsKeyValuePairs = oldBuckets.filter((element) => element !== undefined);

        // Place the key-value pairs in the new buckets.
        oldBucketsKeyValuePairs.forEach((keyValuePair) => this.set(keyValuePair.key, keyValuePair.value));
    }

    // Get the value of a specific key-value pair.
    get(key) {
        const index = this.hash(key);
        if (this.has(key)) {
            return this.buckets[index].value;
        }
        return null;
    }

    // Check if a particular key is in the hash map.
    has(key) {
        const index = this.hash(key);
        return this.buckets[index] !== undefined && key === this.buckets[index].key;
    }

    // Clear the hashamp.
    clear() {
        // Create new array of the same size of the previous.
        this.buckets = new Array(this.buckets.length).fill(undefined);

        // Reset the length.
        this.length = 0;
    }

    // Remove a particular key-value pair.
    remove(key) {
        const index = this.hash(key);

        // Remove the key if it exists by setting its container bucket to undefined.
        if (this.has(key)) {
            this.buckets[index] = undefined;
            this.length--;
            return true;
        }
        return false;
    }

    // Return an array of keys.
    keys() {
        const keys = this.buckets.filter((value) => value !== undefined).map((obj) => obj.key);
        return keys;
    }

    // Return an array of values.
    values() {
        const values = this.buckets.filter((value) => value !== undefined).map((obj) => obj.value);
        return values;
    }

    // Return an array of key-value pairs.
    entries() {
        const entries = this.buckets.filter((value) => value !== undefined).map((obj) => [obj.key, obj.value]);
        return entries;
    }
}