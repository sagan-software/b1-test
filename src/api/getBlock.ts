import {
  ActionWithTransactionId,
  getActionsInTransaction,
  getNumActionsInTransaction,
  Transaction,
} from './getTransaction'
import sendRequest from './sendRequest'
import * as api from './types'

export interface Block {
  readonly id: api.BlockId
  readonly block_num: api.BlockNum
  readonly producer: api.AccountName
  readonly timestamp: string
  readonly transactions: Transaction[]
}

export function getBlock(
  serverUrl: Readonly<URL>,
  blockNum: Readonly<api.BlockNum>,
  signal?: AbortSignal,
): Promise<api.Result<Block>> {
  const url = new URL('/v1/chain/get_block', serverUrl)
  return sendRequest(url.toString(), {
    method: 'POST',
    body: JSON.stringify({
      block_num_or_id: blockNum,
    }),
    signal,
  })
}

export function getNumActionsInBlock(block: Block): number {
  return block.transactions.reduce((sum: number, transaction) => {
    return sum + getNumActionsInTransaction(transaction)
  }, 0)
}

export function getActionsInBlock(block: Block): ActionWithTransactionId[] {
  return block.transactions.reduce(
    (actions: ActionWithTransactionId[], transaction) => {
      return actions.concat(getActionsInTransaction(transaction))
    },
    [],
  )
}
