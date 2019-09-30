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

export type RpcError =
  | RpcErrorNoCors
  | RpcErrorBadStatus
  | RpcErrorInvalidJson
  | RpcErrorUnexpectedData

export enum RpcErrorType {
  NoCors = 'NO_CORS',
  BadStatus = 'BAD_STATUS',
  InvalidJson = 'INVALID_JSON',
  UnexpectedData = 'UNEXPECTED_DATA',
}

export interface RpcErrorNoCors {
  readonly type: RpcErrorType.NoCors
}

export interface RpcErrorBadStatus {
  readonly type: RpcErrorType.BadStatus
  readonly status: number
}

export interface RpcErrorInvalidJson {
  readonly type: RpcErrorType.InvalidJson
}

export interface RpcErrorUnexpectedData {
  readonly type: RpcErrorType.UnexpectedData
}
