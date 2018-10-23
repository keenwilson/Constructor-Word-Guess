// The Game constructor depends on the Inquirer package, the ansi-colors package for text decoration, the Word constructor, and the list form Words
const inquirer = require("inquirer");
const c = require('ansi-colors');
const Word = require("./Word");
const words = require("./words");

// The Game constructor is used to track score and control the flow of the overall game.
function Game() {

    // `self` gives access to the current Word { letters: [ Letter Object, Letter Object,...]}
    var self = this;
    
    // Sets the guesses to 10 and gets the next round
    this.play = function () {
        this.guessesRemaining = 10;
        this.newWord();
    };

    
    this.newWord = function () {
        // Random a word from words.js
        var randomWord = words[Math.floor(Math.random() * words.length)];
        // Creates a new Word object using a random word from the array
        this.currentWord = new Word(randomWord);
        
        // Prompts the user for their guess
        this.makeGuess();
    };

    // Uses inquirer to prompt the user for their guess
    this.makeGuess = function () {
        console.log("\n" + this.currentWord + "\n");
        this.askForLetter().then(function () {
            // If the user has no guesses remaining after this guess, , 
            if (self.guessesRemaining < 1) {
                // Show the user the correct word
                console.log(
                    c.red("No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n")
                );
                // Ask if they want to start over
                self.askToStartOver();

                // If the user guessed all letters of the current word correctly, reset guessesLeft to 10 and get the next word
            }
            else if (self.currentWord.guessedCorrectly()) {
                console.log(c.green("You got it right! Next word!"));
                // Update guess remaining for the current user to 10
                self.guessesRemaining = 10;
                // Create a new Word object
                self.newWord();

                
            }
            else {
                // Otherwise prompt the user to guess the next letter
                self.makeGuess();
            }
        });
    };


    // Asks the user if they want to play again after running out of guessesLeft
    this.askToStartOver = function () {
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "choice",
                    message: "Start Over?"
                }
            ])
            .then(function (val) {
                // If the user says yes, start the new game, otherwise quit the game
                if (val.choice) {
                    self.play();
                }
                else {
                    self.quit();
                }
            });
    };

    // Prompts the user for a letter
    this.askForLetter = function () {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "choice",
                    message: "Guess a letter!",
                    validate: function (userInput) {
                        // userInput must be a letter
                        return /[a-zA-Z]/gi.test(userInput);
                    }
                }
            ])
            .then(function (val) {
                // If the user's guess is in the current word, log that they chose correctly
                console.log("You have guessed " + c.bgCyan(" " + val.choice + " "));
                var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
                if (didGuessCorrectly) {
                    console.log(c.bold.bgGreen("\nCORRECT!!!\n"));

                    // Otherwise decrement `guessesLeft`, and let the user know how many guesses they have left
                }
                else {
                    
                    self.guessesRemaining--;
                    console.log(c.bold.bgRed("\nINCORRECT!!!\n"));
                    console.log(c.inverse(self.guessesRemaining + " guesses remaining!!!\n"));
                }
            });
    };

    // Logs goodbye and exits the node app
    this.quit = function () {
        console.log(c.blue("\nGoodbye!"));
        // The process.exit function exits from the current Node.js process.
        // It takes an exit code, which is an integer.
        // Node.js interprets non-zero codes as failure, and an exit code of 0 as success.
        process.exit(0);
    };




} // End the Game constructor

module.exports = Game;