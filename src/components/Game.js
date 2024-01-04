import React, { useState } from "react";
import "./Game.css";

const calculateWinner = (squares) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const winner = calculateWinner(squares);

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;

    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every((cell) => cell !== null)) {
      return "Tie";
    } else {
      return `Next player: ${currentPlayer}`;
    }
  };

  return (
    <div className="app">
      <div className="board">
        {squares.map((value, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="status">{getStatus()}</div>
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Game;
