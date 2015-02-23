# Animation Chain

Animation Chain is a chaining library which utilizes the browser's `requestAnimationFrame` and `transitionEnd` events in place of `setTimeout`. This results in a much more accurate representation of time passed and animation completion. This can be useful in timing class additions and removals based on CSS transition timings.

## Set Up ##
* Clone the repo
* Run `npm install` to install dependancies
* Run grunt to build the files into the `public/` dir
* Changes will also automatically be applied to the examples/ folder so testing can be done there

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
  el.classList.toggle("animation1");
  setTimeout(function() {
    el.classList.toggle("animation2");
  }, 500)
}, 500);
```
```
chain(function() {
  el.classList.toggle("animation1");
}, 500).chainTo(function() {
  el.classList.toggle("animation2");
}, 500);
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

`singleListener`: Defaults to `true`. Whether to only allow one event listener on a given element at a time. This can be useful when working with animations that can be stopped partway through so the event listener doesn't fire at the wrong end of the animation

### Fallbacks ###
If you're planning on utilizing timing events but want to support browsers that don't support those events, simply pass a `time` into your object with the correct amount of time the animation. The plugin will detect that those events are supported and default to the timeout

## Useful grunt tasks ##
* `lint` - Check your code

## Examples ##
Run `npm run examples` to start a server and view the different examples

This starts a server running at `localhost:8080/`

## Coming soon ##
~~Support for `transitionEnd` events~~
~~setTimeout syntax~~
