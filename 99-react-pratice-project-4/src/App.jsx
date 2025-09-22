import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(undefined));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {};

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div className="cell" key={index} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
