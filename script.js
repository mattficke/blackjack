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
    card = 1;
  }
  else if (cardNum === 11) {
    card = 10;
  }
  else if (cardNum === 12) {
    card = 10;
  }
  else if (cardNum === 13) {
    card = 10;
  }
  else {
    card = cardNum;
  }
  return card;
}
var playerHand = function() {
  var total = 0;
  for (var i=1; i<3; i++) {
    var card = deal();
    $("#player .card:nth-child("+i+")").html(card);
    total += card;
  }
  $("#player .total").html("Total: " + total);
}
var dealerHand = function() {
  var total = 0;
  for (var i=1; i<3; i++) {
    var card = deal();
    $("#dealer .card:nth-child("+i+")").html(card);
    total += card;
  }
  $("#dealer .total").html("Total: " + total);
}
var newGame = function(player) {
  playerHand();
  dealerHand();
}
$(document).ready(function() {
  newGame();
});
