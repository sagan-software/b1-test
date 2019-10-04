import React from 'react'
import { RouteComponentProps } from 'react-router'
import * as api from '../api'

const Component: React.FC<
  RouteComponentProps<{ host: string; id: api.TransactionId }>
> = ({ match }) => {
  return <div>Transaction page</div>
}

export default Component
