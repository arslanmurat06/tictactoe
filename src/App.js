import { useState } from "react";
import "./style.css";

function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [user, setUser] = useState("1");

  const [winner, setWinner] = useState("");

  function handleClick(xValue, yValue) {
    if (gameFinished()) return;

    if (user === "1") {
      if (board[xValue][yValue] !== "") {
        return;
      }
      setMove(xValue, yValue, "X", "2");
    } else {
      if (board[xValue][yValue] !== "") {
        console.log("bu kosula girdi2");
        return;
      }
      setMove(xValue, yValue, "O", "1");
    }
  }

  function setMove(xValue, yValue, move, user) {
    board[xValue][yValue] = move;
    setBoard((board) => [...board]);
    setUser(user);
    checkWinner(xValue, yValue);
  }

  function checkWinner(xValue, yValue) {
    if (xValue === yValue && xValue + yValue === 2) {
      if (checkDiagonal(xValue, yValue) || checkUntiDiagonal(xValue, yValue)) {
        setWinner(user === "1" ? "User1- X" : "User2 -0");
      }
    } else if ((xValue + yValue) % 2 === 0) {
      if (
        checkRow(xValue, yValue) ||
        checkColumn(xValue, yValue) ||
        checkDiagonal(xValue, yValue)
      ) {
        setWinner(user === "1" ? "User1- X" : "User2 -0");
      }
    } else if ((xValue + yValue) % 2 === 1) {
      if (checkRow(xValue, yValue) || checkColumn(xValue, yValue)) {
        setWinner(user === "1" ? "User1- X" : "User2 -0");
      }
    }
  }

  function resetGame() {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setWinner("");
  }

  function checkDiagonal(xValue, yValue) {
    var value = board[xValue][yValue];

    var isOK = true;
    for (let index = 0; index < 3; index++) {
      if (board[index][index] === value) {
        continue;
      } else {
        isOK = false;
        break;
      }
    }

    return isOK;
  }

  function checkUntiDiagonal(xValue, yValue) {
    var value = board[xValue][yValue];

    var isOK = true;

    for (let index = 0; index < 3; index++) {
      if (board[index][2 - index] === value) {
        continue;
      } else {
        isOK = false;
        break;
      }
    }
    return isOK;
  }

  function checkRow(xValue, yValue) {
    var value = board[xValue][yValue];
    var isOK = true;

    for (let index = 0; index < 3; index++) {
      if (board[index][yValue] === value) {
        continue;
      } else {
        isOK = false;
        break;
      }
    }
    return isOK;
  }

  function checkColumn(xValue, yValue) {
    var value = board[xValue][yValue];
    var isOK = true;

    for (let index = 0; index < 3; index++) {
      if (board[xValue][index] === value) {
        continue;
      } else {
        isOK = false;
        break;
      }
    }
    return isOK;
  }

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  function gameFinished() {
    return winner !== "";
  }

  return (
    <div className="container">
      <nav>
        <span>Github</span>
      </nav>
      <div className="App">
        <h1 className="header"> TIC TAC TOE</h1>
        <h1
          style={
            !gameFinished()
              ? { display: "none" }
              : { display: "block", color: "green" }
          }
        >
          WINNER {winner}
        </h1>

        <div className="row">
          <Square value={board[0][0]} onClick={() => handleClick(0, 0)} />
          <Square value={board[0][1]} onClick={() => handleClick(0, 1)} />
          <Square value={board[0][2]} onClick={() => handleClick(0, 2)} />
        </div>
        <div className="row">
          <Square value={board[1][0]} onClick={() => handleClick(1, 0)} />
          <Square value={board[1][1]} onClick={() => handleClick(1, 1)} />
          <Square value={board[1][2]} onClick={() => handleClick(1, 2)} />
        </div>
        <div className="row">
          <Square value={board[2][0]} onClick={() => handleClick(2, 0)} />
          <Square value={board[2][1]} onClick={() => handleClick(2, 1)} />
          <Square value={board[2][2]} onClick={() => handleClick(2, 2)} />
        </div>

        <button className="reset" onClick={() => resetGame()}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;
