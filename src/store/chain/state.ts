import { RpcData, Info, Block, ChainId } from '../../api'
import { RemoteData } from '../../coreTypes'

export type Chain = RemoteData<ChainOk, ChainError>

export interface ChainOk {
  readonly url: Readonly<URL>
  readonly info: Readonly<RpcData<Info>>
  readonly blocks: {
    readonly [blockNum: number]: Readonly<RpcData<Block>>;
  }
}

export enum ChainError {
  NotUrl = 'NOT_URL',
  NotHttps = 'NOT_HTTPS',
  NotReachable = 'NOT_REACHABLE',
  NoHistoryApi = 'NO_HISTORY_API',
  NoCorsGetInfo = 'NO_CORS_GET_INFO',
  NoCorsGetBlock = 'NO_CORS_GET_BLOCK',
  NoCorsGetAbi = 'NO_CORS_GET_ABI',
  NoCorsGetTransaction = 'NO_CORS_GET_TRANSACTION',
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
