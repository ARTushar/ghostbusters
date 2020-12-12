import * as ActionTypes from './actiontypes';
import {calculateBelief, calculatePartialBelief, createBoard, getInitialGhostPosition, initiateBelief, moveGhost, calculateManhattanDistance} from '../game-logic/boardUtils';
// import { getValidMoves, isValidMove } from '../game-logic/validMoves';

const defaultBoardSize = 9;
const transitionP = 0.96;
const near = 2;
const far = 7;

const Board = (state = {
  boardSize: defaultBoardSize,
  board: createBoard(defaultBoardSize),
  ghostPosition: getInitialGhostPosition(defaultBoardSize),
  belief: initiateBelief(defaultBoardSize),
  selectedCell: null,
  filteredCells: null,
  catchMode: false,
  hit: 0,
  selectedCellColor: null,
  errMess: null
}, action) => {
  switch (action.type) {
    case ActionTypes.START_GAME:
      return {
        boardSize: action.boardSize,
        board: createBoard(action.boardSize),
        belief: initiateBelief(action.boardSize), 
        ghostPosition: getInitialGhostPosition(action.boardSize), 
        selectedCell: null, 
        filteredCells: null, 
        catchMode: false, 
        hit: 0,
        errMess: null
        };

    case ActionTypes.MOVE_GHOST:
      const {newCells, updatedBelief} = calculatePartialBelief(state.belief, state.filteredCells, transitionP);
      return { 
        ...state, 
        ghostPosition: moveGhost(state.board, state.ghostPosition, transitionP), 
        filteredCells: newCells, 
        belief: updatedBelief
      };
    
    case ActionTypes.SENSE_GHOST:
        const distance = calculateManhattanDistance(action.position, state.ghostPosition);
        const selectedCellColor = (distance <= near)? "red": (distance >= far ? "green": "orange");
        const {filteredCells, newBelief} = calculateBelief(state.belief, state.filteredCells, action.position, distance);
        return {
          ...state, 
          belief: newBelief, 
          filteredCells, 
          selectedCell: action.position,
          selectedCellColor,
          currentDistance: distance
        }
      
    case ActionTypes.CATCH_GHOST:
      return {
        ...state, 
        catchMode: action.payload 
      }
    
    case ActionTypes.SET_HIT:
      return {
        ...state,
        hit: action.payload
      }
    default:
      return state;
  }
}

export default Board;