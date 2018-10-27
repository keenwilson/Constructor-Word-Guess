# Constructor-Word-Guess
A command-line (*CLI*) word guess game using `constructor` functions to create objects representing each word to guess as well as each letter in each word, and using the `inquirer` package to prompt the user to guess a letter.

---
## How to Play

In this game, you will be given a certain amount of guesses. (10 or 20 depending on the level of difficulty)
For each word, you will be asked to guess an underlying character (A to Z).
If you guess matches the underlying characters of the word -- the game prints "Correct" and displays that character at its position(s) in the word.
If your guess does not match the underlying characters of the word -- the game prints "Incorrect" and reduces the amount of guesses remaining by 1.
The game ends when you get to 0 guesses remaining or have no guesses left.

---
## Technologies used
* [Node.js](https://nodejs.org/en/)
* JavaScript Object Constructors
* [Inquirer package](https://www.npmjs.com/package/inquirer)
* [Figlet package](https://www.npmjs.com/package/figlet)
* [Boxen package](https://www.npmjs.com/package/boxen) 

---
## Modules
* **Index**
    * The Index module creates a new Game object and calls `playGame` method which will run the game
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
        * `prototype.toString`: Method for all Word objects on the protoype which returns a string representing the word. Because we name a function `toString`, JavaScript automatically call `toString` on each letter, then joins them together even if we don't call `toString` separately. In this app, `Word.prototype.toString`. call the `letters` method on each letter object that will display either the underlying character or an underscore, then `.join(" ")` concatenates those letters/placeholders together
        * `prototype.hasThisLetter`: Method for all Word objects on the protoype which takes a character as an argument and calls the `Letter.prototype.didExistinCurrentWord` function on the letter object to see whether that guessed letter exists in the current word. This method will return a boolean (`true` or `false`) value
        * `prototype.guessedCorrectly`: Method for all Word objects on the protoype which returns `true` if all letters in the word have been guessed correctly
        *`prototype.getSolution`: Method for all Word objects on the protoype which calls the underlying characters and join them together in order to show the user the correct answer
* **Game**
    * The Game constructor is used to create a game object and house the game logic.
    * The Game module is a constructor function with the following properties and methods: 
            * `playGame`: Method which, when the game starts, will reset number of guesses remaining to 10, empty an array of letters already guessed, and random a new word for the user to play
            * `newWord`: Method which tells the user to guess a word in `Pizza toppings` category, randoms a word from `wordsToPick.js`, creates a new `Word` object using that random word, and runs `makeGuess`
            * `makeGuess`: Method which shows the current status of the word in a box, prompts the user to guess a letter using `guessALetter` method, and then checks if the user has any guesses remaining using `checkRound`
            *`guessALetter`: Method which prompts the user to guess a letter using the `inquirer` package, checks if the user guess correctly, then displays either "CORRECT" or "INCORRECT"
            *`checkRound`: Method which checks if the user has any guesses remaining
            *`askIfStartOver`: Method which asks the user if they would like to play again
            *`endGame`: Method which exits from the current Node.js process by using `process.exit(0)`
* **WordsToPick**
    * The WordsToPick module is an array of all words that can be chosen. In this app, these words are belong to **Delicously Popular Pizza Toppings**
* **Pizza**
    * The Pizza module exports the Pizza emoji '🍕' so that we can use it in `game.js` . 
    
---
## Author
    
[Keen Wilson](http://www.keenwilson.com)
