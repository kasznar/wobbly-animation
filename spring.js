function Spring(pointA, pointB, length, stiffness, offsetX, offsetY) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.length = length;
    this.stiffness = stiffness;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.pointA.addSpring(this);
    this.pointB.addSpring(this);

    this.pop = function () {
        pointA.springs = pointA.springs.filter(value => value !== this)
        pointB.springs = pointB.springs.filter(value => value !== this)
    }

    this.forceXOn = function (point) {
        if (point === pointA) {

            return this.forceAX();
        }
        if (point === pointB) {

            return this.forceBX();
        }
        return 0;
    }

    this.forceYOn = function (point) {
        if (point === pointA) {

            return this.forceAY();
        }
        if (point === pointB) {

            return this.forceBY();
        }
        return 0;
    }

    this.forceBX = function () {
        return (this.pointA.x - this.pointB.x - this.offsetX) * this.stiffness;
    }
    this.forceBY = function () {
        return (this.pointA.y - this.pointB.y - this.offsetY) * this.stiffness;
    }
    this.forceAX = function () {
        return -this.forceBX();
    }
    this.forceAY = function () {
        return -this.forceBY();
    }

    this.display = function () {
        push();
        stroke(255);
        line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
        pop();
    };
}