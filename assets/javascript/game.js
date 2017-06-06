//variables

var wordList = ["Insane Clown Posse", "In you Face",
 "Piggy Pie", "Night of the Chainsaw", "Hokus Poskus",
  "Halls of Illusion","Juggalo Island",
   "Chicken Huntin", "Fonz Pond"];
var winAmount = 0;
var loseAmount = 0;
var guessRemaining =6;
var letterChosen =[];
var wordPick = "";
var won = false;
var lose = false;

// functions

// wordPick is a function that stores the word list and its random.
function pickAWord() {
	wordPick = wordList[Math.floor(Math.random() * wordList.length)];
}

// print the game progress

function printGame() {
	printWins();
	printLosses();
	printGuessRemaining();
	printGameboard();
	printGameStatus();
}

function printWins() {
	//document.getElementById("wins").innerHTML = "Wins: " + winAmount;
	$("#wins").html("Wins: " + winAmount);


}

function printLosses() {
//document.getElementById("losses").innerHTML = "Losses: " + loseAmount;
	$("#losses").html("Losses: " + loseAmount);

}

function printGuessRemaining() {
//document.getElementById("lguessRemaining").innerHTML = "guessRemaining: " + guessRemaining;
	$("#guessRemaining").html("guessRemaining: " + guessRemaining);

}

function printGameStatus() {
	if (won) {
		$("#gameStatus").html("you won!!!");
	}
	else if (lose) {
		$("#gameStatus").html("you lose press any key to start a new game!!!");
	}
	else {
		$("#gameStatus").html("Choose a letter!!!");
	}
}

function printGameboard() {
	var wordName= "";
	for (var i = 0; i < wordPick.length; i++){
		if (wordPick[i]== " "){
			wordName += " ";
		}
		else if (letterChosen.indexOf(wordPick[i].toLowerCase()) != -1) {
			wordName += wordPick[i];
		}
		else {
			wordName += "_";
		}
	}
	$("#gameBoard").html(wordName);
}

function checkIfLetterInWord(key) {
	if (wordPick.indexOf(key) == -1 && wordPick.indexOf(key.toUpperCase()) == -1) {
		guessRemaining--;
	}
}

function checkIfWonGame() {
	for (var i =0; i < wordPick.length; i++) {
		if (wordPick[i]== " ") {
			continue;
		}
		if (letterChosen.indexOf(wordPick[i].toLowerCase()) == -1) {
			return;
		}
	}
	winAmount++;
	won=true;
}

function checkIfLostGame() {
	if (guessRemaining ==0) {
		lose = true;
		loseAmount++;
	}
}

function resetGame() {
	guessRemaining =6;
	letterChosen =[];
	pickAWord();
	won = false;
	lose = false;
}

//Events

// picking a word
$( document ).ready(function() {
    pickAWord();
    printGame();
});

// take user input
$(window).keypress(function(event){
	//console.log(event.key);

	if (won || lose)
	{
		resetGame();
		printGame();
		return;
	}

	var key = event.key.toLowerCase();
	if (key.length == 1 && key.match(/[a-z]/i)) {
		if (letterChosen.indexOf(key) == -1) {
			letterChosen.push(key);	
			checkIfLetterInWord(key);
			checkIfWonGame();
			checkIfLostGame();
		}
	}

	printGame();
});




