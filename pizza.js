function Pizza() {
    this.emoji = '🍕';
    this.pizzalog = function() {
        console.log.bind(console, '🍕')
    }
}

module.exports = Pizza;