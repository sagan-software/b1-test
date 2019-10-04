import * as api from '../api'
import {
  Action,
  ActionType,
  PlayBlocks,
  PauseBlocks,
  PushBlock,
  SetInfo,
  SetSelectedAccount,
  SetSelectedBlock,
  SelectAccount,
  SelectBlock,
} from './actions'
import { State, ChainState } from './state'
import { getBlock } from './selectors'

export function reducer(state: State, action: Action): State {
  switch (action.type) {
  case ActionType.PlayBlocks:
    return onPlayBlocks(state, action)
  case ActionType.PauseBlocks:
    return onPauseBlocks(state, action)
  case ActionType.PushBlock:
    return onPushBlock(state, action)
  case ActionType.SelectAccount:
    return onSelectAccount(state, action)
  case ActionType.SelectBlock:
    return onSelectBlock(state, action)
  case ActionType.SetInfo:
    return onSetInfo(state, action)
  case ActionType.SetSelectedAccount:
    return onSetSelectedAccount(state, action)
  case ActionType.SetSelectedBlock:
    return onSetSelectedBlock(state, action)
  default:
    return state
  }
}

function hasSameUrl(state: api.ResultOk<ChainState>, url: URL): boolean {
  return state.data.url.hostname === url.hostname
}

function onPlayBlocks(state: State, { url }: PlayBlocks): State {
  if (state && api.isOk(state) && hasSameUrl(state, url)) {
    return api.resultOk({
      ...state.data,
      isPlaying: true,
    })
  }
  console.log('RESETING STATE')
  // If the new URL is different from the old one then we return a blank state
}

function onPauseBlocks(state: State, action: PauseBlocks): State {
  if (state && api.isOk(state)) {
    return api.resultOk({
      ...state.data,
      isPlaying: false,
    })
  }
  return state
}

function onPushBlock(state: State, { url, num, block }: PushBlock): State {
  if (state && api.isOk(state) && hasSameUrl(state, url)) {
    const data = { ...state.data }

    // Check if we already have this block
    for (let i = data.latestBlocks.length; i--; ) {
      const existing = data.latestBlocks[i]
      if (existing.num === num) {
        return state
      }
    }

    data.latestBlocks.unshift({ num, result: block })
    if (data.latestBlocks.length > 10) {
      data.latestBlocks.pop()
    }
    return api.resultOk(data)
  }
}

function onSelectAccount(state: State, { url, account }: SelectAccount): State {
  if (state && api.isOk(state) && hasSameUrl(state, url)) {
    return state
  }
}

function onSelectBlock(state: State, { url, num }: SelectBlock): State {
  if (state && api.isOk(state) && hasSameUrl(state, url)) {
    const block = getBlock(state, num)
    if (block) {
      return api.resultOk({
        ...state.data,
        selectedBlock: { num, result: block },
      })
    }
    return state
  }
  // If the new URL is different from the old one then we return a blank state
}

function onSetInfo(state: State, { url, info, isPlaying }: SetInfo): State {
  if (api.isOk(info)) {
    const data =
      state && api.isOk(state) && hasSameUrl(state, url)
        ? {
          ...state.data,
          info: info.data,
          isPlaying,
        }
        : {
          url,
          info: info.data,
          isPlaying,
          latestBlocks: [],
          selectedBlock: undefined,
          selectedAccount: undefined,
        }
    return api.resultOk(data)
  }
  return info
}

function onSetSelectedAccount(
  state: State,
  action: SetSelectedAccount,
): State {}

function onSetSelectedBlock(
  state: State,
  { url, block }: SetSelectedBlock,
): State {
  if (state && api.isOk(state) && hasSameUrl(state, url)) {
    return api.resultOk({
      ...state.data,
      selectedBlock: block,
    })
  }
  return state
}
