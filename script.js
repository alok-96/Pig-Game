"use strict";

// Selecting elements
const score1 = document.querySelector("#score-1");
const score2 = document.getElementById("score-2"); //Another method to select id
const current1 = document.getElementById("current-1");
const current2 = document.getElementById("current-2");
const diceImg = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const p1 = document.querySelector(".player1");
const p2 = document.querySelector(".player2");

let scores, currScore, playing, activePlayer; 

const init = function () {
  currScore = 0;
  activePlayer = 1;
  scores = [0, 0];
  playing = true;
  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  diceImg.classList.add("hidden");
  p1.classList.remove("player-winner");
  p2.classList.remove("player-winner");
  p1.classList.add("player-active");
  p2.classList.remove("player-active");
};

init();    // when we just start our game we have to initialize all the things. So we called this function 

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  // document.querySelector(`.player${activePlayer}`).classList.remove('player-active');
  currScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  // document.querySelector(`.player${activePlayer}`).classList.add('player-active');
  //We can also use toggle =>
  p1.classList.toggle("player-active");
  p2.classList.toggle("player-active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Number(Math.floor(Math.random() * 6)) + 1;

    // Displaying the dice image
    diceImg.classList.remove("hidden");
    diceImg.src = `images/dice-${dice}.png`; // we are showing the images by updating the src

    if (dice === 1) {
      switchPlayer();
    } else {
      currScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currScore;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer - 1] += currScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer - 1];

    //Condition for Winner
    if (scores[activePlayer - 1] >= 100) {
      playing = false;
      diceImg.classList.add("hidden");

      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("player-active");
    } else switchPlayer();
  }
});

btnNew.addEventListener("click", init);
