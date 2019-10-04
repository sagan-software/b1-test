import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from './Link'
import DoneIcon from '@material-ui/icons/Done'
import { accountRoute, homeRoute } from './Router'
import * as api from '../api'
import { Typography, Hidden, Chip } from '@material-ui/core'

const TransactionRow: React.FC<{
  url: URL;
  transaction: api.Transaction;
}> = ({ url, transaction }) => {
  const id = api.getTransactionId(transaction)
  const { trx } = transaction
  const expiration = api.isDeferred(trx) ? 'N/A' : trx.transaction.expiration
  const status = (
    <Chip
      size='small'
      label={transaction.status}
      avatar={transaction.status === 'executed' ? <DoneIcon /> : <></>}
    />
  )
  return (
    <TableRow>
      <TableCell>
        <Link to={homeRoute()}>
          <Typography
            noWrap={true}
            style={{ maxWidth: 150 }}
            variant='body2'
            color='inherit'
          >
            {id}
          </Typography>
        </Link>
      </TableCell>
      <TableCell>{expiration}</TableCell>
      <Hidden smDown={true}>
        <TableCell align='center'>{status}</TableCell>
      </Hidden>
      <Hidden xsDown={true}>
        <TableCell align='right'>
          {transaction.cpu_usage_us.toLocaleString()} μs
        </TableCell>
        <TableCell align='right'>
          {transaction.net_usage_words.toLocaleString()} bytes
        </TableCell>
      </Hidden>
      <Hidden smDown={true}>
        <TableCell align='right'>
          {api.getNumActionsInTransaction(transaction)}
        </TableCell>
      </Hidden>
    </TableRow>
  )
}

const TransactionsTable: React.FC<{
  url: URL;
  transactions: api.Transaction[];
}> = ({ url, transactions }) => {
  const rows = transactions.map((transaction) => {
    const key = api.getTransactionId(transaction)
    return <TransactionRow key={key} url={url} transaction={transaction} />
  })

  return (
    <Paper>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Expiration</TableCell>
            <Hidden smDown={true}>
              <TableCell align='center'>Status</TableCell>
            </Hidden>
            <Hidden xsDown={true}>
              <TableCell align='right'>CPU Usage</TableCell>
              <TableCell align='right'>Net Usage</TableCell>
            </Hidden>
            <Hidden smDown={true}>
              <TableCell align='right'>Actions</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  )
}

export default TransactionsTable
