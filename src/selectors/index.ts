import {CellItem} from "../components/MineSweeper";
import {RootState} from '../reducers';

export const getPrevFlaggedValue = (row: number, col: number) => (state: CellItem[][]): boolean =>
  state[row] &&
  state[row][col] &&
  !!state[row][col].flagged;

export const rows = (state: RootState) => state.rows;
export const gameState = (state: RootState) => state.gameState;
export const skipNextMapUpdate = (state: RootState) => state.skipNextMapUpdate;
export const isSearchingBombs = (state: RootState) => state.isSearchingBombs;
