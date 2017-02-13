var oldstamp = 0;
var irisSize = 300;

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
    $( "#iris" ).animate({"height" : irisSize + "px", "width": irisSize + "px", "top": y - (irisSize/2), "left": x - (irisSize/2)}, 20);
  }
});

$("body").on("mousedown", (event) => {
  $( "#lock1" ).animate({"height" : 55 + "%"}, 500);
  $( "#lock2" ).animate({"height" : 45 + "%"}, 500);
});

$("body").on("click", (event) => {
  $( "#lock1" ).animate({"height" : 55 + "%"}, 5).animate({"height" : 10 + "%"}, 300);
  $( "#lock2" ).animate({"height" : 45 + "%"}, 5).animate({"height" : 10 + "%"}, 300);
  $( "#iris" ).animate({"height" : irisSize, "width": irisSize}, 1200);
});
