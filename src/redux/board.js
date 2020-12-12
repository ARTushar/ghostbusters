import * as ActionTypes from './actiontypes';
import {calculateBelief, calculatePartialBelief, createBoard, getInitialGhostPosition, initiateBelief, moveGhost, calculateManhattanDistance} from '../game-logic/boardUtils';
// import { getValidMoves, isValidMove } from '../game-logic/validMoves';

const defaultBoardSize = 9;
const transitionP = 0.96;

const Board = (state = {
  boardSize: defaultBoardSize,
  board: createBoard(defaultBoardSize),
  ghostPosition: getInitialGhostPosition(defaultBoardSize),
  belief: initiateBelief(defaultBoardSize),
  selectedCell: null,
  filteredCells: null,
  errMess: null
}, action) => {
  switch (action.type) {
    case ActionTypes.START_GAME:
      return {boardSize: action.boardSize, board: createBoard(action.boardSize), belief: initiateBelief(action.boardSize), ghostPosition: getInitialGhostPosition(action.boardSize), selectedCell: null, filteredCells: null, errMess: null};
      
    case ActionTypes.MOVE_GHOST:
      const {newCells, updatedBelief} = calculatePartialBelief(state.belief, state.filteredCells, transitionP);
      return { ...state, ghostPosition: moveGhost(state.board, state.ghostPosition, transitionP), filteredCells: newCells, belief: updatedBelief};
    
    case ActionTypes.SENSE_GHOST:
        const distance = calculateManhattanDistance(action.position, state.ghostPosition);
        const {filteredCells, newBelief} = calculateBelief(state.belief, state.filteredCells, action.position, distance);
        return {
          ...state, belief: newBelief, filteredCells, selectedCell: state.position
        }
    default:
      return state;
  }
}

export default Board;