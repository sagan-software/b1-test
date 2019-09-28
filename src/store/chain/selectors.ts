import { RpcData, Info, Block } from '../../api'
import { getData } from '../../coreTypes'
import { RootState } from '../rootState'
import { chainPresets } from './constants'
import { Chain, ChainOk, ChainPreset } from './state'

export function getChain(state: Readonly<RootState>): Readonly<Chain> {
  return state.chain
}

export function getChainData(
  state: Readonly<RootState>,
): Readonly<ChainOk> | void {
  return getData(getChain(state))
}

export function getInfo(
  state: Readonly<RootState>,
): Readonly<RpcData<Info>> | void {
  const chain = getChainData(state)
  if (chain) {
    return chain.info
  }
}

export function getInfoData(state: Readonly<RootState>): Readonly<Info> | void {
  const info = getInfo(state)
  if (info) {
    return getData(info)
  }
}

export function getBlock(
  state: Readonly<RootState>,
  blockNum: Readonly<number>,
): Readonly<RpcData<Block>> | void {
  const chain = getChainData(state)
  if (chain) {
    return chain.blocks[blockNum]
  }
}

export function getBlockData(
  state: Readonly<RootState>,
  blockNum: Readonly<number>,
): Readonly<Block> | void {
  const blockData = getBlock(state, blockNum)
  if (blockData) {
    return getData(blockData)
  }
}

export function getHasBlock(
  state: Readonly<RootState>,
  blockNum: Readonly<number>,
): Readonly<boolean> {
  return !!getBlock(state, blockNum)
}

export function getBlockCount(state: Readonly<RootState>): Readonly<number> {
  const chain = getChainData(state)
  return chain ? Object.keys(chain.blocks).length : 0
}

export function getChainPreset(
  state: Readonly<RootState>,
): Readonly<ChainPreset> | void {
  const info = getInfoData(state)
  if (info) {
    for (let i = chainPresets.length; i--; ) {
      const chainPreset = chainPresets[i]
      if (chainPreset.id === info.chainId) {
        return chainPreset
      }
    }
  }
}
