var chain = require('animation-chain');

document.querySelector('button').onclick = function() {
  var animatingDiv = document.querySelector('.animating-div');

  if (animatingDiv.classList.contains('is-animating')) {
    return;
  }

  animatingDiv.classList.add('is-animating');

  var chainObj = {
    callback: function() {
      console.log('animation finished');
    },
    selector: '.animating-div'
  }

  chain(chainObj).chainTo({
    callback: function() {
      animatingDiv.classList.remove('is-animating');
    },
    time: parseInt(document.querySelector('.num1').value)
  });
}
