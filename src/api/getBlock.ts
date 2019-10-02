import { resultOk, resultErr } from '../coreTypes'
import {
  BlockId,
  BlockNum,
  AccountName,
  TransactionId,
  ActionName,
  RpcErrorType,
  RpcResult,
  RawError,
} from './rpcTypes'
import {
  Transaction,
  RawTransaction,
  TransactionType,
  isDeferred,
  convertRawTransaction,
  getNumActionsInTransaction,
} from './getTransaction'
// import { addJsonSchema, validateJsonSchema } from './jsonSchema'

/** Partial raw data returned from `/v1/chain/get_block` endpoint */
export interface RawBlock {
  /** Hash of the block */
  readonly id: BlockId
  /** Number of the block */
  readonly block_num: BlockNum
  /** Block producer */
  readonly producer: AccountName
  /** UTC time when the block was produced */
  readonly timestamp: string
  /** Transactions included in this block */
  readonly transactions: ReadonlyArray<RawTransaction>
}

/** Minimal block data needed for our application */
export interface Block {
  /** Hash of the block */
  readonly id: BlockId
  /** Number of the block */
  readonly blockNum: BlockNum
  /** Block producer */
  readonly producer: AccountName
  /** UTC time when the block was produced */
  readonly timestamp: Date
  /** Transactions included in this block */
  readonly transactions: ReadonlyArray<Transaction>
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
  blockNum: Readonly<BlockNum>,
  signal?: AbortSignal,
): Promise<RpcResult<Block>> {
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
    return resultErr({ type: RpcErrorType.BadStatus, status: 0 }) // TODO this is wrong
  }

  let json: any
  try {
    json = await res.json()
  } catch (e) {
    return resultErr({ type: RpcErrorType.InvalidJson })
  }

  // TODO validate json schema
  const raw = json as RawBlock

  try {
    return resultOk({
      id: raw.id,
      blockNum: raw.block_num,
      producer: raw.producer,
      timestamp: new Date(`${raw.timestamp}Z`),
      transactions: raw.transactions.map(convertRawTransaction),
    })
  } catch (e) {
    // TODO do this better
    return resultErr({
      type: RpcErrorType.UnexpectedData,
      error: json as RawError,
    })
  }
}

export function getNumActionsInBlock(block: Block): number {
  return block.transactions.reduce((sum: number, transaction) => {
    return sum + getNumActionsInTransaction(transaction)
  }, 0)
}
