import Circle from './circles';
import Beam from './beams';

class Game {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.leadCircle = new Circle({"color": '#bf4422'});
    this.followCircle = new Circle({"color": '#229dbf'});

    this.beams = [];
    this.circles = [this.leadCircle, this.followCircle];

    this.timer = 0;
    this.score = 0;

    this.over = false;

    this.colors = ['#bf4422', '#229dbf'];
    this.lastBeam = 0;
  }

  getRandomColor() {
    return this.colors[Math.round(Math.random())];
  }

  makeLeftVerticalBeam() {
    this.beams.push(new Beam({"pos": [-10, 0], "vel": [(0.5), 0], 'height': this.canvas.height, 'width': 8, "color": this.getRandomColor() }));
  }
  makeRightVerticalBeam() {
    this.beams.push(new Beam({"pos": [this.canvas.width + 10, 0], "vel": [(-0.5), 0], 'height': this.canvas.height, 'width': 8, "color": this.getRandomColor() }));
  }
  makeTopHorizontalBeam() {
    this.beams.push(new Beam({"pos": [-10, 0], "vel": [0, (0.5)], 'height': 8, 'width': this.canvas.width, "color": this.getRandomColor() }));
  }
  makeBottomHorizontalBeam() {
    this.beams.push(new Beam({"pos": [0, this.canvas.height + 10], "vel": [0, (-0.5)], 'height': 8, 'width': this.canvas.width, "color": this.getRandomColor() }));
  }

  createBeams(time) {
    if (this.beams.length < 2 + (this.score/50)) {
      let selection =  Math.floor(Math.random() * 4) + 1;
      switch (selection) {
        case 1:
          this.makeLeftVerticalBeam();
          break;
        case 2:
          this.makeRightVerticalBeam();
          break;
        case 3:
          this.makeTopHorizontalBeam();
          break;
        default:
          this.makeBottomHorizontalBeam();
      }
    }
  }

  detectCollision() {
    for (let i = 0; i < this.beams.length; i++) {
      for (let j = 0; j < this.circles.length; j++) {
        if (this.beams[i].pos[0] > (this.circles[j].pos[0] - this.circles[j].radius) && this.beams[i].pos[0] < this.circles[j].pos[0] + this.circles[j].radius ) {
          this.enforceCollision(this.circles[j], this.beams[i], i);
        }
        if (this.beams[i].pos[1] > (this.circles[j].pos[1] - this.circles[j].radius) && this.beams[i].pos[1] < this.circles[j].pos[1] + this.circles[j].radius ) {
          this.enforceCollision(this.circles[j], this.beams[i], i);
        }
      }
    }
  }

  enforceCollision(circle, beam, beamIdx) {
    if (circle.color === beam.color) {
      beam.remove = true;
      this.score += 1;
    } else {
      this.over = true;
    }
  }

  removeBeams() {
    for (let i = 0; i < this.beams.length; i++) {
      if(this.beams[i].remove) {
        this.beams.splice(i, 1);
        i -= 1;
      }
    }
  }

  drawAll(canvasEl, ctx, options) {
    this.removeBeams();
    this.timer += 0.001;
    this.createBeams();

    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    this.leadCircle.updatePos(options.mousePos);
    this.followCircle.followPos(options.pathHistory, options.mousePos);
    this.leadCircle.draw(ctx);
    this.followCircle.draw(ctx);


    this.beams.forEach( beam => {
      beam.move();
      beam.draw(this.ctx);
    });
    this.detectCollision();
  }
}

export default Game;
