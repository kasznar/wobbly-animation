function Spring(pointA, pointB, length, stiffness, offsetX, offsetY) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.length = length;
    this.stiffness = stiffness;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.apply = function () {
        if (this.pointB.isAnchor) {
            this.pointB.vx = 0;
            this.pointB.vy = 0;
            this.pointB.x = mouseX - width / 2;
            this.pointB.y = mouseY - height / 2;
        } else {
            let forceX = (this.pointA.x - this.pointB.x - this.offsetX) * this.stiffness;
            let ax = forceX / mass;
            this.pointB.vx = damping * (this.pointB.vx + ax);
            this.pointB.x += this.pointB.vx;

            let forceY = (this.pointA.y - this.pointB.y - this.offsetY) * this.stiffness;
            let ay = forceY / mass;
            this.pointB.vy = damping * (this.pointB.vy + ay);
            this.pointB.y += this.pointB.vy;
        }
    };

    this.display = function () {
        push();
        stroke(255);
        line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
        pop();
    };
}