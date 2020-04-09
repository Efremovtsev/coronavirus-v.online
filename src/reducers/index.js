import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import data from './data';

const rootReducer = combineReducers({ data });

export default function createReduxStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
  });
  // @ts-ignore
  store.runSaga = sagaMiddleware.run;

  return store;
}
