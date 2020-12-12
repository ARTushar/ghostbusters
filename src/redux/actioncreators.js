import * as ActionTypes from './actiontypes';
/**
 * board
 */

export const startGame = (boardSize) => ({
  type: ActionTypes.START_GAME,
  boardSize
});


export const moveGhost = () => ({
  type: ActionTypes.MOVE_GHOST
});

export const senseGhost = (position) => ({
  type: ActionTypes.SENSE_GHOST,
  position
});

export const catchGhost = (payload) => ({
  type: ActionTypes.CATCH_GHOST,
  payload
});

export const setHit = (payload) => ({
  type: ActionTypes.SET_HIT,
  payload
})