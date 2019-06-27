import Row from './Row.jsx';
import React from 'react';
import moveGen from '../lib/MoveGenerator.js';
import checks from '../lib/VictoryCheck.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty"]
      ],
      turn: 'red'
    }
    this.placePiece = this.placePiece.bind(this);
  }

  placePiece(column) {
    var board = this.state.boardState.slice();
    const row = moveGen(board, column)
    if (row !== false) {
      board[row][column] = this.state.turn;
      this.setState({
        boardState: board,
        turn: this.state.turn === 'red' ? 'yellow' : 'red'
      })
      if (checks.rowCheck(board[row])) { alert(this.state.turn + ' wins!') };
      if (checks.columnCheck(board, column)) { alert(this.state.turn + ' wins!') };
    }
  }

  render() {
    return (
      <div className="board">
        <h1>Connect Four</h1>
        <div className="boardField">
          {this.state.boardState.map((row, i) => (
            <div key={i}>
              <Row row={row} rowI={i} placePiece={this.placePiece} />
              <br></br>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Board;