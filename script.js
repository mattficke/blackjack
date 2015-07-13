//Create an array with all of the cards. Assume and infinite deck for version 1.

//Click "play game" button, deal 2 cards each to player and dealer.

//Calculate value of player's hand, display in relevant box. If player's hand is 21, player wins. If dealer's hand is 21, dealer wins. If both 21, push.

//"Hit" button deals a new card to the player. Player Total is recalculated.

// "Stay" button ends player's turn, dealer then takes cards according to the rules and the total is recalculated. Win, lose, or push is then calculated.

//New game button is disaplayed.


//When "new game" button is clicked, randomly deal 2 cards face up to player, then one up and one down to dealer.
var deal = function() {
  var card;
  var cardNum = Math.floor(Math.random() * 13 + 1);
  if (cardNum === 1) {
    card = "A";
  }
  else if (cardNum === 11) {
    card = "J";
  }
  else if (cardNum === 12) {
    card = "Q";
  }
  else if (cardNum === 13) {
    card = "K";
  }
  else {
    card = cardNum;
  }
  return card;
}
