import Circle from './circles';

class Screen {
  constructor(canvas, ctx, options) {
    this.ctx = ctx;
    this.leadCircle = new Circle({"color": '#A8355C'});
    this.followCircle = new Circle({"color": '#2A5673'});
  }

  draw(canvasEl, ctx, options) {
    this.leadCircle.updatePos(options.mousePos);
    this.followCircle.followPos(options.pathHistory, options.mousePos);

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.leadCircle.draw(this.ctx);
    this.followCircle.draw(this.ctx);
  }
}



export default Screen;
