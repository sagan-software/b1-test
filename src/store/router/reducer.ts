import { Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { RouterAction } from './action'
import { history } from './constants'
import { Router } from './state'

export const routerReducer: Reducer<Router, RouterAction> = connectRouter(
  history,
)
