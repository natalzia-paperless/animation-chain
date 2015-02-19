# Animation Chain

Animation Chain is a chaining library which utilizes the browser's `requestAnimationFrame` function in place of the usual `setTimeout`. This results in a much more accurate representation of time passed based on a delta time calculation. This can be useful in timing class additions and removals based on CSS transition timings.

## Set Up ##
* Clone the repo
* Run `npm install` to install dependancies
* Run grunt to build the files into the `public/` dir

## Usage ##
`animation-chain` is invoked the same way that setTimeout is, with the `chainTo` function being added to easily integrate successive function calls. Like promises for certain amounts of time or events

```
setTimeout(function(){console.log('old')}, 500);
```
```
chain(function(){console.log('new')}, 500);
```

Here's a use case for a slightly longer timeout (useful in chaining animations through adding classes)

```
setTimeout(function() {
  el.classList += " animation1";
  setTimeout(function() {
    el.classList += " animation2";
  }, 500)
}, 500);
```
```
chain(function(){
  el.classList += " animation1";
}, 500).chainTo(function(){
  el.classList += " animation2";
}, 500);
```

All while being more performant based on animation frame usage

## Useful grunt tasks ##
* `lint` - Check your code

## Coming soon ##
Support for `transitionEnd` events
