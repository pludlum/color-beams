import Circle from './circles';
import Beam from './beams';

class Game {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.leadCircle = new Circle({"color": '#bf4422', "position": [400, 600]});
    this.followCircle = new Circle({"color": '#229dbf', "position": [400, 620]});

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
    this.beams.push(new Beam({"pos": [-10, 0],
                            "vel": [(0.5 + this.score/10), 0],
                            'height': this.canvas.height,
                            'width': 8,
                            "color": this.getRandomColor(),
                            "orientation": 'V'}));
  }
  makeRightVerticalBeam() {
    this.beams.push(new Beam({"pos": [this.canvas.width + 10, 0],
                            "vel": [(-0.5 - this.score/10), 0],
                            'height': this.canvas.height,
                            'width': 8,
                            "color": this.getRandomColor(),
                            "orientation": 'V'}));
  }
  makeTopHorizontalBeam() {
    this.beams.push(new Beam({"pos": [-10, 0], "vel": [0, (0.5 + this.score/10)],
                            'height': 8,
                            'width': this.canvas.width,
                            "color": this.getRandomColor(),
                            "orientation": 'H'}));
  }
  makeBottomHorizontalBeam() {
    this.beams.push(new Beam({"pos": [0, this.canvas.height + 10],
                            "vel": [0, (-0.5 - this.score/10)],
                            'height': 8,
                            'width': this.canvas.width,
                            "color": this.getRandomColor(),
                            "orientation": 'H'}));
  }

  createBeams(time) {
    if (this.beams.length < 2 + (this.score/50)) {
      let selection =  Math.floor(Math.random() * 4) + 1;
      while (selection === this.lastBeam) {
        selection = Math.floor(Math.random() * 4) + 1;
      }
      switch (selection) {
        case 1:
          this.makeLeftVerticalBeam();
          this.lastBeam = 1;
          break;
        case 2:
          this.makeRightVerticalBeam();
          this.lastBeam = 2;
          break;
        case 3:
          this.makeTopHorizontalBeam();
          this.lastBeam = 3;
          break;
        default:
          this.makeBottomHorizontalBeam();
          this.lastBeam = 4;
      }
    }
  }

  detectCollision() {
    for (let i = 0; i < this.beams.length; i++) {
      for (let j = 0; j < this.circles.length; j++) {


        if (this.beams[i].orientation === 'V' &&
            this.beams[i].pos[0] > (this.circles[j].pos[0] - this.circles[j].radius)
            && this.beams[i].pos[0] < this.circles[j].pos[0] + this.circles[j].radius ) {
              this.enforceCollision(this.circles[j], this.beams[i], i);
        }

        if (this.beams[i].orientation === 'H' &&
            this.beams[i].pos[1] > (this.circles[j].pos[1] - this.circles[j].radius)
            && this.beams[i].pos[1] < this.circles[j].pos[1] + this.circles[j].radius ) {
              this.enforceCollision(this.circles[j], this.beams[i], i);
        }
      }
    }
  }

  enforceCollision(circle, beam, beamIdx) {
    if (circle.color === beam.color) {
      beam.remove = true;
      this.score += 1;
      const currentScore = document.getElementsByClassName("score current")[0];
      currentScore.innerHTML = `Current Score: ${this.score}`;
      if (beam.color === "#bf4422") {
        document.getElementsByClassName("hit1")[0].play();
      } else {
        document.getElementsByClassName("hit2")[0].play();
      }
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
    // this.followCircle.followPos(options.pathHistory, options.mousePos);
    this.followCircle.gravitate(options.mousePos);

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
