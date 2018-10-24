const inquirer = require("inquirer");
const c = require('ansi-colors');
const Word = require("./Word");
const wordsToPick = require("./wordsToPick");
const Pizza = require("./pizza");
const figlet = require("figlet");
const boxen = require('boxen');

// The Game constructor is used to house all of overall game logic
function Game() {

    // `self` gives access to the current Word { letters: [ Letter Object, Letter Object,...]}
    const self = this;
    
    // When the game starts, reset number of guesses remaining to 10, empty an array of letters already guessed, and random a new word
    this.playGame = function () {
        this.guessesRemaining = 10;
        this.lettersAlreadyGuessed = [];
        this.newWord();
    };

    
    this.newWord = function () {

        // Greeting message tells the user to guess a word in `Pizza toppings` category
        var pizza = new Pizza();
        console.log(`${pizza.emoji} ${pizza.emoji} ${pizza.emoji} Deliciously Popular Pizza Toppings ${pizza.emoji} ${pizza.emoji} ${pizza.emoji}`);
        console.log(c.yellow("You have " + self.guessesRemaining + " guesses remaining to play! \n"));
        // Random a word from wordsToPick.js
        var randomWord = wordsToPick[Math.floor(Math.random() * wordsToPick.length)];
        // Creates a new Word object using a random word from the array
        this.currentWord = new Word(randomWord);
        
        // Prompts the user for their guess
        this.makeGuess();
    };

    // Starts with an empty array of Letters Already Guessed
    // This property will be reset for every word played
    this.lettersAlreadyGuessed = [];

    // Uses inquirer to prompt the user for their guess
    this.makeGuess = function () {
        console.log("\n" + this.currentWord + "\n");
        this.guessALetter().then(function () {
            // If the user has no guesses remaining after this guess, , 
            if (self.guessesRemaining < 1) {
                // Show the user the correct word
                console.log(
                    c.yellow("No guesses left! The word was: \"" + self.currentWord.getSolution() + "\"\n")
                );
                // Ask if they want to start over
                self.askToStartOver();

                
            }
            else if (self.currentWord.guessedCorrectly()) {
                // If the user guessed all letters of the current word correctly, reset guessesLeft to 10 and get the next word
                console.log(c.green(" You got it right. The answer is " + self.currentWord.getSolution() + "! \n Next word! \n\n"));
                // Update guess remaining for the current user to 10
                self.guessesRemaining = 10;
                // Empty Letters Already Guessed
                self.lettersAlreadyGuessed = [];
                // Create a new Word object
                self.newWord();

                
            }
            else {
                // Otherwise prompt the user to guess the next letter
                self.makeGuess();
            }
        });
    };


    // After no guesses remaining, ask the user if they would like to play again.
    this.askToStartOver = function () {
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "startOver",
                    message: "Start Over?"
                }
            ])
            .then(function (userWantsTo) {
                // If the user says yes, start the new game, otherwise quit the game
                if (userWantsTo.startOver) {
                    // Runs playGame from the start once more if they do
                    self.playGame();
                }
                else {
                    // End the program if they don't
                    self.endGame();
                }
            });
    };

    // Game.guessALetter prompts the user for a letter
    this.guessALetter = function () {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "userGuess",
                    message: "Guess a letter!",
                    // Regular expression that input must be valid against.
                    // In this case, userInput must be a letter
                    pattern: /[a-zA-Z]/gi
                }
            ])
            .then(function (userInput) {
                
                // Add the user's guess in the letters already guessed
                var userGuess = userInput.userGuess.toUpperCase()
                console.log("You have guessed " + c.bgCyan(" " + userGuess + " "));

                self.lettersAlreadyGuessed.push(userGuess);
                console.log("Letters Already Guessed " + c.cyan(" " + self.lettersAlreadyGuessed + " "));


                // If the letter the user are trying to guess is in the current word, log that they are CORRECT
                var isCorrect = self.currentWord.beenGuessedLetter(userGuess);
                if (isCorrect) {
                    console.log(boxen(c.bold.green("\nCORRECT!!!\n"), {padding: 1, margin: 1, borderStyle: 'round'}));
                }
                else {
                    // Otherwiss, reduce guesses remaining by 1
                    self.guessesRemaining--;
                    //  tell user they are INCORRECT (letter is not in the word) and display how many guesses left
                    console.log(boxen(c.bold.red("\nINCORRECT!!!\n" + c.inverse.yellow(" " + self.guessesRemaining + " guesses remaining!!! \n")), {padding: 1, margin: 1, borderStyle: 'round'}));
                }
            });
    };

    // Logs thanks and exits the node app
    this.endGame = function () {
        const pizza = new Pizza();

        figlet("Goodbye", function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
            console.log(c.yellow("\nThanks for playing! " + pizza.emoji));
            
        });
        
        // The process.exit function exits from the current Node.js process.
        // It takes an exit code, which is an integer.
        // Node.js interprets non-zero codes as failure, and an exit code of 0 as success.
        process.exit(0);
    };


} // End the Game constructor

//Export the Game constructor so that we can use/reference it in index.js
module.exports = Game;