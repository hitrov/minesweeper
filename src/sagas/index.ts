import {watchMap} from './handleMap';
import {watchOpenCell} from './openCellRequest';
import {watchNewGame} from './newGameRequest';
import {watchToggleFlag} from './rows';
import {watchFindBombs} from './solver';
import {fork, all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(watchMap),
    fork(watchOpenCell),
    fork(watchNewGame),
    fork(watchToggleFlag),
    fork(watchFindBombs),
  ]);
}
