import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // Check all winners combinations to watch  if someone has won the game
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null; // Return null if  there's no one winner
};

// Check if have a draw and if no empty space left in the board
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
