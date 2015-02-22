var polyfills = require('./polyfills');

var requestAnimFrame = polyfills.requestAnimFrame,
    animationEnd = polyfills.animationEnd,
    transitionEnd = polyfills.transitionEnd;

function setDefaultProps(prop) {
  prop = (typeof prop !== 'object') ? {} : prop;
  prop.callback = prop.callback || function() {
    console.log('test');
  };
  prop.time = prop.time || 0;
  prop.animationType = prop.animationType || 'transition';
  prop.singleListener = prop.singleListener || true;

  return prop;
}

var Chain = function(prop, time) {
  if (typeof prop !== 'function') {
    prop = setDefaultProps(prop);
  }

  var obj = {
    ticks: [],
    animationCallbacks: [],
    init: function(initProp, time) {
      //if there's a selector in place and the browser supports these events
      if (initProp.selector && transitionEnd) {
        obj.initWithSelector(initProp);
        return;
      }

      var initObject = obj.formatTimeoutObject(initProp, time);

      obj.ticks.push(initObject);

      if (obj.ticks.length === 1) {
        //If this is the only tick in the current list
        requestAnimFrame(obj.tick);
      }
    },
    formatTimeoutObject: function(obj, time) {
      var initObject = obj;

      if (typeof obj === 'function') {
        initObject = {
          callback: obj,
          time: time || 0
        };
      }

      return initObject;
    },
    initWithSelector: function(initProp) {
      try {
        var el = document.querySelector(initProp.selector);
        if (!el) {
          console.log('No element with that selector');
          return;
        }

        var animationName = initProp.animationType === 'transition' ? transitionEnd : animationEnd;

        obj.ticks.push({
          callback: initProp.callback,
          el: el,
          animationName: animationName
        });

        if (obj.ticks.length === 1) {
          //if there's only one object
          if (prop.singleListener) {
            // only one listener at a time
            el.removeEventListener(animationName, obj.animationFinished);
          }
          el.addEventListener(animationName, obj.animationFinished, false);
        }
      } catch (e) {
        console.log(e);
      }
    },
    animationFinished: function() {
      obj.ticks[0].el.removeEventListener(obj.ticks[0].animationName, obj.animationFinished);
      obj.ticks[0].callback();
      obj.ticks.splice(0,1);
      if (obj.ticks.length !== 0) {
        if (!obj.ticks[0].el) {
          //If an animation ends and the next tick requires the animation frame
          requestAnimFrame(obj.tick);
        } else {
          //if the animation next requires a selector
          var el = obj.ticks[0].el;
          if (prop.singleListener) {
            // only one listener at a time
            el.removeEventListener(obj.ticks[0].animationName, obj.animationFinished);
          }
          el.addEventListener(obj.ticks[0].animationName, obj.animationFinished, false);
        }
      }
    },
    tick: function(timestep) {
      if (!obj.ticks[0].startTime) {
        obj.ticks[0].startTime = timestep;
      }

      if (obj.ticks[0].el) {
        //if there is an animation element at the front, don't bother with the loop
        requestAnimFrame(obj.tick);
        return;
      } else {
        var currentTick = obj.ticks[0];
        if ((timestep - currentTick.startTime) >= currentTick.time) {
          currentTick.callback();
          obj.ticks.splice(0,1);
          if (obj.ticks.length === 0 || obj.ticks[0].el) {
            return;
          }
        }
      }

      requestAnimFrame(obj.tick);
    },
    chainTo: function(chainProp, time) {
      if (typeof chainProp !== 'function') {
        chainProp = setDefaultProps(chainProp);
      }

      var animationName = chainProp.animationType === 'transition' ? transitionEnd : animationEnd;

      if (chainProp.selector && transitionEnd) {
        obj.ticks.push({
          callback: chainProp.callback,
          el: document.querySelector(chainProp.selector),
          animationName: animationName
        });
      } else {
        var initObject = obj.formatTimeoutObject(chainProp, time);
        obj.ticks.push(initObject);
      }

      return obj;
    }
  };

  obj.init(prop, time);

  return obj;
};

module.exports = Chain;
