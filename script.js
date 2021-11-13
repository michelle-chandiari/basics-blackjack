var gameMode = `draw card`;
var playerCard1 = ``;
var playerCard2 = ``;
var playerCardHit = ``;
var computerCard1 = ``;
var computerCard2 = ``;
var computerCardHit = ``;
var message = ``;
var deck = [];
var shuffledDeck = [];

var main = function (input) {
  // Check if there is an existing deck
  if (shuffledDeck.length == 0) {
    deck = makeDeck();
    shuffledDeck = [...deck];
    shuffledDeck = shuffle(shuffledDeck);
  }
  // User clicks Submit button to deal cards
  if (gameMode == `draw card`) {
    playerCard1 = drawCard();
    playerCard2 = drawCard();
    computerCard1 = drawCard();
    computerCard2 = drawCard();

    // The cards are displayed to the user.
    var playerTotalHand = playerCard1.rank + playerCard2.rank;
    var computerTotalHand = computerCard1.rank + computerCard2.rank;
    console.log(`player total hand: ${playerTotalHand}`);
    console.log(`computer total hand: ${computerTotalHand}`);

    var message = `Player hand: ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit} <br><br>
    Computer hand: ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}<br><br>
    Your current score is ${playerTotalHand}. Do you want to hit or stand? Type h for hit or s for stand.`;

    gameMode = `hitting or standing`;
    return message;
  }

  // The player hitting or standing is a new mode in the game that allows the player to enter their choice.
  if (gameMode == `hitting or standing` && input.length == 0) {
    var playerTotalHand = playerCard1.rank + playerCard2.rank;
    message = `Please submit h or s to proceed with game.
    <br><br>Player hand: ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit} <br><br>
    Computer hand: ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}<br><br>
    Your current score is ${playerTotalHand}.`;
  } else if (gameMode == `hitting or standing` && input == `s`) {
    // check for double aces
    checkDoubleAces();
    var playerTotalHand = playerCard1.rank + playerCard2.rank;
    var message = `Player hand: ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}`;

    var computerTotalHand = computerCard1.rank + computerCard2.rank;

    if (computerTotalHand == 17 || computerTotalHand > 17) {
      computerTotalHand = computerCard1.rank + computerCard2.rank;
      message += `<br><br>
    Computer hand: ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}`;
    } else {
      var computerCardHit = drawCard(computerCardHit);
      computerTotalHand =
        computerCard1.rank + computerCard2.rank + computerCardHit.rank;
      message += `<br><br>
    Computer hand: ${computerCard1.name} of ${computerCard1.suit},<br>
    ${computerCard2.name} of ${computerCard2.suit},<br>
    ${computerCardHit.name} of ${computerCardHit.suit}`;
    }

    message += `<br><br>You chose to stand`;
    // Your score: ${playerTotalHand}<br>
    // Computer score: ${computerTotalHand}`;
    gameMode = `evaluate winner`;
  } else if (gameMode == `hitting or standing` && input == `h`) {
    var playerCardHit = drawCard(playerCardHit);

    var playerTotalHand =
      playerCard1.rank + playerCard2.rank + playerCardHit.rank;
    var message = `Player hand: ${playerCard1.name} of ${playerCard1.suit},<br>
    ${playerCard2.name} of ${playerCard2.suit} and<br>
    ${playerCardHit.name} of ${playerCardHit.suit}`;

    var computerTotalHand = computerCard1.rank + computerCard2.rank;

    if (computerTotalHand == 17 || computerTotalHand > 17) {
      computerTotalHand = computerCard1.rank + computerCard2.rank;
      message += `<br><br>
    Computer hand: ${computerCard1.name} of ${computerCard1.suit},<br>
    ${computerCard2.name} of ${computerCard2.suit}`;
    } else if (computerTotalHand < 17) {
      var computerCardHit = drawCard(computerCardHit);

      // check for double aces
      checkDoubleAces();

      computerTotalHand =
        computerCard1.rank + computerCard2.rank + computerCardHit.rank;
      message += `<br><br>
    Computer hand: ${computerCard1.name} of ${computerCard1.suit},<br>
    ${computerCard2.name} of ${computerCard2.suit},<br>
    ${computerCardHit.name} of ${computerCardHit.suit}`;
    }

    console.log(`player total hand becomes: ${playerTotalHand}`);
    console.log(`computer total hand: ${computerTotalHand}`);

    gameMode = `evaluate winner`;
  }
  // evaluating winner
  if (gameMode == `evaluate winner`) {
    var winningImage = `<img src="https://c.tenor.com/Sjbio2e2HMUAAAAC/bts-supreme.gif"/>`;
    // A Blackjack win. When either player or dealer draw Blackjack.
    if (playerTotalHand == 21) {
      gameMode = `draw card`;
      message +=
        `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}
      <br><br> This is a Blackjack win. Player wins by black jack!` +
        winningImage +
        `<br><br> Press the submit button again to start a new round.`;
      return message;
    } else if (computerTotalHand == 21) {
      gameMode = `draw card`;
      message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}
      <br><br> This is a Blackjack win. Computer wins by black jack!
      <br><br> Press the submit button again to start a new round.`;
      return message;
    } else if (playerTotalHand < 21) {
      if (playerTotalHand == computerTotalHand) {
        message += `<br><br> It's a tie!
        Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}`;
      } else if (
        playerTotalHand > computerTotalHand &&
        computerTotalHand < 21
      ) {
        message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}<br><br> This is a normal win. Player wins by having a higher hand total.`;
      } else if (
        playerTotalHand < computerTotalHand &&
        computerTotalHand < 21
      ) {
        message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}<br><br> This is a normal win. Computer wins by having a higher hand total.`;
      } else {
        message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}<br><br> You won! Computer loses by having a score higher than 21.`;
      }
    }

    // Second Version: when the player busts (has a total score of >21)
    if (playerTotalHand > 21) {
      // tie scenario
      if (playerTotalHand == computerTotalHand) {
        message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}
      <br><br> It's a tie!`;
      } else if (playerTotalHand < computerTotalHand) {
        message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}
      <br><br> Player wins by having a score closer to 21.`;
      }
      // losing scenario
      else if (playerTotalHand > computerTotalHand) {
        message += `<br><br>Your score: ${playerTotalHand}<br>
      Computer score: ${computerTotalHand}
      <br><br> Player loses by having a score higher than 21.`;
      }
    }
    gameMode = `draw card`;
    message += `<br><br> Press the submit button again to start a new round.`;
  }
  return message;
};

var checkDoubleAces = function () {
  // reassignment of rank for player cards
  if (playerCard1.name == `ace` && playerCard2.name == `ace`) {
    playerCard1.rank = 11;
    playerCard2.rank = 1;
    console.log(`playerCard1.rank has been changed to 11`);
  } else if (playerCard2.name == `ace` && playerCardHit.name == `ace`) {
    playerCard2.rank = 11;
    playerCardHit.rank = 1;
    console.log(`playerCard2.rank has been changed to 11`);
  } else if (playerCard1.name == `ace` && playerCardHit.name == `ace`) {
    playerCard1.rank = 11;
    playerCardHit.rank = 1;
    console.log(
      `card 1 and cardHit are both aces. playerCard1.rank has been changed to 11`
    );
  }
  // reassignment of rank for computer cards
  if (computerCard1.name == `ace` && playerCard2.name == `ace`) {
    computerCard1.rank = 11;
    computerCard2.rank = 1;
    console.log(`computerCard1.rank has been changed to 11`);
  } else if (computerCard2.name == `ace` && computerCardHit.name == `ace`) {
    computerCard2.rank = 11;
    computerCardHit.rank = 1;
    console.log(`computerCard2.rank has been changed to 11`);
  } else if (computerCard1.name == `ace` && computerCardHit.name == `ace`) {
    computerCard1.rank = 11;
    computerCardHit = 1;
    console.log(
      `card 1 and cardHit are both aces. computerCard1.rank has been changed to 11`
    );
  }
};
var drawCard = function () {
  return shuffledDeck.pop();
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck, we will loop over this array
  var suits = [`♥️`, `♦️`, `♣️`, `♠️`];

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
