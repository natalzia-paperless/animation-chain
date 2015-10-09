const Utils = require('./utils');
const { requestAnimFrame, animationEnd, transitionEnd } = require('./polyfills');

class ChainHandler {
  constructor(options, time) {
    this.ticks = [];
    this.animationCallbacks = [];
    this.options = options;
    //if there's a selector in place and the browser supports these events
    if (options.selector && transitionEnd) {
      this.initWithSelector(options);
      return;
    }

    let initObject = this.formatTimeoutObject(options, time);

    this.ticks.push(initObject);

    if (this.ticks.length === 1) {
      //If this is the only tick in the current list
      requestAnimFrame(this.tick.bind(this));
    }
  }

  formatTimeoutObject(obj, time) {
    let initObject = obj;

    if (typeof obj === 'function') {
      initObject = {
        callback: obj,
        time: time || 0
      };
    }

    return initObject;
  }

  initWithSelector(options) {
    try {
      let el = document.querySelector(options.selector);
      if (!el) {
        console.warn('No element with that selector - returning');
        return;
      }

      let animationType = options.animationType === 'transition' ? transitionEnd : animationEnd;

      this.ticks.push({
        callback: options.callback,
        el: el,
        animationName: animationType
      });

      if (this.ticks.length === 1) {
        //if there's only one object
        el.addEventListener(animationType, this.ticks[0].handler = (e) => { this.animationFinished(e); }, false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  animationFinished(e) {
    if (this.ticks[0]) {
      e.target.removeEventListener(e.type, this.ticks[0].handler);
      this.ticks[0].callback();
    }
    this.ticks.splice(0,1);

    if (this.ticks.length) {
      let el = this.ticks[0].el;
      if (!el) {
        requestAnimFrame(this.tick.bind(this));
      } else {
        /** If we have more events to listen to */
        let animationType = this.ticks[0].animationName === 'transition' ? transitionEnd : animationEnd;
        el.addEventListener(animationType, this.ticks[0].handler = (e) => { this.animationFinished(e); }, false);
      }
    }
  }

  tick(timestep) {
    if (!this.ticks[0].startTime) {
      this.ticks[0].startTime = timestep;
    }

    if (this.ticks[0].el) {
      //if there is an animation element at the front, don't bother with the loop
      requestAnimFrame(this.tick.bind(this));
      return;
    } else {
      let currentTick = this.ticks[0];
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

    requestAnimFrame(this.tick.bind(this));
  }

  chainTo(chainProp, time) {
    chainProp = Utils.setDefaultProps(chainProp);

    let animationName = chainProp.animationType === 'transition' ? transitionEnd : animationEnd;

    if (chainProp.selector && transitionEnd) {
      this.ticks.push({
        callback: chainProp.callback,
        el: document.querySelector(chainProp.selector),
        animationName: animationName
      });
    } else {
      let initObject = this.formatTimeoutObject(chainProp, time);
      this.ticks.push(initObject);
    }

    return this;
  }
}


module.exports = ChainHandler;