// The Letter constructor is used to display either an underscore 
// or the underlying character for each letter in the word
// depending on whether or not the user has guessed the letter
function Letter (char) {

    // Uses literal notation to construct a RegExp object 
    // /[a-zA-Z]/ specifies word character.
    // The modifier i after the regex specifies case-insensitive matching.
    // If a character is not a letter, make it visible
    // First set this.visible equal to `false` so that it appears as a placeholder on CLI 
    this.visible = !/[a-zA-Z]/i.test(char);

    // Store the underlying character for the letter
    this.char = char;
}

// Setting the method for all Letter objects on the protoype
// ==================================================================================

// Letter.prototype.toString returns the underlying character if the letter has been guessed, 
// or a placeholder (like an underscore) if the letter has not been guessed
// ==================================================================================
// Name a letter's display function `toString`
// When concatenating with a string, JavaScript automatically call `toString`
Letter.prototype.toString = function() {
    // If this letter has been guessed, display an underlying character on the CLI.
    if (this.visible === true) {
        return this.char.toUpperCase();
    }
    return "_";
}

// Letter.prototype.guess is a boolean value that stores whether that letter has been guessed yet
// ==================================================================================
Letter.prototype.guess = function(charGuess) {

    // A function that takes a character as an argument and checks it against the underlying character
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
        // The user guesses this character correctly. 
        // Update this.visible to `true`, which will display an underlying character.
        this.visible = true;
        return true;
    }
    
    // Otherwise, return `false`
    return false;
};

Letter.prototype.getSolution = function() {
    return this.char;
  };
  

module.exports = Letter;




/* Test Letter.js on its own 
// ==================================================================================

// Drop the first two arguments in Node Js
process.argv.splice(0,2);

var t = new Letter("T")
// When concatenating with a string, JavaScript automatically call `toString`
console.log(t + '');
t.visible = false;
console.log(t + '');

var h = new Letter("H")
var a = new Letter("A")
var i = new Letter("I")

var letterArray = [t, h, a, i];

//The same thing happens if we call `join` on a Letter array:
// JavaScript calls `toString` automatially on each letter, then joins them together
console.log(letterArray.join(' '));

*/





