import Row from './Row.jsx';
import React from 'react';
import Win from './Win.jsx';
import moveGen from '../lib/MoveGenerator.js';
import check from '../lib/VictoryCheck.js';
import generateBoard from '../lib/BoardGenerator';




class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: generateBoard(),
      turn: 'Red',
      win: false,
      winner: null,
      total: 1
    }
    this.placePiece = this.placePiece.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      boardState: generateBoard(),
      win: false,
      total: 1,
      winner: null
    })
  }

  placePiece(column) {
    var board = this.state.boardState.slice();
    const row = moveGen(board, column)
    if (row !== false) {
      board[row][column] = this.state.turn;
      this.setState({
        boardState: board,
        turn: this.state.turn === 'Red' ? 'Yellow' : 'Red'
      })
      this.setState({ total: this.state.total + 1 });
      if (this.state.total >= 42) {
        alert('Tie!');
        this.reset();
      };
      if (check(board, row, column)) {
        this.setState({
          win: true,
          winner: this.state.turn
        })
      }
    }
  }

  render() {
    if (!this.state.win) {
      return (
        <div className="board">
          <h1>Connect Four</h1>
          <h4 className={"turn" + this.state.turn}>{`${this.state.turn}'s turn!`}</h4>
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
    } else {
      return (
        <Win board={this.state.boardState} winner={this.state.winner} reset={this.reset} />
      );
    }
  }
}
export default Board;