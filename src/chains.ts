export interface Chain {
  readonly id: string
  readonly name: string
  readonly type: ChainType
  readonly url: URL
}

export enum ChainType {
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET',
}

export const eosMainnet: Readonly<Chain> = {
  id: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  name: 'EOS Mainnet',
  type: ChainType.Mainnet,
  url: new URL('https://api.eosnewyork.io'),
}

export const telosMainnet: Readonly<Chain> = {
  id: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
  name: 'Telos Mainnet',
  type: ChainType.Mainnet,
  url: new URL('https://api.tlos.goodblock.io'),
}

export const worbliMainnet: Readonly<Chain> = {
  id: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
  name: 'Worbli Mainnet',
  type: ChainType.Mainnet,
  url: new URL('https://api.worbli.io'),
}

export const waxMainnet: Readonly<Chain> = {
  id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  name: 'WAX Mainnet',
  type: ChainType.Mainnet,
  url: new URL('https://wax.greymass.com'),
}

export const bosMainnet: Readonly<Chain> = {
  id: 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86',
  name: 'BOS Mainnet',
  type: ChainType.Mainnet,
  url: new URL('https://api.bossweden.org'),
}

export const meetoneMainnet: Readonly<Chain> = {
  id: 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422',
  name: 'MEET.ONE Mainnet',
  type: ChainType.Mainnet,
  url: new URL('https://fullnode.meet.one'),
}

export const jungleTestnet: Readonly<Chain> = {
  id: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
  name: 'Jungle Testnet',
  type: ChainType.Testnet,
  url: new URL('https://api.jungle.alohaeos.com'),
}

export const kylinTestnet: Readonly<Chain> = {
  id: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  name: 'Kylin Testnet',
  type: ChainType.Testnet,
  url: new URL('https://kylin.eossweden.org'),
}

export const telosTestnet: Readonly<Chain> = {
  id: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
  name: 'Telos Testnet',
  type: ChainType.Testnet,
  url: new URL('https://testnet.eos.miami'),
}

export const lynxTestnet: Readonly<Chain> = {
  id: '0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978',
  name: 'Lynx Testnet',
  type: ChainType.Testnet,
  url: new URL('https://lynxtestnet.greymass.com'),
}

export const bosTestnet: Readonly<Chain> = {
  id: '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85',
  name: 'BOS Testnet',
  type: ChainType.Testnet,
  url: new URL('https://bos-test.eospacex.com'),
}

export const meetoneTestnet: Readonly<Chain> = {
  id: '7136e3e32a458bb99cf6973ab5055869d25830607b9e78593769e1be52fb6f20',
  name: 'MEET.ONE Testnet',
  type: ChainType.Testnet,
  url: new URL('https://sidechain-test-history.meet.one'),
}

export interface Chains {
  [chainId: string]: Readonly<Chain>
}

export const chains: Chains = [
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
].reduce((acc: Chains, chain: Readonly<Chain>) => {
  acc[chain.id] = chain
  return acc
}, {})
