import { RpcResult, AccountName, Info, Block, ChainId, BlockNum } from '../api'
import { Theme } from './state'

export type Action =
  | IncrementHeadBlockNumAction
  | SetAutoplayAction
  | GetInfoAction
  | SetInfoAction
  | GetBlockAction
  | SetBlockAction
  | DelBlockAction
  | GetAbiAction
  | SetAbiAction
  | SetThemeAction

export enum ActionType {
  IncrementHeadBlockNum = 'INCREMENT_BLOCK_NUM',
  SetAutoplay = 'SET_AUTOPLAY',
  GetInfo = 'GET_INFO',
  SetInfo = 'SET_INFO',
  GetBlock = 'GET_BLOCK',
  SetBlock = 'SET_BLOCK',
  DelBlock = 'DEL_BLOCK',
  GetAbi = 'GET_ABI',
  SetAbi = 'SET_ABI',
  SetTheme = 'SET_THEME',
}

export interface IncrementHeadBlockNumAction {
  readonly type: ActionType.IncrementHeadBlockNum
}

export interface SetAutoplayAction {
  readonly type: ActionType.SetAutoplay
  readonly autoplay: boolean
}

export interface GetInfoAction {
  readonly type: ActionType.GetInfo
  readonly hostname: string
  readonly chainId?: Readonly<ChainId> | void
}

export interface SetInfoAction {
  readonly type: ActionType.SetInfo
  readonly info: Readonly<RpcResult<Info>>
}

export interface GetBlockAction {
  readonly type: ActionType.GetBlock
  readonly blockNum: Readonly<BlockNum>
}

export interface SetBlockAction {
  readonly type: ActionType.SetBlock
  readonly blockNum: Readonly<BlockNum>
  readonly block: Readonly<RpcResult<Block>>
}

export interface DelBlockAction {
  readonly type: ActionType.DelBlock
  readonly blockNum: Readonly<BlockNum>
}

export interface GetAbiAction {
  readonly type: ActionType.GetAbi
  readonly account: Readonly<AccountName>
}

export interface SetAbiAction {
  readonly type: ActionType.SetAbi
}

export interface SetThemeAction {
  readonly type: ActionType.SetTheme
  readonly theme: Readonly<Theme>
}
