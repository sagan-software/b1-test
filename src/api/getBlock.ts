import * as api from './types'
import {
  Transaction,
  getNumActionsInTransaction,
  getActionsInTransaction,
  ActionWithTransactionId,
} from './getTransaction'
// import { addJsonSchema, validateJsonSchema } from './jsonSchema'

/** Partial raw data returned from `/v1/chain/get_block` endpoint */
export interface Block {
  /** Hash of the block */
  readonly id: api.BlockId
  /** Number of the block */
  readonly block_num: api.BlockNum
  /** Block producer */
  readonly producer: api.AccountName
  /** UTC time when the block was produced */
  readonly timestamp: string
  /** Transactions included in this block */
  readonly transactions: Transaction[]
}

// addJsonSchema('RawBlock', {
//   type: 'object',
//   properties: {
//     id: { type: 'string' },
//     block_num: { type: 'integer' },
//     producer: { type: 'string' },
//     timestamp: { type: 'string' },
//   },
//   required: ['id', 'block_num', 'producer', 'timestamp'],
// })

export async function getBlock(
  serverUrl: Readonly<URL>,
  blockNum: Readonly<api.BlockNum>,
  signal?: AbortSignal,
): Promise<api.Result<Block>> {
  const url = new URL('/v1/chain/get_block', serverUrl)
  // TODO abort controllers
  // TODO make a HEAD call to check for CORS headers

  let res: Response
  try {
    res = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        block_num_or_id: blockNum,
      }),
      signal,
    })
  } catch (e) {
    return api.resultErr({ type: api.RpcErrorType.BadStatus, status: 0 }) // TODO this is wrong
  }

  let json: any
  try {
    json = await res.json()
  } catch (e) {
    return api.resultErr({ type: api.RpcErrorType.InvalidJson })
  }

  if ('error' in json || 'code' in json) {
    return api.resultErr({
      type: api.RpcErrorType.UnexpectedData,
      error: json as api.RawError,
    })
  } else {
    return api.resultOk(json as Block)
  }
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
