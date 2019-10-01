import React, { useEffect } from 'react'
import {
  Block,
  BlockNum,
  TransactionType,
  getNumActionsInBlock,
} from '../../api'
import * as store from '../../store'
import { remoteDataDefault, RemoteDataType } from '../../coreTypes'

const BlockOk: React.FC<{ readonly block: Readonly<Block> }> = ({ block }) => {
  const numActions = getNumActionsInBlock(block)
  return (
    <div>
      Block {block.blockNum} ok: {block.id} / {block.producer} / {numActions}{' '}
      actions
    </div>
  )
}

export const BlockSummary: React.FC<{ readonly num: Readonly<BlockNum> }> = ({
  num,
}) => {
  const dispatch = store.useDispatch()
  const block =
    store.useSelector((state) => store.getBlock(state, num)) || remoteDataDefault

  useEffect(() => {
    if (block.type === RemoteDataType.Default) {
      dispatch(store.getBlockAction(num))
    }
    return () => {
      dispatch(store.delBlockAction(num))
    }
  }, [dispatch, num])

  switch (block.type) {
  case RemoteDataType.Success:
    return <BlockOk block={block.data} />
  case RemoteDataType.Failure:
    return <div>Block {num} failure</div>
  case RemoteDataType.Default:
  case RemoteDataType.Loading:
    return <div>Block {num} loading</div>
  }
}
