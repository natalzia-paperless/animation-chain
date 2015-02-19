var chain = require('./chain');
if (typeof define === 'function' && define.amd) {
  define(['react'], function (React) {
    return chain;
  });
} else {
  window.Chain = chain;
}
