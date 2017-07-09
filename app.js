let oldstamp = 0;
let irisSize = 500;
let customColor = false;
let defaultColor = "#1ba254";
let eyeanim = false;
let squint = false;
let squinttop = false;
let squintbot = false;
let body = $('body');
let iris = $('#iris');
let lock1 = $('#lock1');
let lock2 = $('#lock2');

var manager = new Hammer.Manager(document.body);

// create recognizers
var Pan = new Hammer.Pan();
var Pinch = new Hammer.Pinch();

var Tap = new Hammer.Tap({
  taps: 1
});
var DoubleTap = new Hammer.Tap({
  event: 'doubletap',
  taps: 2
});

// use them together
Rotate.recognizeWith([Pan]);
Pinch.recognizeWith([Pan]);
Pan.recognizeWith([Pinch])

DoubleTap.recognizeWith([Tap]);
Tap.requireFailure([DoubleTap]);

// add the recognizers
manager.add(Pan);
manager.add(Pinch);
manager.add(DoubleTap);
manager.add(Tap);

// subscribe to events
var liveScale = 1;
var currentRotation = 0;

var deltaX = 0;
var deltaY = 0;
manager.on('panmove', (e) => {
  // do something cool
  var dX = deltaX + (e.deltaX);
  var dY = deltaY + (e.deltaY);
  $.Velocity.hook(iris, 'translateX', dX + 'px');
  $.Velocity.hook(iris, 'translateY', dY + 'px');
});
manager.on('panend', function(e) {
  deltaX = deltaX + e.deltaX;
  deltaY = deltaY + e.deltaY;
});

// subscribe to events
var currentScale = 1;
function getRelativeScale(scale) {
  return scale * currentScale;
}
manager.on('pinchmove', function(e) {
  // do something cool
  var scale = getRelativeScale(e.scale);
  $.Velocity.hook(iris, 'scale', scale);
});
manager.on('pinchend', function(e) {
  // cache the scale
  currentScale = getRelativeScale(e.scale);
  liveScale = currentScale;
});

window.addEventListener("mousemove", (e) => {
  body.css({'cursor': 'none'});
  var dX = e.screenX - irisSize/2;
  var dY = e.screenY - irisSize/2;
  $.Velocity.hook(iris, 'left', dX + 'px');
  $.Velocity.hook(iris, 'top', dY + 'px');
});

window.addEventListener("scroll touchmove mousewheel", (event) => {
  const stamp = event.timeStamp
  const size = iris.height;
  if (stamp - oldstamp > 20) {
    oldstamp = stamp
    if (event.originalEvent.wheelDelta >= 0) {
      irisSize = irisSize + 10;
    } else {
      if (irisSize > 20) {
        irisSize = irisSize - 10;
      }
    }
    let x = event.pageX;
    let y = event.pageY;
    body.css({'cursor': 'none'});
    $.Velocity( iris, {"height" : irisSize + "px", "width": irisSize + "px", "top": y - (irisSize/2), "left": x - (irisSize/2)}, 10, 'linear');
  }
});

window.addEventListener("mousedown", (event) => {
  $.Velocity(lock1, {"height" : 55 + "%"}, {duration: 500});
  $.Velocity(lock2, {"height" : 45 + "%"}, {duration: 500});
});

window.addEventListener("click", (event) => {
  if (!eyeanim) {
    eyeanim = true;
    $.Velocity(lock1, {"height" : 55 + "%"}, {duration: 5});
    $.Velocity(lock1, {"height" : 10 + "%"}, {duration: 300});
    $.Velocity(lock2, {"height" : 45 + "%"}, {duration: 5});
    $.Velocity(lock2, {"height" : 10 + "%"}, {duration: 300});
    setTimeout(function () {
      eyeanim = false;
    }, 305);
    $.Velocity(iris, {"height" : irisSize, "width": irisSize}, {duration: 1200});
    $.Velocity(blackness, {"opacity" : 0}, {duration: 300});
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === 'r') {
    window.location.reload();
  } else if (event.key === 's') {
    if (squint || (squinttop && squintbot)) {
      $.Velocity(lock1, {"height" : 10 + "%"}, {duration: 300});
      $.Velocity(lock2, {"height" : 10 + "%"}, {duration: 300});
      squint = false;
      squinttop = false;
      squintbot = false;
    } else {
      $.Velocity(lock1, {"height" : 45 + "%"}, {duration: 500});
      $.Velocity(lock2, {"height" : 35 + "%"}, {duration: 500});
      squint = true;
    }
  } else if (event.key === 'a') {
    if (squinttop) {
      $.Velocity(lock1, {"height" : 10 + "%"}, {duration: 300});
      squinttop = false;
    } else {
      $.Velocity(lock1, {"height" : 45 + "%"}, {duration: 300});
      squinttop = true;
    }
  } else if (event.key === 'd') {
    if (squintbot) {
      $.Velocity(lock2, {"height" : 10 + "%"}, {duration: 300});
      squintbot = false;
    } else {
      $.Velocity(lock2, {"height" : 35 + "%"}, {duration: 300});
      squintbot = true;
    }
  } else if (!customColor) {
    customColor = true;
    if (event.key === '1') {
      $("body").css({"background": "#a71c1c"}); //redeye
    } else if (event.key === '2') {
      $("body").css("background", "#f98484"); //pinkeye
    } else if (event.key === '3') {
      $("body").css("background", "#00bcd4"); //blueeye
    }
  } else {
    customColor = false;
    $("body").css("background", "#1ba254");
  }
});

$.Velocity($('#hint'), {opacity: 0}, {duration: 0});
$.Velocity($('#hint'), {opacity: 1}, {duration: 3000});
$.Velocity($('#hint'), {opacity: 0}, {duration: 1200});
