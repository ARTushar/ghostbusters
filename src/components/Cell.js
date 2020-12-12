import React, { useState } from 'react';
import AdjustIcon from '@material-ui/icons/Adjust';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { highlightAvailableMoves, move } from '../redux/actioncreators';
import { useDispatch, useSelector } from 'react-redux';
import { catchGhost, senseGhost, setHit } from '../redux/actioncreators';
import { inCells } from '../game-logic/boardUtils';
// import { getValidMoves } from '../game-logic/validMoves';

const useStyles = makeStyles((theme) => ({
  cellButton: {
    maxWidth: '50px',
    maxHeight: '50px',
    minWidth: '50px',
    minHeight: '50px',
  },
  cellHighlightButton: {
    maxWidth: '50px',
    maxHeight: '50px',
    minWidth: '50px',
    minHeight: '50px',
    border: '1px solid aliceBlue',
    borderRadius: '2px',
    backgroundColor: '#ABEBC6'
  }
}));

// const inCells = (cells, row, col) => {
//   if(!cells) return false;
//   let found = false;
//   cells.map(cell => {
//     if(cell.row === row && cell.col === col)
//       found = true;
//   })
//   return found;
// }

function Cell(props) {
  const classes = useStyles();
  let buttonClassName = classes.cellButton;
  const dispatch = useDispatch();
  const { selectedCell, selectedCellColor, filteredCells, catchMode, ghostPosition } = useSelector(state => state.board);
  let color;
  if(inCells(filteredCells, {row: props.row, col: props.col})){
    color = "primary";
  }
  if(selectedCell && selectedCell.row == props.row && selectedCell.col == props.col) {
    if(selectedCellColor === 'red') color = "secondary";
    else if(selectedCellColor === 'orange') color = "primary";
  }

  const [message, setMessage] = useState('');

  const handleClick = () => {
    if(!catchMode){
      dispatch(senseGhost({row: props.row, col: props.col}));
    } else {
      dispatch(catchGhost(false));
      if(ghostPosition.row === props.row && ghostPosition.col === props.col){
        dispatch(setHit(1));
      } else {
        dispatch(setHit(2));
      }
    }
  }

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className={buttonClassName}
      color={color}
      >
        {message.length == 0? props.p.toFixed(3): message}
    </Button>
  )
}

export default Cell;
