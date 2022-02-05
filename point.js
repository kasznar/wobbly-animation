function Point(x, y) {
    this.nextX = x;
    this.nextY = y;
    this.springs = []
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isAnchor = false;

    this.addSpring = function(spring){
        this.springs.push(spring)
    }

    this.clearSprings = function(){
        springs.forEach(element => {
            element.pop()
        });
    }

    this.calculateNextPosition = function(){
        if (this.isAnchor) {
            this.vx = 0;
            this.vy = 0;
            this.nextX = mouseX - width / 2;
            this.nextY = mouseY - height / 2;
        } else {

            let forceX = this.springs.reduce((sum, spring) => sum + spring.forceXOn(this), 0)
            let ax = forceX / mass;
            this.vx = damping * (this.vx + ax);
            this.nextX = this.x + this.vx;

            let forceY = this.springs.reduce((sum, spring) => sum + spring.forceYOn(this), 0)
            let ay = forceY / mass;
            this.vy = damping * (this.vy + ay);
            this.nextY = this.y + this.vy;
        }
    }

    this.update = function(){
        this.x = this.nextX;
        this.y = this.nextY;
    }

    this.display = function(index) {
        push();

        noStroke();
        ellipse(this.x, this.y, radius * 2, radius * 2);

        pop();
    };
}