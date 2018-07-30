class Card{

    static getSuits() {
        return [ 'H', 'S', 'D', 'C' ];
    }

    static getRanks() {
        return ["A", "2", "3", "4", "5", "6", "7",
                "8", "9", "T", "J", "Q", "K"];
    }

    constructor(suit, rank)
    {
        this.suit=suit;
        this.rank=rank;
    }

    getRank() {
         return this.rank;
    }

    getSuit() {
        return this.suit;
    }
}

module.exports = Card;
