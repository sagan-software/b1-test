import {
  ChainId,
  BlockId,
  BlockNum,
  AccountName,
  ActionName,
  TransactionId,
} from './coreTypes'
import { RemoteData, defaultRemoteData } from './remoteData'

export type RpcData<T> = RemoteData<T, RpcError>

export enum RpcError {
  BadStatus = 'BAD_STATUS',
  BadJson = 'BAD_JSON',
  BadData = 'BAD_DATA',
}

export const defaultRpcData = defaultRemoteData

/** Partial raw data returned from `/v1/chain/get_info` endpoint */
export interface RawInfo {
  /** ID of the EOSIO blockchain */
  readonly chain_id: ChainId
  /** Latest block number */
  readonly head_block_num: BlockNum
  /** Latest irreversible block number */
  readonly last_irreversible_block_num: BlockNum
}

/** Partial raw data returned from `/v1/chain/get_block` endpoint */
export interface RawBlock {
  /** Hash of the block */
  readonly id: BlockId
  /** Number of the block */
  readonly block_num: BlockNum
  /** Block producer */
  readonly producer: AccountName
  /** Time when the block was produced */
  readonly timestamp: string
  /** Transactions included in this block */
  readonly transactions: ReadonlyArray<RawTransaction>
}

/** Partial raw transaction data returned from `/v1/chain/get_block` endpoint */
export interface RawTransaction {
  readonly trx: TransactionId | Readonly<RawTransactionInner>
}

/** Partial raw inner transaction data returned from `/v1/chain/get_block` endpoint */
export interface RawTransactionInner {
  /** Context-free actions included in this transaction */
  readonly context_free_actions: ReadonlyArray<RawAction>
  /** Non-context-free actions included in this transaction */
  readonly actions: ReadonlyArray<RawAction>
}

/** Partial raw action data returned from `/v1/chain/get_block` endpoint */
export interface RawAction {
  /** Smart contract account name */
  readonly account: AccountName
  /** Smart contract action name */
  readonly name: ActionName
}
