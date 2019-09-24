import { RemoteData, Info, Block, Theme } from './state'

export enum ActionType {
  SetUrl = 'SET_URL',
  SetAutoplay = 'SET_AUTOPLAY',
  SetMaxBlockCount = 'SET_MAX_BLOCK_COUNT',
  FetchInfo = 'FETCH_INFO',
  FetchedInfo = 'FETCHED_INFO',
  FetchBlock = 'FETCH_BLOCK',
  FetchedBlock = 'SET_BLOCK',
  SetTheme = 'SET_THEME',
}

export type Action =
  | SetUrl
  | SetAutoplay
  | SetMaxBlockCount
  | FetchInfo
  | FetchedInfo
  | FetchBlock
  | FetchedBlock
  | SetTheme

export interface SetUrl {
  readonly type: ActionType.SetUrl
  readonly input: string
}

export const setUrl = (input: Readonly<string>): Readonly<SetUrl> => ({
  type: ActionType.SetUrl,
  input,
})

export interface SetAutoplay {
  readonly type: ActionType.SetAutoplay
  readonly autoplay: boolean
}

export const setAutoplay = (
  autoplay: Readonly<boolean>,
): Readonly<SetAutoplay> => ({
  type: ActionType.SetAutoplay,
  autoplay,
})

export interface SetMaxBlockCount {
  readonly type: ActionType.SetMaxBlockCount
  readonly maxBlockCount: number
}

export const setMaxBlockCount = (
  maxBlockCount: Readonly<number>,
): Readonly<SetMaxBlockCount> => ({
  type: ActionType.SetMaxBlockCount,
  maxBlockCount,
})

export interface FetchInfo {
  readonly type: ActionType.FetchInfo
}

export const fetchInfo = (): Readonly<FetchInfo> => ({
  type: ActionType.FetchInfo,
})

export interface FetchedInfo {
  readonly type: ActionType.FetchedInfo
  readonly info: Readonly<RemoteData<Info>>
}

export const fetchedInfo = (
  info: Readonly<RemoteData<Info>>,
): Readonly<FetchedInfo> => ({
  type: ActionType.FetchedInfo,
  info,
})

export interface FetchBlock {
  readonly type: ActionType.FetchBlock
  readonly blockNum: number
}

export const fetchBlock = (
  blockNum: Readonly<number>,
): Readonly<FetchBlock> => ({
  type: ActionType.FetchBlock,
  blockNum,
})

export interface FetchedBlock {
  readonly type: ActionType.FetchedBlock
  readonly blockNum: number
  readonly block: Readonly<RemoteData<Block>>
}

export const fetchedBlock = (
  blockNum: Readonly<number>,
  block: Readonly<RemoteData<Block>>,
): Readonly<FetchedBlock> => ({
  type: ActionType.FetchedBlock,
  blockNum,
  block,
})

export interface SetTheme {
  readonly type: ActionType.SetTheme
  readonly theme: Readonly<Theme>
}

export const setTheme = (theme: Readonly<Theme>): Readonly<SetTheme> => ({
  type: ActionType.SetTheme,
  theme,
})
