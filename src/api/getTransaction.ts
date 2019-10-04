import * as api from './types'

/** Partial raw transaction data returned from `/v1/chain/get_block` endpoint */
export interface Transaction {
  readonly status: string
  readonly cpu_usage_us: number
  readonly net_usage_words: number
  readonly trx: api.TransactionId | Trx
}

export interface Trx {
  readonly id: api.TransactionId
  readonly transaction: TransactionInner
}

export interface TransactionInner {
  readonly expiration: string
  readonly context_free_actions: Action[]
  readonly actions: Action[]
}

export interface Action {
  readonly account: api.AccountName
  readonly name: api.ActionName
  readonly data: object
  readonly hex_data: string
  readonly authorization: Authorization[]
}

export interface Authorization {
  readonly actor: api.AccountName
  readonly permission: api.PermissionName
}

export interface ActionWithTransactionId extends Action {
  readonly id: api.TransactionId
}

export function isDeferred(
  trx: api.TransactionId | Trx,
): trx is api.TransactionId {
  return typeof trx === 'string' || trx instanceof String
}

export function getTransactionId({ trx }: Transaction): api.TransactionId {
  if (isDeferred(trx)) {
    return trx
  } else {
    return trx.id
  }
}

export function getNumActionsInTransaction({ trx }: Transaction): number {
  if (!isDeferred(trx)) {
    return (
      trx.transaction.context_free_actions.length +
      trx.transaction.actions.length
    )
  } else {
    return 0
  }
}

export function getActionsInTransaction({
  trx,
}: Transaction): ActionWithTransactionId[] {
  if (!isDeferred(trx)) {
    const id = trx.id
    return trx.transaction.actions
      .concat(trx.transaction.context_free_actions)
      .map((action) => ({
        ...action,
        id,
      }))
  } else {
    return []
  }
}
