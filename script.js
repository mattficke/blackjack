var playerTotal = 0;
var dealerTotal = 0;

//pick a random integer between 1 and 52, representing cards in a deck
var deal = function() {
  var card = Math.floor(Math.random() * 52 + 1);
  card = card % 13;
  if (card === 0 || card === 11 || card === 12) {
    card = 10;
  }
  return card;
}

//initial deal
var firstHand = function(player) {
  var blackjack = false;
  for (var i=1; i<3; i++) {
    var card = deal();
    if (player === 1) {
      playerTotal += card;
      console.log(card)
    }
    else if (player === 2) {
      dealerTotal += card;
      console.log(card);
    }
  }
  if (playerTotal === 21) {
    blackjack = true;
  }
  checkScore(blackjack);
}
var checkScore = function(blackjack) {
  
}
//init first deal to player and dealer
var newGame = function() {
  firstHand(1);
  console.log("Player total: " + playerTotal)
  firstHand(2);
  console.log("Dealer total: " + dealerTotal);
}
//start script on page load
$(document).ready(function() {
  newGame();
});
