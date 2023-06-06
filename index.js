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

document.querySelector(".dice").style.display = "none";

/** A function for the button when clicked */
document.querySelector(".btn-roll").addEventListener("click", function () {
  // generate a random number
  const dice = Math.floor(Math.random() * 6) + 1;

  // Display the result
  const diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  // update the round score only IF the rolled number was NOT a 1
  if (dice !== 1) {
    // add score
    roundScore += dice;
    // roundScore = roundScore + dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // add current scre to global score
  scores[activePlayer] += roundScore;

  // update the UI
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // check if player won the game
  if (scores[activePlayer] >= 50) {
    document.getElementById("name-" + activePlayer).textContent = "WINNER";
    document.querySelector(".player-0-panel").classList.add("active");
    // disable button if there is a winner
    document.querySelector(".btn-hold").disabled = true;
    document.querySelector(".btn-roll").disabled = true;
  }
  if (scores[activePlayer] >= 50) {
    document.getElementById("name-" + activePlayer).textContent = "WINNER";
    document.querySelector(".player-1-panel").classList.add("active");
    // disable button if there is a winner
    document.querySelector(".btn-hold").disabled = true;
    document.querySelector(".btn-roll").disabled = true;
  }

  // next player
  nextPlayer();
});

const nextPlayer = () => {
  // next player and make the score start from zero
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
};

/** reload button */
document.querySelector(".btn-new").addEventListener("click", function () {
  window.location.reload();
});
