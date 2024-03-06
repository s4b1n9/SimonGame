/*Das SimonGame. Ein "Zufallsgenerator" wählt eine Farbe die man drücken soll. Im nächsten Step muss man dann zusätzlich eine andere zufällig gewählte Farbe drücken - das geht so lange bis man nicht mehr in der Lage ist die korrekte Reihenfolge der Farben zu drücken.
Funktioniert auch auf mobilen Geräten.*/

//Array für die Farbe/class der Buttons
var buttonColors = ["red", "blue", "green", "yellow"];
//Array für das zufällig erzeugte Spielmuster und eins für das vom User geklickte Muster - zu Beginn sind sie natürlich noch leer.
var gamePattern = [];
var userClickedPattern = [];
//Variable zum Spielstart und eine für das Level
var started = false;
var level = 0;
// Prüfen ob das Spiel gestartet wurde und Erhöhung der Anzeige des Levels

//Wenn der User einen Button klickt wird die Funktion checkAnswer aktiv, die ein paar Zeilen weiter unten erstellt wurde.
$('.btn').on('click',function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})
/*Die Funktion gleicht das Gamepattern mit dem ab das der User geklickt hat. Passt es erhöht sich das Level, wenn nicht kommt GameOver mit dem sound wrong und alles fängt von vorne an.*/
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
/*Hat der User richtig geklickt wird das Game um ein neues Pattern erweitert. Natürlich soll immer passend zur Farbe auch der sound abgespielt werden und der Button soll kurz "flashen" damit der User sieht welcher Button als nächstes geklickt werden muss.*/
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
//Das ist die Funktion für die "Animation" die das Aussehen des Buttons verändert wenn er gedrückt wurde.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//Diese Funktion holt zu dem jeweiligen Button den passenden sound und spielt ihn ab.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//Wenn der User falsch geklickt hat soll das Spiel von vorne Beginnen, also wird alles auf Anfgang zurück gesetzt.
function startOver() {
  level = 0;
  gamePattern = [];
  started == false;
}
$(document).ready(function() {
  $(document).keydown(function() {
      if (started == false){
          level = 0;
          $('#level-title').text('Level ' + level);
          nextSequence();
      }
      started = true;
  })

  $(document).on('touchstart', function() {
      if (started == false){
          level = 0;
          $('#level-title').text('Level ' + level);
          nextSequence();
      }
      started = true;
  })
})