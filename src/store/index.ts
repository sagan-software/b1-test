import { Store, Dispatch, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
  useDispatch as useDispatchInner,
  useSelector as useSelectorInner,
  useStore as useStoreInner,
} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Action } from './actions'
import { reducer } from './reducer'
import { saga } from './saga'
import { State } from './state'

export const store: Store<State, Action> = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const innerStore = createStore(
    reducer,
    composeWithDevTools({ name: 'b1-test' })(applyMiddleware(sagaMiddleware)),
  )
  sagaMiddleware.run(saga)
  return innerStore
})()

export function useDispatch(): Dispatch<Action> {
  return useDispatchInner<typeof store.dispatch>()
}

export function useSelector<T>(
  selector: (state: State) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  return useSelectorInner(selector, equalityFn)
}

export function useStore(): Store<State, Action> {
  return useStoreInner()
}

export function useState(): State {
  return useSelector((s) => s)
}

export * from './actions'
export * from './actionCreators'
export * from './selectors'
export * from './state'
