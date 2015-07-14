$(document).ready(function() {
  $("#bankroll .amount").text(bank);
})

var playerHand = [];
var dealerHand = [];
var playerSoftAce = 0;
var dealerSoftAce = 0;
var bank = 1000;
var bet = 25;

//Click hit, get another card, check if you busted
$("#hit").on("click", function() {
  var card = deal()
  playerHand.push(card);
  $("#player .hand").append("<div class='card data'></div>");
  playerTotal = checkPlayerBust();
  drawCards();
  $("#player .total").text("Player total: " + playerTotal);
})
//click stay, run dealer logic and comapre final result
$("#stay").on("click", function() {
  $("#dealer .card").removeClass("hide");
  drawCards();
  checkStay();
  //$("#dealer .card:nth-child(2)").text(dealerHand[1]);
})
//double your bet, get exactly one more card
$("#double").on("click", function() {
  double();
})
//place bet, get new deal
$("#newGame").on("click", function() {
  $(".hand").empty();
  $(".data").empty();
  $(".inGame").removeClass("hide");
  newGame();
})

//pick a random integer between 1 and 52, representing cards in a deck
var deal = function() {
  var card = Math.floor(Math.random() * 52 + 1);
  card = card % 13;
  if (card === 0 || card === 11 || card === 12) {
    card = 10;
  }
  console.log(card)
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
      $("#player .hand").append("<div class='card data'></div>");
    }
    else if (player === 2) {
      if (card === 1 && !dealerSoftAce) {
        card = 11;
        dealerSoftAce +=1;
      }
      dealerHand.push(card);
      $("#dealer .hand").append("<div class='card data'></div>");
      $("#dealer .card:nth-child(2)").addClass("hide");
    }
  }
}
//player loses if busted
//returns value of player hand if not busted
var checkPlayerBust = function() {
  var playerTotal = 0;
  var dealerTotal = checkDealerBust();
  for (var i=0; i<playerHand.length; i++) {
    playerTotal += playerHand[i];
  }
  if (playerTotal > 21) {
    //check if hand contains an Ace=11. Replace with Ace=1 if necessary.
    while (playerHand.indexOf(11) > -1) {
      var ace = playerHand.indexOf(11);
      playerHand[ace] = 1;
      playerTotal = 0;
      for (var i=0; i<playerHand.length; i++) {
        playerTotal += playerHand[i];
      }
    }
    if (playerTotal > 21) {
      $("#dealer .card").removeClass("hide");
      $("#dealer .total").text("Dealer total: " + dealerTotal)
      $("#result").text("Bust!");
      bank = bank - bet;
      $("#bankroll .amount").text(bank);
    }
  }
  return playerTotal;
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
  }
  return dealerTotal;
}
//dealer hits up to 17
var checkStay = function() {
  var dealerTotal = checkDealerBust();
  while (dealerTotal <= 17) {
    var card = deal();
    dealerHand.push(card);
    $("#dealer .hand").append("<div class='card data'></div>");
    dealerTotal = checkDealerBust();
  }
  drawCards();
  //compare dealer and player scores
  var playerTotal = checkPlayerBust();
  if (dealerTotal > 21) {
    $("#result").text("Dealer busts. You win!");
    bank += bet;
  }
  else if (dealerTotal > playerTotal) {
    $("#result").text("You lose!");
    bank -= bet;
  }
  else if (dealerTotal < playerTotal) {
    $("#result").text("You win!");
    bank += bet;
  }
  else if (dealerTotal === playerTotal) {
    $("#result").text("Push");
  }
  $("#dealer .total").text("Dealer total: " + dealerTotal)
  $("#bankroll .amount").text(bank);
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
  $("#player .total").text("Player total: " + playerTotal);
  if (playerTotal === 21 && dealerTotal === 21) {
    $("#dealer .card").removeClass("hide");
    $("#dealer .total").text("Dealer total: " + dealerTotal)
    $("#result").text("Push");
  }
  else if (playerTotal === 21 && dealerTotal < 21) {
    $("#dealer .card").removeClass("hide");
    $("#dealer .total").text("Dealer total: " + dealerTotal)
    $("#result").text("Blackjack!");
    bank += bet * 1.5;
  }
  else if (dealerTotal === 21 && playerTotal < 21) {
    $("#dealer .card").removeClass("hide");
    $("#dealer .total").text("Dealer total: " + dealerTotal)
    $("#result").text("You lose!");
    bank -= bet;
  }
  $("#bankroll .amount").text(bank);
}
//put player's cards and dealer's up card in card divs
var drawCards = function() {
  $("#player .card").each(function(index, element) {
    $(element).html(playerHand[index])
  })
  $("#dealer .card").each(function(index, element) {
    $(element).html(dealerHand[index])
  })
}

//doubles your bet, triggers hit followed by stay
var double = function() {
  bet = bet * 2;
  $("#currentBet .amount").text(bet);
  $("#hit").trigger("click");
  $("#stay").trigger("click");
}

//init first deal to player and dealer
//log the dealer's up card to the console
//check for blackjack
var newGame = function() {
  //reset hands for new game
  bet = parseInt($("#bet").val());
  $("#currentBet .amount").text(bet);
  playerHand = []
  dealerHand = []
  playerSoftAce = 0
  dealerSoftAce = 0
  firstHand(1);
  firstHand(2);
  drawCards();
  checkBlackjack();
}
