# Constructor-Word-Guess
A Word Guess command-line (*CLI*) game using constructor functions to create objects representing each word to guess as well as each letter in each word. 


## Modules
* **Index**
    * The Index module creates a new Game object and calls "playGame" method which will run the game
* **Letter**
    * The Letter module is a constructor function for displaying either an underscore or the underlying character for each letter in the word depending on whether or not the user has guessed the letter.
    * The Letter constructor has the following properties and methods: 
        * `active`: Property which controls if the app displays either an underlying character or a placeholder based on whether the letter has been guessed correctly
        * `character`: Property which is a string value to store the underlying character for the letter
        * `prototype.toString`: Method for all Letter objects on the protoype which returns the underlying character if the letter has been guessed,  or a placeholder (like an underscore) if the letter has not been guessed. This method is named  `toString` beause JavaScript would automatically call `toString` when concatenating with a string.
        * `prototype.didExistinCurrentWord`: Method for all Letter objects on the protoype which is a boolean value that stores whether that guessed character exists in the current word
        * `prototype.showCharacter`: Method for all Letter objects on the protoype which returns the underlying character in order to show the user the correct word
* **Word**
    * The Word module is a constructor function for creating an object representing the current word the user is attempting to guess.
    * The Word constructor has with the following properties and methods:
        * `letters`:
        * `prototype.toString`: Method for all Word objects on the protoype which returns a string representing the word. Because we name a function `toString`, JavaScript automatically call `toString` on each letter, then joins them together even if we don't call `toString` separately. In this app, `Word.prototype.toString`. call the `letters` method on each letter object that will display either the underlying character or an underscore, then `.join(" ")` concatenates those letters/placeholders together.
        * `prototype.hasThisLetter`: Method for all Word objects on the protoype which takes a character as an argument and calls the `Letter.prototype.didExistinCurrentWord` function on the letter object to see whether that guessed letter exists in the current word. This method will return a boolean (`true` or `false`) value.
        * `prototype.guessedCorrectly`: Method for all Word objects on the protoype which returns `true` if all letters in the word have been guessed correctly.
        *`prototype.getSolution`: Method for all Word objects on the protoype which calls the underlying characters and join them together in order to show the user the correct answer.
* **Game**
    * The Game module is a constructor function with the following properties and methods: 
            * `playGame`: 
            * `newWord`: 
            * `makeGuess`:
    
    * Once the user's guess is evaluated, it should print the result to the console.

* **WordsToPick**
    * The WordsToPick module is an array of all words that can be chosen. In this app, these words are belong to **Delicously Popular Pizza Toppings**
* **Pizza**
    * The Pizza module holds the pizza emoji '🍕'. 
