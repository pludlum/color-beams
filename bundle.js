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


var _screen = __webpack_require__(2);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var gameScreen = new _screen2.default(canvasEl, ctx, options);
  var draw = setInterval(function (e) {
    gameScreen.draw(canvasEl, ctx, options);
  }, 10);
}); // import Game from "./game";

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _circles = __webpack_require__(3);

var _circles2 = _interopRequireDefault(_circles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(canvas, ctx, options) {
    _classCallCheck(this, Screen);

    this.ctx = ctx;
    this.leadCircle = new _circles2.default({ "color": '#A8355C' });
    this.followCircle = new _circles2.default({ "color": '#2A5673' });
  }

  _createClass(Screen, [{
    key: 'draw',
    value: function draw(canvasEl, ctx, options) {
      this.leadCircle.updatePos(options.mousePos);
      this.followCircle.followPos(options.pathHistory, options.mousePos);

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.leadCircle.draw(this.ctx);
      this.followCircle.draw(this.ctx);
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
    this.pos = [0, 0];
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
        console.log(this.findDistance(currentPos, pathHistory[0]));
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map