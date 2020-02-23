function Point(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isAnchor = false;

    this.display = function(index) {
        push();

        noStroke();
        ellipse(this.x, this.y, radius * 2, radius * 2);

        pop();
    };
}