import React from 'react'
import { useDispatch, useSelector, selectors, action } from '../../store'
import { RouteComponentProps } from 'react-router'
import { ChainErr } from './ChainErr'
import { ChainLoading } from './ChainLoading'
import { ChainOk } from './ChainOk'
import { RemoteDataType } from '../../coreTypes'

export const ChainPage: React.FC<RouteComponentProps<{ hostname: string }>> = ({
  match,
}) => {
  const dispatch = useDispatch()
  const urlInput = useSelector(selectors.getUrlInput)
  if (urlInput !== match.params.hostname) {
    dispatch(action.setUrl(match.params.hostname))
  }
  const chain = useSelector(selectors.getChain)
  switch (chain.type) {
  case RemoteDataType.Success:
    return <ChainOk chain={chain.data} />
  case RemoteDataType.Failure:
    return <ChainErr error={chain.error} />
  default:
    return <ChainLoading />
  }
}
