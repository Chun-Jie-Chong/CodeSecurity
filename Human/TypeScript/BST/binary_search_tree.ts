/**
 * Represents a node of a binary search tree.
 *
 * @template T The type of the value stored in the node.
 */
class TreeNode<T> {
  constructor(
    public data: T,
    public leftChild?: TreeNode<T>,
    public rightChild?: TreeNode<T>
  ) {}
}

/**
 * An implementation of a binary search tree.
 *
 * A binary tree is a tree with only two children per node. A binary search tree on top sorts the children according
 * to following rules:
 * - left child < parent node
 * - right child > parent node
 * - all children on the left side < root node
 * - all children on the right side > root node
 *
 * For profound information about trees
 * @see https://www.geeksforgeeks.org/introduction-to-tree-data-structure-and-algorithm-tutorials/
 *
 * @template T The data type of the values in the binary tree.
 */
export class BinarySearchTree<T> {
  rootNode?: TreeNode<T>

  /**
   * Instantiates the binary search tree.
   *
   * @param rootNode The root node.
   */
  constructor() {
    this.rootNode = undefined
  }

  /**
   * Checks whether the tree has the given data or not.
   *
   * @param data The data to check for.
   */
  has(data: T): boolean {
    if (!this.rootNode) {
      return false
    }

    let currentNode = this.rootNode
    while (currentNode.data !== data) {
      if (data > currentNode.data) {
        if (!currentNode.rightChild) {
          return false
        }

        currentNode = currentNode.rightChild
      } else {
        if (!currentNode.leftChild) {
          return false
        }

        currentNode = currentNode.leftChild
      }
    }

    return true
  }

  /**
   * Inserts the given data into the binary search tree.
   *
   * @param data The data to be stored in the binary search tree.
   * @returns
   */
  insert(data: T): void {
    if (!this.rootNode) {
      this.rootNode = new TreeNode<T>(data)
      return
    }

    let currentNode: TreeNode<T> = this.rootNode
    while (true) {
      if (data > currentNode.data) {
        if (currentNode.rightChild) {
          currentNode = currentNode.rightChild
        } else {
          currentNode.rightChild = new TreeNode<T>(data)
          return
        }
      } else {
        if (currentNode.leftChild) {
          currentNode = currentNode.leftChild
        } else {
          currentNode.leftChild = new TreeNode<T>(data)
          return
        }
      }
    }
  }
}
