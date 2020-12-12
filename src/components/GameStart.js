import { Button, Grid, makeStyles, MenuItem, Modal, Paper, Select, TextField, FormControl, InputLabel, Input } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../redux/actioncreators';


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
    width: '250px',
    minHeight: '300px',
    padding: '10px',
  },
  selectItem: {
    padding: '10px 10px 20px 20px'
  },
  select: {
    minWidth: '100px'
  },
  input: {
    marginLeft: '10px'
  }
}));


function GameStart({isOpen, setIsOpen}) {
  const [boardSize, setBoardSize] = useState(9);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startGame(boardSize));
    setIsOpen(false);
  }

  return (
    <Modal
      open={isOpen}
      className = {classes.modal}
    >
      <Paper elevation={3} className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center">
        <form
          className={classes.root}
          onSubmit={handleSubmit}
        >
          
          <Grid item>
            <TextField
              required
              label='Board Size'
              value={boardSize}
              onChange={e => setBoardSize(e.target.value)}
            />
          </Grid>
          <Grid item align="center">
            <Button 
              size='small'
              type="submit"
              variant="contained"
              color="primary"
            >
              Start Game
            </Button>
          </Grid>
        </form>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default GameStart;
