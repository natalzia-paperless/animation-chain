const ChainHandler = require('./chain-handler');
const Utils = require('./utils');

const Chain = (prop, time) => {
  prop = Utils.setDefaultProps(prop);

  const c = new ChainHandler(prop, time);
  return c;
};

module.exports = Chain;
