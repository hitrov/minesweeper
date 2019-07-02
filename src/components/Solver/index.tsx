import React from 'react';
import {GameState} from '../../reducers/gameState';

interface IProps {
  gameState: GameState;
  isSearchingBombs: boolean;
  solverNeedsAssistance: boolean;

  findBombs(): void;

  stopSolver(): void;
}

const Solver = ({isSearchingBombs, findBombs, stopSolver, gameState, solverNeedsAssistance}: IProps) => {
  if (isSearchingBombs) {
    return (
      <>
        <button onClick={stopSolver}>Stop solver</button>
        {solverNeedsAssistance && <span>Solver needs assistance, please click any unexposed cell to proceed</span>}
      </>
    );
  }

  if (gameState === GameState.InProgress) {
    return <button onClick={findBombs}>Start solver</button>
  }

  return null;
};

export default Solver;