(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var chain = function (callback, time) {
  this.init = function () {
    this.ticks = [{
      cb: callback,
      time: time
    }];
    requestAnimFrame(this.tick);
  };

  this.tick = function (timestep) {
    for (var i = 0; i < this.ticks.length; i++) {
      var currentTick = this.ticks[i];
      if (timestep >= currentTick.time) {
        currentTick.cb();
        this.ticks.splice(0, 1);
        if (this.ticks.length === 0) {
          return;
        }
      }
    }

    requestAnimFrame(this.tick);
  };

  this.chainTo = function (cb, newTime) {
    var lastTick = this.ticks[this.ticks.length - 1];
    this.ticks.push({
      cb: cb,
      time: newTime + lastTick.time
    });
  };

  this.init();
  return this;
};

module.exports = chain;

},{}],2:[function(require,module,exports){
"use strict";

/*global define*/
var chain = require("./chain");
if (typeof define === "function" && define.amd) {
  define(function () {
    return chain;
  });
} else {
  window.Chain = chain;
}

},{"./chain":1}]},{},[2]);
