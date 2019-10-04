import * as api from '../api'
import * as state from './state'

export type Action =
  | PlayBlocks
  | PauseBlocks
  | PushBlock
  | SelectAccount
  | SelectBlock
  | SetInfo
  | SetSelectedAccount
  | SetSelectedBlock

export enum ActionType {
  PauseBlocks = 'PAUSE_BLOCKS',
  PlayBlocks = 'PLAY_BLOCKS',
  PushBlock = 'PUSH_BLOCK',
  SelectAccount = 'SELECT_ACCOUNT',
  SelectBlock = 'SELECT_BLOCK',
  SetInfo = 'SET_INFO',
  SetSelectedAccount = 'SET_SELECTED_ACCOUNT',
  SetSelectedBlock = 'SET_SELECTED_BLOCK',
}

export interface PauseBlocks {
  readonly type: ActionType.PauseBlocks
}

export interface PlayBlocks {
  readonly type: ActionType.PlayBlocks
  readonly url: URL
}

export interface PushBlock {
  readonly type: ActionType.PushBlock
  readonly url: URL
  readonly num: api.BlockNum
  readonly block: api.Result<api.Block>
}

export interface SelectAccount {
  readonly type: ActionType.SelectAccount
  readonly url: URL
  readonly account: api.AccountName
}

export interface SelectBlock {
  readonly type: ActionType.SelectBlock
  readonly url: URL
  readonly num: api.BlockNum
}

export interface SetInfo {
  readonly type: ActionType.SetInfo
  readonly url: URL
  readonly info: api.Result<api.Info>
  readonly isPlaying: boolean
}

export interface SetSelectedAccount {
  readonly type: ActionType.SetSelectedAccount
  readonly url: URL
  readonly account: state.Account
}

export interface SetSelectedBlock {
  readonly type: ActionType.SetSelectedBlock
  readonly url: URL
  readonly block: state.Block
}
