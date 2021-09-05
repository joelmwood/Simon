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
  //when the user makes a guess, the color is added to the userClickedPattern
  //array
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //once the user has made a choice, the checkAnswer method is called
  //to check against what is expected in the sequence
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  //Checks if the user answer matches the color at each specific sequense
    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
      //if the user correctly guessed all the colors in the sequence, the
      //nextSequence method is called to add another color to the sequence
      //and require tbe user input all the colors in the correct order again
      if ( userClickedPattern.length === gamePattern.length ) {
      setTimeout(function(){
        nextSequence();
      }, 1000); //delay is in milliseconds
    }
  } else {
    //if the user makes an incorrect choice, the game ends
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
  //empties the userClickedPattern array so the player has to guess
  //all the colors in the sequence again
  userClickedPattern = [];
  //increments the level when the user correctly guesses the next color in
  //the sequence
  level++;
  $("#level-title").text("Leve1: " + level);

  //adds the next random color in the sequence for the user to remember
  //and adds it to the gamePattern array
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
  //in the event of an incorrect choice, the game ends, resets the level to 0,
  //empties the gamePattern array so a new sequence can be made for the next
  //game, and sets the started boolean to false
  level = 0;
  gamePattern = [];
  started = false;
}
