/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _screen = __webpack_require__(2);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var settings = {
    soundEffects: false,
    Music: false
  };
  // Find game canvas and associated context
  var canvasEl = document.getElementById("game-canvas");
  var ctx = canvasEl.getContext("2d");

  // Set height and width of game canvas to window size
  var HEIGHT = window.innerHeight;
  var WIDTH = window.innerWidth;
  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;

  // MUTE ON CLICK
  var toggleMuteMusic = function toggleMuteMusic() {
    if (settings.music === false) {
      music.play();
      settings.music = true;
    } else {
      music.pause();
      settings.music = false;
    }
  };

  var toggleMuteEffects = function toggleMuteEffects() {
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

  var music = document.getElementsByClassName("music")[0];
  var soundButton = document.getElementById("audio");
  var musicButton = document.getElementById("music-icon");
  music.volume = 0.3;
  soundButton.addEventListener("click", toggleMuteEffects);
  musicButton.addEventListener("click", toggleMuteMusic);

  // START GAME ON CLICK
  var startGame = function startGame(e) {
    e.preventDefault();

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    canvasEl.width = WIDTH;
    canvasEl.height = HEIGHT;

    var game = new _game2.default(canvasEl, ctx);
    var gameScreen = new _screen2.default(canvasEl, ctx, game);
    gameScreen.start();
    title.className += " hidden";
    menu.className += " hidden";

    var currentScore = document.getElementsByClassName("score current")[0];
    currentScore.innerHTML = "Current Score: 0";
  };

  var startButton = document.getElementsByClassName("start-button")[0];
  var title = document.getElementsByClassName("game-title")[0];
  var menu = document.getElementsByClassName("menu-container")[0];
  startButton.addEventListener('click', startGame);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _circles = __webpack_require__(3);

var _circles2 = _interopRequireDefault(_circles);

var _beams = __webpack_require__(4);

var _beams2 = _interopRequireDefault(_beams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(canvas, ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.canvas = canvas;
    this.leadCircle = new _circles2.default({ "color": '#bf4422', "position": [400, 600] });
    this.followCircle = new _circles2.default({ "color": '#229dbf', "position": [400, 620] });

    this.beams = [];
    this.circles = [this.leadCircle, this.followCircle];

    this.timer = 0;
    this.score = 0;

    this.over = false;

    this.colors = ['#bf4422', '#229dbf'];
    this.lastBeam = 0;
  }

  _createClass(Game, [{
    key: 'getRandomColor',
    value: function getRandomColor() {
      return this.colors[Math.round(Math.random())];
    }
  }, {
    key: 'makeLeftVerticalBeam',
    value: function makeLeftVerticalBeam() {
      this.beams.push(new _beams2.default({ "pos": [-10, 0],
        "vel": [0.5 + this.score / 10, 0],
        'height': this.canvas.height,
        'width': 8,
        "color": this.getRandomColor(),
        "orientation": 'V' }));
    }
  }, {
    key: 'makeRightVerticalBeam',
    value: function makeRightVerticalBeam() {
      this.beams.push(new _beams2.default({ "pos": [this.canvas.width + 10, 0],
        "vel": [-0.5 - this.score / 10, 0],
        'height': this.canvas.height,
        'width': 8,
        "color": this.getRandomColor(),
        "orientation": 'V' }));
    }
  }, {
    key: 'makeTopHorizontalBeam',
    value: function makeTopHorizontalBeam() {
      this.beams.push(new _beams2.default({ "pos": [-10, 0], "vel": [0, 0.5 + this.score / 10],
        'height': 8,
        'width': this.canvas.width,
        "color": this.getRandomColor(),
        "orientation": 'H' }));
    }
  }, {
    key: 'makeBottomHorizontalBeam',
    value: function makeBottomHorizontalBeam() {
      this.beams.push(new _beams2.default({ "pos": [0, this.canvas.height + 10],
        "vel": [0, -0.5 - this.score / 10],
        'height': 8,
        'width': this.canvas.width,
        "color": this.getRandomColor(),
        "orientation": 'H' }));
    }
  }, {
    key: 'createBeams',
    value: function createBeams(time) {
      if (this.beams.length < 2 + this.score / 50) {
        var selection = Math.floor(Math.random() * 4) + 1;
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
  }, {
    key: 'detectCollision',
    value: function detectCollision() {
      for (var i = 0; i < this.beams.length; i++) {
        for (var j = 0; j < this.circles.length; j++) {

          if (this.beams[i].orientation === 'V' && this.beams[i].pos[0] > this.circles[j].pos[0] - this.circles[j].radius && this.beams[i].pos[0] < this.circles[j].pos[0] + this.circles[j].radius) {
            this.enforceCollision(this.circles[j], this.beams[i], i);
          }

          if (this.beams[i].orientation === 'H' && this.beams[i].pos[1] > this.circles[j].pos[1] - this.circles[j].radius && this.beams[i].pos[1] < this.circles[j].pos[1] + this.circles[j].radius) {
            this.enforceCollision(this.circles[j], this.beams[i], i);
          }
        }
      }
    }
  }, {
    key: 'enforceCollision',
    value: function enforceCollision(circle, beam, beamIdx) {
      if (circle.color === beam.color) {
        beam.remove = true;
        this.score += 1;
        var currentScore = document.getElementsByClassName("score current")[0];
        currentScore.innerHTML = 'Current Score: ' + this.score;
        if (beam.color === "#bf4422") {
          document.getElementsByClassName("hit1")[0].play();
        } else {
          document.getElementsByClassName("hit2")[0].play();
        }
      } else {
        this.over = true;
      }
    }
  }, {
    key: 'removeBeams',
    value: function removeBeams() {
      for (var i = 0; i < this.beams.length; i++) {
        if (this.beams[i].remove) {
          this.beams.splice(i, 1);
          i -= 1;
        }
      }
    }
  }, {
    key: 'drawAll',
    value: function drawAll(canvasEl, ctx, options) {
      var _this = this;

      this.removeBeams();
      this.timer += 0.001;
      this.createBeams();

      this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      this.leadCircle.updatePos(options.mousePos);
      // this.followCircle.followPos(options.pathHistory, options.mousePos);
      this.followCircle.gravitate(options.mousePos);

      this.leadCircle.draw(ctx);
      this.followCircle.draw(ctx);

      this.beams.forEach(function (beam) {
        beam.move();
        beam.draw(_this.ctx);
      });
      this.detectCollision();
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(canvas, ctx, game, options) {
    _classCallCheck(this, Screen);

    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;

    this.options = {
      mousePos: [600, 400],
      pathHistory: []
    };

    this.setMousePosition = this.setMousePosition.bind(this);
  }

  _createClass(Screen, [{
    key: "setMousePosition",
    value: function setMousePosition(e) {
      this.options.mousePos = [e.clientX, e.clientY];
      this.options.pathHistory.push([e.clientX, e.clientY]);
      if (this.options.pathHistory.length > 31) this.options.pathHistory.shift();
    }
  }, {
    key: "listenForMouse",
    value: function listenForMouse() {
      this.canvas.addEventListener("mousemove", this.setMousePosition, false);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      var menu = document.getElementsByClassName("menu-container")[0];
      menu.className = "menu-container";

      var title = document.getElementsByClassName("game-title hidden")[0];
      title.className = "game-title";
      title.innerHTML = "Game Over";

      var highScore = document.getElementsByClassName("score high")[0];
      if (parseInt(highScore.id) < this.game.score) {
        highScore.innerHTML = "High Score: " + this.game.score;
        highScore.id = "" + this.game.score;
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.listenForMouse();
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate() {
      if (this.game.over) return this.gameOver();

      this.game.drawAll(this.canvas, this.ctx, this.options);
      requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return Screen;
}();

exports.default = Screen;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
  function Circle(options) {
    _classCallCheck(this, Circle);

    this.radius = 30;
    this.pos = options.position;
    this.color = options.color;
    this.vel = [0, 0];
  }

  _createClass(Circle, [{
    key: "updatePos",
    value: function updatePos(pos) {
      this.pos = pos;
    }

    // findDistance(pos1, pos2) {
    //    let dist =  Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) );
    //    return dist;
    // }

  }, {
    key: "followPos",
    value: function followPos(pathHistory, currentPos) {
      if (pathHistory.length > 30) {
        this.pos = pathHistory[0];
      }
    }
  }, {
    key: "gravitate",
    value: function gravitate(pos) {

      var m = 1000;
      var k = 2;
      var c = 20;

      var xAccel = (k * (pos[0] - this.pos[0]) - c * this.vel[0]) / m;
      var yAccel = (k * (pos[1] - this.pos[1]) - c * this.vel[1]) / m;

      this.vel[0] += xAccel;
      this.vel[1] += yAccel;

      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }]);

  return Circle;
}();

exports.default = Circle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Beam = function () {
  function Beam(options) {
    _classCallCheck(this, Beam);

    this.color = options.color;
    this.vel = options.vel;
    this.pos = options.pos;
    this.height = options.height;
    this.width = options.width;
    this.remove = false;
    this.orientation = options.orientation;
  }

  _createClass(Beam, [{
    key: "move",
    value: function move() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    }
  }]);

  return Beam;
}();

exports.default = Beam;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map