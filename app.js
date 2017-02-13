"use-strict";
const defaults = {'irisSize': 300, 'irisMinSize': 10, 'irisStepSize': 200, 'irisFocusTime': 1200,
                  'lidCloseSpeed': 500, 'lidOpenSpeed': 300, 'toplidOpenPos': 10, 'toplidClosedPos': 55, 'bottomlidOpenPos': 10, 'bottomlidClosedPos': 45,
                    'colors':{'lid1': '#272d21', 'lid2': ' #4d2929', 'center': '#943333', 'rim': '#244a34'}};

var oldstamp = 0;

function init() {
    if (Cookies.get('eye_defaults')) {
        defaults = Cookies.get('eye_defaults');
    }
}

function scaleIris(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        defaults.irisSize = defaults.irisSize + defaults.irisStepSize;
    } else {
        if (defaults.irisSize > defaults.irisMinSize) {
            defaults.irisSize = defaults.irisSize - defaults.irisStepSize;
        }
        if (defaults.irisSize < defaults.irisMinSize) {
            defaults.irisSize = defaults.irisMinSize;
        }
    }
    let x = event.pageX;
    let y = event.pageY;
    $('body').css('cursor', 'none');
    $( "#iris" ).animate({"height" : defaults.irisSize, "width": defaults.irisSize, "top": y - (defaults.irisSize/2), "left": x - (defaults.irisSize/2)}, 700);
}

function closeEye(event) {
    let top = $( "#toplid" ).css('height');
    let bottom = $( "#bottomlid" ).css('height');
    let height = $(window).height();
    top = top.substring(0, top.length - 2);
    bottom = bottom.substring(0, top.length - 2);
    console.log(top + ' ' + bottom);

    if (event.originalEvent.wheelDelta >= 0) {
        if (top < (height * defaults.toplidClosedPos/100)) {
            top = top + 5;
        }
        if (bottom < (height * defaults.bottomlidClosedPos/100)) {
            bottom = bottom + 5;
        }
    } else {
        if (top > (height * defaults.toplidOpenPos/100)) {
            top = top - 5;
        } else {
            top = (height * defaults.toplidOpenPos/100);
        }
        if (bottom > (height * defaults.bottomlidOpenPos/100)) {
            bottom = bottom - 5;
        } else {
            bottom = (height * defaults.bottomlidOpenPos/100);
        }
    }
    console.log(top + ' ' + bottom);

    $( "#toplid" ).animate({"height" : top}, 20);
    $( "#bottomlid" ).animate({"height" : bottom}, 20);
}

$("body").on("mousemove", (event) => {
    let x = event.pageX;
    let y = event.pageY;
    $('body').css('cursor', 'none');
    $( "#iris" ).css({ "top": y - (defaults.irisSize/2), "left": x - (defaults.irisSize/2)});
});

$("body").on("scroll touchmove mousewheel", (event) => {
    const stamp = event.timeStamp;
    if (stamp - oldstamp > 20) {
        oldstamp = stamp
        if (event.altKey) {
            closeEye(event);
        } else {
            scaleIris(event);
        }
    }
});

$("body").on("mousedown", (event) => {
    $( "#toplid" ).animate({"height" : defaults.toplidClosedPos + "%"}, defaults.lidCloseSpeed);
    $( "#bottomlid" ).animate({"height" : defaults.bottomlidClosedPos + "%"}, defaults.lidCloseSpeed);
});

$("body").on("click", (event) => {
    $( "#toplid" ).animate({"height" : defaults.toplidClosedPos + "%"}, 1).animate({"height" : defaults.toplidOpenPos + "%"}, defaults.lidOpenSpeed);
    $( "#bottomlid" ).animate({"height" : defaults.bottomlidClosedPos + "%"}, 1).animate({"height" : defaults.bottomlidOpenPos + "%"}, defaults.lidOpenSpeed);
    $( "#iris" ).animate({"height" : defaults.irisSize, "width": defaults.irisSize}, defaults.irisFocusTime);
});
