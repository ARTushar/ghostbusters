import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Paper, TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { moveGhost } from '../redux/actioncreators';
// import {  finishGame } from '../redux/actioncreators';
// import { getWinner } from '../game-logic/winningLogic';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      // width: '25ch'
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '10px',
    maxWidth: '250px',
    minHeight: '340px'
  },
  customButton: {
    minWidth: '150px',
    marginBottom: '20px'
  }
}));

function GameDisplay({ setIsOpen }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
    // dispatch(finishGame('', 0));
  }

  const handleTransmission = (e) => {
    e.preventDefault();
    dispatch(moveGhost());
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container direction="row" justify="center" alignItems="center">
          <Grid item align="center">
            <Button
              size='small'
              type="submit"
              variant="contained"
              color="primary"
              className={classes.customButton}
              onClick={handleTransmission}
            >
              time + 1
            </Button>
          </Grid>
          <Grid item align="center">
            <Button
              size='small'
              type="submit"
              variant="contained"
              color="primary"
              className={classes.customButton}
            >
              Catch
            </Button>
          </Grid>
          <Grid item align="center">
            <Button
              size='small'
              type="submit"
              variant="contained"
              color="primary"
              className={classes.customButton}
              onClick={handleSubmit}
            >
              Quit
            </Button>
          </Grid>
      </Grid>
    </Paper>
  )
}

export default GameDisplay;
