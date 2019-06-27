const checks = {

 rowCheck: (row) => {
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
},


 columnCheck: (board, column) => {
  var current;
  var count = 0;

  for (var i = 0; i < board.length; i++) {
    var spot = board[i][column]
    if (spot !== "empty") {
      if (current === spot) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        current = spot;
        count = 1;
      }
    } else {
      current = "";
      count = 0;
    }
  }
  return false;
},


majorDiagonalCheck: (board, column) => {


},

minorDiagonalCheck: (board, column) => {

}


}

export default checks;