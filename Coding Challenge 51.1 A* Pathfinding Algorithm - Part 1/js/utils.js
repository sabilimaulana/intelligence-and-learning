const removeFromArray = (arr, el) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] === el && arr.splice(i, 1);
  }
};

const heuristic = (a, b) => abs(a.i - b.i) + abs(a.j - b.j);
