var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$("h1").text("Press any key to Start");

$(document).keydown(function(e){
  if (!started){
      $("#level-title").text("Leve1: " + level);
      nextSequence()
      started = true;
  }
});

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel){

  if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
    if ( userClickedPattern.length === gamePattern.length ) {
      setTimeout(function(){
        nextSequence();
      }, 1000); //delay is in milliseconds
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over: Press any key to Replay");

    startOver();
  }

}

function animatePress(chosenColor){
  $("#" + chosenColor).addClass("pressed");
  setTimeout(function(){
    $("#" + chosenColor).removeClass("pressed");
  },100); //delay is in milliseconds

}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Leve1: " + level);

  randomNumber = Math.floor(Math.random() * 3 ) + 1;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(chosenColor){
    var audio = new Audio("sounds/" + chosenColor + '.mp3');
    audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
