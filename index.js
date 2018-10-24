// Requires the GAME module for overall game logic
const Game = require("./Game");
// Requires figlet npm package to convert text to drawing
const figlet = require("figlet");

// Initialize a new Game object
const game = new Game();

//When user enters game, convert "Word Guess Game" text characters to drawings using figlet npm package.
figlet("Word Guess Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)

    // The playGame method is called when the file first loads.
    game.playGame()
});

