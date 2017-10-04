

class Beam {
  constructor(options) {
    this.color = options.color;
    this.vel = options.vel;
    this.pos = options.pos;
    this.height = options.height;
    this.width = options.width;
    this.remove = false;
    this.orientation = options.orientation;
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  draw(ctx) {
    ctx.fillStyle=this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  }


}

export default Beam;
