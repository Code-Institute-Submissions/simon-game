var computerMovements = [];
var answers = [];
var rounds = 0;
var strict = true;
var lastChance = false;
//variables

var addColor = function(arr) {
  var colorsArray = ["red", "green", "yellow", "blue"];
  return arr.push(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
}; //add colour buttons for sequence

var flashLights = function(arr) {
  console.log("flashLights");
  var i = 0;
  var interval = setInterval(function() {
    $("#" + arr[i]).fadeTo("slow", 0).fadeTo("slow", 1);
    console.log("fading");
    //$("#sound-" + arr[i])[0].play();
    i++;
    if (i >= arr.length) {
      clearInterval(interval);
    }
  }, 1500);
}; // button flashes

var resetAnswers = function() {
  answers = [];
}; //reset answers

var updateRounds = function() {
  rounds++;
  $("#show-rounds").html(rounds);
}; //update rounds

var resetGame = function() {
  console.log("resetGame");
  rounds = 0;
  computerMovements = [];
  if (strict === false) {
    lastChance = true;
  }
  resetAnswers();
  $("#show-rounds").html(rounds);
}; //reset game

var playerTurn = function() {
  $("#mode").click(function() {
    return false;
  });

  if (rounds === 20) {
    alert("Congrats, You Win!");
    resetGame();
  } //won the game

  updateRounds();
  addColor(computerMovements);
  console.log("computerMovements", computerMovements);
  flashLights(computerMovements);

  $(".button").off("click").on("click", function() {
    //$("#sound-" + $(this).attr("id"))[0].play();
    answers.push($(this).attr("id"));
    console.log("answers", answers);

    for (var i = 0; i < answers.length; i++) {

      if (JSON.stringify(computerMovements) === JSON.stringify(answers)) {
        resetAnswers();
        playerTurn();
        break; //next level

      }

      if (answers[i] !== computerMovements[i]) {
        if (strict === false && lastChance === true) {
          lastChance = false;
          alert("You have 1 more try!");
          resetAnswers()
          flashLights(computerMovements);
        } //last chance

        else if (
          answers[i] !== computerMovements[i] && lastChance === false) {
          alert("Whoops, You have lost the game!");
          resetGame();
          break; //lost the game
        }
      }
    }
  });
};

$("#mode").click(function() {
  switch (strict) {
    case true:
      strict = false;
      lastChance = true;
      $("#mode").html("Mode: Medium");
      break;

    case false:
      strict = true;
      lastChance = false;
      $("#mode").html("Mode: Strict");
      break;
  } //switch modes - strict or relaxed
});

$("#start").click(function() {
  playerTurn();
}); //start button

$("#reset").click(function() {
  console.log("reset clicked");
  resetGame();
}); //reset button

console.log("loaded");
