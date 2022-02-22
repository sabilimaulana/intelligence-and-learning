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

    if (random(1) < 0.3) {
      this.wall = true;
    }
  }

  show(color = 255) {
    fill(color);
    // fill(255);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    // rect(this.i * w, this.j * h, w - 1, h - 1);
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
