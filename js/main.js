var CARDWIDTH = 50;
var compareCount=0;
var movesCount = 0;
var front = "";
var moveText = document.querySelector('.moveText');
var cardstocompare = new Array();
var flipboolean = false;
var numberofMatches = 0;

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
    return $.Deferred().resolve();
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
    //console.log("this = "+this.src);
    //console.log("back = "+back);
    //selects images based on ID number

    if(this.textContent != 'flipped'){
        //this.addClass("face");
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
    //var src = this.src == back ? front : back; //for toggling fun
    var src = front;
    //console.log(this.src);
    movesCount++;
    //console.log(compareCount);
    moveText.textContent = "Move: " + movesCount;
    turnCSS(this, src)
    cardstocompare[compareCount] = this;
    cardstocompare[compareCount].src = src;
    this.textContent='flipped';
    compareCount++;
    //setTimeout(doSomething, 3000);
    if (compareCount ===2){
        console.log("comparing")
        //console.log(cardstocompare);
        //console.log('card1 = ' + cardstocompare[0].currentSrc + "\ncard2 = "+ cardstocompare[1].currentSrc);
        if (cardstocompare[0].src === cardstocompare[1].src){
            console.log('cards match');
            compareCount=0;
        }
        else{
            console.log("cards don't match");
            compareCount=0;
            //sleep(3000);
            //setTimeout(doSomething, 3000);
            //while(!flipboolean)
            //{
            //    console.log('waiting');
            //}
            //functionOne().done(functionTwo);
            //setTimeout(doSomething, 3000);
            //$(this)
            //.addClass("face")
            setTimeout(wrongShaking, 1000);
            //functionOne().done(functionTwo);
            //cardstocompare[0].bind("transitionend webkittransitionend", function () { });//should add more prefixes
            setTimeout(turnBack, 3000);
            //turnCSS(cardstocompare[0], back);
            //turnCSS(cardstocompare[1], back);
        }
    }
}else{
    console.log("card already flipped");
}
})
function wrongShaking()
{
    $(cardstocompare[0])
    .addClass("face")
    $(cardstocompare[1])
    .addClass("face")
}
function turnBack() {
    $(cardstocompare[0])
    .removeClass("face")
    $(cardstocompare[1])
    .removeClass("face")
    cardstocompare[0].textContent='notflipped';
    cardstocompare[1].textContent='notflipped';
    turnCSS(cardstocompare[0], back);
    turnCSS(cardstocompare[1], back);
}

 function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
/*
$(".turnCompatible").click(function () {
    var src = this.src == back ? front : back; //for toggling fun
    turnCompatible(this, src)
})

$(".turn").click(function () {
    var src = this.src == back ? front : back; //for toggling fun
    turn(this, src)
})*/