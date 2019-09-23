import {
  Action,
  ActionType,
  GetInfoAction,
  GetInfoOkAction,
  GetInfoErrAction,
} from './actions'
import { defaultState, State, RpcServerStatus, RpcServer } from './state'

export function reducer(
  state: Readonly<State> = defaultState,
  action: Readonly<Action>,
): Readonly<State> {
  switch (action.type) {
  case ActionType.GetInfo:
    return onGetInfo(state, action)
  case ActionType.GetInfoOk:
    return onGetInfoOk(state, action)
  case ActionType.GetInfoErr:
    return onGetInfoErr(state, action)
  default:
    return state
  }
}
function onGetInfo(
  state: Readonly<State>,
  action: Readonly<GetInfoAction>,
): Readonly<State> {
  return {
    ...state,
    [action.url]: {
      status: RpcServerStatus.Loading,
      url: action.url,
    },
  }
}

function onGetInfoOk(
  state: Readonly<State>,
  action: Readonly<GetInfoOkAction>,
): Readonly<State> {
  return {
    ...state,
    [action.url]: {
      status: RpcServerStatus.Ok,
      url: action.url,
      chainId: action.info.chain_id,
      ping: action.ping,
    },
  }
}

function onGetInfoErr(
  state: Readonly<State>,
  action: Readonly<GetInfoErrAction>,
): Readonly<State> {
  return {
    ...state,
    [action.url]: {
      status: RpcServerStatus.Err,
      url: action.url,
    },
  }
}
