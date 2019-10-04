/**
 * A simple wrapper to strengthen basic types
 * @see {@link https://codemix.com/opaque-types-in-javascript/}
 */
export type Opaque<K, T> = T & { readonly __TYPE__: K }

/** Opaque type representing an EOSIO chain ID */
export type ChainId = Opaque<'ChainId', string>

/** Opaque type representing an EOSIO block ID */
export type BlockId = Opaque<'BlockId', string>

/** Opaque type representing an EOSIO block number */
export type BlockNum = Opaque<'BlockNum', number>

/** Opaque type representing an EOSIO transaction ID */
export type TransactionId = Opaque<'TransactionId', string>

/** Opaque type representing an EOSIO account name */
export type AccountName = Opaque<'AccountName', string>

/** Opaque type representing an EOSIO action name */
export type ActionName = Opaque<'ActionName', string>

/** Opaque type representing an EOSIO action name */
export type PermissionName = Opaque<'PermissionName', string>

export interface RawError {
  readonly code: number
  readonly error: Readonly<{
    readonly code: number;
    readonly details: ReadonlyArray<{
      readonly file: Readonly<string>;
      readonly line_number: Readonly<number>;
      readonly message: Readonly<string>;
      readonly method: Readonly<string>;
    }>;
    readonly name: Readonly<string>;
    readonly what: Readonly<string>;
  }>
  readonly message: Readonly<string>
}

export function isRawError(data: any): data is RawError {
  // TODO test against json schema
  return data && typeof data === 'object' && 'code' in data && 'error' in data
}

export interface RpcError {
  type: RpcErrorType
  raw?: RawError
}

export enum RpcErrorType {
  NoCors = 'NO_CORS',
  BadStatus = 'BAD_STATUS',
  InvalidJson = 'INVALID_JSON',
  UnexpectedData = 'UNEXPECTED_DATA',
}

export type Result<T, E = RpcError> = ResultOk<T> | ResultErr<E>

export enum ResultType {
  Ok = 'OK',
  Err = 'ERR',
}

export interface ResultOk<T> {
  readonly type: ResultType.Ok
  readonly data: T
}

export const resultOk = <T>(data: T): ResultOk<T> => ({
  type: ResultType.Ok,
  data,
})

export function isOk<T, E>(result: Result<T, E>): result is ResultOk<T> {
  return result.type === ResultType.Ok
}

export function isErr<T, E>(result: Result<T, E>): result is ResultErr<E> {
  return result.type === ResultType.Err
}

export interface ResultErr<E> {
  readonly type: ResultType.Err
  readonly error: E
}

export const resultErr = <E>(error: E): ResultErr<E> => ({
  type: ResultType.Err,
  error,
})
