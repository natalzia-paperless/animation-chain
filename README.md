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
chain({callback: function(){console.log('new')}, time: 500});
```

Here's a use case for a slightly longer timeout (useful in chaining animations through adding classes)

```
setTimeout(function() {
  el.classList.toggle("animation1");
  setTimeout(function() {
    el.classList.toggle("animation2");
  }, 500)
}, 500);
```
```
var obj1 = {
  callback: function() {
    el.classList.toggle("animation1");
  },
  time: 500
};

var obj2 = {
  callback: function() {
    el.classList.toggle("animation2");
  },
  time: 500
}

chain(obj1).chainTo(obj2);
```

All while being more performant based on animation frame usage

You can also tap into the transition and animation events like so

```
var chainObject = {
  selector: '.animating-el',
  callback: function() {
    console.log('animation-ended')
  },
  animationType: 'transition'
}

chain(chainObject);
```

### Options ###
`callback`: The callback to be executed when animation/timeout ends

`animationType`: Defaults to `transition` can also be `animation` if keyframes are being used

`time`: If using a timeout, the time to be used

### Fallbacks ###
If you're planning on utilizing timing events but want to support browsers that don't support those events, simply pass a `time` into your object with the correct amount of time the animation. The plugin will detect that those events are supported and default to the timeout

## Useful grunt tasks ##
* `lint` - Check your code

## Coming soon ##
~~Support for `transitionEnd` events~~
