var CARDWIDTH = 50;

function turnCompatible(elem, src) {
    $(elem).animate({
        width: 0,
        marginLeft: CARDWIDTH / 2,
        marginRight: CARDWIDTH / 2
    }, function () {
        this.src = src
        $(this).animate({
            width: CARDWIDTH,
            marginLeft: 0,
            marginRight: 0,
        })
    })
}

function turnCSS(elem, src) {
    $(elem)
        .addClass("flipping")
        .bind("transitionend webkittransitionend", function () { //should add more prefixes
        this.src = src;
        $(this)
            .unbind("transitionend webkittransitionend")
            .removeClass("flipping")
    })
}

function turn(elem, src) {
    if (
    elem.style.transition === "undefined" && //should add more prefixes
    elem.style.webkitTransition === "undefined") {
        turnCompatible(elem, src)
    } else {
        turnCSS(elem, src)
    }
}


var front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/front.png"
var back = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/back.png"
$(".turnCSS").click(function () {
    console.log(this.src);
    console.log(back);
    var src = this.src == back ? front : back; //for toggling fun
    //console.log(this.src);
    //console.log(this + " " + src);
    turnCSS(this, src)
})
/*
$(".turnCompatible").click(function () {
    var src = this.src == back ? front : back; //for toggling fun
    turnCompatible(this, src)
})

$(".turn").click(function () {
    var src = this.src == back ? front : back; //for toggling fun
    turn(this, src)
})*/