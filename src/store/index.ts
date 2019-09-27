import { Store, createStore, applyMiddleware } from 'redux'
import * as reactRedux from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Action } from '../actions'
import { State } from '../state'
import { reducer } from './reducer'
import { saga } from './sagas'

export const store: Store<State, Action> = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const s = createStore<State, Action, {}, {}>(
    reducer,
    composeWithDevTools({ name: 'b1-test' })(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(saga)
  return s
})()

export const useDispatch = () =>
  reactRedux.useDispatch<typeof store.dispatch>()
