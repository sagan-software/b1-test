import {
  Action,
  ActionType,
  SetUrl,
  SetAutoplay,
  SetMaxBlockCount,
  FetchInfo,
  FetchedInfo,
  FetchBlock,
  FetchedBlock,
  SetTheme,
} from './actions'
import {
  defaultState,
  State,
  remoteDataDefault,
  RemoteDataStatus,
  remoteDataLoading,
  remoteDataUpdating,
  RpcServerStatus,
  RpcServerErrorType,
} from './state'

export function reducer(
  state: Readonly<State> = defaultState,
  action: Readonly<Action>,
): Readonly<State> {
  switch (action.type) {
  case ActionType.SetUrl:
    return onSetUrl(state, action)
  case ActionType.SetAutoplay:
    return onSetAutoplay(state, action)
  case ActionType.SetMaxBlockCount:
    return onSetMaxBlockCount(state, action)
  case ActionType.FetchInfo:
    return onFetchInfo(state, action)
  case ActionType.FetchedInfo:
    return onFetchedInfo(state, action)
  case ActionType.FetchBlock:
    return onFetchBlock(state, action)
  case ActionType.FetchedBlock:
    return onFetchedBlock(state, action)
  case ActionType.SetTheme:
    return onSetTheme(state, action)
  default:
    return state
  }
}

function onSetUrl(
  state: Readonly<State>,
  action: Readonly<SetUrl>,
): Readonly<State> {
  let url: URL
  try {
    url = new URL(action.input)
  } catch (e) {
    return {
      ...state,
      server: {
        status: RpcServerStatus.InvalidUrl,
        errorType: RpcServerErrorType.NotUrl,
        input: action.input,
      },
    }
  }

  if (url.protocol !== 'https:') {
    return {
      ...state,
      server: {
        status: RpcServerStatus.InvalidUrl,
        errorType: RpcServerErrorType.NotHttps,
        input: action.input,
      },
    }
  }

  return {
    ...state,
    server: {
      status: RpcServerStatus.ValidUrl,
      input: action.input,
      url,
      info: remoteDataDefault(),
      blocks: {},
    },
  }
}

function onSetAutoplay(
  state: Readonly<State>,
  action: Readonly<SetAutoplay>,
): Readonly<State> {
  return {
    ...state,
    autoplay: action.autoplay,
  }
}

function onSetMaxBlockCount(
  state: Readonly<State>,
  action: Readonly<SetMaxBlockCount>,
): Readonly<State> {
  // TODO
  return state
}

function onFetchInfo(
  state: Readonly<State>,
  action: Readonly<FetchInfo>,
): Readonly<State> {
  if (state.server.status === RpcServerStatus.ValidUrl) {
    switch (state.server.info.status) {
    case RemoteDataStatus.Error:
    case RemoteDataStatus.Default:
      return {
          ...state,
          server: {
            ...state.server,
            info: remoteDataLoading(),
          },
        }
    case RemoteDataStatus.Ok:
      return {
          ...state,
          server: {
            ...state.server,
            info: remoteDataUpdating(state.server.info.data),
          },
        }
    default:
      return state
    }
  } else {
    return state
  }
}

function onFetchedInfo(
  state: Readonly<State>,
  action: Readonly<FetchedInfo>,
): Readonly<State> {
  if (state.server.status === RpcServerStatus.ValidUrl) {
    return {
      ...state,
      server: {
        ...state.server,
        info: action.info,
      },
    }
  } else {
    return state
  }
}

function onFetchBlock(
  state: Readonly<State>,
  action: Readonly<FetchBlock>,
): Readonly<State> {
  if (state.server.status === RpcServerStatus.ValidUrl) {
    let block = state.server.blocks[action.blockNum]
    if (block) {
      switch (block.status) {
      case RemoteDataStatus.Error:
      case RemoteDataStatus.Default:
        block = remoteDataLoading()
        break
      case RemoteDataStatus.Updating:
      case RemoteDataStatus.Ok:
        block = remoteDataUpdating(block.data)
        break
      }
    } else {
      block = remoteDataLoading()
    }
    return {
      ...state,
      server: {
        ...state.server,
        blocks: {
          ...state.server.blocks,
          [action.blockNum]: block,
        },
      },
    }
  } else {
    return state
  }
}

function onFetchedBlock(
  state: Readonly<State>,
  action: Readonly<FetchedBlock>,
): Readonly<State> {
  if (state.server.status === RpcServerStatus.ValidUrl) {
    return {
      ...state,
      server: {
        ...state.server,
        blocks: {
          ...state.server.blocks,
          [action.blockNum]: action.block,
        },
      },
    }
  } else {
    return state
  }
}

function onSetTheme(
  state: Readonly<State>,
  action: Readonly<SetTheme>,
): Readonly<State> {
  return {
    ...state,
    theme: action.theme,
  }
}
