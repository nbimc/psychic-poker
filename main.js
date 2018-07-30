const Card = require('./models/card');
const Deck = require('./models/deck');
const Hand = require('./models/hand');

var d;
var h, hDeck;
var cards, nextCards = [];
var currentSuit = [];
var currentRank = [];
var currentHighScore = 1;
var currentHighRank = 1;
var handPrint, handDeckPrint, bestHandPrint = "";

// how many rows we want
var numberOfRuns = 10;

initDeck();
validateHands();

// create the deck
function initDeck() {
  d = new Deck(numberOfRuns);

  d.printDeck();
  console.log('');
  console.log('Output:');
}

// validate each input row
function validateHands() {
  for (var i=0; i<numberOfRuns; i++) {
    getNextHand();
    getNextDeckFives();
    loopDeckHand();
    printResult();
  }
}

// get the next hand from the deck
function getNextHand() {
  // reset the current hand cards
  cards = [];

  // get next 5 cards from deck
  for (var x=0; x<5; x++)
  {
      var removed = d.removeFromDeck();
      var c = new Card(removed[0].suit, removed[0].rank);
      cards.push(c);
  }

  h = new Hand(cards, true);
  handPrint = h.print();
  currentHighScore = h.score;
  currentHighRank = h.highestRank;
}

// get the next 5 deck cards
function getNextDeckFives() {
  nextCards = [];

  for (var i=0; i<5; i++) {
    var removed = d.removeFromDeck();
    var c = new Card(removed[0].suit, removed[0].rank);
    nextCards.push(c);
  }

  hDeck = new Hand(nextCards, false);
  handDeckPrint = hDeck.print();
}

// start main loop to init a recursive hands validation
function loopDeckHand() {
  for(var x=1; x<6; x++) {
    recursiveLoop(x,0,x);
  }
}

// recursive loop to handle all posibilities of cards swapping
// from deck to current hand
// Input params:
//  loops: number of required loops. i.e. for two cards swapping the value is 2
//  internalCounter: beginning counter for an internal loop that is dependant on
//                   a higher order loop counter
//  externalCounter: represents the loop hierarchy
function recursiveLoop(loops, internalCounter, externalCounter) {
  for(var x=internalCounter; x<6-externalCounter; x++)
  {
    swap(loops-externalCounter, x);

    // check for most internal loop hierarchy
    if (externalCounter == 1) {
      var h = new Hand(cards, true);

      // check if we found a better hand
      if(h.score > currentHighScore || h.score == currentHighScore && h.highestRank > currentHighRank) {
        currentHighScore = h.score;
        currentHighRank = h.highestRank;
      }

    } else {
      // we need to call for another loop hierarchy
      recursiveLoop(loops, x+1, externalCounter-1);
    }

    // after swapping, return to original state, to continue with another swap
    reswap(loops-externalCounter, x);
  }
}

// swap cards from deck's cards to current hand
function swap(currentIndex, cardsIndex) {
  currentSuit[currentIndex] = cards[cardsIndex].suit;
  currentRank[currentIndex] = cards[cardsIndex].rank;

  cards[cardsIndex].suit = nextCards[currentIndex].suit;
  cards[cardsIndex].rank = nextCards[currentIndex].rank;
}

// reswap cards to original current hand state
function reswap(currentIndex, cardsIndex) {
  cards[cardsIndex].suit = currentSuit[currentIndex];
  cards[cardsIndex].rank = currentRank[currentIndex];
}

// print final row result
function printResult() {
  bestHandPrint = "Best Hand: " + Hand.getScores()[currentHighScore-1];
  console.log(handPrint + ' ' + handDeckPrint + ' ' + bestHandPrint);
}
