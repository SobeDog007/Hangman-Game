/* 	Steven Sober
   	07/07/2017
   	Homework-03b
   	game.js */

// This file contains the Javascript for the Hangman game.

var game = {

    dictionary:    ["clemson", "tigers", "football", "champions", "orange", "purple"],
    displayArray:  [],
    guessArray:    [],
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

        		// If no more dashes are in the array then the game is won!
        		if (!game.displayArray.includes("_"))
        		{
        			game.gamesWon++; 

        			game.resetGame();
        		}
        	}
        }

        if (guessFound === false)
        {
        	// If the user has already guessed this letter, do not penalize again.
        	if (!this.guessArray.includes(userGuess))
        	{
        		this.numberGuesses--;
        		this.guessArray.push(userGuess);

        		// Check to see if there are any guesses left.
        		if (this.numberGuesses === 0)
        		{
        			// Game Over!
        			game.resetGame();
        		}
        	}
        }
    },

    resetGame: function()
    {
		game.displayArray  = [];
    	game.guessArray    = [];
    	game.numberGuesses = 12;
    }
};

// VARIABLES
// ==========================================================================
var puzzle = "";

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

	var html =
        "<p>Wins: " + game.gamesWon + "</p>" +
        "<p>Current Word: " + game.displayArray + "</p>" +
        "<p>Guesses Remaining: " + game.numberGuesses + "</p>" +
        "<p>Letters Guessed: " + game.guessArray + "</p>";

        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = html;
};
