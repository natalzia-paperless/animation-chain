var ChainHandler = require('./chain-handler');
var Utils = require('./utils');

var Chain = function(prop, time) {
  prop = Utils.setDefaultProps(prop);

  var c = new ChainHandler(prop, time);
  return c;
};

module.exports = Chain;
