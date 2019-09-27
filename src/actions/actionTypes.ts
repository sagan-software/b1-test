import { AccountName, RpcData, Info, Block, Theme, Chain } from '../state'

export type Action =
  | UrlInput
  | SetChainData
  | SetAutoplay
  | SetMaxBlockCount
  | SetTheme
  | GetInfoRequest
  | GetInfoResponse
  | GetBlockRequest
  | GetBlockResponse
  | GetAbiRequest
  | GetAbiResponse

export enum ActionType {
  UrlInput = 'URL_INPUT',
  SetChainData = 'SET_CHAIN_DATA',
  SetAutoplay = 'SET_AUTOPLAY',
  SetMaxBlockCount = 'SET_MAX_BLOCK_COUNT',
  SetTheme = 'SET_THEME',
  GetInfoRequest = 'RPC/GET_INFO_REQUEST',
  GetInfoResponse = 'RPC/GET_INFO_RESPONSE',
  GetBlockRequest = 'RPC/GET_BLOCK_REQUEST',
  GetBlockResponse = 'RPC/GET_BLOCK_RESPONSE',
  GetAbiRequest = 'RPC/GET_ABI_REQUEST',
  GetAbiResponse = 'RPC/GET_ABI_RESPONSE',
}

export interface UrlInput {
  readonly type: ActionType.UrlInput
  readonly input: string
}

export interface SetChainData {
  readonly type: ActionType.SetChainData
  readonly chainData: Chain
}

export interface SetAutoplay {
  readonly type: ActionType.SetAutoplay
  readonly autoplay: boolean
}

export interface SetMaxBlockCount {
  readonly type: ActionType.SetMaxBlockCount
  readonly maxBlockCount: number
}

export interface SetTheme {
  readonly type: ActionType.SetTheme
  readonly theme: Readonly<Theme>
}

export interface GetInfoRequest {
  readonly type: ActionType.GetInfoRequest
}

export interface GetInfoResponse {
  readonly type: ActionType.GetInfoResponse
  readonly info: Readonly<RpcData<Info>>
}

export interface GetBlockRequest {
  readonly type: ActionType.GetBlockRequest
  readonly blockNum: number
}

export interface GetBlockResponse {
  readonly type: ActionType.GetBlockResponse
  readonly blockNum: number
  readonly block: Readonly<RpcData<Block>>
}

export interface GetAbiRequest {
  readonly type: ActionType.GetAbiRequest
  readonly account: AccountName
}

export interface GetAbiResponse {
  readonly type: ActionType.GetAbiResponse
  readonly account: AccountName
}
