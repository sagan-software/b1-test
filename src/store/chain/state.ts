import { RpcData, Info, Block, ChainId } from '../../api'

export interface Chain {
  readonly url: Readonly<URL>
  readonly info: Readonly<RpcData<Info>>
  readonly blocks: {
    readonly [blockNum: number]: Readonly<RpcData<Block>>;
  }
}

export interface ChainPreset {
  readonly id: ChainId
  readonly name: string
  readonly env: ChainEnv
  readonly defaultHostname: string
}

export enum ChainEnv {
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET',
}
