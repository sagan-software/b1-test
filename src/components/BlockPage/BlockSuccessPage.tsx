import React from 'react'
import * as api from '../../api'
import * as store from '../../store'

export const BlockSuccessPage: React.FC<{
  readonly chain: Readonly<store.ChainSuccess>;
  readonly block: Readonly<api.Block>;
}> = ({ chain, block }) => {
  return <>BlockSuccess</>
}
