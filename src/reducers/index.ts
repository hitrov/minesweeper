import {combineReducers} from 'redux';
import rows from './rows';
import isSearchingBombs from './isSearchingBombs';
import gameState, {GameState} from './gameState';
import skipNextMapUpdate from './skipNextMapUpdate';
import solverNeedsAssistance from './solverNeedsAssistance';
import errorMessage from './errorMessage';
import level, {Level} from './level';
import {CellItem} from '../components/MineSweeper';

export interface RootState {
  rows: CellItem[][];
  isSearchingBombs: boolean;
  gameState: GameState;
  skipNextMapUpdate: boolean;
  solverNeedsAssistance: boolean;
  level: Level;
  errorMessage: string;
}

export interface IBasicAction {
  type: string;
}

const reducer = combineReducers<RootState>({
  rows,
  isSearchingBombs,
  gameState,
  level,
  skipNextMapUpdate,
  errorMessage,
  solverNeedsAssistance,
});

export default reducer;