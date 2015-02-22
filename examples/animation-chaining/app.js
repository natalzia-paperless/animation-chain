var chain = require('animation-chain');

document.querySelector('button').onclick = function() {
  var animatingDiv = document.querySelector('.animating-div');

  var chainingObject = [
    {
      callback: function() {
        animatingDiv.classList.add('custom-animation');
        console.log(1);
      },
      selector: '.animating-div'
    },
    {
      callback: function() {
        animatingDiv.classList.add('returning-animation');
        console.log(2);
      },
      selector: '.animating-div',
      animationType: 'animation'
    },
    {
      callback: function() {
        animatingDiv.classList.remove('custom-animation', 'returning-animation', 'is-animating');
        console.log(3);
      },
      selector: '.animating-div',
      animationType: 'animation'
    }
  ];

  animatingDiv.classList.add('is-animating');

  chain(chainingObject[0]).chainTo(chainingObject[1]).chainTo(chainingObject[2]);
}
