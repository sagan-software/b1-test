import { Opaque, Result } from '../coreTypes'

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

export type RpcResult<T> = Result<T, RpcError>

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
