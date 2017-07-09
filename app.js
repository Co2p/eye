var oldstamp = 0;
var irisSize = 500;
var customColor = false;
var defaultColor = "#1ba254";
var eyeanim = false;
var squint = false;
var squinttop = false;
var squintbot = false;

$("body").on("mousemove", (event) => {
  let x = event.pageX;
  let y = event.pageY;
  $('body').css('cursor', 'none');
  $( "#iris" ).css({ "top": y - (irisSize/2), "left": x - (irisSize/2)});
});

$("body").on("scroll touchmove mousewheel", (event) => {
  const stamp = event.timeStamp
  const size = $("#iris").css("height");
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
    $('body').css('cursor', 'none');
    $( "#iris" ).velocity({"height" : irisSize + "px", "width": irisSize + "px", "top": y - (irisSize/2), "left": x - (irisSize/2)}, 10, 'linear');
  }
});

$("body").on("mousedown", (event) => {
  $( "#lock1" ).velocity({"height" : 55 + "%"}, {duration: 500});
  $( "#lock2" ).velocity({"height" : 45 + "%"}, {duration: 500});
});

$("body").on("click", (event) => {
  if (!eyeanim) {
    eyeanim = true;
    $( "#lock1" ).velocity({"height" : 55 + "%"}, {duration: 5}).velocity({"height" : 10 + "%"}, {duration: 300});
    $( "#lock2" ).velocity({"height" : 45 + "%"}, {duration: 5}).velocity({"height" : 10 + "%"}, {duration: 300}).after(() => {
      eyeanim = false;
    });
    $( "#iris" ).velocity({"height" : irisSize, "width": irisSize}, {duration: 1200});
    $("#blackness").velocity({"opacity" : 0}, {duration: 300});
  }
});

$("body").on("keydown", (event) => {
  if (event.key === 'r') {
    window.location.reload();
  } else if (event.key === 's') {
    if (squint || (squinttop && squintbot)) {
      $( "#lock1" ).velocity({"height" : 10 + "%"}, {duration: 300});
      $( "#lock2" ).velocity({"height" : 10 + "%"}, {duration: 300});
      squint = false;
      squinttop = false;
      squintbot = false;
    } else {
      $( "#lock1" ).velocity({"height" : 45 + "%"}, {duration: 500});
      $( "#lock2" ).velocity({"height" : 35 + "%"}, {duration: 500});
      squint = true;
    }
  } else if (event.key === 'a') {
    if (squinttop) {
      $( "#lock1" ).velocity({"height" : 10 + "%"}, {duration: 300});
      squinttop = false;
    } else {
      $( "#lock1" ).velocity({"height" : 45 + "%"}, {duration: 300});
      squinttop = true;
    }
  } else if (event.key === 'd') {
    if (squintbot) {
      $( "#lock2" ).velocity({"height" : 10 + "%"}, {duration: 300});
      squintbot = false;
    } else {
      $( "#lock2" ).velocity({"height" : 35 + "%"}, {duration: 300});
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

$('#hint').velocity({opacity: 0}, {duration: 0})
.velocity({opacity: 1}, {duration: 3000})
.velocity({opacity: 0}, {duration: 1200});
