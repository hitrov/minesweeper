import {
  NEW_GAME_REQUEST,
  NEW_GAME_FAILURE,
  RESET_FLAGGED_REQUEST,
  MAP_REQUEST,
  NEW_GAME_SUCCESS,
  SET_GAME_STATE,
} from '../constants';
import {put, takeLatest} from "redux-saga/effects";
import {ws} from './ws';
import {GameState} from '../reducers/gameState';
import {IBasicAction} from '../reducers';
import {IGameStateAction} from '../reducers/gameState'

export interface iNewGameAction extends IBasicAction {
  level: number
}

const newGameRequest = function* (action: iNewGameAction) {
  try {
    const {level} = action;

    yield put({
      type: RESET_FLAGGED_REQUEST,
    });

    ws.send(`new ${level}`);

  } catch (error) {
    yield put({
      type: NEW_GAME_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const newGameSuccess = function* () {
  try {
    yield put({
      type: MAP_REQUEST,
    });

    yield put({
      type: SET_GAME_STATE,
      gameState: GameState.InProgress,
    } as IGameStateAction);

  } catch (error) {
    yield put({
      type: NEW_GAME_FAILURE,
      message: error.message || 'Something went wrong.',
    });
  }
};

const watchNewGame = function* () {
  yield takeLatest<iNewGameAction>(NEW_GAME_REQUEST, newGameRequest);
  yield takeLatest<IBasicAction>(NEW_GAME_SUCCESS, newGameSuccess);
};

export {
  watchNewGame,
  newGameRequest,
};