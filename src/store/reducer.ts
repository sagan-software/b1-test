import {
  Action,
  ActionType,
  UrlInput,
  SetAutoplay,
  SetMaxBlockCount,
  SetTheme,
  GetInfoRequest,
  GetInfoResponse,
  GetBlockRequest,
  GetBlockResponse,
} from '../actions/actionTypes'
import {
  defaultState,
  State,
  getInfoData,
  RemoteDataType,
  remoteDataLoading,
  remoteDataSuccess,
  getBlockData,
} from '../state'

export function reducer(
  state: Readonly<State> = defaultState,
  action: Readonly<Action>,
): Readonly<State> {
  switch (action.type) {
  case ActionType.UrlInput:
    return onUrlInput(state, action)
  case ActionType.SetAutoplay:
    return onSetAutoplay(state, action)
  case ActionType.SetMaxBlockCount:
    return onSetMaxBlockCount(state, action)
  case ActionType.SetTheme:
    return onSetTheme(state, action)
  case ActionType.GetInfoRequest:
    return onGetInfoRequest(state, action)
  case ActionType.GetInfoResponse:
    return onGetInfoResponse(state, action)
  case ActionType.GetBlockRequest:
    return onGetBlockRequest(state, action)
  case ActionType.GetBlockResponse:
    return onGetBlockResponse(state, action)
  case ActionType.GetAbiRequest:
  case ActionType.GetAbiResponse:
  default:
    return state
  }
}

function onUrlInput(
  state: Readonly<State>,
  action: Readonly<UrlInput>,
): Readonly<State> {
  return {
    ...state,
    urlInput: action.input,
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

function onGetInfoRequest(
  state: Readonly<State>,
  action: Readonly<GetInfoRequest>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const infoData = getInfoData(state)
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        info: remoteDataLoading(infoData),
      }),
    }
  } else {
    return state
  }
}

function onGetInfoResponse(
  state: Readonly<State>,
  action: Readonly<GetInfoResponse>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        info: action.info,
      }),
    }
  } else {
    return state
  }
}

function onGetBlockRequest(
  state: Readonly<State>,
  action: Readonly<GetBlockRequest>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const blockData = getBlockData(state, action.blockNum)
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        blocks: {
          ...state.chain.data.blocks,
          [action.blockNum]: remoteDataLoading(blockData),
        },
      }),
    }
  } else {
    return state
  }
}

function onGetBlockResponse(
  state: Readonly<State>,
  action: Readonly<GetBlockResponse>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        blocks: {
          ...state.chain.data.blocks,
          [action.blockNum]: action.block,
        },
      }),
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
