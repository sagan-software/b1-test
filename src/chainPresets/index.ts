import * as api from '../api'
import bosLogo from './bos.png'
import eosLogo from './eos.jpg'
import jungleLogo from './jungle.png'
import kylinLogo from './kylin.webp'
import lynxLogo from './lynx.jpg'
import meetoneLogo from './meetone.png'
import telosLogo from './telos.png'
import waxLogo from './wax.png'
import worbliLogo from './worbli.jpg'

export interface ChainPreset {
  readonly id: api.ChainId
  readonly name: string
  readonly env: ChainEnv
  readonly url: URL
  readonly logo: string
}

export enum ChainEnv {
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET',
}

export const eosMainnet: ChainPreset = {
  id: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' as api.ChainId,
  name: 'EOS Mainnet',
  env: ChainEnv.Mainnet,
  url: new URL('https://api.eosnewyork.io'),
  logo: eosLogo,
}

export const telosMainnet: ChainPreset = {
  id: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11' as api.ChainId,
  name: 'Telos Mainnet',
  env: ChainEnv.Mainnet,
  url: new URL('https://api.tlos.goodblock.io'),
  logo: telosLogo,
}

export const worbliMainnet: ChainPreset = {
  id: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f' as api.ChainId,
  name: 'Worbli Mainnet',
  env: ChainEnv.Mainnet,
  url: new URL('https://api.worbli.io'),
  logo: worbliLogo,
}

export const waxMainnet: ChainPreset = {
  id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4' as api.ChainId,
  name: 'WAX Mainnet',
  env: ChainEnv.Mainnet,
  url: new URL('https://wax.greymass.com'),
  logo: waxLogo,
}

export const bosMainnet: ChainPreset = {
  id: 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86' as api.ChainId,
  name: 'BOS Mainnet',
  env: ChainEnv.Mainnet,
  url: new URL('https://api.bossweden.org'),
  logo: bosLogo,
}

export const meetoneMainnet: ChainPreset = {
  id: 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422' as api.ChainId,
  name: 'MEET.ONE Mainnet',
  env: ChainEnv.Mainnet,
  url: new URL('https://fullnode.meet.one'),
  logo: meetoneLogo,
}

export const jungleTestnet: ChainPreset = {
  id: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473' as api.ChainId,
  name: 'Jungle Testnet',
  env: ChainEnv.Testnet,
  url: new URL('https://api.jungle.alohaeos.com'),
  logo: jungleLogo,
}

export const kylinTestnet: ChainPreset = {
  id: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191' as api.ChainId,
  name: 'Kylin Testnet',
  env: ChainEnv.Testnet,
  url: new URL('https://kylin.eossweden.org'),
  logo: kylinLogo,
}

export const telosTestnet: ChainPreset = {
  id: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f' as api.ChainId,
  name: 'Telos Testnet',
  env: ChainEnv.Testnet,
  url: new URL('https://testnet.eos.miami'),
  logo: telosLogo,
}

export const lynxTestnet: ChainPreset = {
  id: '0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978' as api.ChainId,
  name: 'Lynx Testnet',
  env: ChainEnv.Testnet,
  url: new URL('https://lynxtestnet.greymass.com'),
  logo: lynxLogo,
}

export const bosTestnet: ChainPreset = {
  id: '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85' as api.ChainId,
  name: 'BOS Testnet',
  env: ChainEnv.Testnet,
  url: new URL('https://bos-test.eospacex.com'),
  logo: bosLogo,
}

export const meetoneTestnet: ChainPreset = {
  id: '7136e3e32a458bb99cf6973ab5055869d25830607b9e78593769e1be52fb6f20' as api.ChainId,
  name: 'MEET.ONE Testnet',
  env: ChainEnv.Testnet,
  url: new URL('https://sidechain-test-history.meet.one'),
  logo: meetoneLogo,
}

export const all: ChainPreset[] = [
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

export const mainnets: ChainPreset[] = all.filter(
  (preset) => preset.env === ChainEnv.Mainnet,
)

export const testnets: ChainPreset[] = all.filter(
  (preset) => preset.env === ChainEnv.Testnet,
)

export interface ChainPresets {
  [key: string]: ChainPreset
}

export const byChainId: ChainPresets = all.reduce(
  (acc: ChainPresets, cur: ChainPreset) => {
    acc[cur.id] = cur
    return acc
  },
  {},
)

export const byHostname: ChainPresets = all.reduce(
  (acc: ChainPresets, cur: ChainPreset) => {
    acc[cur.url.hostname] = cur
    return acc
  },
  {},
)

export function getByChainId(chainId: api.ChainId): ChainPreset | void {
  return byChainId[chainId]
}

export function getByHostname(hostname: string): ChainPreset | void {
  return byHostname[hostname]
}
