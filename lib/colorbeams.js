// import Game from "./game";
import Screen from "./screen";


document.addEventListener("DOMContentLoaded", function() {

  const options = {
    mousePos: [0, 0],
    pathHistory: [],
  };

  // Find game canvas and associated context
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");

  // Set height and width of game canvas to window size
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;
  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;

  // Find and store the mouse position in options
  const setMousePosition = (e) => {
    options.mousePos = [e.clientX, e.clientY];
    options.pathHistory.push([e.clientX, e.clientY]);
    if (options.pathHistory.length > 31) {
      options.pathHistory.shift();
    }
  };

  canvasEl.addEventListener("mousemove", setMousePosition, false);


  const gameScreen = new Screen(canvasEl, ctx, options);
  const draw = setInterval( (e) => {
    gameScreen.draw(canvasEl, ctx, options);
  }, 10);



});
