import React from 'react';
import AdjustIcon from '@material-ui/icons/Adjust';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { highlightAvailableMoves, move } from '../redux/actioncreators';
import { useDispatch, useSelector } from 'react-redux';
import { senseGhost } from '../redux/actioncreators';
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
  let isHighlighted = false;
  let color;

  const handleClick = () => {
    dispatch(senseGhost({row: props.row, col: props.col}));
  }

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className={buttonClassName}
      >
        {props.p.toFixed(3)}
    </Button>
  )
}

export default Cell;
