var oldstamp = 0;
var irisSize = 300;
var customColor = false;
var defaultColor = "#1ba254";
var eyeanim = false;

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
    $( "#iris" ).animate({"height" : irisSize + "px", "width": irisSize + "px", "top": y - (irisSize/2), "left": x - (irisSize/2)}, 10);
  }
});

$("body").on("mousedown", (event) => {

  $( "#lock1" ).animate({"height" : 55 + "%"}, 500);
  $( "#lock2" ).animate({"height" : 45 + "%"}, 500);
});

$("body").on("click", (event) => {
  if (!eyeanim) {
    eyeanim = true;
    $( "#lock1" ).animate({"height" : 55 + "%"}, 5).animate({"height" : 10 + "%"}, 300);
    $( "#lock2" ).animate({"height" : 45 + "%"}, 5).animate({"height" : 10 + "%"}, 300).after(() => {
      eyeanim = false;
      console.log('hi');
    });
    $( "#iris" ).animate({"height" : irisSize, "width": irisSize}, 1200);
    $("#blackness").animate({"opacity" : 0}, 300);
  }

});

$("body").on("keydown", (event) => {
  if (event.key === 'r') {
    window.location.reload();
  } else if (!customColor) {
    customColor = true;
    if (event.key === '1') {
      $("body").css("background", "#a71c1c");
    } else if (event.key === '2') {
      $("body").css("background", "##f98484");
    }
  } else {
    customColor = false;
    $("body").css("background", "#1ba254");
  }
});
