class Graph {
  constructor() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
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

  setStart(actor) {
    this.start = this.graph[actor];
    return this.start;
  }

  setEnd(actor) {
    this.end = this.graph[actor];
    return this.end;
  }

  reset() {
    this.nodes.forEach((node) => {
      node.searched = false;
      node.parent = null;
    });
  }
}
