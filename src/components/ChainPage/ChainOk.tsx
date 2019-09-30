import React from 'react'
import { state } from '../../store'
import { ChainInfo } from './ChainInfo'

export const ChainOk: React.FC<{
  chain: state.ChainOk;
}> = ({ chain }) => {
  return <ChainInfo info={chain.info} />
}
