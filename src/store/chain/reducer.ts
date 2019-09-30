import {
  RemoteDataType,
  remoteDataLoading,
  remoteDataSuccess,
  getData,
} from '../../coreTypes'
import {
  ChainAction,
  ChainActionType,
  GetInfo,
  SetInfo,
  GetBlock,
  SetBlock,
} from './action'
import { defaultChain } from './constants'
import { Chain } from './state'

export function chainReducer(
  chain: Readonly<Chain> = defaultChain,
  action: Readonly<ChainAction>,
): Readonly<Chain> {
  switch (action.type) {
  case ChainActionType.SetChain:
    return action.chain
  case ChainActionType.GetInfo:
    return onGetInfo(chain, action)
  case ChainActionType.SetInfo:
    return onSetInfo(chain, action)
  case ChainActionType.GetBlock:
    return onGetBlock(chain, action)
  case ChainActionType.SetBlock:
    return onSetBlock(chain, action)
  case ChainActionType.GetAbi:
  case ChainActionType.SetAbi:
  default:
    return chain
  }
}

function onGetInfo(
  chain: Readonly<Chain>,
  action: Readonly<GetInfo>,
): Readonly<Chain> {
  return {
    ...chain,
    info: remoteDataLoading(chain.info)
  }
}

function onSetInfo(
  chain: Readonly<Chain>,
  action: Readonly<SetInfo>,
): Readonly<Chain> {
  switch (action.info.type) {
    case RemoteDataType.Success:
      return remoteDataSuccess({
        ...
      })
  }
  if (chain.type === RemoteDataType.Success) {
    return remoteDataSuccess({
      ...chain.data,
      info: action.info,
    })
  } else {
    return chain
  }
}

function onGetBlock(
  chain: Readonly<Chain>,
  action: Readonly<GetBlock>,
): Readonly<Chain> {
  if (chain.type === RemoteDataType.Success) {
    const block = chain.data.blocks[action.blockNum]
    const blockData = block ? getData(block) : undefined
    return remoteDataSuccess({
      ...chain.data,
      blocks: {
        ...chain.data.blocks,
        [action.blockNum]: remoteDataLoading(blockData),
      },
    })
  } else {
    return chain
  }
}

function onSetBlock(
  chain: Readonly<Chain>,
  action: Readonly<SetBlock>,
): Readonly<Chain> {
  if (chain.type === RemoteDataType.Success) {
    return remoteDataSuccess({
      ...chain.data,
      blocks: {
        ...chain.data.blocks,
        [action.blockNum]: action.block,
      },
    })
  } else {
    return chain
  }
}
