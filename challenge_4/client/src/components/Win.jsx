import React from 'react';
import Row from './Row.jsx';

const Win = (props) => (
  <div className="board">
    <h1>Connect Four</h1>
    <h2 className={'turn' + props.winner + " win"}>{props.winner  + " Wins!"}</h2>
    <div className="boardField">
      {props.board.map((row, i) => (
        <div key={i}>
          <Row row={row} rowI={i} placePiece={()=>{console.log('game over')}} />
          <br></br>
        </div>
      ))}
    </div>
    <button onClick={props.reset}>Play Again?</button>
  </div>
);

export default Win;