import {
  MAP_MESSAGE_SUCCESS,
  TOGGLE_FLAG_SUCCESS,
  FLAG_SUCCESS,
  RESET_FLAGGED_SUCCESS,
} from '../constants';
import {getPrevFlaggedValue} from '../selectors';
import {CellItem, MapItem} from "../components/MineSweeper";
import {IBasicAction} from './index';

const getNeighbors = (rows: MapItem[][], row: number, col: number): MapItem[] => {
  let neighbors: MapItem[] = [];
  for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
    for (let colIndex = col - 1; colIndex <= col + 1; colIndex++) {

      if (rows[rowIndex]) {
        let mapItem = rows[rowIndex][colIndex];
        if (mapItem && !(row === rowIndex && col === colIndex)) {
          neighbors.push(mapItem);
        }
      }
    }
  }

  return neighbors;
};

export interface IRowsAction extends IBasicAction {
  response: string;
  row: number;
  col: number;
}

const rows = (state: CellItem[][] = [], action: IRowsAction) => {
  switch (action.type) {
    case MAP_MESSAGE_SUCCESS:
      const mapRegex = /map:\n/;
      const mapString: string = action.response.replace(mapRegex, '');

      const grid = mapString.split('\n').map(row => row.split(''));

      let mapRows = grid.map((row, rowIndex) => {
        return row.map((col, colIndex) => ({
          row: rowIndex,
          col: colIndex,
          item: col,
        } as MapItem))
      });

      const rows: CellItem[][] = mapRows
        .filter(mapRow => mapRow.length)
        .map((mapRow, rowIndex) => {

          return mapRow.map((mapItem, colIndex) => {
            // debugger;
            return {
              ...mapItem,
              neighbors: getNeighbors(mapRows, rowIndex, colIndex),
              flagged: getPrevFlaggedValue(rowIndex, colIndex)(state) || false,
            }
          })
        });

      return rows;

    case TOGGLE_FLAG_SUCCESS:
    case FLAG_SUCCESS:
      let output = {
        ...state,
        [action.row]: {
          ...state[action.row],
          [action.col]: {
            ...state[action.row][action.col],
            flagged: action.type === FLAG_SUCCESS ? true : !state[action.row][action.col].flagged,
          },
        }
      };

      output = Object.values(output).map(Object.values);

      return output;

    case RESET_FLAGGED_SUCCESS:
      return state.map(rows =>
        rows.map(cellItem => ({
          ...cellItem,
          flagged: false,
        }))
      );

    default:
      return state;
  }
};

export default rows;