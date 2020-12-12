export const getValidMoves = (board, row, col) => {
   let mostProbableMoves = [],
   lessProbableMoves = [];
  if(row !== board.length -1){
    mostProbableMoves.push({row: row+1, col});
    if(col !== 0){
      lessProbableMoves.push({row: row+1, col: col-1});
    }
    if(col !== board[row].length - 1){
      lessProbableMoves.push({row: row+1, col: col+1});
    }
  }
  if(row !== 0) {
    mostProbableMoves.push({row: row-1, col});
    if(col !== 0){
      lessProbableMoves.push({row: row-1, col: col-1});
    }
    if(col !== board[row].length - 1){
      lessProbableMoves.push({row: row-1, col: col+1});
    }
  }
  if(col !== board[row].length - 1){
    mostProbableMoves.push({row, col: col+1});
  }
  if(col !== 0){
    mostProbableMoves.push({row, col: col-1});
  }
  lessProbableMoves.push({row, col});
  return {mostProbableMoves, lessProbableMoves};

}
