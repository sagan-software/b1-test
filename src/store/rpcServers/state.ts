export interface State {
  [url: string]: RpcServer
}

export type RpcServer =
  | RpcServerDefault
  | RpcServerLoading
  | RpcServerOk
  | RpcServerErr

export enum RpcServerStatus {
  Default = 'DEFAULT',
  Loading = 'LOADING',
  Ok = 'OK',
  Err = 'ERR',
}

export interface RpcServerDefault {
  readonly status: RpcServerStatus.Default
  readonly url: string
}

export interface RpcServerLoading {
  readonly status: RpcServerStatus.Loading
  readonly url: string
}

export interface RpcServerOk {
  readonly status: RpcServerStatus.Ok
  readonly url: string
  readonly chainId: string
  readonly ping: number
}

export interface RpcServerErr {
  readonly status: RpcServerStatus.Err
  readonly url: string
}

export const defaultState: State = [
  'https://api.eosnewyork.io', // EOS Mainnet
  'https://api.tlos.goodblock.io', // Telos Mainnet
  'https://api.worbli.io', // Worbli Mainnet
  'https://wax.greymass.com', // WAX Mainnet
  'https://api.bossweden.org', // BOS Mainnet
  'https://fullnode.meet.one', // MEET.ONE Mainnet
  'https://api.jungle.alohaeos.com', // Jungle Testnet
  'https://kylin.eossweden.org', // Kylin Testnet
  'https://testnet.eos.miami', // Telos Testnet
  'https://lynxtestnet.greymass.com', // Lynx Testnet
  'https://bos-test.eospacex.com', // BOS Testnet
  'https://sidechain-test-history.meet.one', // MEET.ONE Testnet
].reduce((acc: State, url: string) => {
  acc[url] = {
    status: RpcServerStatus.Default,
    url,
  }
  return acc
}, {})
