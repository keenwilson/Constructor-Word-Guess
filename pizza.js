function Pizza() {
    this.emoji = '🍕';
    this.pizzalog = function() {
        console.log.bind(console, '🍕')
    }
}

//Export the Pizza emoji so that we can use it in game.js
module.exports = Pizza;