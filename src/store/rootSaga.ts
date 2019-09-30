import { fork } from 'redux-saga/effects'
import { chainSaga } from './chain/saga'

export function* rootSaga() {
  yield fork(chainSaga)
}

export * from './chain/saga'
