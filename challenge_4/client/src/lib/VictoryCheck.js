

  const rowCheck = (row) => {
    var current;
    var count = 0;
    for (var i = 0; i < row.length; i++) {
      if (row[i] === "empty") {
        current = "empty";
        count = 0;
      } else {
        if (current === row[i]) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          current = row[i];
          count = 1;
        }
      }
    }
    return false;
  }


  const columnCheck = (board, column) => {
    var current;
    var count = 0;
    for (var i = 0; i < board.length; i++) {
      var spot = board[i][column]
      if (spot === "empty") {
        current = "empty";
        count = 0;
      } else {
        if (current === spot) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          current = spot;
          count = 1;
        }
      }
    }
    return false;
  }


  const majorDiagonalCheck = (board, row, column) => {
    var current;
    var count = 0;
    var column = column - row;

    for (var i = 0; i < board.length; i++) {
      if (board[i][column + i] === 'empty' || board[i][column + i] === undefined) {
        current = "empty"
        count = 0;
      } else {
        if (current === board[i][column + i]) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          current = board[i][column + i];
          count = 1;
        }
      }
    }
    return false;
  }

  const minorDiagonalCheck = (board, row, column) => {
    var current;
    var count = 0;
    var column = row + column;
    for (var i = 0; i < board.length; i++) {
      if (board[i][column - i] === 'empty' || board[i][column - i] === undefined) {
        current = "empty"
        count = 0;
      } else {
        if (current === board[i][column - i]) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          current = board[i][column  - i];
          count = 1;
        }
      }
    }
    return false;
  }

  const isWinner = (board, row, column) => {
    if (rowCheck(board[row])) { return true };
    if (columnCheck(board, column)) { return true };
    if (majorDiagonalCheck(board, row, column)) {return true };
    if (minorDiagonalCheck(board, row, column)) {return true };
    return false;
  }


export default isWinner;