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

// Word.prototype.hasThisLetter takes a character as an argument and 
// calls the Letter.prototype.didExistinCurrentWord function on the letter object 
// to see whether that guessed letter exists in the current word
Word.prototype.hasThisLetter = function (userGuessCharacter) {
    var hasThisLetter = false;
    this.letters.forEach(function (letterInTheWord) {
        if (letterInTheWord.didExistinCurrentWord(userGuessCharacter) === true) {
            hasThisLetter = true;
        }
    });

    // Return whether that letter exists in the current word
    return hasThisLetter;
};

// Word.prototype.guessedCorrectly returns `true` if all letters in the word have been guessed correctly.
Word.prototype.guessedCorrectly = function () {
    return this.letters.every(function (letter) {
        // If the value of letter.active on every letters are true,
        // Word.prototype.guessedCorrectly will return `true`.
        return letter.active;
    });
};


// Get the underlying characters in order to show the user the correct word
Word.prototype.getAnswer = function () {
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