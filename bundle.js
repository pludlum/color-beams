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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Screen from "./screen";


document.addEventListener("DOMContentLoaded", function () {

  var options = {
    mousePos: [0, 0],
    pathHistory: []
  };

  // Find game canvas and associated context
  var canvasEl = document.getElementById("game-canvas");
  var ctx = canvasEl.getContext("2d");

  // Set height and width of game canvas to window size
  var HEIGHT = window.innerHeight;
  var WIDTH = window.innerWidth;
  canvasEl.width = WIDTH;
  canvasEl.height = HEIGHT;

  // Find and store the mouse position in options
  var setMousePosition = function setMousePosition(e) {
    options.mousePos = [e.clientX, e.clientY];
    options.pathHistory.push([e.clientX, e.clientY]);
    if (options.pathHistory.length > 31) {
      options.pathHistory.shift();
    }
  };
  canvasEl.addEventListener("mousemove", setMousePosition, false);

  var game = new _game2.default(canvasEl, ctx, options);
  // const gameScreen = new Screen(canvasEl, ctx, game, options);

  var draw = setInterval(function (e) {
    game.drawAll(canvasEl, ctx, options);
  }, 10);
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
  function Game(canvas, ctx, options) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.canvas = canvas;
    this.leadCircle = new _circles2.default({ "color": '#bf4422' });
    this.followCircle = new _circles2.default({ "color": '#229dbf' });

    this.beams = [];
    this.circles = [this.leadCircle, this.followCircle];

    this.timer = 0;
    this.score = 0;

    this.colors = ['#bf4422', '#229dbf'];
  }

  _createClass(Game, [{
    key: 'getRandomColor',
    value: function getRandomColor() {
      return this.colors[Math.round(Math.random())];
    }
  }, {
    key: 'makeLeftVerticalBeam',
    value: function makeLeftVerticalBeam() {
      this.beams.push(new _beams2.default({ "pos": [-10, 0], "vel": [0.5 * (this.timer + 1), 0], 'height': this.canvas.height, 'width': 8, "color": this.getRandomColor() }));
    }
  }, {
    key: 'makeRightVerticalBeam',
    value: function makeRightVerticalBeam() {
      this.beams.push(new _beams2.default({ "pos": [this.canvas.width + 10, 0], "vel": [-0.5 * (this.timer + 1), 0], 'height': this.canvas.height, 'width': 8, "color": this.getRandomColor() }));
    }
  }, {
    key: 'makeTopHorizontalBeam',
    value: function makeTopHorizontalBeam() {
      this.beams.push(new _beams2.default({ "pos": [-10, 0], "vel": [0, 0.5 * (this.timer + 1)], 'height': 8, 'width': this.canvas.width, "color": this.getRandomColor() }));
    }
  }, {
    key: 'makeBottomHorizontalBeam',
    value: function makeBottomHorizontalBeam() {
      this.beams.push(new _beams2.default({ "pos": [0, this.canvas.height + 10], "vel": [0, -0.5 * (this.timer + 1)], 'height': 8, 'width': this.canvas.width, "color": this.getRandomColor() }));
    }
  }, {
    key: 'createBeams',
    value: function createBeams() {
      if (this.beams.length < Math.floor(1 + this.timer)) {
        var selection = Math.floor(Math.random() * 4) + 1;
        switch (selection) {
          case 1:
            this.makeLeftVerticalBeam();
          case 2:
            this.makeRightVerticalBeam();
          case 3:
            this.makeTopHorizontalBeam();
          default:
            this.makeBottomHorizontalBeam();
        }
      }
    }
  }, {
    key: 'detectCollision',
    value: function detectCollision() {
      for (var i = 0; i < this.beams.length; i++) {
        for (var j = 0; j < this.circles.length; j++) {
          if (this.beams[i].pos[0] > this.circles[j].pos[0] - this.circles[j].radius && this.beams[i].pos[0] < this.circles[j].pos[0] + this.circles[j].radius) {
            this.enforceCollision(this.circles[j], this.beams[i], i);
          }
          if (this.beams[i].pos[1] > this.circles[j].pos[1] - this.circles[j].radius && this.beams[i].pos[1] < this.circles[j].pos[1] + this.circles[j].radius) {
            this.enforceCollision(this.circles[j], this.beams[i], i);
          }
        }
      }
    }
  }, {
    key: 'enforceCollision',
    value: function enforceCollision(circle, beam, beamIdx) {
      if (circle.color === beam.color) {
        this.beams.splice(beamIdx, 1);
        this.score += 1;
      }
    }
  }, {
    key: 'drawAll',
    value: function drawAll(canvasEl, ctx, options) {
      var _this = this;

      this.timer += 0.001;
      this.createBeams();

      this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      this.leadCircle.updatePos(options.mousePos);
      this.followCircle.followPos(options.pathHistory, options.mousePos);
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
/* 2 */,
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
    this.pos = [600, 400];
    this.color = options.color;
  }

  _createClass(Circle, [{
    key: "updatePos",
    value: function updatePos(pos) {
      this.pos = pos;
    }
  }, {
    key: "findDistance",
    value: function findDistance(pos1, pos2) {
      var dist = Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
      return dist;
    }
  }, {
    key: "followPos",
    value: function followPos(pathHistory, currentPos) {
      if (pathHistory.length > 30) {
        this.pos = pathHistory[0];
      }
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