var CARDWIDTH = 50;
var compareCount=0;
var movesCount = 0;
var front = "";
var moveText = document.querySelector('.moveText');

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


//var front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/front.png"
//var front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/"+this.id+".png";
var back = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/back.png"
$(".turnCSS").click(function () {
    //console.log(this.src);
    //console.log(src);
    //selects images based on ID number
    switch(this.id){
        case '1':
        case '2':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/1.png";
        break;
        case '3':
        case '4':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/2.png";
        break;
        case '5':
        case '6':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/3.png";
        break;
        case '7':
        case '8':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/4.png";
        break;
        case '9':
        case '10':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/5.png";
        break;
        case '11':
        case '12':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/6.png";
        break;
        case '13':
        case '14':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/7.png";
        break;
        case '15':
        case '16':
        front = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/8.png";
        break;
    }
    //console.log("this.id= "+this.id);
    //console.log("front= "+ front);
    var src = this.src == back ? front : back; //for toggling fun
    //console.log(this.src);
    compareCount++;
    movesCount++;
    //console.log(compareCount);
    moveText.textContent = "Move: " + movesCount;
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