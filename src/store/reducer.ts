import {
  RemoteDataType,
  remoteDataLoading,
  remoteDataSuccess,
  ResultType,
  remoteDataFailure,
  remoteDataDefault,
} from '../coreTypes'
import { BlockNum } from '../api'
import {
  Action,
  ActionType,
  GetInfoAction,
  SetInfoAction,
  GetBlockAction,
  SetBlockAction,
  GetAbiAction,
  SetAbiAction,
  SetThemeAction,
  IncrementHeadBlockNumAction,
  DelBlockAction,
  SetAutoplayAction,
} from './action'
import * as selectors from './selectors'
import { defaultState } from './constants'
import { State, ChainErrorType } from './state'

export function reducer(
  state: Readonly<State> = defaultState,
  action: Readonly<Action>,
): Readonly<State> {
  switch (action.type) {
  case ActionType.IncrementHeadBlockNum:
    return onIncrementHeadBlockNum(state, action)
  case ActionType.SetAutoplay:
    return onSetAutoplay(state, action)
  case ActionType.GetInfo:
    return onGetInfo(state, action)
  case ActionType.SetInfo:
    return onSetInfo(state, action)
  case ActionType.GetBlock:
    return onGetBlock(state, action)
  case ActionType.SetBlock:
    return onSetBlock(state, action)
  case ActionType.DelBlock:
    return onDelBlock(state, action)
  case ActionType.GetAbi:
    return onGetAbi(state, action)
  case ActionType.SetAbi:
    return onSetAbi(state, action)
  case ActionType.SetTheme:
    return onSetTheme(state, action)
  default:
    return state
  }
}

function onGetInfo(
  state: Readonly<State>,
  { hostname, chainId }: Readonly<GetInfoAction>,
): Readonly<State> {
  // Check if hostname input is the same
  const previousRpcHostname = selectors.getRpcHostnameInput(state)
  if (previousRpcHostname === hostname) {
    return state
  }

  // Check if the hostname is valid
  let rpcUrl: URL
  try {
    rpcUrl = new URL(`https://${hostname}`)
  } catch (_) {
    return {
      ...state,
      rpcHostnameInput: hostname,
      chain: remoteDataFailure({
        type: ChainErrorType.InvalidUrl,
      }),
    }
  }

  // Check if the URL is the same
  const previousRpcUrl = selectors.getRpcUrl(state)
  if (previousRpcUrl === rpcUrl) {
    return state
  }

  return {
    ...state,
    rpcHostnameInput: hostname,
    chain: remoteDataLoading({
      rpcUrl,
      chainId,
    }),
  }
}

function onIncrementHeadBlockNum(
  state: Readonly<State>,
  _: Readonly<IncrementHeadBlockNumAction>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const lastBlockNum = (state.chain.data.headBlockNum as unknown) as number
    const headBlockNum = (lastBlockNum + 1) as BlockNum
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        headBlockNum,
      }),
    }
  } else {
    return state
  }
}

function onSetAutoplay(
  state: Readonly<State>,
  { autoplay }: Readonly<SetAutoplayAction>,
): Readonly<State> {
  return {
    ...state,
    autoplay,
  }
}

function onSetInfo(
  state: Readonly<State>,
  { info }: Readonly<SetInfoAction>,
): Readonly<State> {
  const rpcUrl = selectors.getRpcUrl(state)
  if (!rpcUrl) {
    return state
  }
  switch (info.type) {
  case ResultType.Ok:
    return {
        ...state,
        chain: remoteDataSuccess({
          rpcUrl,
          chainId: info.data.chainId,
          headBlockNum: info.data.headBlockNum,
          blocks: {},
          abis: {},
        }),
      }
  case ResultType.Err:
    return {
        ...state,
        chain: {
          type: RemoteDataType.Failure,
          data: {
            type: ChainErrorType.GetInfoError,
            rpcUrl,
            chainId: selectors.getChainId(state),
          },
        },
      }
  }
}

function onGetBlock(
  state: Readonly<State>,
  { blockNum }: Readonly<GetBlockAction>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const key = (blockNum as unknown) as number
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        blocks: {
          ...state.chain.data.blocks,
          [key]: remoteDataLoading(),
        },
      }),
    }
  } else {
    return state
  }
}

function onSetBlock(
  state: Readonly<State>,
  { blockNum, block }: Readonly<SetBlockAction>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const key = (blockNum as unknown) as number
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        blocks: {
          ...state.chain.data.blocks,
          [key]:
            block.type === ResultType.Ok
              ? remoteDataSuccess(block.data)
              : remoteDataFailure(block.error),
        },
      }),
    }
  } else {
    return state
  }
}

function onDelBlock(
  state: Readonly<State>,
  { blockNum }: Readonly<DelBlockAction>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const key = (blockNum as unknown) as number
    const blocks = { ...state.chain.data.blocks }
    delete blocks[key]
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        blocks,
      }),
    }
  } else {
    return state
  }
}

function onGetAbi(
  state: Readonly<State>,
  { account }: Readonly<GetAbiAction>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const key = (account as unknown) as string
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        abi: {
          ...state.chain.data.abis,
          [key]: remoteDataLoading(),
        },
      }),
    }
  } else {
    return state
  }
}

function onSetAbi(
  state: Readonly<State>,
  { account, abi }: Readonly<SetAbiAction>,
): Readonly<State> {
  if (state.chain.type === RemoteDataType.Success) {
    const key = (account as unknown) as number
    return {
      ...state,
      chain: remoteDataSuccess({
        ...state.chain.data,
        abis: {
          ...state.chain.data.abis,
          [key]:
            abi.type === ResultType.Ok
              ? remoteDataSuccess(abi.data)
              : remoteDataFailure(abi.error),
        },
      }),
    }
  } else {
    return state
  }
}

function onSetTheme(
  state: Readonly<State>,
  { theme }: Readonly<SetThemeAction>,
): Readonly<State> {
  return {
    ...state,
    theme,
  }
}
