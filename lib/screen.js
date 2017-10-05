
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
    if (this.options.pathHistory.length > 31)
      this.options.pathHistory.shift();

  }
  listenForMouse() {
    this.canvas.addEventListener("mousemove", this.setMousePosition, false);
  }

  gameOver() {
    const menu = document.getElementsByClassName("menu-container")[0];
    menu.className = "menu-container";

    const title = document.getElementsByClassName("game-title hidden")[0];
    title.className = "game-title";
    title.innerHTML = "Game Over";

    const highScore = document.getElementsByClassName("score high")[0];
    if (parseInt(highScore.id) < this.game.score ) {
      highScore.innerHTML = `High Score: ${this.game.score}`;
      highScore.id = `${this.game.score}`;
    }
  }

  start() {
    this.listenForMouse();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    if (this.game.over) return this.gameOver();

    this.game.drawAll(this.canvas, this.ctx, this.options);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Screen;
