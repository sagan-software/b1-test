import * as api from '../api'
import { State, ChainState, Block, Account } from './state'
import * as chainPresets from '../chainPresets'

export function getPreset(state: State): chainPresets.ChainPreset | void {}

export function getChainState(state: State): api.Result<ChainState> | void {
  return state
}

export function getIsPlaying(state: State): boolean {
  return state && api.isOk(state) ? state.data.isPlaying : false
}

export function getSelectedBlock(state: State): Block | void {
  if (state && api.isOk(state)) {
    return state.data.selectedBlock
  }
}

export function getSelectedAccount(state: State): Account | void {
  if (state && api.isOk(state)) {
    return state.data.selectedAccount
  }
}

export function getBlock(
  state: State,
  num: api.BlockNum,
): api.Result<api.Block> | void {
  if (state && api.isOk(state)) {
    // First see if it's selected
    const selected = state.data.selectedBlock
    if (selected && selected.num === num) {
      return selected.result
    }

    // Look in the latest blocks
    const latest = state.data.latestBlocks
    for (let i = latest.length; i--; ) {
      const block = latest[i]
      if (block.num === num) {
        return block.result
      }
    }
  }
}

export function getUrl(state: State): URL | void {
  if (state && api.isOk(state)) {
    return state.data.url
  }
}

export function getInfo(state: State): api.Info | void {
  if (state && api.isOk(state)) {
    return state.data.info
  }
}
