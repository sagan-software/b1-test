import { AccountName, ActionName, TransactionId } from './rpcTypes'

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
