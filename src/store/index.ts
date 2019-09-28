import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as action from './rootAction'
import * as constants from './rootConstants'
import * as reducer from './rootReducer'
import * as selectors from './rootSelectors'
import * as state from './rootState'
// import { saga } from './sagas'

export const store: Store<state.RootState, action.RootAction> = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const innerStore = createStore(
    reducer.rootReducer,
    composeWithDevTools({ name: 'b1-test' })(applyMiddleware(sagaMiddleware)),
  )
  // sagaMiddleware.run(saga)
  return innerStore
})()

export { action, constants, selectors, state }
