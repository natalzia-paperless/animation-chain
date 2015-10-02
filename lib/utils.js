var Polyfills = require('./polyfills');

var requestAnimFrame = Polyfills.requestAnimFrame,
    animationEnd = Polyfills.animationEnd,
    transitionEnd = Polyfills.transitionEnd;

function setDefaultProps(prop) {
  if (typeof prop === 'function') {
    return prop;
  }
  prop = (typeof prop !== 'object') ? {} : prop;
  prop.callback = prop.callback || function() {
    console.warn('No callback function passed to chain');
  };
  prop.time = prop.time || 0;
  prop.animationType = prop.animationType || 'transition';
  prop.singleListener = prop.singleListener || true;

  return prop;
}

module.exports = {
  setDefaultProps: setDefaultProps
};