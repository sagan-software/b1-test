import { Store, Dispatch, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
  useDispatch as useDispatchInner,
  useSelector as useSelectorInner,
} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as action from './rootAction'
import * as constants from './rootConstants'
import * as reducer from './rootReducer'
import * as saga from './rootSaga'
import * as selectors from './rootSelectors'
import * as state from './rootState'

export const store: Store<state.RootState, action.RootAction> = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const innerStore = createStore(
    reducer.rootReducer,
    composeWithDevTools({ name: 'b1-test' })(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(saga.rootSaga)
  return innerStore
})()

export function useDispatch(): Dispatch<action.RootAction> {
  return useDispatchInner<typeof store.dispatch>()
}

export function useSelector<T>(
  selector: (state: state.RootState) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  return useSelectorInner(selector, equalityFn)
}

export { action, constants, saga, selectors, state }
