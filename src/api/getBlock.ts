import {
  BlockId,
  BlockNum,
  AccountName,
  TransactionId,
  ActionName,
} from './rpcTypes'
import { Transaction, RawTransaction } from './getTransaction'
// import { addJsonSchema, validateJsonSchema } from './jsonSchema'

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
