import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import * as api from '../../api'
import * as store from '../../store'
import { RemoteDataType, remoteDataDefault } from '../../coreTypes'
import { ChainFailurePage } from '../ChainPage/ChainFailurePage'
import { ChainLoadingPage } from '../ChainPage/ChainLoadingPage'
import { BlockLoadingPage } from './BlockLoadingPage'
import { BlockFailurePage } from './BlockFailurePage'
import { BlockSuccessPage } from './BlockSuccessPage'

export const BlockPage: React.FC<
  RouteComponentProps<{ hostname: string; blockNum: string }>
> = ({ match }) => {
  const hostname = match.params.hostname
  const previousHostname = store.useSelector(store.getRpcHostnameInput)
  const dispatch = store.useDispatch()
  useEffect(() => {
    if (hostname !== previousHostname) {
      dispatch(store.getInfoAction(hostname))
    }
  }, [dispatch, hostname])

  let blockNum: api.BlockNum | void
  try {
    blockNum = parseInt(match.params.blockNum, 10) as api.BlockNum
  } catch (e) {}

  const chain = store.useSelector(store.getChain)
  const block =
    store.useSelector((state) =>
      blockNum ? store.getBlock(state, blockNum) : null,
    ) || remoteDataDefault

  useEffect(() => {
    if (blockNum && chain.type === RemoteDataType.Success) {
      switch (block.type) {
      case RemoteDataType.Default:
      case RemoteDataType.Failure:
        dispatch(store.getBlockAction(blockNum))
      }
    }
  }, [dispatch, hostname, chain, blockNum])

  if (!blockNum) {
    return <>Invalid block number</>
  }

  switch (chain.type) {
  case RemoteDataType.Success:
    switch (block.type) {
      case RemoteDataType.Default:
      case RemoteDataType.Loading:
        return <BlockLoadingPage />
      case RemoteDataType.Failure:
        return <BlockFailurePage />
      case RemoteDataType.Success:
        return <BlockSuccessPage chain={chain.data} block={block.data} />
      }
  case RemoteDataType.Loading:
  case RemoteDataType.Default:
    return <ChainLoadingPage />
  case RemoteDataType.Failure:
    return <ChainFailurePage />
  }
}