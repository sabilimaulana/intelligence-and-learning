let tree;

function setup() {
  createCanvas(600, 400);
  background(51);

  tree = new Tree();

  for (let i = 0; i < 50; i++) {
    tree.addValue(floor(random(0, 100)));
  }

  console.log(tree);
  tree.traverse();
}
