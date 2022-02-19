class Tree {
  constructor() {
    this.root = null;
  }

  addValue(n) {
    const node = new Node(n);
    if (this.root === null) {
      this.root = node;
      this.root.x = width / 2;
      this.root.y = 16;
    } else {
      this.root.addNode(node);
    }
  }

  traverse() {
    this.root.visit(this.root);
  }

  search(val) {
    this.root.search(val);
  }
}
