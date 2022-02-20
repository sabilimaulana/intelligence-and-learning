let data;
let graph;

function preload() {
  data = loadJSON("./js/kevinbacon.json");
}

function setup() {
  console.log(data);

  graph = new Graph();
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
      }

      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    });
  });

  console.log(graph);
}
