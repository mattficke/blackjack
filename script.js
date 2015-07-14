var playerHand = [];
var dealerHand = [];
var playerSoftAce = 0
var dealerSoftAce = 0
var blackjack = false;

//Click hit, get another card, check if you busted
$("#hit").on("click", function() {
  var card = deal()
  console.log(card);
  playerHand.push(card);
  playerTotal = checkPlayerBust();
  console.log("Player total: " + playerTotal);
  console.log("Dealer is showing: " + dealerHand[0])
})

//click stay, run dealer logic and comapre final result
$("#stay").on("click", function() {
  checkStay();
})

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
  for (var i=1; i<3; i++) {
    var card = deal();
    if (player === 1) {
      if (card === 1 && !playerSoftAce) {
        card = 11;
        playerSoftAce += 1;
      }
      playerHand.push(card);
      console.log(card)
    }
    else if (player === 2) {
      if (card === 1 && !dealerSoftAce) {
        card = 11;
        dealerSoftAce +=1;
      }
      dealerHand.push(card);
    }
  }

}
//player loses if busted
//returns value of player hand if not busted
var checkPlayerBust = function() {
  var playerTotal = 0;
  for (var i=0; i<playerHand.length; i++) {
    playerTotal += playerHand[i];
  }
  if (playerTotal > 21) {
    //check if hand contains an Ace=11. Replace with Ace=1 if necessary.
    if (playerHand.indexOf(11) > -1) {
      var ace = playerHand.indexOf(11);
      playerHand[ace] = 1;
      checkPlayerBust();
    }
    else {
      console.log("player busts");
      return "busted";
    }
  }
  else {
    return playerTotal;
  }
}
//player wins if dealer busts
//returns value of dealer's hand if not busted
var checkDealerBust = function() {
  var dealerTotal = 0;
  for (var i=0; i<dealerHand.length; i++) {
    dealerTotal += dealerHand[i];
  }
  if (dealerTotal > 21) {
    //check if hand contains an Ace=11. Replace with Ace=1 if necessary.
    if (dealerHand.indexOf(11) > -1) {
      var ace = dealerHand.indexOf(11);
      dealerHand[ace] = 1;
      checkDealerBust();
    }
    else {
      console.log("dealer busts");
      return;
    }
  }
  else {
    return dealerTotal;
  }
}
//dealer hits up to 17
var checkStay = function() {
  var dealerTotal = checkDealerBust();
  console.log("Dealer total: " + dealerTotal);
  while (dealerTotal < 17) {
    var card = deal();
    console.log(card);
    dealerHand.push(card);
    dealerTotal = checkDealerBust();
  }
  //compare dealer and player scores
  var playerTotal = checkPlayerBust();
  if (dealerTotal > playerTotal) {
    console.log("You lose!");
  }
  else if (dealerTotal < playerTotal) {
    console.log("You win!");
  }
  else if (dealerTotal === playerTotal) {
    console.log("Push");
  }
}
//check if either player or dealer has blackjack after first deal
var checkBlackjack = function() {
  var playerTotal = 0;
  var dealerTotal = 0;
  for (var i=0; i<playerHand.length; i++) {
    playerTotal += playerHand[i];
  }
  for (var i=0; i<dealerHand.length; i++) {
    dealerTotal += dealerHand[i];
  }
  if (playerTotal === 21 && dealerTotal === 21) {
    console.log("push");
  }
  else if (playerTotal === 21 && dealerTotal < 21) {
    console.log("Blackjack!");
  }
  else if (dealerTotal === 21 && playerTotal < 21) {
    console.log("You lose!");
  }
  console.log("Player total: " + playerTotal);
}
//init first deal to player and dealer
//log the dealer's up card to the console
//check for blackjack
var newGame = function() {
  playerHand = []
  dealerHand = []
  firstHand(1);
  firstHand(2);
  checkBlackjack();
  console.log("Dealer card: " + dealerHand[0]);
}

//Start game
newGame();
