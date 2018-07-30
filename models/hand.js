const Deck = require('./deck');
const Card = require('./card');

class Hand {

    static getScores() {
        return [ 'highest-card', 'one-pair', 'two-pairs', 'three-of-a-kind',
         'straight', 'flush', 'full-house', 'four-of-a-kind', 'straight-flush' ];
    }

    constructor(cards, isHand)
    {
        this.cards = cards;
        this.isHand = isHand;

        // if a deck's hand, no need to validate the hand
        if(!isHand) {return;}

        var value = [];
        var ranks = [14];
        var orderedRanks = [5];
        var flush=true, straight=false;
        var sameCards=1,sameCards2=1;
        var largeGroupRank=0,smallGroupRank=0;
        var index=0;
        var topStraightValue=0;

        /******************************************************
        assign helper data that is used in the score validation
        ******************************************************/

        // reset ranks array
        // the ranks array provides counting for each card in the hand
        for (var x=0; x<=13; x++) {
            ranks[x]=0;
        }

        // iterate through current hand and set the current rankes
        for (x=0; x<=4; x++) {
            ranks[ cards[x].getRank() ]++;
        }

        // check for flush condition
        for (x=0; x<4; x++) {
          if ( cards[x].getSuit() != cards[x+1].getSuit() ) {
              flush=false;
              break;
          }
        }

        // get the cards values for sameCards and sameCards2
        // they represent the two highest numbers of same cards
        for (x=13; x>=1; x--) {
           if (ranks[x] > sameCards) {
              //if sameCards was not the default value
               if (sameCards != 1) {
                   sameCards2 = sameCards;
                   smallGroupRank = largeGroupRank;
               }

               sameCards = ranks[x];
               largeGroupRank = x;

           } else if (ranks[x] > sameCards2) {
               sameCards2 = ranks[x];
               smallGroupRank = x;
           }
        }

        // set the order (highest to low) of cards that appear once
        // if ace, run this before because ace is highest card
        if (ranks[1]==1) {
            orderedRanks[index]=14;
            index++;
        }

        for (x=13; x>=2; x--) {
            if (ranks[x]==1) {
                orderedRanks[index]=x;
                index++;
            }
        }

        // check for straight condition
        //can't have straight with lowest value of more than 10
        for (x=1; x<=9; x++) {
            if (ranks[x]==1 && ranks[x+1]==1 && ranks[x+2]==1 &&
                ranks[x+3]==1 && ranks[x+4]==1) {
                straight=true;
                topStraightValue=x+4; //4 above bottom value
                break;
            }
        }

        // check for straight condition where low number is 10
        //  ace high
        if (ranks[10]==1 && ranks[11]==1 && ranks[12]==1 &&
            ranks[13]==1 && ranks[1]==1)  {
            straight=true;
            topStraightValue=14; //higher than king
        }

        /******************************************************
        decide high score
        ******************************************************/

        // high card
        if ( sameCards==1 ) {
            this.score = 1;
            this.highestRank = orderedRanks[0];
        }

        // one pair
        if (sameCards==2 && sameCards2==1) {
          this.score = 2;
          this.highestRank = largeGroupRank;
        }

        // two pairs
        if (sameCards==2 && sameCards2==2) {
          this.score = 3;
          this.highestRank = largeGroupRank>smallGroupRank ? largeGroupRank : smallGroupRank;
        }

        // three of a kind
        if (sameCards==3 && sameCards2!=2) {
          this.score = 4;
          this.highestRank = largeGroupRank;
        }

        // straight
        if (straight && !flush) {
          this.score = 5;
          this.highestRank = topStraightValue;
        }

        // flush
        if (flush && !straight) {
          this.score = 6;
          this.highestRank = orderedRanks[0];
        }

        // full house
        if (sameCards == 3 && sameCards2 == 2) {
          this.score = 7;
          this.highestRank = largeGroupRank;
          this.highestRank2 = smallGroupRank;
        }

        // four of a kind
        if (sameCards==4) {
          this.score = 8;
          this.highestRank = largeGroupRank;
        }

        // straight flush
        if (straight && flush) {
            this.score = 9;
        }
    }

    // print hand
    print() {
      var strRow = "";
      if (this.isHand) {
        strRow += "Hand: ";
      }
      else {
        strRow += "Deck: ";
      }

      for (var x=0; x<5; x++) {
        strRow += (Card.getRanks()[this.cards[x].rank] + Card.getSuits()[this.cards[x].suit] + ' ');
      }
      return strRow;
    }
}

module.exports = Hand;
