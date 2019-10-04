import * as api from '../api'
import * as actions from './actions'
import * as state from './state'

export const createPlayBlocks = (url: URL): actions.PlayBlocks => ({
  type: actions.ActionType.PlayBlocks,
  url,
})

export const createPauseBlocks = (): actions.PauseBlocks => ({
  type: actions.ActionType.PauseBlocks,
})

export const createPushBlock = (
  url: URL,
  num: api.BlockNum,
  block: api.Result<api.Block>,
): actions.PushBlock => ({
  type: actions.ActionType.PushBlock,
  url,
  num,
  block,
})

export const createSelectAccount = (
  url: URL,
  account: api.AccountName,
): actions.SelectAccount => ({
  type: actions.ActionType.SelectAccount,
  url,
  account,
})

export const createSelectBlock = (
  url: URL,
  num: api.BlockNum,
): actions.SelectBlock => ({
  type: actions.ActionType.SelectBlock,
  url,
  num,
})

export const createSetInfo = (
  url: URL,
  info: api.Result<api.Info>,
  isPlaying: boolean,
): actions.SetInfo => ({
  type: actions.ActionType.SetInfo,
  url,
  info,
  isPlaying,
})

export const createSetSelectedBlock = (
  url: URL,
  block: state.Block,
): actions.SetSelectedBlock => ({
  type: actions.ActionType.SetSelectedBlock,
  url,
  block,
})

export const createSetSelectedAccount = (
  url: URL,
  account: state.Account,
): actions.SetSelectedAccount => ({
  type: actions.ActionType.SetSelectedAccount,
  url,
  account,
})
