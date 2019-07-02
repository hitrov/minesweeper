import {call, put, takeLatest, select, all} from 'redux-saga/effects';
import {
  rows as rowsSelector,
  gameState as gameStateSelector,
  isSearchingBombs as isSearchingBombsSelector,
} from '../selectors';
import {
  FIND_BOMBS_REQUEST,
  FIND_BOMBS_FAILURE,
  FLAG_REQUEST,
  OPEN_CELL_REQUEST,
  SOLVER_NEEDS_ASSISTANCE,
} from '../constants';
import {CellItem, MapItem, notExposedValue} from '../components/MineSweeper';
import {GameState} from '../reducers/gameState';
import {IBasicAction} from '../reducers';
import {IOpenCellAction} from './openCellRequest';
import {iSolverNeedsAssistanceAction} from '../reducers/solverNeedsAssistance';

const onlyUnique = (value: any, index: number, self: any) => self.indexOf(value) === index;

const filterUnexposed = (mapItem: MapItem) => mapItem.item === notExposedValue;
const filterExposed = (mapItem: MapItem) => mapItem.item !== notExposedValue;

// if the "number" on exposed cell is equals
// to the number of unexposed neighbors,
// it means all of neighbors are bombs
const findBasic = (rows: CellItem[][]): MapItem[] => {
  const bombs: MapItem[] = [];

  rows.forEach(row => {
    row
      .filter(filterExposed)
      .forEach(cellItem => {
        const unexposedNeighbors = cellItem.neighbors
          .filter(filterUnexposed);

        const unexposedNeighborsLength = unexposedNeighbors.length;

        if (unexposedNeighborsLength === Number(cellItem.item)) {
          bombs.push(...unexposedNeighbors);
        }
      });
  });

  return bombs.filter(onlyUnique);
};

function* flagItem(mapItem: MapItem) {
  const {row, col} = mapItem;
  yield put({
    type: FLAG_REQUEST,
    row,
    col,
  });
}

// function* openRandomCell (row: CellItem[]) {
//   const unexposed = row.find(cellItem => cellItem.item === notExposedValue);
//
//   if (unexposed) {
//     yield put({
//       type: OPEN_CELL_REQUEST,
//       row: unexposed.row,
//       col: unexposed.col,
//     });
//
//     yield put({
//       type: NEED_RANDOM_CELL,
//       need: false,
//     });
//   }
// }

// const rand = (myArray: any[]): any => myArray[Math.floor(Math.random() * myArray.length)];

function* openItem(mapItem: MapItem) {
  const {row, col} = mapItem;
  yield put({
    type: OPEN_CELL_REQUEST,
    row,
    col,
  } as IOpenCellAction);
}

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// if the "number" on exposed cell is equals
// to the number of flagged neighbors,
// it means the rest of neighbors are safe.
const findSafe = (rows: CellItem[][]): MapItem[] => {
  const safe: MapItem[] = [];

  rows.forEach(row => {
    row.forEach(cellItem => {

      const unflaggedNotExposedNeighbors = cellItem.neighbors
        .filter(mapItem => {
          const ci = rows[mapItem.row][mapItem.col];

          return !ci.flagged && ci.item === notExposedValue;
        });

      const flaggedNotExposedNeighbors = cellItem.neighbors
        .filter(mapItem => {
          const ci = rows[mapItem.row][mapItem.col];

          return ci.flagged && ci.item === notExposedValue;
        });

      if (flaggedNotExposedNeighbors.length === Number(cellItem.item)) {
        safe.push(...unflaggedNotExposedNeighbors);
      }
    });
  });

  return safe.filter(onlyUnique);
};

const findBombs = function* () {
  try {
    let gameState: GameState;
    let isSearchingBombs: boolean;
    let rows: CellItem[][] = yield select(rowsSelector);

    if (rows[0][0].item === notExposedValue) {
      yield put({
        type: OPEN_CELL_REQUEST,
        row: 0,
        col: 0,
      });
    }

    let unsuccessfulIterations: number = 0;

    do {
      rows = yield select(rowsSelector);
      isSearchingBombs = yield select(isSearchingBombsSelector);

      const bombs = findBasic(rows);

      yield all(bombs.map(item => call(flagItem, item)));

      rows = yield select(rowsSelector);
      const safe = findSafe(rows);
      console.log('safe', safe);

      if (safe.length) {
        unsuccessfulIterations = 0;
        yield put({
          type: SOLVER_NEEDS_ASSISTANCE,
          needs: false,
        } as iSolverNeedsAssistanceAction);

        // yield put({
        //   type: SKIP_NEXT_MAP_UPDATE,
        //   skip: true,
        // } as ISkipNextMapUpdateAction);

        yield all(safe.map(item => call(openItem, item)));

        // yield put({
        //   type: SKIP_NEXT_MAP_UPDATE,
        //   skip: false,
        // } as ISkipNextMapUpdateAction);
      } else {
        unsuccessfulIterations++;
        if (unsuccessfulIterations >= 3) {
          yield put({
            type: SOLVER_NEEDS_ASSISTANCE,
            needs: true,
          } as iSolverNeedsAssistanceAction);
        }

        // const row = rows && rows.find(
        //   row => row && row.find(cellItem => cellItem.item === notExposedValue)
        // );
        //
        // const unexposed = row && row.find(cellItem => cellItem.item === notExposedValue);
        //
        // if (!unexposed) {
        //   yield sleep(2000);
        //
        //   continue;
        // }
        //
        // // yield all(rows.map(row => call(openRandomCell, row)));
        //
        // yield put({
        //   type: OPEN_CELL_REQUEST,
        //   row: unexposed.row,
        //   col: unexposed.col,
        // });
      }

      gameState = yield select(gameStateSelector);

      yield call(sleep, 2000);

    } while (isSearchingBombs && gameState === GameState.InProgress);

  } catch (error) {
    yield put({
      type: FIND_BOMBS_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

export const watchFindBombs = function* () {
  yield takeLatest<IBasicAction>(FIND_BOMBS_REQUEST, findBombs);
};