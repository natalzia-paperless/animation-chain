var chain = require('animation-chain');

document.querySelector('button').onclick = function() {
  var selectors = ["val1","val2","num1","num2"];

  var valueObject = {};

  for (var i = 0; i < selectors.length; i++) {
    var sel = selectors[i];
    valueObject[sel] = document.querySelector("."+sel).value;
  }

  var obj1 = {
    callback: function() {
      console.log(valueObject.val1);
    },
    time: valueObject.num1
  }, obj2 = {
    callback: function() {
      console.log(valueObject.val2);
    },
    time: valueObject.num2
  }

  chain(obj1).chainTo(obj2);
}
