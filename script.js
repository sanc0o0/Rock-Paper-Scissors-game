let Score = JSON.parse(localStorage.getItem("Score")) || {
  player: 0,
  computer: 0,
  Ties: 0,
};

updateScoreElement();

let isAutoPlaying = true;
let intervalId;

function autoPlay() {
  if (isAutoPlaying === false) {
    intervalId = setInterval(function () {
      const PlayerMove = pickComputerMove();
      playGame(PlayerMove);
    }, 900);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

  document.querySelector(".js-auto-play-btn").innerHTML = isAutoPlaying
    ? "Stop Play"
    : "Auto Play";
}
document.querySelector(".rck").addEventListener("click", () => {
  playGame("Rock");
});
document.querySelector(".ppr").addEventListener("click", () => {
  playGame("Paper");
});
document.querySelector(".scssr").addEventListener("click", () => {
  playGame("Scissor");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") {
    playGame("Rock");
  } else if (event.key === "p" || event.key === "P") {
    playGame("Paper");
  } else if (event.key === "s" || event.key === "S") {
    playGame("Scissor");
  } else if (event.key === "a" || event.key === "A") {
    autoPlay();
  } else if (event.key === "c" || event.key === "C") {
    resetScore();
    updateScoreElement();
  }
});

function playGame(PlayerMove) {
  const computerMove = pickComputerMove();
  if (computerMove === "Rock") {
    if (PlayerMove === "Rock") {
      result = "Tie!";
    } else if (PlayerMove === "Paper") {
      result = "You win!";
    } else if (PlayerMove === "Scissor") {
      result = "You lose!";
    }
  } else if (computerMove === "Paper") {
    if (PlayerMove === "Rock") {
      result = "You lose!";
    } else if (PlayerMove === "Paper") {
      result = "Tie!";
    } else if (PlayerMove === "Scissor") {
      result = "You win!";
    }
  } else if (computerMove === "Scissor") {
    if (PlayerMove === "Rock") {
      result = "You win!";
    } else if (PlayerMove === "Paper") {
      result = "You lose!";
    } else if (PlayerMove === "Scissor") {
      result = "Tie!";
    }
  }
  if (result === "You win!") {
    Score.player++;
  } else if (result === "You lose!") {
    Score.computer++;
  } else if (result === "Tie!") {
    Score.Ties++;
  }
  localStorage.setItem("Score", JSON.stringify(Score));

  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `Your: ${PlayerMove},   Computer: ${computerMove}.`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins : ${Score.player}, Losses: ${Score.computer}, Ties: ${Score.Ties}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber <= 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber <= 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber <= 1) {
    computerMove = "Scissor";
  }
  return computerMove;
}
function resetScore() {
  Score.player = 0;
  Score.computer = 0;
  Score.Ties = 0;
  localStorage.setItem("Score", JSON.stringify(Score));
}
