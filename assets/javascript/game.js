//variables

var wordList = ["Insane Clown Posse", "In you Face",
 "Piggy Pie", "Night of the Chainsaw", "Hokus Pokus",
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
	printLettersGuessed();
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
	$("#guessRemaining").html("Guesses Remaining: " + guessRemaining);

}

function printGameStatus() {
	if (won) {
		$("#gameStatus").html("You won!!! Press any key to start a new game!!!");
	}
	else if (lose) {
		$("#gameStatus").html("You lose!!! Press any key to start a new game!!!");
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

		wordName += " ";
	}
	$("#gameBoard").html(wordName);
}

function printLettersGuessed() {
	var lettersString = "Letters Guessed: "+ letterChosen.join(" ");


	$("#lettersGuessed").html(lettersString);
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
	$("#gameBoard").css("color", "red");
}

function checkIfLostGame() {
	if (guessRemaining ==0) {
		lose = true;
		loseAmount++;
		$("#gameBoard").css("color", "blue");
	}
}

function resetGame() {
	guessRemaining =6;
	letterChosen =[];
	pickAWord();
	won = false;
	lose = false;
	$("#gameBoard").css("color", "white");
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




