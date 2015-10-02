var polyfills = require('./polyfills');
var $ = require('jquery');

var requestAnimFrame = polyfills.requestAnimFrame,
    animationEnd = polyfills.animationEnd,
    transitionEnd = polyfills.transitionEnd;

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

var Chain = function(prop, time) {
  prop = setDefaultProps(prop);

  function chainObj(options, time) {
    this.ticks = [];
    this.animationCallbacks = [];
    this.options = options;
    //if there's a selector in place and the browser supports these events
    if (options.selector && transitionEnd) {
      this.initWithSelector(options);
      return;
    }

    var initObject = this.formatTimeoutObject(options, time);

    this.ticks.push(initObject);

    if (this.ticks.length === 1) {
      //If this is the only tick in the current list
      requestAnimFrame(this.tick);
    }
  };

  chainObj.prototype = {
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
    initWithSelector: function(options) {
      try {
        var el = document.querySelector(options.selector);
        if (!el) {
          console.warn('No element with that selector - returning');
          return;
        }

        var animationName = options.animationType === 'transition' ? transitionEnd : animationEnd;

        this.ticks.push({
          callback: options.callback,
          el: el,
          animationName: animationName
        });

        if (this.ticks.length === 1) {
          //if there's only one object
          $(el).one(animationName, this.animationFinished.bind(this));
        }
      } catch (e) {
        console.log(e);
      }
    },
    animationFinished: function() {
      this.ticks[0].callback();
      this.ticks.splice(0,1);

      if (this.ticks.length) {
        console.log('working');
        var el = this.ticks[0].el;
        if (!el) {
          requestAnimFrame(this.tick.bind(this));
        } else {
          /** If we have more events to listen to */
          animationType = this.ticks[0].animationName === 'transition' ? transitionEnd : animationEnd;
          $(el).one(animationType, this.animationFinished.bind(this));
        }
      }
    },
    tick: function(timestep) {
      if (!this.ticks[0].startTime) {
        this.ticks[0].startTime = timestep;
      }

      if (this.ticks[0].el) {
        //if there is an animation element at the front, don't bother with the loop
        requestAnimFrame(this.tick.bind(this));
        return;
      } else {
        var currentTick = this.ticks[0];
        if ((timestep - currentTick.startTime) >= currentTick.time) {
          currentTick.callback();
          this.ticks.splice(0,1);
          if (this.ticks.length === 0) {
            return;
          } else if (this.ticks[0].el) {
            return;
          }
        }
      }

      requestAnimFrame(this.tick);
    },
    chainTo: function(chainProp, time) {
      chainProp = setDefaultProps(chainProp);

      var animationName = chainProp.animationType === 'transition' ? transitionEnd : animationEnd;

      if (chainProp.selector && transitionEnd) {
        this.ticks.push({
          callback: chainProp.callback,
          el: document.querySelector(chainProp.selector),
          animationName: animationName
        });
      } else {
        var initObject = this.formatTimeoutObject(chainProp, time);
        this.ticks.push(initObject);
      }

      return this;
    }
  };

  var c = new chainObj(prop, time);

  return c;
};

module.exports = Chain;
