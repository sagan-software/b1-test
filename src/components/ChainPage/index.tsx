import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import useInterval from '@use-it/interval'
import * as store from '../../store'
import { ChainErr } from './ChainErr'
import { ChainLoading } from './ChainLoading'
import { ChainOk } from './ChainOk'
import { RemoteDataType } from '../../coreTypes'

export const ChainPage: React.FC<RouteComponentProps<{ hostname: string }>> = ({
  match,
}) => {
  const hostname = match.params.hostname
  const previousHostname = store.useSelector(store.getRpcHostnameInput)
  const dispatch = store.useDispatch()
  useEffect(() => {
    if (hostname !== previousHostname) {
      dispatch(store.initChainAction(hostname))
    }
  }, [dispatch, hostname])
  const chain = store.useSelector(store.getChain)
  const preset = store.useSelector(store.getChainPreset)
  switch (chain.type) {
  case RemoteDataType.Success:
    return <ChainOk chain={chain.data} />
  case RemoteDataType.Failure:
    return <ChainErr />
  case RemoteDataType.Loading:
  case RemoteDataType.Default:
    return <ChainLoading />
  }
}
