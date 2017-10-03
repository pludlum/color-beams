import Game from "./game";
import Screen from "./screen";

document.addEventListener("DOMContentLoaded", function() {
  const settings = {
    sound: false,
  };
  // Find game canvas and associated context
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");

  // Set height and width of game canvas to window size
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;
  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;


  const startGame = (e) => {
    e.preventDefault();
    let game = new Game(canvasEl, ctx);
    let gameScreen = new Screen(canvasEl, ctx, game);
    gameScreen.start();
    startButton.className += " hidden";
    title.className += " hidden";
  };

  const startButton = document.getElementsByClassName("start-button")[0];
  const title = document.getElementsByClassName("game-title")[0];
  startButton.addEventListener('click', startGame);

});
