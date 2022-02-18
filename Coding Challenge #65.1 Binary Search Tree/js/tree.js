class Tree {
  constructor() {
    this.root = null;
  }

  addValue(n) {
    const node = new Node(n);
    if (this.root === null) {
      this.root = node;
    } else {
      this.root.addNode(node);
    }
  }

  traverse() {
    this.root.visit();
  }

  search(val) {
    this.root.search(val);
  }
}
