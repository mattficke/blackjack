var playerTotal = 0
var dealerTotal = 0

//pick a random integer between 1 and 52, representing cards in a deck
var deal = function() {
  var card = Math.floor(Math.random() * 52 + 1);
  return card;
}
var playerHand = function() {
  for (var i=1; i<3; i++) {
    var card = deal() % 13;
    playerTotal += card;
    console.log(card)
  }
  console.log("Player total: " + playerTotal)
}
var dealerHand = function() {
  for (var i=1; i<3; i++) {
    var card = deal() % 13;
    dealerTotal += card;
    console.log(card);
  }
  console.log("Dealer total: " + dealerTotal);
}
//initial deal to player and dealer
var newGame = function(player) {
  playerHand();
  dealerHand();
}
//start script on page load
$(document).ready(function() {
  newGame();
});
