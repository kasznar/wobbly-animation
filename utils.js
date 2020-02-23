function pointAt(x, y) {
    let obj = points[pointsY * y + x];

    return obj;
}

function textureUV(x, y) {
    return {
        u: x / (pointsX - 1),
        v: y / (pointsY - 1)
    };
}

function isInsidePicture(x, y) {
    let insideX = x > points[0].x && x < points[pointsX-1].x;
    let insideY = y > points[0].y && y < points[points.length-1].y;

    return insideX && insideY;
}

function drawShape() {
    push();

    textureMode(NORMAL);
    texture(img);

    for (let y = 0; y < pointsY; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < pointsX; x++) {
            if (0 < y) {
                let point = pointAt(x, y - 1);
                let texUV = textureUV(x, y - 1);
                vertex(point.x, point.y, 0, texUV.u, texUV.v);

                let point2 = pointAt(x, y);
                let texUV2 = textureUV(x, y);
                vertex(point2.x, point2.y, 0, texUV2.u, texUV2.v);
            }
        }
        endShape();
    }

    pop();
}