import { RpcData, AccountName, Info, Block } from '../../api'
import { Chain } from './state'

export type ChainAction =
  | GetInfo
  | GotInfo
  | GetBlock
  | GotBlock
  | GetAbi
  | GotAbi

export enum ChainActionType {
  SetChain = 'CHAIN/SET_CHAIN',
  GetAbi = 'CHAIN/GET_ABI',
  GotAbi = 'CHAIN/GOT_ABI',
  GetBlock = 'CHAIN/GET_BLOCK',
  GotBlock = 'CHAIN/GOT_BLOCK',
  GetInfo = 'CHAIN/GET_INFO',
  GotInfo = 'CHAIN/GOT_INFO',
}

export interface SetChain {
  readonly type: ChainActionType.SetChain
  readonly chain: Chain
}

export interface GetInfo {
  readonly type: ChainActionType.GetInfo
}

export interface GotInfo {
  readonly type: ChainActionType.GotInfo
  readonly info: Readonly<RpcData<Info>>
}

export interface GetBlock {
  readonly type: ChainActionType.GetBlock
  readonly blockNum: number
}

export interface GotBlock {
  readonly type: ChainActionType.GotBlock
  readonly blockNum: number
  readonly block: Readonly<RpcData<Block>>
}

export interface GetAbi {
  readonly type: ChainActionType.GetAbi
  readonly account: AccountName
}

export interface GotAbi {
  readonly type: ChainActionType.GotAbi
  readonly account: AccountName
}

export const getInfo = (): Readonly<GetInfo> => ({
  type: ChainActionType.GetInfo,
})

export const gotInfo = (info: Readonly<RpcData<Info>>): Readonly<GotInfo> => ({
  type: ChainActionType.GotInfo,
  info,
})

export const getBlock = (blockNum: Readonly<number>): Readonly<GetBlock> => ({
  type: ChainActionType.GetBlock,
  blockNum,
})

export const gotBlock = (
  blockNum: Readonly<number>,
  block: Readonly<RpcData<Block>>,
): Readonly<GotBlock> => ({
  type: ChainActionType.GotBlock,
  blockNum,
  block,
})
