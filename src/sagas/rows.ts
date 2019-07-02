import {
  TOGGLE_FLAG_REQUEST,
  TOGGLE_FLAG_SUCCESS,
  TOGGLE_FLAG_FAILURE,

  FLAG_REQUEST,
  FLAG_SUCCESS,
  FLAG_FAILURE,

  RESET_FLAGGED_REQUEST,
  RESET_FLAGGED_SUCCESS,
  RESET_FLAGGED_FAILURE,
} from '../constants';
import {put, takeLatest} from "redux-saga/effects";
import {IBasicAction} from '../reducers';

export interface IFlagAction extends IBasicAction {
  row: number;
  col: number;
}

const toggleFlag = function* (action: IFlagAction) {
  try {
    const {row, col} = action;

    yield put({
      type: TOGGLE_FLAG_SUCCESS,
      row,
      col,
    });

  } catch (error) {
    yield put({
      type: TOGGLE_FLAG_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const flag = function* (action: IFlagAction) {
  try {
    const {row, col} = action;

    yield put({
      type: FLAG_SUCCESS,
      row,
      col,
    });

  } catch (error) {
    yield put({
      type: FLAG_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const resetFlagged = function* () {
  try {
    yield put({
      type: RESET_FLAGGED_SUCCESS,
    });

  } catch (error) {
    yield put({
      type: RESET_FLAGGED_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const watchToggleFlag = function* () {
  yield takeLatest<IFlagAction>(TOGGLE_FLAG_REQUEST, toggleFlag);
  yield takeLatest<IFlagAction>(FLAG_REQUEST, flag);
  yield takeLatest<IBasicAction>(RESET_FLAGGED_REQUEST, resetFlagged);
};

export {
  watchToggleFlag,
};