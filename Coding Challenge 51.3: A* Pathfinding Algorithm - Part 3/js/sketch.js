const rows = 50;
const cols = 50;
const grid = new Array(cols);

const openSet = [];
const closedSet = [];

let start, end;
let w, h;
let path = [];

function setup() {
  createCanvas(600, 600);
  console.log("A*");

  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  grid.forEach((row) => row.forEach((item) => item.addNeighbors(grid)));

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {
  let current;

  if (openSet.length) {
    // we can keep going
    let winner = 0;
    openSet.forEach(
      (item, i) => (winner = item.f < openSet[winner].f ? i : winner)
    );

    current = openSet[winner];
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    current.neighbors.forEach((neighbor) => {
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let _g = current.g + heuristic(neighbor, current);

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (_g < neighbor.g) {
            neighbor.g = _g;
            newPath = true;
          }
        } else {
          neighbor.g = _g;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    });
  } else {
    console.log("No Solution");
    noLoop();
    return;
  }

  background(255);

  grid.forEach((row) => row.forEach((item) => item.show(color(255))));

  // closedSet.forEach((item) => item.show(color(255, 0, 0)));
  // openSet.forEach((item) => item.show(color(0, 255, 0)));

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // path.forEach((item) => item.show(color(0, 0, 255)));

  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  path.forEach((item) => vertex(item.i * w + w / 2, item.j * h + h / 2));
  endShape();
}
