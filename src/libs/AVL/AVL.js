import Node from './Node';

const defaultScore = a => a;
const defaultStoreValue = a => a;

/**
 *
 * @param {Node} node
 * @return {number}
 */
function getBalance(node) {
  if (node === null) {
    return 0;
  }

  return node.leftHeight() - node.rightHeight();
}

function minValueNode(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

/**
 * @typedef {Object} AVL
 * @property {Node} _root
 * @property {function} insert
 * @property {function} reverseInOrder
 */
export default class {
  constructor(score = defaultScore, storeValue = defaultStoreValue) {
    this.score = score;
    this.storeValue = storeValue;
    this._root = null;
  }

  /**
   * Insert a value into a node tree
   * @param {Node} node
   * @param {anything} value
   * @return {Node}
   */
  insertNode(node, value) {
    if (node === null) {
      return new Node(this.storeValue(value));
    }

    const score = this.score(value);
    const nodeScore = this.score(node.value);

    // Normal bst insertion
    if (score < nodeScore) {
      node.left = this.insertNode(node.left, value);
    } else if (score > nodeScore) {
      node.right = this.insertNode(node.right, value);
    } else {
      // We don't create other node for the same score
      this.storeValue(node.value, value);
      return node;
    }

    // Update height
    node.height = 1 + Math.max(node.leftHeight(), node.rightHeight());

    // Get Balance
    const balance = getBalance(node);
    // If this node becomes unbalanced, then there
    // are 4 cases Left Left Case
    if (balance === 2) {
      const scoreLeft = this.score(node.left.value);
      if (score < scoreLeft) {
        return node.rotateRight();
      } else {
        node.left = node.left.rotateLeft();
        return node.rotateRight();
      }
    }

    // Right Right Case
    if (balance === -2) {
      const scoreRight = this.score(node.right.value);
      if (score > scoreRight) {
        return node.rotateLeft();
      } else {
        node.right = node.right.rotateRight();
        return node.rotateLeft();
      }
    }

    return node;
  }

  /**
   * Insert a value into the root element
   * @param value
   */
  insert(value) {
    this._root = this.insertNode(this._root, value);
    return this;
  }

  /**
   * Delete a node from a node tree
   * @param {Node} node
   * @param value
   * @return {Node}
   */
  deleteNode(node, value) {
    // Standar BST delete
    if (node === null) {
      return node;
    }

    const score = this.score(value);
    const scoreNode = this.score(node.value);

    if (score < scoreNode) {
      node.left = this.deleteNode(node.left, value);
    } else if (score > scoreNode) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Do deletion
      if (node.right === null || node.left === null) {
        const tmp = node.right || node.left;
        if (!tmp) {
          // No child
          node = null;
        } else {
          node = tmp;
        }
      } else {
        const tmp = minValueNode(node.right);
        node.value = tmp.value;
        node.right.right = this.deleteNode(node.right, tmp.value);
      }
    }

    // If the tree had only one node then return
    if (node === null) {
      return node;
    }

    node.height = Math.max(node.leftHeight(), node.rightHeight()) + 1;

    const balance = getBalance(node);

    if (balance > 1) {
      if (getBalance(node.left) >= 0) {
        return node.rotateRight();
      } else {
        node.left = node.left.rotateLeft();
        return node.rotateRight();
      }
    }

    if (balance < -1) {
      if (getBalance(node.right) <= 0) {
        return node.rotateLeft();
      } else {
        node.right = node.right.rotateRight();
        return node.rotateLeft();
      }
    }

    return node;
  }

  /**
   * Delete a value from the root tree
   * @param value
   */
  delete(value) {
    this._root = this.deleteNode(this._root, value);
    return this;
  }

  /**
   * Create an Iterator in reverse in order (Been a search tree === return greater elements first)
   * @return {IterableIterator<{value: *, height: *}>}
   */
  *reverseInOrder() {
    // Empty array return
    if (!this._root) {
      return;
    }
    const stack = [];
    let current = this._root;
    const height = this._root.height;

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.right;
      }

      current = stack.pop();

      yield {
        value: current.value,
        height: current.height,
      };

      current = current.left;
    }
  }

  /**
   * Util function tu print the respective elements in reverse in order
   */
  printReverseInOrder() {
    console.log(Array.from(this.reverseInOrder(), ({ value }) => value).join(' '));
  }
}
