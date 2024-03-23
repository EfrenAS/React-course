import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";

import { TURNS } from "./constants";

import { checkWinnerFrom, checkEndGame } from "./utils/board";

import "./App.css";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);

    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null); // null is no winner and false is a draw

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem(["board", "turn"]);
  };

  const updateBoard = (index) => {
    // Don't update the board if board[index] already has a value or it or have a winner
    if (board[index] || winner) return;

    // Update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Save  the current player in localStorage for persistence
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", turn);

    // Check if have a winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Game Over
    }
  };

  return (
    <main className="board">
      <h1>Gato</h1>
      <button onClick={resetGame}>Jugar de Nuevo</button>
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
