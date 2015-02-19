var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var Chain = function(callback, time) {
  this.init = function() {
    this.ticks = [
      {
        cb: callback,
        time: time
      }
    ];
    requestAnimFrame(this.tick);
  };

  this.tick = function(timestep) {
    for (var i = 0; i < this.ticks.length; i++) {
      var currentTick = this.ticks[i];
      if (timestep >= currentTick.time) {
        currentTick.cb();
        this.ticks.splice(0,1);
        if (this.ticks.length === 0) {
          return;
        }
      }
    }

    requestAnimFrame(this.tick);
  };

  this.chainTo = function(cb, newTime) {
    var lastTick = this.ticks[this.ticks.length-1];
    this.ticks.push({
      cb: cb,
      time: newTime + lastTick.time
    });
  };

  this.init();
  return this;
};

module.exports = Chain;
