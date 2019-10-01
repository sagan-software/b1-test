import { RpcResult, Info, Block, ChainId, BlockNum } from '../api'
import {
  ActionType,
  InitChainAction,
  IncrementHeadBlockNumAction,
  GetInfoAction,
  SetInfoAction,
  GetBlockAction,
  SetBlockAction,
  DelBlockAction,
} from './action'

export const initChainAction = (
  hostname: string,
  chainId?: ChainId | void,
): Readonly<InitChainAction> => ({
  type: ActionType.InitChain,
  hostname,
  chainId,
})

export const incrementBlockNumAction = (): Readonly<
  IncrementHeadBlockNumAction
> => ({
  type: ActionType.IncrementHeadBlockNum,
})

export const getInfoAction = (): Readonly<GetInfoAction> => ({
  type: ActionType.GetInfo,
})

export const setInfoAction = (
  info: Readonly<RpcResult<Info>>,
): Readonly<SetInfoAction> => ({
  type: ActionType.SetInfo,
  info,
})

export const getBlockAction = (
  blockNum: Readonly<BlockNum>,
): Readonly<GetBlockAction> => ({
  type: ActionType.GetBlock,
  blockNum,
})

export const setBlockAction = (
  blockNum: Readonly<BlockNum>,
  block: Readonly<RpcResult<Block>>,
): Readonly<SetBlockAction> => ({
  type: ActionType.SetBlock,
  blockNum,
  block,
})

export const delBlockAction = (
  blockNum: Readonly<BlockNum>,
): Readonly<DelBlockAction> => ({
  type: ActionType.DelBlock,
  blockNum,
})
