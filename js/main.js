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
var modalbutton = document.getElementById('Modal_button');
var tb = true;
var starTimer = 0;
var EndTimer = 0;
var gameOver = false;
var timer=0;
var timerHTML = document.getElementsByClassName("timer")[0];




resetbutton.onclick = function(){
    //Reset the board and stays that the current level.
    gameOver = true;
    resetBoard();
}

modalbutton.onclick = function(){
    //it pauses the timer when you make a choice.
    gameOver = true;
}
// Get Stars
var stars = document.querySelectorAll('.fa-star');
var cardrow = document.getElementsByClassName("cardrow");
// Get the modal
var modal = document.getElementById('myModal');
var modallevel = document.getElementById('mylevelModal');
var level;
var matchtowin;

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    //modal.style.display = "block";
    console.log('playing again');
    modal.style.display = "none";
    //resetBoard();
}

window.addEventListener("load", function(){
    //This automatically open the modal when the applications starts so that you can pick a level.
    openstartmodal();
});
document.addEventListener("DOMContentLoaded", function(){
    

});

function resetBoard(){
    //This funcition will reset all the counters and timers back to Zero flip all of the cards overs. 
    console.log(level);
    //gameOver = false;
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
    radFunction(level);
    console.log('reset complete');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    //resetBoard();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        //modal.style.display = "none";
        //resetBoard();

    }
    
}


$(window).resize(function() {
    //document.getElementById('gameName').innerText = $(this).height() + "x" + $(this).width();
    //console.log($(this).height() + "x" + $(this).width());
  });

function openmodal()
{
    //This will open the you won modal.
    var modalText=document.querySelectorAll('.modaltext');
    modalText[0].textContent = "Congratulations! You Won!";
    modalText[1].textContent = "With "+movesCount + " Moves and "+ numberofStars +" Stars";
    modalText[2].textContent = "You completed the Game in : "+timer + " Seconds";
    modalText[3].textContent = "Woooooooo!";
    modal.style.display = "block";
}

function openstartmodal()
{
    //open the model at the beginning so you can pick your level.
    $('#mylevelModal').modal({backdrop: 'static', keyboard: false})  
    $("#mylevelModal").modal('show');
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
    //Check to make sure game over isn't false and if not then it will update the timers.
    //console.log(gameOver);
    if(!gameOver){
    timer++;
    timerHTML.textContent=timer;
    //console.log(timer);
    
        setTimeout(updateTimer,1000);
    }

}
function turnCSS(elem, src, callback) {
    //This is an card animation for flipping the cards. 
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
    if(gameOver){
        console.log("start Timer");
        gameOver = false;
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

    if(numberofMatches===matchtowin){
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
    var testArray1 = [1,2,3,4,5,6,7,8];
    var testArray2 = [1,2,3,4,5,6,7,8,9,10,11,12];
    var testArray3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    //var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    var testArray;

    console.log(level);

    if (level === "LEVEL1"){
        console.log("LEVEL 1")
        testArray = testArray1;
    }else if( level === "LEVEL2"){
        console.log("LEVEL 2")
        testArray = testArray2;
    }else {
        console.log("Level 3")
        testArray = testArray3;
    }
    Shuffle(testArray);
        // jQuery to dump out new values to element with ID of 'dump'
        //$(function() {
        for(var i=0;i<testArray.length;i++) {
            cards[i].id=testArray[i];
            //console.log(testArray[i]);
        }
}



//$(document).ready(function(){
    //$('[data-toggle="popover"]').popover();
   
    //$(function () {
    ///$('.example-popover').popover({
    //container: 'body'
    ///})
    //})
   
    //$(function() {
    //function ready(){
    function reposition() {
    var modal = $(this),dialog = modal.find('.modal-dialog');
    var modal2 = document.getElementById('myModal');
    //console.log(modal);
    //console.log(dialog);
    //console.log(modal2);
    modal.css('display', 'block');
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    
    $('.modal').on('show.bs.modal', reposition);
   
    $(window).on('resize', function() {
    $('.modal:visible').each(reposition);
    });
    //});
   // });
//}


function chooselevel(){
    var temp = document.getElementsByName("textEditor");
    //var level;

    gameOver = true;
    console.log(gameOver);
    //console.log(temp);
    for(var i=0; i < temp.length;i++){
        if(temp[i].checked){
            console.log(temp[i].id);
            level = temp[i].id;
        };
    }

    for(var i=0;i<cardrow.length;i++){
        cardrow[i].style.visibility = 'hidden';
    }
    //console.log(level);
    if(level === "LEVEL1"){
        modalbutton.innerText = "Level 1"
        console.log("Leve 1 - 2 rows");
        matchtowin = 4
        for(var i=0;i<2;i++){
            cardrow[i].style.visibility = 'visible'
        }

    }else if(level === "LEVEL2"){
        modalbutton.innerText = "Level 2"
        console.log("Leve 2 - 3 rows");
        matchtowin = 6
        for(var i=0;i<3;i++){
            cardrow[i].style.visibility = 'visible'
        }
    }else{
        modalbutton.innerText = "Level 3"
        console.log("Leve 3 -4 rows");
        matchtowin = 8
        for(var i=0;i<4;i++){
            cardrow[i].style.visibility = 'visible'
        }

    }

    resetBoard();
        
}