const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (cell.textContent !== "" || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        statusText.textContent = "Player " + currentPlayer + " Wins!";
        gameActive = false;
        return;
    }

    if (isDraw()) {
        statusText.textContent = "Game Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Current Player: " + currentPlayer;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win");

    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Current Player: X";
}
function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;

        if (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        ) {
            // Add animation class
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            return true;
        }
    }
    return false;
}
