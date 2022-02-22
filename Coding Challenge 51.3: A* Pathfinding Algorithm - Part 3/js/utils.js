const removeFromArray = (arr, el) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] === el && arr.splice(i, 1);
  }
};

const heuristic = (a, b) => dist(a.i, a.j, b.i, b.j);
