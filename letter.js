// The Letter constructor is used to display either an underscore 
// or the underlying character for each letter in the word
// depending on whether or not the user has guessed the letter
function Letter (character) {

    // Uses literal notation to construct a RegExp object 
    // /[a-zA-Z]/ specifies word character.
    // The modifier i after the regex specifies case-insensitive matching.
    // If a character is not a letter, make it active 
    // Letter.active is a boolean 
    // First set this.active equal to `false` so that it appears as a placeholder on command line
    this.active = !/[a-zA-Z]/i.test(character);

    // Store the underlying character for the letter
    this.character = character;
}

// Setting the method for all Letter objects on the protoype
// ==================================================================================

// Letter.prototype.toString returns the underlying character if the letter has been guessed, 
// or a placeholder (like an underscore) if the letter has not been guessed
// ==================================================================================
// Name a letter's display function `toString`
// When concatenating with a string, JavaScript automatically call `toString`
Letter.prototype.toString = function() {
    
    if (this.active === true) {
        // If this letter has been guessed correctly, display an underlying character on the CLI.
        return this.character.toUpperCase();
    }
    // 
    return "_";
}

// Letter.prototype.didExistinCurrentWord is a boolean value that stores whether that guessed character exists in the current word
// ==================================================================================
Letter.prototype.didExistinCurrentWord = function(character) {

    // A function that takes a character as an argument and checks it against the underlying character
    if (character.toUpperCase() === this.character.toUpperCase()) {
        // The user guesses this character correctly (There is a guessed letter in the current word). 
        // Update this.active to `true`, which will display an underlying character.
        this.active = true;
        return true;
    }
    
    // Otherwise, return `false`
    return false;
};


// Returns the underlying character in order to show the user the correct word
Letter.prototype.showCharacter = function() {
    return this.character;
  };
  

// Exports Letter constructor so that Word.js can use it.
module.exports = Letter;




/* Test Letter.js on its own 
// ==================================================================================

// Drop the first two arguments in Node Js
process.argv.splice(0,2);

var t = new Letter("T")
// When concatenating with a string, JavaScript automatically call `toString`
console.log(t + '');
t.active = false;
console.log(t + '');

var h = new Letter("H")
var a = new Letter("A")
var i = new Letter("I")

var letterArray = [t, h, a, i];

//The same thing happens if we call `join` on a Letter array:
// JavaScript calls `toString` automatially on each letter, then joins them together
console.log(letterArray.join(' '));

*/





