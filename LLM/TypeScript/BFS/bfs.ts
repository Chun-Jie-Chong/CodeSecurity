class Node {
    value: number;
    children: Node[];

    constructor(value: number) {
        this.value = value;
        this.children = [];
    }

    addChild(child: Node) {
        this.children.push(child);
    }
}

function breadthFirstSearch(root: Node, target: number): boolean {
    const queue: Node[] = [root];
    const visited: Set<Node> = new Set();

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        if (currentNode.value === target) {
            return true;
        }

        visited.add(currentNode);

        for (const child of currentNode.children) {
            if (!visited.has(child)) {
                queue.push(child);
            }
        }
    }

    return false;
}

// Usage example
const root = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);

root.addChild(node2);
root.addChild(node3);
node2.addChild(node4);
node3.addChild(node5);

console.log(breadthFirstSearch(root, 5)); // Output: true
console.log(breadthFirstSearch(root, 6)); // Output: false