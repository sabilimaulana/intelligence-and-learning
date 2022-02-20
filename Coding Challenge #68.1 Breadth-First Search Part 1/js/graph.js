class Graph {
  constructor() {
    this.nodes = [];
    this.graph = {};
  }

  addNode(n) {
    // Node into array
    this.nodes.push(n);
    const title = n.value;

    // Node into "hash"
    this.graph[title] = n;
  }

  getNode(actor) {
    return this.graph[actor];
  }
}
