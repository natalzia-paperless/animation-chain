const requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/** From https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/ */
function whichAnimationEvent(){
  let t;
  let el = document.createElement('fakeelement');

  let animations = {
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

let animationEnd = whichAnimationEvent();

/** From http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers */
function transitionEndEventName () {
    let i;
    let el = document.createElement('div');
    let transitions = {
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

let transitionEnd = transitionEndEventName();

module.exports = {
  requestAnimFrame,
  animationEnd,
  transitionEnd
};
