import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as store from '../store'
import {
  RemoteDataOk,
  RemoteDataStatus,
  RemoteDataUpdating,
  State,
  getBlock,
  fetchBlock,
} from '../store'

const BlockOk: React.FC<{
  readonly block: RemoteDataOk<store.Block> | RemoteDataUpdating<store.Block>;
}> = (props) => {
  const data = props.block.data
  const numActions = data.transactions.reduce((sum: number, { trx }) => {
    if (typeof trx === 'object' && 'transaction' in trx) {
      return (
        sum +
        trx.transaction.context_free_actions.length +
        trx.transaction.actions.length
      )
    } else {
      return sum
    }
  }, 0)
  return (
    <div>
      Block: #{data.block_num} / ID {data.id} / Time: {data.timestamp} /{' '}
      {numActions} actions
    </div>
  )
}

const Block: React.FC<{
  readonly num: number;
}> = (props) => {
  const block = useSelector((state: State) => getBlock(state, props.num))
  const dispatch = useDispatch<typeof store.store.dispatch>()
  if (block && block.status !== RemoteDataStatus.Default) {
    switch (block.status) {
    case RemoteDataStatus.Ok:
      return <BlockOk block={block} />
    default:
      return <div>Lodaing</div>
    }
  } else {
    dispatch(fetchBlock(props.num))
    return <div>Block loading</div>
  }
}

export default Block
