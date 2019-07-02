import {take, call, put} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {
  MAP_MESSAGE_REQUEST,
  WEBSOCKET_URL,
  OPEN_CELL_SUCCESS,
  NEW_GAME_SUCCESS,
  MAP_REQUEST,
  SET_GAME_STATE,
  FIND_BOMBS_SUCCESS, SOLVER_NEEDS_ASSISTANCE,
} from '../constants';
import {GameState, IGameStateAction} from '../reducers/gameState';
import {iSolverNeedsAssistanceAction} from '../reducers/solverNeedsAssistance';

export let ws: WebSocket;

function initWebsocket() {
  return eventChannel(emitter => {
    ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
      console.log("[open] Connection established, send -> server");
      ws.send('help')
    };
    ws.onerror = (error) => {
      alert('WebSocket error ' + error)
    };
    ws.onmessage = (e) => {
      const response = e.data;
      console.log(response);

      if (response.indexOf('open: OK') !== -1) {
        emitter({
          type: SOLVER_NEEDS_ASSISTANCE,
          needs: false,
        } as iSolverNeedsAssistanceAction);

        return emitter({type: OPEN_CELL_SUCCESS})
      }

      // new: OK
      if (response.indexOf('new: OK') !== -1) {
        emitter({type: FIND_BOMBS_SUCCESS});

        return emitter({type: NEW_GAME_SUCCESS});
      }

      if (response.indexOf('You lose') !== -1) {
        // Game over

        emitter({type: SET_GAME_STATE, gameState: GameState.Lost} as IGameStateAction);
        emitter({type: SOLVER_NEEDS_ASSISTANCE, needs: false } as iSolverNeedsAssistanceAction);
        emitter({type: FIND_BOMBS_SUCCESS });

        return emitter({type: MAP_REQUEST});
      }

      if (response.indexOf('You win') !== -1) {
        // Won

        emitter({type: MAP_REQUEST});
        emitter({type: FIND_BOMBS_SUCCESS });
        emitter({type: SOLVER_NEEDS_ASSISTANCE, needs: false } as iSolverNeedsAssistanceAction);

        return emitter({type: SET_GAME_STATE, gameState: GameState.Won} as IGameStateAction);
      }

      const mapRegex = /map:\n/;
      if (mapRegex.test(response)) {
        return emitter({type: MAP_MESSAGE_REQUEST, response})
      }
    };

    // unsubscribe function
    return () => {
      console.log('Socket off')
    }
  })
}

export default function* wsSagas() {
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action)
  }
}