import * as redux from 'redux'
import createSagaMiddleware from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import * as chains from './chains'
import * as rpcServers from './rpcServers'

export const history = createBrowserHistory()

const rootReducer = redux.combineReducers({
  chains: chains.reducer,
  rpcServers: rpcServers.reducer,
  router: connectRouter(history),
})

export type RootState = ReturnType<typeof rootReducer>

export type RootAction = chains.Action | rpcServers.Action

function* rootSaga() {
  yield spawn(rpcServers.saga)
}

export const store: redux.Store<RootState, RootAction> = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const s = redux.createStore<RootState, RootAction, {}, {}>(
    rootReducer,
    composeWithDevTools({ name: 'b1-test' })(
      redux.applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    ),
  )
  sagaMiddleware.run(rootSaga)
  return s
})()

export { chains }
