import { Opaque, defaultRemoteData, RemoteData } from '../coreTypes'

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

export type RpcData<T> = RemoteData<T, RpcError>

export enum RpcError {
  NoCors = 'NO_CORS',
  BadStatus = 'BAD_STATUS',
  InvalidJson = 'INVALID_JSON',
  UnexpectedData = 'UNEXPECTED_DATA',
}

export const defaultRpcData = defaultRemoteData
