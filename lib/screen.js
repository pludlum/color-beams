
class Screen {
  constructor(canvas, ctx, game, options) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;

    this.options = {
      mousePos: [600, 400],
      pathHistory: [],
    };

    this.setMousePosition = this.setMousePosition.bind(this);
  }

  setMousePosition(e) {
    this.options.mousePos = [e.clientX, e.clientY];
    this.options.pathHistory.push([e.clientX, e.clientY]);
    if (this.options.pathHistory.length > 31) {
      this.options.pathHistory.shift();
    }
  }
  listenForMouse() {
    this.canvas.addEventListener("mousemove", this.setMousePosition, false);
  }

  start() {
    console.log(this.canvas);
    this.listenForMouse();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (!this.game.over) {
      this.game.drawAll(this.canvas, this.ctx, this.options);
      requestAnimationFrame(this.animate.bind(this));
    } else {
      
    }
  }

}

export default Screen;
