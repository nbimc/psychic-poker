const Card = require('./card');

class Deck {
     constructor(numberOfRows)
     {
        this.cards = [];
        this.numberOfRows = numberOfRows;

        // create the deck's row
        for (var i=0; i<numberOfRows; i++) {
          this.addRow();
        }
    }

    addRow() {
      var cardsRow = []
      var index_1, index_2;
      var tempCard;

      // init a new full deck
      for (var a=0; a<=3; a++)
      {
        for (var b=0; b<=12; b++)
         {
           cardsRow.push( new Card(a,b) );
         }
      }

      var length = cardsRow.length -1;

      // shuffle the deck
      for (var i=0; i<100; i++)
      {

          index_1 = Math.floor(Math.random() * 52);
          index_2 = Math.floor(Math.random() * 52);

          // swap cards
          tempCard = cardsRow[index_2];
          cardsRow[index_2]  = cardsRow[index_1];
          cardsRow[index_1]  = tempCard;
      }

      // create the row
      for (i=0; i<10; i++) {
        this.cards.push(cardsRow.splice( cardsRow.length-1, 1 ));
      }
    }

    // print deck
    printDeck() {
      console.log('');
      console.log('Input:');
      for (var i=0; i<this.numberOfRows; i++)
      {
        console.log(this.buildPrintRow(i*10));
      }
    }

    // print helper row
    buildPrintRow(index) {
      var strRow = "";
      for (var i=index; i<index+10; i++) {
        strRow += Card.getRanks()[this.cards[i][0].rank] + Card.getSuits()[this.cards[i][0].suit] + ' ';
      }

      return strRow;
    }

    // get next card from the deck
    removeFromDeck()
    {
        return this.cards.splice( 0, 1 )[0];
    }

}

module.exports = Deck;
