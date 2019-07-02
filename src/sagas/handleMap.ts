import {
  MAP_REQUEST,
  MAP_SUCCESS,
  MAP_FAILURE,

  MAP_MESSAGE_REQUEST,
  MAP_MESSAGE_SUCCESS,
  MAP_MESSAGE_FAILURE,
} from '../constants';
import {put, takeLatest} from "redux-saga/effects";
import {ws} from './ws';
import {IBasicAction} from '../reducers';

export interface IMapAction extends IBasicAction {
  response: string;
}

const map = function* () {
  try {
    ws.send('map');

    yield put({
      type: MAP_SUCCESS,
    });

  } catch (error) {
    yield put({
      type: MAP_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const handleMap = function* (action: IMapAction) {
  try {
    const {response} = action;

    yield put({
      type: MAP_MESSAGE_SUCCESS,
      response,
    });

  } catch (error) {
    yield put({
      type: MAP_MESSAGE_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const watchMap = function* () {
  yield takeLatest<IMapAction>(MAP_MESSAGE_REQUEST, handleMap);
  yield takeLatest<IBasicAction>(MAP_REQUEST, map);
};

export {
  watchMap,
  handleMap,
};