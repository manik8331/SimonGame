var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Keeping track on levels

var started = false;
var level = 0;

// Keypress function

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
    $("#level-title").text("Level " + level);
  }
});

// Deals with the butoon we press and so on..

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

// Check Answer

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function() {
        nextSequence()}, 1000);
    }
  }
  else {
    console.log("wrong");

// If the user enters wrong sequence

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");  }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Randomly chooses a color an so on....

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // changing h1 with level

    ++level;
    $("#level-title").text("Level " + level);
}

// Play sound function used to play sound

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Gives annimation to the button that gets pressed

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// STARTOVER THE GAME

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
