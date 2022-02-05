let mass = 2;
let length = 20;
let radius = 5;
let stiffness = 0.3;
let damping = 0.8;

let pointsX = 20;
let pointsY = 20;

let springs = [];
let points = [];

let img;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  img = loadImage("rose.jpg");

  fill(255, 126);

  for (let y = 0; y < pointsY; y++) {
    for (let x = 0; x < pointsX; x++) {
      points.push(new Point(length * x, length * y));
    }
  }

  for (let x = 0; x < pointsX; x++) {
    for (let y = 0; y < pointsY; y++) {
      if (0 < x) {
        let pointA = pointAt(x, y);
        let pointB = pointAt(x - 1, y);

        springs.push(new Spring(pointA, pointB, length, stiffness, length, 0));
      }

      if (0 < y) {
        let pointA = pointAt(x, y);
        let pointB = pointAt(x, y - 1);

        springs.push(new Spring(pointA, pointB, length, stiffness, 0, length));
      }
    }
  }
}

function draw() {
  background(0);

  points.forEach(point => {
    point.calculateNextPosition();
  });

  points.forEach(point => {
    point.update();
  });

  drawShape();

  points.forEach((point, i) => {
    point.display(i);
  });
}

function mousePressed() {

  let mX = mouseX - windowWidth / 2;
  let mY = mouseY - windowHeight / 2;

  let distances = [];
  let minDist;
  let closestIndex;

  points.forEach(point => {
    distances.push(int(dist(mX, mY, point.x, point.y)));
  });

  minDist = Math.min(...distances);

  distances.forEach((dist, index) => {
    if (dist === minDist) {
      closestIndex = index;
    }
  });

  if (closestIndex !== undefined && isInsidePicture(mX, mY)) {
    points[closestIndex].isAnchor = true;
  }
}

function mouseReleased() {
  points.forEach(point => {
    point.isAnchor = false;
  });
}
