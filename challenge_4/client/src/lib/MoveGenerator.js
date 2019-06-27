const isMoveValid = (board, row, column) => {
  return board[row][column] === "empty";
}



const moveGenerator = (board, column) => {
  for (var i = board.length - 1; i >= 0; i--) {
    if (isMoveValid(board, i, column)) {
      return i;
    }
  }
  return false;
}

export default moveGenerator;