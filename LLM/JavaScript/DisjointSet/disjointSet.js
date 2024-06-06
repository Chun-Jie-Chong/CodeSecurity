class DisjointSet {
    constructor(size) {
        this.parent = new Array(size);
        this.rank = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX === rootY) {
            return;
        }

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
    }
}