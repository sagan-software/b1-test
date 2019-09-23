import { Info, Block } from '../chains'

export type Action =
  | GetInfoAction
  | GetInfoOkAction
  | GetInfoErrAction
  | GetBlockAction
  | GetBlockOkAction
  | GetBlockErrAction

export enum ActionType {
  GetInfo = 'RPC_SERVERS/GET_INFO',
  GetInfoOk = 'RPC_SERVERS/GET_INFO_OK',
  GetInfoErr = 'RPC_SERVERS/GET_INFO_ERR',
  GetBlock = 'RPC_SERVERS/GET_BLOCK',
  GetBlockOk = 'RPC_SERVERS/GET_BLOCK_OK',
  GetBlockErr = 'RPC_SERVERS/GET_BLOCK_ERR',
}

export interface GetInfoAction {
  readonly type: ActionType.GetInfo
  readonly url: string
}

export const getInfo = (url: Readonly<string>): GetInfoAction => ({
  type: ActionType.GetInfo,
  url,
})

export interface GetInfoOkAction {
  readonly type: ActionType.GetInfoOk
  readonly url: string
  readonly info: Info
  readonly ping: number
}

export const getInfoOk = (
  url: Readonly<string>,
  info: Readonly<Info>,
  ping: Readonly<number>,
): GetInfoOkAction => ({
  type: ActionType.GetInfoOk,
  url,
  info,
  ping,
})

export interface GetInfoErrAction {
  readonly type: ActionType.GetInfoErr
  readonly url: string
}

export const getInfoErr = (url: Readonly<string>): GetInfoErrAction => ({
  type: ActionType.GetInfoErr,
  url,
})

export interface GetBlockAction {
  readonly type: ActionType.GetBlock
  readonly url: string
  readonly chainId: string
  readonly blockId: string
}

export const getBlock = (
  url: Readonly<string>,
  chainId: Readonly<string>,
  blockId: Readonly<string>,
): Readonly<GetBlockAction> => ({
  type: ActionType.GetBlock,
  url,
  chainId,
  blockId,
})

export interface GetBlockOkAction {
  readonly type: ActionType.GetBlockOk
  readonly url: string
  readonly chainId: string
  readonly block: Block
}

export const getBlockOk = (
  url: Readonly<string>,
  chainId: Readonly<string>,
  block: Readonly<Block>,
): Readonly<GetBlockOkAction> => ({
  type: ActionType.GetBlockOk,
  url,
  chainId,
  block,
})

export interface GetBlockErrAction {
  readonly type: ActionType.GetBlockErr
  readonly url: string
  readonly chainId: string
  readonly blockId: string
}

export const getBlockErr = (
  url: Readonly<string>,
  chainId: Readonly<string>,
  blockId: Readonly<string>,
): GetBlockErrAction => ({
  type: ActionType.GetBlockErr,
  url,
  chainId,
  blockId,
})
