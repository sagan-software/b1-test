import { RpcError, Info, Block, ChainId, BlockNum } from '../api'
import { RemoteData } from '../coreTypes'

export interface State {
  readonly rpcHostnameInput: string
  readonly autoplay: boolean
  readonly chain: Chain
  readonly theme: Theme
}

export type Chain = RemoteData<ChainSuccess, ChainError, ChainLoading>

export type ChainData = ChainSuccess | ChainError | ChainLoading

export interface ChainSuccess {
  readonly rpcUrl: Readonly<URL>
  readonly chainId: Readonly<ChainId>
  readonly headBlockNum: Readonly<BlockNum>
  readonly blocks: {
    readonly [blockNum: number]: Readonly<RemoteData<Block, RpcError>>;
  }
}

export interface ChainLoading {
  readonly rpcUrl: Readonly<URL>
  readonly chainId?: Readonly<ChainId> | void
}

export enum ChainErrorType {
  InvalidUrl = 'INVALID_URL',
  Unreachable = 'UNREACHABLE',
  GetInfoError = 'GET_INFO_ERROR',
  NoCorsGetInfo = 'NO_CORS_GET_INFO',
  NoCorsGetBlock = 'NO_CORS_GET_BLOCK',
}

export interface ChainError {
  readonly type: ChainErrorType
  readonly rpcUrl?: Readonly<URL> | void
  readonly chainId?: Readonly<ChainId> | void
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

export interface Theme {
  readonly bgColor: string
  readonly textColor: string
  readonly linkColor: string
  readonly x: number
  readonly y: number
  // readonly color: {
  //   readonly primary: string
  //   readonly primaryVariant: string
  //   readonly secondary: string
  //   readonly secondaryVariant: string
  //   readonly background: string
  //   readonly surface: string
  //   readonly error: string
  // }
}
