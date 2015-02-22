var chain = require('animation-chain');

document.querySelector('button').onclick = function() {
  var selectors = ["val1","val2","num1","num2"];

  var valueObject = {};

  for (var i = 0; i < selectors.length; i++) {
    var sel = selectors[i];
    valueObject[sel] = document.querySelector("."+sel).value;
  }

  chain(function(){
    console.log(valueObject.val1);
  }, valueObject.num1).chainTo(function(){
    console.log(valueObject.val2);
  }, valueObject.num2);
}
