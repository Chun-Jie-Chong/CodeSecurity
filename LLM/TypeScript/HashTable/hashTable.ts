class HashTable<K, V> {
    private table: { [key: string]: V };

    constructor() {
        this.table = {};
    }

    public put(key: K, value: V): void {
        const stringKey = this.stringifyKey(key);
        this.table[stringKey] = value;
    }

    public get(key: K): V | undefined {
        const stringKey = this.stringifyKey(key);
        return this.table[stringKey];
    }

    public remove(key: K): void {
        const stringKey = this.stringifyKey(key);
        delete this.table[stringKey];
    }

    public contains(key: K): boolean {
        const stringKey = this.stringifyKey(key);
        return this.table.hasOwnProperty(stringKey);
    }

    public getKeys(): K[] {
        return Object.keys(this.table).map(key => JSON.parse(key));
    }

    public getValues(): V[] {
        return Object.values(this.table);
    }

    private stringifyKey(key: K): string {
        return JSON.stringify(key);
    }
}