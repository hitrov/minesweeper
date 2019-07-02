import {
  OPEN_CELL_REQUEST,
  NEW_GAME_REQUEST,
  TOGGLE_FLAG_REQUEST,
  FLAG_REQUEST,
  RESET_FLAGGED_REQUEST,
  FIND_BOMBS_REQUEST,
  SET_LEVEL,
  FIND_BOMBS_SUCCESS,
} from '../constants';
import {Level} from '../reducers/level';

const openCell = (row: number, col: number) => ({
  type: OPEN_CELL_REQUEST,
  row,
  col,
});

const newGame = (level: number) => {
  return {
    type: NEW_GAME_REQUEST,
    level,
  }
};

const toggleFlag = (row: number, col: number) => {
  return {
    type: TOGGLE_FLAG_REQUEST,
    row,
    col,
  }
};

const flag = (row: number, col: number) => {
  return {
    type: FLAG_REQUEST,
    row,
    col,
  }
};

const resetFlagged = () => {
  return {
    type: RESET_FLAGGED_REQUEST,
  }
};

const findBombs = () => {
  return {
    type: FIND_BOMBS_REQUEST,
  }
};

const stopSolver = () => {
  return {
    type: FIND_BOMBS_SUCCESS,
  }
};

const setLevel = (level: Level) => {
  return {
    type: SET_LEVEL,
    level,
  }
};

export {
  openCell,
  newGame,
  toggleFlag,
  resetFlagged,
  findBombs,
  flag,
  setLevel,
  stopSolver,
};