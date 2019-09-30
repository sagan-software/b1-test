import { Result } from '../../coreTypes'
import { RpcData, RpcError, AccountName, Info, Block } from '../../api'
import { Chain } from './state'

export type ChainAction =
  | SetChain
  | GetInfo
  | SetInfo
  | GetBlock
  | SetBlock
  | GetAbi
  | SetAbi

export enum ChainActionType {
  SetChain = 'CHAIN/SET_CHAIN',
  GetAbi = 'CHAIN/GET_ABI',
  SetAbi = 'CHAIN/SET_ABI',
  GetBlock = 'CHAIN/GET_BLOCK',
  SetBlock = 'CHAIN/SET_BLOCK',
  GetInfo = 'CHAIN/GET_INFO',
  SetInfo = 'CHAIN/SET_INFO',
}

export interface SetChain {
  readonly type: ChainActionType.SetChain
  readonly chain: Chain
}

export interface GetInfo {
  readonly type: ChainActionType.GetInfo
}

export interface SetInfo {
  readonly type: ChainActionType.SetInfo
  readonly info: Readonly<Result<Info, RpcError>>
}

export interface GetBlock {
  readonly type: ChainActionType.GetBlock
  readonly blockNum: number
}

export interface SetBlock {
  readonly type: ChainActionType.SetBlock
  readonly blockNum: number
  readonly block: Readonly<RpcData<Block>>
}

export interface GetAbi {
  readonly type: ChainActionType.GetAbi
  readonly account: AccountName
}

export interface SetAbi {
  readonly type: ChainActionType.SetAbi
  readonly account: AccountName
}

export const setChain = (chain: Chain): Readonly<SetChain> => ({
  type: ChainActionType.SetChain,
  chain,
})

export const getInfo = (): Readonly<GetInfo> => ({
  type: ChainActionType.GetInfo,
})

export const setInfo = (info: Readonly<RpcData<Info>>): Readonly<SetInfo> => ({
  type: ChainActionType.SetInfo,
  info,
})

export const getBlock = (blockNum: Readonly<number>): Readonly<GetBlock> => ({
  type: ChainActionType.GetBlock,
  blockNum,
})

export const gotBlock = (
  blockNum: Readonly<number>,
  block: Readonly<RpcData<Block>>,
): Readonly<SetBlock> => ({
  type: ChainActionType.SetBlock,
  blockNum,
  block,
})
