# Constructor-Word-Guess
A Word Guess command-line (*CLI*) game using constructor functions to create objects representing each word to guess as well as each letter in each word. 


## Modules
* Index
    * The Index module creates a new Game object
* Letter
    * The Letter module is a constructor function for displaying either an underscore or the underlying character for each letter in the word depending on whether or not the user has guessed the letter.
    * The Letter constructor has the following properties and methods: 
    * `active`: 
    * `character`: Store the underlying character for the letter
    * `showCharacter`:
* Game
    * The Game module is a constructor function with the following properties and methods: 
        * `playGame`: 
        * `newWord`: 
        * `makeGuess`:
    
    * Once the user's guess is evaluated, it should print the result to the console.
* Word
    * The Word module is a constructor function with the following properties and methods:
        * `letters`:
        * `Word.prototype.toString`: 
* WordsToPick
    * The WordsToPick module is an array of all words that can be chosen. In this app, these words are belong to **Delicously Popular Pizza Toppings**
* Pizza
    * The Pizza module holds the pizza emoji. 
