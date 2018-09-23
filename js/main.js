//var CARDWIDTH = 50;
var compareCount=0;
var movesCount = 0;
var numberofStars=3;
var front = "";
var moveText = document.querySelector('.moveText');
var cardstocompare = new Array();
var flipboolean = false;
var numberofMatches = 0;
var cardClick=true;
var resetbutton = document.getElementById('restart');
var tb = true;
var starTimer = 0;
var EndTimer = 0;
var gameOver = false;
var timer=0;
var timerHTML = document.getElementsByClassName("timer")[0];




resetbutton.onclick = function(){
    resetBoard();
}
// Get Stars
var stars = document.querySelectorAll('.fa-star');

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
    gameOver = false;
    timer=0;
    timerHTML.textContent=timer;
    movesCount=0;
    numberofMatches=0;
    compareCount = 0;
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
    stars[2].className = "fa fa-star";
    stars[1].className = "fa fa-star";
    moveText.textContent = "Move: " + movesCount;
    numberofStars=3;
    radFunction();
    //console.log('reset complete');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    resetBoard();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetBoard();

    }
}

function openmodal()
{
    //starTimer = new Date();
    //var date1 = new Date(2000, 0, 1,  9, 01); // 9:00 AM
    //var date2 = new Date(2000, 0, 1, 17, 0); // 5:00 PM
    var modalText=document.querySelectorAll('.modaltext');
    //console.log(modalText);
    //EndTimer = new Date();
    //var h = EndTimer.getHours() - starTimer.getHours();
    //var m = EndTimer.getMinutes()-starTimer.getMinutes();
    //var s = EndTimer.getSeconds()-starTimer.getSeconds();
    //h2 = EndTimer - starTimer;
    //var msec = h2;
    //var hh = Math.floor(msec / 1000 / 60 / 60);
    //msec -= hh * 1000 * 60 * 60;
    //var mm = Math.floor(msec / 1000 / 60);
    //msec -= mm * 1000 * 60;
    //var ss = Math.floor(msec / 1000);
    //msec -= ss * 1000;
    // diff = 28800000 => hh = 8, mm = 0, ss = 0, msec = 0
    modalText[0].textContent = "Congratulations! You Won!";
    modalText[1].textContent = "With "+movesCount + " Moves and "+ numberofStars +" Stars";
    //modalText[2].textContent = "You completed the Game in : "+ hh + " Hours " + mm + " Minutes " + timer + " Seconds";
    modalText[2].textContent = "You completed the Game in : "+timer + " Seconds";
    modalText[3].textContent = "Woooooooo!";
    modal.style.display = "block";
    //console.log(hh+":"+mm+":"+ss);
}
/*
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
*/

function updateTimer(){
    timer++;
    timerHTML.textContent=timer;
    //console.log(timer);
    if(!gameOver){
        setTimeout(updateTimer,1000);
    }

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
/*
function turn(elem, src) {
    if (
    elem.style.transition === "undefined" && //should add more prefixes
    elem.style.webkitTransition === "undefined") {
        turnCompatible(elem, src)
    } else {
        turnCSS(elem, src)
    }
}
*/
var back = "img/back3.png"
$(".turnCSS").click(function () {
    if(timer ===0){
        console.log("start Timer");
        updateTimer();
    }
    //openmodal();

    if(this.textContent != 'flipped' && cardClick && tb){
        front = pickCardfront(this.id);
        //console.log(front);
        var src = front;
        movesCount++;
        moveText.textContent = "Move: " + movesCount;
        cardstocompare[compareCount] = this;
        cardstocompare[compareCount].src = src;
        this.textContent='flipped';
        compareCount++;
        if(movesCount===32 || movesCount===40){
            numberofStars--;
            stars[numberofStars].className = "fa fa-star-o";
        }
        toggleclick();
        turnCSS(this, front, compareCards);
    }else{
        //console.log("card already flipped "+cardClick+" "+tb);
    }

    if(numberofMatches===8){
        //EndTimer = new Date();
        //console.log(EndTimer);
        gameOver = true;
        setTimeout(openmodal,2000);
    }
})

function toggleclick(){
    cardClick = !cardClick;
}

function compareCards(){
    if (compareCount ===2){
        if (cardstocompare[0].src === cardstocompare[1].src){
            compareCount=0;
            numberofMatches++;
            setTimeout(matchanimation, 1000);
        }
        else{
            compareCount=0;
            setTimeout(nomatchanimation, 1100);
            tb=false;
            setTimeout(turnBack, 2000);
        }
    }
    setTimeout(toggleclick, 500);
}

function matchanimation(){
    $(cardstocompare[0])
        .addClass("match")
    $(cardstocompare[1])
        .addClass("match")

}

function nomatchanimation()
{
    $(cardstocompare[0])
    .addClass("nomatch")
    $(cardstocompare[1])
    .addClass("nomatch")
}

function turnBack() {
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
        front = "img/1.png";
        break;
        case '3':
        case '4':
        front = "img/2.png";
        break;
        case '5':
        case '6':
        front = "img/3.png";
        break;
        case '7':
        case '8':
        front = "img/4.png";
        break;
        case '9':
        case '10':
        front = "img/5.png";
        break;
        case '11':
        case '12':
        front = "img/6.png";
        break;
        case '13':
        case '14':
        front = "img/7.png";
        break;
        case '15':
        case '16':
        front = "img/8.png";
        break;
    }

    return front;
}

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function radFunction(){
    var cards = document.querySelectorAll(".card");
    var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    Shuffle(testArray);
        // jQuery to dump out new values to element with ID of 'dump'
        //$(function() {
        for(var i=0;i<testArray.length;i++) {
            cards[i].id=testArray[i];
            //console.log(testArray[i]);
        }
}