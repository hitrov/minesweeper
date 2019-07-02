import React, {Component} from 'react';
import Cell from '../Cell';
import './index.scss';
import {GameState} from '../../reducers/gameState';
import {Level} from '../../reducers/level';
import Solver from '../Solver';

export const notExposedValue = '□';

export interface Initiator {
  row: number;
  col: number;
  isPlayer?: boolean;
}

export interface Move {
  row: number;
  col: number;
  initiator: Initiator;
}

export interface CellItem extends MapItem {
  neighbors: MapItem[];
  flagged: boolean;
}

export interface MapItem {
  row: number;
  col: number;
  item: string;
}

interface IProps {
  level: number;
  rows: CellItem[][],
  gameState: GameState;
  isSearchingBombs: boolean;
  solverNeedsAssistance: boolean;

  newGame(level: number): void;

  openCell(row: number, col: number): void;

  toggleFlag(row: number, col: number): void;

  resetFlagged(): void;

  findBombs(): void;

  setLevel(level: Level): void;

  stopSolver(): void;
}

interface IState {
  showField: boolean;
}

class MineSweeper extends Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    showField: true,
  };

  onLevelChange = (e: any) => this.props.setLevel(e.target.value as Level);

  newGame = () => {
    this.props.newGame(this.props.level);
  };

  makeMove = (move: Move) => {
    console.log(`opening: row: ${move.row}, col: ${move.col}`);
    console.log(`initiator: row: ${move.initiator.row}, col: ${move.initiator.col} ${move.initiator.isPlayer && '#########'}`);

    this.props.openCell(move.row, move.col);
  };

  toggleFlag = (row: number, col: number, value: any, initiator: Initiator) => {
    console.log(`flagging: row: ${row}, col: ${col}, value: ${value}`);
    console.log(`initiator: row: ${initiator.row}, col: ${initiator.col} ${initiator.isPlayer && '#########'}`);

    this.props.toggleFlag(row, col);
  };

  toggleInterface = () => {
    this.setState(prevState => ({
      showField: !prevState.showField,
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleInterface}>Toggle interface</button>
        <button onClick={this.props.resetFlagged}>Reset flagged</button>
        <Solver
          isSearchingBombs={this.props.isSearchingBombs}
          findBombs={this.props.findBombs}
          stopSolver={this.props.stopSolver}
          gameState={this.props.gameState}
          solverNeedsAssistance={this.props.solverNeedsAssistance}
        />

        <div>
          <input
            onChange={this.onLevelChange}
            type="number"
            min={Level.One}
            max={Level.Four}
            value={this.props.level}
          />
          <button onClick={this.newGame}>New game</button>
        </div>
        {this.state.showField &&
        <div>
          <h1>Game state: {this.props.gameState}
          </h1>

          {this.props.rows.map((row, rowIndex) =>
            <div className='minesweeper' key={rowIndex}>
              {row.map(cellItem =>
                <Cell
                  key={cellItem.col}
                  onCellClick={this.makeMove}
                  onFlagClick={this.toggleFlag}
                  cellItem={cellItem}
                  disabled={false}
                />
              )}
            </div>
          )}
        </div>}
      </div>
    );
  }
}

export default MineSweeper;
