/**
 * @typedef {Object} Node
 * @property {anything} value
 * @property {number} height
 * @property {Node} left
 * @property {Node} right
 */
export default class Node {
  constructor(value, height = 1, left = null, right = null) {
    this.value = value;
    this.height = height;
    this.left = left;
    this.right = right;
  }

  rightHeight() {
    if (this.right === null) {
      return 0
    }
    return this.right.height;
  }

  leftHeight() {
    if (this.left === null) {
      return 0
    }
    return this.left.height;
  }

  rotateRight() {
    const root = this.left;
    const left = root.right;

    // Perform rotation
    root.right = this;
    this.left = left;

    // Update heights
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    root.height = Math.max(root.leftHeight(), this.height) + 1;

    // Return new root
    return root;
  }


  // A utility function to left rotate subtree rooted with x
  // See the diagram given above.
  rotateLeft() {
    const root = this.right;
    const right = root.left;

    // Perform rotation
    root.left = this;
    this.right = right;

    //  Update heights
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
    root.height = Math.max(this.height, root.rightHeight()) + 1;

    // Return new root
    return root;
  }
}
