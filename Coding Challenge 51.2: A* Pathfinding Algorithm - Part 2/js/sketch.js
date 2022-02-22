const rows = 50;
const cols = 50;
const grid = new Array(cols);

const openSet = [];
const closedSet = [];

let start, end;
let w, h;
let path = [];

class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if (random(1) < 0.2) {
      this.wall = true;
    }
  }

  show(color) {
    fill(color);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  addNeighbors(grid) {
    const i = this.i;
    const j = this.j;

    i < cols - 1 && this.neighbors.push(grid[i + 1][j]);
    i > 0 && this.neighbors.push(grid[i - 1][j]);
    j < rows - 1 && this.neighbors.push(grid[i][j + 1]);
    j > 0 && this.neighbors.push(grid[i][j - 1]);
    i > 0 && j > 0 && this.neighbors.push(grid[i - 1][j - 1]);
    i < cols - 1 && j > 0 && this.neighbors.push(grid[i + 1][j - 1]);
    i > 0 && j < rows - 1 && this.neighbors.push(grid[i - 1][j + 1]);
    i < cols - 1 && j < rows - 1 && this.neighbors.push(grid[i + 1][j + 1]);
  }
}

function setup() {
  createCanvas(400, 400);
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

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

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
    for (let i = 0; i < openSet.length; i++) {
      winner = openSet[i].f < openSet[winner].f ? i : winner;
    }

    current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    current.neighbors.forEach((neighbor) => {
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let _g = current.g + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (_g < neighbor.g) {
            newPath = false;
            neighbor.g = _g;
          }
        } else {
          neighbor.g = _g;
          openSet.push(neighbor);
          newPath = true;
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

  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  closedSet.forEach((item) => item.show(color(255, 0, 0)));
  openSet.forEach((item) => item.show(color(0, 255, 0)));

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  path.forEach((item) => item.show(color(0, 0, 255)));
}
