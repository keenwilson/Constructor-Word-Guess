// The Word constructor depends on the Letter constructor
var Letter = require("./Letter");

// The Word constructor is used to create an object representing 
// the current word the user is attempting to guess
function Word (word) {
    // word.split("") separates each character in the word and return an array of the letters of the underlying word
    // .map returns an array containing the results of calling the Letter constructor on each letter 
    this.letters = word.split("").map(function (character) {
        return new Letter(character);
    })
};


// Setting the method for all Word objects on the protoype
// ==================================================================================

// Word.prototype.toString() returns a string representing the word.
// Because we name a function `toString`, JavaScript automatically call `toString` on each letter, 
// then joins them together even if we don't call toString
Word.prototype.toString = function () {
    // .letters call the function on each letter object that displays the character or an underscore
    // .join(" ") concatenates those letters together.
    return this.letters.join(" ");
};

// Word.prototype.guessLetter takes a character as an argument and 
// calls the guess function on each letter object to see whether that letter has been guessed yet
Word.prototype.guessLetter = function (character) {
    var alreadyGuessed = false;
    this.letters.forEach(function (letter) {
        if (letter.guess(character) === true) {
            alreadyGuessed = true;
        }
    });


    // Return whether that letter has been guessed yet
    return alreadyGuessed;
};

// Word.prototype.guessedCorrectly returns `true` if all letters in the word have been guessed.
Word.prototype.guessedCorrectly = function () {
    return this.letters.every(function (letter) {
        return letter.visible;
    });
};


// Get the underlying characters in order to show the user the correct word
Word.prototype.getSolution = function () {
    return this.letters.map(function (letter) {
        // Call the underlying characters and join them together
        return letter.showCharacter();
    }).join("");
};

//Export the Word constructor so that we can use/reference it in game.js
module.exports = Word;


/* Test Word.js on its own 
// ==================================================================================

// Drop the first two arguments in Node Js
process.argv.splice(0, 2);

var bible = new Word("Bible");
console.log(bible);
*/