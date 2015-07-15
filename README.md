# Blackjack

This is a blackjack game written in JavaScript, displayed with HTML and CSS . It is designed for one human player with a computer-controlled dealer.

Players start with $1000 to play with. The game keeps track of their bankroll over time until the page is reloaded.

The program creates a new "card" element with a visual reresentation each time a card is dealt, and keeps a running tally of the score. At the end of the hand, the playing field is reset.

The game provides hints on the correct strategy if the "hint" button is clicked.

##Issues
- The game is drawing from what is in effect an infinite deck. It does not keep track of which cards are remaining.
- The game does not track suit
-The game does not differentiate between cards with a value of 10 (Jack, Queen, King, 10)
- There isn't a successful implementation of splitting yet
- The game does not yet have multi-player support


##User Stories
###As a player I would like...
1. To keep track of how much money I have so that I don't go broke
2. To choose a computer or human opponent so that I can play with a varied number of people.
3. The option to ask for help so that I can make a better play
4. To choose the amount to bet each hand so that I can manage how much I'm spending
5. For something *fun* to happen when I win so that I'm not staring endlessly into the void for no reason
