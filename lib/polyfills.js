var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/** From https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/ */
function whichAnimationEvent(){
  var t,
      el = document.createElement('fakeelement');

  var animations = {
    'animation'      : 'animationend',
    'OAnimation'     : 'oAnimationEnd',
    'MozAnimation'   : 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  };

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

var animationEnd = whichAnimationEvent();

/** From http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers */
function transitionEndEventName () {
    var i,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }

    //TODO: throw 'TransitionEnd event is not supported in this browser';
    return null;
}

var transitionEnd = transitionEndEventName();

module.exports = {
  requestAnimFrame: requestAnimFrame,
  animationEnd: animationEnd,
  transitionEnd: transitionEnd
};
