import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import * as store from '../../store'
import { ChainFailurePage } from './ChainFailurePage'
import { ChainLoadingPage } from './ChainLoadingPage'
import { ChainSuccessPage } from './ChainSuccessPage'
import { RemoteDataType } from '../../coreTypes'

export const ChainPage: React.FC<RouteComponentProps<{ hostname: string }>> = ({
  match,
}) => {
  const hostname = match.params.hostname
  const previousHostname = store.useSelector(store.getRpcHostnameInput)
  const dispatch = store.useDispatch()
  useEffect(() => {
    if (hostname !== previousHostname) {
      dispatch(store.getInfoAction(hostname))
    }
  }, [dispatch, hostname])
  const chain = store.useSelector(store.getChain)
  switch (chain.type) {
  case RemoteDataType.Success:
    return <ChainSuccessPage chain={chain.data} />
  case RemoteDataType.Failure:
    return <ChainFailurePage />
  case RemoteDataType.Loading:
  case RemoteDataType.Default:
    return <ChainLoadingPage />
  }
}
