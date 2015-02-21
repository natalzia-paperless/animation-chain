var chain = require('animation-chain');

chain({
  callback: function() {
    console.log('testing');
  },
  time: 400
});
