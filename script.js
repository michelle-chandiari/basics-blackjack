var main = function (input) {
  var deck = makeDeck();
  // console.log(`original deck ${deck}`);

  // Deck is shuffled
  var shuffledDeck = shuffle(deck);
  // console.log(shuffledDeck);

  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  console.log(
    `player cards: ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}`
  );
  var computerCard1 = shuffledDeck.pop();
  var computerCard2 = shuffledDeck.pop();
  console.log(
    `computer cards: ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}`
  );
  // User clicks Submit to deal cards
  if (input.length == 0) {
    // The cards are displayed to the user.
    var message = `Player hand: ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit} <br><br>
  Computer hand: ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}`;

    var playerTotalHand = playerCard1.rank + playerCard2.rank;
    var computerTotalHand = computerCard1.rank + computerCard2.rank;
    console.log(`player total hand: ${playerTotalHand}`);
    console.log(`computer total hand: ${computerTotalHand}`);

    // The cards are analysed for game winning conditions, e.g. Blackjack.
    // A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
    if (playerTotalHand == computerTotalHand) {
      message += `<br><br> It's a tie!`;
    }
    // A Blackjack win. When either player or dealer draw Blackjack.
    else if (playerTotalHand == 21) {
      message += `<br><br> This is a Blackjack win. Player wins by black jack!`;
    } else if (computerTotalHand == 21) {
      message += `<br><br> This is a Blackjack win. Computer wins by black jack!`;
    }
    // A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
    else if (playerTotalHand > computerTotalHand) {
      message += `<br><br> This is a normal win. Player wins by having a higher hand total.`;
    } else if (playerTotalHand < computerTotalHand) {
      message += `<br><br> This is a normal win. Computer wins by having a higher hand total.`;
    }
    return message;
  }
};

// The user decides whether to hit or stand, using the submit button to submit their choice.

// The user's cards are analysed for winning or losing conditions.

// The computer decides to hit or stand automatically based on game rules.

// The game either ends or continues.

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck, we will loop over this array
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];

  // Loop over the suits array
  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    // console.log(currentSuit);
    // Loop from 1 to 13 to create all cards for a given suit
    // rankCounter starts at 1 instead of 0, and ends at 13 instead of 12
    // an example of loop without an array
    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter (i.e if rank is 2, the card has number 2. applicable for rank 2 till 10)
      var cardName = rankCounter;
      // console.log(cardName);
      // if rank is 1, 11, 12 or 14, set cardName to ace jack queen king respectively
      if (cardName == 1) {
        cardName = `ace`;
      } else if (cardName == 11) {
        cardName = `jack`;
      } else if (cardName == 12) {
        cardName = `queen`;
      } else if (cardName == 13) {
        cardName = `king`;
      }
      // create a new card with the current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      }; // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  // Return the completed card deck
  // console.log(cardDeck);
  return cardDeck;
};

var randomIndexGenerator = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffle = function (cardDeck) {
  for (currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    var randomIndex = randomIndexGenerator(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};
