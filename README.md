# Animation Chain

Animation Chain is a chaining library which utilizes the browser's `requestAnimationFrame` function in place of the usual `setTimeout`. This results in a much more accurate representation of time passed based on a delta time calculation.

## Set Up ##
* Clone the repo
* Run `npm install` to install dependancies
* Run grunt to build the files into the `public/` dir

## Useful grunt tasks ##
* `lint` - Check your code

## Usage ##
Animation chain is a timer library useful for chaining together timeouts. It was mostly developed to fix the issue of nested `setTimeout` calls when dealing with CSS animations without relying on the `transitionend` event. It also utilizes the browsers `requestAnimationFrame` making it much more reliable as compared to `setTimeout`
