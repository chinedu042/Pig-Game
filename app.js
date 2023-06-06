/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
document.querySelector(".current-" + activePlayer).textContent = dice;
*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.getElementById("dice-1").style.display = "none";
document.getElementById("dice-2").style.display = "none";

/** A function for the button when clicked */
document.querySelector(".btn-roll").addEventListener("click", function () {
  // generate a random number
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  // Display the result
  document.querySelector("#dice-1").style.display = "block";
  document.querySelector("#dice-2").style.display = "block";

  document.querySelector("#dice-1").src = "dice-" + dice1 + ".png";
  document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";

  // update the round score only IF the rolled number was NOT a 1
  if (dice1 !== 1 && dice2 !== 1) {
    roundScore += dice1;
    roundScore += dice2;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // Next player's turn
    nextPlayerHandler();
  }
});

/** Hold button handler */
document.querySelector(".btn-hold").addEventListener("click", function () {
  /** Add add active player to score */
  // scores[activePlayer] += roundScore;
  scores[activePlayer] = scores[activePlayer] + roundScore;

  /** update the score UI */
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  /** call next player */
  nextPlayerHandler();

  /** check which player won the game */
  if (scores[0] >= 100) {
    document.getElementById("name-0").textContent = "WINNER";
    /** disable all buttons */
    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
  }
  if (scores[1] >= 100) {
    document.getElementById("name-1").textContent = "WINNER";
    /** disable all buttons */
    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
  }
});

/** reload button */
document.querySelector(".btn-new").addEventListener("click", function () {
  window.location.reload();
});

// next Player function handler
const nextPlayerHandler = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  /** make points start from 0 */
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  /** make the dice hide after rolling a 1 */
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

  /** display the result to the UI */
  document.querySelector("#current-" + activePlayer).textContent = roundScore;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
};
