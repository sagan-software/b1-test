import { ChainId } from '../../api'
import { defaultRemoteData } from '../../coreTypes'
import { Chain, ChainPreset, ChainEnv } from './state'

export const defaultChain: Readonly<Chain> = defaultRemoteData

export const eosMainnet: Readonly<ChainPreset> = {
  id: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' as ChainId,
  name: 'EOS Mainnet',
  env: ChainEnv.Mainnet,
  defaultHostname: 'api.eosnewyork.io',
}

export const telosMainnet: Readonly<ChainPreset> = {
  id: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11' as ChainId,
  name: 'Telos Mainnet',
  env: ChainEnv.Mainnet,
  defaultHostname: 'api.tlos.goodblock.io',
}

export const worbliMainnet: Readonly<ChainPreset> = {
  id: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f' as ChainId,
  name: 'Worbli Mainnet',
  env: ChainEnv.Mainnet,
  defaultHostname: 'api.worbli.io',
}

export const waxMainnet: Readonly<ChainPreset> = {
  id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4' as ChainId,
  name: 'WAX Mainnet',
  env: ChainEnv.Mainnet,
  defaultHostname: 'wax.greymass.com',
}

export const bosMainnet: Readonly<ChainPreset> = {
  id: 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86' as ChainId,
  name: 'BOS Mainnet',
  env: ChainEnv.Mainnet,
  defaultHostname: 'api.bossweden.org',
}

export const meetoneMainnet: Readonly<ChainPreset> = {
  id: 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422' as ChainId,
  name: 'MEET.ONE Mainnet',
  env: ChainEnv.Mainnet,
  defaultHostname: 'fullnode.meet.one',
}

export const jungleTestnet: Readonly<ChainPreset> = {
  id: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473' as ChainId,
  name: 'Jungle Testnet',
  env: ChainEnv.Testnet,
  defaultHostname: 'api.jungle.alohaeos.com',
}

export const kylinTestnet: Readonly<ChainPreset> = {
  id: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191' as ChainId,
  name: 'Kylin Testnet',
  env: ChainEnv.Testnet,
  defaultHostname: 'kylin.eossweden.org',
}

export const telosTestnet: Readonly<ChainPreset> = {
  id: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f' as ChainId,
  name: 'Telos Testnet',
  env: ChainEnv.Testnet,
  defaultHostname: 'testnet.eos.miami',
}

export const lynxTestnet: Readonly<ChainPreset> = {
  id: '0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978' as ChainId,
  name: 'Lynx Testnet',
  env: ChainEnv.Testnet,
  defaultHostname: 'lynxtestnet.greymass.com',
}

export const bosTestnet: Readonly<ChainPreset> = {
  id: '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85' as ChainId,
  name: 'BOS Testnet',
  env: ChainEnv.Testnet,
  defaultHostname: 'bos-test.eospacex.com',
}

export const meetoneTestnet: Readonly<ChainPreset> = {
  id: '7136e3e32a458bb99cf6973ab5055869d25830607b9e78593769e1be52fb6f20' as ChainId,
  name: 'MEET.ONE Testnet',
  env: ChainEnv.Testnet,
  defaultHostname: 'sidechain-test-history.meet.one',
}

export const chainPresets: ReadonlyArray<ChainPreset> = [
  eosMainnet,
  telosMainnet,
  worbliMainnet,
  waxMainnet,
  bosMainnet,
  meetoneMainnet,
  jungleTestnet,
  kylinTestnet,
  telosTestnet,
  lynxTestnet,
  bosTestnet,
  meetoneTestnet,
]
