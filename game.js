// Create a command-line based word guess game using the inquirer package.
// =========================================================================================================

// In this game, you will be given a certain amount of guesses. 
// (Perhaps: 10 or 20 depending on the level of difficulty)

// For each new random word, you will be asked to guess an underlying character (A to Z).
// If you guess matches the underlying characters of the word -- the game prints "Correct" and displays that character at its position(s) in the word.
// If your guess does not match the underlying characters of the word -- the game prints "Incorrect" and reduces the amount of guesses remaining by 1.

/*
// For each new word, the game will reset your guesses remaining to 10.
*/

// The game ends when you get to 0 guesses remaining or have no guesses left.
// ===========================================================================================================
// Loads the inquirer package to take in user commands
const inquirer = require("inquirer");
// includes our Word module exported from word.js
const Word = require("./Word");
// Includes our wordsToPick for a lits of words
const wordsToPick = require("./wordsToPick");
// Includes ansi-colors, pizza, figlet, and boxen for decorating the command line
const c = require('ansi-colors');
const Pizza = require("./pizza");
const figlet = require("figlet");
const boxen = require('boxen');

// The Game constructor is used to create game object and house the game logic
function Game() {

    // this.game will hold all of our game
    this.game = this;
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
        console.log(boxen((`${pizza.emoji} ${pizza.emoji} ${pizza.emoji} Deliciously Popular Pizza Toppings ${pizza.emoji} ${pizza.emoji} ${pizza.emoji}`), { padding: 1, margin: 1, borderStyle: 'round' }));
        console.log(c.yellow("\nYou have " + self.guessesRemaining + " guesses remaining to play! \n"));
        // Random a word from wordsToPick.js
        var randomWord = wordsToPick[Math.floor(Math.random() * wordsToPick.length)];
        // Creates a new Word object using a random word from the array
        this.currentWord = new Word(randomWord);
        // Prompts the user to guess a letter 
        this.makeGuess();
    };

    // Starts with an empty array of Letters Already Guessed
    // This property will be reset for every word played
    this.lettersAlreadyGuessed = [];

    // Prompt the user to guess a letter
    this.makeGuess = function () {
        // Show the current status of the word 
        
        console.log(boxen(("\n" + this.currentWord + "\n"),{ padding: 1, margin: 1, borderStyle: 'round' }));
        // Promp the user to guess a letter then check if the user has any guesses remaining 
        this.guessALetter().then(function() {
            self.checkRound()
        });
    };

    // Game.guessALetter prompts the user to guess a letter
    this.guessALetter = function () {

        // Here we ask the user to guess a letter
        // inquirer's prompt function is "asynchronous", which means that 
        // the majority of your game logic will need to be inside the .then() function for your prompt.
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
            .then(function (inquirerResponse) {

                // Add the user's guess in the letters already guessed
                var userGuess = inquirerResponse.userGuess.toUpperCase()
                console.log("You have guessed " + c.bgCyan(" " + userGuess + " "));

                self.lettersAlreadyGuessed.push(userGuess);
                console.log("Letters Already Guessed " + c.cyan(" " + self.lettersAlreadyGuessed + " "));


                // If the letter the user are trying to guess is in the current word, log that they are CORRECT
                var isCorrect = self.currentWord.hasThisLetter(userGuess);
                if (isCorrect) {
                    console.log(c.bold.green("\nCORRECT!!!\n"));
                }
                else {
                    // Otherwiss, reduce guesses remaining by 1
                    self.guessesRemaining--;
                    //  tell user they are INCORRECT (letter is not in the word) and display how many guesses left
                    console.log(c.bold.red("\nINCORRECT!!!\n" + c.inverse.yellow(" " + self.guessesRemaining + " guesses remaining!!! \n")));
                }
            });
    };

    // Created a generic function that checks if the user has any guesses remaining
    this.checkRound = function () {

        // If the user has no guesses remaining after this guess, , 
        if (self.guessesRemaining < 1) {
            // Show the user the correct word
            console.log(c.yellow("No guesses left! The word was: \"" + self.currentWord.getSolution() + "\"\n"));
            // Create a prompt to ask if the user want to start over
            self.askToStartOver();
        }
        else if (self.currentWord.guessedCorrectly()) {
            // If the user guessed all letters of the current word correctly, reset guessesLeft to 10 and get the next word
            console.log(c.green(" You got it right. The answer is " + self.currentWord.getSolution() + "! \n Next word! \n\n"));
/*             // Update guess remaining for the current user to 10
            self.guessesRemaining = 10; */
            // Empty Letters Already Guessed
            self.lettersAlreadyGuessed = [];
            // Create a new Word object
            self.newWord();
        }
        else {
            // Otherwise prompt the user to guess the next letter
            self.makeGuess();
        }
    };

    // After no guesses remaining, ask the user if they would like to play again.
    this.askToStartOver = function () {
        // Create a "Prompt" asking the user if they want to start over
        inquirer
            .prompt([
                {
                    type: "confirm",
                    message: "Start Over?",
                    name: "confirm",
                    default: true

                }
            ])
            .then(function (inquirerResponse) {
                // If the user says yes, start the new game, otherwise quit the game
                if (inquirerResponse.confirm) {
                    // Runs playGame from the start once more if they do
                    self.playGame();
                }
                else {
                    // If the user says no, end the game 
                    self.endGame();
                }
            });
    };

    // Exit the game
    this.endGame = function () {
        const pizza = new Pizza();

        figlet("Goodbye", function (err, data) {
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