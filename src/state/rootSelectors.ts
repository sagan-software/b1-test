import { State } from './rootState'
import { Chain, ChainOk, Block, Info } from './chain'
import { Theme } from './theme'
import { getData } from './remoteData'
import { RpcData } from './rpcData'
import { ChainPreset, chainPresets } from './chainPresets'

export function getUrlInput(state: Readonly<State>): Readonly<string> {
  return state.urlInput
}

export function getUrl(state: Readonly<State>): Readonly<URL> | void {
  const data = getData(state.chain)
  if (data) {
    return data.url
  }
}

export function getAutoplay(state: Readonly<State>): Readonly<boolean> {
  return state.autoplay
}

export function getTheme(state: Readonly<State>): Readonly<Theme> {
  return state.theme
}

export function getChainData(state: Readonly<State>): Readonly<Chain> {
  return state.chain
}

export function getChain(state: Readonly<State>): Readonly<ChainOk> | void {
  return getData(getChainData(state))
}

export function getInfo(
  state: Readonly<State>,
): Readonly<RpcData<Info>> | void {
  const chain = getChain(state)
  if (chain) {
    return chain.info
  }
}

export function getInfoData(state: Readonly<State>): Readonly<Info> | void {
  const info = getInfo(state)
  if (info) {
    return getData(info)
  }
}

export function getChainPreset(
  state: Readonly<State>,
): Readonly<ChainPreset> | void {
  const info = getInfoData(state)
  if (info) {
    return chainPresets[info.chainId]
  }
}

export function getBlockCount(state: Readonly<State>): Readonly<number> {
  const chain = getChain(state)
  return chain ? Object.keys(chain.blocks).length : 0
}

export function getBlock(
  state: Readonly<State>,
  blockNum: Readonly<number>,
): Readonly<RpcData<Block>> | void {
  const chain = getChain(state)
  if (chain) {
    return chain.blocks[blockNum]
  }
}

export function getHasBlock(
  state: Readonly<State>,
  blockNum: Readonly<number>,
): Readonly<boolean> {
  return !!getBlock(state, blockNum)
}

export function getBlockData(
  state: Readonly<State>,
  blockNum: Readonly<number>,
): Readonly<Block> | void {
  const blockData = getBlock(state, blockNum)
  if (blockData) {
    return getData(blockData)
  }
}
