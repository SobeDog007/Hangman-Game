/* 	Steven Sober
   	07/07/2017
   	Homework-03b
   	game.js */

// This file contains the Javascript for the Hangman game.

var game = {

    dictionary:    ["clemson", "tigers", "football", "champions", "orange", "purple"],
    displayArray:  [],
    guessArray:    [],
    winCheck:      "",
    numberGuesses: 12,
    gamesWon:      0,

    // Selects and returns a new puzzle word from the dictionary.
    selectNewWord: function()
    {
        return this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    },

    // Builds the display array based on the puzzle word choice.
    arrayBuilder: function(puzzle)
    {
        for (var i = 0; i < puzzle.length; i++)
        {
            this.displayArray.push("_");
        }
    },

    // Checks if the guessed letter is in the puzzle word.  If the guess is
    // correct, update the displayArray.  Otherwise, reduce the number of
    // remaining guesses and add the guessed letter to the guessArray.
    guessChecker: function(userGuess, puzzle)
    {
    	var guessFound = false;

        for (var i = 0; i < puzzle.length; i++)
        {
        	if (userGuess.toLowerCase() === puzzle.charAt(i).toLowerCase())
        	{
        		game.displayArray[i] = puzzle.charAt(i);
        		guessFound = true;

        		if (!game.displayArray.includes("_"))
        		{
        			game.gamesWon++; 
        		}
        	}
        }

        if (guessFound === false)
        {
        	this.numberGuesses--;
        	this.guessArray.push(userGuess);

        	// Check to see if there are any guesses left.
        	if (this.numberGuesses === 0)
        	{

        		// Game Over!
        	}
        }


        
    },

    redrawScreen()
    {



    }
};

// VARIABLES
// ==========================================================================
var puzzle = "";
var gameWon = false;

// MAIN EXECUTION
// ==========================================================================

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;

	// If the displayArray is empty, choose a word and build the array.
	if (game.displayArray.length === 0)
	{
		puzzle = game.selectNewWord();
		console.log("Puzzle: " + puzzle);

		game.arrayBuilder(puzzle);
		console.log("Dashes: " + game.displayArray);
	}

    //Check the guessed letter against the puzzle word.
    game.guessChecker(userGuess, puzzle);

    //redrawScreen();

    //document.getElementById("wins").innerHTML = "Wins:   " + wins;
    //document.getElementById("currentWord").innerHTML = "Current Word:   " + displayArray;
    //document.getElementById("guessesRemaining").innerHTML = "Number of Guesses Remaining:  " + guesses;
    //document.getElementById("guessArray").innerHTML = "Letters Already Guessed:  " + guessArray;

	var html =
        "<p>Wins: " + game.gamesWon + "</p>" +
        "<p>Current Word: " + game.displayArray + "</p>" +
        "<p>Guesses Remaining: " + game.numberGuesses + "</p>" +
        "<p>Letters Guessed: " + game.guessArray + "</p>";

        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = html;

    };
