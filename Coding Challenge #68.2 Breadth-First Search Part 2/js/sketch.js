let data;
let graph;
let dropdown;

function preload() {
  data = loadJSON("./js/kevinbacon.json");
}

function setup() {
  graph = new Graph();

  dropdown = createSelect();
  dropdown.changed(bfs);

  noCanvas();

  const movies = data.movies;

  movies.forEach((item) => {
    const movie = item.title;
    const casts = item.cast;
    const movieNode = new Node(movie);
    graph.addNode(movieNode);

    casts.forEach((cast) => {
      let actorNode = graph.getNode(cast);
      if (!actorNode) {
        actorNode = new Node(cast);
        dropdown.option(cast);
      }

      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    });
  });
}

const bfs = () => {
  graph.reset();

  // const start = graph.setStart("Mickey Rourke");
  const start = graph.setStart(dropdown.value());
  const end = graph.setEnd("Kevin Bacon");

  const queue = [];
  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === end) {
      break;
    }

    current.edges.forEach((neighbor) => {
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    });
  }

  const path = [];
  path.push(end);
  let next = end.parent;
  while (next) {
    path.push(next);
    next = next.parent;
  }

  let txt = "";
  [...path].reverse().forEach((n, i) => {
    txt += n.value;
    txt += i === path.length - 1 ? "" : " --> ";
  });
  createP(txt);
};
