import {createStore, applyMiddleware, Store, Middleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer, {RootState} from './reducers';
import rootSaga from "./sagas";
import wsSagas from "./sagas/ws";
import createSagaMiddleware from 'redux-saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({
      // diff: true,
    }));
  }

  const persistedState = {
    rows: [],
  };

  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...middlewares)
  ) as Store<RootState>;

  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(wsSagas);

  return store;
};

export default configureStore;
