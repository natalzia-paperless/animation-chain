/*global define*/
var chain = require('./chain');
if (typeof define === 'function' && define.amd) {
  define(function () {
    return chain;
  });
} else {
  window.Chain = chain;
}
