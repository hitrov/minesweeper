import MineSweeper from '../components/MineSweeper';
import {connect} from 'react-redux';
import {
  openCell,
  newGame,
  toggleFlag,
  resetFlagged,
  findBombs,
  setLevel,
  stopSolver,
} from '../actions';
import {RootState} from '../reducers';

const App = connect((state: RootState) => ({
  level: state.level,
  rows: state.rows,
  gameState: state.gameState,
  isSearchingBombs: state.isSearchingBombs,
  solverNeedsAssistance: state.solverNeedsAssistance,
}), {
  openCell,
  newGame,
  toggleFlag,
  resetFlagged,
  findBombs,
  setLevel,
  stopSolver,
})(MineSweeper);

export default App;
