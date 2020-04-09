import { fork, all } from 'redux-saga/effects';

import dataSagas from './data';

const resultSagasArray = [...dataSagas];

export default function* root() {
  yield all(resultSagasArray.map((saga) => fork(saga)));
}
