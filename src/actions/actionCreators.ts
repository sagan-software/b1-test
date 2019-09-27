import { Block, Theme, Info, RpcData } from '../state'
import {
  GetInfoRequest,
  ActionType,
  SetTheme,
  UrlInput,
  SetAutoplay,
  SetMaxBlockCount,
  GetBlockRequest,
  GetBlockResponse,
  GetInfoResponse,
} from './actionTypes'

export const setTheme = (theme: Readonly<Theme>): Readonly<SetTheme> => ({
  type: ActionType.SetTheme,
  theme,
})

export const setUrl = (input: Readonly<string>): Readonly<UrlInput> => ({
  type: ActionType.UrlInput,
  input,
})

export const setAutoplay = (
  autoplay: Readonly<boolean>,
): Readonly<SetAutoplay> => ({
  type: ActionType.SetAutoplay,
  autoplay,
})

export const setMaxBlockCount = (
  maxBlockCount: Readonly<number>,
): Readonly<SetMaxBlockCount> => ({
  type: ActionType.SetMaxBlockCount,
  maxBlockCount,
})

export const getInfoRequest = (): Readonly<GetInfoRequest> => ({
  type: ActionType.GetInfoRequest,
})

export const getInfoResponse = (
  info: Readonly<RpcData<Info>>,
): Readonly<GetInfoResponse> => ({
  type: ActionType.GetInfoResponse,
  info,
})

export const getBlockResponse = (
  blockNum: Readonly<number>,
  block: Readonly<RpcData<Block>>,
): Readonly<GetBlockResponse> => ({
  type: ActionType.GetBlockResponse,
  blockNum,
  block,
})

export const getBlockRequest = (
  blockNum: Readonly<number>,
): Readonly<GetBlockRequest> => ({
  type: ActionType.GetBlockRequest,
  blockNum,
})
