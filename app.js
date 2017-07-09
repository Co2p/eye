var oldstamp = 0;
var irisSize = 500;
var customColor = false;
var defaultColor = "#1ba254";
var eyeanim = false;
var squint = false;
var squinttop = false;
var squintbot = false;
let body = $('body');
let iris = $('#iris');
let lock1 = $('#lock1');
let lock2 = $('#lock2');

window.addEventListener("mousemove", (event) => {
  let x = event.pageX;
  let y = event.pageY;
  body.css({'cursor': 'none'});
  iris.css({ 'top':y - (irisSize/2), 'left': x - (irisSize/2)});
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
