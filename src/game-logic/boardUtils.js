import { getValidMoves } from "./validMoves";

export const getInitialProbability = (boardSize) => {
  let prob = 1 / (boardSize * boardSize);
  return prob;
}

export const createBoard = (boardSize) => {
  let board = [];
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
        board[i][j] = {
          p: getInitialProbability(boardSize),
        }
    }
  }
  return board;
}

export const initiateBelief = (boardSize) => {
  let board = [];
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
        board[i][j] = getInitialProbability(boardSize);
    }
  }
  return board;
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const indexToPosition = (index, boardSize) => {
  const row = Math.floor(index / boardSize);
  const col = index - row * boardSize;
  return {row, col};
}

export const getInitialGhostPosition = (boardSize) => {
  const indx = getRandomInt(boardSize * boardSize);
  return indexToPosition(indx, boardSize);
}

export const moveGhost = (board, currentPosition, mostP)  => {
  const validMoves = getValidMoves(board, currentPosition.row, currentPosition.col);
  console.log(validMoves);
  const num = Math.random();
  if(num < mostP) return validMoves.mostProbableMoves[getRandomInt(validMoves.mostProbableMoves.length)];
  return validMoves.lessProbableMoves[getRandomInt(validMoves.lessProbableMoves.length)];
}

export const calculatePartialBelief = (oldBelief, oldCells, mostP) => {
  const updatedBelief = [];
  let newCells = oldCells? [...oldCells]: [];
  
  for(let i = 0; i < oldBelief.length; i++){
    updatedBelief[i] = [];
    for(let j = 0; j < oldBelief[i].length; j++){
      let val = 0;
      const moves = getValidMoves(oldBelief, i, j);
      for(const move of moves.mostProbableMoves){
        // console.log("yo", i, j, move.row, move.col);
        val += (mostP / getValidMoves(oldBelief, move.row, move.col).mostProbableMoves.length) * oldBelief[move.row][move.col]; 
      }
      for(const move of moves.lessProbableMoves){
        // console.log("yo", i, j, move.row, move.col);
        val += ((1 - mostP) / getValidMoves(oldBelief, move.row, move.col).lessProbableMoves.length) * oldBelief[move.row][move.col]; 
      }
      console.log(val);
      if(val > 0.0001 && !inCells(oldCells, {row: i, col: j})) {
        newCells.push({row: i, col: j});
      }
      updatedBelief[i][j] = val;
    }
  }
  return {newCells, updatedBelief};
}

export const calculateManhattanDistance = (selectedPos, actualPos) => {
  return Math.abs(selectedPos.row - actualPos.row) + Math.abs(selectedPos.col - actualPos.col);
}

export const inCells = (cells, cell) => {
  if(!cells) return true;
  for(const pos of cells){
    if(pos.row === cell.row && pos.col === cell.col) return true;
  }
  return false;
}

export const calculateBelief = (oldBelief, oldCells, selectedCell, distance) => {
  const newBelief = [];
  const filteredCells = [];
  let totalP = 0;
  for(let i = 0; i < oldBelief.length; i++){
    newBelief[i] = [];
    for(let j = 0; j < oldBelief[i].length; j++){
      let tempDis = calculateManhattanDistance({row: i, col: j}, selectedCell);
      if(tempDis === distance && inCells(oldCells, {row: i, col: j})){
        filteredCells.push({row: i, col: j});
        newBelief[i][j] = (distance + 1) / ((oldBelief.length - 1) * 2 - 1) * oldBelief[i][j];
        totalP += newBelief[i][j];
      } else {
        newBelief[i][j] = 0;
      }
    }
  }

  // normalize
  for(const pos of filteredCells) {
    newBelief[pos.row][pos.col] /= totalP;
  }

  return {filteredCells, newBelief};
}
