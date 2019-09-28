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
  GotInfo,
  GetBlock,
  GotBlock,
} from './action'
import { defaultChain } from './constants'
import { Chain } from './state'

export function chainReducer(
  chain: Readonly<Chain> = defaultChain,
  action: Readonly<ChainAction>,
): Readonly<Chain> {
  switch (action.type) {
  case ChainActionType.GetInfo:
    return onGetInfo(chain, action)
  case ChainActionType.GotInfo:
    return onGotInfo(chain, action)
  case ChainActionType.GetBlock:
    return onGetBlock(chain, action)
  case ChainActionType.GotBlock:
    return onGotBlock(chain, action)
  case ChainActionType.GetAbi:
  case ChainActionType.GotAbi:
  default:
    return chain
  }
}

function onGetInfo(
  chain: Readonly<Chain>,
  action: Readonly<GetInfo>,
): Readonly<Chain> {
  if (chain.type === RemoteDataType.Success) {
    return remoteDataSuccess({
      ...chain.data,
      info: remoteDataLoading(getData(chain.data.info)),
    })
  } else {
    return chain
  }
}

function onGotInfo(
  chain: Readonly<Chain>,
  action: Readonly<GotInfo>,
): Readonly<Chain> {
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

function onGotBlock(
  chain: Readonly<Chain>,
  action: Readonly<GotBlock>,
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
