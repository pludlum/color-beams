import Game from "./game";
import Screen from "./screen";

document.addEventListener("DOMContentLoaded", function() {
  const settings = {
    soundEffects: false,
    Music: false,
  };
  // Find game canvas and associated context
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");

  // Set height and width of game canvas to window size
  let HEIGHT = window.innerHeight;
  let WIDTH = window.innerWidth;
  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;


  // MUTE ON CLICK
  const toggleMuteMusic = () => {
    if (settings.music === false) {
      music.play();
      settings.music = true;

    } else {
      music.pause();
      settings.music = false;
    }
  };

  const toggleMuteEffects = () => {
    if (settings.sound === false) {
      soundButton.className = "audio fa fa-volume-up fa-2x";
      document.getElementsByClassName("hit1")[0].volume = 1;
      document.getElementsByClassName("hit2")[0].volume = 1;
      document.getElementsByClassName("hit1")[0].play();
      settings.sound = true;

    } else {
      soundButton.className = "audio fa fa-volume-off fa-2x";
      document.getElementsByClassName("hit1")[0].volume = 0;
      document.getElementsByClassName("hit2")[0].volume = 0;
      settings.sound = false;

    }
  };

  const music = document.getElementsByClassName("music")[0];
  const soundButton = document.getElementById("audio");
  const musicButton = document.getElementById("music-icon");
  music.volume = 0.3;
  soundButton.addEventListener("click", toggleMuteEffects);
  musicButton.addEventListener("click", toggleMuteMusic);




  // START GAME ON CLICK
  const startGame = (e) => {
    e.preventDefault();

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    canvasEl.width = WIDTH;
    canvasEl.height = HEIGHT;

    let game = new Game(canvasEl, ctx);
    let gameScreen = new Screen(canvasEl, ctx, game);
    gameScreen.start();
    title.className += " hidden";
    menu.className += " hidden";

    const currentScore = document.getElementsByClassName("score current")[0];
    currentScore.innerHTML = `Current Score: 0`;
  };

  const startButton = document.getElementsByClassName("start-button")[0];
  const title = document.getElementsByClassName("game-title")[0];
  const menu = document.getElementsByClassName("menu-container")[0];
  startButton.addEventListener('click', startGame);

});
