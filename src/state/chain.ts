import {
  ChainId,
  BlockNum,
  BlockId,
  AccountName,
  ActionName,
  TransactionId,
} from './coreTypes'
import { RemoteData, defaultRemoteData } from './remoteData'
import { RpcData } from './rpcData'

export type Chain = RemoteData<ChainOk, ChainError>

export const defaultChainData: Readonly<Chain> = defaultRemoteData

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

/** Minimal info data needed for our application */
export interface Info {
  /** ID of the EOSIO blockchain */
  readonly chainId: ChainId
  /** Latest block number */
  readonly headBlockNum: BlockNum
  /** Latest irreversible block number */
  readonly lastIrreversibleBlockNum: BlockNum
}

/** Minimal block data needed for our application */
export interface Block {
  /** Hash of the block */
  readonly id: BlockId
  /** Number of the block */
  readonly blockNum: BlockNum
  /** Block producer */
  readonly producer: AccountName
  /** Transactions included in this block */
  readonly transactions: ReadonlyArray<Transaction>
}

/** Minimal transaction data needed for our application */
export type Transaction = StandardTransaction | DeferredTransaction

/** Transaction union type tag */
export enum TransactionType {
  Standard = 'STANDARD',
  Deferred = 'DEFERRED',
}

/** Minimal standard transaction data needed for our application */
export interface StandardTransaction {
  /** Union type tag */
  readonly type: TransactionType.Standard
  /** Context-free actions included in this transaction */
  readonly contextFreeActions: ReadonlyArray<Action>
  /** Non-context-free actions included in this transaction */
  readonly actions: ReadonlyArray<Action>
}

/** Minimal action data needed for our application */
export interface Action {
  /** Smart contract account name */
  readonly account: AccountName
  /** Smart contract action name */
  readonly name: ActionName
}

/** Minimal deferred transaction data needed for our application */
export interface DeferredTransaction {
  /** Union type tag */
  readonly type: TransactionType.Deferred
  /** ID of the deferred transaction */
  readonly id: TransactionId
}
