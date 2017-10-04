

class Circle {
  constructor(options) {
    this.radius =  30;
    this.pos = [600, 400];
    this.color = options.color;
    this.vel = [0, 0];
  }

  updatePos(pos) {
    this.pos = pos;
  }

  findDistance(pos1, pos2) {
     const dist =  Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) );
     return dist;
  }

  followPos(pathHistory, currentPos) {
    if (pathHistory.length > 30)  {
      this.pos = pathHistory[0];
    }
  }

  gravitate(pos) {
    let norm = this.findDistance(this.pos, pos);
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
