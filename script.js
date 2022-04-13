// inizializzazione di costanti e variabili
const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".game_status");
const player = document.querySelector(".player");
const gameOver = document.querySelector(".game_over");
const playerXWins = document.querySelector(".player_x_wins");
const playerOWins = document.querySelector(".player_o_wins");

winningMoves = [
  // tris in riga
  [
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  [
    [2, 1],
    [2, 2],
    [2, 3],
  ],
  [
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  // tris in colonna
  [
    [1, 1],
    [2, 1],
    [3, 1],
  ],
  [
    [1, 2],
    [2, 2],
    [3, 2],
  ],
  [
    [1, 3],
    [2, 3],
    [3, 3],
  ],
  // tris in diagonale
  [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  [
    [1, 3],
    [2, 2],
    [3, 1],
  ],
];

let playerXMoves = []; // [riga, colonna], [riga, colonna]
let playerOMoves = [];
let moves = 0;

// dichiarazione funzioni
function currentMove(element) {
  moves % 2 ? (element.textContent = "X") : (element.textContent = "O"); // X O
}

function hideIfNeeded(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

function showWinnerQuote(quote) {
  gameStatus.classList.add("hidden");
  quote.classList.remove("hidden");
  cells.forEach((cell) => {
    if (cell.classList.contains("unclicked")) {
      cell.classList.remove("unclicked");
    }
  });
}

function isWinner(playerMoves) {
  let winner = false;
  let winningMoveCounter;
  // entro nell'array contenente tutti i set di mosse vincenti
  for (let i = 0; i < winningMoves.length; i++) {
    winningMoveCounter = 0;
    // entro nel set singolo
    for (let c = 0; c < winningMoves[i].length; c++) {
      // ora confronto tutte le mosse del giocatore
      for (playerMove of playerMoves) {
        if (
          playerMove[0] == winningMoves[i][c][0] &&
          playerMove[1] == winningMoves[i][c][1]
        ) {
          winningMoveCounter++;
        }
      }
    }

    if (winningMoveCounter == 3) {
      winner = true;
    }
  }
  return winner;
}

// aggiunta mosse e verifica vincita a ogni aggiunta mossa
currentMove(player);
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.classList.contains("unclicked")) {
      cell.classList.remove("unclicked");
      currentMove(cell);
      if (moves % 2) {
        playerXMoves.push([cell.dataset["row"], cell.dataset["column"]]);
      } else {
        playerOMoves.push([cell.dataset["row"], cell.dataset["column"]]);
      }
      moves++;
      currentMove(player);
    }

    if (isWinner(playerOMoves)) {
      showWinnerQuote(playerOWins);
    } else if (isWinner(playerXMoves)) {
      showWinnerQuote(playerXWins);
    } else if (moves == 9) {
      gameOver.classList.remove("hidden");
      gameStatus.classList.add("hidden");
    }
  });
});

// tasto di reset
document.querySelector(".reset").addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    moves = 0;
    if (!cell.classList.contains("unclicked")) {
      cell.classList.add("unclicked");
    }
  });

  hideIfNeeded(playerOWins);
  hideIfNeeded(playerXWins);
  hideIfNeeded(gameOver);
  if (gameStatus.classList.contains("hidden")) {
    gameStatus.classList.remove("hidden");
  }
  currentMove(player);
  playerOMoves = [];
  playerXMoves = [];
});
