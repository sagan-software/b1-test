// Opaque type aliases for better readability.
export type Opaque<K, T> = T & { readonly __TYPE__: K }
export type ChainId = Opaque<'ChainId', string>
export type BlockId = Opaque<'BlockId', string>
export type BlockNum = Opaque<'BlockNum', number>
export type TransactionId = Opaque<'TransactionId', string>
export type AccountName = Opaque<'AccountName', string>
export type ActionName = Opaque<'ActionName', string>

export interface State {
  readonly autoplay: boolean
  readonly maxBlockCount: number
  readonly server: Readonly<RpcServer>
  readonly theme: Readonly<Theme>
}

export type RpcServer = RpcServerValidUrl | RpcServerInvalidUrl

export enum RpcServerStatus {
  ValidUrl = 'VALID_URL',
  InvalidUrl = 'INVALID_URL',
}

export interface RpcServerValidUrl {
  readonly status: RpcServerStatus.ValidUrl
  readonly input: string
  readonly url: Readonly<URL>
  readonly info: Readonly<RemoteData<Info>>
  readonly blocks: { readonly [blockNum: number]: Readonly<RemoteData<Block>> }
}

export enum RpcServerErrorType {
  NotUrl = 'NOT_URL',
  NotHttps = 'NOT_HTTPS',
}

export interface RpcServerInvalidUrl {
  readonly status: RpcServerStatus.InvalidUrl
  readonly input: string
  readonly errorType: RpcServerErrorType
}

export enum RemoteDataStatus {
  Default = 'DEFAULT',
  Loading = 'LOADING',
  Error = 'ERROR',
  Ok = 'OK',
  Updating = 'UPDATING',
}

export type RemoteData<T> =
  | RemoteDataDefault
  | RemoteDataLoading
  | RemoteDataError
  | RemoteDataOk<T>
  | RemoteDataUpdating<T>

export interface RemoteDataDefault {
  readonly status: RemoteDataStatus.Default
}

export const remoteDataDefault = (): Readonly<RemoteDataDefault> => ({
  status: RemoteDataStatus.Default,
})

export interface RemoteDataLoading {
  readonly status: RemoteDataStatus.Loading
}

export const remoteDataLoading = (): Readonly<RemoteDataLoading> => ({
  status: RemoteDataStatus.Loading,
})

export interface RemoteDataError {
  readonly status: RemoteDataStatus.Error
  readonly message: string
}

export const remoteDataError = (
  message: Readonly<string>,
): Readonly<RemoteDataError> => ({
  status: RemoteDataStatus.Error,
  message,
})

export interface RemoteDataOk<T> {
  readonly status: RemoteDataStatus.Ok
  readonly data: Readonly<T>
}

export const remoteDataOk = <T>(
  data: Readonly<T>,
): Readonly<RemoteDataOk<T>> => ({
  status: RemoteDataStatus.Ok,
  data,
})

export interface RemoteDataUpdating<T> {
  readonly status: RemoteDataStatus.Updating
  readonly data: Readonly<T>
}

export const remoteDataUpdating = <T>(
  data: Readonly<T>,
): RemoteDataUpdating<T> => ({
  status: RemoteDataStatus.Updating,
  data,
})

export interface Info {
  readonly chain_id: ChainId
  readonly head_block_id: BlockId
  readonly head_block_num: BlockNum
  readonly head_block_time: string
  readonly head_block_producer: AccountName
  readonly last_irreversible_block_id: BlockId
  readonly last_irreversible_block_num: BlockNum
}

export interface Block {
  readonly id: BlockId
  readonly block_num: BlockNum
  readonly previous: BlockId
  readonly producer: AccountName
  readonly timestamp: string
  readonly transactions: ReadonlyArray<{
    readonly trx:
      | TransactionId
      | {
        readonly transaction: {
            readonly context_free_actions: ReadonlyArray<{
              readonly account: AccountName;
              readonly name: ActionName;
            }>;
            readonly actions: ReadonlyArray<{
              readonly account: AccountName;
              readonly name: ActionName;
            }>;
          };
      };
  }>
}

export interface Theme {
  readonly bgColor: string
  readonly textColor: string
  readonly linkColor: string
}

export const lightTheme: Readonly<Theme> = {
  bgColor: '#ffffff',
  textColor: '#333333',
  linkColor: 'red',
}

export const darkTheme: Readonly<Theme> = {
  bgColor: '#333',
  textColor: '#fff',
  linkColor: 'blue',
}

export const defaultState: Readonly<State> = {
  autoplay: true,
  maxBlockCount: 10,
  server: {
    status: RpcServerStatus.ValidUrl,
    input: 'https://api.eosnewyork.io',
    url: new URL('https://api.eosnewyork.io'),
    info: remoteDataDefault(),
    blocks: {},
  },
  theme: darkTheme,
}
