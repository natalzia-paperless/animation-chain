var polyfills = require('./polyfills');

var requestAnimFrame = polyfills.requestAnimFrame,
    animationEnd = polyfills.animationEnd,
    transitionEnd = polyfills.transitionEnd;

function setDefaultProps(prop) {
  prop = (typeof prop !== 'object') ? {} : prop;
  prop.callback = prop.callback || function() {
    console.log('test');
  };
  prop.time = prop.time || 500;
  prop.animationType = prop.animationType || 'transition';
  prop.singleListener = prop.singleListener || true;

  return prop;
}

var Chain = function(prop) {
  prop = setDefaultProps(prop);

  var obj = {
    ticks: [],
    animationCallbacks: [],
    init: function(initProp) {
      //if there's a selector in place and the browser supports these events
      if (initProp.selector && transitionEnd) {
        obj.initWithSelector(initProp);
        return;
      }
      obj.ticks.push({
        callback: initProp.callback,
        time: initProp.time
      });

      if (obj.ticks.length === 1) {
        //If this is the only tick in the current list
        requestAnimFrame(obj.tick);
      }
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
      if (!obj.startTime) {
        obj.startTime = timestep;
      }

      if (obj.ticks[0].el) {
        //if there is an animation element at the front, don't bother with the loop
        requestAnimFrame(obj.tick);
        return;
      }

      for (var i = 0; i < obj.ticks.length; i++) {
        var currentTick = obj.ticks[i];
        if (!currentTick.el && (timestep - obj.startTime) >= currentTick.time) {
          currentTick.callback();
          obj.ticks.splice(0,1);
          if (obj.ticks.length === 0 || obj.ticks[0].el) {
            return;
          }
        }
      }

      requestAnimFrame(obj.tick);
    },
    chainTo: function(chainProp) {
      chainProp = setDefaultProps(chainProp);

      var animationName = chainProp.animationType === 'transition' ? transitionEnd : animationEnd;

      if (chainProp.selector) {
        obj.ticks.push({
          callback: chainProp.callback,
          el: document.querySelector(chainProp.selector),
          animationName: animationName
        });
        return;

      }

      obj.ticks.push({
        callback: chainProp.callback,
        time: chainProp.time
      });
    }
  };

  obj.init(prop);

  return obj;
};

module.exports = Chain;