import * as redux from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Action } from './actions'
import { State } from './state'
import { reducer } from './reducer'
import { saga } from './sagas'

export const store: redux.Store<State, Action> = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const s = redux.createStore<State, Action, {}, {}>(
    reducer,
    composeWithDevTools({ name: 'b1-test' })(
      redux.applyMiddleware(sagaMiddleware),
    ),
  )
  sagaMiddleware.run(saga)
  return s
})()

export * from './selectors'
export * from './state'
export * from './actions'
