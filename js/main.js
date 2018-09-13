var CARDWIDTH = 50;
var compareCount=0;
var movesCount = 0;
var front = "";
var moveText = document.querySelector('.moveText');
var cardstocompare = new Array();
var flipboolean = false;
var numberofMatches = 0;
var cardClick=true;
var resetbutton = document.getElementById('restart');
var tb = true;


resetbutton.onclick = function(){
    resetBoard();
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    //modal.style.display = "block";
    console.log('playing again');
    modal.style.display = "none";
    resetBoard();

}

function resetBoard(){
    movesCount=0;
    numberofMatches=0;
    var cards = document.querySelectorAll('.card');
    //console.log(cards);
    for(var i=0;i<cards.length;i++){
        turnCSS(cards[i],back,dummpf);
        //console.log(i);
        cards[i].textContent="";
        $(cards[i])
            .removeClass("match")
            .removeClass("nomatch");
    }
    moveText.textContent = "Move: " + movesCount;
    radFunction();
    console.log('reset complete');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openmodal()
{
    var modalText=document.querySelectorAll('.modaltext');
    console.log(modalText);
    modalText[0].textContent = "Congratulations! You Won!";
    modalText[1].textContent = "With "+movesCount + " Moves and 1 Stars";
    modalText[2].textContent = "Woooooooo!";
    modal.style.display = "block";
}

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

function turnCSS(elem, src, callback) {
    $(elem)
        .addClass("flipping")
        .bind("transitionend webkittransitionend", function () { //should add more prefixes
        this.src = src;
        $(this)
            .unbind("transitionend webkittransitionend")
            .removeClass("flipping")
    })
    callback();
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
var back = "file:///C:/Users/qcard/udacity-course/Memory%20Game/img/back3.png"
$(".turnCSS").click(function () {
    console.log("thisID = "+this.id);
    //console.log("back = "+back);
    //selects images based on ID number
    if(this.textContent != 'flipped' && cardClick && tb){
        front = pickCardfront(this.id);
        console.log(front);
    /*switch(this.id){
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
    }*/
    //console.log("this.id= "+this.id);
    //console.log("front= "+ front);
    //var src = this.src == back ? front : back; //for toggling fun
    var src = front;
    //console.log(this.src);
    movesCount++;
    //console.log(compareCount);
    moveText.textContent = "Move: " + movesCount;
    cardstocompare[compareCount] = this;
    cardstocompare[compareCount].src = src;
    this.textContent='flipped';
    compareCount++;
    toggleclick();
    turnCSS(this, src, compareCards);
    //functionOne().done(functionTwo);
    //cardstocompare[compareCount] = this;
    //cardstocompare[compareCount].src = src;
    //this.textContent='flipped';
    //compareCount++;
    //setTimeout(doSomething, 3000);
    /*
    if (compareCount ===2){
        console.log("comparing")
        //console.log(cardstocompare);
        //console.log('card1 = ' + cardstocompare[0].currentSrc + "\ncard2 = "+ cardstocompare[1].currentSrc);
        if (cardstocompare[0].src === cardstocompare[1].src){
            console.log('cards match');
            compareCount=0;
            numberofMatches++;
            setTimeout(rightanimation, 1000);
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
    }*/
}else{
    console.log("card already flipped "+cardClick+" "+tb);
}

if(numberofMatches===8){
    setTimeout(openmodal,2000);
}
})

function toggleclick(){
    //cardClick == true ? false : true //for toggling fun
    cardClick = !cardClick;
    console.log(cardClick);
    //return click;
}

function compareCards(){
    if (compareCount ===2){
        console.log("comparing")
        //console.log(cardstocompare);
        //console.log('card1 = ' + cardstocompare[0].currentSrc + "\ncard2 = "+ cardstocompare[1].currentSrc);
        if (cardstocompare[0].src === cardstocompare[1].src){
            console.log('cards match');
            compareCount=0;
            numberofMatches++;
            setTimeout(rightanimation, 1000);
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
            setTimeout(wrongShaking, 1100);
            //setTimeout(rightanimation, 2000);
            //functionOne().done(functionTwo);
            //cardstocompare[0].bind("transitionend webkittransitionend", function () { });//should add more prefixes
            tb=false;
            setTimeout(turnBack, 2000);
            //turnCSS(cardstocompare[0], back);
            //turnCSS(cardstocompare[1], back);
        }
    }
    setTimeout(toggleclick, 500);
}
function rightanimation(){
    console.log("right animiation");
    $(cardstocompare[0])
        .addClass("match")
    $(cardstocompare[1])
        .addClass("match")

}
function wrongShaking()
{
    console.log("shaking");
    $(cardstocompare[0])
    .addClass("nomatch")
    $(cardstocompare[1])
    .addClass("nomatch")
    //turnBack();
}
function turnBack() {
    console.log("turning to back");
    $(cardstocompare[0])
        .removeClass("nomatch")
    $(cardstocompare[1])
        .removeClass("nomatch")
    cardstocompare[0].textContent='';
    cardstocompare[1].textContent='';
    turnCSS(cardstocompare[0], back,dummpf);
    turnCSS(cardstocompare[1], back,dummpf);
    tb=true;
}

function dummpf(){
    //console.log("done");
}

function pickCardfront(id){
    switch(id){
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

    return front;
}

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function radFunction(){
    //console.log('running');
    var cards = document.querySelectorAll(".card");
    var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    Shuffle(testArray);

        // jQuery to dump out new values to element with ID of 'dump'
        //$(function() {
        for(var i=0;i<testArray.length;i++) {
            cards[i].id=testArray[i];
            console.log(testArray[i]);
        }
        //});
}
/*
 function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

$(".turnCompatible").click(function () {
    var src = this.src == back ? front : back; //for toggling fun
    turnCompatible(this, src)
})

$(".turn").click(function () {
    var src = this.src == back ? front : back; //for toggling fun
    turn(this, src)
})*/