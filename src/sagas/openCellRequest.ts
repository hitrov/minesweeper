import {
  MAP_REQUEST,
  OPEN_CELL_REQUEST,
  OPEN_CELL_SUCCESS,
  OPEN_CELL_FAILURE,
} from '../constants';
import {put, takeLatest, select} from "redux-saga/effects";
import {ws} from './ws';
import {skipNextMapUpdate as skipNextMapUpdateSelector} from '../selectors';
import {IBasicAction} from '../reducers';

export interface IOpenCellAction extends IBasicAction {
  row: number;
  col: number;
}

const openCellRequest = function* (action: IOpenCellAction) {
  const {row, col} = action;

  yield ws.send(`open ${col} ${row}`);
};

const openCellSuccess = function* () {
  const skipNextMapUpdate = yield select(skipNextMapUpdateSelector);
  try {
    if (!skipNextMapUpdate) {
      yield put({
        type: MAP_REQUEST,
      });
    }
  } catch (error) {
    yield put({
      type: OPEN_CELL_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const watchOpenCell = function* () {
  yield takeLatest<IOpenCellAction>(OPEN_CELL_REQUEST, openCellRequest);
  yield takeLatest<IBasicAction>(OPEN_CELL_SUCCESS, openCellSuccess);
};

export {
  watchOpenCell,
  openCellRequest,
};