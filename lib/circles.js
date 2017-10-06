

class Circle {
  constructor(options) {
    this.radius =  30;
    this.pos = options.position;
    this.color = options.color;
    this.vel = [0, 0];
  }

  updatePos(pos) {
    this.pos = pos;
  }

  // findDistance(pos1, pos2) {
  //    let dist =  Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) );
  //    return dist;
  // }

  followPos(pathHistory, currentPos) {
    if (pathHistory.length > 30)  {
      this.pos = pathHistory[0];
    }
  }

  gravitate(pos) {

    let m = 500;
    let k = 1;
    let c = 10;

    let radialOffsetX = 2 * this.radius;
    let radialOffsetY = 2 * this.radius;

    let xAccel =  ( k * (pos[0] - this.pos[0] ) - (c * this.vel[0])) / m;
    let yAccel = ( k * (pos[1] - this.pos[1] ) - (c * this.vel[1])) / m;


    this.vel[0] += xAccel;
    this.vel[1] += yAccel;

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default Circle;
