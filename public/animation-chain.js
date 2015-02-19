var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var Chain = function(callback, time) {
  var obj = {
    ticks: [],
    init: function(cb, t) {
      obj.ticks = [
        {
          cb: cb,
          time: t
        }
      ];
      requestAnimFrame(obj.tick);
    },
    tick: function(timestep) {
      if (!obj.startTime) {
        obj.startTime = timestep;
      }

      for (var i = 0; i < obj.ticks.length; i++) {
        var currentTick = obj.ticks[i];
        if ((timestep - obj.startTime) >= currentTick.time) {
          currentTick.cb();
          obj.ticks.splice(0,1);
          if (obj.ticks.length === 0) {
            return;
          }
        }
      }

      requestAnimFrame(obj.tick);
    },
    chainTo: function(cb, newTime) {
      var lastTick = obj.ticks[obj.ticks.length-1];
      obj.ticks.push({
        cb: cb,
        time: newTime + lastTick.time
      });
    }
  };

  obj.init(callback, time);

  return obj;
};

module.exports = Chain;
